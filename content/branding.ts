// content/branding.ts
// Copy oficial de Estrategia, Creatividad y Branding Personal extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";
import { FeatureItem } from "./aplicaciones";

export interface BrandingPageContent {
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
  dualPillars: {
    sectionTitle: string;
    sectionSubtitle: string;
    paths: {
      category: string;
      title: string;
      body: string;
      points: string[];
    }[];
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: FeatureItem[];
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

const contentData: Record<Locale, BrandingPageContent> = {
  es: {
    seo: {
      title: "Estrategia de Contenido y Branding Personal para Ejecutivos | MercadoCorp",
      description:
        "Identidad de marca, estrategia de contenido y branding personal para empresas y ejecutivos que quieren posicionarse como referentes de su industria.",
    },
    hero: {
      badge: "Marketing Digital · Estrategia & Branding",
      h1: "Su marca dice quién es antes de que usted hable",
      subheadline:
        "Ya sea la marca de su empresa o la suya como líder de industria, construimos la identidad, la narrativa y el contenido que la sostienen en el tiempo — no publicaciones sueltas para llenar un calendario.",
      ctaPrimary: {
        label: "Quiero construir mi marca →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Auditar mi presencia digital",
        href: "/auditoria-digital",
      },
    },
    dualPillars: {
      sectionTitle: "Dos caminos, un mismo pilar",
      sectionSubtitle: "Estrategia de posicionamiento adaptada a la escala de su organización o a su perfil ejecutivo.",
      paths: [
        {
          category: "Para su empresa",
          title: "Estrategia y Creatividad Digital",
          body: "Fusionamos pensamiento estratégico con ejecución creativa: estrategia de contenido, identidad visual digital, producción de piezas, campañas creativas, gestión de comunidad y medición continua. Cada pieza responde a un objetivo, una audiencia y una narrativa — no a llenar un calendario.",
          points: [
            "Estrategia editorial y narrativa corporativa",
            "Identidad visual coherente en todos los canales digitales",
            "Producción audiovisual y gráfica de alta gama",
            "Campañas creativas y gestión de comunidad orientada a conversión",
          ],
        },
        {
          category: "Para usted",
          title: "Branding de Marca Personal",
          body: "Su marca personal es el activo más poderoso de su carrera. Diagnosticamos su presencia actual, definimos su propuesta de valor y arquetipo de marca, construimos su narrativa profesional y le entregamos un plan editorial y una guía de implementación para mantener la consistencia con o sin nosotros.",
          points: [
            "Diagnóstico de reputación y posicionamiento actual",
            "Definición de propuesta de valor y arquetipo ejecutivo",
            "Narrativa profesional y mensajes clave de autoridad",
            "Plan editorial continuo y guías de implementación autónoma",
          ],
        },
      ],
    },
    features: {
      sectionTitle: "Qué Incluye el Servicio",
      sectionSubtitle: "Un proceso metódico que asegura consistencia, diferenciación y relevancia comercial.",
      items: [
        {
          title: "Diagnóstico de marca actual",
          description: "Evaluación rigurosa de la percepción de su marca corporativa o personal en el ecosistema digital actual.",
          tag: "Diagnóstico",
        },
        {
          title: "Definición de identidad",
          description: "Propuesta de valor única, tono de voz institucional o ejecutivo, pilares de contenido y lineamientos de comunicación.",
          tag: "Identidad",
        },
        {
          title: "Narrativa y mensajes clave",
          description: "Articulación de los argumentos diferenciales que posicionan a su marca como referente indiscutible de su sector.",
          tag: "Storytelling",
        },
        {
          title: "Estrategia y calendario multicanal",
          description: "Planificación táctica por plataforma (LinkedIn, Instagram, YouTube, web) orientada a construir audiencia y confianza.",
          tag: "Planificación",
        },
        {
          title: "Producción integral de piezas",
          description: "Diseño gráfico, copywriting persuasivo, guiones de video, reels, carruseles y recursos descargables de alto impacto.",
          tag: "Producción",
        },
        {
          title: "Gestión de comunidad y moderación",
          description: "Interacción estratégica con líderes del sector, respuestas oportunas y fomento activo de relaciones B2B.",
          tag: "Comunidad",
        },
        {
          title: "Medición y optimización continua",
          description: "Monitoreo constante del crecimiento en alcance calificado, reputación y generación de oportunidades de negocio.",
          tag: "Métricas",
        },
      ],
    },
    finalCta: {
      title: "¿Listo para posicionar su marca como referente de la industria?",
      description:
        "Construyamos la autoridad y el contenido que abren puertas comerciales y aceleran relaciones estratégicas.",
      ctaPrimary: {
        label: "Agendar Sesión de Branding",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explorar Más Soluciones",
      links: [
        { label: "Auditoría Digital (Diagnóstico Previo)", href: "/auditoria-digital" },
        { label: "Gestión Integral de Eventos", href: "/gestion-eventos" },
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Marketing Digital (Volver al Hub)", href: "/marketing-digital" },
      ],
    },
  },
  en: {
    seo: {
      title: "Content Strategy & Personal Branding for Executives | MercadoCorp",
      description:
        "Brand identity, content strategy, and executive personal branding for companies and leaders looking to command authority in their industry.",
    },
    hero: {
      badge: "Digital Marketing · Strategy & Branding",
      h1: "Your brand declares who you are before you speak a single word",
      subheadline:
        "Whether it is your company's identity or your own as an industry leader, we craft the brand narrative and content ecosystem that builds long-term authority — never random posts to fill a calendar.",
      ctaPrimary: {
        label: "Build my brand →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Audit my digital presence",
        href: "/auditoria-digital",
      },
    },
    dualPillars: {
      sectionTitle: "Two paths, one foundational pillar",
      sectionSubtitle: "Positioning strategy calibrated for your enterprise or executive leadership profile.",
      paths: [
        {
          category: "For your company",
          title: "Digital Strategy & Creative Direction",
          body: "We combine strategic rigor with creative execution: narrative design, digital visual identity, high-end asset production, campaigns, community management, and continuous optimization. Every piece serves a distinct business goal.",
          points: [
            "Corporate narrative and editorial blueprint",
            "Cohesive visual identity across all digital touchpoints",
            "High-impact graphic and audiovisual production",
            "Targeted campaigns designed for qualified B2B attention",
          ],
        },
        {
          category: "For you as a leader",
          title: "Executive Personal Branding",
          body: "Your personal brand is your career's most valuable asset. We audit your current reputation, define your executive archetype, construct your thought-leadership narrative, and deliver a sustainable editorial blueprint you can lead with confidence.",
          points: [
            "Executive presence and reputation audit",
            "Unique value proposition & leadership archetype",
            "Thought-leadership talking points & key hooks",
            "Ongoing editorial schedule and standalone execution guidelines",
          ],
        },
      ],
    },
    features: {
      sectionTitle: "What the Service Delivers",
      sectionSubtitle: "A structured methodology that drives differentiation, prestige, and commercial trust.",
      items: [
        {
          title: "Current Brand Diagnosis",
          description: "Rigorous audit of brand sentiment, positioning gaps, and competitive whitespace.",
          tag: "Audit",
        },
        {
          title: "Core Identity Definition",
          description: "Value propositions, executive tone of voice, content pillars, and editorial manifestos.",
          tag: "Identity",
        },
        {
          title: "Narrative & Authority Anchors",
          description: "Distinct talking points that position you and your organization as definitive domain experts.",
          tag: "Storytelling",
        },
        {
          title: "Multichannel Editorial Calendar",
          description: "Strategic planning across LinkedIn, web, and social platforms designed to compound attention.",
          tag: "Planning",
        },
        {
          title: "Full-Cycle Asset Production",
          description: "Graphic design, persuasive copy, video scripts, reels, carousels, and whitepapers.",
          tag: "Production",
        },
        {
          title: "Community Growth & Moderation",
          description: "High-value peer interactions, timely engagement, and strategic relationship building.",
          tag: "Community",
        },
        {
          title: "Measurement & Continuous Optimization",
          description: "Tracking qualified reach, thought-leadership citations, and incoming business opportunities.",
          tag: "Metrics",
        },
      ],
    },
    finalCta: {
      title: "Ready to cement your leadership and market authority?",
      description:
        "Let's architect the narrative and high-fidelity content that opens doors to high-value B2B relationships.",
      ctaPrimary: {
        label: "Book Branding Strategy Session",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Explore More Solutions",
      links: [
        { label: "Digital Audit (Recommended Pre-requisite)", href: "/auditoria-digital" },
        { label: "End-to-End Corporate Events", href: "/gestion-eventos" },
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Digital Marketing (Hub)", href: "/marketing-digital" },
      ],
    },
  },
  ru: {
    seo: {
      title: "Контент-стратегия и личный бренд для лидеров | MercadoCorp",
      description:
        "Идентичность бренда, стратегия контента и личный бренд для компаний и топ-менеджеров, стремящихся стать лидерами отрасли.",
    },
    hero: {
      badge: "Цифровой Маркетинг · Стратегия и Брендинг",
      h1: "Ваш бренд говорит о вас еще до того, как вы начнете говорить",
      subheadline:
        "Будь то бренд вашей компании или ваш личный статус эксперта, мы создаем айдентику, нарратив и контент, укрепляющие авторитет — а не случайные посты ради графика.",
      ctaPrimary: {
        label: "Создать сильный бренд →",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Аудит цифрового присутствия",
        href: "/auditoria-digital",
      },
    },
    dualPillars: {
      sectionTitle: "Два пути, один стратегический фундамент",
      sectionSubtitle: "Стратегия позиционирования для масштаба бизнеса или личного авторитета руководителя.",
      paths: [
        {
          category: "Для вашей компании",
          title: "Цифровая стратегия и креатив",
          body: "Мы соединяем системный анализ и креативное исполнение: контент-стратегия, визуальный стиль, медиапроизводство, кампании и постоянная аналитика. Каждый материал работает на конкретную бизнес-цель.",
          points: [
            "Корпоративный нарратив и контентный план",
            "Единая визуальная айдентика во всех цифровых каналах",
            "Премиальный графический и видеоконтент",
            "Целевые креативные кампании для привлечения B2B-клиентов",
          ],
        },
        {
          category: "Для руководителя",
          title: "Личный бренд лидера отрасли",
          body: "Личный бренд — сильнейший нематериальный актив вашей карьеры. Мы диагностируем текущий образ, формулируем экспертное позиционирование и создаем контентный план для уверенного укрепления авторитета.",
          points: [
            "Аудит текущей репутации и позиционирования",
            "Формулирование ценностного предложения и архетипа",
            "Профессиональный нарратив и ключевые тезисы",
            "Редакционный план и руководство по самостоятельному ведению",
          ],
        },
      ],
    },
    features: {
      sectionTitle: "Что входит в услугу",
      sectionSubtitle: "Методичный подход к созданию долгосрочной узнаваемости и экспертного доверия.",
      items: [
        {
          title: "Аудит текущего бренда",
          description: "Оценка восприятия корпоративного или персонального бренда в текущем цифровом поле.",
          tag: "Аудит",
        },
        {
          title: "Определение идентичности",
          description: "Уникальное позиционирование, tone of voice, смысловые столпы и принципы коммуникации.",
          tag: "Айдентика",
        },
        {
          title: "Нарратив и ключевые смыслы",
          description: "Формулирование дифференцирующих аргументов, выделяющих компанию среди конкурентов.",
          tag: "Сторителлинг",
        },
        {
          title: "Мультиканальный контент-план",
          description: "Тактическое планирование в LinkedIn, соцсетях и на сайте для привлечения целевой аудитории.",
          tag: "Планирование",
        },
        {
          title: "Производство медиаматериалов",
          description: "Графический дизайн, убеждающий копирайтинг, видео, сценарии и аналитические обзоры.",
          tag: "Производство",
        },
        {
          title: "Управление сообществом",
          description: "Стратегическое взаимодействие с лидерами мнений и активное развитие B2B-контактов.",
          tag: "Сообщество",
        },
        {
          title: "Метрики и постоянное улучшение",
          description: "Анализ динамики целевого охвата, упоминаемости и входящих деловых запросов.",
          tag: "Метрики",
        },
      ],
    },
    finalCta: {
      title: "Готовы закрепить позицию лидера в вашей индустрии?",
      description:
        "Создадим убедительный нарратив и визуальный стиль, открывающие новые коммерческие возможности.",
      ctaPrimary: {
        label: "Записаться на сессию по брендингу",
        href: "/contacto",
      },
    },
    internalLinks: {
      title: "Связанные направления",
      links: [
        { label: "Цифровой аудит (Предварительный шаг)", href: "/auditoria-digital" },
        { label: "Организация корпоративных событий", href: "/gestion-eventos" },
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Маркетинг (Вернуться в Хаб)", href: "/marketing-digital" },
      ],
    },
  },
};

export function getBrandingContent(locale: Locale): BrandingPageContent {
  return contentData[locale] || contentData.es;
}
