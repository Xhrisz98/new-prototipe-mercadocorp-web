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
      title: "Antes de enviar, explore nuestro ecosistema",
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
        "Conceptualization, budgeting, vendors, and complete execution for your corporate event. From idea to a memorable experience, without you managing anything.",
    },
    hero: {
      badge: "Digital Marketing · Comprehensive Event Management",
      h1: "Your event, without you having to manage anything",
      subheadline:
        "We take care of absolutely everything to turn your idea into a memorable experience — from conceptualization to the last confirmed vendor.",
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
      sectionTitle: "Comprehensive Event Coverage and Execution",
      sectionSubtitle:
        "360° executive management to guarantee punctuality, sophistication, and zero worries for your team.",
      items: [
        {
          title: "Initial Conceptualization and Experience Design",
          description:
            "Design of the theme, visual narrative, brand ambiance, and guest flows to create a memorable experience.",
          tag: "Concept & Design",
        },
        {
          title: "Financial and Budget Control from Start to Finish",
          description:
            "Transparent financial planning, comparative quoting, and optimization of every line item with no unexpected overruns.",
          tag: "Budget 360°",
        },
        {
          title: "Negotiation and Contracting of Qualified Vendors",
          description:
            "Premium venues, high-end catering, audiovisual equipment, decoration, security, and support staff.",
          tag: "Vendors",
        },
        {
          title: "Coordination and Full Direction on Event Day",
          description:
            "Minute-by-minute supervision, protocol, immediate resolution of contingencies, and on-site time management.",
          tag: "Live Direction",
        },
      ],
    },
    reasoningBlock: {
      badge: "Digital + In-Person Synergy",
      title: "An event that also fuels your digital presence",
      body: "Unlike a traditional event production company, we integrate the offline experience with your digital strategy: content, coverage, and public relations that extend the event's impact beyond the day it happens.",
      cta: {
        label: "Request an event proposal →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Do you have a corporate event in mind?",
      description:
        "We design, produce, and coordinate experiences that elevate your brand's perception among clients, partners, and investors.",
      ctaPrimary: {
        label: "Request Event Proposal",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Before you submit, explore our ecosystem",
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
        "Концепция, смета, подрядчики и полное проведение вашего корпоративного мероприятия. От идеи до незабываемого впечатления — без необходимости управлять чем-либо.",
    },
    hero: {
      badge: "Цифровой Маркетинг · Комплексная Организация Мероприятий",
      h1: "Ваше мероприятие — без необходимости управлять хоть чем-то",
      subheadline:
        "Мы берем на себя абсолютно все, чтобы превратить вашу идею в незабываемое впечатление — от концепции до последнего подтвержденного подрядчика.",
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
      sectionTitle: "Полное сопровождение и проведение мероприятий",
      sectionSubtitle:
        "Исполнительное управление 360° для обеспечения пунктуальности, безупречного стиля и полного спокойствия для вашей команды.",
      items: [
        {
          title: "Начальная концепция и дизайн впечатлений",
          description:
            "Разработка тематики, визуальной концепции, оформления в стиле бренда и маршрутов гостей для создания незабываемого впечатления.",
          tag: "Концепт и Дизайн",
        },
        {
          title: "Финансовый и сметный контроль от начала до конца",
          description:
            "Прозрачное финансовое планирование, сравнительные коммерческие предложения и оптимизация каждой статьи расходов без непредвиденных переплат.",
          tag: "Бюджет 360°",
        },
        {
          title: "Переговоры и контрактация квалифицированных подрядчиков",
          description:
            "Площадки премиум-класса, кейтеринг высокого уровня, аудиовизуальное оборудование, декор, охрана и вспомогательный персонал.",
          tag: "Подрядчики",
        },
        {
          title: "Координация и полное управление в день мероприятия",
          description:
            "Поминутный контроль, протокол, немедленное решение внештатных ситуаций и контроль тайминга на месте.",
          tag: "Живое Управление",
        },
      ],
    },
    reasoningBlock: {
      badge: "Синергия Офлайн + Онлайн",
      title: "Событие, которое также работает на ваше цифровое присутствие",
      body: "В отличие от традиционного event-агентства, мы связываем офлайн-опыт с вашей цифровой стратегией: контент, освещение мероприятия и PR-материалы, продлевающие эффект события за пределы дня, когда оно проходит.",
      cta: {
        label: "Запросить предложение по мероприятию →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "У вас на примете корпоративное мероприятие?",
      description:
        "Мы разрабатываем, производим и координируем впечатления, повышающие восприятие вашего бренда среди клиентов, партнеров и инвесторов.",
      ctaPrimary: {
        label: "Запросить организацию события",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Прежде чем отправить, изучите нашу экосистему",
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
