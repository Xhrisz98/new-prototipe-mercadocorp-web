"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme_toggle_light") : t("theme_toggle_dark")}
      title={isDark ? t("theme_toggle_light") : t("theme_toggle_dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)]/40 hover:text-[var(--color-primary)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--color-primary)] transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--color-text)] transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
