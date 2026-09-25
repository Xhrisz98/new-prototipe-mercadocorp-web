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
