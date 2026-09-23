"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { DataFlowCore } from "@/components/three/DataFlowCore";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PainBlock } from "@/components/sections/PainBlock";
import { PillarCard } from "@/components/sections/PillarCard";
import { Methodology } from "@/components/sections/Methodology";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CaseStudyPreview } from "@/components/sections/CaseStudyPreview";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { ProductShowcase } from "@/components/ui/ProductShowcase";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getHomeContent } from "@/content/home";

export default function HomePage() {
  const { locale } = useLocale();
  const content = getHomeContent(locale);

  const internalLinks = [
    { label: "Tecnología y Automatización", href: "/tecnologia-automatizacion" },
    { label: "Mind (CRM + Agente IA)", href: "/mind" },
    { label: "Marketing Digital", href: "/marketing-digital" },
    { label: "Casos de Éxito", href: "/casos-de-exito" },
    { label: "Contacto Directo", href: "/contacto" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      {/* Navbar global */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero con Canvas Three.js DataFlowCore (espiral de flujo de datos, lado derecho) */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          ctaSecondary={content.hero.ctaSecondary}
          threeCanvas={<DataFlowCore />}
          align="left"
          showProofChips={true}
          showScrollIndicator={true}
        />

        {/* 2. Franja de confianza tecnológica */}
        <TrustStrip
          title={content.trust.title}
          logos={content.trust.logos}
        />

        {/* 3. Bloque de dolor con micro-CTA */}
        <PainBlock
          title={content.pain.title}
          intro={content.pain.intro}
          items={content.pain.items}
          ctaText={content.pain.ctaText}
          ctaLink={content.pain.ctaLink}
        />

        {/* Demostración Visual de la Plataforma */}
        <ProductShowcase
          imageSrc="/images/mind-crm-interface.jpg"
          alt="Mind CRM y Agente de Ventas con IA para WhatsApp"
          badge="Demostración de Ecosistema en Vivo"
          badgeVariant="ai"
          title="Ventas y Calificación de Leads 24/7 en Tiempo Real"
          subtitle="Así opera un sistema real: el agente de IA asesora y agenda prospectos en WhatsApp mientras el CRM centraliza cada oportunidad automáticamente."
          caption="Panel de control operativo de Mind CRM sincronizado con canal WhatsApp Business oficial."
        />

        {/* 4. Los 3 Pilares del Ecosistema */}
        <section className="w-full py-20 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2
                className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.pillars.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                {content.pillars.sectionSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.pillars.items.map((pillar) => (
                <PillarCard
                  key={pillar.number}
                  number={pillar.number}
                  title={pillar.title}
                  description={pillar.description}
                  href={pillar.href}
                  ctaLabel={pillar.ctaLabel}
                  badge={pillar.badge}
                  isMind={pillar.isMind}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Metodología de 6 pasos */}
        <Methodology
          title={content.methodology.title}
          subtitle={content.methodology.subtitle}
          steps={content.methodology.steps}
        />

        {/* 6. Franja de Cifras de Capacidad */}
        <StatsStrip />

        {/* 7. Resumen de Casos de Éxito */}
        <CaseStudyPreview
          title={content.caseStudiesPreview.title}
          subtitle={content.caseStudiesPreview.subtitle}
          cta={content.caseStudiesPreview.cta}
          items={content.caseStudiesPreview.items}
        />

        {/* 8. FAQ */}
        <FAQAccordion
          title={content.faq.title}
          subtitle={content.faq.subtitle}
          items={content.faq.items}
        />

        {/* 9. CTA Final */}
        <FinalCTA
          title={content.finalCta.title}
          description={content.finalCta.description}
          ctaPrimary={content.finalCta.ctaPrimary}
          ctaSecondary={content.finalCta.ctaSecondary}
        />

        {/* 10. Enlazado Interno Obligatorio de Retención */}
        <InternalLinksStrip links={internalLinks} />
      </main>

      {/* Footer global */}
      <Footer />
    </div>
  );
}
