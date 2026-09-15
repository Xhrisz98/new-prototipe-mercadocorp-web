"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ReasoningBlock } from "@/components/sections/ReasoningBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getEventosContent } from "@/content/eventos";

export default function EventosPage() {
  const { locale } = useLocale();
  const content = getEventosContent(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero de Gestión Integral de Eventos */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          ctaSecondary={content.hero.ctaSecondary}
          align="center"
        />

        {/* Qué Incluye: Cobertura 360° */}
        <FeatureGrid
          sectionTitle={content.features.sectionTitle}
          sectionSubtitle={content.features.sectionSubtitle}
          items={content.features.items}
        />

        {/* Por qué un evento con respaldo de estrategia digital */}
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
