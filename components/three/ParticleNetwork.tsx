"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

// Subcomponente 3D para la red de nodos
function Nodes({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Colores de marca oficiales según el tema
  const particleColor = useMemo(
    () => (isDark ? new THREE.Color("#3F5FFF") : new THREE.Color("#0022D2")),
    [isDark]
  );
  const lineColor = useMemo(
    () => (isDark ? new THREE.Color("#3F5FFF") : new THREE.Color("#0022D2")),
    [isDark]
  );

  const count = 60; // Número óptimo para profundidad cinematográfica a 60fps constantes
  const maxDistance = 2.6;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, [count]);

  const linePositions = useMemo(() => {
    // Máximo de pares posibles
    const maxLines = (count * (count - 1)) / 2;
    return new Float32Array(maxLines * 6);
  }, [count]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  useFrame((state) => {
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;

    // Actualizar posiciones de nodos
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Rebote suave en los límites
      if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 3.5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 2) velocities[i * 3 + 2] *= -1;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      // Rotación e interactividad sutil con el ratón
      pointsRef.current.rotation.y = mouseX * 0.15;
      pointsRef.current.rotation.x = -mouseY * 0.15;
    }

    // Calcular líneas dinámicas entre nodos cercanos
    let lineIdx = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions[lineIdx++] = positions[i * 3];
          linePositions[lineIdx++] = positions[i * 3 + 1];
          linePositions[lineIdx++] = positions[i * 3 + 2];

          linePositions[lineIdx++] = positions[j * 3];
          linePositions[lineIdx++] = positions[j * 3 + 1];
          linePositions[lineIdx++] = positions[j * 3 + 2];
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIdx / 3);
    lineGeometry.attributes.position.needsUpdate = true;

    if (linesRef.current) {
      linesRef.current.rotation.y = mouseX * 0.15;
      linesRef.current.rotation.x = -mouseY * 0.15;
    }
  });

  return (
    <group>
      {/* Puntos / Nodos de la red */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color={particleColor}
          transparent
          opacity={isDark ? 0.85 : 0.75}
        />
      </points>

      {/* Conexiones / Aristas de la red */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={isDark ? 0.25 : 0.18}
          blending={THREE.NormalBlending}
        />
      </lineSegments>
    </group>
  );
}

// Fallback estático para pantallas móviles (< 768px)
function StaticMobileFallback({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="w-full h-full absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-60"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-sm"
      >
        <g stroke={isDark ? "#3F5FFF" : "#0022D2"} strokeWidth="1" strokeOpacity={isDark ? "0.3" : "0.2"}>
          <line x1="60" y1="80" x2="160" y2="50" />
          <line x1="160" y1="50" x2="280" y2="100" />
          <line x1="280" y1="100" x2="340" y2="180" />
          <line x1="60" y1="80" x2="140" y2="190" />
          <line x1="140" y1="190" x2="220" y2="140" />
          <line x1="220" y1="140" x2="280" y2="100" />
          <line x1="140" y1="190" x2="260" y2="240" />
          <line x1="260" y1="240" x2="340" y2="180" />
          <line x1="160" y1="50" x2="220" y2="140" />
        </g>
        <g fill={isDark ? "#3F5FFF" : "#0022D2"} fillOpacity={isDark ? "0.8" : "0.7"}>
          <circle cx="60" cy="80" r="4" />
          <circle cx="160" cy="50" r="5" />
          <circle cx="280" cy="100" r="4" />
          <circle cx="340" cy="180" r="4.5" />
          <circle cx="140" cy="190" r="4" />
          <circle cx="220" cy="140" r="5" />
          <circle cx="260" cy="240" r="4" />
        </g>
      </svg>
    </div>
  );
}

export function ParticleNetwork() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      // Menor a 768px activa el fallback estático
      setIsDesktop(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Mientras se determina en el cliente, mostramos el contenedor seguro
  if (isDesktop === null) {
    return <div className="w-full h-full absolute inset-0 pointer-events-none" />;
  }

  // Si es móvil (<768px): fallback estático garantizado por regla de AGENTS.md
  if (!isDesktop) {
    return <StaticMobileFallback isDark={isDark} />;
  }

  // Desktop (>=768px): Canvas interactivo Three.js R3F
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Nodes isDark={isDark} />
      </Canvas>
    </div>
  );
}
