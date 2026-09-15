"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Clock, TrendingDown, ArrowRight } from "lucide-react";

interface PainBlockProps {
  title: string;
  intro: string;
  items: { title: string; description: string; tag: string }[];
  ctaText: string;
  ctaLink: string;
}

export function PainBlock({ title, intro, items, ctaText, ctaLink }: PainBlockProps) {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 1:
        return <TrendingDown className="w-5 h-5 text-rose-500" />;
      case 2:
        return <Clock className="w-5 h-5 text-indigo-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section className="w-full py-20 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2
            className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="p-7 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between transition-all duration-200 hover:border-[var(--color-primary)]/40 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-border)]/40 flex items-center justify-center">
                    {getIcon(idx)}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-border)]/60 text-[var(--color-text-muted)]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 text-[var(--color-text)]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-CTA de cierre de bloque */}
        <div className="text-center">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:opacity-85 transition-opacity group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
