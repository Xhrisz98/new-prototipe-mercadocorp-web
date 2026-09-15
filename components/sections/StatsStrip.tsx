"use client";

import React from "react";

interface StatsStripProps {
  stats?: { value: string; label: string; description: string }[];
}

export function StatsStrip({ stats }: StatsStripProps) {
  // Cifras generales de capacidad por defecto (del copy oficial de Inicio)
  const defaultStats = [
    {
      value: "24/7",
      label: "Operación Continua",
      description: "Atención y ventas automatizadas, sin horario",
    },
    {
      value: "100%",
      label: "Trazabilidad",
      description: "Cero leads perdidos por falta de seguimiento",
    },
    {
      value: "Ecuador · LatAm",
      label: "Alcance",
      description: "Presencia y operación remota sin fricción",
    },
    {
      value: "A medida",
      label: "Personalización",
      description: "Construido sobre su operación real, sin plantillas",
    },
  ];

  const items = stats || defaultStats;

  return (
    <section className="w-full py-16 border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-primary)] mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {item.value}
              </div>
              <div className="text-sm font-bold text-[var(--color-text)] mb-1">
                {item.label}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
