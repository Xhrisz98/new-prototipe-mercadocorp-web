"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface CaseStudyItem {
  client: string;
  pillar: string;
  problem: string;
  solution: string;
}

interface CaseStudyPreviewProps {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  items: CaseStudyItem[];
}

export function CaseStudyPreview({
  title,
  subtitle,
  cta,
  items,
}: CaseStudyPreviewProps) {
  return (
    <section className="w-full py-20 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2
              className="text-2xl sm:text-4xl font-medium tracking-tight mb-2 text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            >
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-xl">
              {subtitle}
            </p>
          </div>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity shrink-0 group"
          >
            <span>{cta.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* flex-wrap en vez de grid de 3 columnas fijas: con 2 casos (el número
            actual, antes de confirmar más clientes) un grid de 3 dejaba la tarjeta
            sola pegada a la izquierda con un hueco al lado. Cada tarjeta conserva el
            ancho de una columna de 3 en md+ (flex-none, no crece) y el conjunto se
            centra con justify-center sin importar cuántas quepan en la fila. */}
        <div className="flex flex-wrap justify-center gap-6">
          {items.map((item) => (
            <div
              key={item.client}
              className="w-full md:w-[calc(33.333%-16px)] flex-none p-7 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="brand" size="sm">
                    {item.pillar}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">
                  {item.client}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-[var(--color-text)] block mb-1">
                      Desafío:
                    </span>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border)]/50">
                    <span className="font-semibold text-[var(--color-primary)] flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Solución Implementada:
                    </span>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
