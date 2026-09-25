"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

// §5.5 — Estándar único de scroll-reveal del sitio. Ningún componente escribe su
// propia animación de entrada: todos pasan por este wrapper.
const SLIDE_PX = 14; // rango 12-16px de §5.5
const STAGGER_S = 0.08; // ~80ms entre hermanos de un mismo grid/lista

export interface RevealOnScrollProps {
  children: React.ReactNode;
  /** Posición entre hermanos: aplica el stagger de ~80ms. */
  index?: number;
  /** Retraso extra en segundos, además del stagger por índice. */
  delay?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  index = 0,
  delay = 0,
  className,
}: RevealOnScrollProps) {
  // prefers-reduced-motion: se mantiene el fade y se elimina el desplazamiento.
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : SLIDE_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.5,
        ease: "easeOut",
        delay: delay + index * STAGGER_S,
      }}
    >
      {children}
    </motion.div>
  );
}
