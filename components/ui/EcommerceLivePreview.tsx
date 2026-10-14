"use client";

// Demo interactiva (datos de relleno, sin cliente real — PROJECT_PLAN.md §5.4 "Capa 2")
// para el ProductShowcase de /ecommerce-inteligente: reemplaza la captura estática por
// un panel con el mismo lenguaje visual de MindLivePreview (KPIs que cuentan al entrar
// en vista, barras que crecen) más un selector de período y de paso de secuencia, que
// sí reaccionan al click — no solo al scroll.

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, RefreshCw, TrendingUp, DollarSign, Check, Clock3, MessageCircle, type LucideIcon } from "lucide-react";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";
import { CountUp, GrowBar } from "@/components/ui/LivePreviewKit";

const ACCENT = "#0022D2";
const GREEN = "#22C55E";
const AMBER = "#EAB308";

type PeriodId = "hoy" | "semana" | "mes";
const PERIODS: { id: PeriodId; label: string }[] = [
  { id: "hoy", label: "Hoy" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
];

const BY_PERIOD: Record<PeriodId, { abandoned: number; recovered: number; rate: number; revenue: number }> = {
  hoy: { abandoned: 18, recovered: 6, rate: 33, revenue: 420 },
  semana: { abandoned: 126, recovered: 47, rate: 37, revenue: 3180 },
  mes: { abandoned: 540, recovered: 211, rate: 39, revenue: 14250 },
};

const FUNNEL = [
  { label: "Visitó el sitio", value: 100 },
  { label: "Agregó al carrito", value: 42 },
  { label: "Inició el pago", value: 24 },
  { label: "Carrito recuperado", value: 9 },
];

const DAYS = [
  { label: "Lun", value: 1800 },
  { label: "Mar", value: 2100 },
  { label: "Mié", value: 1650 },
  { label: "Jue", value: 2600 },
  { label: "Vie", value: 3100 },
  { label: "Sáb", value: 1900 },
  { label: "Dom", value: 1200 },
];
const DAYS_MAX = 3200;

const SEQUENCE = [
  {
    id: "1",
    title: "A los 15 minutos",
    tag: "Recordatorio",
    msg: "¡Hola! Vimos que dejaste algo en tu carrito 🛒 ¿Seguimos con tu pedido?",
    status: "Enviado a 100%",
  },
  {
    id: "2",
    title: "A las 4 horas",
    tag: "Incentivo",
    msg: "Tu carrito sigue esperando. Usa el código VUELVE10 y obtén 10% de descuento hoy.",
    status: "Abierto por 68%",
  },
  {
    id: "3",
    title: "A las 24 horas",
    tag: "Último aviso",
    msg: "Última oportunidad: tu carrito se libera pronto. Finaliza tu compra en un clic.",
    status: "Convirtió 39%",
  },
];

function Kpi({ icon: Icon, label, children, tone = "plain" }: { icon: LucideIcon; label: string; children: React.ReactNode; tone?: "hero" | "plain" }) {
  return (
    <div
      className={`rounded-[14px] border p-[13px] min-h-[88px] ${
        tone === "hero" ? "border-transparent text-white" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
      }`}
      style={tone === "hero" ? { background: `linear-gradient(135deg, ${ACCENT} 0%, #3F5FFF 100%)` } : undefined}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-[10.5px] ${tone === "hero" ? "text-white/85" : "text-[var(--color-text-muted)]"}`}>{label}</span>
        <Icon className={`w-[14px] h-[14px] ${tone === "hero" ? "text-white/85" : "text-[var(--color-text-muted)]"}`} aria-hidden="true" />
      </div>
      <div className="text-[20px] font-bold leading-none" style={{ fontFamily: "ui-monospace, monospace" }}>
        {children}
      </div>
    </div>
  );
}

export function EcommerceLivePreview() {
  const [period, setPeriod] = useState<PeriodId>("semana");
  const [step, setStep] = useState(0);
  const d = BY_PERIOD[period];
  const active = SEQUENCE[step];

  return (
    <div
      role="region"
      aria-label="Demostración interactiva de recuperación de carritos con datos de ejemplo"
      className="w-full bg-[#0F1420] text-[#F1F3F8] px-4 py-5 sm:px-6 sm:py-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold">Recuperación de Carritos</h3>
            <span className="inline-flex items-center gap-[4px] text-[9px] font-semibold" style={{ color: GREEN }}>
              <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: GREEN }} />
              En vivo
            </span>
          </div>
          <p className="text-[10.5px] text-white/55 mt-[3px]">Secuencias automáticas por WhatsApp + remarketing</p>
        </div>
        <div role="group" aria-label="Período" className="inline-flex items-center rounded-[11px] border border-white/10 bg-white/[0.04] p-[3px] self-start">
          {PERIODS.map((p) => {
            const on = p.id === period;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => setPeriod(p.id)}
                className={`px-[10px] py-[6px] rounded-[8px] text-[10.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#4A9FD8] ${
                  on ? "bg-[#243553] text-[#7EC8F2]" : "text-white/55 hover:text-white/85"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div key={period} className="grid grid-cols-2 sm:grid-cols-4 gap-[9px] mb-5">
        <Kpi icon={ShoppingCart} label="Carritos abandonados" tone="hero">
          <CountUp value={d.abandoned} />
        </Kpi>
        <Kpi icon={RefreshCw} label="Recuperados automáticamente">
          <CountUp value={d.recovered} />
        </Kpi>
        <Kpi icon={TrendingUp} label="Tasa de recuperación">
          <CountUp value={d.rate} suffix="%" />
        </Kpi>
        <Kpi icon={DollarSign} label="Ingresos recuperados">
          <CountUp value={d.revenue} prefix="$" />
        </Kpi>
      </div>

      <div className="grid sm:grid-cols-[1.3fr_1fr] gap-[10px] mb-5">
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px]">
          <div className="text-[12px] font-semibold mb-[10px]">Embudo de conversión</div>
          <div className="space-y-[7px]">
            {FUNNEL.map((f, i) => (
              <div key={f.label} className="relative h-[22px]">
                <div className="absolute inset-0 rounded-[5px] bg-white/[0.05]" />
                <GrowBar
                  pct={f.value}
                  axis="x"
                  delay={0.08 + i * 0.08}
                  className="h-full rounded-[5px]"
                  style={{ backgroundColor: i === FUNNEL.length - 1 ? GREEN : ACCENT }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-[9px] text-[9.5px] font-medium text-white">
                  <span>{f.label}</span>
                  <span style={{ fontFamily: "ui-monospace, monospace" }}>{f.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px]">
          <div className="text-[12px] font-semibold mb-[10px]">Ingresos recuperados, últimos 7 días</div>
          <div className="relative h-[108px] flex items-end justify-between gap-[6px]">
            {DAYS.map((dpt, i) => (
              <div key={dpt.label} className="flex-1 h-full flex items-end">
                <GrowBar
                  pct={(dpt.value / DAYS_MAX) * 100}
                  axis="y"
                  delay={0.05 + i * 0.05}
                  className="w-full rounded-t-[3px]"
                  style={{ backgroundColor: ACCENT }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-[6px] text-[8px] text-white/45" style={{ fontFamily: "ui-monospace, monospace" }}>
            {DAYS.map((dpt) => (
              <span key={dpt.label}>{dpt.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px]">
        <div className="text-[12px] font-semibold mb-[10px]">Secuencia automática de recuperación</div>
        <div className="flex flex-wrap gap-[8px] mb-[12px]" role="tablist" aria-label="Pasos de la secuencia">
          {SEQUENCE.map((s, i) => {
            const on = i === step;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setStep(i)}
                className={`inline-flex items-center gap-[6px] rounded-full px-[11px] py-[7px] text-[10.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#4A9FD8] ${
                  on ? "text-[#0F1420]" : "text-white/70 bg-white/[0.05] hover:bg-white/[0.09]"
                }`}
                style={on ? { backgroundColor: AMBER } : undefined}
              >
                <Clock3 className="w-[11px] h-[11px]" aria-hidden="true" />
                {s.title}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col sm:flex-row sm:items-center gap-[12px] rounded-[12px] bg-[#161C33] border border-white/10 p-[14px]"
          >
            <span className="w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(34,197,94,0.14)" }}>
              <WhatsAppLogo className="w-[17px] h-[17px]" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[7px] mb-[4px]">
                <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: AMBER }}>
                  {active.tag}
                </span>
                <span className="inline-flex items-center gap-[4px] text-[9px] text-white/55">
                  <Check className="w-[9px] h-[9px]" aria-hidden="true" />
                  {active.status}
                </span>
              </div>
              <p className="text-[11.5px] leading-[1.5] text-white/90">{active.msg}</p>
            </div>
            <MessageCircle className="w-[16px] h-[16px] text-white/30 shrink-0 hidden sm:block" aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
