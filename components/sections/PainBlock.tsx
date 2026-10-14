"use client";

import React from "react";
import Link from "next/link";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AlertCircle, Clock, TrendingDown, ArrowRight } from "lucide-react";

// Fotografía de los 3 ítems de dolor — PROJECT_PLAN.md §5.7. El orden corresponde al
// de content.pain.items (Caos Operativo, Ventas que se Enfrían Solas, Tiempo Atrapado
// en Tareas Repetitivas).
const PAIN_IMAGES = [
  {
    src: "/images/stock/pain-caos-operativo.jpg",
    alt: "Profesional agobiado por documentos y dispositivos dispersos, sin control de la operación",
  },
  {
    src: "/images/stock/pain-ventas-enfrian-solas.jpg",
    alt: "Profesional revisando el celular rodeado de íconos de oportunidades de venta sin gestionar",
  },
  {
    src: "/images/stock/pain-tiempo-atrapado-tareas-repetitivas.jpg",
    alt: "Profesional abrumado por tareas manuales mientras el tiempo avanza sin control",
  },
];

interface PainBlockProps {
  title: string;
  intro: string;
  items: { title: string; description: string; tag: string }[];
  ctaText: string;
  ctaLink: string;
}

export function PainBlock({ title, intro, items, ctaText, ctaLink }: PainBlockProps) {
  // Los 3 íconos comparten el azul de marca (--color-primary); la diferenciación
  // visual entre tarjetas viene de la opacidad, no de hues distintos fuera de token.
  const ICON_OPACITY = ["", "/80", "/65"];

  const getIcon = (idx: number) => {
    const className = `w-5 h-5 text-[var(--color-primary)]${ICON_OPACITY[idx] ?? ""}`;
    switch (idx) {
      case 1:
        return <TrendingDown className={className} />;
      case 2:
        return <Clock className={className} />;
      default:
        return <AlertCircle className={className} />;
    }
  };

  return (
    <section className="w-full py-20 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="max-w-3xl mx-auto text-center mb-14">
          <h2
            className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {intro}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {items.map((item, idx) => (
            <PhotoCard
              key={item.title}
              image={PAIN_IMAGES[idx % PAIN_IMAGES.length]}
              revealIndex={idx}
              overlay={
                <span className="inline-flex items-center rounded-full bg-black/55 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              }
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-border)]/40">
                {getIcon(idx)}
              </div>

              <h3 className="text-lg font-bold mb-3 text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </PhotoCard>
          ))}
        </div>

        {/* Micro-CTA de cierre de bloque */}
        <div className="text-center">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:opacity-85 transition-opacity group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
