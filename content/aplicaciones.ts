// content/aplicaciones.ts
// Copy oficial de Aplicaciones y Herramientas Digitales extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface FeatureItem {
  number?: string;
  title: string;
  description: string;
  tag?: string;
  isAi?: boolean;
}

export interface ServicePageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    subheadline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: FeatureItem[];
  };
  reasoningBlock: {
    title: string;
    body: string;
    cta: { label: string; href: string };
    badge?: string;
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

const contentData: Record<Locale, ServicePageContent> = {
  es: {
    seo: {
      title: "Desarrollo de Software y CRMs a Medida para Empresas | MercadoCorp",
      description:
        "Desarrollamos apps web, gestores internos, CRMs personalizados e integraciones a medida. Software construido sobre su forma real de trabajar, no sobre una plantilla.",
    },
    hero: {
      badge: "Tecnología & Automatización · Software a Medida",
      h1: "El software que su negocio necesita, no el que la plantilla le permite",
      subheadline:
        "Hay procesos y flujos de trabajo que las herramientas genéricas no resuelven. Diseñamos y desarrollamos soluciones digitales a medida que automatizan, centralizan y amplían las capacidades reales de su operación.",
      ctaPrimary: {
        label: "Cuénteme su proceso →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver E-commerce Inteligente",
        href: "/ecommerce-inteligente",
      },
    },
    features: {
      sectionTitle: "Capacidades de Desarrollo y Soluciones a Medida",
      sectionSubtitle:
        "Cada módulo responde a sus flujos operativos reales, optimizando tiempo y eliminando fricciones.",
      items: [
        {
          title: "Aplicaciones web a medida",
          description:
            "Herramientas internas o de cara al cliente, adaptadas a los flujos y necesidades específicas de su operación — no una plantilla genérica adaptada a la fuerza.",
          tag: "Web Apps",
        },
        {
          title: "Gestores y paneles internos",
          description:
            "Sistemas de gestión de tareas, inventarios, equipos, clientes o procesos, con dashboards claros y acceso por roles.",
          tag: "Backoffice",
        },
        {
          title: "CRMs personalizados",
          description:
            "Implementación y configuración de sistemas de gestión de clientes adaptados a su ciclo de ventas real, con automatizaciones e integraciones incluidas.",
          tag: "CRM",
        },
        {
          title: "Ampliación de ecosistemas digitales",
          description:
            "Conectamos las herramientas que ya usa, eliminando silos de información y flujos manuales innecesarios entre sistemas que hoy no se hablan entre sí.",
          tag: "Integraciones",
        },
        {
          title: "Linkpages y micrositios inteligentes",
          description:
            "Páginas de enlace, catálogos digitales y micrositios optimizados para conversión, con analítica integrada desde el primer día.",
          tag: "Conversión",
        },
        {
          title: "Soluciones con IA integrada",
          description:
            "Agentes conversacionales, automatizaciones inteligentes y modelos de IA incorporados dentro de sus herramientas y procesos internos, donde realmente agregan valor (no como adorno).",
          tag: "Agentes de IA",
          isAi: true,
        },
      ],
    },
    reasoningBlock: {
      badge: "Rentabilidad y Eficiencia",
      title: "¿No es más caro construir algo a medida?",
      body: "Es más caro seguir pagando licencias de herramientas genéricas que no encajan, y más caro aún seguir perdiendo horas de su equipo en tareas manuales que un sistema podría resolver solo. Lo a medida se paga una vez y trabaja para usted todos los días.",
      cta: {
        label: "Solicitar una propuesta técnica →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "¿Listo para crear el software que su operación realmente necesita?",
      description:
        "Analizamos su arquitectura actual y diseñamos una solución tecnológica a medida con impacto financiero medible.",
      ctaPrimary: {
        label: "Solicitar Propuesta Técnica",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explorar Soluciones Relacionadas",
      links: [
        { label: "E-commerce Inteligente", href: "/ecommerce-inteligente" },
        { label: "Mind: CRM + Agente de IA", href: "/mind" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Tecnología & Automatización (Hub)", href: "/tecnologia-automatizacion" },
      ],
    },
  },
  en: {
    seo: {
      title: "Custom Software Development and Tailored CRMs | MercadoCorp",
      description:
        "We build web apps, internal dashboards, custom CRMs, and system integrations. Software designed around your actual workflow, never forced templates.",
    },
    hero: {
      badge: "Technology & Automation · Custom Software",
      h1: "The software your business needs, not what a template restricts you to",
      subheadline:
        "Standard off-the-shelf tools often fail unique workflows. We engineer tailor-made digital solutions that automate, centralize, and expand your operational capacity.",
      ctaPrimary: {
        label: "Tell us about your process →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Explore Intelligent E-commerce",
        href: "/ecommerce-inteligente",
      },
    },
    features: {
      sectionTitle: "Development Capabilities & Custom Solutions",
      sectionSubtitle:
        "Engineered for your true operational flows to eliminate friction and manual bottlenecks.",
      items: [
        {
          title: "Tailored Web Applications",
          description:
            "Internal or customer-facing tools specifically adapted to your exact operational workflows — never a forced template.",
          tag: "Web Apps",
        },
        {
          title: "Internal Dashboards & ERP Panels",
          description:
            "Comprehensive management systems for tasks, inventory, teams, and workflows with granular role-based access.",
          tag: "Backoffice",
        },
        {
          title: "Custom CRMs",
          description:
            "Client relationship platforms aligned to your actual sales cycle, built with native automations and syncs.",
          tag: "CRM",
        },
        {
          title: "Ecosystem Expansion & APIs",
          description:
            "We integrate your existing apps, removing information silos and tedious manual data handoffs between disconnected systems.",
          tag: "Integrations",
        },
        {
          title: "Smart Microsites & Linkpages",
          description:
            "High-conversion digital catalogs and landing pages instrumented with analytics from day one.",
          tag: "Conversion",
        },
        {
          title: "Integrated AI Solutions",
          description:
            "Conversational agents, smart automations, and purpose-built AI models embedded where they drive real ROI.",
          tag: "AI Agents",
          isAi: true,
        },
      ],
    },
    reasoningBlock: {
      badge: "ROI & Efficiency",
      title: "Isn't custom development more expensive?",
      body: "It is far more expensive to continuously pay subscription fees for generic software that fails your team, and even costlier to lose hundreds of billable hours to manual tasks. Custom software is an asset built once that yields daily compound returns.",
      cta: {
        label: "Request a technical proposal →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Ready to build the software your operations truly require?",
      description:
        "Let's audit your current architecture and design a custom software roadmap with proven business returns.",
      ctaPrimary: {
        label: "Request Technical Proposal",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explore Related Solutions",
      links: [
        { label: "Intelligent E-commerce", href: "/ecommerce-inteligente" },
        { label: "Mind: CRM + AI Agent", href: "/mind" },
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Technology & Automation (Hub)", href: "/tecnologia-automatizacion" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Индивидуальная разработка ПО и CRM для бизнеса | MercadoCorp",
      description:
        "Разработка веб-приложений, внутренних панелей, кастомных CRM и интеграций. Программное обеспечение под реальные процессы вашей компании.",
    },
    hero: {
      badge: "Технологии и Автоматизация · Заказное ПО",
      h1: "Программное обеспечение, нужное вашему бизнесу, а не шаблонные ограничения",
      subheadline:
        "Типовые решения часто не справляются с реальными задачами. Мы проектируем и разрабатываем кастомные цифровые решения, устраняющие рутину и расширяющие возможности бизнеса.",
      ctaPrimary: {
        label: "Рассказать о вашем процессе →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Умный E-commerce",
        href: "/ecommerce-inteligente",
      },
    },
    features: {
      sectionTitle: "Возможности разработки и индивидуальные решения",
      sectionSubtitle:
        "Каждый модуль решает конкретные операционные задачи без перегрузки и шаблонов.",
      items: [
        {
          title: "Индивидуальные веб-приложения",
          description:
            "Внутренние или клиентские сервисы, точно адаптированные под процессы компании, а не натянутые шаблоны.",
          tag: "Web Apps",
        },
        {
          title: "Внутренние панели и бэкофис",
          description:
            "Системы управления задачами, складом, командами и процессами с четкими дашбордами и разграничением прав.",
          tag: "Backoffice",
        },
        {
          title: "Кастомные CRM-системы",
          description:
            "Внедрение и настройка платформ управления клиентами под ваш цикл продаж со встроенной автоматизацией.",
          tag: "CRM",
        },
        {
          title: "Интеграция цифровой экосистемы",
          description:
            "Объединение используемых инструментов, устранение информационных разрывов и ручного переноса данных.",
          tag: "Интеграции",
        },
        {
          title: "Умные микросайты и linkpage",
          description:
            "Цифровые каталоги и целевые страницы с высокой конверсией и сквозной аналитикой с первого дня.",
          tag: "Конверсия",
        },
        {
          title: "Решения со встроенным ИИ",
          description:
            "Диалоговые агенты, умная автоматизация и алгоритмы машинного обучения для реальной пользы бизнеса.",
          tag: "ИИ-агенты",
          isAi: true,
        },
      ],
    },
    reasoningBlock: {
      badge: "Окупаемость и Эффективность",
      title: "Разве кастомная разработка не дороже?",
      body: "Гораздо дороже годами оплачивать лицензии типового софта, который не решает задачи, и терять часы команды на рутину. Индивидуальное ПО создается один раз и работает на вас ежедневно.",
      cta: {
        label: "Запросить техническое предложение →",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Готовы создать программное обеспечение для вашего бизнеса?",
      description:
        "Мы проведем аудит текущих процессов и предложим решение с прозрачной бизнес-отдачей.",
      ctaPrimary: {
        label: "Запросить предложение",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Связанные направления",
      links: [
        { label: "Умный E-commerce", href: "/ecommerce-inteligente" },
        { label: "Mind: CRM + ИИ-агент", href: "/mind" },
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Технологии и автоматизация (Хаб)", href: "/tecnologia-automatizacion" },
      ],
    },
  },
};

export function getAplicacionesContent(locale: Locale): ServicePageContent {
  return contentData[locale] || contentData.es;
}
