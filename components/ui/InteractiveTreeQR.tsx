"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";
import { TreeQRMorph } from "@/components/three/TreeQRMorph";
import { Copy, Check, QrCode, Sparkles, TreeDeciduous } from "lucide-react";

interface InteractiveTreeQRProps {
  compact?: boolean;
  className?: string;
  onClose?: () => void;
}

export function InteractiveTreeQR({
  compact = false,
  className = "",
}: InteractiveTreeQRProps) {
  const { locale } = useLocale();
  const { theme } = useTheme();
  // §5.8: el QR (imagen real validada) es el estado por defecto.
  const [viewMode, setViewMode] = useState<"tree" | "qr">("qr");
  const [copied, setCopied] = useState(false);

  const showView = (next: "tree" | "qr") => setViewMode(next);
  const toggleView = () => showView(viewMode === "tree" ? "qr" : "tree");

  const phoneNumberDisplay = "+593 98 331 5439";
  const rawPhoneNumber = "593983315439";
  const whatsappUrl = `https://wa.me/${rawPhoneNumber}?text=${encodeURIComponent(
    locale === "en"
      ? "Hello MercadoCorp, I would like to request an initial diagnostic."
      : locale === "ru"
      ? "Здравствуйте, MercadoCorp! Хочу запросить первичную диагностику."
      : "Hola MercadoCorp, quisiera solicitar un diagnóstico inicial."
  )}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumberDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const t = {
    es: {
      badge: "WhatsApp Business Directo",
      title: "Interacción Digital Inmediata",
      desc: "Escanea el código con la cámara de tu smartphone o pulsa para chatear sin intermediarios.",
      tabTree: "Árbol 3D",
      tabQr: "Código QR",
      tapHint: "Haz clic en la imagen para alternar la vista",
      chatCta: "Iniciar Chat en WhatsApp",
      copyBtn: "Copiar",
      copiedBtn: "¡Copiado!",
    },
    en: {
      badge: "Direct WhatsApp Business",
      title: "Instant Digital Interaction",
      desc: "Scan the code with your phone camera or tap to start an instant advisory conversation.",
      tabTree: "3D Tree",
      tabQr: "QR Code",
      tapHint: "Click the image to toggle the view",
      chatCta: "Start WhatsApp Chat",
      copyBtn: "Copy",
      copiedBtn: "Copied!",
    },
    ru: {
      badge: "Прямой WhatsApp Business",
      title: "Мгновенная цифровая связь",
      desc: "Наведите камеру смартфона на код или нажмите кнопку для начала диалога.",
      tabTree: "3D Дерево",
      tabQr: "QR-код",
      tapHint: "Нажмите на изображение для переключения вида",
      chatCta: "Написать в WhatsApp",
      copyBtn: "Копия",
      copiedBtn: "Скопировано!",
    },
  }[locale];

  return (
    <div
      className={`rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xl ${
        compact ? "p-5" : "p-6 sm:p-8"
      } ${className}`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          {t.badge}
        </div>

        {/* View Switcher Tabs */}
        <div className="inline-flex p-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => showView("tree")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-[background-color,color,box-shadow] duration-200 cursor-pointer ${
              viewMode === "tree"
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <TreeDeciduous className="w-3.5 h-3.5" />
            <span>{t.tabTree}</span>
          </button>
          <button
            type="button"
            onClick={() => showView("qr")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-[background-color,color,box-shadow] duration-200 cursor-pointer ${
              viewMode === "qr"
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{t.tabQr}</span>
          </button>
        </div>
      </div>

      {!compact && (
        <div className="mb-4">
          <h3
            className="text-xl font-medium tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
          >
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">
            {t.desc}
          </p>
        </div>
      )}

      {/* QR ↔ árbol por transición de partículas (§5.8 v3). El reposo "qr" es
          siempre la imagen real validada; ver TreeQRMorph. */}
      <div
        onClick={toggleView}
        className="relative group cursor-pointer w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden bg-[#F6F1E7] dark:bg-[var(--color-surface)] border border-[#E8E1D3] dark:border-[var(--color-border)] shadow-inner p-3 transition-transform duration-300 hover:scale-[1.02]"
        title={t.tapHint}
        data-qr-view={viewMode}
      >
        <div className="relative w-full h-full">
          <TreeQRMorph view={viewMode} isDark={theme === "dark"} />
          <div className="absolute bottom-2 inset-x-2 text-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
              {viewMode === "qr" ? (
                <>
                  <QrCode className="w-3 h-3 text-[#25D366]" />
                  <span>+593 98 331 5439 • WhatsApp</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[var(--color-primary)]" />
                  <span>{t.tapHint}</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Phone Number Pill & Copy Action */}
      <div className="mt-5 p-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
            <WhatsAppLogo className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-[var(--color-text-muted)]">
              WhatsApp Corporativo
            </div>
            <div className="text-sm font-semibold tracking-wide text-[var(--color-text)] truncate">
              {phoneNumberDisplay}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={copyToClipboard}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
            copied
              ? "bg-[#25D366]/20 text-[#25D366] font-semibold"
              : "border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/5"
          }`}
          title={phoneNumberDisplay}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{t.copiedBtn}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copyBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Main WhatsApp Direct CTA */}
      <div className="mt-3 space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition-[background-color,box-shadow] duration-200"
        >
          <WhatsAppLogo className="w-4 h-4" variant="white" />
          <span>{t.chatCta}</span>
        </a>
      </div>
    </div>
  );
}
