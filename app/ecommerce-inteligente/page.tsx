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
import { getEcommerceContent } from "@/content/ecommerce";

export default function EcommercePage() {
  const { locale } = useLocale();
  const content = getEcommerceContent(locale);

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

        {/* Qué Incluye el Ecosistema E-commerce */}
        <FeatureGrid
          sectionTitle={content.features.sectionTitle}
          sectionSubtitle={content.features.sectionSubtitle}
          items={content.features.items}
        />

        {/* Demostración Visual de Embudo E-commerce */}
        <ProductShowcase
          imageSrc="/images/ecommerce-ai-funnel.jpg"
          alt="Embudo de E-commerce y Recuperación de Carritos con IA"
          badge="Flujo de Conversión & Retención"
          badgeVariant="brand"
          title="Recuperación Automática de Carritos y Analítica en Tiempo Real"
          subtitle="Secuencias automatizadas por WhatsApp y remarketing inteligente que rescatan hasta el 30% de compras no finalizadas."
          caption="Panel analítico de e-commerce con diagrama de flujo automatizado de recuperación de pedidos."
        />

        {/* Bloque de Oportunidad / Recuperación de Carritos */}
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
