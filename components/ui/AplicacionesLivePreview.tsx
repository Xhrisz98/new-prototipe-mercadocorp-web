"use client";

// Demo interactiva (datos de relleno, sin cliente real — PROJECT_PLAN.md §5.4 "Capa 2")
// para el ProductShowcase de /aplicaciones-herramientas-digitales: navegación real entre
// 3 vistas (Dashboard, Inventario, Roles) más barras que crecen al entrar en vista —
// mismo lenguaje visual que Ecommerce/AuditoriaLivePreview.

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Boxes, ShieldCheck, Package, Users2, ClipboardList, Check, Minus, type LucideIcon } from "lucide-react";
import { CountUp, GrowBar } from "@/components/ui/LivePreviewKit";

const ACCENT = "#0022D2";
const GREEN = "#22C55E";
const AMBER = "#EAB308";
const RED = "#EF4444";

type ViewId = "dashboard" | "inventario" | "roles";
const NAV: { id: ViewId; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "inventario", label: "Inventario", icon: Boxes },
  { id: "roles", label: "Roles", icon: ShieldCheck },
];

const ORDERS = [
  { label: "Lun", value: 24 },
  { label: "Mar", value: 31 },
  { label: "Mié", value: 18 },
  { label: "Jue", value: 40 },
  { label: "Vie", value: 52 },
  { label: "Sáb", value: 29 },
  { label: "Dom", value: 14 },
];
const ORDERS_MAX = 55;

const INVENTORY = [
  { name: "Insumo A-204", stock: 82, status: "ok" as const },
  { name: "Insumo B-110", stock: 14, status: "low" as const },
  { name: "Insumo C-305", stock: 0, status: "out" as const },
  { name: "Insumo D-018", stock: 63, status: "ok" as const },
];
const STATUS_STYLE: Record<string, { label: string; color: string }> = {
  ok: { label: "Stock normal", color: GREEN },
  low: { label: "Stock bajo", color: AMBER },
  out: { label: "Agotado", color: RED },
};

const ROLES = ["Admin", "Vendedor", "Bodega"];
const PERMISSIONS = [
  { label: "Ver pedidos", access: [true, true, true] },
  { label: "Editar inventario", access: [true, false, true] },
  { label: "Gestionar usuarios", access: [true, false, false] },
  { label: "Ver finanzas", access: [true, false, false] },
];

function DashboardView() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-[9px] mb-[14px]">
        <div className="rounded-[14px] border border-transparent p-[13px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #3F5FFF 100%)` }}>
          <div className="text-[10px] text-white/85 mb-[6px]">Pedidos hoy</div>
          <div className="text-[19px] font-bold text-white" style={{ fontFamily: "ui-monospace, monospace" }}>
            <CountUp value={52} />
          </div>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[13px]">
          <div className="text-[10px] text-white/55 mb-[6px]">Stock bajo</div>
          <div className="text-[19px] font-bold" style={{ fontFamily: "ui-monospace, monospace", color: AMBER }}>
            <CountUp value={2} />
          </div>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[13px]">
          <div className="text-[10px] text-white/55 mb-[6px]">Usuarios activos</div>
          <div className="text-[19px] font-bold" style={{ fontFamily: "ui-monospace, monospace" }}>
            <CountUp value={11} />
          </div>
        </div>
      </div>

      <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px]">
        <div className="text-[12px] font-semibold mb-[10px]">Pedidos de la semana</div>
        <div className="relative h-[104px] flex items-end justify-between gap-[6px]">
          {ORDERS.map((o, i) => (
            <div key={o.label} className="flex-1 h-full flex items-end">
              <GrowBar pct={(o.value / ORDERS_MAX) * 100} axis="y" delay={0.05 + i * 0.05} className="w-full rounded-t-[3px]" style={{ backgroundColor: ACCENT }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-[6px] text-[8px] text-white/45" style={{ fontFamily: "ui-monospace, monospace" }}>
          {ORDERS.map((o) => (
            <span key={o.label}>{o.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InventarioView() {
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px]">
      <div className="flex items-center gap-[7px] text-[12px] font-semibold mb-[12px]">
        <Package className="w-[13px] h-[13px] text-white/55" aria-hidden="true" />
        Control de inventario
      </div>
      <div className="space-y-[10px]">
        {INVENTORY.map((it, i) => {
          const s = STATUS_STYLE[it.status];
          return (
            <div key={it.name}>
              <div className="flex items-center justify-between text-[11px] mb-[5px]">
                <span className="font-medium text-white/85">{it.name}</span>
                <span className="font-semibold" style={{ color: s.color }}>
                  {s.label}
                </span>
              </div>
              <div className="h-[7px] rounded-full bg-white/[0.06] overflow-hidden">
                <GrowBar pct={it.stock} axis="x" delay={0.05 + i * 0.07} className="h-full rounded-full" style={{ backgroundColor: s.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RolesView() {
  const [role, setRole] = useState(0);
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-[14px]">
      <div className="flex items-center gap-[7px] text-[12px] font-semibold mb-[12px]">
        <Users2 className="w-[13px] h-[13px] text-white/55" aria-hidden="true" />
        Permisos por rol
      </div>
      <div className="flex gap-[6px] mb-[14px]" role="tablist" aria-label="Rol">
        {ROLES.map((r, i) => {
          const on = i === role;
          return (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setRole(i)}
              className={`px-[11px] py-[7px] rounded-[9px] text-[10.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#4A9FD8] ${
                on ? "text-white" : "text-white/55 bg-white/[0.04] hover:bg-white/[0.08]"
              }`}
              style={on ? { backgroundColor: ACCENT } : undefined}
            >
              {r}
            </button>
          );
        })}
      </div>
      <div className="space-y-[9px]">
        {PERMISSIONS.map((p) => {
          const has = p.access[role];
          return (
            <div key={p.label} className="flex items-center justify-between rounded-[9px] bg-white/[0.02] px-[11px] py-[9px]">
              <span className="text-[11px] text-white/80 flex items-center gap-[7px]">
                <ClipboardList className="w-[12px] h-[12px] text-white/40" aria-hidden="true" />
                {p.label}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${p.label}-${has}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className="w-[20px] h-[20px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: has ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)" }}
                >
                  {has ? <Check className="w-[11px] h-[11px]" style={{ color: GREEN }} aria-hidden="true" /> : <Minus className="w-[11px] h-[11px] text-white/30" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AplicacionesLivePreview() {
  const [view, setView] = useState<ViewId>("dashboard");
  return (
    <div
      role="region"
      aria-label="Demostración interactiva de panel de software a medida con datos de ejemplo"
      className="w-full bg-[#0F1420] text-[#F1F3F8] px-4 py-5 sm:px-6 sm:py-6"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-[15px] font-semibold">Panel Operativo</h3>
          <p className="text-[10.5px] text-white/55 mt-[3px]">Diseñado sobre su operación real — inventario, pedidos y accesos</p>
        </div>
      </div>

      <div role="tablist" aria-label="Secciones del panel" className="flex flex-wrap gap-[6px] mb-5">
        {NAV.map((n) => {
          const on = n.id === view;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setView(n.id)}
              className={`inline-flex items-center gap-[6px] px-[12px] py-[8px] rounded-[9px] text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#4A9FD8] ${
                on ? "text-white" : "text-white/55 bg-white/[0.04] hover:bg-white/[0.08]"
              }`}
              style={on ? { backgroundColor: ACCENT } : undefined}
            >
              <Icon className="w-[12px] h-[12px]" aria-hidden="true" />
              {n.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
          {view === "dashboard" && <DashboardView />}
          {view === "inventario" && <InventarioView />}
          {view === "roles" && <RolesView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
