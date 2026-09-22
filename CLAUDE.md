# CLAUDE.md — Nueva Web MercadoCorp

Antes de tocar cualquier archivo o escribir código, lee en este orden:

1. `AGENTS.md` — contrato de comportamiento (stack, comandos, límites, verificación)
2. `PROJECT_PLAN.md` — plan maestro completo (arquitectura, fases, criterios de aceptación)
3. `guia-nueva-web-mercadocorp.md` — sitemap, pilares de servicio, sistema de diseño (colores/tipografía reales de marca)
4. `copywriting-nueva-web-mercadocorp.md` — copy final de cada página (no redactes copy nuevo, usa este)

Estos cuatro archivos son la fuente de verdad de este proyecto. Este archivo (`CLAUDE.md`) no repite su contenido — solo existe para que lo encuentres automáticamente al abrir el proyecto.

## Regla de trabajo

**Este proyecto tiene avance previo hecho con otro agente (Antigravity). Nunca asumas que empiezas de cero.**

Antes de escribir o modificar cualquier archivo, en tu primera respuesta:
1. Recorre el árbol de archivos actual del proyecto (`app/`, `components/`, `lib/`, `content/`)
2. Compara lo que existe contra las Fases 0-4 de `PROJECT_PLAN.md` sección 6, y contra los criterios de aceptación de la sección 7
3. Reporta explícitamente: qué fase(s) están completas, cuáles están parciales (y qué les falta), y cuáles no se han empezado
4. Señala cualquier desviación entre lo ya construido y lo que dice `PROJECT_PLAN.md` o `guia-nueva-web-mercadocorp.md` (ej. colores fuera de `design-tokens.ts`, copy distinto al de `copywriting-nueva-web-mercadocorp.md`)

Solo después de ese diagnóstico, continúa ejecutando el plan **por fases**, en el orden de `PROJECT_PLAN.md` sección 6, retomando desde donde el diagnóstico indique — no repitas trabajo ya hecho y verificado, y no saltes fases sin pasar antes por su checklist de verificación (sección 7 del plan / sección "Verificación" de `AGENTS.md`).

Si vas a usar un servidor MCP de navegador (Playwright u otro) para verificar visualmente, úsalo después de cada fase para capturar la página en tema claro/oscuro y en mobile/desktop, tal como pide `AGENTS.md`.

## Antes de reportar algo como terminado

Sigue exactamente la sección "Verificación antes de reportar una fase como completa" y "Reporte de finalización" de `AGENTS.md`.
