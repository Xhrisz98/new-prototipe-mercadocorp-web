"use client";

// Demo interactiva (datos de relleno, sin cliente real — PROJECT_PLAN.md §5.4 "Capa 2")
// para el ProductShowcase de /auditoria-digital: 3 pestañas reales (Resumen, Hallazgos,
// Hoja de Ruta) que responden al click, más anillos y barras que se dibujan al entrar
// en vista — mismo lenguaje visual que EcommerceLivePreview/MindLivePreview.

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gauge, Search, Megaphone, MousePointerClick, AlertTriangle, CheckCircle2, Circle, type LucideIcon } from "lucide-react";
import { CountUp, GrowRing } from "@/components/ui/LivePreviewKit";

const ACCENT = "#0022D2";
const GREEN = "#22C55E";
const AMBER = "#EAB308";
const RED = "#EF4444";

type TabId = "resumen" | "hallazgos" | "hoja-de-ruta";
const TABS: { id: TabId; label: string }[] = [
  { id: "resumen", label: "Resumen" },
  { id: "hallazgos", label: "Hallazgos" },
  { id: "hoja-de-ruta", label: "Hoja de Ruta" },
];

const SCORES = [
  { icon: Gauge, label: "Rendimiento web", value: 58, color: AMBER },
  { icon: Search, label: "SEO técnico", value: 41, color: RED },
  { icon: Megaphone, label: "Pauta & ROAS", value: 72, color: GREEN },
  { icon: MousePointerClick, label: "Experiencia de usuario", value: 64, color: AMBER },
];

type Severity = "Alta" | "Media" | "Baja";
const SEVERITY_STYLE: Record<Severity, { bg: string; fg: string }> = {
  Alta: { bg: "rgba(239,68,68,0.16)", fg: "#F87171" },
  Media: { bg: "rgba(234,179,8,0.16)", fg: "#EAB308" },
  Baja: { bg: "rgba(34,197,94,0.16)", fg: "#34D07A" },
};

const FINDINGS: { title: string; severity: Severity; detail: string }[] = [
  {
    title: "Tiempo de carga móvil sobre 4.2s en páginas de producto",
    severity: "Alta",
    detail: "El 68% de las visitas llega desde celular; cada segundo adicional de carga reduce la conversión de forma medible.",
  },
  {
    title: "Sin etiquetado estructurado (schema) en el catálogo",
    severity: "Alta",
    detail: "Los resultados de búsqueda no muestran precio, stock ni reseñas — se pierde visibilidad frente a la competencia.",
  },
  {
    title: "Campañas activas sin seguimiento de conversión offline",
    severity: "Media",
    detail: "El presupuesto se asigna sin saber qué anuncio generó la venta final, solo el clic inicial.",
  },
  {
    title: "Formulario de contacto sin validación en tiempo real",
    severity: "Baja",
    detail: "Genera errores de envío silenciosos que no quedan registrados en ningún reporte.",
  },
];

const ROADMAP = [
  { range: "Día 0–30", title: "Fundamentos técnicos", items: ["Optimización de velocidad e imágenes", "Schema y metadatos del catálogo"] },
  { range: "Día 31–60", title: "Visibilidad y pauta", items: ["Reestructuración de campañas activas", "Seguimiento de conversión end-to-end"] },
  { range: "Día 61–90", title: "Conversión y retención", items: ["Pruebas A/B en checkout", "Automatización de remarketing"] },
];

function ScoreCard({ icon: Icon, label, value, color, delay }: { icon: LucideIcon; label: string; value: number; color: string; delay: number }) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px] flex items-center gap-[12px]">
      <div className="relative w-[64px] h-[64px] shrink-0 flex items-center justify-center">
        <GrowRing pct={value} size={64} stroke={6} color={color} delay={delay} />
        <span className="absolute text-[14px] font-bold" style={{ fontFamily: "ui-monospace, monospace" }}>
          <CountUp value={value} />
        </span>
      </div>
      <div className="min-w-0">
        <Icon className="w-[13px] h-[13px] text-white/55 mb-[4px]" aria-hidden="true" />
        <div className="text-[11px] font-medium text-white/85 leading-tight">{label}</div>
      </div>
    </div>
  );
}

function ResumenTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
      {SCORES.map((s, i) => (
        <ScoreCard key={s.label} {...s} delay={0.08 + i * 0.08} />
      ))}
    </div>
  );
}

function HallazgosTab() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div className="space-y-[8px]">
      {FINDINGS.map((f, i) => {
        const open = i === openIdx;
        const sev = SEVERITY_STYLE[f.severity];
        return (
          <div key={f.title} className="rounded-[12px] border border-white/10 bg-white/[0.03] overflow-hidden">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 px-[14px] py-[11px] text-left focus-visible:outline-2 focus-visible:outline-[#4A9FD8]"
            >
              <span className="flex items-center gap-[9px] min-w-0">
                <AlertTriangle className="w-[13px] h-[13px] shrink-0" style={{ color: sev.fg }} aria-hidden="true" />
                <span className="text-[11.5px] font-medium text-white/90 truncate">{f.title}</span>
              </span>
              <span className="shrink-0 rounded-full px-[8px] py-[3px] text-[9px] font-semibold" style={{ backgroundColor: sev.bg, color: sev.fg }}>
                {f.severity}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-[14px] pb-[12px] text-[10.5px] leading-[1.5] text-white/60">{f.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function HojaDeRutaTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
      {ROADMAP.map((phase, i) => (
        <motion.div
          key={phase.range}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="rounded-[12px] border border-white/10 bg-white/[0.03] p-[14px]"
        >
          <span className="inline-block rounded-full px-[9px] py-[3px] text-[9px] font-semibold mb-[8px]" style={{ backgroundColor: "rgba(0,34,210,0.18)", color: "#8FA3F5" }}>
            {phase.range}
          </span>
          <div className="text-[12px] font-semibold text-white/90 mb-[8px]">{phase.title}</div>
          <ul className="space-y-[6px]">
            {phase.items.map((it) => (
              <li key={it} className="flex items-start gap-[6px] text-[10.5px] text-white/60 leading-[1.4]">
                <CheckCircle2 className="w-[12px] h-[12px] mt-[1px] shrink-0" style={{ color: ACCENT === "#0022D2" ? "#5D7BFF" : ACCENT }} aria-hidden="true" />
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

export function AuditoriaLivePreview() {
  const [tab, setTab] = useState<TabId>("resumen");
  return (
    <div
      role="region"
      aria-label="Demostración interactiva de scorecard de auditoría con datos de ejemplo"
      className="w-full bg-[#0F1420] text-[#F1F3F8] px-4 py-5 sm:px-6 sm:py-6"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-[15px] font-semibold">Scorecard Ejecutivo</h3>
          <p className="text-[10.5px] text-white/55 mt-[3px]">Diagnóstico técnico y comercial, actualizado por periodo de auditoría</p>
        </div>
        <Circle className="w-[7px] h-[7px] fill-current text-white/20 hidden sm:block" aria-hidden="true" />
      </div>

      <div role="tablist" aria-label="Secciones del scorecard" className="flex flex-wrap gap-[6px] mb-5">
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t.id)}
              className={`px-[12px] py-[8px] rounded-[9px] text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#4A9FD8] ${
                on ? "text-white" : "text-white/55 bg-white/[0.04] hover:bg-white/[0.08]"
              }`}
              style={on ? { backgroundColor: ACCENT } : undefined}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
          {tab === "resumen" && <ResumenTab />}
          {tab === "hallazgos" && <HallazgosTab />}
          {tab === "hoja-de-ruta" && <HojaDeRutaTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
