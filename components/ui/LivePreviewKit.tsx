"use client";

// Piezas compartidas por los paneles de demo interactivos de ProductShowcase
// (EcommerceLivePreview, AuditoriaLivePreview, AplicacionesLivePreview). MindLivePreview
// no las usa porque su maqueta es un caso aparte (lienzo a escala fija, sidebar + chat
// en vivo) — estas 3 demos son más simples: KPIs que cuentan al entrar en vista y
// barras que crecen, igual que ya hacía Mind, factorizado para no repetirlo 3 veces.

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  locale = "es-EC",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = !!useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / 900);
      setN(value * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  const shown = reduced ? value : n;
  return (
    <span ref={ref}>
      {prefix}
      {shown.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function GrowBar({
  pct,
  axis,
  className,
  style,
  delay = 0,
}: {
  pct: number;
  axis: "x" | "y";
  className: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const reduced = !!useReducedMotion();
  const target = axis === "x" ? { width: `${pct}%` } : { height: `${pct}%` };
  const start = axis === "x" ? { width: reduced ? `${pct}%` : "0%" } : { height: reduced ? `${pct}%` : "0%" };
  return (
    <motion.div
      className={className}
      style={style}
      initial={start}
      whileInView={target}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

export function GrowRing({
  pct,
  size = 96,
  stroke = 9,
  color,
  track = "rgba(255,255,255,0.08)",
  delay = 0,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color: string;
  track?: string;
  delay?: number;
}) {
  const reduced = !!useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (clamp01(pct / 100) * c);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: reduced ? offset : c }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </svg>
  );
}
