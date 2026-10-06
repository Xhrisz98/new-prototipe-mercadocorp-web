"use client";

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { MessagesSquare, Users, Workflow, Megaphone, Filter, BarChart3, type LucideIcon } from "lucide-react";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/components/theme/ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { WebGLRelease } from "@/components/three/WebGLRelease";

// Hero de Inicio (PROJECT_PLAN.md §5.11 v2): dashboard "a medida". Seis paneles planos
// — Tecnología a la izquierda (agente de IA, CRM, automatización) y Marketing a la
// derecha (campaña, embudo, analítica) — entran uno a uno, cada uno desde una
// dirección distinta, hasta calzar en su hueco. Con los seis en su lugar las dos
// mitades se juntan y la costura en zigzag se enciende en verde (#04E7AF) con un pulso
// que la recorre; aparece "A medida".
//
// Todo es función del progreso p (0-1), sin loops de tiempo: retroceder el scroll
// invierte la coreografía. frameloop="demand": solo se dibuja cuando p, el encuadre, el
// tema o el parallax del cursor cambian, y solo mientras el hero está a la vista.
//
// Montajes (cada uno crea su Canvas solo si su media query coincide):
// - placement="background" (≥1024px): canvas de fondo del hero, en el espacio libre a la
//   derecha de [data-hero-text]. Además controla el pin: el hero completo queda fijo
//   (position: sticky en TailoredDashboardPin) durante PIN_TRAVEL_VH de scroll nativo.
// - placement="inline" (768-1023px): bloque propio bajo el texto, sin pin; p sigue el
//   paso del bloque por la pantalla.
// - <768px: PNG estático del estado final (render real de esta escena con movimiento
//   reducido, uno por tema). No se crea ningún contexto WebGL.
// prefers-reduced-motion: sin pin ni animación; estado final estático.

const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_QUERY = "(min-width: 1024px)";
const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}
const subscribeMobile = subscribeMedia(MOBILE_QUERY);
const subscribeDesktop = subscribeMedia(DESKTOP_QUERY);
const getMobile = () => window.matchMedia(MOBILE_QUERY).matches;
const getDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const serverFalse = () => false;

// ---------- Pin ----------

// Recorrido de scroll del hero fijo, en vh (§5.11: ~200-250vh).
export const PIN_TRAVEL_VH = 220;
// Alto del Navbar sticky (h-20).
const NAV_H = 80;
// Aire mínimo bajo los CTAs mientras el hero está fijo.
const CTA_MARGIN = 12;

// Envoltorio del hero de Inicio: el hero queda fijo (sticky) mientras se recorre el
// espaciador. Es scroll nativo — no se intercepta la rueda ni el teclado. Sin JS o
// sin pin (tablet, mobile, movimiento reducido, pantalla demasiado baja) el
// espaciador no se muestra y el hero se comporta como cualquier otro.
// position/top/display los escribe TailoredDashboard (placement="background") tras
// medir: el hero de Inicio mide ~980px y no siempre cabe en la pantalla, así que el
// pin se ancla para que H1 y CTAs queden siempre a la vista (ver measurePin).
export function TailoredDashboardPin({ children }: { children: React.ReactNode }) {
  return (
    <div data-hero-pin="">
      <div data-hero-pin-sticky="">{children}</div>
      <div data-hero-pin-spacer="" aria-hidden="true" style={{ display: "none", height: `${PIN_TRAVEL_VH}vh` }} />
    </div>
  );
}

// ---------- Coreografía (todo en función de p) ----------

// Ventana de scroll de cada panel (~13% de p, con solapamiento leve), en el orden de
// PANELS: chat, CRM, automatización, campaña, embudo, analítica.
const PANEL_WINDOWS: [number, number][] = [
  [0.02, 0.15],
  [0.125, 0.255],
  [0.23, 0.36],
  [0.335, 0.465],
  [0.44, 0.57],
  [0.545, 0.675],
];
const LABEL_TECH_WINDOW: [number, number] = [0.36, 0.41];
const LABEL_MKT_WINDOW: [number, number] = [0.675, 0.72];
const JOIN_WINDOW: [number, number] = [0.69, 0.77];
const SEAM_LIGHT_WINDOW: [number, number] = [0.73, 0.82];
const SEAM_PULSE_WINDOW: [number, number] = [0.76, 0.9];
// "A medida" aparece cuando el pulso llega al extremo inferior de la costura.
const LABEL_TAILORED_WINDOW: [number, number] = [0.84, 0.9];
// Opacidad de cada panel en p=0 (casi invisible).
const START_OPACITY = 0.07;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const span = (p: number, [a, b]: [number, number]) => clamp01((p - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);
// Ease-out con un pequeño asentamiento al final (sobrepasa ~3% y vuelve).
const settle = (t: number) => {
  const c1 = 0.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// ---------- Geometría del dashboard (unidades locales, y hacia arriba) ----------

const HALF_W = 2.0; // borde exterior de cada mitad
const ROW_H = [1.05, 0.9, 1.0];
const ROW_GAP = 0.1;
const DASH_H = ROW_H[0] + ROW_H[1] + ROW_H[2] + 2 * ROW_GAP;
const TOP = DASH_H / 2;
const ROW_TOP = [TOP, TOP - ROW_H[0] - ROW_GAP, TOP - ROW_H[0] - ROW_H[1] - 2 * ROW_GAP];
// Costura irregular en zigzag: x de la costura arriba/abajo de cada fila. Cada fila se
// inclina hacia un lado distinto y entre filas la costura salta de lado.
const SEAM: [number, number][] = [
  [0.3, 0.08],
  [-0.22, 0.0],
  [0.26, 0.06],
];
const SEAM_GAP = 0.05; // separación entre mitades ya unidas (la cubre la costura)
const SPLIT = 0.16; // separación extra de cada mitad antes de unirse
const CORNER = 0.07;
const PAD = 0.09;
const BADGE_R = 0.17;
const GLOW_MARGIN = 0.16;
const UI_BLEED = 0.03;

const TILT = new THREE.Euler(-0.05, 0.16, 0);
const CAMERA_Z = 8;
const FOV = 35;
// px por unidad máximos (y base de la resolución de las texturas).
const K_MAX = 230;

type V2 = [number, number];

interface PanelDef {
  half: 0 | 1;
  icon: LucideIcon;
  // Desplazamiento inicial (x, y, z) desde el que viaja a su hueco.
  from: [number, number, number];
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, pal: Palette) => void;
  center: V2;
  size: V2; // caja envolvente
  verts: V2[]; // cuadrilátero relativo al centro
  inset: V2[]; // cuadrilátero contraído CORNER (esquinas redondeadas = inset - CORNER)
  badge: V2; // centro de la insignia, relativo al centro
  ui: { x: number; y: number; w: number; h: number }; // centro + tamaño, relativo al centro
}

function insetQuad(v: V2[], r: number): V2[] {
  let area = 0;
  for (let i = 0; i < v.length; i++) {
    const [x0, y0] = v[i];
    const [x1, y1] = v[(i + 1) % v.length];
    area += x0 * y1 - x1 * y0;
  }
  const ccw = area > 0;
  const lines = v.map((a, i) => {
    const b = v[(i + 1) % v.length];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const d: V2 = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
    const n: V2 = ccw ? [-d[1], d[0]] : [d[1], -d[0]];
    return { p: [a[0] + n[0] * r, a[1] + n[1] * r] as V2, d };
  });
  return lines.map((l, i) => {
    const prev = lines[(i + lines.length - 1) % lines.length];
    // Intersección de prev (p + t·d) con l (p + s·d).
    const den = prev.d[0] * l.d[1] - prev.d[1] * l.d[0];
    const t = ((l.p[0] - prev.p[0]) * l.d[1] - (l.p[1] - prev.p[1]) * l.d[0]) / den;
    return [prev.p[0] + prev.d[0] * t, prev.p[1] + prev.d[1] * t] as V2;
  });
}

function buildPanel(
  half: 0 | 1,
  row: number,
  icon: LucideIcon,
  from: [number, number, number],
  draw: PanelDef["draw"]
): PanelDef {
  const yT = ROW_TOP[row];
  const yB = yT - ROW_H[row];
  const [sT, sB] = SEAM[row];
  const g = SEAM_GAP / 2;
  const abs: V2[] =
    half === 0
      ? [
          [-HALF_W, yT],
          [sT - g, yT],
          [sB - g, yB],
          [-HALF_W, yB],
        ]
      : [
          [sT + g, yT],
          [HALF_W, yT],
          [HALF_W, yB],
          [sB + g, yB],
        ];
  const xs = abs.map((p) => p[0]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const center: V2 = [(minX + maxX) / 2, (yT + yB) / 2];
  const rel = (p: V2): V2 => [p[0] - center[0], p[1] - center[1]];
  const verts = abs.map(rel);
  // Zona rectangular útil (sin el borde inclinado de la costura).
  const innerLeft = Math.max(abs[0][0], abs[3][0]);
  const innerRight = Math.min(abs[1][0], abs[2][0]);
  const badge: V2 = [innerLeft + PAD + BADGE_R, yT - PAD - BADGE_R];
  const uiX0 = innerLeft + 2 * PAD + 2 * BADGE_R;
  const uiX1 = innerRight - PAD;
  const uiY1 = yT - PAD;
  const uiY0 = yB + PAD;
  return {
    half,
    icon,
    from,
    draw,
    center,
    size: [maxX - minX, yT - yB],
    verts,
    inset: insetQuad(verts, CORNER),
    badge: rel(badge),
    ui: {
      x: (uiX0 + uiX1) / 2 - center[0],
      y: (uiY0 + uiY1) / 2 - center[1],
      w: uiX1 - uiX0,
      h: uiY1 - uiY0,
    },
  };
}

// ---------- Mini interfaces (canvas 2D, unidades locales, y hacia abajo) ----------

interface Palette {
  strong: string; // azul de marca del tema
  soft: string; // gris de texto secundario
  text: string;
  ink: string; // casi blanco (íconos y texto sobre azul)
  fill: string;
  fillAlpha: number;
  borderAlpha: number;
  flash: string;
  slotAlpha: number;
  badgeGlow: number;
  additive: boolean;
}

function makePalette(isDark: boolean): Palette {
  return isDark
    ? {
        strong: colors.brand.primaryDark,
        soft: colors.dark.textMuted,
        text: colors.dark.text,
        ink: colors.dark.text,
        fill: colors.dark.surface,
        fillAlpha: 0.74,
        borderAlpha: 0.5,
        flash: colors.dark.text,
        slotAlpha: 0.22,
        badgeGlow: 0.45,
        additive: true,
      }
    : {
        strong: colors.brand.primary,
        soft: colors.light.textMuted,
        text: colors.light.text,
        ink: colors.light.surface,
        fill: colors.light.surface,
        fillAlpha: 0.86,
        borderAlpha: 0.3,
        flash: colors.brand.primaryDark,
        slotAlpha: 0.24,
        badgeGlow: 0.22,
        additive: false,
      };
}

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

// "Línea de texto" de la mini interfaz: barra con extremos redondeados.
function textLine(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, t: number, color: string) {
  rr(ctx, x, y - t / 2, w, t, t / 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// 1) Chat del agente de IA: mensajes entrantes/salientes, "escribiendo…" y campo de texto.
function drawChat(ctx: CanvasRenderingContext2D, w: number, h: number, P: Palette) {
  const line = 0.028;
  const bh = Math.min(0.2, h * 0.24);
  const gap = Math.min(0.07, h * 0.07);
  let y = 0;
  const iw = w * 0.64;
  rr(ctx, 0, y, iw, bh, 0.06);
  ctx.fillStyle = rgba(P.soft, 0.16);
  ctx.fill();
  textLine(ctx, 0.07, y + bh * 0.36, iw * 0.72, line, rgba(P.soft, 0.75));
  textLine(ctx, 0.07, y + bh * 0.68, iw * 0.46, line, rgba(P.soft, 0.5));
  y += bh + gap;
  const ow = w * 0.56;
  rr(ctx, w - ow, y, ow, bh, 0.06);
  ctx.fillStyle = rgba(P.strong, 0.92);
  ctx.fill();
  textLine(ctx, w - ow + 0.07, y + bh * 0.36, ow * 0.74, line, rgba(P.ink, 0.92));
  textLine(ctx, w - ow + 0.07, y + bh * 0.68, ow * 0.5, line, rgba(P.ink, 0.65));
  y += bh + gap;
  const th = bh * 0.62;
  rr(ctx, 0, y, 0.34, th, th / 2);
  ctx.fillStyle = rgba(P.soft, 0.16);
  ctx.fill();
  [0.9, 0.6, 0.35].forEach((a, i) => dot(ctx, 0.09 + i * 0.08, y + th / 2, 0.024, rgba(P.strong, a)));
  const ih = Math.min(0.13, h * 0.15);
  const iy = h - ih;
  rr(ctx, 0, iy, w, ih, ih / 2);
  ctx.lineWidth = 0.012;
  ctx.strokeStyle = rgba(P.soft, 0.4);
  ctx.stroke();
  textLine(ctx, 0.08, iy + ih / 2, w * 0.4, line * 0.8, rgba(P.soft, 0.35));
  dot(ctx, w - ih / 2, iy + ih / 2, ih * 0.34, P.strong);
}

// 2) CRM: lista de clientes con avatar, nombre, dato y estado.
function drawCRM(ctx: CanvasRenderingContext2D, w: number, h: number, P: Palette) {
  const rh = h / 3;
  const r = Math.min(0.075, rh * 0.3);
  const pills = [rgba(P.strong, 0.92), rgba(P.strong, 0.32), rgba(P.soft, 0.26)];
  for (let i = 0; i < 3; i++) {
    const cy = rh * (i + 0.5);
    dot(ctx, r, cy, r, i === 0 ? P.strong : rgba(P.soft, 0.32));
    textLine(ctx, 2 * r + 0.08, cy - rh * 0.14, w * 0.36, 0.03, rgba(P.text, 0.75));
    textLine(ctx, 2 * r + 0.08, cy + rh * 0.16, w * 0.24, 0.024, rgba(P.soft, 0.5));
    const pw = Math.min(0.26, w * 0.2);
    const ph = 0.075;
    rr(ctx, w - pw, cy - ph / 2, pw, ph, ph / 2);
    ctx.fillStyle = pills[i];
    ctx.fill();
    if (i < 2) {
      ctx.fillStyle = rgba(P.soft, 0.14);
      ctx.fillRect(0, rh * (i + 1) - 0.004, w, 0.008);
    }
  }
}

// 3) Automatización: disparador → proceso → dos ramas.
function drawFlow(ctx: CanvasRenderingContext2D, w: number, h: number, P: Palette) {
  const nw = Math.min(0.34, w * 0.27);
  const nh = Math.min(0.17, h * 0.22);
  const n1 = { x: 0, y: h / 2 - nh / 2 };
  const n2 = { x: w * 0.5 - nw / 2, y: h / 2 - nh / 2 };
  const n3 = { x: w - nw, y: 0.02 };
  const n4 = { x: w - nw, y: h - nh - 0.02 };
  ctx.lineWidth = 0.016;
  ctx.strokeStyle = rgba(P.strong, 0.75);
  ctx.lineCap = "round";
  const link = (ax: number, ay: number, bx: number, by: number) => {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    const mx = (ax + bx) / 2;
    ctx.bezierCurveTo(mx, ay, mx, by, bx, by);
    ctx.stroke();
    dot(ctx, bx, by, 0.022, P.strong);
  };
  link(n1.x + nw, h / 2, n2.x, h / 2);
  link(n2.x + nw, h / 2, n3.x, n3.y + nh / 2);
  link(n2.x + nw, h / 2, n4.x, n4.y + nh / 2);
  const node = (n: { x: number; y: number }, fill: string, stroke: string | null, ink: string) => {
    rr(ctx, n.x, n.y, nw, nh, 0.045);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.lineWidth = 0.012;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
    textLine(ctx, n.x + 0.06, n.y + nh / 2, nw * 0.55, 0.026, ink);
  };
  node(n1, rgba(P.strong, 0.92), null, rgba(P.ink, 0.9));
  node(n2, rgba(P.strong, 0.16), rgba(P.strong, 0.6), rgba(P.text, 0.6));
  node(n3, rgba(P.soft, 0.14), rgba(P.soft, 0.35), rgba(P.soft, 0.6));
  node(n4, rgba(P.soft, 0.14), rgba(P.soft, 0.35), rgba(P.soft, 0.6));
}

// 4) Campaña: indicadores y gráfico de línea con área.
function drawCampaign(ctx: CanvasRenderingContext2D, w: number, h: number, P: Palette) {
  const kh = h * 0.2;
  textLine(ctx, 0, kh * 0.3, w * 0.2, 0.05, rgba(P.strong, 0.95));
  textLine(ctx, 0, kh * 0.8, w * 0.13, 0.024, rgba(P.soft, 0.5));
  textLine(ctx, w * 0.34, kh * 0.3, w * 0.15, 0.05, rgba(P.text, 0.7));
  textLine(ctx, w * 0.34, kh * 0.8, w * 0.11, 0.024, rgba(P.soft, 0.5));
  const top = kh + 0.06;
  const bottom = h - 0.03;
  const ch = bottom - top;
  ctx.fillStyle = rgba(P.soft, 0.14);
  for (let k = 0; k < 3; k++) ctx.fillRect(0, top + (ch * k) / 3, w, 0.006);
  const vals = [0.18, 0.26, 0.22, 0.38, 0.33, 0.5, 0.47, 0.66, 0.62, 0.86];
  const pts = vals.map((v, i) => [(w - 0.05) * (i / (vals.length - 1)), bottom - ch * v] as V2);
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.lineTo(pts[pts.length - 1][0], bottom);
  ctx.lineTo(0, bottom);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, top, 0, bottom);
  g.addColorStop(0, rgba(P.strong, 0.36));
  g.addColorStop(1, rgba(P.strong, 0));
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.lineWidth = 0.02;
  ctx.lineJoin = "round";
  ctx.strokeStyle = P.strong;
  ctx.stroke();
  const [lx, ly] = pts[pts.length - 1];
  dot(ctx, lx, ly, 0.045, rgba(P.strong, 0.25));
  dot(ctx, lx, ly, 0.022, P.strong);
}

// 5) Embudo de conversión: 4 etapas y su valor.
function drawFunnel(ctx: CanvasRenderingContext2D, w: number, h: number, P: Palette) {
  const gap = 0.035;
  const sh = (h - gap * 3) / 4;
  const fw = w * 0.6;
  const cx = fw / 2;
  const widths = [1, 0.74, 0.52, 0.32, 0.22];
  const alphas = [0.95, 0.72, 0.52, 0.36];
  for (let i = 0; i < 4; i++) {
    const y = i * (sh + gap);
    const wt = (fw * widths[i]) / 2;
    const wb = (fw * widths[i + 1]) / 2;
    ctx.beginPath();
    ctx.moveTo(cx - wt, y);
    ctx.lineTo(cx + wt, y);
    ctx.lineTo(cx + wb, y + sh);
    ctx.lineTo(cx - wb, y + sh);
    ctx.closePath();
    ctx.fillStyle = rgba(P.strong, alphas[i]);
    ctx.fill();
    dot(ctx, fw + 0.08, y + sh / 2, 0.02, rgba(P.strong, 0.8));
    textLine(ctx, fw + 0.14, y + sh / 2, (w - fw - 0.16) * [1, 0.78, 0.56, 0.4][i], 0.028, rgba(P.text, 0.6));
  }
}

// 6) Analítica: barras con promedio.
function drawBars(ctx: CanvasRenderingContext2D, w: number, h: number, P: Palette) {
  const n = 7;
  const base = h - 0.03;
  const maxH = h - 0.08;
  const vals = [0.32, 0.46, 0.4, 0.58, 0.52, 0.74, 0.94];
  const slot = w / n;
  const bw = slot * 0.56;
  ctx.fillStyle = rgba(P.soft, 0.3);
  ctx.fillRect(0, base, w, 0.008);
  vals.forEach((v, i) => {
    const bh = maxH * v;
    rr(ctx, i * slot + (slot - bw) / 2, base - bh, bw, bh, [Math.min(0.03, bw / 3), Math.min(0.03, bw / 3), 0, 0]);
    ctx.fillStyle = i >= 5 ? rgba(P.strong, 0.95) : rgba(P.strong, 0.38);
    ctx.fill();
  });
  ctx.setLineDash([0.05, 0.035]);
  ctx.beginPath();
  ctx.moveTo(0, base - maxH * 0.55);
  ctx.lineTo(w, base - maxH * 0.55);
  ctx.lineWidth = 0.01;
  ctx.strokeStyle = rgba(P.soft, 0.55);
  ctx.stroke();
  ctx.setLineDash([]);
}

const PANELS: PanelDef[] = [
  // Tecnología: 1) desde arriba, 2) desde la izquierda, 3) desde abajo
  buildPanel(0, 0, MessagesSquare, [0, 1.7, 0.4], drawChat),
  buildPanel(0, 1, Users, [-1.7, 0, 0.4], drawCRM),
  buildPanel(0, 2, Workflow, [0, -1.7, 0.4], drawFlow),
  // Marketing: 4) desde arriba a la derecha, 5) desde la derecha, 6) desde abajo a la derecha
  buildPanel(1, 0, Megaphone, [1.3, 1.3, 0.4], drawCampaign),
  buildPanel(1, 1, Filter, [1.7, 0, 0.4], drawFunnel),
  buildPanel(1, 2, BarChart3, [1.3, -1.3, 0.4], drawBars),
];

// Puntos de la costura (mitades ya unidas): tramo inclinado por fila y salto entre filas.
const SEAM_POINTS: V2[] = SEAM.flatMap(([sT, sB], r) => [
  [sT, ROW_TOP[r]] as V2,
  [sB, ROW_TOP[r] - ROW_H[r]] as V2,
]);

// Anclas de las etiquetas (sobre el centro de la fila superior de cada mitad; "A
// medida" bajo el extremo inferior de la costura).
const LABEL_TECH_X = (-HALF_W + SEAM[0][0]) / 2;
const LABEL_MKT_X = (SEAM[0][0] + HALF_W) / 2;

// Extensión en pantalla del conjunto con la inclinación aplicada (mitades separadas).
const EXTENTS = (() => {
  const q = new THREE.Quaternion().setFromEuler(TILT);
  let left = Infinity;
  let right = -Infinity;
  let top = -Infinity;
  let bottom = Infinity;
  for (const x of [-(HALF_W + SPLIT), HALF_W + SPLIT]) {
    for (const y of [-TOP, TOP]) {
      const v = new THREE.Vector3(x, y, 0).applyQuaternion(q);
      left = Math.min(left, v.x);
      right = Math.max(right, v.x);
      top = Math.max(top, v.y);
      bottom = Math.min(bottom, v.y);
    }
  }
  return { left: -left, right, top, bottom: -bottom };
})();

// Reserva en px para las etiquetas y márgenes del encuadre.
const LABEL_TOP_PX = 44;
const LABEL_BOTTOM_PX = 56;
const TEXT_GAP = 40;
const EDGE_MARGIN = 20;
const BAND_PAD = 16;
const PERSPECTIVE_MARGIN = 0.92;

// ---------- Texturas ----------

// Convierte el <svg> que renderizó lucide-react en Path2D (mismos trazos que el ícono
// real, sin redibujarlo a mano).
function svgToPaths(svg: SVGSVGElement): Path2D[] {
  const num = (el: Element, a: string) => parseFloat(el.getAttribute(a) || "0");
  const out: Path2D[] = [];
  svg.querySelectorAll("path, rect, circle, line, polyline, polygon, ellipse").forEach((el) => {
    const p = new Path2D();
    switch (el.tagName) {
      case "path":
        p.addPath(new Path2D(el.getAttribute("d") || ""));
        break;
      case "rect":
        p.roundRect(num(el, "x"), num(el, "y"), num(el, "width"), num(el, "height"), num(el, "rx"));
        break;
      case "circle":
        p.arc(num(el, "cx"), num(el, "cy"), num(el, "r"), 0, Math.PI * 2);
        break;
      case "ellipse":
        p.ellipse(num(el, "cx"), num(el, "cy"), num(el, "rx"), num(el, "ry"), 0, 0, Math.PI * 2);
        break;
      case "line":
        p.moveTo(num(el, "x1"), num(el, "y1"));
        p.lineTo(num(el, "x2"), num(el, "y2"));
        break;
      default: {
        const pts = (el.getAttribute("points") || "").trim().split(/[\s,]+/).map(Number);
        for (let i = 0; i + 1 < pts.length; i += 2) {
          if (i) p.lineTo(pts[i], pts[i + 1]);
          else p.moveTo(pts[i], pts[i + 1]);
        }
        if (el.tagName === "polygon") p.closePath();
      }
    }
    out.push(p);
  });
  return out;
}

function canvasTexture(cv: HTMLCanvasElement, anisotropy: number) {
  const t = new THREE.CanvasTexture(cv);
  // Premultiplicado al subir: sin halos oscuros al filtrar los bordes transparentes.
  t.premultiplyAlpha = true;
  t.anisotropy = anisotropy;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

function makeCanvas(wUnits: number, hUnits: number, ppu: number) {
  const cv = document.createElement("canvas");
  cv.width = Math.ceil(wUnits * ppu);
  cv.height = Math.ceil(hUnits * ppu);
  const ctx = cv.getContext("2d");
  if (ctx) ctx.scale(cv.width / wUnits, cv.height / hUnits);
  return { cv, ctx };
}

const BADGE_TEX = BADGE_R * 2 * 1.45; // la insignia + su halo

function makeBadgeTexture(paths: Path2D[], P: Palette, ppu: number, anisotropy: number) {
  const { cv, ctx } = makeCanvas(BADGE_TEX, BADGE_TEX, ppu);
  if (ctx) {
    const C = BADGE_TEX / 2;
    const R = BADGE_R;
    const halo = ctx.createRadialGradient(C, C, R * 0.85, C, C, C);
    halo.addColorStop(0, rgba(P.strong, P.badgeGlow));
    halo.addColorStop(1, rgba(P.strong, 0));
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, BADGE_TEX, BADGE_TEX);
    const disc = ctx.createLinearGradient(C - R, C - R, C + R, C + R);
    disc.addColorStop(0, colors.brand.primaryDark);
    disc.addColorStop(1, colors.brand.primary);
    ctx.beginPath();
    ctx.arc(C, C, R, 0, Math.PI * 2);
    ctx.fillStyle = disc;
    ctx.fill();
    ctx.lineWidth = R * 0.06;
    ctx.strokeStyle = rgba(P.ink, 0.35);
    ctx.beginPath();
    ctx.arc(C, C, R - ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.stroke();
    // Ícono lucide (24×24) en trazo grueso casi blanco.
    const s = (R * 1.1) / 24;
    ctx.save();
    ctx.translate(C - 12 * s, C - 12 * s);
    ctx.scale(s, s);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = P.ink;
    paths.forEach((p) => ctx.stroke(p));
    ctx.restore();
  }
  return canvasTexture(cv, anisotropy);
}

function makeUiTexture(def: PanelDef, P: Palette, ppu: number, anisotropy: number) {
  const w = def.ui.w + 2 * UI_BLEED;
  const h = def.ui.h + 2 * UI_BLEED;
  const { cv, ctx } = makeCanvas(w, h, ppu);
  if (ctx) {
    ctx.translate(UI_BLEED, UI_BLEED);
    def.draw(ctx, def.ui.w, def.ui.h, P);
  }
  return canvasTexture(cv, anisotropy);
}

// ---------- Shaders ----------

const panelVertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
// Panel por SDF (cuadrilátero con esquinas redondeadas): relleno translúcido, borde
// emisivo y destello al encajar. uDash: contorno punteado del hueco (p=0).
// Salida premultiplicada; en tema oscuro el halo suma luz (alfa 0 = aditivo).
const panelFragment = /* glsl */ `
  uniform vec2 uV[4];
  uniform float uRadius;
  uniform float uHalfH;
  uniform vec3 uFill;
  uniform float uFillA;
  uniform vec3 uBorder;
  uniform float uBorderA;
  uniform vec3 uFlashColor;
  uniform float uFlash;
  uniform float uOpacity;
  uniform float uDash;
  uniform float uAdditive;
  varying vec2 vPos;
  void edge(vec2 p, vec2 vi, vec2 vj, inout float d, inout float s) {
    vec2 e = vj - vi;
    vec2 w = p - vi;
    vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
    d = min(d, dot(b, b));
    bvec3 c = bvec3(p.y >= vi.y, p.y < vj.y, e.x * w.y > e.y * w.x);
    if (all(c) || all(not(c))) s *= -1.0;
  }
  float sdQuad(vec2 p) {
    float d = dot(p - uV[0], p - uV[0]);
    float s = 1.0;
    edge(p, uV[0], uV[3], d, s);
    edge(p, uV[1], uV[0], d, s);
    edge(p, uV[2], uV[1], d, s);
    edge(p, uV[3], uV[2], d, s);
    return s * sqrt(d);
  }
  void main() {
    float d = sdQuad(vPos) - uRadius;
    float aa = fwidth(d) * 0.8 + 1e-5;
    float inside = 1.0 - smoothstep(-aa, aa, d);
    float bw = 0.006;
    float border = 1.0 - smoothstep(bw - aa, bw + aa, abs(d + bw));
    if (uDash > 0.5) {
      float k = fract((vPos.x - vPos.y) * 7.0);
      border *= step(0.5, k);
    }
    float grad = 0.82 + 0.18 * clamp(vPos.y / uHalfH * 0.5 + 0.5, 0.0, 1.0);
    float fa = uFillA * inside * grad;
    vec3 bc = mix(uBorder, uFlashColor, uFlash);
    float ba = clamp(uBorderA + 0.75 * uFlash, 0.0, 1.0) * border;
    float a = ba + fa * (1.0 - ba);
    vec3 col = (bc * ba + uFill * fa * (1.0 - ba)) / max(a, 1e-4);
    float g = exp(-abs(d) / 0.05) * uFlash * 0.65;
    vec3 rgb = (col * a + uFlashColor * g) * uOpacity;
    float alpha = (a + g * (1.0 - uAdditive)) * uOpacity;
    gl_FragColor = vec4(rgb, min(alpha, 1.0));
  }
`;
const texVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
// Textura premultiplicada con revelado de izquierda a derecha (mini interfaz).
const texFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uReveal;
  varying vec2 vUv;
  void main() {
    float e = 0.12;
    float m = clamp((uReveal * (1.0 + e) - vUv.x) / e, 0.0, 1.0);
    gl_FragColor = texture2D(uMap, vUv) * (m * uOpacity);
  }
`;
const seamVertex = /* glsl */ `
  attribute float aT;
  attribute float aV;
  varying float vT;
  varying float vV;
  void main() {
    vT = aT;
    vV = aV;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
// Costura: núcleo + halo verde, encendido de arriba abajo (uReveal) y un pulso que la
// recorre (uPulse, posición a lo largo de la costura).
const seamFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHot;
  uniform float uGlow;
  uniform float uReveal;
  uniform float uPulse;
  uniform float uHalfW;
  uniform float uCore;
  uniform float uAdditive;
  varying float vT;
  varying float vV;
  void main() {
    float dist = abs(vV) * uHalfW;
    float core = 1.0 - smoothstep(uCore * 0.5, uCore, dist);
    float halo = exp(-dist / 0.03) * (1.0 - smoothstep(uHalfW * 0.6, uHalfW, dist));
    float lit = 1.0 - smoothstep(uReveal - 0.06, uReveal, vT);
    float pk = exp(-pow((vT - uPulse) / 0.04, 2.0));
    float c = (core * (0.9 + 0.1 * pk)) * lit * uGlow;
    float h = (halo * (0.45 * lit + 0.9 * pk)) * uGlow;
    vec3 col = mix(uColor, uHot, pk * 0.65);
    vec3 rgb = col * (c + h);
    float alpha = c + h * (1.0 - uAdditive);
    gl_FragColor = vec4(rgb, min(alpha, 1.0));
  }
`;

// Cinta (quad strip) a lo largo de la costura, con uniones a inglete.
function buildSeamRibbon(pts: V2[], halfW: number) {
  const n = pts.length;
  const lens = [0];
  for (let i = 1; i < n; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = lens[n - 1];
  const segN = (i: number): V2 => {
    const dx = pts[i + 1][0] - pts[i][0];
    const dy = pts[i + 1][1] - pts[i][1];
    const l = Math.hypot(dx, dy);
    return [-dy / l, dx / l];
  };
  const pos: number[] = [];
  const t: number[] = [];
  const v: number[] = [];
  for (let i = 0; i < n; i++) {
    let nx: number;
    let ny: number;
    if (i === 0) [nx, ny] = segN(0);
    else if (i === n - 1) [nx, ny] = segN(n - 2);
    else {
      const a = segN(i - 1);
      const b = segN(i);
      nx = a[0] + b[0];
      ny = a[1] + b[1];
      const l = Math.hypot(nx, ny);
      nx /= l;
      ny /= l;
      const miter = 1 / Math.max(0.35, nx * a[0] + ny * a[1]);
      nx *= miter;
      ny *= miter;
    }
    for (const side of [-1, 1]) {
      pos.push(pts[i][0] + nx * halfW * side, pts[i][1] + ny * halfW * side, 0);
      t.push(lens[i] / total);
      v.push(side);
    }
  }
  const index: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = i * 2;
    index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aT", new THREE.Float32BufferAttribute(t, 1));
  g.setAttribute("aV", new THREE.Float32BufferAttribute(v, 1));
  g.setIndex(index);
  return g;
}

// Colores de marca tal cual (sRGB) para los shaders: la escena compone en sRGB, igual
// que el CSS de la página, y los shaders no aplican conversión de salida.
const raw = (hex: string) => new THREE.Color().setHex(parseInt(hex.slice(1), 16), THREE.LinearSRGBColorSpace);

// ---------- Escena ----------

interface Layout {
  cx: number;
  cy: number;
  k: number;
}

interface DashboardLabels {
  technology: string;
  marketing: string;
  tailored: string;
}

interface SceneProps {
  isDark: boolean;
  instant: boolean;
  labels: DashboardLabels;
  layoutRef: React.RefObject<Layout | null>;
  progressRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  invalidateRef: React.RefObject<(() => void) | null>;
  iconSource: HTMLDivElement;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

const SEAM_HALF_W = 0.1;

function DashboardScene({ isDark, instant, labels, layoutRef, progressRef, pointerRef, invalidateRef, iconSource, rootRef }: SceneProps) {
  const { size, gl, invalidate } = useThree();
  const placeRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);
  const halfRefs = useRef<(THREE.Group | null)[]>([]);
  const panelRefs = useRef<(THREE.Group | null)[]>([]);
  const iconRefs = useRef<(THREE.Mesh | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallax = useRef({ x: 0, y: 0 });
  const last = useRef({ p: -1, cx: 0, cy: 0, k: 0, w: 0, h: 0 });

  useEffect(() => {
    invalidateRef.current = invalidate;
    gl.domElement.setAttribute("aria-hidden", "true");
    invalidate();
    return () => {
      invalidateRef.current = null;
    };
  }, [invalidate, invalidateRef, gl]);

  // Íconos reales de lucide-react (renderizados ocultos por el componente padre).
  const iconPaths = useMemo(() => {
    const svgs = iconSource.querySelectorAll("svg");
    return PANELS.map((_, i) => (svgs[i] ? svgToPaths(svgs[i] as SVGSVGElement) : []));
  }, [iconSource]);

  const pal = useMemo(() => makePalette(isDark), [isDark]);

  // Texturas nítidas, generadas una vez por tema: resolución = px por unidad máximos ×
  // devicePixelRatio (tope 2), con mipmaps y anisotropía.
  const textures = useMemo(() => {
    const ppu = K_MAX * Math.min(2, window.devicePixelRatio || 1);
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    return PANELS.map((def, i) => ({
      badge: makeBadgeTexture(iconPaths[i], pal, ppu, aniso),
      ui: makeUiTexture(def, pal, ppu, aniso),
    }));
  }, [pal, iconPaths, gl]);

  const geometries = useMemo(
    () => ({
      bodies: PANELS.map((d) => new THREE.PlaneGeometry(d.size[0] + 2 * GLOW_MARGIN, d.size[1] + 2 * GLOW_MARGIN)),
      uis: PANELS.map((d) => new THREE.PlaneGeometry(d.ui.w + 2 * UI_BLEED, d.ui.h + 2 * UI_BLEED)),
      badge: new THREE.PlaneGeometry(BADGE_TEX, BADGE_TEX),
      seam: buildSeamRibbon(SEAM_POINTS, SEAM_HALF_W),
    }),
    []
  );

  const materials = useMemo(() => {
    const common = { transparent: true, depthWrite: false, depthTest: false, premultipliedAlpha: true };
    const additive = pal.additive ? 1 : 0;
    const panelMat = (def: PanelDef, slot: boolean) =>
      new THREE.ShaderMaterial({
        ...common,
        vertexShader: panelVertex,
        fragmentShader: panelFragment,
        uniforms: {
          uV: { value: def.inset.map(([x, y]) => new THREE.Vector2(x, y)) },
          uRadius: { value: CORNER },
          uHalfH: { value: def.size[1] / 2 },
          uFill: { value: raw(pal.fill) },
          uFillA: { value: slot ? 0 : pal.fillAlpha },
          uBorder: { value: raw(pal.strong) },
          uBorderA: { value: slot ? pal.slotAlpha : pal.borderAlpha },
          uFlashColor: { value: raw(pal.flash) },
          uFlash: { value: 0 },
          uOpacity: { value: 1 },
          uDash: { value: slot ? 1 : 0 },
          uAdditive: { value: additive },
        },
      });
    const texMat = (map: THREE.Texture) =>
      new THREE.ShaderMaterial({
        ...common,
        vertexShader: texVertex,
        fragmentShader: texFragment,
        uniforms: { uMap: { value: map }, uOpacity: { value: 0 }, uReveal: { value: 1 } },
      });
    return {
      bodies: PANELS.map((d) => panelMat(d, false)),
      slots: PANELS.map((d) => panelMat(d, true)),
      uis: textures.map((t) => texMat(t.ui)),
      badges: textures.map((t) => texMat(t.badge)),
      seam: new THREE.ShaderMaterial({
        ...common,
        side: THREE.DoubleSide,
        vertexShader: seamVertex,
        fragmentShader: seamFragment,
        uniforms: {
          uColor: { value: raw(colors.brand.aiAccent) },
          // Pulso: en oscuro el verde se aclara hacia el casi blanco del tema; en claro
          // se queda en el verde pleno (un blanco desaparecería sobre el fondo).
          uHot: { value: raw(isDark ? colors.dark.text : colors.brand.aiAccent) },
          uGlow: { value: 0 },
          uReveal: { value: 0 },
          uPulse: { value: -1 },
          uHalfW: { value: SEAM_HALF_W },
          uCore: { value: isDark ? 0.016 : 0.02 },
          // Blending normal también en oscuro: sumado sobre el fondo azul el verde
          // viraba a cian; así la costura conserva el #04E7AF de marca.
          uAdditive: { value: 0 },
        },
      }),
    };
  }, [pal, textures, isDark]);

  useEffect(
    () => () => {
      textures.forEach((t) => {
        t.badge.dispose();
        t.ui.dispose();
      });
    },
    [textures]
  );
  useEffect(
    () => () => {
      [...materials.bodies, ...materials.slots, ...materials.uis, ...materials.badges, materials.seam].forEach((m) => m.dispose());
    },
    [materials]
  );
  useEffect(
    () => () => {
      geometries.bodies.forEach((g) => g.dispose());
      geometries.uis.forEach((g) => g.dispose());
      geometries.badge.dispose();
      geometries.seam.dispose();
    },
    [geometries]
  );

  useEffect(() => {
    invalidate();
  }, [isDark, size, materials, invalidate]);

  useFrame(() => {
    const p = instant ? 1 : (progressRef.current ?? 0);
    let changed = false;

    // Encuadre: el conjunto en la región libre medida por el componente padre.
    const L = layoutRef.current;
    const place = placeRef.current;
    if (L && place) {
      const ppu = size.height / (2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
      place.position.set((L.cx - size.width / 2) / ppu, -(L.cy - size.height / 2) / ppu, 0);
      place.scale.setScalar(L.k / ppu);
      const l = last.current;
      if (l.cx !== L.cx || l.cy !== L.cy || l.k !== L.k || l.w !== size.width || l.h !== size.height) {
        Object.assign(l, { cx: L.cx, cy: L.cy, k: L.k, w: size.width, h: size.height });
        changed = true;
      }
    }

    // Parallax muy leve con el cursor (solo puntero fino; nunca con movimiento reducido).
    const tilt = tiltRef.current;
    if (tilt) {
      const target = instant ? { x: 0, y: 0 } : (pointerRef.current ?? { x: 0, y: 0 });
      const cur = parallax.current;
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      if (Math.abs(target.x - cur.x) > 0.0005 || Math.abs(target.y - cur.y) > 0.0005) changed = true;
      tilt.rotation.set(TILT.x - cur.y * 0.035, TILT.y + cur.x * 0.05, 0);
    }

    // Separación de las mitades hasta que se unen.
    const split = SPLIT * (1 - smooth(span(p, JOIN_WINDOW)));
    if (halfRefs.current[0]) halfRefs.current[0].position.x = -split;
    if (halfRefs.current[1]) halfRefs.current[1].position.x = split;

    PANELS.forEach((def, i) => {
      const w = span(p, PANEL_WINDOWS[i]);
      const travel = settle(clamp01(w / 0.8));
      const g = panelRefs.current[i];
      if (g) {
        const k = 1 - travel;
        g.position.set(def.center[0] + def.from[0] * k, def.center[1] + def.from[1] * k, def.from[2] * k);
      }
      // Casi invisible al inicio; la opacidad sube con retraso respecto del viaje, así
      // el tramo largo del recorrido ocurre todavía tenue.
      const opacity = START_OPACITY + (1 - START_OPACITY) * smooth(clamp01((w - 0.15) / 0.6));
      const flash = Math.exp(-Math.pow((w - 0.8) / 0.07, 2));
      const body = materials.bodies[i].uniforms;
      body.uOpacity.value = opacity;
      body.uFlash.value = flash;
      materials.slots[i].uniforms.uOpacity.value = 1 - smooth(clamp01((w - 0.55) / 0.3));
      // Al encajar: primero el ícono, luego la mini interfaz.
      const ti = clamp01((w - 0.7) / 0.15);
      materials.badges[i].uniforms.uOpacity.value = smooth(ti);
      iconRefs.current[i]?.scale.setScalar(0.55 + 0.45 * settle(ti));
      const ui = materials.uis[i].uniforms;
      ui.uOpacity.value = smooth(clamp01((w - 0.78) / 0.1));
      ui.uReveal.value = clamp01((w - 0.8) / 0.2);
    });

    const seam = materials.seam.uniforms;
    seam.uGlow.value = smooth(span(p, SEAM_LIGHT_WINDOW));
    seam.uReveal.value = -0.06 + 1.12 * smooth(span(p, SEAM_LIGHT_WINDOW));
    seam.uPulse.value = -0.12 + 1.24 * span(p, SEAM_PULSE_WINDOW);

    const labelOpacity = [span(p, LABEL_TECH_WINDOW), span(p, LABEL_MKT_WINDOW), span(p, LABEL_TAILORED_WINDOW)].map(smooth);
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      const o = labelOpacity[i];
      el.style.opacity = o.toFixed(3);
      el.style.translate = `0 ${((1 - o) * 6).toFixed(1)}px`;
    });

    if (p !== last.current.p) {
      last.current.p = p;
      changed = true;
      rootRef.current?.setAttribute("data-dashboard-progress", p.toFixed(3));
    }
    // Un frame extra tras cada cambio: las etiquetas (Html) se posicionan con las
    // matrices del frame anterior.
    if (changed) invalidate();
  });

  // Sin backdrop-blur: sobre un canvas que se redibuja con el scroll, el desenfoque
  // se recalculaba en cada frame (medido: ~10 fps menos con CPU 4×).
  const labelClass =
    "whitespace-nowrap px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[var(--color-surface)]/90 border border-[var(--color-primary)]/40 text-[var(--color-text)] shadow-sm select-none";
  const labelInitial = instant ? 1 : 0;

  return (
    <group ref={placeRef}>
      <group ref={tiltRef} rotation={TILT}>
        {[0, 1].map((half) => (
          <group
            key={half}
            ref={(el) => {
              halfRefs.current[half] = el;
            }}
          >
            {PANELS.map((def, i) =>
              def.half !== half ? null : (
                <React.Fragment key={i}>
                  {/* Contorno tenue del hueco final (visible en p=0). */}
                  <mesh
                    geometry={geometries.bodies[i]}
                    material={materials.slots[i]}
                    position={[def.center[0], def.center[1], 0]}
                    renderOrder={1}
                    frustumCulled={false}
                  />
                  <group
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    position={[def.center[0], def.center[1], 0]}
                  >
                    <mesh geometry={geometries.bodies[i]} material={materials.bodies[i]} renderOrder={10 + i * 3} frustumCulled={false} />
                    <mesh
                      geometry={geometries.uis[i]}
                      material={materials.uis[i]}
                      position={[def.ui.x, def.ui.y, 0.001]}
                      renderOrder={11 + i * 3}
                      frustumCulled={false}
                    />
                    <mesh
                      ref={(el) => {
                        iconRefs.current[i] = el;
                      }}
                      geometry={geometries.badge}
                      material={materials.badges[i]}
                      position={[def.badge[0], def.badge[1], 0.002]}
                      renderOrder={12 + i * 3}
                      frustumCulled={false}
                    />
                  </group>
                </React.Fragment>
              )
            )}
            <Html position={[half === 0 ? LABEL_TECH_X : LABEL_MKT_X, TOP, 0]} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
              <div
                ref={(el) => {
                  labelRefs.current[half] = el;
                }}
                className={labelClass}
                style={{ transform: "translate(-50%, calc(-100% - 12px))", opacity: labelInitial }}
                data-dashboard-label={half === 0 ? "technology" : "marketing"}
              >
                {half === 0 ? labels.technology : labels.marketing}
              </div>
            </Html>
          </group>
        ))}

        <mesh geometry={geometries.seam} material={materials.seam} renderOrder={40} frustumCulled={false} />

        <Html position={[SEAM[2][1], -TOP, 0]} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <div
            ref={(el) => {
              labelRefs.current[2] = el;
            }}
            className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm sm:text-base font-medium bg-[var(--color-surface)]/90 border border-[var(--color-primary)]/60 text-[var(--color-text)] shadow-md select-none"
            style={{ transform: "translate(-50%, 14px)", opacity: labelInitial, fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            data-dashboard-label="tailored"
          >
            {labels.tailored}
          </div>
        </Html>
      </group>
    </group>
  );
}

// ---------- Fallback estático mobile (<768px): estado final ----------

// PNG transparente capturado de esta misma escena (placement="background", movimiento
// reducido, 1440×900 @2x) y recortado a su contenido. Las etiquetas van como texto real
// encima, en las posiciones (% del PNG) medidas en esa captura.
const FB_W = 880;
const FB_H = 743;
const FB_LABELS: { key: keyof DashboardLabels; x: number; y: number; anchor: "above" | "below" }[] = [
  { key: "technology", x: 29.9, y: 2.7, anchor: "above" },
  { key: "marketing", x: 77.8, y: 5.1, anchor: "above" },
  { key: "tailored", x: 53, y: 98.3, anchor: "below" },
];

function DashboardStaticFallback({ labels }: { labels: DashboardLabels }) {
  return (
    <div className="relative w-full max-w-[440px] mx-auto pt-9 pb-12" data-dashboard-fallback="">
      <div className="relative w-full" style={{ aspectRatio: `${FB_W} / ${FB_H}` }}>
        {/* Una imagen por tema, conmutadas por CSS (sin esperar al estado del tema). */}
        <Image src="/images/tailored-dashboard-static-light.png" alt="" fill sizes="440px" className="object-contain dark:hidden" />
        <Image src="/images/tailored-dashboard-static-dark.png" alt="" fill sizes="440px" className="object-contain hidden dark:block" />
        {FB_LABELS.map((l) => (
          <div
            key={l.key}
            className={
              l.key === "tailored"
                ? "absolute whitespace-nowrap px-3.5 py-1 rounded-full text-sm font-medium bg-[var(--color-surface)]/90 border border-[var(--color-primary)]/60 text-[var(--color-text)] shadow-md"
                : "absolute whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--color-surface)]/85 border border-[var(--color-primary)]/40 text-[var(--color-text)] shadow-sm"
            }
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
              transform: l.anchor === "above" ? "translate(-50%, calc(-100% - 6px))" : "translate(-50%, 8px)",
              ...(l.key === "tailored" ? { fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" } : {}),
            }}
          >
            {labels[l.key]}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Componente ----------

function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

interface TailoredDashboardProps {
  placement: "background" | "inline";
  labels: DashboardLabels;
}

export function TailoredDashboard({ placement, labels }: TailoredDashboardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduced = usePrefersReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, serverFalse);
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, serverFalse);
  const rootRef = useRef<HTMLDivElement>(null);
  // Contenedor oculto con los íconos lucide; el Canvas se monta cuando ya existe.
  const [iconSource, setIconSource] = useState<HTMLDivElement | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);
  const inViewRef = useRef(true);
  const [inView, setInView] = useState(true);

  const mount3D = placement === "background" ? isDesktop : !isDesktop && !isMobile;

  // Pin + encuadre + progreso.
  useEffect(() => {
    if (!mount3D) return;
    const root = rootRef.current;
    const hero = root?.closest("section");
    if (!root || !hero) return;
    const text = hero.querySelector<HTMLElement>("[data-hero-text]");
    const h1 = hero.querySelector<HTMLElement>("h1");
    const ctas = hero.querySelector<HTMLElement>("[data-hero-ctas]");
    const track = placement === "background" ? root.closest<HTMLElement>("[data-hero-pin]") : null;
    const sticky = track?.querySelector<HTMLElement>("[data-hero-pin-sticky]") ?? null;
    const spacer = track?.querySelector<HTMLElement>("[data-hero-pin-spacer]") ?? null;
    const pin = { on: false, top: NAV_H };

    const applyPin = (on: boolean, top: number) => {
      pin.on = on;
      pin.top = top;
      if (!track || !sticky || !spacer) return;
      sticky.style.position = on ? "sticky" : "";
      sticky.style.top = on ? `${top}px` : "";
      spacer.style.display = on ? "block" : "none";
      track.dataset.pinned = on ? "true" : "false";
    };

    // El hero de Inicio (~980px) no siempre cabe en la pantalla. Si no cabe, el pin se
    // ancla más arriba (top negativo) para que los CTAs queden a la vista; solo se
    // fija si así el H1 sigue completo bajo el Navbar. Si ni eso alcanza (pantallas
    // muy bajas), no hay pin y la coreografía sigue el scroll del hero.
    const measure = () => {
      const vh = window.innerHeight;
      const heroH = hero.offsetHeight;
      let bandTop = 0;
      let bandBottom = root.clientHeight;
      if (placement === "background") {
        const fits = heroH <= vh - NAV_H;
        const ctaBottom = ctas ? offsetWithin(ctas, hero).y + ctas.offsetHeight : heroH;
        const h1Top = h1 ? offsetWithin(h1, hero).y : 0;
        const top = fits ? NAV_H : Math.min(NAV_H, vh - ctaBottom - CTA_MARGIN);
        const on = !reduced && !!track && top + h1Top >= NAV_H;
        applyPin(on, top);
        // Franja del hero visible mientras está fijo (o al cargar, sin pin).
        bandTop = on ? Math.max(0, NAV_H - top) : 0;
        bandBottom = Math.min(heroH, on ? vh - top : vh - NAV_H);
      }

      const w = root.clientWidth;
      let left: number;
      let right: number;
      if (placement === "background" && text) {
        left = offsetWithin(text, hero).x + text.offsetWidth + TEXT_GAP;
        right = w - EDGE_MARGIN;
      } else {
        left = EDGE_MARGIN;
        right = w - EDGE_MARGIN;
      }
      const top = bandTop + BAND_PAD + LABEL_TOP_PX;
      const bottom = bandBottom - BAND_PAD - LABEL_BOTTOM_PX;
      const regionW = Math.max(0, right - left);
      const regionH = Math.max(0, bottom - top);
      const E = EXTENTS;
      const k = Math.max(20, Math.min(regionW / (E.left + E.right), regionH / (E.top + E.bottom), K_MAX) * PERSPECTIVE_MARGIN);
      layoutRef.current = {
        cx: left + (regionW - (E.left + E.right) * k) / 2 + E.left * k,
        cy: top + (regionH - (E.top + E.bottom) * k) / 2 + E.top * k,
        k,
      };
    };

    const updateProgress = () => {
      let p = 1;
      if (!reduced) {
        if (placement === "background") {
          if (pin.on && track && spacer) {
            p = (pin.top - track.getBoundingClientRect().top) / Math.max(1, spacer.offsetHeight);
          } else {
            p = window.scrollY / Math.max(1, hero.offsetHeight * 0.45);
          }
        } else {
          const vh = window.innerHeight;
          p = (vh * 0.9 - root.getBoundingClientRect().top) / (vh * 0.6);
        }
      }
      p = clamp01(p);
      if (p !== progressRef.current) {
        progressRef.current = p;
        if (inViewRef.current) invalidateRef.current?.();
      }
    };

    const onResize = () => {
      measure();
      updateProgress();
      invalidateRef.current?.();
    };
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(hero);
    if (text) ro.observe(text);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", onResize);
      applyPin(false, NAV_H);
    };
  }, [mount3D, placement, reduced]);

  // Solo se dibuja mientras el visual está a la vista.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !mount3D) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.isIntersecting;
        setInView(e.isIntersecting);
        if (e.isIntersecting) invalidateRef.current?.();
      },
      { rootMargin: "100px" }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [mount3D]);

  // Parallax del cursor: solo puntero fino y sin movimiento reducido.
  useEffect(() => {
    if (!mount3D || reduced || !window.matchMedia(FINE_POINTER_QUERY).matches) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      if (inViewRef.current) invalidateRef.current?.();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      pointerRef.current = { x: 0, y: 0 };
    };
  }, [mount3D, reduced]);

  const canvas = mount3D ? (
    <>
      {/* Fuente de los íconos: los componentes reales de lucide-react, ocultos; la
          escena lee sus trazos para dibujarlos en las texturas. */}
      <div ref={setIconSource} hidden>
        {PANELS.map((d, i) => {
          const Icon = d.icon;
          return <Icon key={i} />;
        })}
      </div>
      {iconSource && (
        <Canvas
          camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          frameloop={inView ? "demand" : "never"}
        >
          <DashboardScene
            isDark={isDark}
            instant={reduced}
            labels={labels}
            layoutRef={layoutRef}
            progressRef={progressRef}
            pointerRef={pointerRef}
            invalidateRef={invalidateRef}
            iconSource={iconSource}
            rootRef={rootRef}
          />
          <WebGLRelease />
        </Canvas>
      )}
    </>
  ) : null;

  if (placement === "background") {
    return (
      <div ref={rootRef} className="absolute inset-0 hidden lg:block" data-dashboard-progress="0">
        {canvas}
      </div>
    );
  }

  return (
    <div className="lg:hidden mt-6 md:mt-10">
      {/* <768px: imagen estática, siempre en el HTML (visible desde el primer paint). */}
      <div className="md:hidden">
        <DashboardStaticFallback labels={labels} />
      </div>
      {/* 768-1023px: escena 3D en su propio bloque. */}
      <div ref={rootRef} className="hidden md:block relative w-full h-[460px]" data-dashboard-progress="0">
        {canvas}
      </div>
    </div>
  );
}
