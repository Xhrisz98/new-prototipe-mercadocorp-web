"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Sparkles,
  TreeDeciduous,
} from "lucide-react";

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
  const [viewMode, setViewMode] = useState<"tree" | "qr">("tree");
  const [copied, setCopied] = useState(false);

  const phoneNumberDisplay = "+593 98 331 5439";
  const rawPhoneNumber = "593983315439";
  const whatsappUrl = `https://wa.me/${rawPhoneNumber}?text=${encodeURIComponent(
    locale === "en"
      ? "Hello MercadoCorp, I would like to request an initial diagnostic."
      : locale === "ru"
      ? "Здравствуйте, MercadoCorp! Хочу запросить первичную диагностику."
      : "Hola MercadoCorp, quisiera solicitar un diagnóstico inicial."
  )}`;
  const treeIcqrUrl = `https://tree.icqr.com/?q=MTBodHRwczovL3dhLm1lLzU5Mzk4MzMxNTQzOQ`;

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
      viewIcqr: "Ver árbol 3D en vivo en ICQR",
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
      viewIcqr: "View live 3D Tree on ICQR",
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
      viewIcqr: "Открыть живое 3D-дерево в ICQR",
    },
  }[locale];

  return (
    <div
      className={`rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xl transition-all duration-300 ${
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
            onClick={() => setViewMode("tree")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
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
            onClick={() => setViewMode("qr")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
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

      {/* Interactive Visual Display (Click to flip/toggle) */}
      <div
        onClick={() => setViewMode(viewMode === "tree" ? "qr" : "tree")}
        className="relative group cursor-pointer w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden bg-[#F6F1E7] dark:bg-[var(--color-surface)] border border-[#E8E1D3] dark:border-[var(--color-border)] shadow-inner flex items-center justify-center p-3 transition-transform duration-300 hover:scale-[1.02]"
        title={t.tapHint}
      >
        <AnimatePresence mode="wait">
          {viewMode === "tree" ? (
            <motion.div
              key="tree-view"
              initial={{ opacity: 0, rotateY: -90, scale: 0.92 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.92 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              <Image
                src="/images/tree-isometric-3d.png"
                alt="MercadoCorp 3D Magic Tree QR Code"
                fill
                sizes="(max-width: 640px) 280px, 320px"
                className="object-contain p-2 drop-shadow-md select-none pointer-events-none"
                priority
              />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-[var(--color-primary)]" />
                  <span>{t.tapHint}</span>
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="qr-view"
              initial={{ opacity: 0, rotateY: 90, scale: 0.92 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.92 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              <Image
                src="/images/tree-qr-scannable.png"
                alt="MercadoCorp Scannable WhatsApp QR Code"
                fill
                sizes="(max-width: 640px) 280px, 320px"
                className="object-contain p-2 drop-shadow-md select-none pointer-events-none"
                priority
              />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <QrCode className="w-3 h-3 text-[#25D366]" />
                  <span>+593 98 331 5439 • WhatsApp</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Number Pill & Copy Action */}
      <div className="mt-5 p-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
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
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
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
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4 fill-white text-white" />
          <span>{t.chatCta}</span>
        </a>

        {/* Link to view live interactive 3D tree generator */}
        <a
          href={treeIcqrUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors py-1.5 font-medium"
        >
          <span>{t.viewIcqr}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
