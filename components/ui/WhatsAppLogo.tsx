import React from "react";

interface WhatsAppLogoProps {
  className?: string;
  // "color": glifo oficial en #25D366, para fondos neutros o tintes verdes claros.
  // "white": el mismo archivo pasado a blanco por CSS, solo para botones con fondo
  // #25D366 — ahí el glifo verde desaparecería (blanco sobre verde es el uso
  // estándar de la marca).
  variant?: "color" | "white";
}

// Logo oficial de WhatsApp descargado de svgl.app (public/images/logos/whatsapp.svg).
// Es decorativo: el texto del CTA ya dice "WhatsApp", así que alt vacío + aria-hidden.
export function WhatsAppLogo({ className = "w-4 h-4", variant = "color" }: WhatsAppLogoProps) {
  return (
    // SVG de marca estático y diminuto (<2kb): no aporta nada pasarlo por next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logos/whatsapp.svg"
      alt=""
      aria-hidden="true"
      className={`${className} shrink-0 object-contain ${variant === "white" ? "brightness-0 invert" : ""}`.trim()}
    />
  );
}
