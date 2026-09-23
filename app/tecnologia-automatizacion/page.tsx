"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PillarCard } from "@/components/sections/PillarCard";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceNodeDiagram } from "@/components/sections/ServiceNodeDiagram";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getTecnologiaContent } from "@/content/tecnologia";
import { CheckCircle2 } from "lucide-react";

export default function TecnologiaPage() {
  const { locale } = useLocale();
  const content = getTecnologiaContent(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero del Hub */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          align="center"
        />

        {/* Franja de Confianza (Stack Tecnológico) */}
        <TrustStrip title={content.trust.title} logos={content.trust.logos} />

        {/* Diagrama de Nodos 2D (Capa 1 de scroll-reveal — PROJECT_PLAN.md §5.4) */}
        <ServiceNodeDiagram />

        {/* Fichas de los 3 Servicios del Pilar */}
        <section className="w-full py-20 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2
                className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.services.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                {content.services.sectionSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.services.items.map((service) => (
                <PillarCard
                  key={service.number}
                  number={service.number}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  ctaLabel={service.ctaLabel}
                  badge={service.badge}
                  isMind={service.isMind}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bloque "Por qué tecnología antes que marketing" */}
        <section className="w-full py-20 bg-[var(--color-bg)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 block">
                Arquitectura Comercial Estratégica
              </span>
              <h2
                className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-[var(--color-text)] leading-snug"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.philosophyBlock.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-6">
                {content.philosophyBlock.description}
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--color-primary)]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{content.philosophyBlock.keyTakeaway}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cifras de Capacidad del Pilar */}
        <StatsStrip stats={content.stats} />

        {/* FAQ del Hub */}
        <FAQAccordion
          title={content.faq.title}
          subtitle={content.faq.subtitle}
          items={content.faq.items}
        />

        {/* CTA de Cierre */}
        <FinalCTA
          title={content.finalCta.title}
          description={content.finalCta.description}
          ctaPrimary={content.finalCta.ctaPrimary}
        />

        {/* Enlazado Interno Obligatorio */}
        <InternalLinksStrip
          title={content.internalLinks.title}
          links={content.internalLinks.links}
        />
      </main>

      <Footer />
    </div>
  );
}
