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
        "Book your complimentary initial diagnostic session. Contact us via WhatsApp or submit the form; we respond within 24 hours.",
    },
    hero: {
      badge: "Complimentary Initial Technical Diagnostic",
      h1: "Ready to automate your enterprise growth?",
      subheadline:
        "Submit the form to request an Initial Diagnostic Session. We will evaluate if our architectural frameworks fit your goals — no commitment required.",
    },
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Robert Smith",
      companyLabel: "Company / Organization",
      companyPlaceholder: "e.g. Acme Corporation",
      emailLabel: "Work Email",
      emailPlaceholder: "robert@acme.com",
      whatsappLabel: "WhatsApp / Mobile Phone",
      whatsappPlaceholder: "+1 555 123 4567",
      serviceLabel: "What solution are you exploring?",
      serviceOptions: [
        { value: "tecnologia", label: "Technology & Process Automation" },
        { value: "mind", label: "Mind: CRM + AI Sales Agent" },
        { value: "marketing", label: "Digital Marketing & Thought Leadership" },
        { value: "auditoria", label: "Complimentary Digital Audit" },
        { value: "otro", label: "Custom Software or Other Inquiry" },
      ],
      messageLabel: "Brief description of your operational bottlenecks",
      messagePlaceholder: "Outline the processes or systems you are looking to scale or automate...",
      submitButton: "Request Free Diagnostic",
      submittingButton: "Sending request...",
      successTitle: "Request Successfully Received!",
      successMessage:
        "Thank you for contacting MercadoCorp. A senior technology advisor will review your specifications and follow up within 24 hours.",
      successResetButton: "Submit another request",
    },
    sidebar: {
      title: "Direct Advisory Channels",
      supportTitle: "Direct B2B Advisory",
      supportDesc: "Guaranteed response within 24 business hours.",
      addressTitle: "Headquarters",
      addressVal: "La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Quito, Ecuador",
      whatsappTitle: "Instant Messaging",
      whatsappCta: "Message us via WhatsApp now!",
      whatsappHref: "https://wa.me/593983315439?text=Hello,%20I%20would%20like%20to%20schedule%20a%20diagnostic",
      socialTitle: "Official Channels",
    },
    internalLinks: {
      title: "Explore the Ecosystem While You Wait",
      links: [
        { label: "Review Case Studies", href: "/casos-de-exito" },
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
        "Запишитесь на первичную технологическую диагностику. Напишите в WhatsApp или отправьте форму — ответим в течение 24 часов.",
    },
    hero: {
      badge: "Бесплатная Первичная Технологическая Диагностика",
      h1: "Готовы автоматизировать рост вашего бизнеса?",
      subheadline:
        "Заполните форму для записи на вводную сессию. Мы оценим совместимость наших решений с вашими задачами — без обязательств.",
    },
    form: {
      nameLabel: "Имя и Фамилия",
      namePlaceholder: "Например: Алексей Смирнов",
      companyLabel: "Компания / Организация",
      companyPlaceholder: "Например: ООО Прогресс",
      emailLabel: "Корпоративный Email",
      emailPlaceholder: "alexey@company.com",
      whatsappLabel: "Номер телефона / WhatsApp",
      whatsappPlaceholder: "+7 999 123 4567",
      serviceLabel: "Какое направление вас интересует?",
      serviceOptions: [
        { value: "tecnologia", label: "Технологии и Автоматизация процессов" },
        { value: "mind", label: "Mind: CRM + ИИ-агент продаж" },
        { value: "marketing", label: "Цифровой Маркетинг и Брендинг" },
        { value: "auditoria", label: "Бесплатный комплексный цифровой аудит" },
        { value: "otro", label: "Разработка заказного ПО / Другое" },
      ],
      messageLabel: "Краткое описание ваших задач",
      messagePlaceholder: "Опишите, какие процессы вы хотите оптимизировать или автоматизировать...",
      submitButton: "Запросить бесплатный аудит",
      submittingButton: "Отправка запроса...",
      successTitle: "Запрос успешно отправлен!",
      successMessage:
        "Спасибо за обращение. Технический эксперт MercadoCorp изучит вводные данные и свяжется с вами в течение 24 часов.",
      successResetButton: "Отправить еще один запрос",
    },
    sidebar: {
      title: "Прямые каналы связи",
      supportTitle: "B2B Поддержка",
      supportDesc: "Гарантированный ответ в течение 24 рабочих часов.",
      addressTitle: "Главный офис",
      addressVal: "La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Кито, Эквадор",
      whatsappTitle: "Быстрая связь",
      whatsappCta: "Написать в WhatsApp сейчас!",
      whatsappHref: "https://wa.me/593983315439?text=Здравствуйте,%20хочу%20записаться%20на%20диагностику",
      socialTitle: "Официальные каналы",
    },
    internalLinks: {
      title: "Полезные разделы",
      links: [
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Подробнее о Mind (CRM + ИИ)", href: "/mind" },
        { label: "Цифровой аудит", href: "/auditoria-digital" },
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
      ],
    },
  },
};

export function getContactoContent(locale: Locale): ContactoPageContent {
  return contentData[locale] || contentData.es;
}
