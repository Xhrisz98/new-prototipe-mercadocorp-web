// content/contacto.ts
// Copy oficial de Contacto extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface ContactoPageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    subheadline: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    serviceLabel: string;
    serviceOptions: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successMessage: string;
    successResetButton: string;
  };
  sidebar: {
    title: string;
    supportTitle: string;
    supportDesc: string;
    addressTitle: string;
    addressVal: string;
    whatsappTitle: string;
    whatsappCta: string;
    whatsappHref: string;
    socialTitle: string;
  };
  internalLinks: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const contentData: Record<Locale, ContactoPageContent> = {
  es: {
    seo: {
      title: "Contacto | Agende su Diagnóstico Gratuito — MercadoCorp",
      description:
        "Agende su Sesión de Diagnóstico Inicial gratuita. Escríbanos por WhatsApp o complete el formulario y le respondemos en menos de 24 horas.",
    },
    hero: {
      badge: "Diagnóstico Tecnológico Inicial Gratuito",
      h1: "¿Hablamos de automatizar su crecimiento?",
      subheadline:
        "Complete el formulario para solicitar una Sesión de Diagnóstico Inicial. Analizamos si nuestro sistema es compatible con sus objetivos — sin compromiso.",
    },
    form: {
      nameLabel: "Nombre y Apellido",
      namePlaceholder: "Ej. Roberto Morales",
      companyLabel: "Empresa u Organización",
      companyPlaceholder: "Ej. Corporación Andina S.A.",
      emailLabel: "Correo Electrónico Corporativo",
      emailPlaceholder: "roberto@empresa.com",
      whatsappLabel: "Número de WhatsApp",
      whatsappPlaceholder: "+593 98 123 4567",
      serviceLabel: "¿Qué solución busca su empresa?",
      serviceOptions: [
        { value: "tecnologia", label: "Tecnología & Automatización de Procesos" },
        { value: "mind", label: "Mind: CRM + Agente de Ventas por IA" },
        { value: "marketing", label: "Marketing Digital & Branding Ejecutivo" },
        { value: "auditoria", label: "Auditoría Digital Integral Gratuita" },
        { value: "otro", label: "Otro requerimiento o software a medida" },
      ],
      messageLabel: "Breve descripción de su operación o desafío",
      messagePlaceholder: "Cuéntenos brevemente qué procesos desea automatizar o mejorar...",
      submitButton: "Solicitar Diagnóstico Gratuito",
      submittingButton: "Enviando solicitud...",
      successTitle: "¡Solicitud Recibida con Éxito!",
      successMessage:
        "Gracias por contactarnos. Un consultor tecnológico de MercadoCorp revisará su requerimiento y se comunicará en menos de 24 horas.",
      successResetButton: "Enviar otra consulta",
    },
    sidebar: {
      title: "Atención y Canales Directos",
      supportTitle: "Soporte Directo B2B",
      supportDesc: "Respuesta garantizada en menos de 24 horas hábiles.",
      addressTitle: "Oficinas Centrales",
      addressVal: "La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Quito, Ecuador",
      whatsappTitle: "Atención Inmediata",
      whatsappCta: "¡Escríbanos por WhatsApp ahora!",
      whatsappHref: "https://wa.me/593983315439?text=Hola,%20quisiera%20agendar%20un%20diagnóstico",
      socialTitle: "Canales Oficiales",
    },
    internalLinks: {
      title: "Antes de Enviar, Explore Nuestro Ecosistema",
      links: [
        { label: "Ver Casos de Éxito", href: "/casos-de-exito" },
        { label: "Conocer Mind (CRM + IA)", href: "/mind" },
        { label: "Auditoría Digital Gratuita", href: "/auditoria-digital" },
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
      ],
    },
  },
  en: {
    seo: {
      title: "Contact | Schedule Your Free Diagnostic — MercadoCorp",
      description:
        "Schedule your free Initial Diagnostic Session. Message us on WhatsApp or fill out the form and we'll respond within 24 hours.",
    },
    hero: {
      badge: "Free Initial Technology Diagnostic",
      h1: "Shall we talk about automating your growth?",
      subheadline:
        "Fill out the form to request an Initial Diagnostic Session. We analyze whether our system is compatible with your objectives — no commitment.",
    },
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Robert Smith",
      companyLabel: "Company or Organization",
      companyPlaceholder: "e.g. Acme Corporation",
      emailLabel: "Corporate Email",
      emailPlaceholder: "robert@acme.com",
      whatsappLabel: "WhatsApp Number",
      whatsappPlaceholder: "+1 555 123 4567",
      serviceLabel: "What solution is your company looking for?",
      serviceOptions: [
        { value: "tecnologia", label: "Technology & Process Automation" },
        { value: "mind", label: "Mind: CRM + AI Sales Agent" },
        { value: "marketing", label: "Digital Marketing & Executive Branding" },
        { value: "auditoria", label: "Comprehensive Free Digital Audit" },
        { value: "otro", label: "Other requirement or custom software" },
      ],
      messageLabel: "Brief description of your operation or challenge",
      messagePlaceholder: "Tell us briefly what processes you'd like to automate or improve...",
      submitButton: "Request Free Diagnostic",
      submittingButton: "Sending request...",
      successTitle: "Request Successfully Received!",
      successMessage:
        "Thank you for contacting us. A MercadoCorp technology consultant will review your request and will be in touch within 24 hours.",
      successResetButton: "Submit another request",
    },
    sidebar: {
      title: "Support and Direct Channels",
      supportTitle: "Direct B2B Support",
      supportDesc: "Guaranteed response within 24 business hours.",
      addressTitle: "Headquarters",
      addressVal: "La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Quito, Ecuador",
      whatsappTitle: "Immediate Attention",
      whatsappCta: "Message us via WhatsApp now!",
      whatsappHref: "https://wa.me/593983315439?text=Hello,%20I%20would%20like%20to%20schedule%20a%20diagnostic",
      socialTitle: "Official Channels",
    },
    internalLinks: {
      title: "Before You Submit, Explore Our Ecosystem",
      links: [
        { label: "See Case Studies", href: "/casos-de-exito" },
        { label: "Discover Mind (CRM + AI)", href: "/mind" },
        { label: "Free Digital Audit", href: "/auditoria-digital" },
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Контакты | Бесплатная диагностика для бизнеса — MercadoCorp",
      description:
        "Запишитесь на бесплатную первичную диагностическую сессию. Напишите в WhatsApp или отправьте форму — ответим менее чем за 24 часа.",
    },
    hero: {
      badge: "Бесплатная Первичная Технологическая Диагностика",
      h1: "Поговорим об автоматизации вашего роста?",
      subheadline:
        "Заполните форму, чтобы запросить первичную диагностическую сессию. Мы проанализируем, совместима ли наша система с вашими целями — без обязательств.",
    },
    form: {
      nameLabel: "Имя и Фамилия",
      namePlaceholder: "Например: Алексей Смирнов",
      companyLabel: "Компания / Организация",
      companyPlaceholder: "Например: ООО Прогресс",
      emailLabel: "Корпоративный Email",
      emailPlaceholder: "alexey@company.com",
      whatsappLabel: "Номер WhatsApp",
      whatsappPlaceholder: "+7 999 123 4567",
      serviceLabel: "Какое решение ищет ваша компания?",
      serviceOptions: [
        { value: "tecnologia", label: "Технологии и Автоматизация процессов" },
        { value: "mind", label: "Mind: CRM + ИИ-агент продаж" },
        { value: "marketing", label: "Цифровой Маркетинг и Брендинг Руководителей" },
        { value: "auditoria", label: "Бесплатный комплексный цифровой аудит" },
        { value: "otro", label: "Другое требование или ПО на заказ" },
      ],
      messageLabel: "Краткое описание вашей деятельности или задачи",
      messagePlaceholder: "Расскажите вкратце, какие процессы вы хотите автоматизировать или улучшить...",
      submitButton: "Запросить бесплатную диагностику",
      submittingButton: "Отправка запроса...",
      successTitle: "Запрос успешно отправлен!",
      successMessage:
        "Спасибо за обращение. Технологический консультант MercadoCorp рассмотрит ваш запрос и свяжется с вами менее чем за 24 часа.",
      successResetButton: "Отправить еще один запрос",
    },
    sidebar: {
      title: "Поддержка и Прямые Каналы Связи",
      supportTitle: "Прямая B2B Поддержка",
      supportDesc: "Гарантированный ответ в течение 24 рабочих часов.",
      addressTitle: "Главный офис",
      addressVal: "La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Кито, Эквадор",
      whatsappTitle: "Немедленное Внимание",
      whatsappCta: "Написать в WhatsApp сейчас!",
      whatsappHref: "https://wa.me/593983315439?text=Здравствуйте,%20хочу%20записаться%20на%20диагностику",
      socialTitle: "Официальные каналы",
    },
    internalLinks: {
      title: "Прежде Чем Отправить, Изучите Нашу Экосистему",
      links: [
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Подробнее о Mind (CRM + ИИ)", href: "/mind" },
        { label: "Бесплатный цифровой аудит", href: "/auditoria-digital" },
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
      ],
    },
  },
};

export function getContactoContent(locale: Locale): ContactoPageContent {
  return contentData[locale] || contentData.es;
}
