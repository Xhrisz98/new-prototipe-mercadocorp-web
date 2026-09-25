"use client";

import React from "react";
import { Cpu, Server, MessageSquareCode, ShoppingBag, BrainCircuit, Database } from "lucide-react";

interface TrustStripProps {
  title: string;
  logos: { name: string; category: string }[];
}

export function TrustStrip({ title, logos }: TrustStripProps) {
  const getIcon = (idx: number) => {
    switch (idx % 6) {
      case 0:
        return <Cpu className="w-4 h-4" />;
      case 1:
        return <BrainCircuit className="w-4 h-4" />;
      case 2:
        return <MessageSquareCode className="w-4 h-4" />;
      case 3:
        return <ShoppingBag className="w-4 h-4" />;
      case 4:
        return <Server className="w-4 h-4" />;
      case 5:
        return <Database className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section className="w-full py-10 border-y border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-[var(--color-text-muted)] mb-8">
          {title}
        </p>

        {/* flex-wrap en vez de grid de columnas fijas: con un número de logos que no
            llena exacto la última fila (5, 3...), un grid dejaba la fila incompleta
            desalineada a la izquierda. Con flex-wrap + justify-center, cualquier
            cantidad queda centrada, y cada tarjeta mide su propio contenido (nunca
            truncado) en vez de una columna de ancho fijo. */}
        <div className="flex flex-wrap justify-center gap-4">
          {logos.map((logo, idx) => (
            <div
              key={logo.name}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="text-[var(--color-primary)] shrink-0">
                {getIcon(idx)}
              </div>
              <div>
                <span className="text-xs font-bold block">{logo.name}</span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  {logo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
