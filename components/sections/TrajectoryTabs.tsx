"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

export interface TrajectoryYear {
  year: string;
  /** Insignia de estado ("Hito" para años cerrados, "Visión"/"Proyección" para
   *  años futuros) — un año futuro nunca se presenta como logro. */
  badge: string;
  milestones: { title: string; description: string }[];
}

interface TrajectoryTabsProps {
  years: TrajectoryYear[];
  tablistLabel: string;
  /** Íconos por año, en el mismo orden que `milestones` de ese año. */
  icons: Record<string, LucideIcon[]>;
  /** Año activo al cargar. Si no coincide con ninguno, se usa years[0]. */
  defaultYear?: string;
}

// Pestañas accesibles por año (PROJECT_PLAN.md §5 — caso especial de Nosotros).
// Activación automática: la flecha mueve el foco Y selecciona a la vez (patrón WAI-ARIA
// "Tabs with Automatic Activation") — más simple que activación manual y correcto para
// contenido liviano como este. Roving tabindex: solo la pestaña activa es alcanzable
// con Tab; las demás se navegan con flechas/Home/End.
export function TrajectoryTabs({ years, tablistLabel, icons, defaultYear }: TrajectoryTabsProps) {
  const initialYear = years.some((y) => y.year === defaultYear) ? defaultYear! : (years[0]?.year ?? "");
  const [activeYear, setActiveYear] = useState(initialYear);
  const [displayedYear, setDisplayedYear] = useState(initialYear);
  const [fading, setFading] = useState(false);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectYear = (year: string) => {
    if (year === activeYear) return;
    setActiveYear(year);

    if (reduceMotion) {
      setDisplayedYear(year);
      return;
    }

    setFading(true);
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    // 150ms = --duration-menu (lib/design-tokens.ts): mismo tiempo que el resto de
    // los cambios de estado de UI (dropdowns, FAQ). El doble rAF espera a que el
    // navegador pinte el contenido nuevo en opacity:0 antes de soltarlo a 1 — sin
    // esto, React agrupa ambos setState y el fade-in nunca se ve (salto directo).
    fadeTimeout.current = setTimeout(() => {
      setDisplayedYear(year);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setFading(false));
      });
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % years.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + years.length) % years.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = years.length - 1;
    if (nextIdx === null) return;

    e.preventDefault();
    const nextYear = years[nextIdx].year;
    selectYear(nextYear);
    tabRefs.current[nextYear]?.focus();
  };

  const displayed = years.find((y) => y.year === displayedYear) ?? years[0];
  if (!displayed) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label={tablistLabel}
        className="inline-flex p-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] mb-12"
      >
        {years.map((y, idx) => {
          const isActive = y.year === activeYear;
          return (
            <button
              key={y.year}
              ref={(el) => {
                tabRefs.current[y.year] = el;
              }}
              type="button"
              role="tab"
              id={`nosotros-tab-${y.year}`}
              aria-selected={isActive}
              aria-controls={`nosotros-panel-${y.year}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectYear(y.year)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              // motion-safe:hover:scale — mismo micro-gesto que Button.tsx (1.01-1.03),
              // nunca en la pestaña activa: ya está "levantada" por su propio color.
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-[background-color,color,transform] duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.97]"
              }`}
            >
              {y.year}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`nosotros-panel-${displayed.year}`}
        aria-labelledby={`nosotros-tab-${displayed.year}`}
        tabIndex={0}
        className={`rounded-2xl transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mb-8">
          <Badge variant="outline" size="sm">
            {displayed.badge}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayed.milestones.map((m, i) => {
            const Icon = icons[displayed.year]?.[i];
            const isLast = i === displayed.milestones.length - 1;
            return (
              <div key={m.title} className="flex flex-col">
                {/* Línea de tiempo: nodo centrado sobre cada tarjeta + conector que
                    empalma exactamente en la mitad del gap con el nodo vecino (cada
                    nodo extiende la mitad de su propio ancho de columna + la mitad
                    del gap-6 hacia cada lado — funciona para cualquier cantidad de
                    columnas, no solo 2). Decorativo: oculto en mobile apilado, donde
                    una línea horizontal entre tarjetas no se lee como secuencia. */}
                <div className="relative hidden sm:flex justify-center mb-5 h-3.5" aria-hidden="true">
                  {/* gap-6 = 1.5rem: cada mitad de conector cubre 50% de su propia
                      columna + 0.75rem (mitad del gap) — empalma exacto con el vecino
                      sin medir nada en JS, para cualquier cantidad de columnas. */}
                  {i > 0 && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-1/2 w-[calc(50%+0.75rem)] h-px bg-[var(--color-border)]" />
                  )}
                  {!isLast && (
                    <span className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[calc(50%+0.75rem)] h-px bg-[var(--color-border)]" />
                  )}
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)]/40 motion-safe:animate-pulse" />
                    <span className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-surface)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                    </span>
                  </span>
                </div>

                {/* reveal=false: el bloque Trayectoria completo ya revela una vez al
                    entrar al viewport (ver nosotros/page.tsx) — un segundo reveal acá
                    se dispararía de nuevo en cada cambio de pestaña, encima del fade. */}
                <Card reveal={false} padding="md" className="flex-1">
                  {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" aria-hidden="true" />
                    </div>
                  )}
                  <h3
                    className="text-lg font-semibold text-[var(--color-text)] mb-2"
                    style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {m.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
