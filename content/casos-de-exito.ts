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
  stats: {
    number: string;
    label: string;
  }[];
  notice: {
    title: string;
    body: string;
  };
  cases: CaseStudyItem[];
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
        label: "Quiero ser el próximo caso →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver Tecnología & Automatización",
        href: "/tecnologia-automatizacion",
      },
    },
    stats: [
      { number: "24/7", label: "Atención y ventas automatizadas, sin horario" },
      { number: "100%", label: "Trazabilidad del pipeline comercial, cero leads perdidos" },
      { number: "Ecuador · LatAm", label: "Presencia y operación remota sin fricción" },
      { number: "A medida", label: "Construido sobre su operación real, sin plantillas" },
    ],
    notice: {
      title: "Casos de Estudio en Proceso de Aprobación de Divulgación",
      body: "Por acuerdos de confidencialidad comercial (NDA) con nuestros clientes corporativos, publicamos resúmenes cualitativos verificados de arquitectura técnica sin divulgar cifras no autorizadas.",
    },
    cases: [
      {
        id: "caso-01",
        clientName: "Empresa de Servicios Corporativos B2B",
        clientIndustry: "Servicios y Consultoría B2B",
        pillar: "Tecnología & Automatización",
        problemContext: "Pérdida de oportunidades comerciales y retrasos de hasta 48 horas en la calificación de prospectos.",
        solutionBuilt: "Arquitectura integral de CRM con agente de IA para WhatsApp y sincronización con base de datos interna, eliminando la carga manual de seguimiento.",
        isConfirmed: true,
      },
      {
        id: "caso-02",
        clientName: "Distribuidora e Importadora Industrial",
        clientIndustry: "Distribución y Comercio Mayorista",
        pillar: "Tecnología & Automatización",
        problemContext: "Silos de información entre bodegas, inventarios y ejecutivos comerciales que generaban errores de cotización.",
        solutionBuilt: "Desarrollo de panel web interno a medida conectado en tiempo real con inventario y módulo de órdenes para la fuerza de ventas.",
        isConfirmed: true,
      },
      {
        id: "caso-03",
        clientName: "Marca de Consumo y Comercio Especializado",
        clientIndustry: "E-commerce & Retail",
        pillar: "E-commerce & IA",
        problemContext: "Tasa de abandono de checkout superior al 65% sin mecanismos automatizados de recuperación.",
        solutionBuilt: "Integración de flujos automatizados de remarketing inteligente, optimización del embudo de compra y agente de asesoría en tiempo real.",
        isConfirmed: true,
      },
    ],
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
      title: "Explorar Más Soluciones",
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
        label: "Become the next success story →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Explore Technology & Automation",
        href: "/tecnologia-automatizacion",
      },
    },
    stats: [
      { number: "24/7", label: "Autonomous advisory and sales, zero downtime" },
      { number: "100%", label: "Pipeline traceability, zero leads dropped" },
      { number: "Ecuador · LatAm", label: "Seamless remote deployment across regions" },
      { number: "Custom Built", label: "Tailored to your real workflows, never forced templates" },
    ],
    notice: {
      title: "Case Studies and Disclosure Compliance",
      body: "Under non-disclosure agreements (NDAs) with our enterprise partners, we publish qualitative technical architectures and verified outcomes without releasing unauthorized financial telemetry.",
    },
    cases: [
      {
        id: "caso-01",
        clientName: "B2B Professional Services Firm",
        clientIndustry: "Professional Services & Advisory",
        pillar: "Tecnología & Automatización",
        problemContext: "Slow lead qualification and commercial lag exceeding 48 hours for inbound RFPs.",
        solutionBuilt: "Autonomous WhatsApp AI sales agent integrated directly with custom CRM and backend databases, eradicating manual follow-up friction.",
        isConfirmed: true,
      },
      {
        id: "caso-02",
        clientName: "Industrial Equipment & Wholesale Distributor",
        clientIndustry: "Wholesale & Industrial Logistics",
        pillar: "Tecnología & Automatización",
        problemContext: "Information silos between warehouse inventory, quotes, and field sales executives.",
        solutionBuilt: "Custom cloud backoffice dashboard synchronizing live inventory levels with client quotes for nationwide sales reps.",
        isConfirmed: true,
      },
      {
        id: "caso-03",
        clientName: "Direct-to-Consumer Specialized Retailer",
        clientIndustry: "E-commerce & Retail",
        pillar: "E-commerce & IA",
        problemContext: "Cart abandonment rate hovering over 65% with zero automated follow-up.",
        solutionBuilt: "Conversion rate overhaul, real-time AI sales assistance, and autonomous checkout recovery messaging funnels.",
        isConfirmed: true,
      },
    ],
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
      title: "Explore Related Solutions",
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
        label: "Стать следующим кейсом →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Технологии и Автоматизация",
        href: "/tecnologia-automatizacion",
      },
    },
    stats: [
      { number: "24/7", label: "Автоматизированные консультации и продажи" },
      { number: "100%", label: "Прозрачность воронки, ни одного потерянного лида" },
      { number: "Эквадор · LatAm", label: "Удаленная работа и внедрение без границ" },
      { number: "Под ключ", label: "Разработано под реальные процессы бизнеса" },
    ],
    notice: {
      title: "Кейсы и конфиденциальность данных",
      body: "В соответствии с соглашениями о неразглашении (NDA) мы публикуем качественные описания технических решений без раскрытия закрытых финансовых показателей.",
    },
    cases: [
      {
        id: "caso-01",
        clientName: "B2B компания в сфере корпоративных услуг",
        clientIndustry: "Консалтинг и B2B услуги",
        pillar: "Tecnología & Automatización",
        problemContext: "Задержки в квалификации входящих заявок до 48 часов и потеря лидов.",
        solutionBuilt: "Внедрение CRM с ИИ-агентом для WhatsApp и интеграцией с корпоративной базой данных, автоматизировавшее обработку запросов.",
        isConfirmed: true,
      },
      {
        id: "caso-02",
        clientName: "Промышленный дистрибьютор оборудования",
        clientIndustry: "Оптовая торговля и логистика",
        pillar: "Tecnología & Automatización",
        problemContext: "Разрозненность данных между складом, бухгалтерией и менеджерами по продажам.",
        solutionBuilt: "Разработка кастомной панели управления с актуальными остатками на складе и быстрым формированием коммерческих предложений.",
        isConfirmed: true,
      },
      {
        id: "caso-03",
        clientName: "Розничный бренд специализированных товаров",
        clientIndustry: "E-commerce и ритейл",
        pillar: "E-commerce & IA",
        problemContext: "Доля брошенных корзин свыше 65% при отсутствии автоматических напоминаний.",
        solutionBuilt: "Оптимизация воронки оформления заказа, интеграция онлайн-ассистента и цепочек возврата покупателей.",
        isConfirmed: true,
      },
    ],
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
      title: "Связанные разделы",
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
