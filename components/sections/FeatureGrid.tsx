"use client";

import React from "react";
import { FeatureItem } from "@/content/aplicaciones";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Sparkles } from "lucide-react";

interface FeatureGridProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: FeatureItem[];
}

export function FeatureGrid({
  sectionTitle,
  sectionSubtitle,
  items,
}: FeatureGridProps) {
  return (
    <section className="w-full py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
              {sectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-[border-color,box-shadow] duration-300 hover:shadow-lg ${
                item.isAi
                  ? "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-ai)]/40 relative overflow-hidden"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
              }`}
            >
              {item.isAi && (
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-ai)]/5 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />
              )}

              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  {item.tag && (
                    <Badge variant={item.isAi ? "ai" : "brand"} size="sm">
                      {item.isAi ? <Sparkles className="w-3 h-3 mr-1" /> : null}
                      {item.tag}
                    </Badge>
                  )}
                  {item.number && (
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      {item.number}
                    </span>
                  )}
                </div>

                <h3
                  className="text-lg sm:text-xl font-medium tracking-tight mb-3 text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Implementación verificada</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
