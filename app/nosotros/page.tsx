"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { TrajectoryTabs } from "@/components/sections/TrajectoryTabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getNosotrosContent } from "@/content/nosotros";
import {
  Cpu,
  TrendingUp,
  Compass,
  Lightbulb,
  Users2,
  Target,
  Globe2,
  Rocket,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// Íconos de las 2 tarjetas de cada año, en el mismo orden que
// content.trajectory.years[].milestones (§5 — caso especial de Nosotros).
const TRAJECTORY_ICONS: Record<string, LucideIcon[]> = {
  "2026": [Target, Globe2],
  "2027": [Rocket, Building2],
};

export default function NosotrosPage() {
  const { locale } = useLocale();
  const content = getNosotrosContent(locale);

  const valueIcons = [
    <Compass key="0" className="w-5 h-5 text-[var(--color-primary)]" />,
    <Lightbulb key="1" className="w-5 h-5 text-[var(--color-primary)]" />,
    <Users2 key="2" className="w-5 h-5 text-[var(--color-primary)]" />,
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero de Nosotros */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          ctaSecondary={content.hero.ctaSecondary}
          align="center"
        />

        {/* Sección Historia (copywriting-nueva-web-mercadocorp.md §10) */}
        <section className="w-full py-16 md:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <RevealOnScroll>
                <div>
                  <Badge variant="brand" size="sm" className="mb-4">
                    {content.history.label}
                  </Badge>
                  <h2
                    className="text-2xl sm:text-4xl font-medium tracking-tight mb-6 text-[var(--color-text)]"
                    style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                  >
                    {content.history.title}
                  </h2>
                  <div className="space-y-4">
                    {content.history.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll index={1}>
                <div>
                  {/* TODO: reemplazar con la foto del equipo */}
                  <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden card-elevation">
                    <Image
                      src="/images/stock/blue-glass-tower-facade.jpg"
                      alt={content.history.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Especialización Dual */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 md:mb-16">
              <h2
                className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.dualSpecialization.title}
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
                {content.dualSpecialization.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.dualSpecialization.pillars.map((pilar, idx) => {
                const isTech = idx === 0;
                return (
                  <RevealOnScroll key={idx} index={idx}>
                    <div className="h-full p-8 sm:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-[border-color,box-shadow] duration-300 hover:shadow-xl flex flex-col justify-between">
                      <div>
                        {/* reveal=false: esta tarjeta ya revela completa vía el
                            RevealOnScroll externo — evita un segundo fade anidado. */}
                        <IconBadge
                          icon={isTech ? Cpu : TrendingUp}
                          size="md"
                          reveal={false}
                          className="mb-6"
                        />

                        <h3
                          className="text-2xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                          style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                        >
                          {pilar.name}
                        </h3>

                        <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
                          {pilar.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[var(--color-border)]">
                        <Button
                          variant="secondary"
                          size="md"
                          href={pilar.href}
                          icon={<ArrowRight className="w-4 h-4" />}
                          iconPosition="right"
                        >
                          {isTech ? "Ver Tecnología & Automatización" : "Ver Marketing Digital"}
                        </Button>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filosofía de Trabajo (3 Valores) */}
        <section className="w-full py-16 md:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2
                className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.philosophy.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.philosophy.values.map((val, idx) => (
                <RevealOnScroll key={idx} index={idx}>
                  <div className="h-full p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                      {valueIcons[idx % valueIcons.length]}
                    </div>
                    <h3
                      className="text-lg font-semibold text-[var(--color-text)] mb-3"
                      style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                    >
                      {val.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Trayectoria — pestañas por año (copywriting §10 / PROJECT_PLAN §5) */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-10">
                <Badge variant="brand" size="sm" className="mb-4">
                  {content.trajectory.label}
                </Badge>
                <h2
                  className="text-2xl sm:text-4xl font-medium tracking-tight text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                >
                  {content.trajectory.titlePrefix}
                  <span className="text-[var(--color-primary)]">
                    {content.trajectory.titleHighlight}
                  </span>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll index={1}>
              <TrajectoryTabs
                years={content.trajectory.years}
                tablistLabel={content.trajectory.tablistLabel}
                icons={TRAJECTORY_ICONS}
              />
            </RevealOnScroll>
          </div>
        </section>

        {/* Enlazado Interno de Retención */}
        <InternalLinksStrip
          title={content.internalLinks.title}
          links={content.internalLinks.links}
        />

        {/* CTA Final */}
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
