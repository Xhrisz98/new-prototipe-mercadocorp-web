// content/marketing.ts
// Copy oficial del hub Marketing Digital extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface MarketingContent {
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
    }[];
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

const contentData: Record<Locale, MarketingContent> = {
  es: {
    seo: {
      title: "Marketing Digital, Branding y Contenido para Empresas | MercadoCorp",
      description:
        "Estrategia de contenido, branding personal, auditoría digital y gestión de eventos. El complemento ideal cuando su base tecnológica ya está resuelta.",
    },
    hero: {
      badge: "Pilar 02 — Marketing Digital B2B",
      h1: "Cuando la base tecnológica ya está resuelta, potenciamos cómo el mercado lo percibe",
      subheadline:
        "El contenido sin estrategia es ruido. La estrategia sin tecnología detrás no escala. Aquí conectamos ambas cosas.",
      ctaPrimary: {
        label: "Auditar mi presencia digital →",
        href: "/auditoria-digital",
      },
    },
    services: {
      sectionTitle: "Servicios de Posicionamiento y Comunicación",
      sectionSubtitle:
        "Estrategias pensadas para empresas B2B y directivos que buscan autoridad y diferenciación clara.",
      items: [
        {
          number: "01",
          title: "Estrategia, Creatividad y Branding Personal",
          description:
            "Identidad, narrativa y contenido estratégico: posicionamos a su empresa y a sus ejecutivos como referentes indiscutibles de su sector.",
          href: "/estrategia-creatividad-branding",
          ctaLabel: "Ver el servicio →",
          badge: "Branding & Contenido",
        },
        {
          number: "02",
          title: "Auditoría Digital",
          description:
            "Diagnóstico exhaustivo y honesto de su presencia digital (SEO, redes, pauta, competencia) con una hoja de ruta accionable a 90 días.",
          href: "/auditoria-digital",
          ctaLabel: "Ver el servicio →",
          badge: "Diagnóstico & Estrategia",
        },
        {
          number: "03",
          title: "Gestión Integral de Eventos",
          description:
            "De la idea conceptual a una experiencia corporativa memorable: diseño, presupuesto, logística integral y proveedores de primer nivel.",
          href: "/gestion-eventos",
          ctaLabel: "Ver el servicio →",
          badge: "Experiencias B2B",
        },
      ],
    },
    faq: {
      title: "Preguntas Frecuentes sobre Marketing",
      subtitle: "Resolvemos las dudas habituales sobre nuestros servicios de comunicación.",
      items: [
        {
          question: "¿Puedo contratar solo Marketing sin trabajar la parte tecnológica?",
          answer:
            "Sí, son servicios independientes. No obstante, si su operación comercial todavía es manual o dispersa, recomendamos empezar por un diagnóstico conjunto para no invertir en atraer más leads de los que su equipo hoy puede atender con calidad.",
        },
      ],
    },
    finalCta: {
      title: "¿Desea potenciar la visibilidad y autoridad de su marca?",
      description:
        "Evaluamos su presencia actual y le mostramos cómo conectar su mensaje con una audiencia calificada que convierta.",
      ctaPrimary: {
        label: "Solicitar Auditoría de Presencia",
        href: "/auditoria-digital",
      },
    },
    internalLinks: {
      title: "Continuar explorando el ecosistema:",
      links: [
        { label: "Estrategia y Branding Personal", href: "/estrategia-creatividad-branding" },
        { label: "Auditoría Digital", href: "/auditoria-digital" },
        { label: "Gestión de Eventos", href: "/gestion-eventos" },
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
      ],
    },
  },

  en: {
    seo: {
      title: "Digital Marketing, Branding & Content for Enterprises | MercadoCorp",
      description:
        "Content strategy, personal branding, digital auditing, and corporate event management. The ideal complement once your tech foundations are solid.",
    },
    hero: {
      badge: "Pillar 02 — B2B Digital Marketing",
      h1: "Once technological foundations are resolved, we elevate market perception",
      subheadline:
        "Content without strategy is noise. Strategy without technology behind it doesn't scale. Here we connect both.",
      ctaPrimary: {
        label: "Audit my digital presence →",
        href: "/auditoria-digital",
      },
    },
    services: {
      sectionTitle: "Positioning & Communication Services",
      sectionSubtitle:
        "Engineered for B2B enterprises and executives who demand authority and market clarity.",
      items: [
        {
          number: "01",
          title: "Strategy, Creativity & Personal Branding",
          description:
            "Identity, narrative, and strategic content: we position your company and its executives as undisputed benchmarks in your industry.",
          href: "/estrategia-creatividad-branding",
          ctaLabel: "View service →",
          badge: "Branding & Content",
        },
        {
          number: "02",
          title: "Digital Audit",
          description:
            "An honest, deep-dive examination of your digital footprints (SEO, social, paid media, competitors) paired with a 90-day execution roadmap.",
          href: "/auditoria-digital",
          ctaLabel: "View service →",
          badge: "Diagnostic & Strategy",
        },
        {
          number: "03",
          title: "Corporate Event Management",
          description:
            "From the initial concept to a memorable corporate experience: design, budgeting, end-to-end logistics, and top-tier vendors.",
          href: "/gestion-eventos",
          ctaLabel: "View service →",
          badge: "B2B Experiences",
        },
      ],
    },
    faq: {
      title: "Marketing FAQ",
      subtitle: "Clear answers on how our marketing services operate alongside technology.",
      items: [
        {
          question: "Can we hire Marketing services without hiring the tech stack?",
          answer:
            "Yes, they are independent services. However, if your sales operation is still manual or scattered, we recommend starting with a joint diagnostic so you don't invest in attracting more leads than your team can currently handle with quality.",
        },
      ],
    },
    finalCta: {
      title: "Do you want to boost your brand's visibility and authority?",
      description:
        "We evaluate your current presence and show you how to connect your message with a qualified audience that converts.",
      ctaPrimary: {
        label: "Request Digital Audit",
        href: "/auditoria-digital",
      },
    },
    internalLinks: {
      title: "Explore related ecosystem modules:",
      links: [
        { label: "Strategy & Branding", href: "/estrategia-creatividad-branding" },
        { label: "Digital Audit", href: "/auditoria-digital" },
        { label: "Corporate Events", href: "/gestion-eventos" },
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
        { label: "Case Studies", href: "/casos-de-exito" },
      ],
    },
  },

  ru: {
    seo: {
      title: "Цифровой Маркетинг, Брендинг и Контент для Бизнеса | MercadoCorp",
      description:
        "Контент-стратегия, личный бренд, цифровой аудит и организация деловых мероприятий. Идеальное дополнение, когда технологическая основа уже работает.",
    },
    hero: {
      badge: "Столп 02 — B2B Цифровой Маркетинг",
      h1: "Когда технологическая основа уже готова, мы усиливаем то, как вас воспринимает рынок",
      subheadline:
        "Контент без стратегии — это шум. Стратегия без технологий не масштабируется. Мы объединяем оба направления.",
      ctaPrimary: {
        label: "Аудит цифрового присутствия →",
        href: "/auditoria-digital",
      },
    },
    services: {
      sectionTitle: "Услуги Позиционирования и Коммуникаций",
      sectionSubtitle:
        "Стратегии для B2B компаний и руководителей, которым необходим непререкаемый авторитет на рынке.",
      items: [
        {
          number: "01",
          title: "Стратегия, Креатив и Личный Бренд",
          description:
            "Идентичность, сторителлинг и смысловой контент: позиционируем компанию и топ-менеджеров как признанных экспертов индустрии.",
          href: "/estrategia-creatividad-branding",
          ctaLabel: "Подробнее об услуге →",
          badge: "Брендинг и Контент",
        },
        {
          number: "02",
          title: "Цифровой Аудит",
          description:
            "Глубокая и честная диагностика цифрового присутствия компании (SEO, соцсети, платная реклама, конкуренты) с понятным планом действий на 90 дней.",
          href: "/auditoria-digital",
          ctaLabel: "Подробнее об услуге →",
          badge: "Диагностика и Стратегия",
        },
        {
          number: "03",
          title: "Организация Деловых Событий",
          description:
            "От концептуальной идеи до запоминающегося корпоративного события: бюджет, дизайн, подрядчики и логистика под ключ.",
          href: "/gestion-eventos",
          ctaLabel: "Подробнее об услуге →",
          badge: "B2B Мероприятия",
        },
      ],
    },
    faq: {
      title: "Частые Вопросы по Маркетингу",
      subtitle: "Ответы на популярные вопросы о маркетинговых услугах.",
      items: [
        {
          question: "Можно ли заказать только маркетинг без IT-разработки?",
          answer:
            "Да, это независимые услуги. Однако, если коммерческий процесс в компании все еще ведется вручную или разрознен, мы рекомендуем начать с совместной диагностики, чтобы не инвестировать в привлечение большего числа лидов, чем ваша команда сегодня способна качественно обработать.",
        },
      ],
    },
    finalCta: {
      title: "Хотите усилить видимость и экспертный авторитет компании?",
      description:
        "Мы оценим ваше текущее присутствие и покажем, как связать ваше сообщение с квалифицированной аудиторией, которая конвертируется в продажи.",
      ctaPrimary: {
        label: "Запросить Аудит Присутствия",
        href: "/auditoria-digital",
      },
    },
    internalLinks: {
      title: "Другие разделы экосистемы:",
      links: [
        { label: "Стратегия и Личный Бренд", href: "/estrategia-creatividad-branding" },
        { label: "Цифровой Аудит", href: "/auditoria-digital" },
        { label: "Организация Мероприятий", href: "/gestion-eventos" },
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Кейсы Компании", href: "/casos-de-exito" },
      ],
    },
  },
};

export function getMarketingContent(locale: Locale): MarketingContent {
  return contentData[locale] || contentData.es;
}
