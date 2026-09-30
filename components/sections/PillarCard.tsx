"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { PhotoCard, type PhotoCardImage } from "@/components/ui/PhotoCard";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";

// Cursor-tilt — LIMITADO a las 3 tarjetas de Pilares de Home (prop `tilt`). El resto
// de tarjetas del sitio (hubs, FeatureGrid, Casos de Éxito…) conserva a propósito el
// hover plano ya establecido; por eso vive aquí y no como utilidad general en ui/.
const TILT_MAX_DEG = 4; // sutil: la tarjeta acompaña al cursor, no "gira"
const TILT_SPRING = { stiffness: 180, damping: 20, mass: 0.6 };

function PointerTilt({ children }: { children: React.ReactNode }) {
  // prefers-reduced-motion: misma estructura (no cambia el árbol al hidratar), pero
  // sin rotación — la tarjeta queda plana con su hover simple de siempre.
  const reduceMotion = useReducedMotion();
  // El rect se mide en el contenedor exterior, que nunca rota: medir el elemento
  // rotado haría que la inclinación se retroalimente y tiemble.
  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Solo mouse: en touch un tap no debe inclinar la tarjeta.
    if (reduceMotion || e.pointerType !== "mouse" || !frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * 2 * TILT_MAX_DEG);
    rotateX.set(-py * 2 * TILT_MAX_DEG);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={frameRef} className="h-full" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        data-pillar-tilt
      >
        {children}
      </motion.div>
    </div>
  );
}

interface PillarCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  isMind?: boolean;
  /** Foto de cabecera. Sin ella la tarjeta queda solo con texto. */
  image?: PhotoCardImage;
  /** Ícono de servicio (IconBadge) — variante sin foto: tarjetas de servicio de
   *  los hubs (Tecnología, Marketing). Sin efecto si `image` está presente (el
   *  badge ya ocupa el espacio de cabecera sobre la foto). */
  icon?: LucideIcon;
  index?: number;
  /** Cursor-tilt sutil. Solo lo activan las 3 tarjetas de Pilares de Home. */
  tilt?: boolean;
}

export function PillarCard({
  title,
  description,
  href,
  ctaLabel,
  badge,
  isMind = false,
  image,
  icon: Icon,
  index = 0,
  tilt = false,
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
    const card = (
      <PhotoCard image={image} overlay={badgeNode} accent={accent} revealIndex={index}>
        {body}
      </PhotoCard>
    );
    return tilt ? <PointerTilt>{card}</PointerTilt> : card;
  }

  return (
    <Card accent={accent} revealIndex={index} className="group">
      {Icon ? (
        <div className="mb-6 flex items-center justify-between gap-3">
          {/* reveal=false: Card ya envuelve todo en RevealOnScroll (§5.5) — un
              segundo reveal anidado en el ícono se vería como un doble fade. */}
          <IconBadge icon={Icon} accent={accent} reveal={false} />
          {badgeNode}
        </div>
      ) : (
        badgeNode && <div className="mb-6 flex items-center justify-end">{badgeNode}</div>
      )}
      {body}
    </Card>
  );
}
