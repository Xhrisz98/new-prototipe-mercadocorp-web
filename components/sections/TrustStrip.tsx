"use client";

import React from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface TrustStripProps {
  title: string;
  logos: { name: string; category: string }[];
}

// Logos oficiales reales descargados de svgl.app (public/images/logos/) — ver
// PROJECT_PLAN.md/AGENTS.md: marcas de terceros usan su SVG oficial, nunca un
// ícono genérico. Cada entrada es una o más "marcas" (Next.js/OpenAI/Claude/etc.);
// OpenAI/Claude muestra ambos logos reales lado a lado dentro de un mismo card.
// `light`/`dark` para el logo que sí trae variante de tema en svgl (OpenAI); el
// resto usa `src` fijo — ya se verificó visualmente que su color de marca
// mantiene contraste en ambos fondos de la tarjeta.
interface LogoMark {
  src?: string;
  light?: string;
  dark?: string;
  alt: string;
}

const LOGO_MARKS: Record<string, LogoMark[]> = {
  "Next.js": [{ src: "/images/logos/nextjs.svg", alt: "Next.js" }],
  "Python / AI": [{ src: "/images/logos/python.svg", alt: "Python" }],
  PostgreSQL: [{ src: "/images/logos/postgresql.svg", alt: "PostgreSQL" }],
  "OpenAI / Claude": [
    { light: "/images/logos/openai-light.svg", dark: "/images/logos/openai-dark.svg", alt: "OpenAI" },
    { src: "/images/logos/claude.svg", alt: "Claude" },
  ],
  "WhatsApp Business API": [{ src: "/images/logos/whatsapp.svg", alt: "WhatsApp Business API" }],
  // Meta Ads / Google Ads: svgl.app no tiene un logo específico de "Ads" — se
  // confirmó revisando las 670 entradas del catálogo. Se usa el logo de marca
  // (Meta/Google), decisión confirmada con el usuario.
  "Meta Ads": [{ src: "/images/logos/meta.svg", alt: "Meta" }],
  "Google Ads": [{ src: "/images/logos/google.svg", alt: "Google" }],
  // WooCommerce no existe en svgl.app bajo ningún nombre — se usa solo el logo
  // de Shopify, decisión confirmada con el usuario.
  "Shopify / WooCommerce": [{ src: "/images/logos/shopify.svg", alt: "Shopify" }],
};

function LogoMarkImg({ mark, isDark }: { mark: LogoMark; isDark: boolean }) {
  const src = mark.src ?? (isDark ? mark.dark : mark.light);
  if (!src) return null;
  // SVG de marca estático y diminuto (<9kb): no aporta nada pasarlo por next/image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={mark.alt} className="h-5 w-5 object-contain" />;
}

export function TrustStrip({ title, logos }: TrustStripProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
          {logos.map((logo) => {
            const marks = LOGO_MARKS[logo.name];
            return (
              <div
                key={logo.name}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {marks ? (
                  <div className="flex items-center gap-1 shrink-0">
                    {marks.map((mark, i) => (
                      <LogoMarkImg key={i} mark={mark} isDark={isDark} />
                    ))}
                  </div>
                ) : null}
                <div>
                  <span className="text-xs font-bold block">{logo.name}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] block">
                    {logo.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
