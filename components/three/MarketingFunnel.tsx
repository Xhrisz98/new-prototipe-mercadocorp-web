"use client";

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ShoppingCart, Users, Megaphone, Workflow, type LucideIcon } from "lucide-react";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/components/theme/ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// Hero de Marketing Digital (PROJECT_PLAN.md §5.9 v2): funnel wireframe con vórtice
// interior hacia el que convergen 4 nodos etiquetados (E-commerce, CRM, Publicidad,
// Automatización). El scroll dentro del hero (0-100%, mismo mecanismo que
// DataFlowCore: window.scrollY sobre un rango, suavizado con lerp) activa los nodos
// en secuencia y, al final, el pulso de convergencia en la salida del funnel.
//
// Dos montajes, cada uno con su propio Canvas solo si su media query coincide:
// - placement="background" (≥1024px): canvas de fondo del hero; el funnel se ubica
//   en el espacio libre a la derecha del bloque de texto, medido en vivo contra
//   [data-hero-text] — nunca cruza el H1.
// - placement="inline" (<1024px): bloque debajo del texto (Hero.inlineVisual). En
//   768-1023px el costado no tiene ancho suficiente para funnel + etiquetas; en
//   <768px se muestra el fallback estático.
//
// Todo el movimiento (flujo del vórtice, partículas, líneas de luz) corre en shaders:
// no se suben buffers a la GPU por frame.

const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_QUERY = "(min-width: 1024px)";

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

// 100% del progreso al 36% del alto del hero (~300px en desktop, el mismo orden que
// DataFlowCore): al converger todavía queda a la vista buena parte del hero, así el
// funnel no tiene que encogerse para entrar.
const SCROLL_RANGE_FRACTION = 0.36;
// Ventanas de activación de cada nodo (en progreso 0-1) y del pulso de convergencia.
const NODE_WINDOWS: [number, number][] = [
  [0.06, 0.22],
  [0.26, 0.42],
  [0.46, 0.62],
  [0.66, 0.82],
];
const CONVERGE_WINDOW: [number, number] = [0.82, 1];

// Perfil del funnel (espacio local, eje +Y hacia la boca).
const Y_TOP = 1.0;
const Y_NECK = -0.72;
const Y_BOTTOM = -1.3;
const R_TOP = 1.0;
const R_NECK = 0.11;
function radiusAt(y: number) {
  if (y >= Y_NECK) return R_NECK + (R_TOP - R_NECK) * Math.pow((y - Y_NECK) / (Y_TOP - Y_NECK), 1.7);
  return R_NECK * (1 + 0.3 * Math.pow((Y_NECK - y) / (Y_NECK - Y_BOTTOM), 2));
}
const GLSL_PROFILE = /* glsl */ `
  float radiusAt(float y) {
    if (y >= ${Y_NECK.toFixed(3)}) return ${R_NECK.toFixed(3)} + ${(R_TOP - R_NECK).toFixed(3)} * pow((y - (${Y_NECK.toFixed(3)})) / ${(Y_TOP - Y_NECK).toFixed(3)}, 1.7);
    return ${R_NECK.toFixed(3)} * (1.0 + 0.3 * pow(((${Y_NECK.toFixed(3)}) - y) / ${(Y_NECK - Y_BOTTOM).toFixed(3)}, 2.0));
  }
`;
const VORTEX_TURNS = 3.2;

// Nodos (espacio local del funnel, antes de la inclinación). Alturas alternadas para
// que las etiquetas no se pisen entre sí.
const NODE_ICONS: LucideIcon[] = [ShoppingCart, Users, Megaphone, Workflow];
const NODES = [
  { angle: (200 * Math.PI) / 180, r: 1.5, y: 1.2 },
  { angle: (-20 * Math.PI) / 180, r: 1.55, y: 1.1 },
  { angle: (160 * Math.PI) / 180, r: 1.5, y: 0.45 },
  { angle: (20 * Math.PI) / 180, r: 1.5, y: 0.5 },
].map((n) => new THREE.Vector3(Math.cos(n.angle) * n.r, n.y, Math.sin(n.angle) * n.r));

// Inclinación del funnel: la boca mira hacia la cámara (elipse visible, como la
// referencia) con una leve inclinación lateral.
const TILT = new THREE.Euler(0.42, 0, -0.16);

// Extensión real del conjunto en pantalla (unidades locales), aplicando la misma
// inclinación que la escena a nodos, boca y salida. Sin esto, la rotación en Z
// levanta los nodos de la izquierda y sus etiquetas quedaban cortadas arriba.
const EXTENTS = (() => {
  const q = new THREE.Quaternion().setFromEuler(TILT);
  const pts = [...NODES.map((n) => n.clone())];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * R_TOP, Y_TOP, Math.sin(a) * R_TOP));
  }
  const exit = new THREE.Vector3(0, Y_BOTTOM, 0).applyQuaternion(q);
  let top = -Infinity;
  let left = Infinity;
  let right = -Infinity;
  for (const p of pts) {
    p.applyQuaternion(q);
    top = Math.max(top, p.y);
    left = Math.min(left, p.x);
    right = Math.max(right, p.x);
  }
  // +0.45 abajo: radio del pulso de convergencia.
  return { top, bottom: -exit.y + 0.45, left: -left, right };
})();

// Reserva en px para las etiquetas (centradas sobre cada nodo) y márgenes.
const LABEL_HALF_W = 72;
const LABEL_H = 42; // chip + separación sobre el nodo
const PAD = 14;
// La perspectiva agranda lo que queda más cerca de la cámara: margen de seguridad.
const PERSPECTIVE_MARGIN = 0.92;
const TEXT_GAP = 40;
const EDGE_MARGIN = 20;

const CAMERA_Z = 8;
const FOV = 35;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const span = (p: number, [a, b]: [number, number]) => clamp01((p - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);

// ---------- Geometrías ----------

function buildWireframe() {
  const pos: number[] = [];
  const t: number[] = [];
  const push = (x: number, y: number, z: number) => {
    pos.push(x, y, z);
    t.push((Y_TOP - y) / (Y_TOP - Y_BOTTOM));
  };
  const RINGS = 30;
  const SEG = 72;
  for (let i = 0; i <= RINGS; i++) {
    const y = Y_TOP - (Y_TOP - Y_BOTTOM) * (i / RINGS);
    const r = radiusAt(y);
    for (let s = 0; s < SEG; s++) {
      const a0 = (s / SEG) * Math.PI * 2;
      const a1 = ((s + 1) / SEG) * Math.PI * 2;
      push(Math.cos(a0) * r, y, Math.sin(a0) * r);
      push(Math.cos(a1) * r, y, Math.sin(a1) * r);
    }
  }
  const MERIDIANS = 48;
  const STEPS = 44;
  for (let m = 0; m < MERIDIANS; m++) {
    const a = (m / MERIDIANS) * Math.PI * 2;
    for (let k = 0; k < STEPS; k++) {
      const y0 = Y_TOP - (Y_TOP - Y_BOTTOM) * (k / STEPS);
      const y1 = Y_TOP - (Y_TOP - Y_BOTTOM) * ((k + 1) / STEPS);
      push(Math.cos(a) * radiusAt(y0), y0, Math.sin(a) * radiusAt(y0));
      push(Math.cos(a) * radiusAt(y1), y1, Math.sin(a) * radiusAt(y1));
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aT", new THREE.Float32BufferAttribute(t, 1));
  return g;
}

function buildVortex() {
  const pos: number[] = [];
  const t: number[] = [];
  const k: number[] = [];
  const SPIRALS = 6;
  const SAMPLES = 180;
  const point = (s: number, u: number) => {
    const y = THREE.MathUtils.lerp(Y_TOP - 0.06, Y_NECK - 0.22, Math.pow(u, 0.9));
    const r = radiusAt(y) * (0.8 - 0.08 * u);
    const a = (s / SPIRALS) * Math.PI * 2 + u * VORTEX_TURNS * Math.PI * 2;
    return [Math.cos(a) * r, y, Math.sin(a) * r];
  };
  for (let s = 0; s < SPIRALS; s++) {
    for (let i = 0; i < SAMPLES; i++) {
      const u0 = i / SAMPLES;
      const u1 = (i + 1) / SAMPLES;
      pos.push(...point(s, u0), ...point(s, u1));
      t.push(u0, u1);
      k.push(s / SPIRALS, s / SPIRALS);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aT", new THREE.Float32BufferAttribute(t, 1));
  g.setAttribute("aK", new THREE.Float32BufferAttribute(k, 1));
  return g;
}

function buildVortexParticles(count: number) {
  const seed = new Float32Array(count);
  const kk = new Float32Array(count);
  const jit = new Float32Array(count);
  let a = 12345;
  const rand = () => {
    a = (a * 1664525 + 1013904223) % 4294967296;
    return a / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    seed[i] = rand();
    kk[i] = rand();
    jit[i] = rand();
  }
  const g = new THREE.BufferGeometry();
  // La posición real la calcula el vertex shader; esta solo evita el culling.
  g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(count * 3), 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  g.setAttribute("aK", new THREE.BufferAttribute(kk, 1));
  g.setAttribute("aJit", new THREE.BufferAttribute(jit, 1));
  return g;
}

// Línea de luz de un nodo hacia la boca del funnel (bezier cuadrática).
function buildNodeLine(node: THREE.Vector3) {
  const dir = new THREE.Vector2(node.x, node.z).normalize();
  const end = new THREE.Vector3(dir.x * R_TOP * 0.92, Y_TOP - 0.02, dir.y * R_TOP * 0.92);
  const ctrl = node.clone().add(end).multiplyScalar(0.5);
  ctrl.y += 0.55;
  ctrl.x += dir.x * 0.25;
  ctrl.z += dir.y * 0.25;
  const curve = new THREE.QuadraticBezierCurve3(node.clone(), ctrl, end);
  const pts = curve.getPoints(64);
  const pos: number[] = [];
  const t: number[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    pos.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
    t.push(i / (pts.length - 1), (i + 1) / (pts.length - 1));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aT", new THREE.Float32BufferAttribute(t, 1));
  return g;
}

function makeGlowTexture() {
  const size = 128;
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const ctx = cv.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- Shaders ----------

const wireVertex = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const wireFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform float uAlpha;
  varying float vT;
  void main() {
    vec3 c = mix(uTop, uBottom, vT);
    float rim = 1.0 - smoothstep(0.0, 0.03, vT);
    float a = uAlpha * (0.45 + 0.55 * (1.0 - vT) + rim * 0.8);
    gl_FragColor = vec4(c, a);
  }
`;
const vortexVertex = /* glsl */ `
  attribute float aT;
  attribute float aK;
  varying float vT;
  varying float vK;
  void main() {
    vT = aT;
    vK = aK;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const vortexFragment = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uInner;
  uniform vec3 uHighlight;
  varying float vT;
  varying float vK;
  void main() {
    float f = fract(vT * 2.4 - uTime * 0.35 + vK * 0.37);
    float streak = smoothstep(0.0, 0.55, f) * (1.0 - smoothstep(0.55, 1.0, f));
    streak = pow(streak, 1.6);
    float a = uIntensity * (0.08 + 0.92 * streak) * (0.35 + 0.65 * vT);
    vec3 c = mix(uInner, uHighlight, streak * (0.4 + 0.6 * vT));
    gl_FragColor = vec4(c, a);
  }
`;
const particleVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aK;
  attribute float aJit;
  uniform float uTime;
  uniform float uPx;
  varying float vT;
  ${GLSL_PROFILE}
  void main() {
    float t = fract(aSeed + uTime * 0.11);
    vT = t;
    float y = mix(${(Y_TOP - 0.05).toFixed(3)}, ${(Y_NECK - 0.25).toFixed(3)}, t);
    float r = radiusAt(y) * (0.3 + 0.5 * aJit);
    float a = aK * 6.2831853 + t * ${VORTEX_TURNS.toFixed(2)} * 6.2831853;
    vec3 p = vec3(cos(a) * r, y, sin(a) * r);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + 2.6 * t) * uPx / -mv.z;
  }
`;
const particleFragment = /* glsl */ `
  uniform float uIntensity;
  uniform vec3 uHighlight;
  varying float vT;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float soft = 1.0 - smoothstep(0.1, 0.5, r);
    float fade = smoothstep(0.0, 0.12, vT) * (1.0 - smoothstep(0.88, 1.0, vT));
    gl_FragColor = vec4(uHighlight, soft * fade * uIntensity);
  }
`;
const lineVertex = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const lineFragment = /* glsl */ `
  uniform float uReveal;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uHighlight;
  varying float vT;
  void main() {
    if (vT > uReveal) discard;
    // Frente de avance brillante mientras se dibuja; luego pulsos fluyendo al funnel.
    float head = 1.0 - smoothstep(0.0, 0.12, uReveal - vT);
    float flow = pow(fract(vT * 2.5 - uTime * 0.9), 4.0) * step(0.999, uReveal);
    float a = 0.35 + 0.65 * max(head, flow);
    gl_FragColor = vec4(mix(uColor, uHighlight, max(head, flow)), a);
  }
`;

// ---------- Escena ----------

interface Layout {
  cx: number; // centro del funnel en px del canvas
  cy: number;
  k: number; // px por unidad local
}

interface SceneProps {
  isDark: boolean;
  instant: boolean;
  labels: [string, string, string, string];
  layoutRef: React.RefObject<Layout>;
  progressTarget: React.RefObject<number>;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

function FunnelScene({ isDark, instant, labels, layoutRef, progressTarget, rootRef }: SceneProps) {
  const { size, gl, invalidate } = useThree();
  const placeRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const exitGlowRef = useRef<THREE.Sprite>(null);
  const neckGlowRef = useRef<THREE.Sprite>(null);
  const nodeGlowRefs = useRef<(THREE.Sprite | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef(instant ? 1 : 0);
  const time = useRef(instant ? 0.6 : 0);
  const smoothLayout = useRef<Layout | null>(null);

  const wire = useMemo(() => buildWireframe(), []);
  const vortex = useMemo(() => buildVortex(), []);
  const particles = useMemo(() => buildVortexParticles(420), []);
  const nodeLines = useMemo(() => NODES.map((n) => buildNodeLine(n)), []);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const palette = useMemo(
    () => ({
      top: new THREE.Color(isDark ? colors.brand.primaryDark : colors.brand.primary),
      bottom: new THREE.Color(isDark ? colors.brand.primary : colors.brand.primaryDark),
      inner: new THREE.Color(colors.brand.primaryDark),
      // En oscuro el realce se aclara; en claro un casi-blanco desaparecería sobre el
      // fondo, así que se queda en azul vivo (mismo criterio que DataFlowCore).
      highlight: isDark ? new THREE.Color(0.62, 0.8, 1.0) : new THREE.Color(colors.brand.primaryDark),
    }),
    [isDark]
  );

  const materials = useMemo(() => {
    // Aditivo sobre fondo oscuro da el brillo de la referencia; sobre fondo claro
    // lavaría todo a blanco, así que ahí se usa blending normal.
    const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    const common = { transparent: true, depthWrite: false, blending };
    return {
      wire: new THREE.ShaderMaterial({
        ...common,
        vertexShader: wireVertex,
        fragmentShader: wireFragment,
        uniforms: { uTop: { value: palette.top }, uBottom: { value: palette.bottom }, uAlpha: { value: isDark ? 0.34 : 0.3 } },
      }),
      vortex: new THREE.ShaderMaterial({
        ...common,
        vertexShader: vortexVertex,
        fragmentShader: vortexFragment,
        uniforms: { uTime: { value: 0 }, uIntensity: { value: 0 }, uInner: { value: palette.inner }, uHighlight: { value: palette.highlight } },
      }),
      particles: new THREE.ShaderMaterial({
        ...common,
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: { uTime: { value: 0 }, uPx: { value: 300 }, uIntensity: { value: 0 }, uHighlight: { value: palette.highlight } },
      }),
      lines: NODES.map(
        () =>
          new THREE.ShaderMaterial({
            ...common,
            vertexShader: lineVertex,
            fragmentShader: lineFragment,
            uniforms: { uReveal: { value: 0 }, uTime: { value: 0 }, uColor: { value: palette.inner }, uHighlight: { value: palette.highlight } },
          })
      ),
    };
  }, [isDark, palette]);

  useEffect(
    () => () => {
      materials.wire.dispose();
      materials.vortex.dispose();
      materials.particles.dispose();
      materials.lines.forEach((m) => m.dispose());
    },
    [materials]
  );
  useEffect(
    () => () => {
      wire.dispose();
      vortex.dispose();
      particles.dispose();
      nodeLines.forEach((g) => g.dispose());
      glowTex.dispose();
    },
    [wire, vortex, particles, nodeLines, glowTex]
  );

  // Tema/tamaño: con frameloop "demand" (motion reducida o fuera de pantalla) hay
  // que pedir un frame para reflejarlo.
  useEffect(() => {
    invalidate();
  }, [isDark, size, invalidate]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!instant) {
      progress.current = THREE.MathUtils.lerp(progress.current, progressTarget.current ?? 0, 0.08);
      if (Math.abs(progress.current - (progressTarget.current ?? 0)) < 0.0005) progress.current = progressTarget.current ?? 0;
      time.current += dt;
    }
    const p = progress.current;
    const tNow = time.current;

    // Encuadre (suavizado para que el funnel acompañe el scroll sin saltos).
    const target = layoutRef.current;
    if (target) {
      const s = smoothLayout.current;
      if (!s || instant) smoothLayout.current = { ...target };
      else {
        s.cx = THREE.MathUtils.lerp(s.cx, target.cx, 0.12);
        s.cy = THREE.MathUtils.lerp(s.cy, target.cy, 0.12);
        s.k = THREE.MathUtils.lerp(s.k, target.k, 0.12);
      }
    }
    const L = smoothLayout.current;
    const place = placeRef.current;
    if (L && place) {
      const ppu = size.height / (2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
      const scale = L.k / ppu;
      place.position.set((L.cx - size.width / 2) / ppu, -(L.cy - size.height / 2) / ppu, 0);
      place.scale.setScalar(scale);
      // gl_PointSize = size · uPx / distancia (≈ CAMERA_Z): el tamaño en px escala con
      // el encuadre (k) y el pixel ratio.
      materials.particles.uniforms.uPx.value = CAMERA_Z * gl.getPixelRatio() * (L.k / 150);
    }

    // Activación secuencial de los nodos.
    const acts = NODE_WINDOWS.map((w) => smooth(span(p, w)));
    const activeSum = acts.reduce((a, b) => a + b, 0);
    const conv = smooth(span(p, CONVERGE_WINDOW));

    if (spinRef.current && !instant) spinRef.current.rotation.y += dt * 0.12;

    const vortexIntensity = 0.06 + 0.2 * activeSum + 0.14 * conv;
    materials.vortex.uniforms.uTime.value = tNow;
    materials.vortex.uniforms.uIntensity.value = vortexIntensity * (isDark ? 1 : 0.85);
    materials.particles.uniforms.uTime.value = tNow;
    materials.particles.uniforms.uIntensity.value = (0.1 + 0.18 * activeSum + 0.2 * conv) * (isDark ? 1 : 0.8);

    acts.forEach((a, i) => {
      materials.lines[i].uniforms.uReveal.value = a;
      materials.lines[i].uniforms.uTime.value = tNow + i * 0.3;
      const glow = nodeGlowRefs.current[i];
      if (glow) {
        const pulse = 1 + Math.sin(tNow * 2.2 + i) * 0.08 * a;
        glow.scale.setScalar((0.16 + 0.14 * a) * pulse);
        (glow.material as THREE.SpriteMaterial).opacity = 0.35 + 0.65 * a;
      }
      const label = labelRefs.current[i];
      if (label) {
        label.style.opacity = a.toFixed(3);
        label.style.transform = `translate(-50%, calc(-100% - 12px)) scale(${(0.9 + 0.1 * a).toFixed(3)})`;
      }
    });

    const exit = exitGlowRef.current;
    if (exit) {
      const beat = instant ? 1 : 1 + Math.sin(tNow * 3.2) * 0.18;
      exit.scale.setScalar((0.2 + 0.75 * conv) * beat);
      (exit.material as THREE.SpriteMaterial).opacity = 0.15 + 0.85 * conv;
    }
    const neck = neckGlowRef.current;
    if (neck) {
      neck.scale.setScalar(0.25 + 0.2 * (activeSum / 4) + 0.2 * conv);
      (neck.material as THREE.SpriteMaterial).opacity = 0.12 + 0.28 * (activeSum / 4) + 0.4 * conv;
    }

    rootRef.current?.setAttribute("data-funnel-progress", p.toFixed(3));
  });

  const spriteColor = isDark ? "#9EC2FF" : colors.brand.primaryDark;
  const spriteBlending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;

  return (
    <group ref={placeRef}>
      <group rotation={TILT}>
        <group ref={spinRef}>
          <lineSegments geometry={wire} material={materials.wire} frustumCulled={false} />
          <lineSegments geometry={vortex} material={materials.vortex} frustumCulled={false} />
          <points geometry={particles} material={materials.particles} frustumCulled={false} />
        </group>

        <sprite ref={neckGlowRef} position={[0, Y_NECK, 0]}>
          <spriteMaterial map={glowTex} color={spriteColor} transparent depthWrite={false} blending={spriteBlending} />
        </sprite>
        {/* Pulso de convergencia en la salida del funnel. */}
        <sprite ref={exitGlowRef} position={[0, Y_BOTTOM, 0]}>
          <spriteMaterial map={glowTex} color={spriteColor} transparent depthWrite={false} blending={spriteBlending} />
        </sprite>

        {NODES.map((n, i) => {
          const Icon = NODE_ICONS[i];
          return (
            <group key={i}>
              <lineSegments geometry={nodeLines[i]} material={materials.lines[i]} frustumCulled={false} />
              <sprite
                ref={(el) => {
                  nodeGlowRefs.current[i] = el;
                }}
                position={n}
              >
                <spriteMaterial map={glowTex} color={spriteColor} transparent depthWrite={false} blending={spriteBlending} />
              </sprite>
              <Html position={n} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
                <div
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[var(--color-surface)]/85 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text)] shadow-sm select-none"
                  style={{ opacity: 0, transform: "translate(-50%, calc(-100% - 12px)) scale(0.9)", transformOrigin: "50% 100%" }}
                  data-funnel-node={i}
                >
                  <Icon className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>{labels[i]}</span>
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

// ---------- Fallback estático mobile (<768px): estado 100% ----------

// Posiciones de los nodos en el viewBox (320×280) y el lado hacia el que se alinea
// cada etiqueta para no salirse del recuadro.
const FALLBACK_NODES = [
  { x: 48, y: 74, align: "left" },
  { x: 296, y: 62, align: "right" },
  { x: 62, y: 150, align: "left" },
  { x: 286, y: 140, align: "right" },
] as const;
const FB_CX = 180;

function FunnelStaticFallback({ labels }: { labels: [string, string, string, string] }) {
  const rings = [
    { y: 78, rx: 96, ry: 24 },
    { y: 104, rx: 70, ry: 17 },
    { y: 128, rx: 48, ry: 12 },
    { y: 150, rx: 30, ry: 8 },
    { y: 170, rx: 16, ry: 5 },
  ];
  return (
    <div className="relative w-full max-w-[380px] mx-auto aspect-[320/280]">
      <svg viewBox="0 0 320 280" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="mf-exit">
            <stop offset="0%" stopColor={colors.brand.primaryDark} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.brand.primaryDark} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Paredes del funnel */}
        <path d={`M ${FB_CX - 96} 78 C ${FB_CX - 70} 130, ${FB_CX - 14} 160, ${FB_CX - 9} 190 L ${FB_CX - 9} 238`} fill="none" stroke={colors.brand.primaryDark} strokeOpacity="0.6" strokeWidth="1.2" />
        <path d={`M ${FB_CX + 96} 78 C ${FB_CX + 70} 130, ${FB_CX + 14} 160, ${FB_CX + 9} 190 L ${FB_CX + 9} 238`} fill="none" stroke={colors.brand.primaryDark} strokeOpacity="0.6" strokeWidth="1.2" />
        {rings.map((r, i) => (
          <ellipse key={i} cx={FB_CX} cy={r.y} rx={r.rx} ry={r.ry} fill="none" stroke={i === 0 ? colors.brand.primaryDark : colors.brand.primary} strokeOpacity={i === 0 ? 0.85 : 0.45} strokeWidth={i === 0 ? 1.4 : 0.9} />
        ))}
        {/* Vórtice interior */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${FB_CX - 74 + i * 10} ${86 + i * 3} Q ${FB_CX + 60 - i * 8} ${104 + i * 4}, ${FB_CX - 30 + i * 4} ${126 + i * 3} T ${FB_CX + 12 - i * 3} ${160 + i * 2} T ${FB_CX} 196`}
            fill="none"
            stroke={colors.brand.primaryDark}
            strokeOpacity={0.8 - i * 0.18}
            strokeWidth={1.6 - i * 0.3}
            strokeLinecap="round"
          />
        ))}
        {/* Líneas de luz nodo → boca */}
        {FALLBACK_NODES.map((n, i) => {
          const endX = n.x < FB_CX ? FB_CX - 78 : FB_CX + 78;
          return (
            <path key={i} d={`M ${n.x} ${n.y} Q ${(n.x + endX) / 2} ${Math.min(n.y, 78) - 26}, ${endX} 80`} fill="none" stroke={colors.brand.primaryDark} strokeOpacity="0.75" strokeWidth="1.3" />
          );
        })}
        {FALLBACK_NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="4.5" fill={colors.brand.primaryDark} />
        ))}
        {/* Pulso de convergencia en la salida */}
        <circle cx={FB_CX} cy="244" r="30" fill="url(#mf-exit)" />
        <circle cx={FB_CX} cy="244" r="4" fill={colors.brand.primaryDark} />
      </svg>
      {FALLBACK_NODES.map((n, i) => {
        const Icon = NODE_ICONS[i];
        return (
          <div
            key={i}
            className="absolute whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--color-surface)]/90 border border-[var(--color-border)] text-[var(--color-text)] shadow-sm"
            style={{
              left: `${(n.x / 320) * 100}%`,
              top: `${(n.y / 280) * 100}%`,
              transform: `translate(${n.align === "left" ? "-18%" : "-82%"}, calc(-100% - 10px))`,
            }}
          >
            <Icon className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Componente ----------

interface MarketingFunnelProps {
  placement: "background" | "inline";
  labels: [string, string, string, string];
  ariaLabel: string;
}

export function MarketingFunnel({ placement, labels, ariaLabel }: MarketingFunnelProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, serverFalse);
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, serverFalse);
  const rootRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<Layout>({ cx: 0, cy: 0, k: 1 });
  const progressTarget = useRef(0);
  const [inView, setInView] = useState(true);

  // Qué montaje dibuja con 3D en este ancho.
  const mount3D = placement === "background" ? isDesktop : !isDesktop && !isMobile;

  // Progreso de scroll (mismo mecanismo que DataFlowCore) + encuadre medido.
  useEffect(() => {
    if (!mount3D) return;
    const root = rootRef.current;
    const hero = root?.closest("section");
    const text = hero?.querySelector<HTMLElement>("[data-hero-text]");
    if (!root || !hero) return;

    const update = () => {
      const heroH = hero.getBoundingClientRect().height;
      progressTarget.current = clamp01((window.scrollY || 0) / Math.max(1, heroH * SCROLL_RANGE_FRACTION));

      const c = root.getBoundingClientRect();
      if (c.width === 0 || c.height === 0) return;
      let left: number;
      let right: number;
      let top: number;
      let bottom: number;
      if (placement === "background" && text) {
        // Espacio libre a la derecha del texto; vertical = franja visible del hero.
        const t = text.getBoundingClientRect();
        left = t.right - c.left + TEXT_GAP;
        right = c.width - EDGE_MARGIN;
        top = Math.max(c.top, 80) - c.top;
        bottom = Math.min(window.innerHeight, c.bottom) - c.top;
      } else {
        // Bloque propio debajo del texto: el funnel se recuesta a la derecha.
        left = c.width * 0.12;
        right = c.width - EDGE_MARGIN;
        top = 0;
        bottom = c.height;
      }
      const w = Math.max(0, right - left);
      const h = Math.max(0, bottom - top);
      const E = EXTENTS;
      const innerW = w - 2 * LABEL_HALF_W;
      const innerH = h - LABEL_H - 2 * PAD;
      const k = Math.max(20, Math.min(innerW / (E.left + E.right), innerH / (E.top + E.bottom), 230) * PERSPECTIVE_MARGIN);
      // Origen local del funnel en px: el conjunto (con sus etiquetas) centrado en
      // la región libre.
      const cx = left + LABEL_HALF_W + (innerW - (E.left + E.right) * k) / 2 + E.left * k;
      const cy = top + PAD + LABEL_H + (innerH - (E.top + E.bottom) * k) / 2 + E.top * k;
      layoutRef.current = { cx, cy, k };
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    if (text) ro.observe(text);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mount3D, placement]);

  // Solo se dibuja mientras el hero está a la vista.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !mount3D) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(root);
    return () => io.disconnect();
  }, [mount3D]);

  const canvas = mount3D ? (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      frameloop={inView && !prefersReducedMotion ? "always" : "demand"}
    >
      <FunnelScene
        isDark={isDark}
        instant={prefersReducedMotion}
        labels={labels}
        layoutRef={layoutRef}
        progressTarget={progressTarget}
        rootRef={rootRef}
      />
    </Canvas>
  ) : null;

  if (placement === "background") {
    return (
      <div ref={rootRef} className="absolute inset-0 hidden lg:block" role="img" aria-label={ariaLabel} data-funnel-progress="0">
        {canvas}
      </div>
    );
  }

  return (
    <div className="lg:hidden mt-8 md:mt-10" role="img" aria-label={ariaLabel}>
      {/* <768px: fallback estático, siempre en el HTML (visible desde el primer paint). */}
      <div className="md:hidden">
        <FunnelStaticFallback labels={labels} />
      </div>
      {/* 768-1023px: funnel 3D en su propio bloque. */}
      <div ref={rootRef} className="hidden md:block relative w-full h-[400px]" data-funnel-progress="0">
        {canvas}
      </div>
    </div>
  );
}
