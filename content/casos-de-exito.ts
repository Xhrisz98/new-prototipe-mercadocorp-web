// content/casos-de-exito.ts
// Copy oficial de Casos de Éxito extraído de copywriting-nueva-web-mercadocorp.md
// Regla: No inventar clientes ni cifras ficticias (estructura tipada lista para clientes confirmados)
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface CaseStudyItem {
  id: string;
  clientName: string;
  clientIndustry: string;
  pillar: "Tecnología & Automatización" | "Marketing Digital" | "E-commerce & IA";
  problemContext: string;
  solutionBuilt: string;
  testimonialLink?: string;
  isConfirmed: boolean;
}

// Proyectos reales, anonimizados por sector (mismo contenido que
// content/home.ts → caseStudiesPreview — ver guia-nueva-web-mercadocorp.md): no
// llevan nombre de cliente ni logo, por eso no pasan por el esquema estricto de
// `CaseStudyItem` (que sí exige clientName/isConfirmed para un caso con nombre
// confirmado). Se muestran aquí también, no solo en Inicio.
export interface RealProjectItem {
  client: string;
  pillar: string;
  problem: string;
  solution: string;
}

export interface BrandLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface CasosDeExitoContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    subheadline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  realProjects: {
    title: string;
    subtitle: string;
    challengeLabel: string;
    solutionLabel: string;
    items: RealProjectItem[];
  };
  brandsStrip: {
    title: string;
    logos: BrandLogo[];
  };
  notice: {
    title: string;
    body: string;
  };
  cases: CaseStudyItem[];
  emptyState: {
    title: string;
    body: string;
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

// Logos reales de marcas con las que ya trabajamos (provistos por el cliente,
// mismos archivos que en mercadocorp.ec) — mismos para los 3 idiomas, un logo no
// se traduce. Dimensiones reales del archivo (sharp image.metadata()).
const BRAND_LOGOS: BrandLogo[] = [
  { name: "SEB — Specialist Energy Business", src: "/images/clientes/seb.png", width: 451, height: 170 },
  { name: "AEN — Asociación de Empresarios y Empresas del Norte de Quito", src: "/images/clientes/aen.png", width: 417, height: 70 },
  { name: "Bullpadel", src: "/images/clientes/bullpadel.png", width: 500, height: 100 },
  { name: "Produtecnia", src: "/images/clientes/produtecnia.png", width: 337, height: 326 },
  { name: "Rackers", src: "/images/clientes/rackers.png", width: 225, height: 217 },
];

const contentData: Record<Locale, CasosDeExitoContent> = {
  es: {
    seo: {
      title: "Casos de Éxito: Automatización y Tecnología para Empresas | MercadoCorp",
      description:
        "Conozca cómo ayudamos a empresas reales a automatizar procesos, implementar agentes de IA y construir software a medida.",
    },
    hero: {
      badge: "Resultados Reales B2B",
      h1: "El impacto de un sistema bien construido",
      subheadline:
        "Resultados reales de empresas que decidieron dejar de operar con parches y construir un sistema que trabaja para ellas.",
      ctaPrimary: {
        label: "Quiero ser el próximo caso",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver Tecnología & Automatización",
        href: "/tecnologia-automatizacion",
      },
    },
    realProjects: {
      title: "Sistemas a la medida, en proyectos reales",
      subtitle:
        "Cada proyecto se construye sobre la operación de la empresa, sin plantillas. Los presentamos por sector.",
      challengeLabel: "Desafío:",
      solutionLabel: "Solución Implementada:",
      items: [
        {
          client: "Sector Deportes y Distribución",
          pillar: "Tecnología & Automatización",
          problem:
            "Un catálogo amplio, con variantes de talla y color, stock cambiante y más de un canal de venta que atender al mismo tiempo.",
          solution:
            "Backend propio con base de datos y una automatización que publica el catálogo del ERP en el marketplace, evita duplicados, cruza el stock real de cada variante y da de baja lo descontinuado.",
        },
        {
          client: "Sector Bienestar y Clases",
          pillar: "Mind: CRM + Agente de IA",
          problem:
            "Responder a tiempo las consultas por WhatsApp y coordinar reservas y clientes sin depender de tareas manuales.",
          solution:
            "Mind a la medida: un CRM propio con agente de IA en WhatsApp, módulo de reservas y la identidad de la marca del cliente, sobre una base de datos aislada.",
        },
        {
          client: "Sector Comercio y Retail",
          pillar: "Marketing Digital",
          problem:
            "Sostener la captación de clientes mes a mes, sin depender de campañas puntuales.",
          solution:
            "Gestión mensual continua de campañas en Meta Ads y Google Ads, con mantenimiento permanente.",
        },
      ],
    },
    brandsStrip: {
      title: "Empresas que impulsamos",
      logos: BRAND_LOGOS,
    },
    notice: {
      title: "Casos de Éxito en Construcción",
      body: "Estamos confirmando con nuestros clientes qué proyectos pueden publicarse con nombre, logo y detalle verificado. Esta sección se completará únicamente con casos reales y aprobados — no publicamos cifras ni clientes sin confirmar.",
    },
    // No inventar clientes ni cifras (PROJECT_PLAN.md §5 y AGENTS.md).
    // Completar únicamente con casos reales confirmados por el cliente.
    cases: [],
    emptyState: {
      title: "Nuestros primeros casos están en camino",
      body: "Estamos documentando nuestros primeros casos verificados. Vuelve pronto.",
    },
    finalCta: {
      title: "¿Listo para ser nuestro próximo caso de éxito?",
      description:
        "Agende su diagnóstico inicial sin costo y descubra cómo una arquitectura tecnológica a medida transformará la rentabilidad de su empresa.",
      ctaPrimary: {
        label: "Solicitar Diagnóstico para Mi Empresa",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Antes de enviar, explore nuestro ecosistema",
      links: [
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
        { label: "Marketing Digital", href: "/marketing-digital" },
        { label: "Mind: CRM + Agente de IA", href: "/mind" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
  },
  en: {
    seo: {
      title: "Case Studies: Enterprise Automation and Custom Tech | MercadoCorp",
      description:
        "Discover how we help real companies automate workflows, deploy conversational AI agents, and build resilient custom software.",
    },
    hero: {
      badge: "Verified B2B Case Studies",
      h1: "The concrete impact of a well-engineered system",
      subheadline:
        "Measurable outcomes from companies that chose to stop relying on manual patches and engineered a system that works for them around the clock.",
      ctaPrimary: {
        label: "Become the next success story",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Explore Technology & Automation",
        href: "/tecnologia-automatizacion",
      },
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    realProjects: {
      title: "Custom-built systems, in real projects",
      subtitle:
        "Each project is built around the company's real operation, with no templates. We present them by sector.",
      challengeLabel: "Challenge:",
      solutionLabel: "Solution Implemented:",
      items: [
        {
          client: "Sports & Distribution Sector",
          pillar: "Technology & Automation",
          problem:
            "A wide catalog with size and color variants, shifting stock, and more than one sales channel to manage at the same time.",
          solution:
            "A proprietary backend with its own database and an automation that publishes the ERP catalog to the marketplace, prevents duplicates, cross-checks real stock per variant, and discontinues what's no longer sold.",
        },
        {
          client: "Wellness & Classes Sector",
          pillar: "Mind: CRM + AI Agent",
          problem:
            "Responding to WhatsApp inquiries on time and coordinating bookings and clients without relying on manual tasks.",
          solution:
            "A tailored Mind: a dedicated CRM with an AI agent on WhatsApp, a booking module, and the client's own brand identity, on an isolated database.",
        },
        {
          client: "Retail & Commerce Sector",
          pillar: "Digital Marketing",
          problem:
            "Sustaining customer acquisition month after month, without relying on one-off campaigns.",
          solution:
            "Ongoing monthly management of Meta Ads and Google Ads campaigns, with continuous maintenance.",
        },
      ],
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    brandsStrip: {
      title: "Companies we power",
      logos: BRAND_LOGOS,
    },
    notice: {
      title: "Case Studies in Progress",
      body: "We are confirming with our clients which projects can be published with name, logo, and verified detail. This section will only be completed with real, approved case studies — we do not publish unconfirmed clients or figures.",
    },
    // Do not invent clients or figures (PROJECT_PLAN.md §5 and AGENTS.md).
    // Populate only with real, client-confirmed case studies.
    cases: [],
    emptyState: {
      title: "Our first case studies are on the way",
      body: "We're documenting our first verified case studies. Check back soon.",
    },
    finalCta: {
      title: "Ready to become our next success story?",
      description:
        "Schedule your complimentary initial diagnostic to map out the exact custom technical roadmap for your business.",
      ctaPrimary: {
        label: "Schedule Free Diagnostic",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Before you submit, explore our ecosystem",
      links: [
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
        { label: "Digital Marketing", href: "/marketing-digital" },
        { label: "Mind: CRM + AI Agent", href: "/mind" },
        { label: "Contact", href: "/contacto" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Кейсы и результаты: Автоматизация бизнеса и ПО | MercadoCorp",
      description:
        "Узнайте, как мы помогаем компаниям автоматизировать бизнес-процессы, внедрять агентов ИИ и разрабатывать программное обеспечение на заказ.",
    },
    hero: {
      badge: "Реальные Результаты B2B",
      h1: "Результат грамотно спроектированной системы",
      subheadline:
        "Практические результаты компаний, которые отказались от временных решений и построили систему, работающую на них каждый день.",
      ctaPrimary: {
        label: "Стать следующим кейсом",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Технологии и Автоматизация",
        href: "/tecnologia-automatizacion",
      },
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    realProjects: {
      title: "Индивидуальные системы в реальных проектах",
      subtitle:
        "Каждый проект строится вокруг реальной работы компании, без шаблонов. Представляем их по отраслям.",
      challengeLabel: "Задача:",
      solutionLabel: "Реализованное решение:",
      items: [
        {
          client: "Спортивная Розница и Дистрибуция",
          pillar: "Технологии и Автоматизация",
          problem:
            "Широкий каталог с вариантами размера и цвета, меняющиеся остатки и несколько каналов продаж одновременно.",
          solution:
            "Собственный backend с базой данных и автоматизация, которая публикует каталог из ERP на маркетплейсе, исключает дубли, сверяет реальные остатки по каждому варианту и снимает с публикации то, что уже не продаётся.",
        },
        {
          client: "Сектор Оздоровления и Занятий",
          pillar: "Mind: CRM + ИИ-агент",
          problem:
            "Вовремя отвечать на обращения в WhatsApp и координировать бронирования и клиентов без ручных задач.",
          solution:
            "Mind под конкретный бизнес: собственная CRM с ИИ-агентом в WhatsApp, модуль бронирования и фирменный стиль клиента, на изолированной базе данных.",
        },
        {
          client: "Сектор Розничной Торговли",
          pillar: "Цифровой Маркетинг",
          problem:
            "Поддерживать привлечение клиентов месяц за месяцем, не полагаясь на разовые кампании.",
          solution:
            "Постоянное ежемесячное ведение кампаний в Meta Ads и Google Ads с непрерывным сопровождением.",
        },
      ],
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    brandsStrip: {
      title: "Компании, которым мы помогаем расти",
      logos: BRAND_LOGOS,
    },
    notice: {
      title: "Кейсы в процессе подтверждения",
      body: "Мы согласовываем с клиентами, какие проекты можно опубликовать с названием, логотипом и проверенными деталями. Этот раздел будет дополнен только реальными, подтвержденными кейсами — без неподтвержденных клиентов или показателей.",
    },
    // Не придумывать клиентов или цифры (PROJECT_PLAN.md §5 и AGENTS.md).
    // Заполнять только реальными кейсами, подтвержденными клиентом.
    cases: [],
    emptyState: {
      title: "Наши первые кейсы уже готовятся",
      body: "Мы документируем наши первые подтвержденные кейсы. Загляните позже.",
    },
    finalCta: {
      title: "Готовы стать нашим следующим успешным кейсом?",
      description:
        "Запишитесь на бесплатную первичную диагностику и узнайте, как индивидуальные технологии помогут масштабировать ваш бизнес.",
      ctaPrimary: {
        label: "Запросить диагностику",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Прежде чем отправить, изучите нашу экосистему",
      links: [
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Маркетинг", href: "/marketing-digital" },
        { label: "Mind: CRM + ИИ-агент", href: "/mind" },
        { label: "Контакты", href: "/contacto" },
      ],
    },
  },
};

export function getCasosDeExitoContent(locale: Locale): CasosDeExitoContent {
  return contentData[locale] || contentData.es;
}
