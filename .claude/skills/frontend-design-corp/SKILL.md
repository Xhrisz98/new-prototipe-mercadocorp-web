---
name: frontend-design-corp
description: Usa esta skill para cualquier trabajo de UI/UX en el proyecto de MercadoCorp — nuevos componentes, ajustes visuales, auditorías de diseño, o cuando el usuario pida "que se vea profesional/corporativo". Consolida las reglas de diseño ya acordadas en PROJECT_PLAN.md y AGENTS.md para que no haya que repetirlas en cada prompt.
---

# Frontend Design Corporativo — MercadoCorp

Esta skill es el resumen operativo de las reglas de diseño del proyecto. PROJECT_PLAN.md y AGENTS.md siguen siendo la fuente de verdad — si algo aquí contradice a esos archivos, ganan ellos.

## 1. Disciplina de color (la regla más importante, la más fácil de romper)

- Todo color sale de lib/design-tokens.ts. Nunca un hex literal en un componente, nunca una clase de color de Tailwind fuera de token (amber-, pink-, orange-, purple-, etc.).
- El acento verde (#04E7AF / colors.brand.aiAccent) está reservado exclusivamente para contexto de Mind/IA. En cualquier otra parte del sitio, todo es variación de los dos azules de marca (#0022D2 / #3F5FFF) — diferenciación visual entre elementos se logra con opacidad, nunca con un tercer color.
- Antes de usar un color "solo para diferenciar visualmente" 3 tarjetas/íconos/badges entre sí, la primera pregunta es: ¿puedo lograr esto con opacidad del mismo azul? Casi siempre la respuesta es sí.
- Referencias externas (Dribbble, 21st.dev, capturas de otros sitios) se toman por su estructura/layout, nunca por su paleta — si la referencia usa 4 colores de gradiente distintos, la estructura se adapta a 1-2 azules de marca.

## 2. Tipografía

- Kanit (weight 500, italic) exclusivamente para H1/H2 de sección — nunca para cuerpo de texto ni UI.
- Montserrat para todo lo demás.
- Jerarquía consistente: si un H2 de página usa text-2xl sm:text-4xl, todo H2 del mismo nivel en cualquier otra página usa el mismo tamaño — un outlier tipográfico (como pasó con Políticas/Términos) es un bug de consistencia, no una variación de diseño válida.

## 3. Scroll-reveal (estándar único, ver PROJECT_PLAN.md §5.5)

- Todo bloque de contenido con entidad propia se envuelve en components/ui/RevealOnScroll.tsx — nunca una animación de entrada escrita a mano por componente.
- Fade + slide vertical sutil (12-16px), stagger ~80ms entre elementos hermanos, se dispara una sola vez.
- Antes de escribir una animación de entrada nueva, revisa si RevealOnScroll ya cubre el caso.

## 4. Profundidad — sombras en capas (ver PROJECT_PLAN.md §5.6)

- Drop shadow: --color-brand-primary a ~12-16% de opacidad, nunca negro puro.
- Inner highlight: blanco a baja opacidad, ajustada entre tema claro/oscuro.
- Nunca copiar valores hex literales de un tutorial/referencia externa sin convertirlos a los tokens del proyecto.

## 5. Componentes reutilizables — no reimplementar a mano

Antes de escribir JSX nuevo para algo que se ve como una tarjeta, botón, badge o campo de formulario, revisa si ya existe:
- Button (fuerza rounded-full — pill shape garantizado)
- Badge
- RevealOnScroll (wrapper único de scroll-reveal, ver §3)
- Card (base de todas las tarjetas: un solo radio, sombra en capas de §5.6, elevación en hover)
- PhotoCard (variante de Card con foto de cabecera + overlay; ver §5.7 sobre fotografía temporal)
- IconBadge (contenedor de ícono con gradiente de marca, para tarjetas solo-ícono)

Nota: FormField **no existe todavía** (confirmado por grep: no hay archivo ni imports — los campos del formulario de Contacto están escritos a mano). No asumas que existe; agrégalo a esta lista cuando se construya.

Si un patrón visual se repite 2+ veces a mano en distintos archivos, es señal de que necesita convertirse en componente, no seguir copiándose.

## 6. Iconografía

- lucide-react para todo ícono de UI — nunca emojis.
- Excepción: logos de marcas de terceros (WhatsApp, Meta, Google, plataformas de TrustStrip) usan su SVG oficial de marca, nunca un ícono genérico de lucide-react ni un emoji sustituto.
- Un ícono roto/faltante no se sustituye silenciosamente por un ícono "parecido" — se reporta antes de improvisar.

## 7. Espaciado

- py-20 como unidad estándar de separación entre secciones en Home/Hubs. Páginas institucionales (Nosotros, Casos de Éxito) no deberían mezclar py-12, py-16 md:py-24 y py-20 dentro de la misma página — una sola escala de espaciado por página, consistente con el resto del sitio.

## 8. Accesibilidad (mínimo no negociable)

- Todo <img>/<Image> con alt descriptivo real (no vacío, no "imagen").
- Todo botón/link que sea solo-ícono lleva aria-label.
- Contraste de texto verificado especialmente donde hay texto sobre canvas 3D o imágenes de fondo — si hay duda, oscurecer/aclarar el fondo antes que arriesgar legibilidad.

## 9. Antes de dar cualquier trabajo de UI por terminado

1. npm run build sin errores
2. Captura en tema claro y oscuro
3. Captura en mobile (375px), tablet (768-1024px si aplica), desktop (1440px)
4. Grep rápido de colores fuera de token si el cambio tocó algo visual
5. Si el componente ya existe en otra forma (buscar antes de crear), reusarlo en vez de duplicar

## Excepción — web-design-guidelines y el copy en español

La skill web-design-guidelines trae su ruleset en vivo desde
raw.githubusercontent.com/vercel-labs/web-interface-guidelines, cuya
sección "Content & Copy" impone convenciones de inglés (Title Case,
comillas curvas, "&" en vez de "and"). Este proyecto está en español,
con el copy fijado por copywriting-nueva-web-mercadocorp.md — ignora
esa subsección específica al aplicar esta skill aquí. El resto del
checklist (a11y, forms, animación) sí aplica normalmente.
