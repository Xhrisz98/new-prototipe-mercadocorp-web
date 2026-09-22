"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shield, Cpu, Zap } from "lucide-react";

interface HeroProps {
  badge?: string;
  h1: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  threeCanvas?: React.ReactNode;
  align?: "center" | "left";
  showScrollIndicator?: boolean;
  showProofChips?: boolean;
}

export function Hero({
  badge,
  h1,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  threeCanvas,
  align = "center",
  showScrollIndicator = true,
  showProofChips = false,
}: HeroProps) {
  const isCenter = align === "center";
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.4, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-12 pb-14 md:pt-18 md:pb-24 overflow-hidden flex flex-col justify-center min-h-[calc(100vh-5rem)]"
    >
      {/* Canvas 3D de fondo (ParticleNetwork o AgentSphere) */}
      {threeCanvas && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-85 dark:opacity-95">
          {threeCanvas}
        </div>
      )}

      {/* Iluminación Atmosférica estilo CollectUI (Multi-capa Radial Glow) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[900px] h-[400px] md:h-[500px] bg-[var(--color-primary)]/15 dark:bg-[var(--color-primary)]/20 rounded-full blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[250px] bg-[#3F5FFF]/20 dark:bg-[#3F5FFF]/25 rounded-full blur-[90px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-auto"
      >
        <div className={`relative flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
          {/* Velo de contraste radial suave detrás del texto */}
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--color-bg)_0%,transparent_75%)] opacity-70 dark:opacity-60 pointer-events-none"
            aria-hidden="true"
          />

          {/* Badge estilo CollectUI con píldora translúcida y brillo sutil */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 sm:mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface)]/80 dark:bg-[#161926]/80 backdrop-blur-md border border-[var(--color-border)] shadow-sm hover:border-[var(--color-primary)]/40 transition-colors">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]" />
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wide text-[var(--color-text)]">
                  {badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* H1 Masivo, Autoritario y Cinematográfico (Inspiración FROSTBREAK / CollectUI) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[1.08] mb-4 sm:mb-6 text-[var(--color-text)] max-w-4xl"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {h1}
          </motion.h1>

          {/* Subheadline Refinada con aire tipográfico */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl mb-7 sm:mb-9 font-normal"
          >
            {subheadline}
          </motion.p>

          {/* Grupo de CTAs Dual Píldora (Inspiración CollectUI: Sólido + Vidrio Esmerilado) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              href={ctaPrimary.href}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="shadow-xl hover:shadow-[0_0_30px_rgba(0,34,210,0.35)] transition-all duration-300"
            >
              {ctaPrimary.label}
            </Button>

            {ctaSecondary && (
              <Button
                variant="secondary"
                size="lg"
                href={ctaSecondary.href}
                className="backdrop-blur-md bg-white/5 border border-white/15 dark:border-white/20 hover:bg-white/10 dark:text-white transition-all duration-300"
              >
                {ctaSecondary.label}
              </Button>
            )}
          </motion.div>

          {/* Telemetría y Micro-Badges de Prueba Técnica (Patrón SaaS CollectUI) */}
          {showProofChips && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[var(--color-text-muted)] font-medium"
            >
              <div className="inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Operación Autónoma 24/7</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Arquitectura 100% Propietaria</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Integración WhatsApp & CRM</span>
              </div>
            </motion.div>
          )}

          {/* Indicador SCROLL Minimalista (Directamente del diseño CollectUI de referencia) */}
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity cursor-default"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
                SCROLL
              </span>
              <div className="w-4 h-7 rounded-full border border-[var(--color-border)] flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="w-1 h-1.5 rounded-full bg-[var(--color-primary)]"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
