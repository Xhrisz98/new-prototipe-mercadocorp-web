"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// QR ↔ árbol (PROJECT_PLAN.md §5.8 v3).
//
// - Reposo A: la imagen real y validada, con exactamente el mismo <Image> que se
//   escaneó con teléfono — nunca se modifica ni se reemplaza como estado de reposo.
// - Reposo B en ≥768px: la escena 3D decorativa (TreeQRMorphScene), con transición
//   continua de partículas entre A y B.
// - A→B: el canvas se muestra sobre el <img> solo cuando ya dibujó su primer frame
//   (los 625 módulos con el color exacto de la imagen, vistos desde arriba) y recién
//   ahí se oculta el <img>; luego las partículas migran al árbol.
// - B→A: las partículas vuelven a la cuadrícula; al asentarse, se vuelve a mostrar el
//   <img> real y se oculta el canvas.
// - <768px (§7, sin excepciones): nunca se monta el motor 3D, ni al precalentar ni al
//   pedir el árbol. Reposo B es una captura fija de la escena real (asentada, sin
//   animar, en azules de marca — /images/tree-3d-static-{light,dark}.png) y el cambio
//   entre A/B es un crossfade simple, tal como describe el plan para este caso.

const MOBILE_QUERY = "(max-width: 767px)";
function subscribeMobile(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getMobileServerSnapshot = () => false;

const loadScene = () => import("@/components/three/TreeQRMorphScene");
const TreeQRMorphScene = dynamic(loadScene, { ssr: false });

interface TreeQRMorphProps {
  view: "qr" | "tree";
  isDark: boolean;
}

export function TreeQRMorph({ view, isDark }: TreeQRMorphProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
  // sceneMounted: en ≥768px la escena se precalienta en un momento ocioso (contexto
  // WebGL + shaders listos) para que el toque no espere ~1s de inicialización. En
  // mobile nunca se monta: ni al precalentar ni al pedir el árbol (ver fallback
  // estático más abajo).
  const [sceneMounted, setSceneMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  // showCanvas: el canvas está a la vista y el <img> oculto.
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setSceneMounted(true), { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setSceneMounted(true), 1500); // Safari
    return () => window.clearTimeout(id);
  }, [isMobile]);

  // Pedido de árbol: si la escena todavía no estaba montada, se monta ya (nunca en
  // mobile — ahí wantTree solo cambia qué <Image> del crossfade está visible).
  const wantTree = view === "tree";
  if (wantTree && !sceneMounted && !isMobile) setSceneMounted(true);
  // El canvas reemplaza al <img> recién cuando la escena está lista.
  if (wantTree && sceneReady && !showCanvas) setShowCanvas(true);

  const handleReady = useCallback(() => setSceneReady(true), []);
  const handleSettled = useCallback((p: 0 | 1) => {
    // De vuelta en la cuadrícula plana: se retira el canvas y vuelve el <img> real.
    if (p === 0) setShowCanvas(false);
  }, []);

  const target: 0 | 1 = showCanvas && wantTree ? 1 : 0;

  // <768px: crossfade simple entre la imagen real y la captura fija del árbol — el
  // motor 3D nunca se monta en este ancho (§7).
  if (isMobile) {
    const fade = prefersReducedMotion ? "" : "transition-opacity duration-500 ease-in-out";
    return (
      <div className="relative w-full h-full" data-morph-state={view}>
        <Image
          src="/images/tree-qr-scannable-blue.png"
          alt="MercadoCorp Scannable WhatsApp QR Code"
          fill
          sizes="280px"
          className={`object-contain p-2 drop-shadow-md select-none pointer-events-none ${fade}`}
          style={{ opacity: view === "qr" ? 1 : 0 }}
          priority
        />
        <Image
          src={isDark ? "/images/tree-3d-static-dark.png" : "/images/tree-3d-static-light.png"}
          alt=""
          aria-hidden
          fill
          sizes="280px"
          className={`object-contain p-2 drop-shadow-md select-none pointer-events-none ${fade}`}
          style={{ opacity: view === "tree" ? 1 : 0 }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" data-morph-state={showCanvas ? (wantTree ? "tree" : "returning") : "qr"}>
      <Image
        src="/images/tree-qr-scannable-blue.png"
        alt="MercadoCorp Scannable WhatsApp QR Code"
        fill
        sizes="(max-width: 640px) 280px, 320px"
        className="object-contain p-2 drop-shadow-md select-none pointer-events-none"
        style={{ visibility: showCanvas ? "hidden" : "visible" }}
        priority
      />
      {sceneMounted && (
        // Mismo recuadro que ocupa la imagen (p-2 → inset 8px) y misma sombra, para
        // que el primer frame del canvas calce exactamente sobre el <img>.
        <div
          className="absolute inset-2 drop-shadow-md pointer-events-none select-none"
          style={{ visibility: showCanvas ? "visible" : "hidden" }}
          aria-hidden={!showCanvas}
        >
          <TreeQRMorphScene
            target={target}
            active={showCanvas}
            instant={prefersReducedMotion}
            isDark={isDark}
            onReady={handleReady}
            onSettled={handleSettled}
          />
        </div>
      )}
    </div>
  );
}
