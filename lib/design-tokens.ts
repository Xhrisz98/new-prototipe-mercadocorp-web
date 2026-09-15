// lib/design-tokens.ts
// Tokens oficiales de diseño de MercadoCorp extraídos de la Sección 4 de PROJECT_PLAN.md
// Fuente: Manual de Identidad Corporativa oficial

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

export type ColorTokens = typeof colors;
export type FontTokens = typeof fonts;
