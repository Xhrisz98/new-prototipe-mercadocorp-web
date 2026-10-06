"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

export interface TrajectoryYear {
  year: string;
  /** Insignia de estado ("Visión"/"Proyección") — nunca se presenta como logro. */
  badge: string;
  milestones: { title: string; description: string }[];
}

interface TrajectoryTabsProps {
  years: TrajectoryYear[];
  tablistLabel: string;
  /** Íconos por año, en el mismo orden que `milestones` de ese año. */
  icons: Record<string, LucideIcon[]>;
}

// Pestañas accesibles por año (PROJECT_PLAN.md §5 — caso especial de Nosotros).
// Activación automática: la flecha mueve el foco Y selecciona a la vez (patrón WAI-ARIA
// "Tabs with Automatic Activation") — más simple que activación manual y correcto para
// contenido liviano como este. Roving tabindex: solo la pestaña activa es alcanzable
// con Tab; las demás se navegan con flechas/Home/End.
export function TrajectoryTabs({ years, tablistLabel, icons }: TrajectoryTabsProps) {
  const [activeYear, setActiveYear] = useState(years[0]?.year ?? "");
  const [displayedYear, setDisplayedYear] = useState(activeYear);
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
        className="inline-flex p-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] mb-10"
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
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
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
        <div className="mb-6">
          <Badge variant="outline" size="sm">
            {displayed.badge}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayed.milestones.map((m, i) => {
            const Icon = icons[displayed.year]?.[i];
            return (
              // reveal=false: el bloque Trayectoria completo ya revela una vez al
              // entrar al viewport (ver nosotros/page.tsx) — un segundo reveal acá
              // se dispararía de nuevo en cada cambio de pestaña, encima del fade.
              <Card key={m.title} reveal={false} padding="md">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
