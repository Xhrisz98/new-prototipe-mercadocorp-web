"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";
import {
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Sparkles,
  TreeDeciduous,
} from "lucide-react";

// El árbol 3D (three.js + R3F) se carga solo cuando alguien gira la tarjeta: esta
// tarjeta vive también en el widget flotante global, y sin esto three.js entraría
// al bundle de todas las páginas.
const loadTree = () => import("@/components/three/TreeGrowthReveal");
const TreeGrowthReveal = dynamic(loadTree, { ssr: false });

const MOBILE_QUERY = "(max-width: 767px)";
const subscribeMobile = (onChange: () => void) => {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};
const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getMobileServerSnapshot = () => false;

const FLIP_SECONDS = 0.7;

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
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
  // §5.8: el QR es el estado por defecto; el árbol vive en el reverso.
  const [viewMode, setViewMode] = useState<"tree" | "qr">("qr");
  // El árbol se monta (y empieza a crecer) recién al terminar el giro: durante el
  // giro el reverso se ve vacío. Montarlo al empezar el giro trababa la animación
  // — crear el contexto WebGL + compilar shaders medía 225ms en desktop y hasta
  // 930ms en mobile con CPU 6x, justo en medio del giro.
  const [treeMounted, setTreeMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Evaluar el módulo de three.js cuesta ~400ms de hilo principal en desktop (más
  // en mobile). Se adelanta a un momento ocioso apenas se monta la tarjeta (página de
  // Contacto, o al abrir el widget flotante), para que no caiga entre el clic y el
  // crecimiento. El archivo en sí normalmente ya está en caché: el prefetch de rutas
  // de Next lo baja al enlazar Inicio/Mind.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => void loadTree(), { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    // Safari no tiene requestIdleCallback.
    const id = window.setTimeout(() => void loadTree(), 1500);
    return () => window.clearTimeout(id);
  }, []);

  const showView = (next: "tree" | "qr") => {
    if (next === viewMode) return;
    // Con motion reducida no hay giro que esperar: el árbol se muestra ya construido
    // (prop `instant`) y al volver al QR se desmonta de inmediato.
    if (prefersReducedMotion) setTreeMounted(next === "tree");
    setViewMode(next);
  };
  const toggleView = () => showView(viewMode === "tree" ? "qr" : "tree");

  const handleFlipComplete = (definition: unknown) => {
    const rotateY = (definition as { rotateY?: number }).rotateY;
    // Al volver al QR se libera el contexto WebGL; el próximo giro crece desde cero.
    if (rotateY === 180) setTreeMounted(true);
    else if (rotateY === 0) setTreeMounted(false);
  };

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

      {/* Tarjeta de dos caras (§5.8): QR al frente, árbol 3D en el reverso. Un clic
          gira 180° en Y; el giro es solo CSS 3D vía Motion, la escena WebGL no gira. */}
      <div
        onClick={toggleView}
        onPointerEnter={() => void loadTree()}
        className="relative group cursor-pointer w-full aspect-square max-w-[320px] mx-auto transition-transform duration-300 hover:scale-[1.02]"
        style={{ perspective: 1200 }}
        title={t.tapHint}
        data-tree-flip={viewMode}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
          animate={{ rotateY: viewMode === "tree" ? 180 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: FLIP_SECONDS, ease: [0.45, 0, 0.2, 1] }}
          onAnimationComplete={handleFlipComplete}
        >
          {/* Frente: QR */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#F6F1E7] dark:bg-[var(--color-surface)] border border-[#E8E1D3] dark:border-[var(--color-border)] shadow-inner p-3"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            aria-hidden={viewMode === "tree"}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/tree-qr-scannable-blue.png"
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
            </div>
          </div>

          {/* Reverso: árbol 3D */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#F6F1E7] dark:bg-[var(--color-surface)] border border-[#E8E1D3] dark:border-[var(--color-border)] shadow-inner"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            aria-hidden={viewMode === "qr"}
          >
            {/* Mobile usa "lite" (2 niveles de ramas, sin antialias, dpr ≤1.25): en
                las mediciones con CPU 4x/6x la escena "full" consumía ~25-30% del
                margen por frame y "lite" prácticamente nada. La interacción (giro +
                crecimiento) es la misma en ambos. */}
            {treeMounted && (
              <TreeGrowthReveal
                instant={prefersReducedMotion}
                isDark={theme === "dark"}
                detail={isMobile ? "lite" : "full"}
                className="pointer-events-none select-none"
              />
            )}
            <div className="absolute bottom-2 inset-x-2 text-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3 h-3 text-[var(--color-primary)]" />
                <span>{t.tapHint}</span>
              </span>
            </div>
          </div>
        </motion.div>
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
