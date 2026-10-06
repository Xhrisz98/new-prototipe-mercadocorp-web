// content/nosotros.ts
// Copy oficial de Nosotros extraído de copywriting-nueva-web-mercadocorp.md
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface NosotrosPageContent {
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
  history: {
    label: string;
    title: string;
    paragraphs: string[];
    imageAlt: string;
  };
  dualSpecialization: {
    title: string;
    subtitle: string;
    pillars: {
      name: string;
      description: string;
      href: string;
    }[];
  };
  philosophy: {
    title: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  trajectory: {
    label: string;
    titlePrefix: string;
    /** Única palabra resaltada en azul de marca dentro del título. */
    titleHighlight: string;
    tablistLabel: string;
    /** Arreglo de años — agregar 2025 cuando haya contenido real es añadir un
     *  elemento aquí, sin tocar TrajectoryTabs. */
    years: {
      year: string;
      /** Insignia de estado ("Hito" para años ya cerrados, "Visión"/"Proyección"
       *  para años futuros) — nunca se presenta un año futuro como logro. */
      badge: string;
      milestones: { title: string; description: string }[];
    }[];
  };
  finalCta: {
    title: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  internalLinks: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const contentData: Record<Locale, NosotrosPageContent> = {
  es: {
    seo: {
      title: "Sobre MercadoCorp | Consultora Tecnológica B2B en Ecuador",
      description:
        "Conozca la historia, filosofía y trayectoria de MercadoCorp: de agencia de marketing a consultora tecnológica especializada en automatización e IA para empresas.",
    },
    hero: {
      badge: "Nuestra Identidad y Visión B2B",
      h1: "No creemos en soluciones mágicas. Creemos en construir, paso a paso.",
      subheadline:
        "Nacimos para integrar, innovar y escalar junto a empresas que están dispuestas a construir un sistema real, no una campaña puntual.",
      ctaPrimary: {
        label: "Conocer nuestro trabajo",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Hablemos de su empresa",
        href: "/contacto",
      },
    },
    history: {
      label: "Sobre nosotros",
      title: "Nuestra historia",
      paragraphs: [
        "MercadoCorp surge como una respuesta estratégica a una necesidad concreta del mercado: estructurar el marketing como un eje de crecimiento empresarial, no únicamente como una herramienta de comunicación.",
        "Nuestra trayectoria comenzó impulsando a una marca referente del sector deportivo en su proceso de profesionalización. Aplicamos una estructura de negocio donde la planificación y el rendimiento dictan cada movimiento, transformando su visión en resultados tangibles.",
        "A partir de la sólida experiencia de sus socios fundadores en gestión corporativa, ampliamos nuestro alcance hacia el segmento B2B. Hoy atendemos a organizaciones que buscan evolucionar su modelo comercial mediante una transformación digital estructurada, medible y alineada a objetivos estratégicos, con la tecnología y la automatización como base y el marketing digital como complemento.",
      ],
      imageAlt: "Fachada de vidrio azul de un edificio corporativo, vista en ángulo ascendente",
    },
    dualSpecialization: {
      title: "Especialización Dual",
      subtitle: "Un enfoque balanceado para resolver tanto la infraestructura operativa como la percepción de marca.",
      pillars: [
        {
          name: "Tecnología & Automatización",
          description: "Automatización de procesos, agentes de IA, CRMs personalizados y software a medida para escalar sin fricción.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Marketing Digital",
          description: "Contenido estratégico, branding ejecutivo y gestión de eventos cuando la base operativa ya está resuelta.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Nuestra Filosofía de Trabajo",
      values: [
        {
          title: "Estrategia Integral",
          description: "No implementamos herramientas aisladas; concebimos la empresa como un sistema vivo interconectado.",
        },
        {
          title: "Innovación Constante",
          description: "Exploramos, probamos y adaptamos tecnologías emergentes y agentes de IA antes de recomendarlos a clientes.",
        },
        {
          title: "Sinergia y Colaboración",
          description: "Trabajamos integrados a los equipos de nuestros clientes para transferir conocimiento y capacidades reales.",
        },
      ],
    },
    trajectory: {
      label: "Nuestra trayectoria",
      titlePrefix: "Evolución y ",
      titleHighlight: "proyección",
      tablistLabel: "Seleccionar año de trayectoria",
      years: [
        {
          year: "2025",
          badge: "Hito",
          milestones: [
            {
              title: "Integración de IA",
              description:
                "Implementación de herramientas de Inteligencia Artificial para optimizar procesos de análisis y generación de contenido estratégico.",
            },
            {
              title: "Fortalecimiento Digital",
              description:
                "Desarrollo de ecosistemas digitales robustos enfocados en la captación y trazabilidad de leads B2B calificados.",
            },
          ],
        },
        {
          year: "2026",
          badge: "Visión",
          milestones: [
            {
              title: "Especialización sectorial",
              description:
                "Liderazgo en sectores industriales que demandan procesos digitales complejos, automatización avanzada y RevOps.",
            },
            {
              title: "Expansión Latam",
              description:
                "Apertura de operaciones regionales, exportando nuestro modelo de consultoría estratégica a nuevos mercados latinoamericanos.",
            },
          ],
        },
        {
          year: "2027",
          badge: "Proyección",
          milestones: [
            {
              title: "Mind a escala",
              description:
                "Llevar Mind, nuestro CRM con agente de IA, a más empresas: un producto propio, construido para crecer junto a sus clientes.",
            },
            {
              title: "Liderazgo local con dos pilares",
              description:
                "Consolidar nuestro posicionamiento en Ecuador integrando ambos pilares de la mano: tecnología y automatización como base, marketing digital como amplificador.",
            },
          ],
        },
      ],
    },
    finalCta: {
      title: "¿Listo para construir un sistema real para su negocio?",
      description:
        "Conversemos sobre su operación actual y cómo la automatización e inteligencia artificial pueden acelerar su crecimiento.",
      ctaPrimary: {
        label: "Solicitar Diagnóstico",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Ver Casos de Éxito",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Antes de enviar, explore nuestro ecosistema",
      links: [
        { label: "Casos de Éxito", href: "/casos-de-exito" },
        { label: "Tecnología & Automatización", href: "/tecnologia-automatizacion" },
        { label: "Contacto Directo", href: "/contacto" },
        { label: "Marketing Digital", href: "/marketing-digital" },
      ],
    },
  },
  en: {
    seo: {
      title: "About MercadoCorp | B2B Technology Consultancy in Ecuador",
      description:
        "Learn about MercadoCorp's history, philosophy, and trajectory: from a marketing agency to a technology consultancy specialized in automation and AI for businesses.",
    },
    hero: {
      badge: "Our Identity and B2B Vision",
      h1: "We don't believe in magic solutions. We believe in building, step by step.",
      subheadline:
        "We were born to integrate, innovate, and scale alongside companies willing to build a real system, not a one-off campaign.",
      ctaPrimary: {
        label: "Get to know our work",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Let's talk about your company",
        href: "/contacto",
      },
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    history: {
      label: "About us",
      title: "Our story",
      paragraphs: [
        "MercadoCorp emerged as a strategic response to a concrete market need: structuring marketing as a driver of business growth, not merely as a communication tool.",
        "Our journey began by guiding a leading sports-sector brand through its professionalization process. We applied a business structure where planning and performance dictate every move, turning its vision into tangible results.",
        "Building on our founding partners' solid experience in corporate management, we expanded our reach into the B2B segment. Today we serve organizations seeking to evolve their business model through a structured, measurable digital transformation aligned with strategic objectives, with technology and automation as the foundation and digital marketing as the complement.",
      ],
      imageAlt: "Blue glass facade of a corporate building, seen from a low upward angle",
    },
    dualSpecialization: {
      title: "Dual Specialization",
      subtitle: "A balanced approach to address both operational infrastructure and brand perception.",
      pillars: [
        {
          name: "Technology & Automation",
          description: "Process automation, AI agents, custom CRMs, and tailored software to scale without friction.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Digital Marketing",
          description: "Strategic content, executive branding, and event management once the operational foundation is already solved.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Our Work Philosophy",
      values: [
        {
          title: "Comprehensive Strategy",
          description: "We don't implement isolated tools; we conceive the company as a living, interconnected system.",
        },
        {
          title: "Constant Innovation",
          description: "We explore, test, and adapt emerging technologies and AI agents before recommending them to clients.",
        },
        {
          title: "Synergy and Collaboration",
          description: "We work integrated with our clients' teams to transfer real knowledge and capabilities.",
        },
      ],
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    trajectory: {
      label: "Our trajectory",
      titlePrefix: "Evolution and ",
      titleHighlight: "projection",
      tablistLabel: "Select trajectory year",
      years: [
        {
          year: "2025",
          badge: "Milestone",
          milestones: [
            {
              title: "AI Integration",
              description:
                "Implementation of Artificial Intelligence tools to optimize analysis processes and strategic content generation.",
            },
            {
              title: "Digital Strengthening",
              description:
                "Development of robust digital ecosystems focused on capturing and tracking qualified B2B leads.",
            },
          ],
        },
        {
          year: "2026",
          badge: "Vision",
          milestones: [
            {
              title: "Sector specialization",
              description:
                "Leadership in industrial sectors that demand complex digital processes, advanced automation, and RevOps.",
            },
            {
              title: "Latam expansion",
              description:
                "Opening regional operations, exporting our strategic consulting model to new Latin American markets.",
            },
          ],
        },
        {
          year: "2027",
          badge: "Projection",
          milestones: [
            {
              title: "Mind at scale",
              description:
                "Bringing Mind, our CRM with an AI sales agent, to more companies: our own product, built to grow alongside our clients.",
            },
            {
              title: "Local leadership with two pillars",
              description:
                "Consolidating our position in Ecuador by integrating both pillars together: technology and automation as the foundation, digital marketing as the amplifier.",
            },
          ],
        },
      ],
    },
    finalCta: {
      title: "Ready to build a real system for your business?",
      description:
        "Let's talk about your current operation and how automation and artificial intelligence can accelerate your growth.",
      ctaPrimary: {
        label: "Request Diagnostic",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "See Case Studies",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Before you submit, explore our ecosystem",
      links: [
        { label: "Case Studies", href: "/casos-de-exito" },
        { label: "Technology & Automation", href: "/tecnologia-automatizacion" },
        { label: "Direct Contact", href: "/contacto" },
        { label: "Digital Marketing", href: "/marketing-digital" },
      ],
    },
  },
  ru: {
    seo: {
      title: "О MercadoCorp | B2B консалтинг в сфере технологий в Эквадоре",
      description:
        "Узнайте историю, философию и путь развития MercadoCorp: от маркетингового агентства до технологической консалтинговой компании, специализирующейся на автоматизации и ИИ для бизнеса.",
    },
    hero: {
      badge: "Наша идентичность и B2B видение",
      h1: "Мы не верим в волшебные решения. Мы верим в постепенное построение, шаг за шагом.",
      subheadline:
        "Мы созданы для того, чтобы интегрировать, внедрять инновации и расти вместе с компаниями, готовыми строить настоящую систему, а не разовую кампанию.",
      ctaPrimary: {
        label: "Узнать о нашей работе",
        href: "/casos-de-exito",
      },
      ctaSecondary: {
        label: "Поговорим о вашей компании",
        href: "/contacto",
      },
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    history: {
      label: "О нас",
      title: "Наша история",
      paragraphs: [
        "MercadoCorp возникла как стратегический ответ на конкретную потребность рынка: выстроить маркетинг как инструмент роста бизнеса, а не только как средство коммуникации.",
        "Наш путь начался с развития ведущего бренда в спортивной отрасли на этапе его профессионализации. Мы применили бизнес-структуру, где планирование и результативность определяют каждое решение, превращая видение клиента в конкретные результаты.",
        "Опираясь на солидный опыт наших партнёров-основателей в корпоративном управлении, мы расширили присутствие в сегменте B2B. Сегодня мы работаем с организациями, которые стремятся развивать свою бизнес-модель через структурированную, измеримую цифровую трансформацию, согласованную со стратегическими целями, где технологии и автоматизация — основа, а цифровой маркетинг — дополнение.",
      ],
      imageAlt: "Голубой стеклянный фасад корпоративного здания, вид снизу вверх",
    },
    dualSpecialization: {
      title: "Двойная специализация",
      subtitle: "Сбалансированный подход к решению как операционной инфраструктуры, так и восприятия бренда.",
      pillars: [
        {
          name: "Технологии и Автоматизация",
          description: "Автоматизация процессов, ИИ-агенты, индивидуальные CRM и программное обеспечение на заказ для масштабирования без трения.",
          href: "/tecnologia-automatizacion",
        },
        {
          name: "Цифровой Маркетинг",
          description: "Стратегический контент, брендинг руководителей и организация мероприятий, когда операционная база уже решена.",
          href: "/marketing-digital",
        },
      ],
    },
    philosophy: {
      title: "Наша рабочая философия",
      values: [
        {
          title: "Комплексная стратегия",
          description: "Мы не внедряем изолированные инструменты; мы воспринимаем компанию как единую взаимосвязанную живую систему.",
        },
        {
          title: "Постоянные инновации",
          description: "Мы изучаем, тестируем и адаптируем новые технологии и ИИ-агентов, прежде чем рекомендовать их клиентам.",
        },
        {
          title: "Синергия и сотрудничество",
          description: "Мы работаем в тесной интеграции с командами наших клиентов, чтобы передавать реальные знания и навыки.",
        },
      ],
    },
    // Traducción generada, pendiente de revisión nativa (§3.1).
    trajectory: {
      label: "Наш путь развития",
      titlePrefix: "Эволюция и ",
      titleHighlight: "перспектива",
      tablistLabel: "Выбрать год траектории",
      years: [
        {
          year: "2025",
          badge: "Веха",
          milestones: [
            {
              title: "Интеграция ИИ",
              description:
                "Внедрение инструментов искусственного интеллекта для оптимизации процессов анализа и создания стратегического контента.",
            },
            {
              title: "Укрепление цифровых позиций",
              description:
                "Разработка надёжных цифровых экосистем, нацеленных на привлечение и отслеживание квалифицированных B2B-лидов.",
            },
          ],
        },
        {
          year: "2026",
          badge: "Видение",
          milestones: [
            {
              title: "Отраслевая специализация",
              description:
                "Лидерство в промышленных секторах, которым необходимы сложные цифровые процессы, продвинутая автоматизация и RevOps.",
            },
            {
              title: "Экспансия в Латинскую Америку",
              description:
                "Открытие региональных операций и экспорт нашей модели стратегического консалтинга на новые латиноамериканские рынки.",
            },
          ],
        },
        {
          year: "2027",
          badge: "Перспектива",
          milestones: [
            {
              title: "Mind в масштабе",
              description:
                "Внедрение Mind — нашего CRM с ИИ-агентом продаж — в больше компаний: собственный продукт, созданный для роста вместе с клиентами.",
            },
            {
              title: "Локальное лидерство на двух опорах",
              description:
                "Укрепление нашей позиции в Эквадоре за счёт интеграции обоих направлений: технологии и автоматизация как основа, цифровой маркетинг как усилитель.",
            },
          ],
        },
      ],
    },
    finalCta: {
      title: "Готовы построить настоящую систему для вашего бизнеса?",
      description:
        "Давайте обсудим вашу текущую деятельность и то, как автоматизация и искусственный интеллект могут ускорить ваш рост.",
      ctaPrimary: {
        label: "Запросить диагностику",
        href: "/contacto",
      },
      ctaSecondary: {
        label: "Смотреть кейсы",
        href: "/casos-de-exito",
      },
    },
    internalLinks: {
      title: "Прежде чем отправить, изучите нашу экосистему",
      links: [
        { label: "Кейсы и результаты", href: "/casos-de-exito" },
        { label: "Технологии и Автоматизация", href: "/tecnologia-automatizacion" },
        { label: "Прямой контакт", href: "/contacto" },
        { label: "Цифровой маркетинг", href: "/marketing-digital" },
      ],
    },
  },
};

export function getNosotrosContent(locale: Locale): NosotrosPageContent {
  return contentData[locale] || contentData.es;
}
