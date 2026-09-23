"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { AgentSphere } from "@/components/three/AgentSphere";
import { ProductShowcase } from "@/components/ui/ProductShowcase";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { getMindContent } from "@/content/mind";
import {
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layers,
  CalendarCheck,
  Mail,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function MindPage() {
  const { locale } = useLocale();
  const { theme } = useTheme();
  const content = getMindContent(locale);
  const isDark = theme === "dark";

  const moduleIcons = [
    <Layers key="0" className="w-5 h-5 text-[var(--color-ai)]" />,
    <CalendarCheck key="1" className="w-5 h-5 text-[var(--color-ai)]" />,
    <Mail key="2" className="w-5 h-5 text-[var(--color-ai)]" />,
    <FileText key="3" className="w-5 h-5 text-[var(--color-ai)]" />,
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero de Mind con esfera 3D interactiva */}
        <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
          {/* Luz radial verde IA suave en el fondo */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[var(--color-ai)]/10 dark:bg-[var(--color-ai)]/15 rounded-full blur-3xl pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Columna de Texto y CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="mb-6">
                  <Badge variant="ai" size="md">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    {content.hero.badge}
                  </Badge>
                </div>

                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] mb-6 text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                >
                  {content.hero.h1}
                </h1>

                <p className="text-base sm:text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl mb-8">
                  {content.hero.subheadline}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    href={content.hero.ctaPrimary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<ExternalLink className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    {content.hero.ctaPrimary.label}
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    href={content.hero.ctaSecondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<MessageSquare className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    {content.hero.ctaSecondary.label}
                  </Button>
                </div>
              </div>

              {/* Columna Visual 3D: AgentSphere */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="w-full max-w-[480px] rounded-3xl p-2 bg-[var(--color-surface)]/60 border border-[var(--color-ai)]/20 shadow-2xl backdrop-blur-sm relative">
                  <AgentSphere isDark={isDark} />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-ai)] animate-pulse" />
                      Mind Engine Online
                    </span>
                    <span className="font-mono text-[var(--color-ai)] font-medium">WhatsApp 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Qué es Mind y Módulos de la Plataforma */}
        <section className="w-full py-16 md:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <Badge variant="ai" size="sm" className="mb-3">
                Arquitectura de Producto
              </Badge>
              <h2
                className="text-2xl sm:text-4xl font-medium tracking-tight mb-5 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.about.title}
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
                {content.about.description}
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-medium tracking-tight mb-8 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif" }}
              >
                {content.about.modulesTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.about.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-ai)]/50 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-ai)]/10 flex items-center justify-center mb-4">
                        {moduleIcons[idx % moduleIcons.length]}
                      </div>
                      <h4 className="text-base font-semibold text-[var(--color-text)] mb-2">
                        {mod.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center gap-1.5 text-xs text-[var(--color-ai)] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Integrado en Mind</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Demostración Visual de la Plataforma Mind */}
        <ProductShowcase
          imageSrc="/images/mind-crm-interface.jpg"
          alt="Interfaz de Mind CRM y WhatsApp AI Sales Agent"
          badge="Mind en Acción"
          badgeVariant="ai"
          title="El Embudo Comercial y la Atención por WhatsApp en una Sola Pantalla"
          subtitle="Cada prospecto atendido por el agente se categoriza, se califica y se sincroniza en el CRM sin pérdida de información."
          caption="Panel interactivo de Mind CRM con agente conversacional integrado."
        />

        {/* Bloque: ¿Por qué Mind vive en su propio dominio? */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-ai)]/30 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-ai)]/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <Badge variant="ai" size="sm" className="mb-4">
                  SaaS Independiente
                </Badge>

                <h2
                  className="text-2xl sm:text-4xl font-medium tracking-tight mb-5 text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                >
                  {content.domainReason.title}
                </h2>

                <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-3xl">
                  {content.domainReason.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    href={content.domainReason.ctaPrimary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<ExternalLink className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    {content.domainReason.ctaPrimary.label}
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    href={content.domainReason.ctaSecondary.href}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    {content.domainReason.ctaSecondary.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA de Cierre de Mind */}
        <section className="w-full py-16 md:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-2xl sm:text-4xl font-medium tracking-tight mb-5 text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            >
              {content.closingCta.title}
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-2xl mx-auto">
              {content.closingCta.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href={content.closingCta.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                {content.closingCta.ctaPrimary.label}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={content.closingCta.ctaSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                icon={<MessageSquare className="w-4 h-4" />}
                iconPosition="left"
              >
                {content.closingCta.ctaSecondary.label}
              </Button>
            </div>
          </div>
        </section>

        {/* Enlazado Interno de Retención */}
        <InternalLinksStrip
          title={content.internalLinks.title}
          links={content.internalLinks.links}
        />
      </main>

      <Footer />
    </div>
  );
}
