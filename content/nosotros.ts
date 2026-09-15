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
        "Discover MercadoCorp's story, philosophy, and evolution: from digital marketing agency to a technology consultancy specializing in enterprise automation and AI.",
    },
    hero: {
      badge: "Our Identity & Enterprise Vision",
      h1: "We do not believe in magic solutions. We believe in building, step by step.",
      subheadline:
        "We exist to integrate, innovate, and scale alongside companies committed to engineering resilient operational systems rather than chasing short-lived campaigns.",
      ctaPrimary: {
        label: "Explore our work →",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Talk to our team",
        href: "/contacto",
      },
    },
    history: {
      title: "From Digital Agency to B2B Technology Consultancy",
      body: "Originally founded as a digital marketing agency, we evolved into a full-scope technology consultancy: today we engineer automation and custom software as the true engine of client scale, with digital marketing serving as the amplifier once operational efficiency is locked in.",
    },
    dualSpecialization: {
      title: "Dual Specialization",
      subtitle: "A balanced enterprise approach addressing operational systems and market positioning simultaneously.",
      pillars: [
        {
          name: "Technology & Automation",
          description: "Workflow automation, autonomous AI agents, tailored CRMs, and bespoke software built for friction-free scale.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Digital Marketing",
          description: "Strategic content, executive branding, and corporate events when the operational foundation is solid.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Our Guiding Principles",
      values: [
        {
          title: "Comprehensive Strategy",
          description: "We never deploy disconnected point tools; we architect the business as an interconnected operational system.",
        },
        {
          title: "Continuous Innovation",
          description: "We stress-test emerging AI and automation architectures rigorously in-house before recommending them to clients.",
        },
        {
          title: "Collaborative Synergy",
          description: "We work side-by-side with our clients' internal teams to build enduring in-house capability and autonomy.",
        },
      ],
    },
    trajectory: {
      title: "Company Milestones & Trajectory",
      statusBadge: "Coming Soon",
      note: "We are currently documenting the verified chronological timeline and corporate milestones to publish here shortly.",
    },
    finalCta: {
      title: "Ready to engineer a true operational system for your business?",
      description:
        "Let's evaluate your workflows and map out how AI and automation can deliver measurable enterprise value.",
      ctaPrimary: {
        label: "Request Diagnostic",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Review Case Studies",
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
      title: "О компании MercadoCorp | B2B Технологический консалтинг в Эквадоре",
      description:
        "История, философия и эволюция MercadoCorp: от диджитал-агентства к технологической консалтинговой компании в сфере ИИ и автоматизации бизнеса.",
    },
    hero: {
      badge: "Наша Миссия и Видение",
      h1: "Мы не верим в волшебные решения. Мы верим в системное построение шаг за шагом.",
      subheadline:
        "Мы созданы для того, чтобы внедрять инновации и расти вместе с компаниями, готовыми строить надежную систему, а не разовую кампанию.",
      ctaPrimary: {
        label: "Посмотреть наши работы →",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Обсудить проект",
        href: "/contacto",
      },
    },
    history: {
      title: "От диджитал-агентства к технологическому консалтингу",
      body: "Пройдя путь от агентства интернет-маркетинга, мы выросли в технологическую консалтинговую компанию. Сегодня автоматизация и разработка ПО служат фундаментом роста наших клиентов, а маркетинг масштабирует уже отлаженную систему.",
    },
    dualSpecialization: {
      title: "Двойная Специализация",
      subtitle: "Сбалансированный подход, закрывающий операционную базу и позиционирование бренда.",
      pillars: [
        {
          name: "Технологии и Автоматизация",
          description: "Автоматизация процессов, ИИ-агенты, CRM и заказное ПО для масштабирования без рутины.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Цифровой Маркетинг",
          description: "Стратегия контента, личный бренд и организация событий, когда технологическая база уже работает.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Философия нашей работы",
      values: [
        {
          title: "Комплексная Стратегия",
          description: "Мы не внедряем разрозненные инструменты — мы проектируем бизнес как единый живой организм.",
        },
        {
          title: "Постоянные Инновации",
          description: "Мы тестируем ИИ-технологии на собственных проектах, прежде чем предлагать их клиентам.",
        },
        {
          title: "Синергия и Партнерство",
          description: "Мы работаем в тесном контакте с командами заказчиков, передавая им экспертизу.",
        },
      ],
    },
    trajectory: {
      title: "Хронология и Вехи Развития",
      statusBadge: "Скоро",
      note: "Мы финализируем подтвержденную хронологию ключевых этапов развития компании для публикации в этом блоке.",
    },
    finalCta: {
      title: "Готовы построить надежную систему для вашего бизнеса?",
      description:
        "Давайте разберем ваши текущие процессы и определим, где ИИ и автоматизация принесут максимальный эффект.",
      ctaPrimary: {
        label: "Запросить аудит",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Изучить кейсы",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Узнать больше о MercadoCorp",
      links: [
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Контакты", href: "/contacto" },
        { label: "Маркетинг", href: "/marketing-digital" },
      ],
    },
  },
};

export function getNosotrosContent(locale: Locale): NosotrosPageContent {
  return contentData[locale] || contentData.es;
}
