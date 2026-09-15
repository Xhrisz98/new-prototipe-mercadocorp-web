// content/mind.ts
// Copy oficial de Mind extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface MindPageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    subheadline: string;
    ctaPrimary: { label: string; href: string; external: boolean };
    ctaSecondary: { label: string; href: string; external: boolean };
  };
  about: {
    title: string;
    description: string;
    modulesTitle: string;
    modules: {
      name: string;
      description: string;
    }[];
  };
  domainReason: {
    title: string;
    description: string;
    ctaPrimary: { label: string; href: string; external: boolean };
    ctaSecondary: { label: string; href: string };
  };
  internalLinks: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const contentData: Record<Locale, MindPageContent> = {
  es: {
    seo: {
      title: "Mind | Agente de IA y CRM para Ventas por WhatsApp — MercadoCorp",
      description:
        "Conozca Mind, el CRM con agente de IA de MercadoCorp: atiende, asesora y cierra ventas por WhatsApp 24/7. Descubra el producto completo en mind.ec.",
    },
    hero: {
      badge: "Producto Exclusivo MercadoCorp · Mind CRM + Agente de IA",
      h1: "Mind: su mejor vendedor nunca duerme",
      subheadline:
        "Mind no es un chatbot. Es un CRM completo con un agente de ventas por IA que atiende, asesora y cierra ventas por WhatsApp — entrenado con la voz y el conocimiento de su negocio, disponible 24/7.",
      ctaPrimary: {
        label: "Ver Mind en mind.ec →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Cotizar por WhatsApp →",
        href: "https://wa.me/593983315439?text=Hola,%20deseo%20información%20sobre%20Mind",
        external: true,
      },
    },
    about: {
      title: "Automatización Comercial Inteligente sin Descanso",
      description:
        "Mind centraliza cada conversación, lead y cliente en un solo lugar: todo su embudo comercial, automatizado. El agente de IA responde preguntas, asesora sobre productos o servicios y puede cerrar la venta sin que un humano tenga que intervenir en cada mensaje.",
      modulesTitle: "Módulos Integrados en la Plataforma",
      modules: [
        {
          name: "Gestión de proyectos",
          description: "Seguimiento centralizado de entregables, hitos y flujos comerciales en un solo panel.",
        },
        {
          name: "Sistema de reservas",
          description: "Agendamiento automático de citas y demostraciones sincronizado en tiempo real.",
        },
        {
          name: "Campañas de email con editor visual",
          description: "Diseño y secuenciación de correos automatizados con analítica de apertura y clics.",
        },
        {
          name: "Plantillas de mensajes de WhatsApp",
          description: "Comunicaciones masivas personalizadas y aprobadas por Meta para máxima conversión.",
        },
      ],
    },
    domainReason: {
      title: "¿Por qué Mind vive en su propio dominio?",
      description:
        "Mind es un producto independiente, con desarrollo y actualizaciones propias — por eso el detalle completo, demos y documentación viven en mind.ec. Aquí solo lo presentamos como parte del ecosistema de servicios de MercadoCorp.",
      ctaPrimary: {
        label: "Conocer Mind a fondo →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Prefiero que me llamen →",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explorar Ecosistema Relacionado",
      links: [
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
        { label: "E-commerce Inteligente (Mind integrado)", href: "/ecommerce-inteligente" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
  },
  en: {
    seo: {
      title: "Mind | AI Sales Agent & CRM for WhatsApp — MercadoCorp",
      description:
        "Meet Mind, MercadoCorp's flagship AI CRM: advises, qualifies, and closes sales on WhatsApp 24/7. Discover the complete product at mind.ec.",
    },
    hero: {
      badge: "MercadoCorp Proprietary Product · Mind CRM + AI Agent",
      h1: "Mind: your top-performing salesperson never sleeps",
      subheadline:
        "Mind is not a basic chatbot. It is a full-featured CRM with an autonomous AI sales agent that advises and closes deals on WhatsApp 24/7 — trained on your company's proprietary knowledge base.",
      ctaPrimary: {
        label: "Explore Mind at mind.ec →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Chat via WhatsApp →",
        href: "https://wa.me/593983315439?text=Hello,%20I%20would%20like%20information%20about%20Mind",
        external: true,
      },
    },
    about: {
      title: "Autonomous Sales Automation Without Operational Friction",
      description:
        "Mind unifies every conversation, lead, and client into a single CRM view: your entire commercial funnel, automated. The AI agent resolves complex inquiries, recommends products, and executes sales without manual intervention.",
      modulesTitle: "Integrated Platform Capabilities",
      modules: [
        {
          name: "Project Management",
          description: "Centralized execution tracking, milestones, and client handoffs directly in the CRM.",
        },
        {
          name: "Smart Booking Engine",
          description: "Autonomous scheduling of discovery calls and product demos with calendar sync.",
        },
        {
          name: "Visual Email Campaigns",
          description: "Drag-and-drop email sequencing with comprehensive open, click, and conversion telemetry.",
        },
        {
          name: "WhatsApp Meta-Approved Templates",
          description: "Personalized bulk messaging workflows compliant with Meta guidelines.",
        },
      ],
    },
    domainReason: {
      title: "Why does Mind live on its own domain?",
      description:
        "Mind is a standalone SaaS product with dedicated engineering sprints and continuous updates — which is why full documentation, interactive demos, and live onboarding live at mind.ec. We showcase it here as the technological cornerstone of the MercadoCorp ecosystem.",
      ctaPrimary: {
        label: "Deep Dive into Mind →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Request a Callback →",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explore Related Solutions",
      links: [
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
        { label: "Intelligent E-commerce (Mind Integrated)", href: "/ecommerce-inteligente" },
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Contact", href: "/contacto" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Mind | ИИ-агент продаж и CRM для WhatsApp — MercadoCorp",
      description:
        "Познакомьтесь с Mind: CRM со встроенным агентом ИИ для продаж в WhatsApp 24/7. Полная информация о продукте на mind.ec.",
    },
    hero: {
      badge: "Продукт MercadoCorp · CRM Mind + ИИ-агент",
      h1: "Mind: ваш лучший продавец никогда не спит",
      subheadline:
        "Mind — это не простой чат-бот. Это полноценная CRM со встроенным агентом продаж на базе ИИ, который консультирует и закрывает сделки в WhatsApp 24/7, обученный на знаниях вашего бизнеса.",
      ctaPrimary: {
        label: "Открыть Mind на mind.ec →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Консультация в WhatsApp →",
        href: "https://wa.me/593983315439?text=Здравствуйте,%20интересует%20Mind",
        external: true,
      },
    },
    about: {
      title: "Автономная автоматизация коммерческого цикла",
      description:
        "Mind объединяет все диалоги, лиды и клиентов в единой системе: воронка продаж работает автоматически. ИИ-агент отвечает на сложные вопросы, рекомендует товары и доводит до оплаты без необходимости постоянного ручного вмешательства менеджеров.",
      modulesTitle: "Встроенные модули платформы",
      modules: [
        {
          name: "Управление проектами",
          description: "Контроль этапов, задач и статусов клиентов в едином пространстве.",
        },
        {
          name: "Система онлайн-бронирования",
          description: "Автоматическая запись на демонстрации и встречи с синхронизацией календарей.",
        },
        {
          name: "Email-рассылки с визуальным редактором",
          description: "Создание цепочек писем с отслеживанием открытий и переходов.",
        },
        {
          name: "Шаблоны сообщений WhatsApp",
          description: "Персонализированные рассылки, одобренные Meta, для максимальной конверсии.",
        },
      ],
    },
    domainReason: {
      title: "Почему Mind живет на отдельном домене?",
      description:
        "Mind — это независимый программный продукт с собственной разработкой и регулярными релизами. Именно поэтому подробная документация, демо и тарифы доступны на mind.ec. Здесь мы представляем его как ключевой элемент экосистемы MercadoCorp.",
      ctaPrimary: {
        label: "Узнать все о Mind →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Заказать звонок →",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Связанные направления",
      links: [
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Умный E-commerce (со встроенным Mind)", href: "/ecommerce-inteligente" },
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Контакты", href: "/contacto" },
      ],
    },
  },
};

export function getMindContent(locale: Locale): MindPageContent {
  return contentData[locale] || contentData.es;
}
