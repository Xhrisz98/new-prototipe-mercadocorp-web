"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { Bot, Workflow, Code2 } from "lucide-react";
import { colors } from "@/lib/design-tokens";

// Diagrama de nodos 2D (SVG + Motion) — capa 1 de scroll-reveal del hub de
// Tecnología (PROJECT_PLAN.md §5.4). Intencionalmente plano: NO Three.js/R3F,
// para no diluir el valor de las 2 piezas 3D "premium" del sitio (DataFlowCore,
// AgentSphere). Mismo lenguaje visual (conexiones curvas, gradiente azul de
// marca) pero sin WebGL.
const NODES = [
  { id: "ai-agents", icon: Bot, label: "Agentes de IA", x: 14, y: 70 },
  { id: "crm", icon: Workflow, label: "CRM/Automatización", x: 50, y: 24 },
  { id: "software", icon: Code2, label: "Software a Medida", x: 86, y: 70 },
] as const;

const CURVES = [
  "M 14 70 Q 32 20 50 24",
  "M 50 24 Q 68 20 86 70",
];

const containerVariants: Variants = {
  rest: {},
  active: {
    transition: { staggerChildren: 0.28, delayChildren: 0.15 },
  },
};

// Cada nodo es su propio límite de propagación de variantes: el stagger del
// contenedor solo cuenta los 3 nodos, no cada ring/ícono/etiqueta por separado
// (evita que el stagger se multiplique dentro de un mismo nodo).
const nodeVariants: Variants = {
  rest: {},
  active: {},
};

const ringVariants: Variants = {
  rest: { opacity: 0, scale: 0.5 },
  active: {
    opacity: 1,
    scale: 1,
    // Activación puntual del acento #04E7AF antes de asentarse en el azul de
    // marca — excepción permitida por PROJECT_PLAN.md §5.4 (contexto Tecnología/IA).
    backgroundColor: [colors.brand.primary, colors.brand.aiAccent, colors.brand.primary],
    transition: {
      // `times` solo aplica al color (única propiedad con 3 keyframes reales) —
      // compartirlo con opacity/scale (valores simples) las hacía oscilar.
      default: { duration: 0.4, ease: "easeOut" },
      backgroundColor: { duration: 0.9, times: [0, 0.4, 1], ease: "easeInOut" },
    },
  },
};

const contentVariants: Variants = {
  rest: { opacity: 0, y: 6 },
  active: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.35 } },
};

const labelVariants: Variants = {
  rest: { opacity: 0, y: 4 },
  active: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.5 } },
};

export function ServiceNodeDiagram() {
  return (
    <section className="w-full py-14 sm:py-18 bg-[var(--color-bg)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative w-full h-56 sm:h-64"
          initial="rest"
          whileInView="active"
          viewport={{ once: true, amount: 0.6 }}
          variants={containerVariants}
        >
          {/* Conexiones curvas — visibles en reposo, azules de marca */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="service-node-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.brand.primary} />
                <stop offset="100%" stopColor={colors.brand.primaryDark} />
              </linearGradient>
            </defs>
            {CURVES.map((d) => (
              <path
                key={d}
                d={d}
                stroke="url(#service-node-gradient)"
                strokeWidth={0.6}
                strokeLinecap="round"
                opacity={0.45}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Nodos: círculo base en reposo (azul), ícono + etiqueta revelados al entrar al viewport */}
          {NODES.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                variants={nodeVariants}
                className="absolute flex flex-col items-center gap-2.5 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <motion.div
                  variants={ringVariants}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg"
                >
                  <motion.span variants={contentVariants} className="flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.span>
                </motion.div>
                <motion.span
                  variants={labelVariants}
                  className="text-xs sm:text-sm font-medium text-[var(--color-text)] whitespace-nowrap"
                >
                  {node.label}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
