"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InternalLinksStripProps {
  title?: string;
  links: { label: string; href: string }[];
}

export function InternalLinksStrip({
  title = "Continuar explorando el ecosistema:",
  links,
}: InternalLinksStripProps) {
  return (
    <section className="w-full py-8 border-t border-[var(--color-border)] bg-[var(--color-surface)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-sm font-semibold text-[var(--color-text-muted)] shrink-0">
            {title}
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors group"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
