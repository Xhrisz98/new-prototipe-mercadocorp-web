// lib/i18n.ts
// Soporte multi-idioma (ES / EN / RU) con Español como idioma principal.

export type Locale = "es" | "en" | "ru";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "ES" },
  { code: "en", label: "English", flag: "EN" },
  { code: "ru", label: "Русский", flag: "RU" },
];

export const DEFAULT_LOCALE: Locale = "es";

export const translations = {
  // Navegación
  nav_home: { es: "Inicio", en: "Home", ru: "Главная" },
  nav_tech: { es: "Tecnología", en: "Technology", ru: "Технологии" },
  nav_tech_full: { es: "Tecnología & Automatización", en: "Technology & Automation", ru: "Технологии и Автоматизация" },
  nav_tech_desc: { es: "Hub de arquitectura, agentes y automatización", en: "Architecture, AI agents & automation hub", ru: "Хаб архитектуры, ИИ-агентов и автоматизации" },
  nav_apps_desc: { es: "Software a medida, CRMs y paneles internos", en: "Custom software, CRMs & internal panels", ru: "Заказное ПО, кастомные CRM и бэкофис" },
  nav_ecommerce_desc: { es: "Tiendas con IA y recuperación de carritos", en: "AI-powered stores & checkout recovery", ru: "Интернет-магазины с ИИ и возврат корзин" },
  nav_mind: { es: "Mind", en: "Mind", ru: "Mind" },
  nav_mind_desc: { es: "CRM + Agente de ventas por WhatsApp 24/7", en: "CRM + 24/7 WhatsApp AI sales agent", ru: "CRM + ИИ-агент продаж в WhatsApp 24/7" },
  nav_marketing: { es: "Marketing", en: "Marketing", ru: "Маркетинг" },
  nav_marketing_full: { es: "Marketing Digital", en: "Digital Marketing", ru: "Цифровой Маркетинг" },
  nav_marketing_desc: { es: "Hub de contenido, estrategia y eventos", en: "Content, strategy & event management hub", ru: "Хаб контента, стратегии и мероприятий" },
  nav_branding_desc: { es: "Posicionamiento corporativo y de líderes", en: "Corporate & executive thought-leadership", ru: "Корпоративный и личный бренд руководителя" },
  nav_audit_desc: { es: "Diagnóstico técnico: web, SEO, redes y pauta", en: "Technical audit: web, SEO, social & ads", ru: "Технический аудит: сайт, SEO, соцсети и реклама" },
  nav_events_desc: { es: "Gestión y experiencias con amplificación digital", en: "360° corporate events with digital PR", ru: "Корпоративные события 360° с цифровым PR" },
  nav_about: { es: "Nosotros", en: "About Us", ru: "О нас" },
  nav_cases: { es: "Casos de Éxito", en: "Case Studies", ru: "Кейсы" },
  nav_contact: { es: "Contacto", en: "Contact", ru: "Контакты" },
  nav_cta: { es: "Diagnóstico Gratis", en: "Free Diagnostic", ru: "Бесплатный Аудит" },
  nav_badge_ai: { es: "CRM + IA", en: "CRM + AI", ru: "CRM + ИИ" },
  nav_badge_free: { es: "Gratis", en: "Free", ru: "Бесплатно" },
  nav_menu: { es: "Menú", en: "Menu", ru: "Меню" },

  // Tema
  theme_toggle_light: { es: "Modo claro", en: "Light mode", ru: "Светлая тема" },
  theme_toggle_dark: { es: "Modo oscuro", en: "Dark mode", ru: "Темная тема" },

  // Footer
  footer_tagline: {
    es: "Consultora tecnológica B2B especializada en automatización, agentes de IA y software a medida.",
    en: "B2B tech consultancy specializing in automation, AI agents, and custom software.",
    ru: "B2B технологическая консалтинговая компания, специализирующаяся на автоматизации, ИИ-агентах и заказном ПО.",
  },
  footer_location: {
    es: "La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Quito - Ecuador",
    en: "La Pinta E5-38 & la Rábida, Royal Pacífico Building, Quito - Ecuador",
    ru: "La Pinta E5-38 и la Rábida, Edificio Royal Pacífico, Кито - Эквадор",
  },
  footer_col_tech: { es: "Tecnología & Software", en: "Technology & Software", ru: "Технологии и ПО" },
  footer_sub_apps: { es: "Aplicaciones y Herramientas", en: "Applications & Tools", ru: "Приложения и Инструменты" },
  footer_sub_ecommerce: { es: "E-commerce Inteligente", en: "Smart E-commerce", ru: "Умный E-commerce" },
  footer_sub_mind: { es: "Mind (CRM + Agente IA)", en: "Mind (CRM + AI Agent)", ru: "Mind (CRM + ИИ-Агент)" },
  footer_col_marketing: { es: "Marketing Digital", en: "Digital Marketing", ru: "Цифровой Маркетинг" },
  footer_sub_branding: { es: "Estrategia y Branding Personal", en: "Strategy & Personal Branding", ru: "Стратегия и Личный Бренд" },
  footer_sub_audit: { es: "Auditoría Digital", en: "Digital Audit", ru: "Цифровой Аудит" },
  footer_sub_events: { es: "Gestión Integral de Eventos", en: "Event Management", ru: "Организация Мероприятий" },
  footer_col_company: { es: "Empresa", en: "Company", ru: "Компания" },
  footer_col_legal: { es: "Legal", en: "Legal", ru: "Правовая Информация" },
  footer_privacy: { es: "Políticas de Privacidad", en: "Privacy Policy", ru: "Политика Конфиденциальности" },
  footer_terms: { es: "Términos y Condiciones", en: "Terms & Conditions", ru: "Условия Использования" },
  footer_rights: { es: "Todos los derechos reservados.", en: "All rights reserved.", ru: "Все права защищены." },
  footer_response_time: { es: "Respuesta en menos de 24h", en: "Response within 24h", ru: "Ответ в течение 24 часов" },
  footer_whatsapp_direct: { es: "Escríbanos por WhatsApp", en: "Message on WhatsApp", ru: "Написать в WhatsApp" },
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(key: TranslationKey, locale: Locale): string {
  const item = translations[key];
  if (!item) return key;
  return item[locale] || item[DEFAULT_LOCALE] || key;
}
