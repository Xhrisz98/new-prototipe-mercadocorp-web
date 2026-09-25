# PROJECT_PLAN.md — Nueva Web MercadoCorp

Este documento es el plan maestro para construir la nueva web de MercadoCorp con agentes de IA (Antigravity). Sigue el enfoque de *Spec-Driven Development*: se escribe la especificación completa antes de generar una sola línea de código, y cada fase tiene criterios de verificación explícitos y comprobables — no "que se vea bien", sino capturas y checks concretos.

**Documentos complementarios en este mismo repo (el agente debe leerlos antes de empezar):**
- `guia-nueva-web-mercadocorp.md` — sitemap, pilares de servicio, sistema de diseño completo (colores/tipografía reales de marca)
- `copywriting-nueva-web-mercadocorp.md` — todo el copy final por página (SEO, hero, CTAs, FAQ)
- `AGENTS.md` — contrato corto de comportamiento del agente (leer primero, siempre)

---

## 1. Objetivo

Reconstruir mercadocorp.ec como un sitio moderno multipágina que reposiciona la marca de "agencia de marketing digital" a "consultora tecnológica B2B especializada en automatización, agentes de IA y software a medida", maximizando conversión y tiempo en sitio (retención vía enlazado interno).

## 2. Stack técnico (versiones exactas — no usar otras)

- **Next.js 16** (App Router, no Pages Router) — actualizado desde v15 original de este plan; 16.3.x es la versión activa/LTS actual
- **React 19** (19.2.x) + **TypeScript** en todo el proyecto, sin archivos `.js` sueltos
- **Tailwind CSS 4** con `class` strategy para el tema oscuro (nunca `prefers-color-scheme` como única fuente de verdad — el toggle manual manda)
- **React Three Fiber** + `@react-three/drei` para las piezas de Three.js (nunca Three.js "a pelo" sin R3F)
- **Motion** (antes "Framer Motion" — el paquete se renombró; usa `npm install motion` e importa desde `motion/react`, nunca `framer-motion`) para transiciones y micro-interacciones 2D. **No uses `framer-motion-3d`/Motion para 3D — está deprecado**; toda animación 3D va directo en R3F (`useFrame`, lerp manual), como ya hacen `AgentSphere` y `KineticNeuralCore`
- **Internacionalización (ES/EN/RU)** — ver sección 3.1, formalizada a partir de v1.1 de este plan
- Fuentes vía `next/font/google`: **Kanit** (weight 500, `italic`) y **Montserrat** (variable, todos los pesos)
- Gestor de paquetes: `npm` (mismo que usa Mind CRM, para mantener consistencia de stack entre productos)
- Despliegue objetivo: Vercel (mismo patrón que Mind CRM en `crm.mind.ec`)

## 3. Arquitectura de carpetas (Next.js App Router)

```
app/
  layout.tsx                 # ThemeProvider (claro/oscuro), fuentes, metadata global
  page.tsx                   # Inicio
  tecnologia-automatizacion/page.tsx
  aplicaciones-herramientas-digitales/page.tsx
  ecommerce-inteligente/page.tsx
  mind/page.tsx
  marketing-digital/page.tsx
  estrategia-creatividad-branding/page.tsx
  auditoria-digital/page.tsx
  gestion-eventos/page.tsx
  nosotros/page.tsx
  casos-de-exito/page.tsx
  contacto/page.tsx
  politicas-de-privacidad/page.tsx
  terminos-y-condiciones/page.tsx
components/
  ui/                        # Button (pill), Card, Badge, FormField, ProductShowcase (mockup de navegador para capturas de producto), FloatingWhatsAppQR (widget flotante global), InteractiveTreeQR (QR + WhatsApp), ScrollProgress (barra de progreso de scroll)
  layout/                    # Navbar (con toggle tema + LanguageSelector), Footer
  sections/                  # Hero, PillarCard, FAQAccordion, CaseStudyCard, StatsStrip, TrustStrip, ReasoningBlock, ServiceNodeDiagram (2D, diagrama de nodos interactivo en Tecnología)
  three/                     # DataFlowCore (Hero Inicio — espiral 3D de partículas de luz en flujo, representando velocidad/proceso de datos; reemplaza a NeuralNetworkCore, que a su vez reemplazó a NeuralAgentCore, que a su vez reemplazó a KineticNeuralCore), AgentSphere (Mind) — cada uno "use client" con fallback estático mobile

**Deuda técnica activa a limpiar una vez DataFlowCore esté verificado:** `KineticNeuralCore.tsx` y `NeuralAgentCore.tsx` permanecen como código muerto en el repo (nunca se llegó a eliminar tras el pivote anterior); `NeuralNetworkCore.tsx` se suma a esa lista si llegó a construirse antes de este cambio. Los 3 (o los que existan) se eliminan en el mismo commit donde se confirme visualmente que `DataFlowCore` funciona — ya van 4 iteraciones del mismo componente, esta vez sí se limpia sin excepciones.
lib/
  design-tokens.ts           # Todos los colores/tipografía de la sección 4, como constantes — nunca hardcodear hex sueltos en componentes
content/
  <page>.ts                  # Copy de cada página extraído de copywriting-nueva-web-mercadocorp.md como objetos tipados, no strings sueltos en el JSX
```

### 3.1 Internacionalización (ES/EN/RU) — formalizado

El sitio soporta 3 idiomas: **español (idioma base/fuente de verdad), inglés y ruso**. Esta sección estandariza lo que ya existe en el código (`lib/i18n.ts`, `components/i18n/LocaleProvider.tsx`, `LanguageSelector.tsx`) para que futuras fases lo respeten en vez de tratarlo como algo aparte.

- El **español es la fuente de verdad**: cualquier cambio de copy se hace primero en `content/<page>.ts` en español, y las traducciones EN/RU se derivan de ahí — nunca al revés.
- `LanguageSelector` debe vivir en el Navbar, visible en las 14 páginas.
- El selector de idioma es independiente del toggle claro/oscuro — no deben compartir el mismo control ni el mismo estado.
- **SEO por idioma**: cada página debe generar sus propios `<title>`/`meta description` traducidos, no solo el body de la página — de lo contrario el trabajo de SEO de `copywriting-nueva-web-mercadocorp.md` (hecho en español) queda invisible para búsquedas en inglés/ruso.
- Las traducciones EN/RU no están escritas por un traductor humano — deben marcarse internamente (comentario o flag) como "traducción generada, pendiente de revisión nativa" hasta que alguien las valide, siguiendo el mismo principio que ya aplicamos a los textos legales (placeholder + nota, no contenido final sin revisión).

## 4. Sistema de diseño — tokens (fuente: Manual de Identidad Corporativa oficial)

```ts
// lib/design-tokens.ts
export const colors = {
  brand: {
    primary: "#0022D2",      // azul principal — CTAs, logo, tema claro
    primaryDark: "#3F5FFF",  // azul vibrante — CTAs y hover en tema oscuro
    gray: "#3B3C40",         // texto principal tema claro
    aiAccent: "#04E7AF",     // RESERVADO: solo Mind / agentes de IA. Nunca decorativo en otras secciones.
  },
  light: {
    bg: "#FAFAFB",
    surface: "#FFFFFF",
    text: "#3B3C40",
    textMuted: "#6B6D73",
    border: "#E4E5E9",
  },
  dark: {
    bg: "#0B0D14",
    surface: "#151822",
    text: "#EDEFF3",
    textMuted: "#9A9DA8",
    border: "rgba(255,255,255,0.06)",
  },
} as const;

export const fonts = {
  display: "Kanit", // weight 500, italic — H1/H2 únicamente
  body: "Montserrat", // todo lo demás
} as const;
```

**Regla no negociable:** el logo de MercadoCorp se renderiza siempre en sus colores oficiales (`#0022D2`, blanco o negro) — nunca recoloreado para adaptarse al tema oscuro ni a ninguna sección. Esto está explícito en el manual de marca como uso incorrecto.

**Regla del acento verde (`#04E7AF`):** grep del código antes de dar por terminada cualquier página — si `04E7AF` aparece fuera de `mind/page.tsx`, `components/three/AgentSphere.tsx`, o cualquier badge/mención explícita de "Mind"/"agente de IA", es un error de implementación.

## 5. Especificación por página

Cada página usa el copy exacto de `copywriting-nueva-web-mercadocorp.md` (título SEO, meta description, H1, secciones, CTAs, FAQ, enlazado interno) — el agente no debe redactar copy nuevo, solo maquetarlo. Estructura común a todas las páginas de servicio:

1. `<Hero>` — H1 + subheadline + CTA primario (pill button) [+ CTA secundario si aplica]
2. Secciones de contenido según el copy de la página (fichas de servicio, bloques de objeción, FAQ)
3. `<InternalLinksStrip>` al final — los links de "Enlazado interno" listados en el copy de cada página, nunca omitidos (es el mecanismo de retención del sitio)
4. CTA final

**Casos especiales:**
- **Inicio (`/`)** — única página con el componente Three.js `DataFlowCore` en el hero: espiral 3D de miles de partículas de luz en flujo, transmitiendo velocidad/proceso de datos (no una forma biológica ni un diagrama de red). Posicionada asimétricamente hacia el lado derecho, dejando el tercio izquierdo despejado para el bloque de texto del H1. En reposo (0% scroll), rotación de la espiral en azules de marca; al hacer scroll dentro del rango del hero, la espiral acelera/se contrae y el núcleo se enciende en verde `#04E7AF` únicamente en ese estado final. Reemplaza a `NeuralNetworkCore` (red de nodos, descartada por no transmitir suficiente sensación de "tecnología/velocidad")
- **Mind (`/mind`)** — único lugar del sitio con el acento verde `#04E7AF` y el componente `AgentSphere`; el CTA principal es un link externo `target="_blank"` a `mind.ec`/`crm.mind.ec`, no un formulario interno
- **Casos de Éxito (`/casos-de-exito`)** — construir con datos placeholder tipados (`content/casos-de-exito.ts` con array vacío o de ejemplo comentado) hasta que se confirme la lista definitiva de clientes — **no inventar clientes ni cifras**
- **Nosotros (`/nosotros`)** — la sección "Trayectoria" queda como placeholder visual (título + nota "Próximamente") hasta tener hitos reales
- **Políticas de Privacidad / Términos** — contenido legal placeholder con nota `<!-- TODO: legal review -->`, no generar texto legal por IA sin revisión de un humano

## 5.1 Estructura canónica de página (por tipo)

Toda página del sitio sigue uno de estos 3 esqueletos — nunca una estructura ad-hoc distinta por página:

**Tipo Hub (Tecnología, Marketing):**
`Hero → Franja de logos de stack/plataformas (adaptada al pilar) → Franja de estadísticas (adaptada al pilar, no genérica) → Tarjetas de los 2-3 servicios del pilar → FAQ del hub → CTA de cierre`

**Tipo Servicio (las 5 páginas hijas + Mind + Auditoría + Eventos):**
`Hero → Qué incluye (lista de sub-servicios) → Bloque de objeción/prueba específico del servicio → Enlazado interno → CTA de cierre`
Sin franja de logos ni de estadísticas — repetir esas franjas en cada página de servicio diluye su impacto (ver sección "Franjas de confianza" abajo).

**Tipo Institucional (Inicio, Nosotros, Casos de Éxito, Contacto):**
Cada una mantiene su estructura ya definida en la sección "Contenido por página" de `guia-nueva-web-mercadocorp.md` — Inicio es la única página con la franja completa de logos + estadísticas.

## 5.2 Franjas de confianza (logos de stack + estadísticas)

- **Logos de marcas aliadas = plataformas/tecnologías que MercadoCorp integra** (WhatsApp Business API, Meta, plataformas de e-commerce, etc.) — nunca logos de clientes reales de MercadoCorp (eso sigue las mismas reglas que Casos de Éxito: pendiente de confirmación, nunca se mezclan ambos conceptos en la misma franja)
- **Dónde aparece cada franja:**
  - Inicio: franja completa de logos de stack + franja completa de estadísticas (como ya estaba definido)
  - Tecnología (hub): franja de logos de stack **relevantes a ese pilar** (WhatsApp, plataformas CRM/automatización — no las de e-commerce) + estadísticas **adaptadas** (ej. "24/7 atención automatizada", "100% trazabilidad de leads")
  - Marketing (hub): franja de logos de stack **relevantes a ese pilar** (Meta Ads, Google Ads, plataformas de e-commerce) + estadísticas **adaptadas** (ej. cifras de alcance/contenido, no las mismas de Tecnología)
  - Ninguna otra página lleva estas franjas

## 5.3 Iconografía — nunca emojis

Ningún emoji (✅, 🚀, 💡, etc.) en copy, UI, badges, ni bullets de ninguna página, en ningún idioma. Todo ícono usa `lucide-react` (ya está en el stack vía `ProductShowcase`/`FloatingWhatsAppQR`) — consistente con el resto del sistema de diseño. Si un componente actual usa un emoji como ícono, se reemplaza por el ícono de `lucide-react` semánticamente más cercano.

## 5.4 Scroll-reveal en Tecnología (hub)

Dos capas complementarias, ambas activadas por scroll — no se mezclan entre sí:

**Capa 1 — Diagrama de nodos interactivo (2D, no Three.js)**
Un diagrama SVG/Motion de nodos abstractos conectados (mismo lenguaje visual que `NeuralNetworkCore`, pero en 2D — nunca una tercera escena WebGL, ya hay 2 piezas 3D "premium" en el sitio y agregar una más diluye su valor). A medida que el usuario hace scroll, cada nodo se activa y revela un ícono de `lucide-react` + etiqueta corta de texto, representando: Agentes de IA, CRM/Automatización, Software a Medida (los 3 servicios del pilar). Colores: azules de marca en reposo, el nodo activo puede usar el acento `#04E7AF` momentáneamente al revelarse (excepción puntual ya cubierta por el contexto de Tecnología/IA).

**Capa 2 — ProductShowcase por tarjeta de servicio**
Como ya estaba definido: cada tarjeta de servicio revela su captura asociada al entrar al viewport — Mind con captura real de `crm.mind.ec`, Aplicaciones y E-commerce con mockup genérico/ficticio (nunca un cliente real, mismo límite que Casos de Éxito hasta tener lista confirmada). Transición vía `whileInView` de Motion.

La Capa 1 vive más arriba en la página (cerca del hero del hub, como transición conceptual), la Capa 2 vive junto a cada tarjeta de servicio — no se superponen ni compiten por el mismo espacio de scroll.

## 5.5 Scroll-reveal como estándar del sitio (no por componente)

Todo bloque de contenido con entidad propia (tarjetas de servicio, PainBlock, StatsStrip, TrustStrip, FAQ, casos de éxito, etc.) se revela al entrar al viewport mediante **un único componente wrapper reutilizable** (`components/ui/RevealOnScroll.tsx`, usa `whileInView` de Motion) — nunca una animación de entrada distinta escrita a mano por componente. Parámetros estándar: fade + slide vertical sutil (12-16px), stagger de ~80ms entre elementos hermanos dentro de un mismo grid/lista, se dispara una sola vez (no se revierte al scrollear hacia arriba). Cualquier componente que ya tenga su propia animación de entrada ad-hoc se migra a este wrapper.

## 5.6 Profundidad de tarjetas — sombra en capas

Las tarjetas (`Card`, `ProductShowcase`, `PainBlock`, etc.) usan una técnica de sombra en dos capas para dar profundidad sin salirse de los tokens de marca:
- Capa exterior (drop shadow): usa `--color-brand-primary` a baja opacidad (~12-16%) en vez de negro puro, para que la sombra se sienta "de marca" y no genérica
- Capa interior (inner highlight): blanco a baja opacidad en tema claro, blanco muy tenue en tema oscuro, para dar sensación de superficie elevada
- Nunca colores de sombra fuera de estas dos combinaciones — la técnica se adapta a los tokens existentes, no se copian los valores hex literales de una referencia externa

## 5.7 Fotografía de stock — temporal, marcada para reemplazo

Decisión: `PillarCard` y `PainBlock` usan fotografía de stock (Unsplash) como placeholder temporal, en vez de solo ícono, hasta que exista fotografía/ilustración propia de marca. Reglas obligatorias:

- Cada uso lleva un comentario `// TODO: reemplazar con [descripción de qué debería ir ahí]` junto a la imagen en el código — mismo principio que el placeholder de Casos de Éxito y de `legales.ts`
- Prohibido cualquier cliché de stock corporativo: gente estrechando manos, laptops en cafetería, oficinas genéricas sonriendo a cámara, post-its de colores, persona con cabeza entre las manos
- Nunca imágenes generadas por IA para esto — solo fotografía real de Unsplash
- Tono visual: oscuro/monocromático o con dominante azul, abstracto cuando sea posible (server rooms, fibra óptica, circuitos, dashboards) — nunca literal/genérico
- `ProductShowcase` NO lleva foto adicional de stock — ya es imagen real/mockup de producto, agregar una segunda foto ahí duplica peso visual sin aportar nada
**Fase 0 — Fundaciones (agente único, bloqueante para todo lo demás)**
- Setup del proyecto Next.js + Tailwind + fuentes + `design-tokens.ts`
- `ThemeProvider` con toggle claro/oscuro persistente (`localStorage` + atributo `class` en `<html>`)
- Componentes atómicos: `Button` (variante pill), `Navbar`, `Footer`, `Badge`
- **Verificación:** captura de pantalla del Navbar/Footer en ambos temas antes de avanzar a Fase 1

**Fase 1 — Páginas hub + Inicio (puede correr en paralelo, 2 agentes)**
- Agente A: Inicio completo (incluye `ParticleNetwork`)
- Agente B: Tecnología & Automatización + Marketing Digital (hubs)
- **Verificación:** captura de cada hero en claro/oscuro + mobile (375px) y desktop (1440px)


**Fase 2 — Páginas hijas de servicio (5 páginas, hasta 3 agentes en paralelo)**
- Aplicaciones y Herramientas Digitales, E-commerce Inteligente, Estrategia/Creatividad/Branding, Auditoría Digital, Gestión de Eventos
- **Verificación:** cada página enlaza correctamente a las páginas listadas en "Enlazado interno" de su copy (check automatizado de links rotos)

**Fase 3 — Mind, Nosotros, Casos de Éxito, Contacto (2 agentes en paralelo)**
- Mind incluye `AgentSphere` (único lugar con verde `#04E7AF`)
- Contacto incluye formulario funcional (validación client-side, sin backend real todavía — mockear el submit)
- **Verificación:** grep de `04E7AF` fuera de estas páginas debe devolver cero resultados

**Fase 4 — Legales + QA final (agente único)**
- Políticas de Privacidad, Términos y Condiciones (placeholder)
- Auditoría completa: Lighthouse (performance/accesibilidad), verificación de que Three.js degrada a versión estática en mobile, revisión de que el logo nunca aparece recoloreado

## 7. Criterios de aceptación (verificables, no subjetivos)

- [ ] Las 14 páginas del sitemap existen y navegan sin 404
- [ ] Toggle claro/oscuro funciona en las 14 páginas y persiste entre navegaciones
- [ ] `#04E7AF` solo aparece en contexto de Mind/agentes (verificado por grep)
- [ ] El logo nunca se renderiza en un color distinto a los oficiales del manual
- [ ] Cada página de servicio tiene como mínimo los 2-3 links internos definidos en su copy
- [ ] `ParticleNetwork` (Inicio) y `AgentSphere` (Mind) tienen fallback estático en viewport < 768px
- [ ] Lighthouse ≥ 90 en Performance y Accesibilidad en Inicio y Mind (páginas con Three.js)
- [ ] Ningún texto de Casos de Éxito o Nosotros→Trayectoria inventa cifras o clientes no confirmados

## 8. Fuera de alcance (no hacer sin confirmación explícita)

- No conectar el formulario de Contacto a un backend/email real todavía
- No escribir el texto legal final de Políticas/Términos (placeholder únicamente)
- No agregar clientes/logos a Casos de Éxito sin lista confirmada
- No cambiar ningún token de `design-tokens.ts` sin que esté documentado aquí primero