"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Cpu,
  Code2,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  SearchCheck,
  Calendar,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    tech: false,
    marketing: false,
  });
  const [scrolled, setScrolled] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const techSubmenu = [
    {
      href: "/tecnologia-automatizacion",
      title: t("nav_tech_full"),
      desc: t("nav_tech_desc"),
      icon: <Cpu className="w-4 h-4 text-[var(--color-primary)]" />,
      highlight: true,
    },
    {
      href: "/aplicaciones-herramientas-digitales",
      title: t("footer_sub_apps"),
      desc: t("nav_apps_desc"),
      icon: <Code2 className="w-4 h-4 text-[var(--color-primary)]" />,
    },
    {
      href: "/ecommerce-inteligente",
      title: t("footer_sub_ecommerce"),
      desc: t("nav_ecommerce_desc"),
      icon: <ShoppingCart className="w-4 h-4 text-[var(--color-primary)]" />,
    },
  ];

  const marketingSubmenu = [
    {
      href: "/marketing-digital",
      title: t("nav_marketing_full"),
      desc: t("nav_marketing_desc"),
      icon: <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />,
      highlight: true,
    },
    {
      href: "/estrategia-creatividad-branding",
      title: t("footer_sub_branding"),
      desc: t("nav_branding_desc"),
      icon: <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />,
    },
    {
      href: "/auditoria-digital",
      title: t("footer_sub_audit"),
      desc: t("nav_audit_desc"),
      icon: <SearchCheck className="w-4 h-4 text-[var(--color-primary)]" />,
      badge: t("nav_badge_free"),
    },
    {
      href: "/gestion-eventos",
      title: t("footer_sub_events"),
      desc: t("nav_events_desc"),
      icon: <Calendar className="w-4 h-4 text-[var(--color-primary)]" />,
    },
  ];

  const isTechActive =
    pathname.startsWith("/tecnologia-automatizacion") ||
    pathname.startsWith("/aplicaciones-herramientas-digitales") ||
    pathname.startsWith("/ecommerce-inteligente");

  const isMarketingActive =
    pathname.startsWith("/marketing-digital") ||
    pathname.startsWith("/estrategia-creatividad-branding") ||
    pathname.startsWith("/auditoria-digital") ||
    pathname.startsWith("/gestion-eventos");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/92 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs"
          : "bg-[var(--color-bg)]/85 backdrop-blur-sm border-b border-[var(--color-border)]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logotipo Oficial */}
          <div className="flex items-center shrink-0 pr-4">
            <Logo width={180} height={38} />
          </div>

          {/* Navegación Desktop con Mega-menús / Dropdowns */}
          <nav className="hidden xl:flex items-center gap-1.5 text-sm font-medium">
            {/* Inicio */}
            <Link
              href="/"
              className={`px-3 py-2 rounded-full transition-colors ${
                pathname === "/"
                  ? "text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {t("nav_home")}
            </Link>

            {/* Dropdown: Tecnología & Software */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("tech")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isTechActive || activeDropdown === "tech"
                    ? "text-[var(--color-primary)] font-semibold bg-[var(--color-surface)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                }`}
                onClick={() => setActiveDropdown(activeDropdown === "tech" ? null : "tech")}
                aria-expanded={activeDropdown === "tech"}
              >
                <span>{t("nav_tech")}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "tech" ? "rotate-180 text-[var(--color-primary)]" : "opacity-60"
                  }`}
                />
              </button>

              {/* Panel Desplegable de Tecnología */}
              {activeDropdown === "tech" && (
                <div
                  className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter("tech")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl space-y-1">
                    <div className="px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] border-b border-[var(--color-border)] mb-1">
                      {t("footer_col_tech")}
                    </div>
                    {techSubmenu.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                            active
                              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                              : "hover:bg-[var(--color-bg)] text-[var(--color-text)] hover:text-[var(--color-primary)]"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold leading-snug">{item.title}</span>
                            <span className="text-[11px] text-[var(--color-text-muted)] leading-tight mt-0.5 font-normal">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mind (Destacado con Badge de IA exclusivo) */}
            <Link
              href="/mind"
              className={`px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                pathname === "/mind"
                  ? "text-[var(--color-ai)] font-semibold bg-[var(--color-surface)]"
                  : "text-[var(--color-text)] hover:text-[var(--color-ai)] hover:bg-[var(--color-surface)]"
              }`}
            >
              <span>{t("nav_mind")}</span>
              <Badge variant="ai" size="sm" dot>
                {t("nav_badge_ai")}
              </Badge>
            </Link>

            {/* Dropdown: Marketing Digital */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("marketing")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isMarketingActive || activeDropdown === "marketing"
                    ? "text-[var(--color-primary)] font-semibold bg-[var(--color-surface)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                }`}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "marketing" ? null : "marketing")
                }
                aria-expanded={activeDropdown === "marketing"}
              >
                <span>{t("nav_marketing")}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "marketing"
                      ? "rotate-180 text-[var(--color-primary)]"
                      : "opacity-60"
                  }`}
                />
              </button>

              {/* Panel Desplegable de Marketing */}
              {activeDropdown === "marketing" && (
                <div
                  className="absolute top-full left-0 w-84 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter("marketing")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl space-y-1">
                    <div className="px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] border-b border-[var(--color-border)] mb-1">
                      {t("footer_col_marketing")}
                    </div>
                    {marketingSubmenu.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                            active
                              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                              : "hover:bg-[var(--color-bg)] text-[var(--color-text)] hover:text-[var(--color-primary)]"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-semibold leading-snug">
                                {item.title}
                              </span>
                              {item.badge && (
                                <Badge variant="brand" size="sm">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <span className="text-[11px] text-[var(--color-text-muted)] leading-tight mt-0.5 font-normal">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Nosotros */}
            <Link
              href="/nosotros"
              className={`px-3 py-2 rounded-full transition-colors ${
                pathname === "/nosotros"
                  ? "text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {t("nav_about")}
            </Link>

            {/* Casos de Éxito */}
            <Link
              href="/casos-de-exito"
              className={`px-3 py-2 rounded-full transition-colors ${
                pathname === "/casos-de-exito"
                  ? "text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {t("nav_cases")}
            </Link>
          </nav>

          {/* Controles Desktop (Idioma, Tema, Botón CTA Píldora). El nav desktop
              solo aparece desde xl (1280px) — a esa altura hay espacio de sobra,
              así que no hace falta ninguna versión compacta. */}
          <div className="hidden xl:flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              href="/contacto"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="font-medium"
            >
              {t("nav_cta")}
            </Button>
          </div>

          {/* Botón Menú Móvil (incluye el rango 1024-1279px, ya que el nav
              desktop completo no aparece hasta xl) */}
          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
              aria-label={t("nav_menu")}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable con Acordeones para Subpáginas */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[var(--color-border)] bg-[var(--color-bg)]/98 backdrop-blur-xl px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1.5">
            {/* Inicio */}
            <Link
              href="/"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                pathname === "/"
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {t("nav_home")}
            </Link>

            {/* Acordeón Tecnología */}
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("tech")}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-text)] bg-[var(--color-surface)]"
              >
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--color-primary)]" />
                  {t("nav_tech")}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded.tech ? "rotate-180 text-[var(--color-primary)]" : "opacity-60"
                  }`}
                />
              </button>

              {mobileExpanded.tech && (
                <div className="p-2 bg-[var(--color-bg)] space-y-1 border-t border-[var(--color-border)]">
                  {techSubmenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg text-xs hover:bg-[var(--color-surface)] text-[var(--color-text)]"
                    >
                      <div className="w-6 h-6 rounded bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        {sub.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">{sub.title}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)]">{sub.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mind */}
            <Link
              href="/mind"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                pathname === "/mind"
                  ? "bg-[var(--color-ai)]/10 text-[var(--color-ai)] font-semibold"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--color-ai)]" />
                {t("nav_mind")}
              </span>
              <Badge variant="ai" size="sm" dot>
                {t("nav_badge_ai")}
              </Badge>
            </Link>

            {/* Acordeón Marketing */}
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("marketing")}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-text)] bg-[var(--color-surface)]"
              >
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                  {t("nav_marketing")}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded.marketing
                      ? "rotate-180 text-[var(--color-primary)]"
                      : "opacity-60"
                  }`}
                />
              </button>

              {mobileExpanded.marketing && (
                <div className="p-2 bg-[var(--color-bg)] space-y-1 border-t border-[var(--color-border)]">
                  {marketingSubmenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg text-xs hover:bg-[var(--color-surface)] text-[var(--color-text)]"
                    >
                      <div className="w-6 h-6 rounded bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        {sub.icon}
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{sub.title}</span>
                          {sub.badge && (
                            <Badge variant="brand" size="sm">
                              {sub.badge}
                            </Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-[var(--color-text-muted)]">{sub.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nosotros */}
            <Link
              href="/nosotros"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                pathname === "/nosotros"
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {t("nav_about")}
            </Link>

            {/* Casos de Éxito */}
            <Link
              href="/casos-de-exito"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                pathname === "/casos-de-exito"
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {t("nav_cases")}
            </Link>

            {/* CTA Móvil */}
            <div className="pt-3">
              <Button
                variant="primary"
                size="md"
                href="/contacto"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full justify-center"
              >
                {t("nav_cta")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
