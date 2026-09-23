"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { DualPillarsBlock } from "@/components/sections/DualPillarsBlock";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ReasoningBlock } from "@/components/sections/ReasoningBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getBrandingContent } from "@/content/branding";

export default function BrandingPage() {
  const { locale } = useLocale();
  const content = getBrandingContent(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero de Servicio */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          ctaSecondary={content.hero.ctaSecondary}
          align="center"
        />

        {/* Dos Caminos, Un Mismo Pilar (Empresa vs Personal) */}
        <DualPillarsBlock
          sectionTitle={content.dualPillars.sectionTitle}
          sectionSubtitle={content.dualPillars.sectionSubtitle}
          paths={content.dualPillars.paths}
        />

        {/* Qué Incluye el Servicio */}
        <FeatureGrid
          sectionTitle={content.features.sectionTitle}
          sectionSubtitle={content.features.sectionSubtitle}
          items={content.features.items}
        />

        {/* Bloque de Objeción / Diferenciación frente a Agencia Tradicional */}
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
