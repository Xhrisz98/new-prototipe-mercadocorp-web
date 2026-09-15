"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getTerminosContent } from "@/content/legales";
import { FileText, AlertCircle } from "lucide-react";

export default function TerminosCondicionesPage() {
  const { locale } = useLocale();
  const content = getTerminosContent(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        {/* <!-- TODO: legal review --> */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <div className="mb-4">
              <Badge variant="brand" size="sm">
                <FileText className="w-3.5 h-3.5 mr-1" />
                {content.hero.badge}
              </Badge>
            </div>

            <h1
              className="text-3xl sm:text-5xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            >
              {content.hero.h1}
            </h1>

            <p className="text-sm text-[var(--color-text-muted)] font-medium">
              {content.hero.lastUpdated}
            </p>
          </div>

          {/* Aviso explícito de revisión jurídica */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-12 flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary)] block mb-1">
                {content.notice.tag}
              </span>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {content.notice.body}
              </p>
            </div>
          </div>

          {/* Secciones de Términos y Condiciones */}
          <div className="space-y-10">
            {content.sections.map((sec, idx) => (
              <div key={idx} className="border-b border-[var(--color-border)] pb-8 last:border-b-0">
                <h2
                  className="text-xl font-medium tracking-tight mb-3 text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                >
                  {sec.title}
                </h2>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
