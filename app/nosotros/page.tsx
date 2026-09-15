"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getNosotrosContent } from "@/content/nosotros";
import {
  Cpu,
  TrendingUp,
  Compass,
  Lightbulb,
  Users2,
  Clock,
  ArrowRight,
} from "lucide-react";

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

        {/* Sección Historia y Evolución */}
        <section className="w-full py-16 md:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="brand" size="sm" className="mb-4">
              Nuestra Evolución
            </Badge>
            <h2
              className="text-2xl sm:text-4xl font-medium tracking-tight mb-6 text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            >
              {content.history.title}
            </h2>
            <p className="text-base sm:text-xl text-[var(--color-text-muted)] leading-relaxed font-normal">
              {content.history.body}
            </p>
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
                  <div
                    key={idx}
                    className="p-8 sm:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                        {isTech ? <Cpu className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                      </div>

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
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]"
                >
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
              ))}
            </div>
          </div>
        </section>

        {/* Sección Trayectoria (Placeholder visual según especificación de AGENTS.md) */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border)]">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-5">
                <Clock className="w-6 h-6" />
              </div>

              <div className="flex justify-center mb-3">
                <Badge variant="outline" size="sm">
                  {content.trajectory.statusBadge}
                </Badge>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {content.trajectory.title}
              </h2>

              <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
                {content.trajectory.note}
              </p>
            </div>
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
