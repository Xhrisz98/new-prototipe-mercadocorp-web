"use client";

import React from "react";

export interface BadgeProps {
  variant?: "brand" | "ai" | "outline" | "subtle";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "brand",
  size = "sm",
  className = "",
  dot = false,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full tracking-wide shrink-0";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
  };

  // Variantes con tokens oficiales
  const variantStyles = {
    brand:
      "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/25",
    // RESERVADO EXCLUSIVAMENTE para Mind / Agentes de IA
    ai:
      "bg-[var(--color-ai-accent)]/15 text-[var(--color-ai-accent)] border border-[var(--color-ai-accent)]/40 shadow-[0_0_12px_rgba(4,231,175,0.2)] font-semibold",
    outline:
      "bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border)]",
    subtle:
      "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]/50",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === "ai"
              ? "bg-[var(--color-ai-accent)] animate-pulse"
              : variant === "brand"
              ? "bg-[var(--color-primary)]"
              : "bg-[var(--color-text-muted)]"
          }`}
        />
      )}
      {children}
    </span>
  );
};
