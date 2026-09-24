"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InternalLinksStrip } from "@/components/sections/InternalLinksStrip";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getContactoContent } from "@/content/contacto";
import { InteractiveTreeQR } from "@/components/ui/InteractiveTreeQR";
import {
  Clock,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ContactoPage() {
  const { locale } = useLocale();
  const content = getContactoContent(locale);

  // Estado del formulario client-side (mock)
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    whatsapp: "",
    servicio: "tecnologia",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const nombreRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const fieldRefs: Record<string, React.RefObject<HTMLInputElement | null>> = {
    nombre: nombreRef,
    correo: correoRef,
    whatsapp: whatsappRef,
  };

  const requiredFieldMessage =
    locale === "en"
      ? "This field is required."
      : locale === "ru"
      ? "Это поле обязательно."
      : "Este campo es obligatorio.";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      const next = { ...fieldErrors };
      delete next[e.target.name];
      setFieldErrors(next);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica client-side — errores inline por campo, en orden de
    // aparición en el formulario, con foco automático al primero.
    const errors: Record<string, string> = {};
    if (!formData.nombre.trim()) errors.nombre = requiredFieldMessage;
    if (!formData.correo.trim()) errors.correo = requiredFieldMessage;
    if (!formData.whatsapp.trim()) errors.whatsapp = requiredFieldMessage;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = ["nombre", "correo", "whatsapp"].find((name) => errors[name]);
      if (firstErrorField) fieldRefs[firstErrorField].current?.focus();
      return;
    }

    setIsSubmitting(true);
    // Simular envío mock sin conectar backend real conforme a AGENTS.md
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      empresa: "",
      correo: "",
      whatsapp: "",
      servicio: "tecnologia",
      mensaje: "",
    });
    setFieldErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Encabezado Principal */}
        <section className="relative w-full pt-16 pb-12 md:pt-20 md:pb-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-6">
              <Badge variant="brand" size="md">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                {content.hero.badge}
              </Badge>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-6 text-[var(--color-text)] leading-[1.15]"
              style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
            >
              {content.hero.h1}
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
              {content.hero.subheadline}
            </p>
          </div>
        </section>

        {/* Sección Formulario + Barra Lateral de Contacto */}
        <section className="w-full pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Columna Formulario (7 columnas) */}
              <div className="lg:col-span-7 bg-[var(--color-surface)] border border-[var(--color-border)] p-8 sm:p-10 rounded-3xl shadow-sm">
                {isSuccess ? (
                  <div className="text-center py-12 px-4 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <h2
                      className="text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-[var(--color-text)]"
                      style={{ fontFamily: "var(--font-kanit), sans-serif", fontStyle: "italic" }}
                    >
                      {content.form.successTitle}
                    </h2>

                    <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed mb-8">
                      {content.form.successMessage}
                    </p>

                    <Button variant="secondary" size="md" onClick={handleReset}>
                      {content.form.successResetButton}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contacto-nombre" className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                          {content.form.nameLabel} *
                        </label>
                        <input
                          id="contacto-nombre"
                          ref={nombreRef}
                          type="text"
                          name="nombre"
                          required
                          autoComplete="name"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder={content.form.namePlaceholder}
                          aria-invalid={!!fieldErrors.nombre}
                          aria-describedby={fieldErrors.nombre ? "contacto-nombre-error" : undefined}
                          className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors text-sm ${
                            fieldErrors.nombre ? "border-2 border-[var(--color-primary)]" : "border-[var(--color-border)]"
                          }`}
                        />
                        {fieldErrors.nombre && (
                          <p id="contacto-nombre-error" role="alert" className="mt-1.5 text-xs text-[var(--color-primary)] font-medium">
                            {fieldErrors.nombre}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contacto-empresa" className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                          {content.form.companyLabel}
                        </label>
                        <input
                          id="contacto-empresa"
                          type="text"
                          name="empresa"
                          autoComplete="organization"
                          value={formData.empresa}
                          onChange={handleChange}
                          placeholder={content.form.companyPlaceholder}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contacto-correo" className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                          {content.form.emailLabel} *
                        </label>
                        <input
                          id="contacto-correo"
                          ref={correoRef}
                          type="email"
                          name="correo"
                          required
                          autoComplete="email"
                          spellCheck={false}
                          value={formData.correo}
                          onChange={handleChange}
                          placeholder={content.form.emailPlaceholder}
                          aria-invalid={!!fieldErrors.correo}
                          aria-describedby={fieldErrors.correo ? "contacto-correo-error" : undefined}
                          className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors text-sm ${
                            fieldErrors.correo ? "border-2 border-[var(--color-primary)]" : "border-[var(--color-border)]"
                          }`}
                        />
                        {fieldErrors.correo && (
                          <p id="contacto-correo-error" role="alert" className="mt-1.5 text-xs text-[var(--color-primary)] font-medium">
                            {fieldErrors.correo}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contacto-whatsapp" className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                          {content.form.whatsappLabel} *
                        </label>
                        <input
                          id="contacto-whatsapp"
                          ref={whatsappRef}
                          type="tel"
                          name="whatsapp"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder={content.form.whatsappPlaceholder}
                          aria-invalid={!!fieldErrors.whatsapp}
                          aria-describedby={fieldErrors.whatsapp ? "contacto-whatsapp-error" : undefined}
                          className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors text-sm ${
                            fieldErrors.whatsapp ? "border-2 border-[var(--color-primary)]" : "border-[var(--color-border)]"
                          }`}
                        />
                        {fieldErrors.whatsapp && (
                          <p id="contacto-whatsapp-error" role="alert" className="mt-1.5 text-xs text-[var(--color-primary)] font-medium">
                            {fieldErrors.whatsapp}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contacto-servicio" className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                        {content.form.serviceLabel}
                      </label>
                      <select
                        id="contacto-servicio"
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors text-sm cursor-pointer"
                      >
                        {content.form.serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contacto-mensaje" className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                        {content.form.messageLabel}
                      </label>
                      <textarea
                        id="contacto-mensaje"
                        name="mensaje"
                        rows={4}
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder={content.form.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors text-sm resize-y"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full justify-center"
                        icon={<Send className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        {isSubmitting ? content.form.submittingButton : content.form.submitButton}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
                      <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>Sus datos están protegidos bajo estricto acuerdo de confidencialidad.</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Columna Información Directa y Ubicación (5 columnas) */}
              <div className="lg:col-span-5 space-y-8">
                {/* QR Interactivo 3D Magic Tree */}
                <InteractiveTreeQR />

                <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6">
                  <h3
                    className="text-xl font-medium tracking-tight text-[var(--color-text)]"
                    style={{ fontFamily: "var(--font-kanit), sans-serif" }}
                  >
                    {content.sidebar.title}
                  </h3>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text)]">
                        {content.sidebar.supportTitle}
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-0.5">
                        {content.sidebar.supportDesc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text)]">
                        {content.sidebar.addressTitle}
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-0.5 leading-relaxed">
                        {content.sidebar.addressVal}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text)]">
                        {content.sidebar.whatsappTitle}
                      </div>
                      <a
                        href={content.sidebar.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-[var(--color-primary)] font-medium hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        {content.sidebar.whatsappCta}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-4">
                    {content.sidebar.socialTitle}
                  </h4>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/company/mercadocorp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://instagram.com/mercadocorp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://facebook.com/mercadocorp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enlazado Interno de Retención */}
        <InternalLinksStrip
          title={content.internalLinks.title}
          links={content.internalLinks.links}
        />
      </main>

      <Footer />
    </div>
  );
}
