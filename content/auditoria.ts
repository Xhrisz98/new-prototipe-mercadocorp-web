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
      h1: "Before investing another dollar in marketing, know exactly where you stand",
      subheadline:
        "Many companies pour capital into campaigns without knowing what actually produces revenue and what drains their budget. We deliver an honest, data-backed diagnostic with prioritized actions — never endless lists of unsolvable issues.",
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
            "Page load speeds, mobile responsiveness, navigation clarity, call-to-action friction, and actual checkout efficiency.",
          tag: "Web & CRO",
        },
        {
          title: "Technical SEO & Organic Visibility",
          description:
            "Search console health, high-intent keyword rankings, indexation errors, backlink equity, and competitor keyword gaps.",
          tag: "Technical SEO",
        },
        {
          title: "Social Channels & Content Audit",
          description:
            "Brand coherence, post traction, engagement velocity, and qualified executive reach across relevant platforms.",
          tag: "Social Media",
        },
        {
          title: "Paid Media & Ads Efficiency Audit",
          description:
            "Account architecture in Google and Meta Ads, CPA drift, conversion attribution leaks, and budget allocation waste.",
          tag: "Paid Media",
        },
        {
          title: "Competitive Market Benchmarking",
          description:
            "Direct comparison against your top 3 industry rivals in digital footprint, search share, and messaging authority.",
          tag: "Benchmarking",
        },
        {
          title: "Executive Report & 90-Day Roadmap",
          description:
            "Clear C-level report classifying opportunities by business impact and implementation effort, with actionable milestones.",
          tag: "Roadmap",
        },
      ],
    },
    reasoningBlock: {
      badge: "Unbiased Advisory",
      title: "Not sure if your bottleneck is marketing or technology? Start here.",
      body: "Our audit assesses both fronts: if leads are rotting due to lack of automation or poor CRM response, we route you to Technology. If the issue is qualified demand generation, we focus on Marketing. Zero agenda, pure operational clarity.",
      cta: {
        label: "Get my objective diagnostic →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Ready to eliminate wasted spend and unlock genuine digital growth?",
      description:
        "Request your complimentary diagnostic and receive an executive 90-day action plan tailored to your business.",
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
      h1: "Прежде чем инвестировать в маркетинг, узнайте реальное положение дел",
      subheadline:
        "Многие компании тратят бюджет на рекламу, не понимая, что приносит прибыль, а что сжигает деньги. Мы даем честный анализ на основе данных с четкими приоритетами действий.",
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
          title: "Аудит соцсетей и вовлеченности",
          description:
            "Целостность бренда, охваты публикаций, качество аудитории и реальная отдача от контента.",
          tag: "Соцсети",
        },
        {
          title: "Аудит контекстной и таргетированной рекламы",
          description:
            "Структура рекламных кабинетов Google/Meta, стоимость лида (CPA), сквозная аналитика и слив бюджета.",
          tag: "Платный трафик",
        },
        {
          title: "Конкурентный анализ ниши",
          description:
            "Сравнение видимости, маркетинговых механик и цифровой зрелости с 3 главными конкурентами в секторе.",
          tag: "Бенчмаркинг",
        },
        {
          title: "Итоговый отчет и дорожная карта на 90 дней",
          description:
            "Презентация для руководства с приоритизацией задач по влиянию на прибыль и понятными шагами внедрения.",
          tag: "План на 90 дней",
        },
      ],
    },
    reasoningBlock: {
      badge: "Без Скрытых Продаж",
      title: "Не знаете, где сбой — в маркетинге или в технологиях? Начните отсюда.",
      body: "Аудит исследует оба направления: если лиды теряются из-за отсутствия CRM и автоматизации, мы честно покажем это и подключим блок Технологий. Если дело в трафике — оптимизируем Маркетинг. Без навязывания лишних услуг.",
      cta: {
        label: "Получить честный аудит →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Готовы устранить утечки бюджета и ускорить рост?",
      description:
        "Запросите диагностику и получите приоритизированную дорожную карту с измеримым бизнес-результатом.",
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
