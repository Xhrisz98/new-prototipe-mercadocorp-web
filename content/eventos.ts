// content/eventos.ts
// Copy oficial de Gestión Integral de Eventos extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";
import { ServicePageContent } from "./aplicaciones";

const contentData: Record<Locale, ServicePageContent> = {
  es: {
    seo: {
      title: "Gestión Integral de Eventos Corporativos | MercadoCorp",
      description:
        "Conceptualización, presupuesto, proveedores y ejecución completa de su evento corporativo. De la idea a la experiencia memorable, sin que usted gestione nada.",
    },
    hero: {
      badge: "Marketing Digital · Gestión Integral de Eventos",
      h1: "Su evento, sin que usted tenga que gestionar nada",
      subheadline:
        "Nos encargamos de absolutamente todo para transformar su idea en una experiencia memorable — desde la conceptualización hasta el último proveedor confirmado.",
      ctaPrimary: {
        label: "Contarles mi idea de evento →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver Estrategia y Branding",
        href: "/estrategia-creatividad-branding",
      },
    },
    features: {
      sectionTitle: "Cobertura y Ejecución Integral de Eventos",
      sectionSubtitle:
        "Gestión ejecutiva 360° para garantizar puntualidad, sofisticación y cero preocupaciones para su equipo.",
      items: [
        {
          title: "Conceptualización inicial y diseño de experiencia",
          description:
            "Diseño de la temática, narrativa visual, ambientación de marca y flujos de invitados para generar un recuerdo memorable.",
          tag: "Concepto & Diseño",
        },
        {
          title: "Control financiero y de presupuesto de principio a fin",
          description:
            "Planificación financiera transparente, cotización comparativa y optimización de cada rubro sin sobrecostos imprevistos.",
          tag: "Presupuesto 360°",
        },
        {
          title: "Negociación y contratación de proveedores calificados",
          description:
            "Locaciones premium, catering de alta gama, equipamiento audiovisual, decoración, seguridad y personal de apoyo.",
          tag: "Proveedores",
        },
        {
          title: "Coordinación y dirección integral el día del evento",
          description:
            "Supervisión minuto a minuto, protocolo, resolución inmediata de contingencias y control de tiempos en el lugar.",
          tag: "Dirección en Vivo",
        },
      ],
    },
    reasoningBlock: {
      badge: "Sinergia Digital + Presencial",
      title: "Un evento que también alimenta su presencia digital",
      body: "A diferencia de una productora de eventos tradicional, integramos la experiencia offline con su estrategia digital: contenido, cobertura y relaciones públicas que extienden el impacto del evento más allá del día en que ocurre.",
      cta: {
        label: "Solicitar propuesta de evento →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "¿Tiene un evento corporativo en mente?",
      description:
        "Diseñamos, producimos y coordinamos experiencias que elevan la percepción de su marca ante clientes, socios e inversionistas.",
      ctaPrimary: {
        label: "Solicitar Propuesta de Evento",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Servicios Relacionados",
      links: [
        { label: "Estrategia, Creatividad y Branding", href: "/estrategia-creatividad-branding" },
        { label: "Marketing Digital (Volver al Hub)", href: "/marketing-digital" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Auditoría Digital", href: "/auditoria-digital" },
      ],
    },
  },
  en: {
    seo: {
      title: "End-to-End Corporate Event Management | MercadoCorp",
      description:
        "Conceptualization, budgeting, vendor curation, and flawless execution for corporate events. From idea to unforgettable experience, zero hassle for your team.",
    },
    hero: {
      badge: "Digital Marketing · Corporate Event Management",
      h1: "Your corporate event, without you having to manage a single detail",
      subheadline:
        "We handle every single piece to transform your concept into an unforgettable executive experience — from initial storytelling to the final confirmed supplier.",
      ctaPrimary: {
        label: "Share your event idea →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Explore Strategy & Branding",
        href: "/estrategia-creatividad-branding",
      },
    },
    features: {
      sectionTitle: "Comprehensive 360° Event Execution",
      sectionSubtitle:
        "Flawless logistics, refined aesthetics, and seamless execution so your team can focus on relationships.",
      items: [
        {
          title: "Creative Conceptualization & Experience Design",
          description:
            "Storyline development, spatial ambiance, immersive branding, and attendee journey mapping designed to make a statement.",
          tag: "Concept & Design",
        },
        {
          title: "Rigorous End-to-End Budget Control",
          description:
            "Transparent financial planning, audited vendor bids, and itemized forecasting with zero surprise expenses.",
          tag: "Financial Control",
        },
        {
          title: "Top-Tier Vendor Curation & Contracts",
          description:
            "Elite venues, gourmet catering, cutting-edge AV technology, lighting, security, and bilingual support staff.",
          tag: "Vendors & AV",
        },
        {
          title: "On-Site Production & Live Protocol Direction",
          description:
            "Minute-by-minute stage management, VIP guest hospitality, schedule pacing, and proactive contingency handling.",
          tag: "Live Direction",
        },
      ],
    },
    reasoningBlock: {
      badge: "Digital + Physical Synergy",
      title: "An event that fuels your digital authority for months",
      body: "Unlike traditional legacy event production companies, we integrate offline gatherings with your digital growth strategy: real-time content capture, executive interviews, and PR distribution that compounds the event's reach long after attendees leave.",
      cta: {
        label: "Request custom event proposal →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Planning an upcoming corporate gathering or summit?",
      description:
        "Let us conceptualize and deliver an executive experience that commands respect from partners, clients, and industry stakeholders.",
      ctaPrimary: {
        label: "Request Event Proposal",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Related Services",
      links: [
        { label: "Strategy, Creativity & Branding", href: "/estrategia-creatividad-branding" },
        { label: "Digital Marketing (Hub)", href: "/marketing-digital" },
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Digital Audit", href: "/auditoria-digital" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Комплексная организация корпоративных мероприятий | MercadoCorp",
      description:
        "Концепция, смета, работа с подрядчиками и проведение корпоративных событий. От идеи до безупречного результата без хлопот для вашей команды.",
    },
    hero: {
      badge: "Цифровой Маркетинг · Корпоративные События",
      h1: "Ваше мероприятие без необходимости управлять деталями",
      subheadline:
        "Мы берем на себя абсолютно все задачи, чтобы превратить идею в незабываемый опыт — от сценарной концепции до координации каждого подрядчика.",
      ctaPrimary: {
        label: "Поделиться идеей события →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Стратегия и Брендинг",
        href: "/estrategia-creatividad-branding",
      },
    },
    features: {
      sectionTitle: "Комплексная организация событий 360°",
      sectionSubtitle:
        "Безупречная логистика, статусная атмосфера и полное спокойствие для вашей управленческой команды.",
      items: [
        {
          title: "Концепция и сценарий впечатлений",
          description:
            "Тематика события, пространственный брендинг, интерактивные зоны и режиссура внимания гостей.",
          tag: "Концепт и Дизайн",
        },
        {
          title: "Прозрачный финансовый и сметный контроль",
          description:
            "Детальное бюджетирование, тендерный выбор подрядчиков и оптимизация расходов без непредвиденных переплат.",
          tag: "Бюджетирование",
        },
        {
          title: "Подбор и контрактация надежных подрядчиков",
          description:
            "Статусные площадки, кейтеринг высокого класса, мультимедийное оборудование, декор и персонал.",
          tag: "Подрядчики и Оборудование",
        },
        {
          title: "Координация и живая режиссура в день события",
          description:
            "Поминутный контроль тайминга, протокол встречи VIP-гостей и оперативное решение любых ситуаций.",
          tag: "Живое Управление",
        },
      ],
    },
    reasoningBlock: {
      badge: "Синергия Офлайн + Онлайн",
      title: "Событие, работающее на ваше цифровое присутствие",
      body: "В отличие от традиционных event-агентств, мы связываем оффлайн-мероприятие с цифровой стратегией: качественный медиаконтент, интервью с топ-менеджерами и PR-материалы, продлевающие эффект на месяцы вперед.",
      cta: {
        label: "Запросить предложение по мероприятию →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Планируете статусное корпоративное событие?",
      description:
        "Доверьте нам организацию от концепции до финала, укрепив деловые отношения с партнерами и клиентами.",
      ctaPrimary: {
        label: "Запросить организацию события",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Связанные направления",
      links: [
        { label: "Стратегия, Креатив и Брендинг", href: "/estrategia-creatividad-branding" },
        { label: "Маркетинг (Вернуться в Хаб)", href: "/marketing-digital" },
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Цифровой аудит", href: "/auditoria-digital" },
      ],
    },
  },
};

export function getEventosContent(locale: Locale): ServicePageContent {
  return contentData[locale] || contentData.es;
}
