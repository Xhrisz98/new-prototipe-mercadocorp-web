"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

// Va dentro de cada <Canvas> del sitio. Al desmontar, R3F 9 llama a
// gl.forceContextLoss() ~500ms después sin haber quitado el listener
// "webglcontextlost" de three.js, que entonces imprime "THREE.WebGLRenderer: Context
// Lost." en cada navegación. gl.dispose() libera antes los recursos del renderer y
// quita ese listener; la pérdida de contexto posterior de R3F sigue liberando la GPU.
export function WebGLRelease() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    return () => {
      const canvas = gl.domElement;
      // StrictMode (dev) simula un desmontaje sin sacar el canvas del DOM: solo se
      // libera si el canvas realmente dejó el documento.
      setTimeout(() => {
        if (!canvas.isConnected) gl.dispose();
      }, 0);
    };
  }, [gl]);

  return null;
}
