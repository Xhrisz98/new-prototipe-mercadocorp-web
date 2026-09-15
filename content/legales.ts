// content/legales.ts
// Estructura legal placeholder para Políticas de Privacidad y Términos y Condiciones
// Regla: No generar texto legal definitivo por IA sin revisión humana — dejar placeholder con nota TODO: legal review
// Soporte trilingüe: ES (principal), EN, RU

import { Locale } from "@/lib/i18n";

export interface LegalPageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    lastUpdated: string;
  };
  notice: {
    tag: string;
    body: string;
  };
  sections: {
    title: string;
    content: string;
  }[];
}

const politicasData: Record<Locale, LegalPageContent> = {
  es: {
    seo: {
      title: "Políticas de Privacidad | MercadoCorp",
      description: "Políticas de privacidad y tratamiento de datos personales de MercadoCorp.",
    },
    hero: {
      badge: "Cumplimiento Legal y Privacidad",
      h1: "Políticas de Privacidad",
      lastUpdated: "Última actualización: Septiembre 2026",
    },
    notice: {
      tag: "TODO: legal review",
      body: "Este documento constituye un placeholder estructurado en fase de revisión jurídica final. Los términos específicos de tratamiento de datos personales, cookies y transferencias bajo la normativa de Ecuador y estándares internacionales se encuentran en validación.",
    },
    sections: [
      {
        title: "1. Responsable del Tratamiento de Datos",
        content:
          "MercadoCorp con domicilio en La Pinta E5-38 y la Rábida, Edificio Royal Pacífico, Quito, Ecuador, es responsable del tratamiento de los datos personales suministrados a través de este sitio web y los canales oficiales vinculados.",
      },
      {
        title: "2. Información que Recopilamos",
        content:
          "Recopilamos información de contacto empresarial (nombre, correo corporativo, número de WhatsApp, empresa y requerimientos técnicos) únicamente con el fin de atender solicitudes de diagnóstico, asesoría y prestación de servicios B2B.",
      },
      {
        title: "3. Finalidad del Tratamiento",
        content:
          "Los datos personales proporcionados se utilizarán exclusivamente para: (a) coordinar sesiones de diagnóstico tecnológico o auditoría digital, (b) responder consultas comerciales, y (c) remitir propuestas comerciales solicitadas explícitamente por el usuario.",
      },
      {
        title: "4. Tratamiento de Datos en Productos de IA y Mind",
        content:
          "Para los servicios vinculados a Mind (CRM y agente de ventas por WhatsApp), los datos se procesan conforme a las políticas de Meta Platforms y las instancias de base de datos seguras asignadas a cada cliente corporativo, garantizando confidencialidad estricta.",
      },
      {
        title: "5. Derechos de los Titulares",
        content:
          "Usted podrá ejercer en cualquier momento sus derechos de acceso, rectificación, cancelación y oposición enviando una solicitud formal a través de nuestros canales de contacto oficiales en /contacto.",
      },
    ],
  },
  en: {
    seo: {
      title: "Privacy Policy | MercadoCorp",
      description: "Privacy policy and data protection framework of MercadoCorp.",
    },
    hero: {
      badge: "Legal Compliance & Privacy",
      h1: "Privacy Policy",
      lastUpdated: "Last updated: September 2026",
    },
    notice: {
      tag: "TODO: legal review",
      body: "This document is a structured placeholder pending final legal review. Specific provisions concerning data protection, cookies, and cross-border data transfer under applicable enterprise regulations are currently undergoing legal audit.",
    },
    sections: [
      {
        title: "1. Data Controller",
        content:
          "MercadoCorp, located at La Pinta E5-38 and La Rábida, Edificio Royal Pacífico, Quito, Ecuador, acts as the data controller for personal and corporate data collected via this website and official communication channels.",
      },
      {
        title: "2. Information Collected",
        content:
          "We collect business contact information (name, corporate email, mobile number, company name, and technical project scope) exclusively for the purpose of scheduling diagnostics and delivering custom B2B services.",
      },
      {
        title: "3. Purpose of Processing",
        content:
          "All data submitted is processed solely to: (a) facilitate technology diagnostics and digital audit sessions, (b) respond to commercial inquiries, and (c) deliver requested technical proposals.",
      },
      {
        title: "4. Data Security in AI & Mind Ecosystem",
        content:
          "For services connected to Mind (CRM and autonomous WhatsApp agents), data flows adhere to enterprise encryption standards and dedicated client tenancies to safeguard proprietary commercial information.",
      },
      {
        title: "5. Your Rights",
        content:
          "You may at any time request access, rectification, or deletion of your commercial data by submitting a formal request via our official channels at /contacto.",
      },
    ],
  },
  ru: {
    seo: {
      title: "Политика конфиденциальности | MercadoCorp",
      description: "Политика конфиденциальности и защиты персональных данных компании MercadoCorp.",
    },
    hero: {
      badge: "Правовая информация",
      h1: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: Сентябрь 2026",
    },
    notice: {
      tag: "TODO: legal review",
      body: "Данный документ представляет собой структурированный шаблон, находящийся на финальной юридической проверке. Положения об обработке корпоративных данных и файлов cookie проходят согласование.",
    },
    sections: [
      {
        title: "1. Оператор персональных данных",
        content:
          "MercadoCorp (Кито, Эквадор, Edificio Royal Pacífico) является оператором данных, предоставленных через настоящий сайт и официальные каналы коммуникации.",
      },
      {
        title: "2. Собираемая информация",
        content:
          "Мы собираем деловую контактную информацию (имя, корпоративный email, номер WhatsApp, название компании) исключительно для проведения первичной диагностики и оказания B2B-услуг.",
      },
      {
        title: "3. Цели обработки",
        content:
          "Данные используются для: (а) записи на технологическую диагностику или цифровой аудит, (б) обработки коммерческих запросов и (в) подготовки индивидуальных предложений.",
      },
      {
        title: "4. Безопасность данных в сервисах ИИ и Mind",
        content:
          "Данные клиентов платформы Mind обрабатываются в изолированных защищенных средах в соответствии с высокими стандартами корпоративной безопасности.",
      },
      {
        title: "5. Права субъектов данных",
        content:
          "Вы можете в любой момент направить запрос на уточнение или удаление ваших данных через форму обратной связи на странице /contacto.",
      },
    ],
  },
};

const terminosData: Record<Locale, LegalPageContent> = {
  es: {
    seo: {
      title: "Términos y Condiciones | MercadoCorp",
      description: "Términos y condiciones de uso de los servicios y sitio web de MercadoCorp.",
    },
    hero: {
      badge: "Términos de Servicio",
      h1: "Términos y Condiciones",
      lastUpdated: "Última actualización: Septiembre 2026",
    },
    notice: {
      tag: "TODO: legal review",
      body: "Este documento constituye un placeholder estructurado en fase de revisión jurídica final. Las cláusulas definitivas de prestación de servicios de consultoría tecnológica, licencias de software y acuerdos de nivel de servicio (SLA) se encuentran en validación.",
    },
    sections: [
      {
        title: "1. Aceptación de los Términos",
        content:
          "El acceso y uso de este sitio web implican la aceptación plena de los presentes términos y condiciones generales. Si no está de acuerdo con alguno de los puntos, le solicitamos abstenerse de utilizar el sitio.",
      },
      {
        title: "2. Propiedad Intelectual",
        content:
          "Todos los contenidos, marcas comerciales, logotipos, arquitecturas de software, textos y diseños audiovisuales exhibidos en este sitio son propiedad exclusiva de MercadoCorp o de sus respectivos titulares bajo licencia.",
      },
      {
        title: "3. Alcance de los Servicios B2B",
        content:
          "La información publicada en este sitio tiene carácter informativo y orientativo. La contratación formal de servicios de automatización, agentes de IA o desarrollo a medida se formaliza mediante propuestas comerciales y contratos específicos (SOW).",
      },
      {
        title: "4. Limitación de Responsabilidad",
        content:
          "MercadoCorp no será responsable por interrupciones temporales del servicio derivadas de mantenimientos programados, fallas de proveedores externos de telecomunicaciones o causas de fuerza mayor.",
      },
      {
        title: "5. Ley Aplicable y Jurisdicción",
        content:
          "Los presentes términos se rigen por la legislación de la República del Ecuador. Para cualquier controversia, las partes se someten a los juzgados y tribunales competentes de la ciudad de Quito.",
      },
    ],
  },
  en: {
    seo: {
      title: "Terms and Conditions | MercadoCorp",
      description: "Terms and conditions of service and website usage for MercadoCorp.",
    },
    hero: {
      badge: "Terms of Service",
      h1: "Terms and Conditions",
      lastUpdated: "Last updated: September 2026",
    },
    notice: {
      tag: "TODO: legal review",
      body: "This document is a structured placeholder pending final legal review. Binding service level agreements (SLAs), custom software licensing terms, and enterprise master services agreements (MSAs) are subject to separate formal review.",
    },
    sections: [
      {
        title: "1. Acceptance of Terms",
        content:
          "Access to and navigation on this website implies full acceptance of these general terms and conditions. If you do not agree with any terms herein, please refrain from using the platform.",
      },
      {
        title: "2. Intellectual Property",
        content:
          "All intellectual property rights, trademarks, brand assets, proprietary software architectures, and copy displayed on this website are the sole property of MercadoCorp.",
      },
      {
        title: "3. Scope of B2B Services",
        content:
          "The material on this site is for promotional and informative purposes. Formal engagements for automation, AI agents, or custom engineering are governed by separate Statements of Work (SOW) and Master Services Agreements.",
      },
      {
        title: "4. Limitation of Liability",
        content:
          "MercadoCorp shall not be held liable for third-party hosting outages, upstream API disruptions, or unforeseen network connectivity failures beyond reasonable operational control.",
      },
      {
        title: "5. Governing Law and Jurisdiction",
        content:
          "These terms are governed by the laws of the Republic of Ecuador. Any disputes arising hereunder shall be subject to the competent jurisdiction of the courts of Quito, Ecuador.",
      },
    ],
  },
  ru: {
    seo: {
      title: "Условия и положения | MercadoCorp",
      description: "Условия использования веб-сайта и услуг компании MercadoCorp.",
    },
    hero: {
      badge: "Условия обслуживания",
      h1: "Условия и положения",
      lastUpdated: "Последнее обновление: Сентябрь 2026",
    },
    notice: {
      tag: "TODO: legal review",
      body: "Данный документ является структурированным шаблоном и находится на стадии финальной юридической экспертизы. Договоры об уровне услуг (SLA) и лицензионные соглашения оформляются отдельными договорами.",
    },
    sections: [
      {
        title: "1. Принятие условий",
        content:
          "Использование настоящего сайта означает полное согласие с данными условиями. В случае несогласия с какими-либо пунктами рекомендуем покинуть ресурс.",
      },
      {
        title: "2. Интеллектуальная собственность",
        content:
          "Все материалы, товарные знаки, логотипы, тексты и программные концепции, представленные на сайте, являются интеллектуальной собственностью MercadoCorp.",
      },
      {
        title: "3. Объем B2B-услуг",
        content:
          "Информация на сайте носит ознакомительный характер. Официальное сотрудничество по внедрению ИИ и автоматизации регулируется индивидуальными коммерческими договорами.",
      },
      {
        title: "4. Ограничение ответственности",
        content:
          "MercadoCorp не несет ответственности за перебои в работе сторонних сервисов, провайдеров связи или обстоятельства непреодолимой силы.",
      },
      {
        title: "5. Применимое право",
        content:
          "Настоящие условия регулируются законодательством Республики Эквадор. Все споры подлежат рассмотрению в судебных органах города Кито.",
      },
    ],
  },
};

export function getPoliticasContent(locale: Locale): LegalPageContent {
  return politicasData[locale] || politicasData.es;
}

export function getTerminosContent(locale: Locale): LegalPageContent {
  return terminosData[locale] || terminosData.es;
}
