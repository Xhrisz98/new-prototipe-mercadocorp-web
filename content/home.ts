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
        "Dejamos de vender \"estrategias\". Construimos el sistema de agentes de IA, automatización y software que hace que su negocio opere sin fricción — y sin depender de más gente para escalar.",
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
      ctaText: "¿Le suena familiar? → Descubra cómo lo resolvemos",
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
          ctaLabel: "Ver Tecnología y Automatización →",
          badge: "Pilar Principal",
        },
        {
          number: "02",
          title: "Mind: CRM + Agente de IA",
          description:
            "Nuestro propio producto: un CRM con un agente de ventas por WhatsApp que atiende, asesora y cierra ventas sin descanso.",
          href: "/mind",
          ctaLabel: "Conocer Mind →",
          badge: "CRM + IA Flagship",
          isMind: true,
        },
        {
          number: "03",
          title: "Marketing Digital",
          description:
            "Cuando la base tecnológica ya está resuelta, potenciamos cómo el mercado percibe su marca: contenido, branding y eventos.",
          href: "/marketing-digital",
          ctaLabel: "Ver Marketing Digital →",
          badge: "Complementario",
        },
      ],
    },
    methodology: {
      title: "Un sistema, no una promesa",
      subtitle:
        "Metodología probada en 6 pasos para transformar su operación con precisión técnica.",
      steps: [
        {
          number: "01",
          title: "Reunión Inicial",
          description: "Entendemos sus objetivos y su operación actual a fondo.",
        },
        {
          number: "02",
          title: "Auditoría",
          description: "Diagnóstico técnico para encontrar dónde se pierde tiempo y dinero.",
        },
        {
          number: "03",
          title: "Estrategia",
          description: "Hoja de ruta y arquitectura de la solución (software o automatización).",
        },
        {
          number: "04",
          title: "Ejecución",
          description: "Desarrollo e implementación con precisión técnica y código a medida.",
        },
        {
          number: "05",
          title: "Monitoreo",
          description: "Validamos que el sistema funcione en producción, no solo en la demo.",
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
      title: "El impacto de un sistema bien construido",
      subtitle:
        "Resultados reales de empresas que decidieron dejar de operar con parches y construir un sistema que trabaja para ellas.",
      cta: {
        label: "Ver todos los casos de éxito →",
        href: "/casos-de-exito",
      },
      items: [
        {
          client: "Sector Retail & Distribución",
          pillar: "E-commerce Inteligente",
          problem: "Carritos abandonados y pedidos que tardaban horas en procesarse.",
          solution:
            "Integración de tienda con agente conversacional para asesoría en vivo y automatización de checkout vía WhatsApp.",
        },
        {
          client: "Servicios Corporativos B2B",
          pillar: "Software a Medida",
          problem: "Silos de información entre cotizaciones comerciales y facturación interna.",
          solution:
            "CRM y gestor de operaciones personalizado con sincronización de inventario en tiempo real.",
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
      subheadline:
        "We no longer sell \"strategies\". We build the system of AI agents, automation, and software that makes your business operate without friction — without depending on more people to scale.",
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
      ctaText: "Sounds familiar? → Discover how we fix it",
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
          ctaLabel: "Explore Technology & Automation →",
          badge: "Core Pillar",
        },
        {
          number: "02",
          title: "Mind: CRM + AI Agent",
          description:
            "Our flagship product: a dedicated CRM with an AI sales agent over WhatsApp that advises, qualifies, and closes 24/7.",
          href: "/mind",
          ctaLabel: "Discover Mind →",
          badge: "Flagship CRM + AI",
          isMind: true,
        },
        {
          number: "03",
          title: "Digital Marketing",
          description:
            "Once technological foundations are resolved, we elevate market perception: content, branding, and event management.",
          href: "/marketing-digital",
          ctaLabel: "Explore Digital Marketing →",
          badge: "Complementary",
        },
      ],
    },
    methodology: {
      title: "A system, not a promise",
      subtitle:
        "A proven 6-step engineering methodology to transform your operations with technical precision.",
      steps: [
        {
          number: "01",
          title: "Initial Meeting",
          description: "We thoroughly understand your goals and current operations.",
        },
        {
          number: "02",
          title: "Audit",
          description: "Technical diagnostic to find where time and money are being lost.",
        },
        {
          number: "03",
          title: "Strategy",
          description: "Roadmap and solution architecture (software or automation).",
        },
        {
          number: "04",
          title: "Execution",
          description: "Development and implementation with technical precision and custom code.",
        },
        {
          number: "05",
          title: "Monitoring",
          description: "We validate that the system works in production, not just in the demo.",
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
    caseStudiesPreview: {
      title: "The tangible impact of engineered systems",
      subtitle:
        "Real transformations from companies that stopped band-aiding operations and built systems that work for them.",
      cta: {
        label: "View all case studies →",
        href: "/casos-de-exito",
      },
      items: [
        {
          client: "Retail & Distribution Sector",
          pillar: "Smart E-commerce",
          problem: "Abandoned carts and orders that took hours to process.",
          solution:
            "Store integrated with a conversational agent for live assistance and WhatsApp checkout automation.",
        },
        {
          client: "B2B Corporate Services",
          pillar: "Custom Software",
          problem: "Information silos between commercial quotes and internal invoicing.",
          solution:
            "Custom CRM and operations manager with real-time inventory synchronization.",
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
      subheadline:
        "Мы больше не продаем «стратегии». Мы создаем систему ИИ-агентов, автоматизации и программного обеспечения, которая позволяет вашему бизнесу работать без сбоев — и масштабироваться, не завися от увеличения штата.",
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
      ctaText: "Знакомая ситуация? → Узнайте, как мы это решаем",
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
          ctaLabel: "Технологии и Автоматизация →",
          badge: "Основной Столп",
        },
        {
          number: "02",
          title: "Mind: CRM + ИИ-Агент",
          description:
            "Наш флагманский продукт: CRM со встроенным ИИ-агентом в WhatsApp, консультирующим и закрывающим сделки 24/7.",
          href: "/mind",
          ctaLabel: "Узнать о Mind →",
          badge: "Флагман CRM + ИИ",
          isMind: true,
        },
        {
          number: "03",
          title: "Цифровой Маркетинг",
          description:
            "Когда технологическая основа готова, мы усиливаем позиционирование: контент-стратегия, брендинг и события.",
          href: "/marketing-digital",
          ctaLabel: "Цифровой Маркетинг →",
          badge: "Дополнительно",
        },
      ],
    },
    methodology: {
      title: "Система, а не обещания",
      subtitle:
        "Проверенная 6-этапная методология внедрения для трансформации бизнеса с инженерной точностью.",
      steps: [
        {
          number: "01",
          title: "Первая Встреча",
          description: "Подробно изучаем ваши цели и текущую работу компании.",
        },
        {
          number: "02",
          title: "Аудит",
          description: "Технический диагноз, чтобы найти, где теряются время и деньги.",
        },
        {
          number: "03",
          title: "Стратегия",
          description: "Дорожная карта и архитектура решения (ПО или автоматизация).",
        },
        {
          number: "04",
          title: "Выполнение",
          description: "Разработка и внедрение с технической точностью и кодом под ваши задачи.",
        },
        {
          number: "05",
          title: "Мониторинг",
          description: "Проверяем, что система работает в реальной эксплуатации, а не только в демо-версии.",
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
    caseStudiesPreview: {
      title: "Эффект продуманных цифровых систем",
      subtitle:
        "Реальные кейсы компаний, которые отказались от временных заплаток в пользу работающей системы.",
      cta: {
        label: "Все кейсы компании →",
        href: "/casos-de-exito",
      },
      items: [
        {
          client: "Розничные Сети и Дистрибуция",
          pillar: "Умный E-commerce",
          problem: "Брошенные корзины и заказы, обработка которых занимала часы.",
          solution:
            "Интеграция магазина с диалоговым агентом для консультаций в реальном времени и автоматизации оформления заказа через WhatsApp.",
        },
        {
          client: "Корпоративные B2B Услуги",
          pillar: "Заказное ПО",
          problem: "Информационная разобщенность между коммерческими предложениями и внутренним выставлением счетов.",
          solution:
            "Кастомная CRM и система управления операциями с синхронизацией склада в реальном времени.",
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
