// content/auditoria.ts
// Copy oficial de Auditoría Digital extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";
import { ServicePageContent } from "./aplicaciones";

const contentData: Record<Locale, ServicePageContent> = {
  es: {
    seo: {
      title: "Auditoría Digital Gratuita: Web, SEO, Redes y Pauta | MercadoCorp",
      description:
        "Diagnóstico completo de su presencia digital: web, SEO, redes sociales y campañas pagas. Reciba un informe con hoja de ruta a 90 días.",
    },
    hero: {
      badge: "Diagnóstico Estratégico · Auditoría Digital",
      h1: "Antes de invertir más en marketing, sepa exactamente dónde está parado",
      subheadline:
        "Muchas empresas gastan en campañas y contenido sin saber qué genera resultados y qué está drenando su presupuesto. Le damos un diagnóstico honesto, basado en datos, con acciones priorizadas — no una lista de problemas sin salida.",
      ctaPrimary: {
        label: "Solicitar mi Auditoría Digital →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver Casos de Éxito",
        href: "/casos-de-exito",
      },
    },
    features: {
      sectionTitle: "Alcance del Diagnóstico Integral",
      sectionSubtitle:
        "Evaluamos con rigor técnico y analítico cada frente de su presencia digital para identificar fugas de inversión.",
      items: [
        {
          title: "Auditoría de sitio web y experiencia de usuario",
          description:
            "Velocidad de carga, experiencia de usuario en móvil, arquitectura de navegación, eficacia de CTAs y tasa de conversión real.",
          tag: "Web & CRO",
        },
        {
          title: "Auditoría SEO y visibilidad orgánica",
          description:
            "Posicionamiento orgánico en Google, análisis de palabras clave transaccionales, errores técnicos y brechas frente a la competencia.",
          tag: "SEO Técnico",
        },
        {
          title: "Auditoría de redes sociales y comunidad",
          description:
            "Consistencia de marca, rendimiento real de publicaciones, engagement genuino y crecimiento calificado de comunidad B2B.",
          tag: "Social Media",
        },
        {
          title: "Auditoría de pauta y campañas pagadas",
          description:
            "Estructura de cuentas en Meta y Google Ads, costo por adquisición (CPA), retorno del gasto publicitario y fugas de presupuesto.",
          tag: "Paid Media",
        },
        {
          title: "Análisis competitivo de mercado",
          description:
            "Comparativa de posicionamiento, volumen de búsqueda y madurez digital frente a los 3 principales competidores de su sector.",
          tag: "Benchmarking",
        },
        {
          title: "Informe ejecutivo + Hoja de ruta a 90 días",
          description:
            "Documento ejecutivo con hallazgos clasificados por impacto y esfuerzo, con pasos concretos para corregir y acelerar resultados.",
          tag: "Hoja de Ruta",
        },
      ],
    },
    reasoningBlock: {
      badge: "Sin Sesgos Comerciales",
      title: "¿No sabe si su problema es de marketing o de tecnología? Empiece aquí.",
      body: "La auditoría cubre ambos frentes: si el problema es que sus leads se enfrían por falta de automatización, se lo decimos y lo derivamos a Tecnología. Si el problema es de visibilidad o contenido, seguimos en Marketing. Sin sesgo hacia 'vendernos lo que ya ofrecemos'.",
      cta: {
        label: "Quiero mi diagnóstico honesto →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "¿Listo para saber con certeza dónde optimizar su inversión digital?",
      description:
        "Solicite su auditoría técnica y comercial sin costo y reciba una hoja de ruta priorizada con retorno medible.",
      ctaPrimary: {
        label: "Solicitar Auditoría Gratuita",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explorar Más Servicios",
      links: [
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
        { label: "Estrategia, Creatividad y Branding", href: "/estrategia-creatividad-branding" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "E-commerce Inteligente", href: "/ecommerce-inteligente" },
      ],
    },
  },
  en: {
    seo: {
      title: "Complimentary Digital Audit: Web, SEO, Social & Ads | MercadoCorp",
      description:
        "Comprehensive diagnosis of your digital footprint: web performance, organic search, social consistency, and paid media. Receive an actionable 90-day roadmap.",
    },
    hero: {
      badge: "Strategic Diagnosis · Digital Audit",
      h1: "Before investing more in marketing, know exactly where you stand",
      subheadline:
        "Many companies spend on campaigns and content without knowing what generates results and what is draining their budget. We give you an honest, data-driven diagnostic with prioritized actions — not a list of problems with no way out.",
      ctaPrimary: {
        label: "Request my Digital Audit →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Review Case Studies",
        href: "/casos-de-exito",
      },
    },
    features: {
      sectionTitle: "Comprehensive Diagnostic Scope",
      sectionSubtitle:
        "Rigorous technical inspection across every customer touchpoint to pinpoint wasted budget and conversion bottlenecks.",
      items: [
        {
          title: "Website UX & Conversion Rate Audit",
          description:
            "Page load speed, mobile user experience, navigation architecture, call-to-action effectiveness, and actual conversion rate.",
          tag: "Web & CRO",
        },
        {
          title: "Technical SEO & Organic Visibility",
          description:
            "Organic positioning in Google, transactional keyword analysis, technical errors, and gaps versus the competition.",
          tag: "Technical SEO",
        },
        {
          title: "Social Channels & Community Audit",
          description:
            "Brand consistency, actual post performance, genuine engagement, and qualified B2B community growth.",
          tag: "Social Media",
        },
        {
          title: "Paid Media & Ads Audit",
          description:
            "Account structure in Meta and Google Ads, cost per acquisition (CPA), return on ad spend, and budget leaks.",
          tag: "Paid Media",
        },
        {
          title: "Competitive Market Benchmarking",
          description:
            "Comparison of positioning, search volume, and digital maturity against your top 3 industry competitors.",
          tag: "Benchmarking",
        },
        {
          title: "Executive Report & 90-Day Roadmap",
          description:
            "Executive document with findings classified by impact and effort, with concrete steps to fix issues and accelerate results.",
          tag: "Roadmap",
        },
      ],
    },
    reasoningBlock: {
      badge: "Unbiased Advisory",
      title: "Not sure if your bottleneck is marketing or technology? Start here.",
      body: "The audit covers both fronts: if leads are cooling off due to lack of automation, we'll tell you and route you to Technology. If the issue is visibility or content, we stay within Marketing. No bias toward 'selling you what we already offer'.",
      cta: {
        label: "Get my objective diagnostic →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Ready to know for certain where to optimize your digital investment?",
      description:
        "Request your free technical and commercial audit and receive a prioritized roadmap with measurable return.",
      ctaPrimary: {
        label: "Request Free Audit",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explore Related Services",
      links: [
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
        { label: "Strategy, Creativity & Branding", href: "/estrategia-creatividad-branding" },
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Intelligent E-commerce", href: "/ecommerce-inteligente" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Бесплатный цифровой аудит: Веб, SEO, Соцсети и Реклама | MercadoCorp",
      description:
        "Полный аудит цифрового присутствия: скорость сайта, SEO, социальные сети и рекламные кампании. Практический план действий на 90 дней.",
    },
    hero: {
      badge: "Стратегическая Диагностика · Цифровой Аудит",
      h1: "Прежде чем вкладывать больше в маркетинг, узнайте реальное положение дел",
      subheadline:
        "Многие компании тратят деньги на кампании и контент, не понимая, что приносит результат, а что сжигает бюджет. Мы даем честный анализ на основе данных с приоритизированными действиями — а не список проблем без выхода.",
      ctaPrimary: {
        label: "Запросить цифровой аудит →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Изучить кейсы",
        href: "/casos-de-exito",
      },
    },
    features: {
      sectionTitle: "Объем комплексного аудита",
      sectionSubtitle:
        "Техническая и коммерческая экспертиза каждого канала для выявления точек потери бюджета.",
      items: [
        {
          title: "Аудит сайта и пользовательского опыта",
          description:
            "Скорость загрузки, мобильная адаптация, логика навигации, эффективность целевых кнопок и конверсия.",
          tag: "Web & CRO",
        },
        {
          title: "Технический SEO-аудит и видимость",
          description:
            "Позиции в поисковой выдаче, коммерческие ключевые слова, технические ошибки и опережение конкурентов.",
          tag: "SEO-аудит",
        },
        {
          title: "Аудит соцсетей и сообщества",
          description:
            "Целостность бренда, реальная эффективность публикаций, искренняя вовлеченность и квалифицированный рост B2B-сообщества.",
          tag: "Соцсети",
        },
        {
          title: "Аудит контекстной и таргетированной рекламы",
          description:
            "Структура рекламных кабинетов Meta и Google Ads, стоимость привлечения (CPA), окупаемость рекламных расходов и слив бюджета.",
          tag: "Платный трафик",
        },
        {
          title: "Конкурентный анализ ниши",
          description:
            "Сравнение позиционирования, объема поисковых запросов и цифровой зрелости с 3 главными конкурентами в вашем секторе.",
          tag: "Бенчмаркинг",
        },
        {
          title: "Итоговый отчет и дорожная карта на 90 дней",
          description:
            "Документ для руководства с результатами, ранжированными по влиянию и трудозатратам, и конкретными шагами для исправления ситуации и ускорения результатов.",
          tag: "План на 90 дней",
        },
      ],
    },
    reasoningBlock: {
      badge: "Без Скрытых Продаж",
      title: "Не знаете, где сбой — в маркетинге или в технологиях? Начните отсюда.",
      body: "Аудит охватывает оба направления: если проблема в том, что лиды остывают из-за отсутствия автоматизации, мы честно скажем об этом и направим вас в блок Технологий. Если проблема в видимости или контенте, продолжаем работу в Маркетинге. Без уклона в сторону «продать то, что мы и так предлагаем».",
      cta: {
        label: "Получить честный аудит →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Готовы точно узнать, где оптимизировать ваши цифровые инвестиции?",
      description:
        "Запросите бесплатный технический и коммерческий аудит и получите приоритизированную дорожную карту с измеримой отдачей.",
      ctaPrimary: {
        label: "Запросить бесплатный аудит",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Связанные направления",
      links: [
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Стратегия, Креатив и Брендинг", href: "/estrategia-creatividad-branding" },
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Умный E-commerce", href: "/ecommerce-inteligente" },
      ],
    },
  },
};

export function getAuditoriaContent(locale: Locale): ServicePageContent {
  return contentData[locale] || contentData.es;
}
