"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

// Detección síncrona en el primer render vía matchMedia — evita el frame en blanco
// que dejaba el patrón useState(false) + mounted + useEffect. En SSR (sin `window`)
// asume desktop; el cliente corrige de inmediato en la inicialización de useState.
function getIsMobileSync(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

// Hook ligero para tracking de scroll con desacoplamiento suave (Lerp)
function useScrollProgress() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalizar scroll del viewport (0 a 1 dentro de los primeros 900px de scroll)
      const maxScroll = 850;
      const current = window.scrollY || 0;
      scrollRef.current = Math.min(Math.max(current / maxScroll, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollRef;
}

// Subcomponente principal 3D: Núcleo Neural Cinético
function NeuralCoreScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const facetsRef = useRef<THREE.Group>(null);

  const scrollRef = useScrollProgress();
  const currentScroll = useRef(0);

  // Colores corporativos según tema
  const brandPrimary = useMemo(
    () => (isDark ? new THREE.Color("#3F5FFF") : new THREE.Color("#0022D2")),
    [isDark]
  );
  // En modo oscuro brandAccent comparte el mismo token que brandPrimary (brand.primaryDark,
  // #3F5FFF) — la separación visual de las piezas secundarias (anillo 1, facetas impares)
  // se logra con opacidad reducida (~65%) en vez de un segundo color, para no introducir
  // un hex fuera de lib/design-tokens.ts. El núcleo (brandPrimary, wireframe) queda a 100%.
  const brandAccent = useMemo(() => new THREE.Color("#3F5FFF"), []);

  // 1. Facetas cristalinas exteriores (Deconstructibles con el scroll)
  const facetData = useMemo(() => {
    // 24 facetas posicionadas en una esfera envolvente
    const count = 24;
    const items = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // Ángulo áureo para distribución esférica perfecta

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y va de 1 a -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const dir = new THREE.Vector3(x, y, z).normalize();
      const basePos = dir.clone().multiplyScalar(1.65);

      items.push({
        dir,
        basePos,
        scale: 0.45 + (i % 3) * 0.12,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
      });
    }
    return items;
  }, []);

  // 2. Nube de micro-partículas estelares
  const particleCount = 75;
  const [particlePositions, particleVelocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.0 + Math.random() * 3.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [particleCount]);

  useFrame((state, delta) => {
    // Interpolación suave (lerp) del valor del scroll para 60fps constantes
    currentScroll.current = THREE.MathUtils.lerp(
      currentScroll.current,
      scrollRef.current,
      0.08
    );
    const s = currentScroll.current; // 0 = hero estático, 1 = scroll completo

    const mouseX = state.pointer.x * 0.6;
    const mouseY = state.pointer.y * 0.6;

    // Rotación suave del grupo con el cursor
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY * 0.2,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouseX * 0.2,
        0.05
      );
    }

    // Cámara: Dolly-in progresivo con el scroll (viaje a través del núcleo)
    state.camera.position.z = THREE.MathUtils.lerp(5.2, 3.2, s);
    state.camera.position.y = THREE.MathUtils.lerp(0, -0.6, s);

    // Núcleo interno: Pulsación de energía y expansión con el scroll
    if (coreRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2.5) * 0.06;
      const coreScale = 1.0 + pulse + s * 0.8;
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.4;
    }

    // Anillos orbitales
    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.8;
      ring1Ref.current.rotation.y += delta * 0.4;
      const ring1Scale = 1.0 + s * 1.5;
      ring1Ref.current.scale.set(ring1Scale, ring1Scale, ring1Scale);

      ring2Ref.current.rotation.y -= delta * 0.6;
      ring2Ref.current.rotation.z += delta * 0.5;
      const ring2Scale = 1.0 + s * 2.0;
      ring2Ref.current.scale.set(ring2Scale, ring2Scale, ring2Scale);
    }

    // Facetas: Deconstrucción radial (Bloom) con el scroll
    if (facetsRef.current) {
      facetsRef.current.children.forEach((child, i) => {
        const item = facetData[i];
        if (!item) return;

        // Separación radial: A mayor scroll, más lejos viajan hacia los bordes
        const bloomDistance = 1.65 + Math.pow(s, 1.4) * 5.2;
        child.position.copy(item.dir).multiplyScalar(bloomDistance);

        // Rotación individual de cada faceta
        child.rotation.x += delta * (0.5 + s * 2.0);
        child.rotation.y += delta * (0.8 + s * 2.5);

        // Dispersión y desvanecimiento
        const opacityScale = Math.max(1.0 - s * 0.7, 0.2);
        child.scale.setScalar(item.scale * (1.0 + s * 0.3) * opacityScale);
      });
    }

    // Partículas estelares: Movimiento constante y dispersión perimetral
    if (particlesRef.current) {
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] += particleVelocities[i * 3];
        particlePositions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        particlePositions[i * 3 + 2] += particleVelocities[i * 3 + 2];

        // Expansión con el scroll
        if (s > 0.05) {
          particlePositions[i * 3] += particlePositions[i * 3] * 0.015 * s;
          particlePositions[i * 3 + 1] += particlePositions[i * 3 + 1] * 0.015 * s;
          particlePositions[i * 3 + 2] += particlePositions[i * 3 + 2] * 0.015 * s;
        }

        // Rebote en límites
        const limit = 4.5 + s * 3.0;
        if (Math.abs(particlePositions[i * 3]) > limit) particleVelocities[i * 3] *= -1;
        if (Math.abs(particlePositions[i * 3 + 1]) > limit) particleVelocities[i * 3 + 1] *= -1;
        if (Math.abs(particlePositions[i * 3 + 2]) > limit) particleVelocities[i * 3 + 2] *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Iluminación puntual interna dentro del núcleo */}
      <pointLight color={brandAccent} intensity={isDark ? 8 : 5} distance={6} />
      <pointLight position={[3, 3, 3]} color={brandPrimary} intensity={isDark ? 5 : 3} />

      {/* 1. Núcleo Energético Central (Icosaedro wireframe + pulso interno) */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color={brandPrimary}
          emissive={brandPrimary}
          emissiveIntensity={isDark ? 0.8 : 0.35}
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Esfera interior luminosa suave y translúcida (preserva legibilidad del texto) */}
      <mesh>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial
          color={brandAccent}
          transparent
          opacity={isDark ? 0.22 : 0.12}
        />
      </mesh>

      {/* 2. Anillos Orbitales Concéntricos */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.9, 0.016, 16, 64]} />
        <meshStandardMaterial
          color={brandAccent}
          emissive={brandAccent}
          emissiveIntensity={0.4}
          transparent
          opacity={isDark ? 0.65 : 0.35}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2.2, 0.014, 16, 64]} />
        <meshStandardMaterial
          color={brandPrimary}
          emissive={brandPrimary}
          emissiveIntensity={0.35}
          transparent
          opacity={isDark ? 0.5 : 0.3}
        />
      </mesh>

      {/* 3. Facetas Cristalinas Deconstructibles */}
      <group ref={facetsRef}>
        {facetData.map((item, idx) => (
          <mesh key={idx} position={item.basePos.toArray()}>
            <octahedronGeometry args={[item.scale, 0]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? brandPrimary : brandAccent}
              roughness={0.12}
              metalness={0.85}
              transparent
              opacity={isDark ? (idx % 2 === 0 ? 0.32 : 0.65) : 0.12}
              wireframe={idx % 2 === 0}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Nube de micro-partículas estelares */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={brandAccent}
          transparent
          opacity={isDark ? 0.85 : 0.65}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Fallback estático ligero y elegante para Mobile (< 768px)
function StaticMobileFallback({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center pointer-events-none select-none ${
        isDark ? "opacity-90" : "opacity-75"
      }`}
      aria-hidden="true"
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Anillo exterior animado con CSS puro */}
        <div
          className="absolute inset-0 rounded-full border border-[var(--color-primary)]/30 animate-[spin_18s_linear_infinite]"
          style={{ borderTopColor: "var(--color-primary)" }}
        />
        {/* Anillo secundario */}
        <div
          className="absolute inset-6 rounded-full border border-[var(--color-primary)]/20 animate-[spin_12s_linear_infinite_reverse]"
          style={{ borderRightColor: "#3F5FFF" }}
        />
        {/* Núcleo central pulsante */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0022D2] to-[#3F5FFF] opacity-40 blur-md animate-pulse" />
        <div className="absolute w-12 h-12 rounded-full border-2 border-white/60 bg-[var(--color-primary)] shadow-lg shadow-[#0022D2]/50" />
      </div>
    </div>
  );
}

export function KineticNeuralCore() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileSync);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const isDark = theme === "dark";

  // En pantallas móviles, entregar el fallback estático ligero (< 768px) conforme a AGENTS.md
  if (isMobile) {
    return <StaticMobileFallback isDark={isDark} />;
  }

  return (
    <div className="w-full h-full min-h-[550px] relative pointer-events-auto select-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={isDark ? 0.6 : 0.9} />
        <NeuralCoreScene isDark={isDark} />
      </Canvas>
    </div>
  );
}
