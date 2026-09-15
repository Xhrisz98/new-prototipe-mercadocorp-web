"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "default" | "white" | "dark";
  className?: string;
  width?: number;
  height?: number;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  className = "",
  width = 190,
  height = 42,
}) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group select-none transition-opacity duration-200 hover:opacity-95 ${className}`}
      aria-label="MercadoCorp - Inicio"
    >
      {/* Versión para Tema Claro */}
      <div className={`relative ${variant === "white" ? "hidden" : "block dark:hidden"}`}>
        <Image
          src="/images/logo-mercadocorp.webp"
          alt="MercadoCorp"
          width={width}
          height={height}
          priority
          className="h-auto w-auto max-h-[38px] object-contain"
        />
      </div>

      {/* Versión para Tema Oscuro */}
      <div className={`relative ${variant === "white" ? "block" : "hidden dark:block"}`}>
        <Image
          src="/images/logo-mercadocorp-white.png"
          alt="MercadoCorp"
          width={width}
          height={height}
          priority
          className="h-auto w-auto max-h-[38px] object-contain"
        />
      </div>
    </Link>
  );
};
