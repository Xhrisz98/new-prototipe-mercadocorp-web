"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";

interface PillarCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  isMind?: boolean;
}

export function PillarCard({
  title,
  description,
  href,
  ctaLabel,
  badge,
  isMind = false,
}: PillarCardProps) {
  return (
    <div
      className={`relative p-8 sm:p-9 rounded-3xl border transition-[border-color,box-shadow,transform] duration-300 flex flex-col justify-between group backdrop-blur-md ${
        isMind
          ? "border-[var(--color-ai-accent)]/30 bg-[var(--color-surface)]/90 shadow-[0_0_30px_rgba(4,231,175,0.08)] hover:border-[var(--color-ai-accent)]/70 hover:shadow-[0_12px_40px_rgba(4,231,175,0.18)] hover:-translate-y-2"
          : "border-[var(--color-border)] bg-[var(--color-surface)]/90 hover:border-[var(--color-primary)]/50 hover:shadow-[0_12px_40px_rgba(0,34,210,0.14)] hover:-translate-y-2"
      }`}
    >
      <div>
        {badge && (
          <div className="flex items-center justify-end mb-6">
            <Badge variant={isMind ? "ai" : "brand"} size="sm" dot={isMind}>
              {isMind && <Sparkles className="w-3 h-3 mr-1 inline" />}
              {badge}
            </Badge>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--color-text)] leading-snug">
          {title}
        </h3>

        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
          {description}
        </p>
      </div>

      <div>
        <Link
          href={href}
          className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
            isMind
              ? "text-[var(--color-ai-accent)] hover:opacity-85"
              : "text-[var(--color-primary)] hover:opacity-85"
          }`}
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
