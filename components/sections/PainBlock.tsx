"use client";

import React from "react";
import Link from "next/link";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AlertCircle, Clock, TrendingDown, ArrowRight } from "lucide-react";

// Fotografía de stock TEMPORAL (Unsplash) — PROJECT_PLAN.md §5.7.
const PAIN_IMAGES = [
  {
    // TODO: reemplazar con foto propia de una operación real desordenada (pantallas
    // con hojas de cálculo dispersas), cuando exista banco de imágenes de marca.
    src: "/images/stock/tangled-network-cables.jpg",
    alt: "Manojo de cables de red azules entrelazados en un rack, sin orden aparente",
  },
  {
    // TODO: reemplazar con foto propia de un embudo comercial real en el CRM Mind.
    src: "/images/stock/light-streaks-blue.jpg",
    alt: "Estelas de luz azul en larga exposición alejándose sobre un fondo oscuro",
  },
  {
    // TODO: reemplazar con foto propia de un proceso manual repetitivo del cliente.
    src: "/images/stock/optic-fiber-pattern.jpg",
    alt: "Filamentos de fibra óptica azul repitiendo el mismo patrón sobre fondo negro",
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
