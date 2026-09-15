"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ReasoningBlock } from "@/components/sections/ReasoningBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { ProductShowcase } from "@/components/ui/ProductShowcase";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getAuditoriaContent } from "@/content/auditoria";

export default function AuditoriaPage() {
  const { locale } = useLocale();
  const content = getAuditoriaContent(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero de Auditoría Digital (Gancho de Conversión B2B) */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          ctaSecondary={content.hero.ctaSecondary}
          align="center"
        />

        {/* Alcance del Diagnóstico Integral */}
        <FeatureGrid
          sectionTitle={content.features.sectionTitle}
          sectionSubtitle={content.features.sectionSubtitle}
          items={content.features.items}
        />

        {/* Demostración Visual de Scorecard de Auditoría */}
        <ProductShowcase
          imageSrc="/images/digital-audit-scorecard.jpg"
          alt="Scorecard Ejecutivo de Auditoría Digital y Hoja de Ruta a 90 Días"
          badge="Diagnóstico Ejecutivo & Hoja de Ruta"
          badgeVariant="brand"
          title="Métricas Claras, Hallazgos Priorizados y Plan a 90 Días"
          subtitle="Un informe técnico y comercial que identifica con exactitud dónde se pierde dinero y qué acciones generan retorno inmediato."
          caption="Scorecard ejecutivo de rendimiento web, SEO técnico, ROAS de pauta y cronograma de hitos."
        />

        {/* Bloque: ¿No sabe si su problema es de marketing o tecnología? Empiece aquí */}
        <ReasoningBlock
          badge={content.reasoningBlock.badge}
          title={content.reasoningBlock.title}
          body={content.reasoningBlock.body}
          cta={content.reasoningBlock.cta}
        />

        {/* Enlazado Interno de Retención */}
        <InternalLinksStrip
          title={content.internalLinks.title}
          links={content.internalLinks.links}
        />

        {/* CTA Final de Conversión */}
        <FinalCTA
          title={content.finalCta.title}
          description={content.finalCta.description}
          ctaPrimary={content.finalCta.ctaPrimary}
        />
      </main>

      <Footer />
    </div>
  );
}
