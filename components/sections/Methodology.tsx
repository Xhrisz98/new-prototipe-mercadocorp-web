"use client";

import React from "react";

interface MethodologyProps {
  title: string;
  subtitle: string;
  steps: { number: string; title: string; description: string }[];
}

export function Methodology({ title, subtitle, steps }: MethodologyProps) {
  return (
    <section className="w-full py-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/50 hover:bg-[var(--color-bg)] transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
                  Paso {step.number}
                </span>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-[var(--color-text)]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
