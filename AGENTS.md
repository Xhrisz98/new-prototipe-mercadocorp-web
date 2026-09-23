# AGENTS.md — Nueva Web MercadoCorp

Lee `PROJECT_PLAN.md` completo antes de tocar código. Este archivo es solo el contrato de comportamiento.

## Stack
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + React Three Fiber + Motion (paquete `motion`, import `motion/react` — NO `framer-motion`) + i18n (ES/EN/RU, ver PROJECT_PLAN.md §3.1). No uses Pages Router, no uses JS plano, no uses Three.js sin R3F, no uses Motion/framer-motion-3d para animación 3D (está deprecado — usa R3F puro).

## Comandos
- Instalar: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` (debe pasar sin errores antes de dar una fase por terminada)
- Lint: `npm run lint` (ejecuta `eslint .` — `next lint` fue removido en Next 16, no solo deprecado)

## Excepción documentada de ESLint
`react-hooks/purity` y `react-hooks/immutability` dan falsos positivos en `components/three/` porque mutar buffers/refs dentro de `useFrame` es el patrón correcto y recomendado en React Three Fiber (evita re-renders a 60fps), no un error real. Estas dos reglas están deshabilitadas mediante un override de ESLint scoped únicamente a `components/three/**`, con un comentario explicando el motivo — nunca deshabilitadas de forma global ni con `eslint-disable` sueltos sin contexto.

## Estilo
- Colores y tipografía SIEMPRE desde `lib/design-tokens.ts` — nunca hex hardcodeado en componentes (incluidos los de Three.js: usa `.getHex()`/conversión desde el token, no repitas el literal)
- Copy SIEMPRE desde `content/<page>.ts` — nunca redactes copy nuevo, usa el de `copywriting-nueva-web-mercadocorp.md`. El español es la fuente de verdad; EN/RU se derivan de ahí y se marcan como pendientes de revisión nativa
- Componentes de Three.js van en `components/three/`, marcados `"use client"`, con fallback estático en mobile
- Cualquier componente nuevo que no esté en la arquitectura de `PROJECT_PLAN.md` §3 se documenta ahí antes de darse por terminado — no se agrega silenciosamente

## Límites — nunca hagas esto sin preguntar primero
- No recolorees el logo de MercadoCorp fuera de sus colores oficiales (`#0022D2`, blanco, negro)
- No uses `#04E7AF` fuera del contexto de Mind/agentes de IA
- No inventes clientes, logos o cifras en Casos de Éxito
- **Ningún cliente real (Bullpadel, Udana, La Plazita, etc.) aparece nombrado en NINGUNA página — ni Casos de Éxito, ni el resumen de Home, ni testimonios — hasta que se confirme explícitamente la lista definitiva y autorizada.** Los ejemplos de tono/copy que aparecen en `guia-nueva-web-mercadocorp.md` son ilustrativos, no contenido aprobado para publicar — nunca los copies literalmente a `content/*.ts`
- No escribas el texto legal final de Políticas de Privacidad / Términos — deja placeholder
- No conectes el formulario de Contacto a un backend real
- Nunca uses emojis en copy, UI, badges o bullets — todo ícono va con `lucide-react` (ver PROJECT_PLAN.md §5.3)
- Ninguna página de servicio lleva franja de logos ni de estadísticas — esas franjas son exclusivas de Inicio y los 2 hubs, adaptadas por pilar (ver PROJECT_PLAN.md §5.1-5.2)
- No mezcles logos de stack/plataformas con logos de clientes reales en la misma franja

## Verificación antes de reportar una fase como completa
1. `npm run build` sin errores
2. Captura de pantalla de la página en tema claro Y oscuro
3. Captura en viewport mobile (375px) y desktop (1440px)
4. Si la página tiene un componente de `components/three/`, confirma que existe fallback estático bajo 768px
5. Confirma que la página renderiza correctamente en los 3 idiomas (ES/EN/RU), incluido el `<title>`/meta description

## Reporte de finalización
Al terminar una fase del `PROJECT_PLAN.md`, entrega: lista de archivos creados/modificados, capturas de verificación, y cualquier desviación del plan con su justificación — nunca asumas silenciosamente un cambio de alcance.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
