"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

interface ProductShowcaseProps {
  imageSrc: string;
  alt: string;
  badge?: string;
  badgeVariant?: "brand" | "ai" | "outline";
  title?: string;
  subtitle?: string;
  caption?: string;
  priority?: boolean;
}

export function ProductShowcase({
  imageSrc,
  alt,
  badge,
  badgeVariant = "brand",
  title,
  subtitle,
  caption,
  priority = false,
}: ProductShowcaseProps) {
  return (
    <div className="w-full my-12 sm:my-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || badge) && (
          <div className="text-center max-w-3xl mx-auto mb-8">
            {badge && (
              <div className="flex justify-center mb-3">
                <Badge variant={badgeVariant} size="sm">
                  {badge}
                </Badge>
              </div>
            )}
            {title && (
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Contenedor del Mockup con marco elegante */}
        <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden group">
          {/* Resplandor sutil de fondo */}
          <div
            className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 ${
              badgeVariant === "ai" ? "bg-[var(--color-ai)]" : "bg-[var(--color-primary)]"
            }`}
            aria-hidden="true"
          />

          {/* Barra superior de ventana tipo navegador / panel */}
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-bg)]/80 rounded-t-xl sm:rounded-t-2xl border-b border-[var(--color-border)] mb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-[var(--color-text-muted)] font-medium">
              app.mercadocorp.ec / preview
            </span>
            <div className="w-8" />
          </div>

          {/* Imagen del Mockup en alta resolución */}
          <div className="relative aspect-video w-full overflow-hidden rounded-b-xl sm:rounded-b-2xl bg-[var(--color-bg)]">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          {caption && (
            <div className="px-4 py-3 bg-[var(--color-bg)]/60 text-center border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)] font-medium">
                {caption}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
