// content/ecommerce.ts
// Copy oficial de E-commerce Inteligente extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";
import { ServicePageContent } from "./aplicaciones";

const contentData: Record<Locale, ServicePageContent> = {
  es: {
    seo: {
      title: "E-commerce con Inteligencia Artificial y Automatización | MercadoCorp",
      description:
        "Diseñamos y potenciamos tiendas en línea con IA: agente de ventas integrado, automatización de pedidos y analítica comercial. Venda 24/7, con menos fricción.",
    },
    hero: {
      badge: "Tecnología & Automatización · E-commerce Inteligente",
      h1: "Su tienda en línea, vendiendo incluso cuando usted no está",
      subheadline:
        "Tener una tienda ya no es suficiente. Integramos IA, automatización y estrategia comercial en un solo ecosistema diseñado para convertir visitas en clientes, y clientes en compradores recurrentes.",
      ctaPrimary: {
        label: "Quiero potenciar mi tienda",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Auditar mi tienda actual",
        href: "/auditoria-digital",
      },
    },
    features: {
      sectionTitle: "Ecosistema de Comercio Electrónico Inteligente",
      sectionSubtitle:
        "Infraestructura orientada a conversión, retención y automatización integral de punta a punta.",
      items: [
        {
          title: "Diseño y desarrollo orientado a conversión",
          description:
            "Arquitectura UX/UI pensada para vender, catálogo de productos, pasarelas de pago y configuración técnica completa — no una plantilla genérica de tienda.",
          tag: "UX/UI & CRO",
        },
        {
          title: "Agente de ventas Mind integrado",
          description:
            "Un asistente con IA que atiende, asesora y cierra ventas en tiempo real dentro de su propia tienda, sin depender de que haya alguien humano conectado.",
          tag: "Mind · Agente de IA",
          isAi: true,
        },
        {
          title: "Automatización de procesos",
          description:
            "Gestión de pedidos, seguimiento de carritos abandonados, notificaciones automáticas y flujos de recompra — todo funcionando sin intervención manual.",
          tag: "Automatización",
        },
        {
          title: "Estrategia de tráfico y conversión",
          description:
            "Campañas de Meta Ads y Google Ads orientadas a ventas, segmentadas por comportamiento e intención real de compra.",
          tag: "Pauta & Tráfico",
        },
        {
          title: "Analítica e inteligencia comercial",
          description:
            "Dashboard de métricas clave: productos más vendidos, comportamiento del cliente y recomendaciones de optimización continua.",
          tag: "Data & BI",
        },
        {
          title: "Integraciones con plataformas líderes del mercado",
          description:
            "Conectamos su tienda con las plataformas de ecommerce y ERPs más usados del sector, según lo que su operación ya utilice.",
          tag: "Integraciones ERP",
        },
      ],
    },
    reasoningBlock: {
      badge: "Recuperación de Carritos",
      title: "Cada carrito abandonado sin seguimiento es una venta que ya pagó por atraer",
      body: "La mayoría de tiendas online pierden entre el 60-70% de sus carritos. Automatizar el seguimiento no es un lujo, es recuperar presupuesto de marketing que ya se gastó.",
      cta: {
        label: "Auditar mi tienda actual",
        href: "/auditoria-digital",
      },
    },
    finalCta: {
      title: "¿Listo para multiplicar las ventas de su tienda en línea?",
      description:
        "Diseñamos sistemas de e-commerce que operan 24/7 con agentes inteligentes, menos fricción y mayor ticket promedio.",
      ctaPrimary: {
        label: "Solicitar Diagnóstico para Mi Tienda",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Antes de enviar, explore nuestro ecosistema",
      links: [
        { label: "Aplicaciones y Herramientas Digitales", href: "/aplicaciones-herramientas-digitales" },
        { label: "Mind: CRM + Agente de IA", href: "/mind" },
        { label: "Auditoría Digital (Diagnóstico Gratuito)", href: "/auditoria-digital" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
      ],
    },
  },
  en: {
    seo: {
      title: "E-commerce with Artificial Intelligence and Automation | MercadoCorp",
      description:
        "We build and scale online stores with integrated AI: sales agents, order automation, and commercial analytics. Sell 24/7, with less friction.",
    },
    hero: {
      badge: "Technology & Automation · Intelligent E-commerce",
      h1: "Your online store, closing sales even while you rest",
      subheadline:
        "Having a simple store is no longer enough. We merge AI, process automation, and commercial strategy into an ecosystem designed to turn visitors into buyers and buyers into repeat clients.",
      ctaPrimary: {
        label: "Supercharge my store",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Audit my current store",
        href: "/auditoria-digital",
      },
    },
    features: {
      sectionTitle: "Intelligent E-commerce Ecosystem",
      sectionSubtitle:
        "Conversion-focused architecture, automated recovery, and seamless operational integrations.",
      items: [
        {
          title: "Conversion-Focused UX/UI Design & Development",
          description:
            "UX/UI architecture designed to sell, product catalog, payment gateways, and complete technical setup — not a generic store template.",
          tag: "UX/UI & CRO",
        },
        {
          title: "Integrated Mind AI Sales Agent",
          description:
            "An AI assistant that engages with, advises, and closes sales in real time right inside your own store, without depending on a human being connected.",
          tag: "Mind · AI Agent",
          isAi: true,
        },
        {
          title: "Process Automation",
          description:
            "Order management, abandoned cart follow-up, automatic notifications, and repurchase workflows — all running without manual intervention.",
          tag: "Automation",
        },
        {
          title: "Traffic & Conversion Strategy",
          description:
            "Meta Ads and Google Ads campaigns focused on sales, segmented by behavior and real purchase intent.",
          tag: "Paid Traffic",
        },
        {
          title: "Commercial Analytics & Insights",
          description:
            "Dashboard of key metrics: top-selling products, customer behavior, and continuous optimization recommendations.",
          tag: "Data & BI",
        },
        {
          title: "Integrations with Leading Market Platforms",
          description:
            "We connect your store with the ecommerce platforms and ERPs most used in the industry, based on what your operation already uses.",
          tag: "ERP Integrations",
        },
      ],
    },
    reasoningBlock: {
      badge: "Cart Recovery",
      title: "Every unrecovered abandoned cart is a sale you already paid to attract",
      body: "Most online stores lose between 60-70% of their carts. Automating follow-up is not a luxury — it's recovering marketing budget you already spent.",
      cta: {
        label: "Audit my current store",
        href: "/auditoria-digital",
      },
    },
    finalCta: {
      title: "Ready to multiply your online store's sales?",
      description:
        "We design e-commerce systems that operate 24/7 with intelligent agents, less friction, and a higher average order value.",
      ctaPrimary: {
        label: "Schedule Store Diagnostic",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Before you submit, explore our ecosystem",
      links: [
        { label: "Custom Applications & Tools", href: "/aplicaciones-herramientas-digitales" },
        { label: "Mind: CRM + AI Agent", href: "/mind" },
        { label: "Digital Audit (Complimentary)", href: "/auditoria-digital" },
        { label: "Case Studies", href: "/casos-de-exito" },
      ],
    },
  },
  ru: {
    seo: {
      title: "E-commerce с искусственным интеллектом и автоматизацией | MercadoCorp",
      description:
        "Создаем и масштабируем интернет-магазины с ИИ: встроенный продавец, автоматизация заказов и коммерческая аналитика. Продажи 24/7, с меньшим трением.",
    },
    hero: {
      badge: "Технологии и Автоматизация · Умный E-commerce",
      h1: "Ваш интернет-магазин продает даже тогда, когда вы отдыхаете",
      subheadline:
        "Просто витрины уже недостаточно. Мы объединяем ИИ, автоматизацию процессов и коммерческую стратегию в единую экосистему для постоянного роста повторных покупок.",
      ctaPrimary: {
        label: "Масштабировать мой магазин",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Провести аудит магазина",
        href: "/auditoria-digital",
      },
    },
    features: {
      sectionTitle: "Экосистема умной электронной коммерции",
      sectionSubtitle:
        "Архитектура с фокусом на конверсию, сквозную автоматизацию и удержание клиентов.",
      items: [
        {
          title: "UX/UI и разработка под конверсию",
          description:
            "Интерфейс, спроектированный для продаж, удобный каталог, платежные шлюзы и быстрая техническая база.",
          tag: "UX/UI & CRO",
        },
        {
          title: "Встроенный агент продаж Mind с ИИ",
          description:
            "Ассистент с искусственным интеллектом, консультирующий клиентов и закрывающий сделки круглосуточно.",
          tag: "Mind · ИИ-агент",
          isAi: true,
        },
        {
          title: "Автоматизация процессов и заказов",
          description:
            "Обработка заказов, возвращение брошенных корзин, уведомления и повторные продажи без ручной работы.",
          tag: "Автоматизация",
        },
        {
          title: "Стратегия целевого трафика и продаж",
          description:
            "Рекламные кампании в Meta Ads и Google Ads, нацеленные на реальную окупаемость инвестиций (ROAS).",
          tag: "Трафик и Реклама",
        },
        {
          title: "Коммерческая аналитика и метрики",
          description:
            "Дашборды ключевых показателей: самые продаваемые товары, поведение покупателей и рекомендации по постоянной оптимизации.",
          tag: "Data & BI",
        },
        {
          title: "Интеграции с ведущими платформами рынка",
          description:
            "Подключаем ваш магазин к самым распространенным в отрасли платформам электронной коммерции и ERP-системам, в зависимости от того, что уже использует ваш бизнес.",
          tag: "Интеграции ERP",
        },
      ],
    },
    reasoningBlock: {
      badge: "Возврат брошенных корзин",
      title: "Каждая брошенная корзина без напоминания — это потерянные деньги на рекламу",
      body: "В большинстве интернет-магазинов бросают 60-70% начатых покупок. Автоматизация возврата — это не роскошь, а прямой возврат уже вложенного рекламного бюджета.",
      cta: {
        label: "Провести аудит моего магазина",
        href: "/auditoria-digital",
      },
    },
    finalCta: {
      title: "Готовы кратно увеличить продажи вашего магазина?",
      description:
        "Мы создаем e-commerce экосистемы с поддержкой ИИ, быстрым чекаутом и стабильным средним чеком.",
      ctaPrimary: {
        label: "Запросить аудит магазина",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Прежде чем отправить, изучите нашу экосистему",
      links: [
        { label: "Индивидуальные веб-приложения", href: "/aplicaciones-herramientas-digitales" },
        { label: "Mind: CRM + ИИ-агент", href: "/mind" },
        { label: "Цифровой аудит (Бесплатно)", href: "/auditoria-digital" },
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
      ],
    },
  },
};

export function getEcommerceContent(locale: Locale): ServicePageContent {
  return contentData[locale] || contentData.es;
}
