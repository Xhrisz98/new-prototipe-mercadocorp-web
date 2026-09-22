"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Núcleo 3D de la esfera inteligente con el acento exclusivo #04E7AF
function SphereCore({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Color verde IA reservado para Mind
  const aiColor = useMemo(() => new THREE.Color("#04E7AF"), []);
  const coreColor = useMemo(
    () => (isDark ? new THREE.Color("#023427") : new THREE.Color("#E6FDF7")),
    [isDark]
  );

  // Nube de partículas orbitales alrededor de la esfera
  const particlesCount = 80;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 0.7; // Radio orbital
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [particlesCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    // Rotación suave del núcleo y reacción al cursor
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = mouseY * 0.5 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.z = mouseX * 0.3;
    }

    // Rotación de anillos orbitales
    if (ringRef1.current) {
      ringRef1.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.4) * 0.15;
      ringRef1.current.rotation.y += delta * 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -Math.PI / 4 + Math.cos(time * 0.3) * 0.15;
      ringRef2.current.rotation.z += delta * 0.3;
    }

    // Rotación de enjambre de datos
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Esfera central translúcida con facetas Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 3]} />
        <meshStandardMaterial
          color={coreColor}
          wireframe={true}
          transparent={true}
          opacity={isDark ? 0.35 : 0.45}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Núcleo de energía brillante interior */}
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshBasicMaterial
          color={aiColor}
          transparent={true}
          opacity={isDark ? 0.25 : 0.2}
        />
      </mesh>

      {/* Anillo Orbital 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.7, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={aiColor}
          transparent={true}
          opacity={isDark ? 0.75 : 0.6}
        />
      </mesh>

      {/* Anillo Orbital 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[1.9, 0.012, 16, 64]} />
        <meshBasicMaterial
          color={aiColor}
          transparent={true}
          opacity={isDark ? 0.5 : 0.4}
        />
      </mesh>

      {/* Nube de partículas de inteligencia */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={aiColor}
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}

// Fallback estático en mobile (< 768px) para garantizar rendimiento extremo y cero consumo de GPU
function MobileFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-6 relative select-none"
      aria-hidden="true"
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Resplandor radial difuso */}
        <div className="absolute inset-0 rounded-full bg-[#04E7AF]/15 blur-2xl animate-pulse" />

        {/* Anillos SVG concéntricos estáticos */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full animate-spin-slow opacity-80"
          style={{ animationDuration: "25s" }}
        >
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#04E7AF"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.4"
          />
          <circle
            cx="100"
            cy="100"
            r="65"
            fill="none"
            stroke="#04E7AF"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <circle
            cx="100"
            cy="100"
            r="45"
            fill="#04E7AF"
            fillOpacity="0.08"
            stroke="#04E7AF"
            strokeWidth="2"
            opacity="0.8"
          />
        </svg>

        {/* Núcleo central con pulso */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-[#04E7AF]/30 to-[#04E7AF]/60 border border-[#04E7AF]/80 flex items-center justify-center shadow-[0_0_25px_rgba(4,231,175,0.4)]">
          <div className="w-8 h-8 rounded-full bg-[#04E7AF] animate-ping opacity-30" />
          <div className="absolute w-6 h-6 rounded-full bg-[#04E7AF]" />
        </div>
      </div>
    </div>
  );
}

// Detección síncrona en el primer render vía matchMedia — evita el frame en blanco
// que dejaba el patrón useState(null) + useEffect. En SSR (sin `window`) asume
// desktop; el cliente corrige de inmediato en la inicialización de useState.
function getIsMobileSync(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function AgentSphere({ isDark = true }: { isDark?: boolean }) {
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileSync);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Fallback estático bajo 768px conforme a AGENTS.md
  if (isMobile) {
    return (
      <div className="w-full h-[380px]">
        <MobileFallback />
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] md:h-[520px] relative">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={isDark ? 0.7 : 0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#04E7AF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3F5FFF" />
        <SphereCore isDark={isDark} />
      </Canvas>
    </div>
  );
}
