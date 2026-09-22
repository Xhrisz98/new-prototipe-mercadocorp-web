// content/nosotros.ts
// Copy oficial de Nosotros extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface NosotrosPageContent {
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
  history: {
    title: string;
    body: string;
  };
  dualSpecialization: {
    title: string;
    subtitle: string;
    pillars: {
      name: string;
      description: string;
      href: string;
    }[];
  };
  philosophy: {
    title: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  trajectory: {
    title: string;
    statusBadge: string;
    note: string;
  };
  finalCta: {
    title: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  internalLinks: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const contentData: Record<Locale, NosotrosPageContent> = {
  es: {
    seo: {
      title: "Sobre MercadoCorp | Consultora Tecnológica B2B en Ecuador",
      description:
        "Conozca la historia, filosofía y trayectoria de MercadoCorp: de agencia de marketing a consultora tecnológica especializada en automatización e IA para empresas.",
    },
    hero: {
      badge: "Nuestra Identidad y Visión B2B",
      h1: "No creemos en soluciones mágicas. Creemos en construir, paso a paso.",
      subheadline:
        "Nacimos para integrar, innovar y escalar junto a empresas que están dispuestas a construir un sistema real, no una campaña puntual.",
      ctaPrimary: {
        label: "Conocer nuestro trabajo →",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Hablemos de su empresa",
        href: "/contacto",
      },
    },
    history: {
      title: "De Agencia Digital a Consultora Tecnológica B2B",
      body: "De agencia enfocada en marketing digital, evolucionamos hacia una consultora tecnológica: hoy estructuramos la tecnología y la automatización como el eje real del crecimiento de nuestros clientes, con el marketing digital como el complemento que amplifica ese sistema una vez que ya funciona.",
    },
    dualSpecialization: {
      title: "Especialización Dual",
      subtitle: "Un enfoque balanceado para resolver tanto la infraestructura operativa como la percepción de marca.",
      pillars: [
        {
          name: "Tecnología & Automatización",
          description: "Automatización de procesos, agentes de IA, CRMs personalizados y software a medida para escalar sin fricción.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Marketing Digital",
          description: "Contenido estratégico, branding ejecutivo y gestión de eventos cuando la base operativa ya está resuelta.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Nuestra Filosofía de Trabajo",
      values: [
        {
          title: "Estrategia Integral",
          description: "No implementamos herramientas aisladas; concebimos la empresa como un sistema vivo interconectado.",
        },
        {
          title: "Innovación Constante",
          description: "Exploramos, probamos y adaptamos tecnologías emergentes y agentes de IA antes de recomendarlos a clientes.",
        },
        {
          title: "Sinergia y Colaboración",
          description: "Trabajamos integrados a los equipos de nuestros clientes para transferir conocimiento y capacidades reales.",
        },
      ],
    },
    trajectory: {
      title: "Trayectoria y Cronología de Hitos",
      statusBadge: "Próximamente",
      note: "Estamos consolidando la documentación detallada y la línea de tiempo oficial de hitos de la compañía para publicarla aquí.",
    },
    finalCta: {
      title: "¿Listo para construir un sistema real para su negocio?",
      description:
        "Conversemos sobre su operación actual y cómo la automatización e inteligencia artificial pueden acelerar su crecimiento.",
      ctaPrimary: {
        label: "Solicitar Diagnóstico",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver Casos de Éxito",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Explorar Más sobre MercadoCorp",
      links: [
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
        { label: "Contacto Directo", href: "/contacto" },
        { label: "Marketing Digital", href: "/marketing-digital" },
      ],
    },
  },
  en: {
    seo: {
      title: "About MercadoCorp | B2B Technology Consultancy in Ecuador",
      description:
        "Learn about MercadoCorp's history, philosophy, and trajectory: from a marketing agency to a technology consultancy specialized in automation and AI for businesses.",
    },
    hero: {
      badge: "Our Identity and B2B Vision",
      h1: "We don't believe in magic solutions. We believe in building, step by step.",
      subheadline:
        "We were born to integrate, innovate, and scale alongside companies willing to build a real system, not a one-off campaign.",
      ctaPrimary: {
        label: "Get to know our work →",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Let's talk about your company",
        href: "/contacto",
      },
    },
    history: {
      title: "From Digital Agency to B2B Technology Consultancy",
      body: "From an agency focused on digital marketing, we evolved into a technology consultancy: today we structure technology and automation as the true driver of our clients' growth, with digital marketing as the complement that amplifies that system once it's already working.",
    },
    dualSpecialization: {
      title: "Dual Specialization",
      subtitle: "A balanced approach to address both operational infrastructure and brand perception.",
      pillars: [
        {
          name: "Technology & Automation",
          description: "Process automation, AI agents, custom CRMs, and tailored software to scale without friction.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Digital Marketing",
          description: "Strategic content, executive branding, and event management once the operational foundation is already solved.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Our Work Philosophy",
      values: [
        {
          title: "Comprehensive Strategy",
          description: "We don't implement isolated tools; we conceive the company as a living, interconnected system.",
        },
        {
          title: "Constant Innovation",
          description: "We explore, test, and adapt emerging technologies and AI agents before recommending them to clients.",
        },
        {
          title: "Synergy and Collaboration",
          description: "We work integrated with our clients' teams to transfer real knowledge and capabilities.",
        },
      ],
    },
    trajectory: {
      title: "Trajectory and Timeline of Milestones",
      statusBadge: "Coming Soon",
      note: "We are consolidating the detailed documentation and official timeline of the company's milestones to publish here.",
    },
    finalCta: {
      title: "Ready to build a real system for your business?",
      description:
        "Let's talk about your current operation and how automation and artificial intelligence can accelerate your growth.",
      ctaPrimary: {
        label: "Request Diagnostic",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "See Case Studies",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Explore More About MercadoCorp",
      links: [
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
        { label: "Direct Contact", href: "/contacto" },
        { label: "Digital Marketing", href: "/marketing-digital" },
      ],
    },
  },
  ru: {
    seo: {
      title: "О MercadoCorp | B2B консалтинг в сфере технологий в Эквадоре",
      description:
        "Узнайте историю, философию и путь развития MercadoCorp: от маркетингового агентства до технологической консалтинговой компании, специализирующейся на автоматизации и ИИ для бизнеса.",
    },
    hero: {
      badge: "Наша идентичность и B2B видение",
      h1: "Мы не верим в волшебные решения. Мы верим в постепенное построение, шаг за шагом.",
      subheadline:
        "Мы созданы для того, чтобы интегрировать, внедрять инновации и расти вместе с компаниями, готовыми строить настоящую систему, а не разовую кампанию.",
      ctaPrimary: {
        label: "Узнать о нашей работе →",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Поговорим о вашей компании",
        href: "/contacto",
      },
    },
    history: {
      title: "От диджитал-агентства к B2B технологическому консалтингу",
      body: "Начав как агентство цифрового маркетинга, мы превратились в технологическую консалтинговую компанию: сегодня мы выстраиваем технологии и автоматизацию как настоящую основу роста наших клиентов, а цифровой маркетинг служит дополнением, которое усиливает эту систему, когда она уже работает.",
    },
    dualSpecialization: {
      title: "Двойная специализация",
      subtitle: "Сбалансированный подход к решению как операционной инфраструктуры, так и восприятия бренда.",
      pillars: [
        {
          name: "Технологии и Автоматизация",
          description: "Автоматизация процессов, ИИ-агенты, индивидуальные CRM и программное обеспечение на заказ для масштабирования без трения.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Цифровой Маркетинг",
          description: "Стратегический контент, брендинг руководителей и организация мероприятий, когда операционная база уже решена.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Наша рабочая философия",
      values: [
        {
          title: "Комплексная стратегия",
          description: "Мы не внедряем изолированные инструменты; мы воспринимаем компанию как единую взаимосвязанную живую систему.",
        },
        {
          title: "Постоянные инновации",
          description: "Мы изучаем, тестируем и адаптируем новые технологии и ИИ-агентов, прежде чем рекомендовать их клиентам.",
        },
        {
          title: "Синергия и сотрудничество",
          description: "Мы работаем в тесной интеграции с командами наших клиентов, чтобы передавать реальные знания и навыки.",
        },
      ],
    },
    trajectory: {
      title: "Путь развития и хронология этапов",
      statusBadge: "Скоро",
      note: "Мы завершаем подготовку подробной документации и официальной хронологии ключевых этапов компании для публикации здесь.",
    },
    finalCta: {
      title: "Готовы построить настоящую систему для вашего бизнеса?",
      description:
        "Давайте обсудим вашу текущую деятельность и то, как автоматизация и искусственный интеллект могут ускорить ваш рост.",
      ctaPrimary: {
        label: "Запросить диагностику",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Смотреть кейсы",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Узнать больше о MercadoCorp",
      links: [
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Прямой контакт", href: "/contacto" },
        { label: "Цифровой маркетинг", href: "/marketing-digital" },
      ],
    },
  },
};

export function getNosotrosContent(locale: Locale): NosotrosPageContent {
  return contentData[locale] || contentData.es;
}
