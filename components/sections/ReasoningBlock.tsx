"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, HelpCircle } from "lucide-react";

interface ReasoningBlockProps {
  badge?: string;
  title: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
}

export function ReasoningBlock({
  badge,
  title,
  body,
  cta,
}: ReasoningBlockProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start p-8 sm:p-12 rounded-3xl bg-[var(--color-bg)] border border-[var(--color-border)] relative overflow-hidden">
          {/* Luz sutil de fondo */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full">
            <div className="flex items-center gap-2 mb-6">
              {badge ? (
                <Badge variant="brand" size="sm">
                  {badge}
                </Badge>
              ) : (
                <Badge variant="outline" size="sm">
                  <HelpCircle className="w-3.5 h-3.5 mr-1" />
                  Criterio de Decisión
                </Badge>
              )}
            </div>

            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-5 text-[var(--color-text)] max-w-2xl leading-[1.2]"
              style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            >
              {title}
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-3xl">
              {body}
            </p>

            <div>
              <Button
                variant="primary"
                size="md"
                href={cta.href}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
