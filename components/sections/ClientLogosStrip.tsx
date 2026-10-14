"use client";

import React from "react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export interface ClientLogo {
  name: string;
  src: string;
  // Relación de aspecto real del archivo (w/h) — evita el salto de layout del
  // próximo <Image> antes de cargar, sin tener que forzar todos los logos al
  // mismo recuadro cuadrado.
  width: number;
  height: number;
}

interface ClientLogosStripProps {
  title: string;
  logos: ClientLogo[];
}

// Logos reales de clientes (provistos por el cliente, public/images/clientes/).
// 3 de los 5 archivos traen fondo blanco sólido ya horneado en el PNG (no hay
// versión transparente ni de tema oscuro) — por eso cada logo vive en una tarjeta
// blanca fija (no reactiva a --color-surface/tema), igual en claro y oscuro, en vez
// de quedar con un recuadro blanco descuadrado solo en modo oscuro.
export function ClientLogosStrip({ title, logos }: ClientLogosStripProps) {
  return (
    <section className="w-full py-10 border-y border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-[var(--color-text-muted)] mb-8">
          {title}
        </p>

        {/* flex-wrap + justify-center: igual que TrustStrip, cualquier cantidad de
            logos queda centrada sin dejar una última fila incompleta pegada a un
            costado. */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5">
          {logos.map((logo, idx) => (
            <RevealOnScroll key={logo.name} index={idx}>
              <div className="flex items-center justify-center h-16 sm:h-20 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-black/5 transition-transform duration-200 hover:-translate-y-0.5">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[150px] object-contain"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
