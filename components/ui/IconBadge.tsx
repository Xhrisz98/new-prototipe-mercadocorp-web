"use client";

import React from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Contenedor de ícono para las tarjetas que se quedan solo con iconografía
// (tarjetas de servicio de los hubs, Especialización Dual de Nosotros).
// El fondo es un gradiente del mismo azul de marca a baja opacidad: la
// diferenciación entre tarjetas se hace con opacidad, nunca con un tercer color.
const SIZES = {
  sm: { box: "w-10 h-10", icon: "w-5 h-5" },
  md: { box: "w-12 h-12", icon: "w-6 h-6" },
  lg: { box: "w-14 h-14", icon: "w-7 h-7" },
} as const;

// Clases completas por variante: Tailwind escanea el fuente de forma estática, así
// que una clase armada por interpolación (`border-[var(${token})]`) nunca se genera.
const ACCENTS = {
  brand: {
    surface:
      "border-[var(--color-primary)]/20 bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-primary)]/5",
    icon: "text-[var(--color-primary)]",
  },
  ai: {
    surface:
      "border-[var(--color-ai-accent)]/25 bg-gradient-to-br from-[var(--color-ai-accent)]/15 to-[var(--color-ai-accent)]/5",
    icon: "text-[var(--color-ai-accent)]",
  },
} as const;

export interface IconBadgeProps {
  /** Ícono de lucide-react (el componente, no el elemento). */
  icon: React.ComponentType<{ className?: string }>;
  size?: keyof typeof SIZES;
  shape?: "squircle" | "circle";
  /** Acento de IA: reservado a contexto Mind/agentes. */
  accent?: "brand" | "ai";
  /** Reveal por scroll (§5.5). Desactívalo dentro de una Card que ya revela. */
  reveal?: boolean;
  revealIndex?: number;
  className?: string;
}

export function IconBadge({
  icon: Icon,
  size = "md",
  shape = "squircle",
  accent = "brand",
  reveal = true,
  revealIndex = 0,
  className = "",
}: IconBadgeProps) {
  const dims = SIZES[size];
  const tone = ACCENTS[accent];

  const badge = (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center border",
        dims.box,
        shape === "circle" ? "rounded-full" : "rounded-2xl",
        tone.surface,
        // Rotación máxima de 3°, según el límite acordado.
        "transition-transform duration-300 ease-out",
        "hover:scale-105 hover:rotate-3 group-hover:scale-105 group-hover:rotate-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className={`${dims.icon} ${tone.icon}`} aria-hidden="true" />
    </span>
  );

  if (!reveal) return badge;

  return (
    <RevealOnScroll index={revealIndex} className="inline-flex">
      {badge}
    </RevealOnScroll>
  );
}
