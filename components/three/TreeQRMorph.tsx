"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// QR ↔ árbol por transición continua de partículas (PROJECT_PLAN.md §5.8 v3).
//
// - Reposo A: la imagen real y validada, con exactamente el mismo <Image> que se
//   escaneó con teléfono — nunca se modifica ni se reemplaza como estado de reposo.
// - Reposo B: la escena 3D decorativa (TreeQRMorphScene).
// - A→B: el canvas se muestra sobre el <img> solo cuando ya dibujó su primer frame
//   (los 625 módulos con el color exacto de la imagen, vistos desde arriba) y recién
//   ahí se oculta el <img>; luego las partículas migran al árbol.
// - B→A: las partículas vuelven a la cuadrícula; al asentarse, se vuelve a mostrar el
//   <img> real y se oculta el canvas.

const loadScene = () => import("@/components/three/TreeQRMorphScene");
const TreeQRMorphScene = dynamic(loadScene, { ssr: false });

interface TreeQRMorphProps {
  view: "qr" | "tree";
  isDark: boolean;
}

export function TreeQRMorph({ view, isDark }: TreeQRMorphProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // sceneMounted: en ≥768px la escena se precalienta en un momento ocioso (contexto
  // WebGL + shaders listos) para que el toque no espere ~1s de inicialización. En
  // mobile no se precalienta: abrir Contacto o el widget flotante no debe crear un
  // contexto WebGL que el usuario quizá nunca use — ahí se monta recién al pedir el
  // árbol.
  const [sceneMounted, setSceneMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  // showCanvas: el canvas está a la vista y el <img> oculto.
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
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
  }, []);

  // Pedido de árbol: si la escena todavía no estaba montada, se monta ya.
  const wantTree = view === "tree";
  if (wantTree && !sceneMounted) setSceneMounted(true);
  // El canvas reemplaza al <img> recién cuando la escena está lista.
  if (wantTree && sceneReady && !showCanvas) setShowCanvas(true);

  const handleReady = useCallback(() => setSceneReady(true), []);
  const handleSettled = useCallback((p: 0 | 1) => {
    // De vuelta en la cuadrícula plana: se retira el canvas y vuelve el <img> real.
    if (p === 0) setShowCanvas(false);
  }, []);

  const target: 0 | 1 = showCanvas && wantTree ? 1 : 0;

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
