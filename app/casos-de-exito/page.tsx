"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getCasosDeExitoContent } from "@/content/casos-de-exito";
import { Building, ShieldCheck, CheckCircle2, ArrowRight, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CasosDeExitoPage() {
  const { locale } = useLocale();
  const content = getCasosDeExitoContent(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero de Casos de Éxito */}
        <Hero
          badge={content.hero.badge}
          h1={content.hero.h1}
          subheadline={content.hero.subheadline}
          ctaPrimary={content.hero.ctaPrimary}
          ctaSecondary={content.hero.ctaSecondary}
          align="center"
        />

        {/* Franja de Cifras Generales de Capacidad */}
        <section className="w-full py-12 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <span
                    className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[var(--color-primary)] mb-2"
                    style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                  >
                    {stat.number}
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-[180px] leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lista de Casos Cualitativos Verificados */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Aviso ético y cumplimiento NDA */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-12 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text)] mb-1">
                  {content.notice.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {content.notice.body}
                </p>
              </div>
            </div>

            {content.cases.length === 0 ? (
              <div className="flex flex-col items-center text-center gap-3 py-16 px-6 rounded-3xl border border-dashed border-[var(--color-border)]">
                <Hourglass className="w-6 h-6 text-[var(--color-text-muted)]" />
                <h3
                  className="text-lg sm:text-xl font-medium tracking-tight text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                >
                  {content.emptyState.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] max-w-md leading-relaxed">
                  {content.emptyState.body}
                </p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.cases.map((caso) => (
                <div
                  key={caso.id}
                  className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <Badge variant="outline" size="sm">
                        {caso.clientIndustry}
                      </Badge>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                        <Building className="w-4 h-4" />
                      </div>
                    </div>

                    <h3
                      className="text-xl font-medium tracking-tight mb-3 text-[var(--color-text)]"
                      style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                    >
                      {caso.clientName}
                    </h3>

                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold">
                        {caso.pillar}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                        Desafío Operativo:
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {caso.problemContext}
                      </p>

                      <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider pt-2">
                        Solución Implementada:
                      </div>
                      <p className="text-sm text-[var(--color-text)] leading-relaxed font-medium">
                        {caso.solutionBuilt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[var(--color-border)] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                      En Producción
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      href="/contacto"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      iconPosition="right"
                    >
                      Replicar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            )}
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
