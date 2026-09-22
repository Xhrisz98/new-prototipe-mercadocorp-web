"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { InteractiveTreeQR } from "@/components/ui/InteractiveTreeQR";

export function FloatingWhatsAppQR() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside aria-label="WhatsApp y QR Interactivo" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Card Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs sm:hidden z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-50 mb-3 w-[calc(100vw-2.5rem)] sm:w-[360px] max-w-[380px]"
            >
              {/* Close Button top-right */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[var(--color-bg)]/80 hover:bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                aria-label="Cerrar ventana de WhatsApp y QR"
              >
                <X className="w-4 h-4" />
              </button>

              <InteractiveTreeQR compact={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Launcher Button */}
      <div className="flex justify-end">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar WhatsApp y QR" : "Abrir WhatsApp y QR interactivo"}
          className={`inline-flex items-center gap-2.5 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4 py-3"
              : "bg-[#25D366] text-white hover:bg-[#20bd5a] px-4 py-3.5 sm:px-5 sm:py-3.5"
          }`}
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              <span className="text-xs font-semibold">Cerrar</span>
            </>
          ) : (
            <>
              <div className="relative">
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">WhatsApp & QR</span>
                <span className="text-[10px] opacity-90 leading-tight hidden sm:inline">
                  +593 98 331 5439
                </span>
              </div>
            </>
          )}
        </motion.button>
      </div>
    </aside>
  );
}
