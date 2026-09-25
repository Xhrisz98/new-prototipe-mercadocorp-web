"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

// Variante de Card con fotografía en la cabecera. Las fotos son stock de Unsplash
// marcado como TEMPORAL (PROJECT_PLAN.md §5.7): cada uso declara en `image.todo`
// qué debería reemplazarlas cuando exista fotografía propia de marca, y ese texto
// se emite como comentario en el punto de uso.
export interface PhotoCardImage {
  src: string;
  /** Alt descriptivo real — nunca vacío ni "imagen". */
  alt: string;
}

export interface PhotoCardProps {
  image: PhotoCardImage;
  children: React.ReactNode;
  /** Contenido superpuesto sobre la foto (ej. un Badge). */
  overlay?: React.ReactNode;
  /** Prioriza la carga (solo para tarjetas visibles sin scroll). */
  priority?: boolean;
  reveal?: boolean;
  revealIndex?: number;
  accent?: "brand" | "ai";
  className?: string;
}

export function PhotoCard({
  image,
  children,
  overlay,
  priority = false,
  reveal = true,
  revealIndex = 0,
  accent = "brand",
  className = "",
}: PhotoCardProps) {
  return (
    <Card
      padding="none"
      accent={accent}
      reveal={reveal}
      revealIndex={revealIndex}
      className={`group ${className}`}
    >
      {/* Contenedor de relación de aspecto fija + overflow-hidden: el zoom del hover
          se recorta aquí dentro, así que no desplaza el texto ni desborda la tarjeta. */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Velo oscuro + fundido hacia la superficie de la tarjeta: mantiene legible
            cualquier contenido superpuesto y empalma la foto con el cuerpo en ambos temas. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-bg)]/35 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/25 dark:bg-black/35" aria-hidden="true" />

        {overlay && <div className="absolute bottom-3 left-4 right-4 z-10">{overlay}</div>}
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">{children}</div>
    </Card>
  );
}
