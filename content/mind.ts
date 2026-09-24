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
  closingCta: {
    title: string;
    description: string;
    ctaPrimary: { label: string; href: string; external: boolean };
    ctaSecondary: { label: string; href: string; external: boolean };
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
    closingCta: {
      title: "¿Listo para que Mind atienda su primera conversación?",
      description: "Vea el producto completo, sus módulos y planes en su propio dominio.",
      ctaPrimary: {
        label: "Ver Mind en mind.ec",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Cotizar por WhatsApp",
        href: "https://wa.me/593983315439?text=Hola,%20deseo%20información%20sobre%20Mind",
        external: true,
      },
    },
    internalLinks: {
      title: "Antes de enviar, explore nuestro ecosistema",
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
        "Meet Mind, MercadoCorp's AI-agent CRM: attends to, advises, and closes sales on WhatsApp 24/7. Discover the complete product at mind.ec.",
    },
    hero: {
      badge: "MercadoCorp Exclusive Product · Mind CRM + AI Agent",
      h1: "Mind: your best salesperson never sleeps",
      subheadline:
        "Mind is not a chatbot. It is a complete CRM with an AI sales agent that attends to, advises, and closes sales on WhatsApp — trained on the voice and knowledge of your business, available 24/7.",
      ctaPrimary: {
        label: "Explore Mind at mind.ec →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Get a Quote via WhatsApp →",
        href: "https://wa.me/593983315439?text=Hello,%20I%20would%20like%20information%20about%20Mind",
        external: true,
      },
    },
    about: {
      title: "Tireless Intelligent Commercial Automation",
      description:
        "Mind centralizes every conversation, lead, and client in one place: your entire sales funnel, automated. The AI agent answers questions, advises on products or services, and can close the sale without a human having to intervene in every message.",
      modulesTitle: "Modules Integrated in the Platform",
      modules: [
        {
          name: "Project Management",
          description: "Centralized tracking of deliverables, milestones, and sales flows in a single dashboard.",
        },
        {
          name: "Booking System",
          description: "Automatic scheduling of appointments and demos, synced in real time.",
        },
        {
          name: "Email Campaigns with Visual Editor",
          description: "Design and sequencing of automated emails with open and click analytics.",
        },
        {
          name: "WhatsApp Message Templates",
          description: "Personalized bulk communications approved by Meta for maximum conversion.",
        },
      ],
    },
    domainReason: {
      title: "Why does Mind live on its own domain?",
      description:
        "Mind is a standalone product with its own development and updates — that's why the full details, demos, and documentation live at mind.ec. Here we simply present it as part of the MercadoCorp services ecosystem.",
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
    closingCta: {
      title: "Ready for Mind to handle its first conversation?",
      description: "See the complete product, its modules, and plans on its own domain.",
      ctaPrimary: {
        label: "See Mind at mind.ec",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Get a Quote via WhatsApp",
        href: "https://wa.me/593983315439?text=Hello,%20I%20would%20like%20information%20about%20Mind",
        external: true,
      },
    },
    internalLinks: {
      title: "Before you submit, explore our ecosystem",
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
        "Познакомьтесь с Mind — CRM с ИИ-агентом от MercadoCorp: обслуживает, консультирует и закрывает продажи в WhatsApp 24/7. Полная информация о продукте на mind.ec.",
    },
    hero: {
      badge: "Эксклюзивный Продукт MercadoCorp · CRM Mind + ИИ-агент",
      h1: "Mind: ваш лучший продавец никогда не спит",
      subheadline:
        "Mind — это не чат-бот. Это полноценная CRM с агентом продаж на базе ИИ, который обслуживает, консультирует и закрывает продажи в WhatsApp — обученный на голосе и знаниях вашего бизнеса, доступный 24/7.",
      ctaPrimary: {
        label: "Открыть Mind на mind.ec →",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Запросить расценки в WhatsApp →",
        href: "https://wa.me/593983315439?text=Здравствуйте,%20интересует%20Mind",
        external: true,
      },
    },
    about: {
      title: "Умная коммерческая автоматизация без устали",
      description:
        "Mind объединяет каждый диалог, лид и клиента в одном месте: вся ваша воронка продаж, автоматизированная. ИИ-агент отвечает на вопросы, консультирует по продуктам или услугам и может закрыть продажу без необходимости вмешательства человека в каждое сообщение.",
      modulesTitle: "Встроенные модули платформы",
      modules: [
        {
          name: "Управление проектами",
          description: "Централизованный контроль результатов, этапов и коммерческих процессов в единой панели.",
        },
        {
          name: "Система бронирования",
          description: "Автоматическая запись на встречи и демонстрации с синхронизацией в реальном времени.",
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
        "Mind — это независимый продукт с собственной разработкой и обновлениями — поэтому полная информация, демо и документация находятся на mind.ec. Здесь мы лишь представляем его как часть экосистемы услуг MercadoCorp.",
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
    closingCta: {
      title: "Готовы, чтобы Mind обработал свой первый диалог?",
      description: "Посмотрите продукт целиком, его модули и тарифы на собственном домене.",
      ctaPrimary: {
        label: "Открыть Mind на mind.ec",
        href: "https://mind.ec",
        external: true,
      },
      ctaSecondary: {
        label: "Запросить расценки в WhatsApp",
        href: "https://wa.me/593983315439?text=Здравствуйте,%20интересует%20Mind",
        external: true,
      },
    },
    internalLinks: {
      title: "Прежде чем отправить, изучите нашу экосистему",
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
