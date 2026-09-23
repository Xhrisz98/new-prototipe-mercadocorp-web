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
  reasoningBlock: {
    badge: string;
    title: string;
    body: string;
    cta: { label: string; href: string };
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
    reasoningBlock: {
      badge: "¿Y si ya tengo una agencia?",
      title: "¿No es esto lo mismo que ya hacía la agencia de siempre?",
      body: "No. La diferencia no es el contenido, es lo que hay detrás: cada pieza responde a una estrategia de datos, no a un calendario que hay que llenar. Y si ya resolvió la parte tecnológica con nosotros, esta capa se conecta directo con lo que el CRM y los agentes ya saben de sus clientes — algo que una agencia de marketing tradicional no puede hacer.",
      cta: {
        label: "Hablar de mi marca",
        href: "/contacto",
      },
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
        "Whether it is your company's brand or your own as an industry leader, we build the identity, narrative, and content that sustain it over time — not random posts just to fill a calendar.",
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
          title: "Digital Strategy & Creativity",
          body: "We combine strategic thinking with creative execution: content strategy, digital visual identity, asset production, creative campaigns, community management, and continuous measurement. Every piece serves an objective, an audience, and a narrative — not just to fill a calendar.",
          points: [
            "Editorial strategy and corporate narrative",
            "Cohesive visual identity across all digital channels",
            "High-end audiovisual and graphic production",
            "Creative campaigns and community management focused on conversion",
          ],
        },
        {
          category: "For you",
          title: "Personal Branding",
          body: "Your personal brand is your career's most powerful asset. We assess your current presence, define your value proposition and brand archetype, build your professional narrative, and deliver an editorial plan and an implementation guide so you can stay consistent with or without us.",
          points: [
            "Diagnosis of reputation and current positioning",
            "Value proposition and executive archetype definition",
            "Professional narrative and key authority messages",
            "Ongoing editorial plan and self-implementation guidelines",
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
          description: "Rigorous evaluation of how your corporate or personal brand is currently perceived across the digital ecosystem.",
          tag: "Audit",
        },
        {
          title: "Identity Definition",
          description: "Unique value proposition, institutional or executive tone of voice, content pillars, and communication guidelines.",
          tag: "Identity",
        },
        {
          title: "Narrative & Key Messages",
          description: "Articulation of the differentiating arguments that position your brand as the undisputed reference in your sector.",
          tag: "Storytelling",
        },
        {
          title: "Multichannel Strategy & Calendar",
          description: "Tactical planning by platform (LinkedIn, Instagram, YouTube, web) aimed at building audience and trust.",
          tag: "Planning",
        },
        {
          title: "Full Asset Production",
          description: "Graphic design, persuasive copywriting, video scripts, reels, carousels, and high-impact downloadable resources.",
          tag: "Production",
        },
        {
          title: "Community Management & Moderation",
          description: "Strategic interaction with industry leaders, timely responses, and active B2B relationship building.",
          tag: "Community",
        },
        {
          title: "Measurement & Continuous Optimization",
          description: "Constant monitoring of growth in qualified reach, reputation, and new business opportunities.",
          tag: "Metrics",
        },
      ],
    },
    reasoningBlock: {
      badge: "What if I already have an agency?",
      title: "Isn't this the same as what my usual agency already does?",
      body: "No. The difference isn't the content, it's what's behind it: every piece responds to a data strategy, not a calendar that needs filling. And if you've already solved the technology side with us, this layer connects directly with what the CRM and the agents already know about your clients — something a traditional marketing agency can't do.",
      cta: {
        label: "Talk About My Brand",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Ready to position your brand as an industry reference?",
      description:
        "Let's build the authority and content that open commercial doors and accelerate strategic relationships.",
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
        "Будь то бренд вашей компании или ваш личный бренд как лидера отрасли, мы создаем айдентику, нарратив и контент, которые поддерживают его во времени — а не случайные посты ради заполнения графика.",
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
          body: "Мы соединяем стратегическое мышление и креативное исполнение: контент-стратегия, визуальная айдентика, производство материалов, креативные кампании, управление сообществом и постоянная аналитика. Каждый материал работает на конкретную цель, аудиторию и нарратив — а не просто заполняет график.",
          points: [
            "Редакционная стратегия и корпоративный нарратив",
            "Единая визуальная айдентика во всех цифровых каналах",
            "Премиальное аудиовизуальное и графическое производство",
            "Креативные кампании и управление сообществом, ориентированные на конверсию",
          ],
        },
        {
          category: "Для вас",
          title: "Личный брендинг",
          body: "Ваш личный бренд — самый мощный актив вашей карьеры. Мы диагностируем ваше текущее присутствие, определяем ценностное предложение и архетип бренда, выстраиваем ваш профессиональный нарратив и предоставляем редакционный план и руководство по внедрению, чтобы вы могли сохранять последовательность с нами или без нас.",
          points: [
            "Аудит текущей репутации и позиционирования",
            "Формулирование ценностного предложения и архетипа руководителя",
            "Профессиональный нарратив и ключевые сообщения об авторитете",
            "Постоянный редакционный план и руководство по самостоятельному ведению",
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
          description: "Уникальное ценностное предложение, институциональный или руководительский тон общения, смысловые столпы контента и принципы коммуникации.",
          tag: "Айдентика",
        },
        {
          title: "Нарратив и ключевые смыслы",
          description: "Формулирование отличительных аргументов, которые позиционируют вашу компанию как безусловного лидера в своей отрасли.",
          tag: "Сторителлинг",
        },
        {
          title: "Мультиканальная стратегия и план",
          description: "Тактическое планирование по платформам (LinkedIn, Instagram, YouTube, сайт), направленное на рост аудитории и доверия.",
          tag: "Планирование",
        },
        {
          title: "Полное производство материалов",
          description: "Графический дизайн, убедительный копирайтинг, сценарии видео, рилсы, карусели и эффективные материалы для скачивания.",
          tag: "Производство",
        },
        {
          title: "Управление сообществом и модерация",
          description: "Стратегическое взаимодействие с лидерами отрасли, своевременные ответы и активное развитие B2B-отношений.",
          tag: "Сообщество",
        },
        {
          title: "Метрики и постоянное улучшение",
          description: "Постоянный мониторинг роста квалифицированного охвата, репутации и генерации деловых возможностей.",
          tag: "Метрики",
        },
      ],
    },
    reasoningBlock: {
      badge: "А если у меня уже есть агентство?",
      title: "Разве это не то же самое, что уже делает моё обычное агентство?",
      body: "Нет. Разница не в контенте, а в том, что стоит за ним: каждый материал отвечает стратегии на основе данных, а не календарю, который нужно заполнять. А если вы уже решили технологическую часть с нами, этот слой напрямую подключается к тому, что CRM и агенты уже знают о ваших клиентах — то, чего традиционное маркетинговое агентство сделать не может.",
      cta: {
        label: "Обсудить мой бренд",
        href: "/contacto",
      },
    },
    finalCta: {
      title: "Готовы закрепить позицию лидера в вашей индустрии?",
      description:
        "Создадим авторитет и контент, которые открывают двери для бизнеса и ускоряют стратегические отношения.",
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
