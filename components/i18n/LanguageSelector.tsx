"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import { Globe, ChevronDown } from "lucide-react";
import { Locale } from "@/lib/i18n";

export function LanguageSelector({ variant = "default" }: { variant?: "default" | "minimal" | "compact" }) {
  const { locale, setLocale, locales } = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Seleccionar idioma"
        className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-colors duration-200 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
          variant === "compact" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
        <span className="font-semibold uppercase tracking-wider">{current.flag}</span>
        <ChevronDown className={`w-3 h-3 text-[var(--color-text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-2xl shadow-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {locales.map((item) => {
            const isSelected = item.code === locale;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLocale(item.code as Locale);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-left transition-colors duration-150 ${
                  isSelected
                    ? "font-semibold text-[var(--color-primary)] bg-[var(--color-border)]/40"
                    : "text-[var(--color-text)] hover:bg-[var(--color-border)]/30"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-border)]/60 text-[var(--color-text-muted)]">
                  {item.flag}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
