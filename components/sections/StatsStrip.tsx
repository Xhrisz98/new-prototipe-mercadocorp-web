"use client";

import React from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Palabras de este largo o más ("Multicanal" = 10) ajustan su tamaño a la columna.
const LONG_WORD = 9;

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
          {items.map((item, idx) => {
            // Causa raíz del overflow horizontal de Marketing: un valor como
            // "Complementario" (una sola palabra, ~7.3em de ancho) en tipografía de
            // tamaño fijo (text-3xl…5xl) no cabe en una columna de 2/4 y se sale del
            // viewport. break-words partiría la palabra a mitad; en cambio, los valores
            // con una palabra larga ajustan su tamaño al ancho de SU columna (container
            // query), con el tamaño de siempre como tope. Los valores cortos ("24/7",
            // "100%") no cambian.
            const longest = Math.max(...item.value.split(/\s+/).map((w) => w.length));
            const fit = longest >= LONG_WORD;
            return (
              <RevealOnScroll key={item.label} index={idx}>
                <div
                  className="text-center sm:text-left"
                  style={fit ? { containerType: "inline-size" } : undefined}
                >
                  <div
                    className={`font-extrabold text-[var(--color-primary)] mb-2 tracking-tight ${
                      fit
                        ? "text-[length:min(var(--fit),1.875rem)] sm:text-[length:min(var(--fit),2.25rem)] lg:text-[length:min(var(--fit),3rem)]"
                        : "text-3xl sm:text-4xl lg:text-5xl"
                    }`}
                    style={{
                      fontFamily: "var(--font-kanit), sans-serif",
                      fontStyle: "italic",
                      // 0.6em por carácter (medido: 0.52em en Kanit extrabold cursiva,
                      // con holgura): 100cqw / (0.6 × letras) = tamaño que cabe.
                      ...(fit ? ({ "--fit": `${(100 / (0.6 * longest)).toFixed(2)}cqw` } as React.CSSProperties) : {}),
                    }}
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
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
