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
import { getAplicacionesContent } from "@/content/aplicaciones";

export default function AplicacionesPage() {
  const { locale } = useLocale();
  const content = getAplicacionesContent(locale);

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

        {/* Módulos y Capacidades Técnicas */}
        <FeatureGrid
          sectionTitle={content.features.sectionTitle}
          sectionSubtitle={content.features.sectionSubtitle}
          items={content.features.items}
        />

        {/* Demostración Visual de Panel a Medida */}
        <ProductShowcase
          imageSrc="/images/custom-software-dashboard.jpg"
          alt="Panel de Control y Software a Medida para Empresas"
          badge="Software Empresarial a Medida"
          badgeVariant="brand"
          title="Paneles y Gestores Diseñados Sobre su Operación Real"
          subtitle="Dashboards intuitivos, control de inventarios, permisos por roles y sincronización de datos sin fricción."
          caption="Panel de control en la nube desarrollado para la gestión operativa y comercial B2B."
        />

        {/* Bloque de Razonamiento / Objeción de Negocio */}
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
