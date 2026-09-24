"use client";

import { useSyncExternalStore } from "react";

// Mismo patrón de detección síncrona vía matchMedia que ya usan DataFlowCore/
// AgentSphere para mobile: useSyncExternalStore evita el mismatch de hidratación
// que dejaría un useState(getSnapshot) + useEffect.
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerSnapshot = () => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
