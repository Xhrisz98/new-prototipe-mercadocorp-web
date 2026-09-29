"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/design-tokens";

// Árbol 3D del reverso de InteractiveTreeQR (PROJECT_PLAN.md §5.8). Crece por
// niveles: tronco → ramas primarias → secundarias → terciarias. Cada rama empieza
// a crecer cuando su rama madre ya llegó al punto de donde brota, así que el
// crecimiento se propaga de forma continua en vez de aparecer por capas sueltas.

export type TreeDetail = "full" | "lite";

interface Segment {
  start: THREE.Vector3;
  quat: THREE.Quaternion; // orienta el cilindro base (+Y) hacia la dirección de la rama
  dir: THREE.Vector3;
  length: number;
  radius: number;
  depth: number;
  t0: number; // segundos desde que arranca el crecimiento
  dur: number;
  terminal: boolean;
}

// Ramas hijas por nivel (índice = profundidad de la madre). "lite" recorta un
// nivel completo y ramas por nodo — misma silueta, ~1/3 de la geometría.
const BRANCHING: Record<TreeDetail, number[]> = {
  full: [5, 3, 2],
  lite: [4, 3],
};
const RADIAL_SEGMENTS: Record<TreeDetail, number> = { full: 8, lite: 5 };
const LEVEL_DURATION = [0.55, 0.5, 0.42, 0.36];

// Crecimiento completo (incluido el "pop" de las puntas) normalizado a este total,
// sin importar cómo caigan los números aleatorios de la semilla.
export const TREE_GROWTH_SECONDS = 2.1;
const TIP_POP = 0.28;
const MAX_STEP_SECONDS = 0.1;

// PRNG determinista: el árbol es siempre el mismo en cada visita/captura.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const UP = new THREE.Vector3(0, 1, 0);
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function buildTree(detail: TreeDetail): { segments: Segment[]; maxDepth: number } {
  const rand = mulberry32(20260928);
  const branching = BRANCHING[detail];
  const maxDepth = branching.length;
  const segments: Segment[] = [];

  const add = (start: THREE.Vector3, dir: THREE.Vector3, length: number, radius: number, depth: number, t0: number) => {
    const seg: Segment = {
      start,
      dir,
      quat: new THREE.Quaternion().setFromUnitVectors(UP, dir),
      length,
      radius,
      depth,
      t0,
      dur: LEVEL_DURATION[depth],
      terminal: depth === maxDepth,
    };
    segments.push(seg);
    if (depth === maxDepth) return;

    const count = branching[depth];
    const azimuth0 = rand() * Math.PI * 2;
    for (let i = 0; i < count; i++) {
      // La primera hija de cada rama (salvo el tronco) continúa casi en la misma
      // dirección — da un "líder" y una copa más llena en vez de un abanico plano.
      const isLeader = i === 0 && depth > 0;
      const attach = isLeader ? 1 : depth === 0 ? 0.5 + (i / count) * 0.45 + rand() * 0.05 : 0.45 + rand() * 0.5;
      const tilt = isLeader ? 0.2 + rand() * 0.15 : depth === 0 ? 0.62 + rand() * 0.3 : 0.5 + rand() * 0.35;
      const azimuth = azimuth0 + i * (depth === 0 ? GOLDEN_ANGLE * 2 : (Math.PI * 2) / count) + rand() * 0.4;

      // Eje perpendicular a la rama madre, girado en azimut alrededor de ella.
      const ref = Math.abs(dir.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : UP;
      const perp = new THREE.Vector3().crossVectors(dir, ref).normalize().applyAxisAngle(dir, azimuth);
      const childDir = dir.clone().applyAxisAngle(perp, tilt);
      // Leve tendencia hacia arriba para que la copa no se desparrame hacia el suelo.
      childDir.lerp(UP, 0.12).normalize();

      const childStart = start.clone().addScaledVector(dir, length * attach);
      const childLength = length * (depth === 0 ? 0.62 : 0.7) * (0.85 + rand() * 0.3);
      const childRadius = radius * (0.62 - (1 - attach) * 0.12);
      add(childStart, childDir, childLength, childRadius, depth + 1, t0 + LEVEL_DURATION[depth] * attach);
    }
  };

  add(new THREE.Vector3(0, 0, 0), UP.clone(), 1.15, 0.085, 0, 0);

  // Normaliza el calendario al total fijo.
  const rawEnd = Math.max(...segments.map((s) => s.t0 + s.dur));
  const k = (TREE_GROWTH_SECONDS - TIP_POP) / rawEnd;
  for (const s of segments) {
    s.t0 *= k;
    s.dur *= k;
  }
  return { segments, maxDepth };
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

interface TreeSceneProps {
  detail: TreeDetail;
  instant: boolean;
  isDark: boolean;
  onProgress?: (p: number) => void;
}

function TreeScene({ detail, instant, isDark, onProgress }: TreeSceneProps) {
  const { segments, maxDepth } = useMemo(() => buildTree(detail), [detail]);
  const tips = useMemo(() => segments.filter((s) => s.terminal), [segments]);

  // Encuadre automático a partir de la caja real del árbol (cámara en z=4, fov 38 →
  // ±1.38 visibles): la copa llega hasta y≈1.2 y la base queda en y=-1.0, dejando
  // libre la franja inferior donde va la etiqueta de la tarjeta. El radio horizontal
  // se mide en XZ porque el árbol rota sobre su eje.
  const fitScale = useMemo(() => {
    let maxY = 0;
    let maxR = 0;
    for (const s of segments) {
      const end = s.start.clone().addScaledVector(s.dir, s.length);
      maxY = Math.max(maxY, end.y);
      maxR = Math.max(maxR, Math.hypot(end.x, end.z));
    }
    return Math.min(2.2 / maxY, 1.2 / maxR);
  }, [segments]);

  const groupRef = useRef<THREE.Group>(null);
  const branchesRef = useRef<THREE.InstancedMesh>(null);
  const tipsRef = useRef<THREE.InstancedMesh>(null);
  const framesRef = useRef(0);
  const elapsedRef = useRef(0);
  const doneRef = useRef(false);
  const lastProgressRef = useRef(-1);

  // Cilindro con la base en el origen y altura 1 sobre +Y: escalar Y = longitud
  // visible de la rama, así "crecer" es solo escalar desde la base.
  const branchGeometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.62, 1, 1, RADIAL_SEGMENTS[detail], 1);
    g.translate(0, 0.5, 0);
    return g;
  }, [detail]);
  const tipGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, detail === "full" ? 1 : 0), [detail]);

  // Gradiente por profundidad: #0022D2 en el tronco → #3F5FFF en las puntas.
  // Además arranca todas las instancias en escala 0: la matriz por defecto es la
  // identidad, que dibujaría cada rama a tamaño completo durante el primer frame.
  useLayoutEffect(() => {
    const mesh = branchesRef.current;
    const tipMesh = tipsRef.current;
    if (!mesh || !tipMesh) return;
    const base = new THREE.Color(colors.brand.primary);
    const tip = new THREE.Color(colors.brand.primaryDark);
    const c = new THREE.Color();
    const zero = new THREE.Matrix4().makeScale(0, 0, 0);
    segments.forEach((s, i) => {
      c.copy(base).lerp(tip, s.depth / maxDepth);
      mesh.setColorAt(i, c);
      mesh.setMatrixAt(i, zero);
    });
    for (let i = 0; i < tipMesh.count; i++) tipMesh.setMatrixAt(i, zero);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
    tipMesh.instanceMatrix.needsUpdate = true;
  }, [segments, maxDepth]);

  const m = useMemo(() => new THREE.Matrix4(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const scl = useMemo(() => new THREE.Vector3(), []);
  const idQuat = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, delta) => {
    const branches = branchesRef.current;
    const tipMesh = tipsRef.current;
    if (!branches || !tipMesh) return;

    // Reloj propio acumulado por frame, con tope por paso: una traba puntual (primer
    // frame con compilación de shaders, GC en un móvil lento) congela el crecimiento
    // en vez de saltarse parte de él. El primer frame no suma — su delta incluye la
    // creación del contexto WebGL.
    let elapsed: number;
    if (instant) {
      elapsed = TREE_GROWTH_SECONDS;
    } else {
      framesRef.current++;
      if (framesRef.current > 1) elapsedRef.current += Math.min(delta, MAX_STEP_SECONDS);
      elapsed = elapsedRef.current;
    }

    const progress = clamp01(elapsed / TREE_GROWTH_SECONDS);
    const reachedEnd = progress === 1 && lastProgressRef.current !== 1;
    if (onProgress && (reachedEnd || Math.abs(progress - lastProgressRef.current) > 0.004)) {
      lastProgressRef.current = progress;
      onProgress(progress);
    }

    // Las ramas solo se recalculan mientras crecen; ya construido, el árbol queda
    // quieto y solo rota el grupo + pulsan las puntas.
    if (!doneRef.current) {
      segments.forEach((s, i) => {
        const g = easeOutCubic(clamp01((elapsed - s.t0) / s.dur));
        // Grosor al 35% desde el primer instante: una rama "brota" delgada y engrosa.
        // Antes de brotar va en escala 0 completa — con largo 0 pero radio > 0 el
        // cilindro se dibujaría como un disco plano suelto.
        const r = g > 0 ? s.radius * (0.35 + 0.65 * g) : 0;
        scl.set(r, s.length * g, r);
        m.compose(s.start, s.quat, scl);
        branches.setMatrixAt(i, m);
      });
      branches.instanceMatrix.needsUpdate = true;
      if (progress >= 1) doneRef.current = true;
    }

    const t = state.clock.elapsedTime;
    tips.forEach((s, i) => {
      const end = s.t0 + s.dur;
      const popped = easeOutBack(clamp01((elapsed - end) / TIP_POP));
      const pulse = instant || progress < 1 ? 1 : 1 + Math.sin(t * 2.2 + i * 1.7) * 0.12;
      pos.copy(s.start).addScaledVector(s.dir, s.length);
      const size = 0.018 * popped * pulse;
      scl.set(size, size, size);
      m.compose(pos, idQuat, scl);
      tipMesh.setMatrixAt(i, m);
    });
    tipMesh.instanceMatrix.needsUpdate = true;

    if (groupRef.current && !instant) groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef} position={[0, -1.0, 0]} rotation={[0, 0.6, 0]} scale={fitScale}>
      {/* Base: visible desde el primer frame, antes de que brote el tronco. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshBasicMaterial color={colors.brand.primary} transparent opacity={isDark ? 0.22 : 0.1} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.6, 0.625, 64]} />
        <meshBasicMaterial color={colors.brand.primaryDark} transparent opacity={isDark ? 0.7 : 0.45} depthWrite={false} />
      </mesh>

      <instancedMesh ref={branchesRef} args={[branchGeometry, undefined, segments.length]} frustumCulled={false}>
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.55}
          metalness={0.15}
          // En tema oscuro el azul profundo del tronco se funde con la superficie
          // casi negra: un emisivo del mismo azul de marca lo levanta sin cambiar el tono.
          emissive={colors.brand.primary}
          emissiveIntensity={isDark ? 0.45 : 0.08}
        />
      </instancedMesh>

      {/* Puntas: acento #04E7AF (señal de "vivo/activo", §5.8) — diminutas para que
          el árbol siga siendo azul de marca. */}
      <instancedMesh ref={tipsRef} args={[tipGeometry, undefined, tips.length]} frustumCulled={false}>
        <meshBasicMaterial color={colors.brand.aiAccent} transparent opacity={isDark ? 0.95 : 0.85} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

interface TreeGrowthRevealProps {
  // prefers-reduced-motion: árbol ya construido y quieto, sin animación.
  instant?: boolean;
  isDark: boolean;
  detail?: TreeDetail;
  className?: string;
}

// Crece al montarse. Quien lo usa decide cuándo montarlo: InteractiveTreeQR lo monta
// al terminar el giro de la tarjeta, para que crear el contexto WebGL y compilar los
// shaders nunca trabe la animación del giro.
export default function TreeGrowthReveal({
  instant = false,
  isDark,
  detail = "full",
  className = "",
}: TreeGrowthRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rootRef}
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Árbol 3D de MercadoCorp"
      data-tree-progress="0"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 38 }}
        gl={{ antialias: detail === "full", alpha: true, powerPreference: "high-performance" }}
        dpr={detail === "full" ? [1, 1.75] : [1, 1.25]}
      >
        <ambientLight intensity={isDark ? 0.55 : 0.75} />
        <directionalLight position={[2.5, 4, 3]} intensity={isDark ? 1.6 : 1.9} />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.55} color={colors.brand.primaryDark} />
        <TreeScene
          detail={detail}
          instant={instant}
          isDark={isDark}
          // Progreso expuesto en el DOM (data-tree-progress) para verificación/QA sin
          // re-render de React: se escribe directo sobre el atributo.
          onProgress={(p) => rootRef.current?.setAttribute("data-tree-progress", p.toFixed(3))}
        />
      </Canvas>
    </div>
  );
}
