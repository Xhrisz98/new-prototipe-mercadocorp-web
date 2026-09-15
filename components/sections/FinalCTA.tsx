"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare } from "lucide-react";

interface FinalCTAProps {
  title: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function FinalCTA({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}: FinalCTAProps) {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-[var(--color-bg)]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-[var(--color-text)] leading-tight"
          style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
        >
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl mx-auto mb-9 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button
            variant="primary"
            size="lg"
            href={ctaPrimary.href}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {ctaPrimary.label}
          </Button>

          {ctaSecondary && (
            <Button
              variant="secondary"
              size="lg"
              href={ctaSecondary.href}
              icon={<MessageSquare className="w-4 h-4 text-[#25D366]" />}
              iconPosition="left"
            >
              {ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
