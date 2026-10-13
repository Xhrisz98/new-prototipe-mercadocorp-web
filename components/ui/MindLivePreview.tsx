"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  ChevronDown,
  Download,
  FolderKanban,
  Funnel,
  Handshake,
  Hourglass,
  Info,
  Landmark,
  LayoutDashboard,
  LineChart,
  ListChecks,
  LogOut,
  Megaphone,
  MessageCircle,
  Moon,
  PanelLeftClose,
  Paperclip,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  Table2,
  Columns3,
  BarChart3,
  Upload,
  UserPlus,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";

// Recreación interactiva de la interfaz real de Mind para el marco de `ProductShowcase`
// en Inicio y Mind. Las capturas reales que sirvieron de referencia visual traen datos
// de un cliente real (nombres, teléfonos, cifras, conversaciones) y NUNCA se publican:
// todo lo que se ve aquí — nombres, montos, mensajes — es de relleno, inventado para la
// demo, sin relación con ningún cliente de MercadoCorp.
//
// Cómo se ve igual a la captura a cualquier ancho: la interfaz se maqueta a un tamaño
// de diseño fijo (1180×740 en escritorio, 420×700 en mobile, sin sidebar) y se escala
// con `transform` al ancho real del marco — es lo que haría una captura, pero con la
// interfaz viva (clicks, conteos, gráficos, chat).
//
// Paleta: los colores de ESTA interfaz son los del producto Mind real (muestreados de
// su captura: fondo azul marino, tarjetas, etiquetas amarillo/verde/rojo de
// temperatura del lead, verde WhatsApp), no los del sitio de marketing; por eso viven
// aquí como variables CSS locales en vez de `lib/design-tokens.ts`. Siempre oscuros,
// sin seguir el toggle claro/oscuro del sitio — igual que la imagen que reemplaza.

const UI = {
  bg: "#0F1420",
  sidebar: "#1A1F3A",
  nav: "#B9C8EE",
  navActive: "#2C3556",
  panel: "#141A2B",
  card: "#1A1F33",
  line: "rgba(255,255,255,0.075)",
  text: "#F1F3F8",
  muted: "#98A0B3",
  faint: "#6E768A",
  bar: "#4662C7",
  sky: "#4A9FD8",
  green: "#22C55E",
  wa: "#25D366",
  amber: "#EAB308",
  orange: "#F97316",
  peach: "#F4A261",
  red: "#EF4444",
  blue: "#3B82F6",
  primary: "#2D44D6",
  clientBubble: "#2F44CF",
} as const;

const CSS_VARS = {
  "--m-bg": UI.bg,
  "--m-sidebar": UI.sidebar,
  "--m-nav": UI.nav,
  "--m-nav-active": UI.navActive,
  "--m-panel": UI.panel,
  "--m-card": UI.card,
  "--m-line": UI.line,
  "--m-text": UI.text,
  "--m-muted": UI.muted,
  "--m-faint": UI.faint,
  "--m-bar": UI.bar,
  "--m-sky": UI.sky,
  "--m-green": UI.green,
  "--m-primary": UI.primary,
} as React.CSSProperties;

const SANS = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO = { fontFamily: 'ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace' } as const;

const DESIGN = { wide: { w: 1180, h: 740 }, narrow: { w: 420, h: 700 } } as const;

const WIDE_QUERY = "(min-width: 640px)";
const subscribeWide = (cb: () => void) => {
  const mql = window.matchMedia(WIDE_QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getWide = () => window.matchMedia(WIDE_QUERY).matches;
const serverWide = () => true;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const money = (n: number) => `$${n.toLocaleString("es-EC")}`;

type ViewId = "dashboard" | "leads";
type PeriodId = "hoy" | "semana" | "mes" | "total";

// ---------- Datos de relleno ----------

const PERIODS: { id: PeriodId; label: string }[] = [
  { id: "hoy", label: "Hoy" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
  { id: "total", label: "Total" },
];

const BY_PERIOD: Record<PeriodId, { won: number; wonCount: number; chats: number; organic: number; organicPrev: number }> = {
  hoy: { won: 1200, wonCount: 1, chats: 14, organic: 3, organicPrev: 2 },
  semana: { won: 4800, wonCount: 3, chats: 31, organic: 9, organicPrev: 5 },
  mes: { won: 8400, wonCount: 6, chats: 48, organic: 21, organicPrev: 15 },
  total: { won: 36900, wonCount: 24, chats: 260, organic: 92, organicPrev: 92 },
};

const FUNNEL = [
  { label: "Nuevo", value: 38 },
  { label: "Contactado", value: 41 },
  { label: "Interesado", value: 29 },
  { label: "En negociación", value: 18 },
  { label: "Cliente", value: 10 },
];
const FUNNEL_MAX = 50;

const STAGE_WEEKS = [
  { label: "24 ago", value: 6 },
  { label: "31 ago", value: 4 },
  { label: "7 sept", value: 9 },
  { label: "14 sept", value: 5 },
  { label: "21 sept", value: 12 },
  { label: "28 sept", value: 8 },
  { label: "5 oct", value: 15 },
  { label: "12 oct", value: 11 },
];

const MSG_CLIENTS = [4, 2, 1, 0, 3, 5, 1, 0, 2, 9, 14, 6, 3, 1, 0, 2, 22, 31, 7, 2, 0, 1, 3, 2, 0, 1, 4, 8, 3, 2];
const MSG_SELLERS = [1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 4, 6, 2, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0];
const MSG_X_LABELS = ["14 sept", "17 sept", "20 sept", "23 sept", "26 sept", "29 sept", "2 oct", "5 oct", "7 oct", "10 oct", "13 oct"];

const HOURS = [0, 0, 0, 1, 0, 0, 2, 4, 9, 18, 14, 12, 11, 6, 4, 5, 8, 12, 16, 22, 20, 25, 13, 5];

type Temp = "Tibio" | "Caliente" | "Frío";
type ChatMsg = { from: "client" | "agent"; text: string; time: string };
type Lead = { id: string; name: string; temp: Temp; meta: string; human?: boolean };

const CONVOS: Record<string, ChatMsg[]> = {
  laura: [
    { from: "client", text: "Hola, ¿tienen disponibilidad esta semana?", time: "12:27 p. m." },
    { from: "agent", text: "¡Hola, Laura! Sí, tenemos espacio el jueves y el viernes. ¿Cuál prefieres?", time: "12:27 p. m." },
    { from: "client", text: "El viernes en la tarde, por favor", time: "12:28 p. m." },
    { from: "agent", text: "Perfecto, te reservo el viernes a las 15h00. Te confirmo por aquí y te envío la dirección.", time: "12:28 p. m." },
  ],
  delta: [
    { from: "client", text: "Necesito una cotización para 40 unidades", time: "10:02 a. m." },
    { from: "agent", text: "Con gusto. ¿Las necesitas con instalación incluida o solo el producto?", time: "10:02 a. m." },
    { from: "client", text: "Con instalación, y para fin de mes", time: "10:04 a. m." },
    { from: "agent", text: "Anotado. Te paso con una asesora para cerrar el valor final hoy mismo.", time: "10:04 a. m." },
  ],
  norte: [
    { from: "client", text: "¿Tienen stock del modelo grande?", time: "4:15 p. m." },
    { from: "agent", text: "Sí, hay 12 disponibles en bodega. ¿Te lo despacho a domicilio?", time: "4:15 p. m." },
    { from: "client", text: "Sí, a Quito norte", time: "4:16 p. m." },
    { from: "agent", text: "Listo. El envío llega mañana antes de las 5 p. m. Te dejo el enlace de pago.", time: "4:16 p. m." },
  ],
  generic: [
    { from: "client", text: "Hola, quisiera más información", time: "9:40 a. m." },
    { from: "agent", text: "¡Hola! Claro, cuéntame un poco qué necesitas y te ayudo enseguida.", time: "9:40 a. m." },
  ],
};

const COLUMNS: { id: string; title: string; color: string; count: number; leads: (Lead & { convo: string })[] }[] = [
  {
    id: "contactado",
    title: "Contactado",
    color: UI.blue,
    count: 3,
    leads: [
      { id: "rivas", name: "Comercial Rivas", temp: "Tibio", meta: "05 oct 2026", convo: "generic" },
      { id: "taller", name: "Taller JM", temp: "Tibio", meta: "05 oct 2026", convo: "generic" },
      { id: "ferre", name: "Ferretería Central", temp: "Tibio", meta: "08 sept 2026", convo: "generic" },
    ],
  },
  {
    id: "interesado",
    title: "Interesado",
    color: UI.amber,
    count: 2,
    leads: [
      { id: "andino", name: "Grupo Andino", temp: "Tibio", meta: "hace 5d", convo: "generic" },
      { id: "optica", name: "Óptica Visión+", temp: "Tibio", meta: "02 sept 2026", convo: "generic" },
    ],
  },
  {
    id: "humana",
    title: "En atención humana",
    color: UI.orange,
    count: 6,
    leads: [
      { id: "laura", name: "Laura Méndez", temp: "Tibio", meta: "hace 7m", convo: "laura", human: true },
      { id: "delta", name: "Constructora Delta", temp: "Caliente", meta: "hace 1d", convo: "delta", human: true },
      { id: "norte", name: "Distribuidora Norte", temp: "Tibio", meta: "hace 5d", convo: "norte", human: true },
      { id: "spa", name: "Spa Bienestar", temp: "Tibio", meta: "24 sept 2026", convo: "generic", human: true },
      { id: "pixel", name: "Agencia Pixel", temp: "Frío", meta: "20 sept 2026", convo: "generic", human: true },
    ],
  },
  {
    id: "negociacion",
    title: "En negociación",
    color: UI.peach,
    count: 4,
    leads: [
      { id: "futuro", name: "Academia Futuro", temp: "Caliente", meta: "hace 2d", convo: "generic" },
      { id: "casa", name: "Casa Verde", temp: "Tibio", meta: "11 sept 2026", convo: "generic" },
    ],
  },
];
const ALL_LEADS = COLUMNS.flatMap((c) => c.leads.map((l) => ({ ...l, column: c.title })));

const NAV: { id: string; label: string; icon: LucideIcon; view?: ViewId }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { id: "leads", label: "Leads", icon: Users, view: "leads" },
  { id: "negocios", label: "Negocios", icon: Handshake },
  { id: "proyectos", label: "Proyectos", icon: FolderKanban },
  { id: "reservas", label: "Reservas", icon: CalendarDays },
  { id: "campanas", label: "Campañas", icon: Megaphone },
  { id: "publicidad", label: "Publicidad", icon: Rocket },
  { id: "finanzas", label: "Finanzas", icon: Landmark },
  { id: "config", label: "Configuración", icon: Settings },
];

// ---------- Piezas pequeñas ----------

function MindLogoBox({ width, className = "" }: { width: number; className?: string }) {
  return (
    <div className={`bg-white rounded-[10px] flex items-center justify-center ${className}`}>
      <Image src="/images/mind/mind-logo.png" alt="Mind" width={width} height={Math.round(width / 3.79)} priority={false} />
    </div>
  );
}

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = !!useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / 900);
      setN(Math.round(value * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);
  const shown = reduced ? value : n;
  return (
    <span ref={ref}>
      {prefix}
      {shown.toLocaleString("es-EC")}
      {suffix}
    </span>
  );
}

// Barra que crece al entrar en la ventana visible del marco (el contenido se desplaza
// dentro de ella con el scroll de la página, así que "entrar en vista" ocurre mientras
// se baja). Con movimiento reducido ya nace completa.
function GrowBar({ pct, axis, className, style, delay = 0 }: { pct: number; axis: "x" | "y"; className: string; style?: React.CSSProperties; delay?: number }) {
  const reduced = !!useReducedMotion();
  const target = axis === "x" ? { width: `${pct}%` } : { height: `${pct}%` };
  const start = axis === "x" ? { width: reduced ? `${pct}%` : "0%" } : { height: reduced ? `${pct}%` : "0%" };
  return (
    <motion.div
      className={className}
      style={style}
      initial={start}
      whileInView={target}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

function InfoLine({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-start gap-[5px] text-[9px] leading-[1.35] ${light ? "text-white/85" : "text-[var(--m-muted)]"}`}>
      <Info className="w-[10px] h-[10px] mt-[1.5px] shrink-0 opacity-80" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

type Tone = "hero" | "plain" | "outline";
function Kpi({
  label,
  tone = "plain",
  badge,
  icon: Icon,
  iconTint,
  children,
  info,
  extra,
}: {
  label: string;
  tone?: Tone;
  badge?: string;
  icon?: LucideIcon;
  iconTint?: string;
  children: React.ReactNode;
  info: React.ReactNode;
  extra?: React.ReactNode;
}) {
  const base = "relative rounded-[14px] border p-[13px] min-h-[92px]";
  const toneCls =
    tone === "hero"
      ? "border-transparent text-white bg-[linear-gradient(135deg,#1F2F93_0%,#4460C5_100%)]"
      : tone === "outline"
        ? "border-[#2B3A78] bg-[#171D38] text-[var(--m-text)]"
        : "border-[var(--m-line)] bg-[var(--m-card)] text-[var(--m-text)]";
  return (
    <div className={`${base} ${toneCls}`}>
      <div className="flex items-start justify-between gap-2">
        <div className={`text-[10.5px] ${tone === "hero" ? "text-white/90" : "text-[var(--m-muted)]"}`}>{label}</div>
        {badge && (
          <span className={`text-[8px] font-semibold px-[6px] py-[2px] rounded-full ${tone === "hero" ? "bg-white/20 text-white" : "bg-white/10 text-[var(--m-muted)]"}`}>{badge}</span>
        )}
      </div>
      <div className="flex items-center justify-between mt-[5px] mb-[6px]">
        <div className={`text-[19px] font-bold leading-none ${tone === "outline" ? "text-[#7C93F0]" : ""}`} style={MONO}>
          {children}
        </div>
        {Icon && (
          <span className="w-[24px] h-[24px] rounded-full flex items-center justify-center" style={{ backgroundColor: iconTint ?? "rgba(255,255,255,0.14)" }}>
            <Icon className="w-[12px] h-[12px] text-white" aria-hidden="true" />
          </span>
        )}
      </div>
      {extra}
      <InfoLine light={tone === "hero"}>{info}</InfoLine>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-[14px]">
      <div className="text-[12px] font-semibold text-[var(--m-text)] mb-[6px]">{title}</div>
      <div className="rounded-[16px] border border-[var(--m-line)] bg-[var(--m-panel)] p-[9px]">{children}</div>
    </section>
  );
}

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[14px] border border-[var(--m-line)] bg-[var(--m-panel)] p-[14px] ${className}`}>
      <div className="text-[12.5px] font-semibold text-[var(--m-text)]">{title}</div>
      {subtitle && <div className="text-[9px] leading-[1.4] text-[var(--m-muted)] mt-[3px] mb-[10px]">{subtitle}</div>}
      {children}
    </div>
  );
}

// ---------- Gráficos ----------

function FunnelChart() {
  return (
    <ChartCard title="Embudo de gestión" subtitle="Cuántos leads en gestión hay en cada etapa. Solo cuenta el trabajo comercial, no la lista importada.">
      <div className="relative pl-[78px] pr-[4px]">
        <div className="absolute inset-y-0 left-[78px] right-[4px] pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="absolute top-0 bottom-[16px] w-px bg-white/[0.06]" style={{ left: `${(i / 5) * 100}%` }} />
          ))}
        </div>
        <div className="space-y-[5px]">
          {FUNNEL.map((f, i) => (
            <div key={f.label} className="relative h-[21px]">
              <span className="absolute right-full mr-[8px] top-1/2 -translate-y-1/2 w-[70px] text-right text-[8.5px] leading-[1.1] text-[var(--m-muted)]" style={MONO}>
                {f.label}
              </span>
              <GrowBar pct={(f.value / FUNNEL_MAX) * 100} axis="x" delay={0.1 + i * 0.07} className="h-full rounded-r-[4px] bg-[var(--m-bar)]" />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-[var(--m-muted)] mt-[6px]" style={MONO}>
          {[0, 10, 20, 30, 40, 50].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-[6px] mt-[10px]">
        {[
          ["En atención humana", 24],
          ["Inicial con actividad", 9],
          ["Perdido", 3],
        ].map(([l, n]) => (
          <span key={l} className="inline-flex items-center gap-[5px] rounded-full bg-white/[0.07] px-[9px] py-[4px] text-[8.5px] font-semibold text-[var(--m-text)]">
            {l}
            <span style={MONO}>{n}</span>
          </span>
        ))}
      </div>
    </ChartCard>
  );
}

function StagesChart() {
  const ymax = 20;
  return (
    <ChartCard title="Avance de etapas" subtitle="Cambios de etapa registrados por semana. No mide cuánto tarda cada lead.">
      <div className="relative h-[118px] ml-[22px] mr-[2px] mt-[8px]">
        {[0, 5, 10, 15, 20].map((t) => (
          <div key={t} className="absolute left-0 right-0 border-t border-white/[0.06]" style={{ bottom: `${(t / ymax) * 100}%` }}>
            <span className="absolute right-full mr-[6px] -translate-y-1/2 text-[8px] text-[var(--m-muted)]" style={MONO}>
              {t}
            </span>
          </div>
        ))}
        <div className="absolute inset-0 flex items-end justify-around">
          {STAGE_WEEKS.map((w, i) => (
            <div key={w.label} className="relative h-full w-[22px] flex items-end">
              <GrowBar pct={(w.value / ymax) * 100} axis="y" delay={0.1 + i * 0.05} className="w-full rounded-t-[3px] bg-[var(--m-bar)]" />
              <span className="absolute top-full mt-[5px] right-[8px] origin-top-right -rotate-[32deg] whitespace-nowrap text-[7.5px] text-[var(--m-muted)]" style={MONO}>
                {w.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[26px]" />
    </ChartCard>
  );
}

function bumpPath(vals: number[], w: number, h: number, max: number) {
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * w, h - (v / max) * h] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

function MessagesChart() {
  const reduced = !!useReducedMotion();
  const W = 600;
  const H = 120;
  const dClients = useMemo(() => bumpPath(MSG_CLIENTS, W, H, 32), []);
  const dSellers = useMemo(() => bumpPath(MSG_SELLERS, W, H, 32), []);
  const draw = (delay: number) => ({
    initial: { pathLength: reduced ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1.2, delay, ease: "easeOut" as const },
  });
  return (
    <ChartCard
      title="Actividad de mensajes"
      subtitle="Mensajes por día, últimos 30 días, de cualquier canal. El agente responde cada mensaje del cliente, por eso no se dibuja aparte: ver «Quién atiende»."
    >
      <div className="relative h-[120px] ml-[24px] mr-[6px] mt-[10px]">
        {[0, 8, 16, 24, 32].map((t) => (
          <span key={t} className="absolute right-full mr-[6px] -translate-y-1/2 text-[8px] text-[var(--m-muted)]" style={{ ...MONO, bottom: `${(t / 32) * 100}%`, transform: "translateY(50%)" }}>
            {t}
          </span>
        ))}
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
          <motion.path d={dSellers} fill="none" stroke={UI.orange} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" {...draw(0.25)} />
          <motion.path d={dClients} fill="none" stroke={UI.bar} strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinecap="round" {...draw(0)} />
        </svg>
      </div>
      <div className="flex justify-between ml-[24px] mr-[6px] mt-[6px] text-[7.5px] text-[var(--m-muted)]" style={MONO}>
        {MSG_X_LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="flex justify-center gap-[14px] mt-[8px] text-[8.5px] text-[var(--m-text)]">
        <span className="inline-flex items-center gap-[5px]">
          <span className="w-[12px] h-[2px] rounded-full" style={{ backgroundColor: UI.bar }} />
          Mensajes de clientes
        </span>
        <span className="inline-flex items-center gap-[5px]">
          <span className="w-[12px] h-[2px] rounded-full" style={{ backgroundColor: UI.orange }} />
          Respuestas de vendedores
        </span>
      </div>
    </ChartCard>
  );
}

function WhoAnswersChart() {
  return (
    <ChartCard title="Quién atiende" subtitle="Respuestas en el período: este mes.">
      <div className="text-[26px] font-bold text-[var(--m-text)] leading-none" style={MONO}>
        <CountUp value={75} suffix="%" />
      </div>
      <div className="text-[9.5px] text-[var(--m-text)] mt-[6px] mb-[10px]">de las respuestas las dio el agente Mind</div>
      <div className="flex h-[10px] rounded-full overflow-hidden bg-white/[0.07]">
        <GrowBar pct={75} axis="x" className="h-full" style={{ backgroundColor: UI.green }} />
        <GrowBar pct={25} axis="x" delay={0.15} className="h-full" style={{ backgroundColor: UI.sky }} />
      </div>
      <div className="mt-[10px] space-y-[5px] text-[9.5px] text-[var(--m-text)]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-[6px]">
            <span className="w-[8px] h-[8px] rounded-[2px]" style={{ backgroundColor: UI.green }} />
            Agente Mind
          </span>
          <span style={MONO}>96</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-[6px]">
            <span className="w-[8px] h-[8px] rounded-[2px]" style={{ backgroundColor: UI.sky }} />
            Vendedores
          </span>
          <span style={MONO}>32</span>
        </div>
        <div className="flex items-center justify-between pt-[6px] border-t border-[var(--m-line)] text-[var(--m-muted)]">
          <span>Mensajes de clientes</span>
          <span style={MONO}>214</span>
        </div>
      </div>
    </ChartCard>
  );
}

function HoursChart() {
  const ymax = 32;
  return (
    <ChartCard title="Horas con más mensajes" subtitle="Mensajes de clientes por hora del día (hora de Ecuador), desde que hay historial. Sirve para ver cuándo conviene tener gente atendiendo.">
      <div className="relative h-[104px] ml-[22px] mr-[2px] mt-[8px]">
        {[0, 8, 16, 24, 32].map((t) => (
          <div key={t} className="absolute left-0 right-0 border-t border-white/[0.05]" style={{ bottom: `${(t / ymax) * 100}%` }}>
            <span className="absolute right-full mr-[6px] -translate-y-1/2 text-[8px] text-[var(--m-muted)]" style={MONO}>
              {t}
            </span>
          </div>
        ))}
        <div className="absolute inset-0 flex items-end justify-between">
          {HOURS.map((v, i) => (
            <div key={i} className="relative h-full w-[14px] flex items-end">
              {v > 0 && <GrowBar pct={(v / ymax) * 100} axis="y" delay={0.05 + i * 0.02} className="w-full rounded-t-[2px] bg-[var(--m-bar)]" />}
              {i % 3 === 0 && (
                <span className="absolute top-full mt-[5px] right-[6px] origin-top-right -rotate-[32deg] whitespace-nowrap text-[7.5px] text-[var(--m-muted)]" style={MONO}>
                  {i}h
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[24px]" />
    </ChartCard>
  );
}

function ConversionCard() {
  return (
    <ChartCard title="Conversión a negocio" subtitle="Leads en gestión que ya tienen un negocio.">
      <div className="flex items-center gap-[6px] text-[10.5px] text-[var(--m-text)]">
        <Handshake className="w-[12px] h-[12px]" style={{ color: UI.sky }} aria-hidden="true" />
        <span>
          <b style={MONO}>28</b> de <b style={MONO}>136</b> leads
        </span>
      </div>
      <div className="text-[26px] font-bold text-[var(--m-text)] leading-none mt-[8px]" style={MONO}>
        <CountUp value={21} suffix="%" />
      </div>
      <div className="h-[8px] rounded-full bg-white/[0.07] mt-[10px] overflow-hidden">
        <GrowBar pct={21} axis="x" className="h-full rounded-full" style={{ backgroundColor: UI.sky }} />
      </div>
      <div className="text-[9px] leading-[1.45] text-[var(--m-muted)] mt-[10px]">Con pocos negocios el porcentaje cambia mucho: mira siempre los dos números.</div>
    </ChartCard>
  );
}

// ---------- Vista: Dashboard ----------

function DashboardView({
  wide,
  period,
  setPeriod,
  refreshKey,
  onRefresh,
  viewH,
  maxScroll,
  y,
}: {
  wide: boolean;
  period: PeriodId;
  setPeriod: (p: PeriodId) => void;
  refreshKey: number;
  onRefresh: () => void;
  viewH: number;
  maxScroll: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => maxScroll.set(Math.max(0, el.offsetHeight - viewH)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxScroll, viewH]);

  const d = BY_PERIOD[period];
  const grid4 = wide ? "grid-cols-4" : "grid-cols-2";
  const chartRow = wide ? "grid-cols-[1.7fr_1fr]" : "grid-cols-1";
  const delta = d.organic - d.organicPrev;
  const k = `${period}-${refreshKey}`;

  return (
    <div className="h-full overflow-hidden">
      <motion.div ref={contentRef} style={{ y }} className={`${wide ? "px-[22px] pt-[20px]" : "px-[14px] pt-[14px]"} pb-[26px]`}>
        <div className={`flex ${wide ? "items-start justify-between" : "flex-col gap-[10px]"} mb-[16px]`}>
          <div>
            <div className="text-[20px] font-semibold text-[var(--m-text)] leading-tight">Dashboard</div>
            <div className="text-[10.5px] text-[var(--m-muted)] mt-[2px]">Resumen unificado — se actualiza automáticamente</div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div role="group" aria-label="Período" className="flex items-center rounded-[11px] border border-[var(--m-line)] bg-[#1B202B]/70 p-[3px]">
              {PERIODS.map((p) => {
                const on = p.id === period;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPeriod(p.id)}
                    className={`px-[9px] py-[5px] rounded-[8px] text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--m-sky)] ${on ? "bg-[#243553] text-[var(--m-sky)]" : "text-[var(--m-muted)] hover:text-[var(--m-text)]"}`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-[5px] text-[10.5px] text-[var(--m-muted)] hover:text-[var(--m-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--m-sky)] rounded-md px-1"
            >
              <RefreshCw className="w-[11px] h-[11px]" aria-hidden="true" />
              Actualizar
            </button>
          </div>
        </div>

        <Section title="Negocios">
          <div key={`n-${k}`} className={`grid ${grid4} gap-[9px]`}>
            <Kpi tone="hero" label="Valor ganado" info="Cierre de Contrato, Arranque del Servicio y Cliente ganado. Aproximado: basado en la última actualización del negocio, no en una fecha exacta de cierre">
              <CountUp value={d.won} prefix="$" />
            </Kpi>
            <Kpi label="Proyección" info="Todo el pipeline menos los perdidos, sin ponderar. No varía con el período seleccionado">
              {money(24600)}
            </Kpi>
            <Kpi label="Ganados en el período" info="Aproximado: basado en la última actualización del negocio, no en una fecha exacta de cierre">
              <CountUp value={d.wonCount} />
            </Kpi>
            <Kpi tone="outline" label="Tasa de cierre" info="Histórico completo — no varía con el período seleccionado">
              <CountUp value={62} suffix="%" />
            </Kpi>
          </div>
        </Section>

        <Section title="Leads">
          <div key={`l-${k}`} className={`grid ${grid4} gap-[9px]`}>
            <Kpi tone="hero" label="Leads en gestión" badge="Foto actual" icon={Users} info="Con estado avanzado, mensajes del cliente o negocio. De 418 contactos en total">
              <CountUp value={136} />
            </Kpi>
            <Kpi
              label="Conversaciones activas"
              icon={MessageCircle}
              iconTint="rgba(70,98,199,0.35)"
              extra={<div className="text-[9px] text-[var(--m-muted)] mb-[4px]">{period === "total" ? "Histórico completo" : "— Igual que el período anterior"}</div>}
              info="Clientes distintos que escribieron en el período"
            >
              <CountUp value={d.chats} />
            </Kpi>
            <Kpi
              label="Nuevos orgánicos"
              icon={UserPlus}
              iconTint="rgba(70,98,199,0.35)"
              extra={
                period === "total" ? undefined : (
                  <div className="text-[9px] mb-[4px]" style={{ color: delta >= 0 ? UI.green : UI.red }}>
                    {delta >= 0 ? "↑ +" : "↓ "}
                    {delta} (de {d.organicPrev} a {d.organic}) vs. período anterior
                  </div>
                )
              }
              info="Llegaron solos. Además, 29 cargados manualmente o importados"
            >
              <CountUp value={d.organic} />
            </Kpi>
            <Kpi label="Esperando respuesta" badge="Foto actual" icon={Hourglass} iconTint="rgba(70,98,199,0.35)" info="En atención humana y el último mensaje es del cliente">
              <CountUp value={7} />
            </Kpi>
          </div>
        </Section>

        <div className={`grid ${chartRow} gap-[10px] mb-[10px]`}>
          <FunnelChart />
          <StagesChart />
        </div>
        <div className={`grid ${chartRow} gap-[10px] mb-[10px]`}>
          <MessagesChart />
          <WhoAnswersChart />
        </div>
        <div className={`grid ${chartRow} gap-[10px] mb-[14px]`}>
          <HoursChart />
          <ConversionCard />
        </div>

        <div className="rounded-[14px] border border-[var(--m-line)] bg-[var(--m-panel)] px-[14px] py-[11px] flex items-center justify-between mb-[14px]">
          <div>
            <div className="text-[12px] font-bold text-[var(--m-text)]">Base de contactos</div>
            <div className="text-[9px] text-[var(--m-muted)] mt-[2px]">418 contactos · 93% cargados manualmente o importados · 29 llegaron solos</div>
          </div>
          <ChevronDown className="w-[14px] h-[14px] text-[var(--m-muted)]" aria-hidden="true" />
        </div>

        <Section title="Campañas de publicidad activas">
          <div className="grid grid-cols-2 gap-[9px]">
            <Kpi label="Gasto total" info="Suma de las campañas activas en el período">
              {money(1240)}
            </Kpi>
            <Kpi tone="outline" label="Conversiones totales" info="Leads que llegaron desde anuncios">
              <CountUp value={37} />
            </Kpi>
          </div>
        </Section>

        <Section title="Proyectos">
          <div className="grid grid-cols-2 gap-[9px]">
            <Kpi label="Proyectos activos" info="Proyectos en curso en este momento">
              <CountUp value={11} />
            </Kpi>
            <Kpi tone="outline" label="Tareas vencidas" info="Tareas con fecha pasada sin completar">
              <CountUp value={6} />
            </Kpi>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}

// ---------- Vista: Leads (Kanban + chat) ----------

const TEMP_STYLE: Record<Temp, { bg: string; fg: string }> = {
  Tibio: { bg: "rgba(234,179,8,0.16)", fg: "#EAB308" },
  Caliente: { bg: "rgba(34,197,94,0.16)", fg: "#34D07A" },
  Frío: { bg: "rgba(239,68,68,0.16)", fg: "#F87171" },
};

function TempPill({ temp, size = 9 }: { temp: Temp; size?: number }) {
  const s = TEMP_STYLE[temp];
  return (
    <span className="rounded-[6px] font-semibold px-[6px] py-[2px] leading-none" style={{ backgroundColor: s.bg, color: s.fg, fontSize: size }}>
      {temp}
    </span>
  );
}

function LeadCard({ lead, selected, onSelect }: { lead: Lead; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left rounded-[10px] border bg-[var(--m-card)] px-[10px] py-[8px] transition-colors hover:bg-[#20263D] focus-visible:outline-2 focus-visible:outline-[var(--m-sky)] ${selected ? "border-[2px] border-[#4A86B8] px-[9px] py-[7px]" : "border-[var(--m-line)]"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11.5px] font-semibold text-[var(--m-text)] leading-tight">{lead.name}</span>
        <TempPill temp={lead.temp} />
      </div>
      <div className="flex items-center justify-between mt-[7px] text-[9px] text-[var(--m-muted)]">
        <span className="inline-flex items-center gap-[4px]">
          <WhatsAppLogo className="w-[10px] h-[10px]" />
          WhatsApp
        </span>
        <span className="inline-flex items-center gap-[5px]">
          <span className="w-[10px] h-[10px] rounded-full bg-[#1E2A6B]" aria-hidden="true" />
          {lead.meta}
        </span>
      </div>
    </button>
  );
}

function useChatPlayback(msgs: ChatMsg[], active: boolean, reduced: boolean) {
  const [state, setState] = useState({ visible: 0, typing: false });
  useEffect(() => {
    if (!active || reduced) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const later = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };
    const step = (i: number) => {
      if (i >= msgs.length) {
        // Pausa al final y arranca una conversación nueva.
        later(() => {
          setState({ visible: 0, typing: false });
          step(0);
        }, 3400);
        return;
      }
      if (msgs[i].from === "agent") {
        setState((s) => ({ ...s, typing: true }));
        later(() => {
          setState({ visible: i + 1, typing: false });
          later(() => step(i + 1), 1000);
        }, 1400);
      } else {
        later(() => {
          setState({ visible: i + 1, typing: false });
          later(() => step(i + 1), 800);
        }, i === 0 ? 500 : 700);
      }
    };
    step(0);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [msgs, active, reduced]);
  return reduced ? { visible: msgs.length, typing: false } : state;
}

function ChatPanel({ lead, convo, column, active, reduced, wide }: { lead: Lead; convo: string; column: string; active: boolean; reduced: boolean; wide: boolean }) {
  const msgs = CONVOS[convo] ?? CONVOS.generic;
  const { visible, typing } = useChatPlayback(msgs, active, reduced);
  return (
    <div className={`flex flex-col min-h-0 bg-[var(--m-panel)] ${wide ? "w-[316px] shrink-0 border-l" : "h-[300px] shrink-0 border-t"} border-[var(--m-line)]`}>
      <div className="flex items-center gap-[10px] px-[14px] py-[10px] border-b border-[var(--m-line)]">
        <span className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[rgba(34,197,94,0.14)]">
          <WhatsAppLogo className="w-[17px] h-[17px]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-bold text-[var(--m-text)] truncate">{lead.name}</div>
          <div className="text-[9.5px] text-[var(--m-muted)]">WhatsApp · {lead.meta}</div>
        </div>
        <ArrowUpRight className="w-[12px] h-[12px] text-[var(--m-muted)]" aria-hidden="true" />
        <X className="w-[12px] h-[12px] text-[var(--m-muted)]" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-[7px] px-[14px] py-[7px] border-b border-[var(--m-line)]">
        <TempPill temp={lead.temp} size={9} />
        {lead.human ? (
          <span className="inline-flex items-center gap-[4px] rounded-full px-[7px] py-[3px] text-[8px] font-semibold whitespace-nowrap" style={{ backgroundColor: "rgba(249,115,22,0.16)", color: "#FB923C" }}>
            <UserRound className="w-[9px] h-[9px]" aria-hidden="true" />
            Atención humana · hasta 13-oct, 06:20 p. m.
          </span>
        ) : (
          <span className="inline-flex items-center gap-[4px] rounded-full px-[8px] py-[3px] text-[8.5px] font-semibold" style={{ backgroundColor: "rgba(34,197,94,0.14)", color: UI.green }}>
            <Bot className="w-[9px] h-[9px]" aria-hidden="true" />
            Agente Mind activo
          </span>
        )}
        <span className="ml-auto text-[8.5px] text-[var(--m-faint)]">Andrea</span>
      </div>

      <div className={`flex-1 min-h-0 overflow-hidden px-[14px] py-[10px] flex flex-col ${wide ? "justify-start" : "justify-end"} gap-[8px]`} aria-label={`Conversación de ejemplo con ${lead.name}`}>
        <div className="self-center rounded-full bg-white/[0.07] px-[10px] py-[3px] text-[8.5px] text-[var(--m-muted)]">Hoy</div>
        <AnimatePresence initial={false}>
          {msgs.slice(0, visible).map((m, i) => (
            <motion.div
              key={`${convo}-${i}`}
              layout={false}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`flex flex-col ${m.from === "client" ? "items-end" : "items-start"}`}
            >
              {m.from === "agent" && (
                <span className="inline-flex items-center gap-[4px] text-[8.5px] font-semibold mb-[3px]" style={{ color: UI.green }}>
                  <Bot className="w-[10px] h-[10px]" aria-hidden="true" />
                  Agente Mind
                </span>
              )}
              <span
                className={`text-[10.5px] leading-[1.45] text-white px-[12px] py-[8px] max-w-[88%] ${m.from === "client" ? "rounded-[14px] rounded-br-[5px]" : "rounded-[14px] rounded-bl-[5px] bg-[#161C33] border border-[var(--m-line)]"}`}
                style={m.from === "client" ? { backgroundColor: UI.clientBubble } : undefined}
              >
                {m.text}
              </span>
              <span className="inline-flex items-center gap-[4px] mt-[3px] text-[8px] text-[var(--m-muted)]">
                <WhatsAppLogo className="w-[8px] h-[8px]" />
                {m.time}
              </span>
            </motion.div>
          ))}
          {!reduced && typing && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-start">
              <span className="inline-flex items-center gap-[4px] text-[8.5px] font-semibold mb-[3px]" style={{ color: UI.green }}>
                <Bot className="w-[10px] h-[10px]" aria-hidden="true" />
                Agente Mind
              </span>
              <span className="inline-flex gap-[4px] rounded-[14px] rounded-bl-[5px] bg-[#161C33] border border-[var(--m-line)] px-[12px] py-[10px]" aria-label="Agente Mind escribiendo">
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="w-[5px] h-[5px] rounded-full bg-white" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-[12px] py-[10px] border-t border-[var(--m-line)]" aria-hidden="true">
        <div className="flex items-center rounded-[10px] border border-[var(--m-line)] bg-[#1B202B]/60 px-[10px] py-[9px] text-[10px] text-[var(--m-faint)]">
          <span className="flex-1">Escribe tu respuesta...</span>
          <Paperclip className="w-[11px] h-[11px]" />
        </div>
        <div className="flex items-center justify-between mt-[8px]">
          <span className="inline-flex items-center gap-[5px] rounded-full px-[9px] py-[5px] text-[8.5px] font-bold text-[#04210F]" style={{ backgroundColor: UI.wa }}>
            <WhatsAppLogo className="w-[10px] h-[10px]" />
            WhatsApp (+593 99 000 0000)
          </span>
          <span className="inline-flex items-center gap-[5px] rounded-full bg-white/[0.07] px-[11px] py-[5px] text-[9.5px] font-semibold text-[var(--m-muted)]">
            <Send className="w-[10px] h-[10px]" />
            Enviar
          </span>
        </div>
        <div className="mt-[7px] text-[8.5px] text-[var(--m-muted)] underline">{column === "En atención humana" ? "Reactivar agente Mind" : "Tomar la conversación"}</div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon: Icon, children, primary, active }: { icon: LucideIcon; children: React.ReactNode; primary?: boolean; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-[9px] border px-[9px] py-[6px] text-[9.5px] font-medium whitespace-nowrap ${primary ? "border-[#3A52E8] text-white" : active ? "border-transparent text-[var(--m-sky)] bg-[#1E2C4A]" : "border-[var(--m-line)] bg-white/[0.04] text-[var(--m-text)]"}`}
      style={primary ? { backgroundColor: UI.primary } : undefined}
    >
      <Icon className="w-[11px] h-[11px]" aria-hidden="true" />
      {children}
    </span>
  );
}

function LeadsView({ wide, active, reduced }: { wide: boolean; active: boolean; reduced: boolean }) {
  const [selectedId, setSelectedId] = useState("laura");
  const selected = ALL_LEADS.find((l) => l.id === selectedId) ?? ALL_LEADS[0];
  return (
    <div className={`h-full flex ${wide ? "flex-row" : "flex-col"} min-h-0`}>
      <div className="flex-1 min-w-0 min-h-0 flex flex-col px-[18px] pt-[18px] pb-[10px]">
        <div className="flex items-start gap-[14px] mb-[12px]">
          <div className="shrink-0">
            <div className="flex items-baseline gap-[4px]">
              <span className="text-[20px] font-semibold text-[var(--m-text)] leading-none">Leads</span>
              <span className="inline-flex items-center gap-[3px] text-[7.5px] font-semibold leading-none" style={{ color: UI.green }}>
                <span className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: UI.green }} />
                En vivo
              </span>
            </div>
            <div className="text-[10.5px] text-[var(--m-muted)] mt-[5px]">418 contactos</div>
          </div>
          {wide && (
            <div className="flex flex-wrap gap-[6px]" aria-hidden="true">
              <span className="inline-flex rounded-[10px] border border-[var(--m-line)] bg-white/[0.03] p-[2px]">
                <ToolbarButton icon={Table2}>Tabla</ToolbarButton>
                <ToolbarButton icon={Columns3} active>
                  Kanban por Estado
                </ToolbarButton>
                <ToolbarButton icon={BarChart3}>Kanban por Score</ToolbarButton>
              </span>
              <ToolbarButton icon={Funnel}>Filtros</ToolbarButton>
              <ToolbarButton icon={LineChart}>Métricas</ToolbarButton>
              <ToolbarButton icon={UserPlus} primary>
                Crear lead manualmente
              </ToolbarButton>
              <ToolbarButton icon={ListChecks}>Campos personalizados</ToolbarButton>
              <ToolbarButton icon={Upload}>Importar CSV</ToolbarButton>
              <ToolbarButton icon={Download}>Exportar CSV</ToolbarButton>
            </div>
          )}
        </div>
        <div className="flex items-center gap-[7px] rounded-[10px] border border-[var(--m-line)] bg-[#1B202B]/60 px-[11px] py-[8px] text-[10px] text-[var(--m-faint)] mb-[14px]" aria-hidden="true">
          <Search className="w-[12px] h-[12px]" />
          Buscar por nombre, teléfono o email...
        </div>

        <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden flex gap-[12px] pb-[6px] [scrollbar-width:thin] [scrollbar-color:#39415E_transparent]">
          {COLUMNS.map((col) => (
            <div key={col.id} className="w-[186px] shrink-0 flex flex-col min-h-0">
              <div
                className="flex items-center gap-[7px] rounded-[10px] bg-[var(--m-card)] px-[10px] py-[7px] mb-[7px]"
                style={{ borderLeft: `3px solid ${col.color}` }}
              >
                <span className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: col.color }} />
                <span className="text-[11px] font-semibold text-[var(--m-text)] flex-1 truncate">{col.title}</span>
                <span className="text-[9px] text-[var(--m-muted)] bg-white/[0.08] rounded-full min-w-[17px] h-[17px] px-[4px] flex items-center justify-center" style={MONO}>
                  {col.count}
                </span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden rounded-[10px] p-[6px] space-y-[6px]" style={{ backgroundColor: `${col.color}0F` }}>
                {col.leads.map((l) => (
                  <LeadCard key={l.id} lead={l} selected={l.id === selected.id} onSelect={() => setSelectedId(l.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatPanel key={selected.id} lead={selected} convo={selected.convo} column={selected.column} active={active} reduced={reduced} wide={wide} />
    </div>
  );
}

// ---------- Sidebar ----------

function Sidebar({ view, onSelect }: { view: ViewId; onSelect: (v: ViewId) => void }) {
  return (
    <aside className="w-[194px] shrink-0 flex flex-col bg-[var(--m-sidebar)] border-r border-black/25">
      <div className="px-[14px] pt-[15px] pb-[9px] border-b border-white/[0.06]">
        <MindLogoBox width={98} className="w-[124px] h-[60px] mx-auto" />
        <PanelLeftClose className="w-[13px] h-[13px] text-[var(--m-nav)] mt-[11px] mx-auto" aria-hidden="true" />
      </div>
      <nav aria-label="Navegación de la demostración" className="flex-1 px-[9px] pt-[14px] space-y-[3px]">
        {NAV.map((item) => {
          const interactive = !!item.view;
          const on = item.view === view;
          const Icon = item.icon;
          const inner = (
            <>
              <span className={`w-[24px] h-[24px] rounded-full flex items-center justify-center ${on ? "bg-white/[0.09]" : ""}`}>
                <Icon className="w-[14px] h-[14px]" aria-hidden="true" />
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {on && <span className="w-[5px] h-[5px] rounded-full bg-[var(--m-sky)]" aria-hidden="true" />}
            </>
          );
          const cls = `w-full flex items-center gap-[9px] px-[9px] h-[36px] rounded-[11px] text-[12.5px] font-medium text-[var(--m-nav)] transition-colors ${on ? "bg-[var(--m-nav-active)]" : ""}`;
          return interactive ? (
            <button
              key={item.id}
              type="button"
              aria-current={on ? "page" : undefined}
              onClick={() => onSelect(item.view as ViewId)}
              className={`${cls} ${on ? "" : "hover:bg-white/[0.05]"} focus-visible:outline-2 focus-visible:outline-[var(--m-sky)]`}
            >
              {inner}
            </button>
          ) : (
            <div key={item.id} aria-disabled="true" className={`${cls} opacity-95 cursor-default`}>
              {inner}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-white/[0.06] px-[14px] py-[12px] space-y-[9px]">
        <div className="flex items-center gap-[8px]">
          <span className="w-[25px] h-[25px] rounded-full bg-[var(--m-sky)] text-[#0F1A2B] text-[11px] font-bold flex items-center justify-center">D</span>
          <div>
            <div className="text-[12px] font-bold text-white leading-tight">Usuario Demo</div>
            <div className="text-[10px] text-[var(--m-sky)] leading-tight">Admin</div>
          </div>
        </div>
        <div className="flex items-center gap-[9px] text-[12px] text-[var(--m-nav)]">
          <Moon className="w-[14px] h-[14px]" aria-hidden="true" />
          Modo claro
        </div>
        <div className="flex items-center gap-[9px] text-[12px] text-[var(--m-nav)]">
          <LogOut className="w-[14px] h-[14px]" aria-hidden="true" />
          Cerrar sesión
        </div>
        <div className="text-[9px] text-[var(--m-sky)]/80 text-center pt-[2px]">Soporte: soporte@tuempresa.com</div>
      </div>
    </aside>
  );
}

function MobileBar({ view, onSelect }: { view: ViewId; onSelect: (v: ViewId) => void }) {
  return (
    <div className="flex items-center gap-[10px] px-[12px] py-[9px] bg-[var(--m-sidebar)] border-b border-black/25">
      <MindLogoBox width={64} className="w-[84px] h-[38px]" />
      <nav aria-label="Navegación de la demostración" className="flex gap-[6px] ml-auto">
        {NAV.slice(0, 2).map((item) => {
          const on = item.view === view;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={on ? "page" : undefined}
              onClick={() => onSelect(item.view as ViewId)}
              className={`inline-flex items-center gap-[6px] px-[11px] h-[30px] rounded-[10px] text-[12px] font-medium text-[var(--m-nav)] focus-visible:outline-2 focus-visible:outline-[var(--m-sky)] ${on ? "bg-[var(--m-nav-active)]" : ""}`}
            >
              <Icon className="w-[13px] h-[13px]" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ---------- Componente ----------

export function MindLivePreview() {
  const wide = useSyncExternalStore(subscribeWide, getWide, serverWide);
  const reduced = !!useReducedMotion();
  const [view, setView] = useState<ViewId>("dashboard");
  const [period, setPeriod] = useState<PeriodId>("mes");
  const [refreshKey, setRefreshKey] = useState(0);
  const [scale, setScale] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const D = wide ? DESIGN.wide : DESIGN.narrow;

  // Escala del lienzo de diseño al ancho real del marco. El primer callback del
  // ResizeObserver llega antes del primer pintado, así que no hay parpadeo; hasta
  // entonces el lienzo se mantiene oculto.
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / D.w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [D.w]);

  // El Dashboard es más alto que el marco: su contenido se desplaza dentro de él al
  // ritmo del scroll de la página (scroll nativo, nunca se intercepta la rueda), de
  // modo que quien baja por la sección recorre todo el panel. Con movimiento reducido
  // queda fijo arriba.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start 92%", "end 22%"] });
  const maxScroll = useMotionValue(0);
  const dashY = useTransform([scrollYProgress, maxScroll], (latest) => {
    const [p, m] = latest as [number, number];
    return reduced ? 0 : -clamp01((p - 0.34) / 0.52) * m;
  });

  const inView = useInView(frameRef, { amount: 0.25 });

  return (
    <div
      ref={frameRef}
      role="region"
      aria-label="Demostración interactiva de Mind con datos de ejemplo"
      className="relative w-full overflow-hidden aspect-[420/700] sm:aspect-[1180/740] [&_*]:[font-family:inherit]"
      style={{ ...CSS_VARS, backgroundColor: UI.bg, fontFamily: SANS }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: D.w,
          height: D.h,
          transform: `scale(${scale ?? 1})`,
          transformOrigin: "0 0",
          visibility: scale === null ? "hidden" : "visible",
        }}
        className={`flex ${wide ? "flex-row" : "flex-col"} bg-[var(--m-bg)] text-[var(--m-text)]`}
      >
        {wide ? <Sidebar view={view} onSelect={setView} /> : <MobileBar view={view} onSelect={setView} />}
        <div className="flex-1 min-w-0 min-h-0 relative">
          {view === "dashboard" ? (
            <DashboardView
              wide={wide}
              period={period}
              setPeriod={setPeriod}
              refreshKey={refreshKey}
              onRefresh={() => setRefreshKey((k) => k + 1)}
              viewH={wide ? D.h : D.h - 56}
              maxScroll={maxScroll}
              y={dashY}
            />
          ) : (
            <LeadsView wide={wide} active={inView} reduced={reduced} />
          )}
        </div>
      </div>
    </div>
  );
}
