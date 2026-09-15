# AGENTS.md — Nueva Web MercadoCorp

Lee `PROJECT_PLAN.md` completo antes de tocar código. Este archivo es solo el contrato de comportamiento.

## Stack
Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + React Three Fiber + Framer Motion. No uses Pages Router, no uses JS plano, no uses Three.js sin R3F.

## Comandos
- Instalar: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` (debe pasar sin errores antes de dar una fase por terminada)
- Lint: `npm run lint`

## Estilo
- Colores y tipografía SIEMPRE desde `lib/design-tokens.ts` — nunca hex hardcodeado en componentes
- Copy SIEMPRE desde `content/<page>.ts` — nunca redactes copy nuevo, usa el de `copywriting-nueva-web-mercadocorp.md`
- Componentes de Three.js van en `components/three/`, marcados `"use client"`, con fallback estático en mobile

## Límites — nunca hagas esto sin preguntar primero
- No recolorees el logo de MercadoCorp fuera de sus colores oficiales (`#0022D2`, blanco, negro)
- No uses `#04E7AF` fuera del contexto de Mind/agentes de IA
- No inventes clientes, logos o cifras en Casos de Éxito
- No escribas el texto legal final de Políticas de Privacidad / Términos — deja placeholder
- No conectes el formulario de Contacto a un backend real

## Verificación antes de reportar una fase como completa
1. `npm run build` sin errores
2. Captura de pantalla de la página en tema claro Y oscuro
3. Captura en viewport mobile (375px) y desktop (1440px)
4. Si la página tiene un componente de `components/three/`, confirma que existe fallback estático bajo 768px

## Reporte de finalización
Al terminar una fase del `PROJECT_PLAN.md`, entrega: lista de archivos creados/modificados, capturas de verificación, y cualquier desviación del plan con su justificación — nunca asumas silenciosamente un cambio de alcance.
