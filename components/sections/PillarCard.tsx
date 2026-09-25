"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PhotoCard, type PhotoCardImage } from "@/components/ui/PhotoCard";
import { ArrowRight, Sparkles } from "lucide-react";

interface PillarCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  isMind?: boolean;
  /** Foto de cabecera. Sin ella la tarjeta queda solo con texto (uso actual de los
   *  hubs, pendientes de migrar a IconBadge). */
  image?: PhotoCardImage;
  index?: number;
}

export function PillarCard({
  title,
  description,
  href,
  ctaLabel,
  badge,
  isMind = false,
  image,
  index = 0,
}: PillarCardProps) {
  const accent = isMind ? "ai" : "brand";

  // max-w-full + truncate: sobre la foto el badge queda acotado al ancho de la
  // tarjeta, que en 3 columnas a 768px es más angosto que la etiqueta de Mind.
  const badgeNode = badge ? (
    <Badge variant={accent} size="sm" dot={isMind} className="max-w-full">
      {isMind && <Sparkles className="w-3 h-3 mr-1 inline shrink-0" />}
      <span className="truncate">{badge}</span>
    </Badge>
  ) : null;

  const body = (
    <>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--color-text)] leading-snug">
        {title}
      </h3>

      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
        {description}
      </p>

      <div className="mt-auto">
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
    </>
  );

  if (image) {
    return (
      <PhotoCard image={image} overlay={badgeNode} accent={accent} revealIndex={index}>
        {body}
      </PhotoCard>
    );
  }

  return (
    <Card accent={accent} revealIndex={index} className="group">
      {badgeNode && <div className="mb-6 flex items-center justify-end">{badgeNode}</div>}
      {body}
    </Card>
  );
}
