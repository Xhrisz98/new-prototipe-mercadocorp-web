// content/tecnologia.ts
// Copy oficial del hub Tecnología & Automatización extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface TecnologiaContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    subheadline: string;
    ctaPrimary: { label: string; href: string };
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: {
      number: string;
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
      badge: string;
      isMind?: boolean;
    }[];
  };
  philosophyBlock: {
    title: string;
    description: string;
    keyTakeaway: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    title: string;
    description: string;
    ctaPrimary: { label: string; href: string };
  };
  internalLinks: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const contentData: Record<Locale, TecnologiaContent> = {
  es: {
    seo: {
      title: "Automatización, Agentes de IA y Software a Medida | MercadoCorp",
      description:
        "Agentes de IA, automatización de procesos, CRMs personalizados y software a medida para empresas en Ecuador. Descubra cómo eliminar el trabajo manual de su operación.",
    },
    hero: {
      badge: "Pilar 01 — Tecnología & Automatización",
      h1: "El software, los agentes y la automatización que su empresa necesita para operar sin fricción",
      subheadline:
        "No vendemos herramientas genéricas. Diseñamos el sistema tecnológico específico que su operación necesita — y lo conectamos con su equipo real, no con un manual de usuario.",
      ctaPrimary: {
        label: "Diagnóstico Tecnológico Gratuito",
        href: "/contacto",
      },
    },
    services: {
      sectionTitle: "Servicios Especializados del Pilar",
      sectionSubtitle:
        "Soluciones robustas diseñadas para erradicar cuellos de botella y conectar su operación.",
      items: [
        {
          number: "01",
          title: "Mind — CRM + Agente de IA",
          description:
            "Un CRM con un agente de ventas por WhatsApp disponible 24/7, entrenado con el conocimiento de su negocio para atender, cotizar y cerrar sin descanso.",
          href: "/mind",
          ctaLabel: "Conocer Mind →",
          badge: "CRM + IA Flagship",
          isMind: true,
        },
        {
          number: "02",
          title: "Aplicaciones y Herramientas Digitales",
          description:
            "Software a medida: apps internas, gestores, CRMs personalizados e integraciones de ecosistemas que eliminan los silos de información.",
          href: "/aplicaciones-herramientas-digitales",
          ctaLabel: "Ver el servicio →",
          badge: "Software a Medida",
        },
        {
          number: "03",
          title: "E-commerce Inteligente",
          description:
            "Tiendas en línea potenciadas con IA y automatización que venden 24 horas con menos fricción y carritos recuperados automáticamente.",
          href: "/ecommerce-inteligente",
          ctaLabel: "Ver el servicio →",
          badge: "Comercio Autónomo",
        },
      ],
    },
    philosophyBlock: {
      title: "Antes de invertir en atraer más clientes, asegure que puede atenderlos a todos",
      description:
        "De nada sirve una campaña exitosa si el 30% de los leads se pierde porque nadie los contactó a tiempo. Empezamos por ordenar el motor — CRM, automatización, agentes de IA — para que cada peso que después invierta en marketing tenga un sistema real detrás que lo capitalice.",
      keyTakeaway: "Un sistema eficiente multiplica el retorno de cada lead que ingresa.",
    },
    faq: {
      title: "Preguntas Frecuentes sobre Tecnología",
      subtitle: "Claridad directa sobre cómo abordamos la ingeniería de su negocio.",
      items: [
        {
          question: "¿Necesito reemplazar todas mis herramientas actuales?",
          answer:
            "No. La automatización se diseña para integrarse con lo que ya usa (WhatsApp, correo, hojas de cálculo, CRMs existentes) y reemplazar solo lo que genera fricción o trabajo duplicado.",
        },
        {
          question: "¿Esto es solo para empresas grandes?",
          answer:
            "No. El diseño modular a medida permite empezar con un solo proceso prioritario (por ejemplo, la atención y calificación por WhatsApp) y escalar por fases controladas.",
        },
      ],
    },
    finalCta: {
      title: "¿Listo para ordenar y automatizar su operación?",
      description:
        "Analizamos su flujo de trabajo actual sin costo y le entregamos una recomendación de arquitectura técnica clara.",
      ctaPrimary: {
        label: "Agendar Diagnóstico Tecnológico",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Continuar explorando el ecosistema:",
      links: [
        { label: "Mind (CRM + Agente)", href: "/mind" },
        { label: "Apps y Software a Medida", href: "/aplicaciones-herramientas-digitales" },
        { label: "E-commerce Inteligente", href: "/ecommerce-inteligente" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Contacto Directo", href: "/contacto" },
      ],
    },
  },

  en: {
    seo: {
      title: "Automation, AI Agents & Custom Software | MercadoCorp",
      description:
        "AI agents, process automation, custom CRMs, and bespoke software for companies in Ecuador. Discover how to eliminate manual work from your operations.",
    },
    hero: {
      badge: "Pillar 01 — Technology & Automation",
      h1: "The software, agents, and automation your business needs to operate friction-free",
      subheadline:
        "We don't sell generic tools. We design the specific technological system your operation needs — and we connect it with your real team, not with a user manual.",
      ctaPrimary: {
        label: "Free Tech Diagnostic",
        href: "/contacto",
      },
    },
    services: {
      sectionTitle: "Specialized Technology Offerings",
      sectionSubtitle:
        "Engineered infrastructure designed to eliminate operational bottlenecks.",
      items: [
        {
          number: "01",
          title: "Mind — CRM + AI Agent",
          description:
            "A CRM with a WhatsApp sales agent available 24/7, trained on your business knowledge to assist, quote, and close deals tirelessly.",
          href: "/mind",
          ctaLabel: "Explore Mind →",
          badge: "Flagship CRM + AI",
          isMind: true,
        },
        {
          number: "02",
          title: "Digital Tools & Applications",
          description:
            "Custom software: internal apps, management tools, custom CRMs, and ecosystem integrations that eliminate information silos.",
          href: "/aplicaciones-herramientas-digitales",
          ctaLabel: "View service →",
          badge: "Custom Software",
        },
        {
          number: "03",
          title: "Smart E-commerce",
          description:
            "Online stores powered by AI and automation that sell around the clock with less friction and automatically recovered carts.",
          href: "/ecommerce-inteligente",
          ctaLabel: "View service →",
          badge: "Autonomous Commerce",
        },
      ],
    },
    philosophyBlock: {
      title: "Before spending on lead acquisition, make sure you can serve every single lead",
      description:
        "A brilliant marketing campaign is wasted if 30% of your leads go cold because no one followed up in time. We engineer the engine first — CRM, automation, AI agents — so every dollar invested in marketing converts into captured revenue.",
      keyTakeaway: "A robust technical backbone compounds your marketing ROI.",
    },
    faq: {
      title: "Technology FAQ",
      subtitle: "Straightforward answers about our engineering process.",
      items: [
        {
          question: "Do I need to replace all my current tools?",
          answer:
            "No. Automation is designed to integrate with what you already use (WhatsApp, email, spreadsheets, existing CRMs) and to replace only what creates friction or duplicated work.",
        },
        {
          question: "Is this only for enterprise-scale businesses?",
          answer:
            "No. The custom modular design lets you start with a single priority process (for example, service and lead qualification via WhatsApp) and scale in controlled phases.",
        },
      ],
    },
    finalCta: {
      title: "Ready to streamline and automate your business operations?",
      description:
        "We analyze your current workflow at no cost and hand you a clear technical architecture recommendation.",
      ctaPrimary: {
        label: "Schedule Tech Diagnostic",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explore related ecosystem modules:",
      links: [
        { label: "Mind (CRM + AI)", href: "/mind" },
        { label: "Custom Applications", href: "/aplicaciones-herramientas-digitales" },
        { label: "Smart E-commerce", href: "/ecommerce-inteligente" },
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Contact Us", href: "/contacto" },
      ],
    },
  },

  ru: {
    seo: {
      title: "Автоматизация, ИИ-Агенты и Заказное ПО | MercadoCorp",
      description:
        "ИИ-агенты, автоматизация процессов, кастомные CRM и заказное ПО для компаний в Эквадоре. Узнайте, как устранить ручной труд из вашей работы.",
    },
    hero: {
      badge: "Столп 01 — Технологии и Автоматизация",
      h1: "Программное обеспечение, агенты и автоматизация для работы компании без трения",
      subheadline:
        "Мы не продаем шаблонные инструменты. Мы разрабатываем конкретную технологическую систему, которая нужна вашей компании, — и связываем ее с вашей реальной командой, а не с инструкцией пользователя.",
      ctaPrimary: {
        label: "Бесплатный Технологический Аудит",
        href: "/contacto",
      },
    },
    services: {
      sectionTitle: "Специализированные Технологические Направления",
      sectionSubtitle:
        "Инженерные решения для ликвидации узких мест и объединения рабочих процессов.",
      items: [
        {
          number: "01",
          title: "Mind — CRM + ИИ-Агент",
          description:
            "CRM с ИИ-агентом продаж в WhatsApp, доступным 24/7, обученным на знаниях вашего бизнеса, чтобы обслуживать, консультировать по ценам и закрывать сделки без устали.",
          href: "/mind",
          ctaLabel: "Узнать о Mind →",
          badge: "Флагман CRM + ИИ",
          isMind: true,
        },
        {
          number: "02",
          title: "Приложения и Цифровые Инструменты",
          description:
            "Заказное ПО: внутренние приложения, системы управления, кастомные CRM и экосистемные интеграции, устраняющие изоляцию данных.",
          href: "/aplicaciones-herramientas-digitales",
          ctaLabel: "Подробнее об услуге →",
          badge: "Заказное ПО",
        },
        {
          number: "03",
          title: "Умный E-commerce",
          description:
            "Интернет-магазины на базе ИИ и автоматизации, продающие круглосуточно с меньшим трением и автоматическим возвратом брошенных корзин.",
          href: "/ecommerce-inteligente",
          ctaLabel: "Подробнее об услуге →",
          badge: "Автономные Продажи",
        },
      ],
    },
    philosophyBlock: {
      title: "Прежде чем тратить на привлечение клиентов, убедитесь, что можете обслужить каждого",
      description:
        "Успешная реклама бесполезна, если 30% лидов теряются из-за несвоевременного ответа. Сначала мы настраиваем двигатель — CRM, автоматизацию, ИИ-агентов — чтобы каждый доллар, вложенный позже в маркетинг, работал на реальную систему, которая его капитализирует.",
      keyTakeaway: "Эффективная система многократно увеличивает отдачу от каждого поступающего лида.",
    },
    faq: {
      title: "Частые Вопросы по Технологиям",
      subtitle: "Прямые ответы о том, как строится инженерная разработка.",
      items: [
        {
          question: "Нужно ли полностью менять текущие программы?",
          answer:
            "Нет. Автоматизация проектируется так, чтобы встраиваться в уже используемые вами сервисы (WhatsApp, почта, таблицы, существующие CRM), заменяя лишь то, что создает трение или дублирует работу.",
        },
        {
          question: "Это подходит только крупным корпорациям?",
          answer:
            "Нет. Индивидуальный модульный дизайн позволяет начать с одного приоритетного процесса (например, обслуживания и квалификации лидов в WhatsApp) и масштабироваться контролируемыми этапами.",
        },
      ],
    },
    finalCta: {
      title: "Готовы навести порядок и автоматизировать процессы?",
      description:
        "Мы бесплатно проанализируем ваш текущий рабочий процесс и предоставим четкую рекомендацию по технической архитектуре.",
      ctaPrimary: {
        label: "Записаться на Технический Аудит",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Другие разделы экосистемы:",
      links: [
        { label: "Mind (CRM + ИИ)", href: "/mind" },
        { label: "Заказное ПО и Приложения", href: "/aplicaciones-herramientas-digitales" },
        { label: "Умный E-commerce", href: "/ecommerce-inteligente" },
        { label: "Кейсы Компании", href: "/casos-de-exito" },
        { label: "Контакты", href: "/contacto" },
      ],
    },
  },
};

export function getTecnologiaContent(locale: Locale): TecnologiaContent {
  return contentData[locale] || contentData.es;
}
