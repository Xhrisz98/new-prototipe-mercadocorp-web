// content/home.ts
// Copy oficial de la página de Inicio extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface HomeContent {
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
  trust: {
    title: string;
    logos: { name: string; category: string }[];
  };
  pain: {
    title: string;
    intro: string;
    items: { title: string; description: string; tag: string }[];
    ctaText: string;
    ctaLink: string;
  };
  pillars: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: {
      number: string;
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
      badge?: string;
      isMind?: boolean;
    }[];
  };
  methodology: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; description: string }[];
  };
  stats: {
    value: string;
    label: string;
    description: string;
  }[];
  caseStudiesPreview: {
    title: string;
    subtitle: string;
    cta: { label: string; href: string };
    items: {
      client: string;
      pillar: string;
      problem: string;
      solution: string;
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
    ctaSecondary: { label: string; href: string };
  };
}

const contentData: Record<Locale, HomeContent> = {
  es: {
    seo: {
      title: "MercadoCorp | Automatización, IA y Software a Medida para Empresas",
      description:
        "Consultora tecnológica B2B en Ecuador. Agentes de IA, automatización de procesos y software a medida para empresas que quieren escalar sin fricción. Diagnóstico gratis.",
    },
    hero: {
      badge: "Consultoría Tecnológica B2B",
      h1: "Automatice el crecimiento de su empresa con Inteligencia Artificial",
      subheadline:
        "Estrategia y sistema, de la mano. Construimos agentes de IA, automatización y software a la medida de su operación, para que su negocio funcione sin fricción y escale sin depender de más gente.",
      ctaPrimary: {
        label: "Solicitar Diagnóstico Tecnológico Gratuito",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver a Mind en acción",
        href: "/mind",
      },
    },
    trust: {
      title: "Tecnología que ya opera dentro de empresas como la suya.",
      logos: [
        { name: "Next.js", category: "Full-Stack" },
        { name: "Python / AI", category: "Machine Learning" },
        { name: "WhatsApp Business API", category: "Integración" },
        { name: "Shopify / WooCommerce", category: "E-commerce" },
        { name: "OpenAI / Claude", category: "Modelos LLM" },
        { name: "PostgreSQL", category: "Base de Datos" },
      ],
    },
    pain: {
      title: "¿Su empresa crece o solo se vuelve más compleja?",
      intro:
        "Escalar sin automatizar no genera crecimiento, genera caos. Si sus procesos, su CRM y su equipo comercial no hablan el mismo idioma, esto es lo que ya está pasando:",
      items: [
        {
          title: "Caos Operativo",
          description:
            "Información dispersa en hojas de cálculo y WhatsApps personales. Cada persona tiene su versión de la verdad; nadie tiene el control real.",
          tag: "Pérdida de control",
        },
        {
          title: "Ventas que se Enfrían Solas",
          description:
            "Leads que nadie da seguimiento a tiempo porque depende de que alguien \"se acuerde\". El dinero se pierde en el proceso, no en la falta de demanda.",
          tag: "Fuga comercial",
        },
        {
          title: "Tiempo Atrapado en Tareas Repetitivas",
          description:
            "Su equipo hace a mano lo que un agente de IA o un flujo automatizado podría resolver en segundos, 24/7, sin errores.",
          tag: "Inercia manual",
        },
      ],
      ctaText: "¿Le suena familiar? Descubra cómo lo resolvemos",
      ctaLink: "/tecnologia-automatizacion",
    },
    pillars: {
      sectionTitle: "Ecosistema Tecnológico de Tres Pilares",
      sectionSubtitle:
        "Primero estructuramos la base operativa y tecnológica; luego potenciamos su alcance de mercado.",
      items: [
        {
          number: "01",
          title: "Software & Automatización",
          description:
            "Agentes de IA, CRMs a medida, integraciones y automatización de procesos que eliminan el trabajo manual repetitivo.",
          href: "/tecnologia-automatizacion",
          ctaLabel: "Ver Tecnología y Automatización",
          badge: "Pilar Principal",
        },
        {
          number: "02",
          title: "Mind: CRM + Agente de IA",
          description:
            "Nuestro propio producto: un CRM con un agente de ventas por WhatsApp que atiende, asesora y cierra ventas sin descanso.",
          href: "/mind",
          ctaLabel: "Conocer Mind",
          badge: "CRM + IA Flagship",
          isMind: true,
        },
        {
          number: "03",
          title: "Marketing Digital",
          description:
            "Cuando la base tecnológica ya está resuelta, potenciamos cómo el mercado percibe su marca: contenido, branding y eventos.",
          href: "/marketing-digital",
          ctaLabel: "Ver Marketing Digital",
          badge: "Complementario",
        },
      ],
    },
    methodology: {
      title: "Un sistema, no una promesa",
      subtitle:
        "Seis pasos, adaptados a su negocio, para pasar de lo que hoy le duele a un sistema que funciona.",
      steps: [
        {
          number: "01",
          title: "Reunión Inicial",
          description: "Entendemos sus objetivos y su operación actual a fondo.",
        },
        {
          number: "02",
          title: "Auditoría",
          description: "Mapeamos los dolores reales de su negocio: dónde se pierden ventas, tiempo y dinero.",
        },
        {
          number: "03",
          title: "Estrategia",
          description: "Diseñamos la hoja de ruta y la solución a su medida, según lo que su operación realmente necesita.",
        },
        {
          number: "04",
          title: "Ejecución",
          description: "Implementamos con las herramientas y metodologías que su caso exige, sea tecnología, marketing o ambas.",
        },
        {
          number: "05",
          title: "Monitoreo",
          description: "Validamos que funcione en su operación real, no solo en la presentación.",
        },
        {
          number: "06",
          title: "Resultados",
          description: "Reportes, ajuste continuo y escalamiento planificado.",
        },
      ],
    },
    stats: [
      {
        value: "24/7",
        label: "Operación Continua",
        description: "Atención y ventas automatizadas, sin horario",
      },
      {
        value: "100%",
        label: "Trazabilidad",
        description: "Cero leads perdidos por falta de seguimiento",
      },
      {
        value: "Ecuador · LatAm",
        label: "Alcance",
        description: "Presencia y operación remota sin fricción",
      },
      {
        value: "A medida",
        label: "Personalización",
        description: "Construido sobre su operación real, sin plantillas",
      },
    ],
    caseStudiesPreview: {
      title: "Sistemas a la medida, en proyectos reales",
      subtitle:
        "Cada proyecto se construye sobre la operación de la empresa, sin plantillas. Los presentamos por sector.",
      cta: {
        label: "Ver todos los casos de éxito",
        href: "/casos-de-exito",
      },
      items: [
        {
          client: "Sector Deportes y Distribución",
          pillar: "Tecnología & Automatización",
          problem:
            "Un catálogo amplio, con variantes de talla y color, stock cambiante y más de un canal de venta que atender al mismo tiempo.",
          solution:
            "Backend propio con base de datos y una automatización que publica el catálogo del ERP en el marketplace, evita duplicados, cruza el stock real de cada variante y da de baja lo descontinuado.",
        },
        {
          client: "Sector Bienestar y Clases",
          pillar: "Mind: CRM + Agente de IA",
          problem:
            "Responder a tiempo las consultas por WhatsApp y coordinar reservas y clientes sin depender de tareas manuales.",
          solution:
            "Mind a la medida: un CRM propio con agente de IA en WhatsApp, módulo de reservas y la identidad de la marca del cliente, sobre una base de datos aislada.",
        },
        {
          client: "Sector Comercio y Retail",
          pillar: "Marketing Digital",
          problem:
            "Sostener la captación de clientes mes a mes, sin depender de campañas puntuales.",
          solution:
            "Gestión mensual continua de campañas en Meta Ads y Google Ads, con mantenimiento permanente.",
        },
      ],
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle:
        "Todo lo que necesita saber sobre cómo transformamos su negocio con tecnología e IA.",
      items: [
        {
          question: "¿Qué es exactamente un agente de IA y en qué se diferencia de un chatbot?",
          answer:
            "Un chatbot responde preguntas con guiones fijos y botones predeterminados. Un agente de IA entiende contexto, lenguaje natural, consulta su CRM y bases de datos en tiempo real, y puede asesorar, cotizar y guiar una venta de principio a fin, tal como lo haría un ejecutivo de su equipo.",
        },
        {
          question: "¿Cómo se integra Mind con mi negocio actual?",
          answer:
            "Mind se conecta a su WhatsApp Business oficial y centraliza cada conversación en un CRM propio. No reemplaza sus herramientas actuales de un día para otro: se integra gradualmente, empezando por el canal comercial de mayor volumen.",
        },
        {
          question: "¿Trabajan solo en Quito?",
          answer:
            "Nuestra sede principal está en Quito, Ecuador, pero operamos activamente con clientes en Ecuador, Perú y Estados Unidos gracias a procesos de ingeniería y consultoría 100% remotos.",
        },
        {
          question: "¿Mi equipo va a poder usar estas herramientas sin ser \"técnico\"?",
          answer:
            "Sí, absolutamente. Parte integral de nuestro servicio incluye capacitación, manuales interactivos y acompañamiento continuo: no solo implementamos código, educamos a su equipo.",
        },
        {
          question: "¿Cuánto tardamos en ver resultados?",
          answer:
            "La implementación técnica inicial suele tomar semanas, no meses. La maduración y optimización de resultados (aumento de conversiones, horas ahorradas) se evalúa y refina mes a mes.",
        },
      ],
    },
    finalCta: {
      title: "¿Hablamos de automatizar su crecimiento?",
      description:
        "Complete el formulario y agende una Sesión de Diagnóstico Inicial. Le decimos, sin compromiso, si nuestro sistema encaja con lo que necesita.",
      ctaPrimary: {
        label: "Solicitar Diagnóstico",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Escribir por WhatsApp",
        href: "https://wa.me/593983315439",
      },
    },
  },

  en: {
    seo: {
      title: "MercadoCorp | Automation, AI & Custom Software for Enterprises",
      description:
        "B2B tech consultancy in Ecuador. AI agents, process automation, and custom software for companies ready to scale without friction. Free diagnostic.",
    },
    hero: {
      badge: "B2B Tech Consultancy",
      h1: "Automate your company's growth with Artificial Intelligence",
      // Traducción generada, pendiente de revisión nativa (§3.1).
      subheadline:
        "Strategy and system, hand in hand. We build AI agents, automation, and software tailored to your operation, so your business runs without friction and scales without depending on more people.",
      ctaPrimary: {
        label: "Request Free Tech Diagnostic",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "See Mind in action",
        href: "/mind",
      },
    },
    trust: {
      title: "Technology that already operates within companies like yours.",
      logos: [
        { name: "Next.js", category: "Full-Stack" },
        { name: "Python / AI", category: "Machine Learning" },
        { name: "WhatsApp Business API", category: "Integration" },
        { name: "Shopify / WooCommerce", category: "E-commerce" },
        { name: "OpenAI / Claude", category: "LLM Models" },
        { name: "PostgreSQL", category: "Database" },
      ],
    },
    pain: {
      title: "Is your company growing, or just getting more complex?",
      intro:
        "Scaling without automation doesn't build growth; it breeds chaos. If your workflows, CRM, and sales team don't share one single source of truth, here is the reality:",
      items: [
        {
          title: "Operational Chaos",
          description:
            "Fragmented data across spreadsheets and personal WhatsApps. Everyone has their own version; no one owns true control.",
          tag: "Control loss",
        },
        {
          title: "Leads Cooling Down",
          description:
            "Leads abandoned because follow-ups depend on someone \"remembering\". Revenue slips away in execution delays, not lack of demand.",
          tag: "Revenue leak",
        },
        {
          title: "Hours Wasted on Repetitive Tasks",
          description:
            "Your team manually performs tasks an AI agent or automated workflow could solve in seconds, 24/7, error-free.",
          tag: "Manual drag",
        },
      ],
      ctaText: "Sounds familiar? Discover how we fix it",
      ctaLink: "/tecnologia-automatizacion",
    },
    pillars: {
      sectionTitle: "Three-Pillar Technology Ecosystem",
      sectionSubtitle:
        "First we build the operational and technological backbone; then we amplify market reach.",
      items: [
        {
          number: "01",
          title: "Software & Automation",
          description:
            "AI agents, custom CRMs, integrations, and business process automation that eliminate manual grunt work.",
          href: "/tecnologia-automatizacion",
          ctaLabel: "Explore Technology & Automation",
          badge: "Core Pillar",
        },
        {
          number: "02",
          title: "Mind: CRM + AI Agent",
          description:
            "Our flagship product: a dedicated CRM with an AI sales agent over WhatsApp that advises, qualifies, and closes 24/7.",
          href: "/mind",
          ctaLabel: "Discover Mind",
          badge: "Flagship CRM + AI",
          isMind: true,
        },
        {
          number: "03",
          title: "Digital Marketing",
          description:
            "Once technological foundations are resolved, we elevate market perception: content, branding, and event management.",
          href: "/marketing-digital",
          ctaLabel: "Explore Digital Marketing",
          badge: "Complementary",
        },
      ],
    },
    // Traducción generada, pendiente de revisión nativa (§3.1): subtitle y pasos
    // 02-05 (el resto de methodology no cambió).
    methodology: {
      title: "A system, not a promise",
      subtitle:
        "Six steps, tailored to your business, to go from what hurts today to a system that works.",
      steps: [
        {
          number: "01",
          title: "Initial Meeting",
          description: "We thoroughly understand your goals and current operations.",
        },
        {
          number: "02",
          title: "Audit",
          description: "We map your business's real pain points: where sales, time, and money are being lost.",
        },
        {
          number: "03",
          title: "Strategy",
          description: "We design the roadmap and the solution tailored to you, based on what your operation actually needs.",
        },
        {
          number: "04",
          title: "Execution",
          description: "We implement with the tools and methodologies your case requires, whether technology, marketing, or both.",
        },
        {
          number: "05",
          title: "Monitoring",
          description: "We validate that it works in your real operation, not just in the presentation.",
        },
        {
          number: "06",
          title: "Results",
          description: "Reports, continuous adjustment, and planned scaling.",
        },
      ],
    },
    stats: [
      {
        value: "24/7",
        label: "Continuous Operation",
        description: "Automated advisory and sales, with no fixed hours.",
      },
      {
        value: "100%",
        label: "Traceability",
        description: "Zero leads lost due to lack of follow-up.",
      },
      {
        value: "Ecuador · LatAm",
        label: "Reach",
        description: "Seamless remote presence and operation.",
      },
      {
        value: "Bespoke",
        label: "Customization",
        description: "Built around your real operation, no templates.",
      },
    ],
    // Traducción generada, pendiente de revisión nativa (§3.1).
    caseStudiesPreview: {
      title: "Custom-built systems, in real projects",
      subtitle:
        "Each project is built around the company's real operation, with no templates. We present them by sector.",
      cta: {
        label: "View all case studies",
        href: "/casos-de-exito",
      },
      items: [
        {
          client: "Sports & Distribution Sector",
          pillar: "Technology & Automation",
          problem:
            "A wide catalog with size and color variants, shifting stock, and more than one sales channel to manage at the same time.",
          solution:
            "A proprietary backend with its own database and an automation that publishes the ERP catalog to the marketplace, prevents duplicates, cross-checks real stock per variant, and discontinues what's no longer sold.",
        },
        {
          client: "Wellness & Classes Sector",
          pillar: "Mind: CRM + AI Agent",
          problem:
            "Responding to WhatsApp inquiries on time and coordinating bookings and clients without relying on manual tasks.",
          solution:
            "A tailored Mind: a dedicated CRM with an AI agent on WhatsApp, a booking module, and the client's own brand identity, on an isolated database.",
        },
        {
          client: "Retail & Commerce Sector",
          pillar: "Digital Marketing",
          problem:
            "Sustaining customer acquisition month after month, without relying on one-off campaigns.",
          solution:
            "Ongoing monthly management of Meta Ads and Google Ads campaigns, with continuous maintenance.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Everything you need to understand how we transform operations with engineering and AI.",
      items: [
        {
          question: "What is an AI agent, and how does it differ from a chatbot?",
          answer:
            "A traditional chatbot replies using rigid script trees and fixed buttons. An AI agent understands conversational nuance, accesses your CRM and databases in real time, and can consult, quote, and guide a sale from start to finish, just like an executive from your team.",
        },
        {
          question: "How does Mind integrate with our existing stack?",
          answer:
            "Mind links seamlessly to your official WhatsApp Business and routes every interaction into a dedicated CRM. It doesn't disrupt your existing tooling overnight: it deploys gradually, starting with your highest-volume sales channel.",
        },
        {
          question: "Do you only work in Quito?",
          answer:
            "Our headquarters is in Quito, Ecuador, but we work actively with clients in Ecuador, Peru, and the United States thanks to fully remote engineering and consulting processes.",
        },
        {
          question: "Can non-technical teams easily adopt these systems?",
          answer:
            "Yes, absolutely. An integral part of our service includes training, interactive manuals, and continuous support: we don't just implement code, we educate your team.",
        },
        {
          question: "How quickly do we see results?",
          answer:
            "Initial technical implementation usually takes weeks, not months. The maturation and optimization of results (increased conversions, hours saved) is evaluated and refined month by month.",
        },
      ],
    },
    finalCta: {
      title: "Ready to automate your company's growth?",
      description:
        "Schedule a free Initial Diagnostic Session. We'll tell you, with no obligation, whether our system fits what you need.",
      ctaPrimary: {
        label: "Request Diagnostic",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Message on WhatsApp",
        href: "https://wa.me/593983315439",
      },
    },
  },

  ru: {
    seo: {
      title: "MercadoCorp | Автоматизация, ИИ и Заказное ПО для Бизнеса",
      description:
        "B2B технологический консалтинг в Эквадоре. ИИ-агенты, автоматизация процессов и заказное ПО для компаний, готовых масштабироваться без трения. Бесплатный аудит.",
    },
    hero: {
      badge: "B2B Технологический Консалтинг",
      h1: "Автоматизируйте рост вашего бизнеса с помощью Искусственного Интеллекта",
      // Traducción generada, pendiente de revisión nativa (§3.1).
      subheadline:
        "Стратегия и система — рука об руку. Мы создаём ИИ-агентов, автоматизацию и программное обеспечение под вашу операционную модель, чтобы бизнес работал без сбоев и масштабировался, не завися от роста штата.",
      ctaPrimary: {
        label: "Запросить Технологический Аудит",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Посмотреть Mind в действии",
        href: "/mind",
      },
    },
    trust: {
      title: "Технологии, которые уже работают в таких же компаниях, как ваша.",
      logos: [
        { name: "Next.js", category: "Full-Stack" },
        { name: "Python / AI", category: "Machine Learning" },
        { name: "WhatsApp Business API", category: "Интеграции" },
        { name: "Shopify / WooCommerce", category: "E-commerce" },
        { name: "OpenAI / Claude", category: "LLM Модели" },
        { name: "PostgreSQL", category: "Базы Данных" },
      ],
    },
    pain: {
      title: "Ваша компания растет или просто становится сложнее?",
      intro:
        "Масштабирование без автоматизации приводит не к росту, а к операционному хаосу. Если ваши процессы, CRM и отдел продаж не синхронизированы:",
      items: [
        {
          title: "Операционный Хаос",
          description:
            "Данные разбросаны по таблицам и личным чатам WhatsApp. У каждого своя правда, а реального контроля нет.",
          tag: "Потеря контроля",
        },
        {
          title: "Остывающие Лиды",
          description:
            "Потенциальные клиенты теряются, потому что ответ зависит от человеческого фактора. Деньги уходят из-за задержек.",
          tag: "Утечка выручки",
        },
        {
          title: "Рутинная Ручная Работа",
          description:
            "Сотрудники часами вручную выполняют то, что ИИ-агент или автоматизированный процесс решает за секунды, 24/7 и без ошибок.",
          tag: "Рутинный балласт",
        },
      ],
      ctaText: "Знакомая ситуация? Узнайте, как мы это решаем",
      ctaLink: "/tecnologia-automatizacion",
    },
    pillars: {
      sectionTitle: "Трехкомпонентная Технологическая Экосистема",
      sectionSubtitle:
        "Сначала мы выстраиваем стабильную архитектуру и процессы, затем масштабируем охват рынка.",
      items: [
        {
          number: "01",
          title: "ПО и Автоматизация",
          description:
            "ИИ-агенты, заказные CRM-системы, интеграции и сквозная автоматизация повторяющихся бизнес-процессов.",
          href: "/tecnologia-automatizacion",
          ctaLabel: "Технологии и Автоматизация",
          badge: "Основной Столп",
        },
        {
          number: "02",
          title: "Mind: CRM + ИИ-Агент",
          description:
            "Наш флагманский продукт: CRM со встроенным ИИ-агентом в WhatsApp, консультирующим и закрывающим сделки 24/7.",
          href: "/mind",
          ctaLabel: "Узнать о Mind",
          badge: "Флагман CRM + ИИ",
          isMind: true,
        },
        {
          number: "03",
          title: "Цифровой Маркетинг",
          description:
            "Когда технологическая основа готова, мы усиливаем позиционирование: контент-стратегия, брендинг и события.",
          href: "/marketing-digital",
          ctaLabel: "Цифровой Маркетинг",
          badge: "Дополнительно",
        },
      ],
    },
    // Traducción generada, pendiente de revisión nativa (§3.1): subtitle y pasos
    // 02-05 (el resto de methodology no cambió).
    methodology: {
      title: "Система, а не обещания",
      subtitle:
        "Шесть этапов, адаптированных под ваш бизнес, чтобы перейти от сегодняшних проблем к работающей системе.",
      steps: [
        {
          number: "01",
          title: "Первая Встреча",
          description: "Подробно изучаем ваши цели и текущую работу компании.",
        },
        {
          number: "02",
          title: "Аудит",
          description: "Фиксируем реальные болевые точки вашего бизнеса: где теряются продажи, время и деньги.",
        },
        {
          number: "03",
          title: "Стратегия",
          description: "Разрабатываем дорожную карту и решение под ваши задачи, исходя из того, что действительно нужно вашей операции.",
        },
        {
          number: "04",
          title: "Выполнение",
          description: "Внедряем с помощью инструментов и методологий, которые требует именно ваш случай — будь то технологии, маркетинг или оба направления.",
        },
        {
          number: "05",
          title: "Мониторинг",
          description: "Проверяем, что система работает в вашей реальной эксплуатации, а не только на презентации.",
        },
        {
          number: "06",
          title: "Результаты",
          description: "Отчеты, постоянная донастройка и запланированное масштабирование.",
        },
      ],
    },
    stats: [
      {
        value: "24/7",
        label: "Бесперебойная Работа",
        description: "Автоматизированные консультации и продажи без фиксированного графика.",
      },
      {
        value: "100%",
        label: "Прозрачность",
        description: "Ноль потерянных лидов из-за отсутствия сопровождения.",
      },
      {
        value: "Ecuador · LatAm",
        label: "Масштаб",
        description: "Присутствие и удаленная работа без препятствий.",
      },
      {
        value: "Кастомно",
        label: "Индивидуально",
        description: "Разработка под реальные процессы без типовых шаблонов.",
      },
    ],
    // Traducción generada, pendiente de revisión nativa (§3.1).
    caseStudiesPreview: {
      title: "Индивидуальные системы в реальных проектах",
      subtitle:
        "Каждый проект строится вокруг реальной работы компании, без шаблонов. Представляем их по отраслям.",
      cta: {
        label: "Все кейсы компании",
        href: "/casos-de-exito",
      },
      items: [
        {
          client: "Спортивная Розница и Дистрибуция",
          pillar: "Технологии и Автоматизация",
          problem:
            "Широкий каталог с вариантами размера и цвета, меняющиеся остатки и несколько каналов продаж одновременно.",
          solution:
            "Собственный backend с базой данных и автоматизация, которая публикует каталог из ERP на маркетплейсе, исключает дубли, сверяет реальные остатки по каждому варианту и снимает с публикации то, что уже не продаётся.",
        },
        {
          client: "Сектор Оздоровления и Занятий",
          pillar: "Mind: CRM + ИИ-агент",
          problem:
            "Вовремя отвечать на обращения в WhatsApp и координировать бронирования и клиентов без ручных задач.",
          solution:
            "Mind под конкретный бизнес: собственная CRM с ИИ-агентом в WhatsApp, модуль бронирования и фирменный стиль клиента, на изолированной базе данных.",
        },
        {
          client: "Сектор Розничной Торговли",
          pillar: "Цифровой Маркетинг",
          problem:
            "Поддерживать привлечение клиентов месяц за месяцем, не полагаясь на разовые кампании.",
          solution:
            "Постоянное ежемесячное ведение кампаний в Meta Ads и Google Ads с непрерывным сопровождением.",
        },
      ],
    },
    faq: {
      title: "Часто Задаваемые Вопросы",
      subtitle:
        "Все ключевые детали о том, как технологии и ИИ оптимизируют ваш бизнес.",
      items: [
        {
          question: "Чем ИИ-агент отличается от обычного чат-бота?",
          answer:
            "Обычный бот действует по жестким скриптам и кнопкам. ИИ-агент понимает свободный язык, подключается к вашей CRM и базам данных в реальном времени, способен консультировать и вести сделку, как опытный менеджер.",
        },
        {
          question: "Как Mind интегрируется с нашими инструментами?",
          answer:
            "Mind подключается к официальному WhatsApp Business и аккумулирует диалоги в CRM. Внедрение проходит плавно, начиная с наиболее нагруженных каналов.",
        },
        {
          question: "Вы работаете только в Кито?",
          answer:
            "Наш главный офис находится в Кито, Эквадор, но мы активно работаем с клиентами в Эквадоре, Перу и США благодаря на 100% удаленным процессам разработки и консалтинга.",
        },
        {
          question: "Сможет ли команда без технического опыта работать с системой?",
          answer:
            "Да, абсолютно. Неотъемлемая часть нашей услуги включает обучение, интерактивные инструкции и постоянное сопровождение: мы не просто внедряем код, мы обучаем вашу команду.",
        },
        {
          question: "Когда будут первые результаты?",
          answer:
            "Первичное техническое внедрение обычно занимает недели, а не месяцы. Рост результатов (увеличение конверсий, сэкономленные часы) оценивается и дорабатывается каждый месяц.",
        },
      ],
    },
    finalCta: {
      title: "Готовы автоматизировать рост вашей компании?",
      description:
        "Заполните заявку и запишитесь на первичную диагностическую сессию. Мы без обязательств скажем, подходит ли наше решение для того, что вам нужно.",
      ctaPrimary: {
        label: "Запросить Аудит",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Написать в WhatsApp",
        href: "https://wa.me/593983315439",
      },
    },
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return contentData[locale] || contentData.es;
}
