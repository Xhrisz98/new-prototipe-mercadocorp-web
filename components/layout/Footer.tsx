"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  MapPin,
  Clock,
  MessageSquare,
  Mail,
} from "lucide-react";

export function Footer() {
  const { t } = useLocale();

  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-colors duration-200">
      {/* Contenido Principal del Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Columna Marca e Información Corporativa (ocupa 2 columnas) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <Logo showTagline={true} />
            <p className="text-sm text-[var(--color-text-muted)] max-w-sm leading-relaxed">
              {t("footer_tagline")}
            </p>

            <div className="pt-2 flex flex-col space-y-2.5 text-xs text-[var(--color-text-muted)]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[var(--color-primary)] mt-0.5" />
                <span>{t("footer_location")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-[var(--color-primary)]" />
                <span>{t("footer_response_time")}</span>
              </div>
            </div>

            {/* Enlaces Rápidos de Contacto Directo */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/593983315439"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:contacto@mercadocorp.ec"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-border)]/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Columna Tecnología & Software */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
              {t("footer_col_tech")}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/tecnologia-automatizacion"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("nav_tech_full")}
                </Link>
              </li>
              <li>
                <Link
                  href="/mind"
                  className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors group"
                >
                  <span>Mind</span>
                  <Badge variant="ai" size="sm">
                    IA
                  </Badge>
                </Link>
              </li>
              <li>
                <Link
                  href="/aplicaciones-herramientas-digitales"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_sub_apps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/ecommerce-inteligente"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_sub_ecommerce")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Marketing Digital */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
              {t("footer_col_marketing")}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/marketing-digital"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_col_marketing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/estrategia-creatividad-branding"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_sub_branding")}
                </Link>
              </li>
              <li>
                <Link
                  href="/auditoria-digital"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_sub_audit")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gestion-eventos"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_sub_events")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Empresa */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
              {t("footer_col_company")}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/nosotros"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("nav_about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/casos-de-exito"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("nav_cases")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("nav_contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Legal & Redes */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
              {t("footer_col_legal")}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/politicas-de-privacidad"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t("footer_terms")}
                </Link>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-[var(--color-text-muted)] block mb-2">
                Conectar
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com/company/mercadocorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73 1.73-.78 1.73-1.73-.78-1.73-1.73-1.73Z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/mercadocorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/mercadocorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior (Copyright y Selector de Idioma) */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© {currentYear} MercadoCorp. {t("footer_rights")}</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px]">Idioma:</span>
            <LanguageSelector variant="compact" />
          </div>
        </div>
      </div>
    </footer>
  );
}
