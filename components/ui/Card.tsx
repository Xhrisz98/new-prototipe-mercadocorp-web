"use client";

import React from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Base compartida de todas las tarjetas del sitio. Antes de esto cada tarjeta se
// replicaba a mano mezclando radios distintos (rounded-xl/2xl/3xl); aquí el radio
// es uno solo y la profundidad sale de la sombra en capas de §5.6.
const RADIUS = "rounded-3xl";

const PADDING = {
  none: "",
  sm: "p-5 sm:p-6",
  md: "p-6 sm:p-7",
  lg: "p-8 sm:p-9",
} as const;

export interface CardProps {
  children: React.ReactNode;
  /** Elevación sutil (-3px) + sombra intensificada al pasar el cursor. */
  interactive?: boolean;
  /** "none" para tarjetas con media a sangre (ver PhotoCard). */
  padding?: keyof typeof PADDING;
  /** Reveal por scroll (§5.5). Desactívalo si un ancestro ya revela este bloque. */
  reveal?: boolean;
  /** Posición entre hermanos para el stagger de ~80ms. */
  revealIndex?: number;
  /** Acento de IA: reservado a contexto Mind/agentes. */
  accent?: "brand" | "ai";
  className?: string;
}

export function Card({
  children,
  interactive = true,
  padding = "lg",
  reveal = true,
  revealIndex = 0,
  accent = "brand",
  className = "",
}: CardProps) {
  const accentBorder =
    accent === "ai" ? "border-[var(--color-ai-accent)]/30" : "border-[var(--color-border)]";
  const hoverBorder =
    accent === "ai"
      ? "hover:border-[var(--color-ai-accent)]/70"
      : "hover:border-[var(--color-primary)]/50";

  const card = (
    <div
      className={[
        "relative flex h-full flex-col overflow-hidden border bg-[var(--color-surface)]",
        RADIUS,
        accentBorder,
        "card-elevation transition-[transform,box-shadow,border-color] duration-300",
        interactive
          ? `card-elevation-interactive hover:-translate-y-[3px] ${hoverBorder}`
          : "",
        PADDING[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );

  if (!reveal) return card;

  return (
    <RevealOnScroll index={revealIndex} className="h-full">
      {card}
    </RevealOnScroll>
  );
}
