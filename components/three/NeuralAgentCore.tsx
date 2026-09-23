"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/components/theme/ThemeProvider";

// Rango de scroll (px) dentro del hero donde ocurre el morph reposo → activado.
// Fuera del rango el estado queda fijo en su extremo (nunca hay loop autónomo).
const HERO_SCROLL_RANGE = 320;

const SOMA_RADIUS = 0.9;
const MAX_REACH = 3.2;
const MAX_DEPTH = 3;

const COUNT_SOMA = 3400;
const COUNT_BRANCH = 14000;
const COUNT_NODE = 1100;
const COUNT_STARS = 320;
const SYNAPTIC_NODES = 10;

// Detección síncrona en el primer render (mismo patrón ya corregido en AgentSphere):
// nunca isMobile = null + useEffect, que dejaba un frame en blanco.
function getIsMobileSync(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

// PRNG determinista: la misma neurona en cada render y entre servidor y cliente.
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

function perpendicularTo(v: THREE.Vector3): THREE.Vector3 {
  const ref = Math.abs(v.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  return new THREE.Vector3().crossVectors(v, ref).normalize();
}

interface SkeletonSample {
  pos: THREE.Vector3;
  branchDist: number;
  thickness: number;
}

interface BifurcationNode {
  pos: THREE.Vector3;
  branchDist: number;
  depth: number;
}

// Ramificación recursiva: cada rama se subdivide en 2-4 hijas más cortas y delgadas,
// con curvatura propia — árbol/coral, nunca rayos rectos desde el centro.
function buildSkeleton() {
  const rand = mulberry32(20260923);
  const samples: SkeletonSample[] = [];
  const bifurcations: BifurcationNode[] = [];

  function grow(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    length: number,
    thickness: number,
    depth: number
  ) {
    const end = origin.clone().addScaledVector(dir, length);

    // Curvatura orgánica: el punto de control desvía la rama fuera de la línea recta.
    const bend = perpendicularTo(dir).applyAxisAngle(dir, rand() * Math.PI * 2);
    const control = origin
      .clone()
      .addScaledVector(dir, length * 0.5)
      .addScaledVector(bend, length * (0.16 + rand() * 0.22));
    const curve = new THREE.QuadraticBezierCurve3(origin, control, end);

    const steps = Math.max(5, Math.round(length * 22));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const pos = curve.getPoint(t);
      samples.push({
        pos,
        branchDist: Math.min(pos.length() / MAX_REACH, 1),
        thickness: thickness * (1 - 0.5 * t),
      });
    }

    if (depth >= MAX_DEPTH) return;

    bifurcations.push({
      pos: end.clone(),
      branchDist: Math.min(end.length() / MAX_REACH, 1),
      depth,
    });

    const tangent = curve.getTangent(1).normalize();
    const childCount = depth === 0 ? 2 + (rand() < 0.5 ? 1 : 0) : 2;

    for (let c = 0; c < childCount; c++) {
      const axis = perpendicularTo(tangent).applyAxisAngle(
        tangent,
        (c / childCount) * Math.PI * 2 + rand() * 0.9
      );
      const childDir = tangent
        .clone()
        .applyAxisAngle(axis, 0.38 + rand() * 0.44)
        .normalize();
      grow(
        end.clone(),
        childDir,
        length * (0.56 + rand() * 0.16),
        thickness * 0.62,
        depth + 1
      );
    }
  }

  const primaries = 8;
  const goldenAngle = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < primaries; i++) {
    const y = 1 - (i / (primaries - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const dir = new THREE.Vector3(
      Math.cos(theta) * radiusAtY + (rand() - 0.5) * 0.18,
      y + (rand() - 0.5) * 0.18,
      Math.sin(theta) * radiusAtY + (rand() - 0.5) * 0.18
    ).normalize();

    grow(
      dir.clone().multiplyScalar(SOMA_RADIUS * 0.82),
      dir,
      1.1 + rand() * 0.3,
      0.105,
      0
    );
  }

  // Nodos sinápticos: bifurcaciones poco profundas, repartidas a lo largo del árbol.
  const shallow = bifurcations.filter((n) => n.depth <= 1);
  const step = Math.max(1, Math.floor(shallow.length / SYNAPTIC_NODES));
  const synapticNodes: BifurcationNode[] = [];
  for (let i = 0; i < shallow.length && synapticNodes.length < SYNAPTIC_NODES; i += step) {
    synapticNodes.push(shallow[i]);
  }

  return { samples, synapticNodes, rand };
}

// Estado activado: la estructura converge hacia el núcleo con un giro suave,
// en vez de simplemente encogerse.
function activatedTarget(p: THREE.Vector3, converge: number, swirlAxis: THREE.Vector3) {
  const target = p.clone().multiplyScalar(converge);
  target.applyAxisAngle(swirlAxis, 0.6 * (p.length() / MAX_REACH));
  return target;
}

function buildNeuronGeometry() {
  const { samples, synapticNodes, rand } = buildSkeleton();
  const total = COUNT_SOMA + COUNT_BRANCH + COUNT_NODE;

  const positions = new Float32Array(total * 3);
  const targets = new Float32Array(total * 3);
  const types = new Float32Array(total);
  const branchDists = new Float32Array(total);
  const randoms = new Float32Array(total);
  const sizes = new Float32Array(total);
  const distToCenter = new Float32Array(total);

  const swirlAxis = new THREE.Vector3(0, 1, 0);
  let offset = 0;

  const push = (
    pos: THREE.Vector3,
    target: THREE.Vector3,
    type: number,
    branchDist: number,
    size: number
  ) => {
    positions[offset * 3] = pos.x;
    positions[offset * 3 + 1] = pos.y;
    positions[offset * 3 + 2] = pos.z;
    targets[offset * 3] = target.x;
    targets[offset * 3 + 1] = target.y;
    targets[offset * 3 + 2] = target.z;
    types[offset] = type;
    branchDists[offset] = branchDist;
    randoms[offset] = rand();
    sizes[offset] = size;
    distToCenter[offset] = pos.length();
    offset++;
  };

  // 1. SOMA — cáscara con densidad hacia la superficie: evita que miles de partículas
  // se apilen en el centro y quemen el núcleo a blanco sólido.
  for (let i = 0; i < COUNT_SOMA; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(rand() * 2 - 1);
    const r = SOMA_RADIUS * (0.5 + 0.5 * Math.pow(rand(), 0.35));
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    push(pos, pos.clone().multiplyScalar(1.1), 0, 0, 0.85 + rand() * 0.4);
  }

  // 2. DENDRITAS — partículas dispersas alrededor del esqueleto ramificado.
  for (let i = 0; i < COUNT_BRANCH; i++) {
    const sample = samples[Math.floor(rand() * samples.length)];
    const jitter = new THREE.Vector3(
      rand() - 0.5,
      rand() - 0.5,
      rand() - 0.5
    ).multiplyScalar(sample.thickness * 1.15);
    const pos = sample.pos.clone().add(jitter);
    push(
      pos,
      activatedTarget(pos, 0.55, swirlAxis),
      1,
      sample.branchDist,
      0.7 + rand() * 0.55
    );
  }

  // 3. NODOS SINÁPTICOS — clusters densos y brillantes en las bifurcaciones.
  const perNode = Math.floor(COUNT_NODE / Math.max(1, synapticNodes.length));
  for (let n = 0; n < synapticNodes.length; n++) {
    const node = synapticNodes[n];
    for (let i = 0; i < perNode; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(rand() * 2 - 1);
      const r = 0.035 + Math.pow(rand(), 0.7) * 0.055;
      const pos = node.pos
        .clone()
        .add(
          new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          )
        );
      push(
        pos,
        activatedTarget(pos, 0.5, swirlAxis),
        2,
        node.branchDist,
        0.85 + rand() * 0.6
      );
    }
  }

  // Relleno del remanente (división entera) con partículas de rama.
  while (offset < total) {
    const sample = samples[Math.floor(rand() * samples.length)];
    const pos = sample.pos
      .clone()
      .add(
        new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(
          sample.thickness * 1.15
        )
      );
    push(pos, activatedTarget(pos, 0.55, swirlAxis), 1, sample.branchDist, 0.7 + rand() * 0.5);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
  geometry.setAttribute("aType", new THREE.BufferAttribute(types, 1));
  geometry.setAttribute("aBranchDist", new THREE.BufferAttribute(branchDists, 1));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aDistToCenter", new THREE.BufferAttribute(distToCenter, 1));
  return geometry;
}

function buildStarfieldGeometry() {
  const rand = mulberry32(77120926);
  const positions = new Float32Array(COUNT_STARS * 3);
  const sizes = new Float32Array(COUNT_STARS);
  for (let i = 0; i < COUNT_STARS; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(rand() * 2 - 1);
    const r = 15 + rand() * 9;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = 0.35 + rand() * 0.6;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  return geometry;
}

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aTarget;
  attribute float aType;
  attribute float aBranchDist;
  attribute float aRandom;
  attribute float aSize;
  attribute float aDistToCenter;

  varying float vType;
  varying float vBranchDist;
  varying float vDistToCenter;
  varying float vRandom;

  void main() {
    vType = aType;
    vBranchDist = aBranchDist;
    vDistToCenter = aDistToCenter;
    vRandom = aRandom;

    vec3 pos = mix(position, aTarget, uProgress);

    // Micro-movimiento orgánico solo en reposo (se apaga al activarse).
    if (aType > 0.5) {
      vec3 dir = normalize(pos + vec3(0.0001));
      float wobble = sin(uTime * 1.1 + aRandom * 6.2831 + aBranchDist * 5.0);
      pos += dir * wobble * 0.022 * (1.0 - uProgress);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = aSize;
    if (aType > 1.5) {
      size *= 1.0 + sin(uTime * 3.2 + aRandom * 6.2831) * 0.22;
    }
    gl_PointSize = size * uPixelRatio * (34.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorVivid;
  uniform vec3 uColorGreen;
  uniform vec3 uTipColor;
  uniform float uProgress;
  uniform float uTime;
  uniform float uMasterAlpha;

  varying float vType;
  varying float vBranchDist;
  varying float vDistToCenter;
  varying float vRandom;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    // smoothstep exige edge0 < edge1 — invertirlo es comportamiento indefinido en GLSL
    // (algunos drivers devuelven 0 y la partícula queda invisible).
    float falloff = 1.0 - smoothstep(0.05, 0.5, d);

    vec3 color;
    float alpha;

    if (vType < 0.5) {
      // SOMA: esfera legible con gradiente propio — más saturada al centro,
      // #0022D2 en el borde. Alpha bajo para que la acumulación no la queme.
      float somaNorm = clamp(vDistToCenter / ${SOMA_RADIUS.toFixed(2)}, 0.0, 1.0);
      vec3 center = mix(uColorVivid, uTipColor, 0.5);
      color = mix(center, uColorDeep, pow(somaNorm, 1.6));
      alpha = 0.5;
    } else if (vType < 1.5) {
      // DENDRITAS: gradiente por distancia al soma.
      if (vBranchDist < 0.55) {
        color = mix(uColorDeep, uColorVivid, vBranchDist / 0.55);
      } else {
        // Solo el tramo más externo se aclara, para no desaturar toda la rama.
        color = mix(uColorVivid, uTipColor, pow((vBranchDist - 0.55) / 0.45, 1.8));
      }
      float pulse = sin(vBranchDist * 12.0 - uTime * 2.2) * 0.5 + 0.5;
      color = mix(color, uTipColor, pulse * 0.16);
      alpha = 0.72;
    } else {
      // NODOS SINÁPTICOS: destellos localizados con parpadeo suave.
      color = mix(uColorVivid, uTipColor, 0.6);
      alpha = 0.9 + sin(uTime * 4.5 + vRandom * 6.2831) * 0.1;
    }

    // Activación: el verde aparece únicamente en el estado final, y solo en
    // núcleo y nodos sinápticos (las ramas reciben apenas un tinte).
    float greenTarget = (vType < 0.5 || vType > 1.5) ? 1.0 : 0.12;
    color = mix(color, uColorGreen, smoothstep(0.0, 1.0, uProgress) * greenTarget);
    alpha *= mix(1.0, 1.35, uProgress);

    gl_FragColor = vec4(color, falloff * alpha * uMasterAlpha);
  }
`;

const starVertexShader = /* glsl */ `
  uniform float uPixelRatio;
  attribute float aSize;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (34.0 / -mvPosition.z);
  }
`;

const starFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, (1.0 - smoothstep(0.0, 0.5, d)) * uAlpha);
  }
`;

function NeuronScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  const geometry = useMemo(() => buildNeuronGeometry(), []);
  const starGeometry = useMemo(() => buildStarfieldGeometry(), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uColorDeep: { value: new THREE.Color(colors.brand.primary) },
        uColorVivid: { value: new THREE.Color(colors.brand.primaryDark) },
        uColorGreen: { value: new THREE.Color(colors.brand.aiAccent) },
        // En claro las puntas tiran a azul vivo (un casi-blanco desaparecería
        // sobre el fondo claro); en oscuro se aclaran para dar energía.
        uTipColor: {
          value: isDark ? new THREE.Color(0.55, 0.8, 1.0) : new THREE.Color(colors.brand.primaryDark),
        },
        uMasterAlpha: { value: isDark ? 1.0 : 0.85 },
      },
      transparent: true,
      depthWrite: false,
      // Aditivo sobre fondo oscuro da el brillo del render de referencia; sobre
      // fondo claro lavaría todo a blanco, así que ahí se usa blending normal.
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
  }, [isDark]);

  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uPixelRatio: { value: 1 },
        uColor: {
          value: isDark ? new THREE.Color(0.78, 0.86, 1.0) : new THREE.Color(colors.brand.primary),
        },
        uAlpha: { value: isDark ? 0.5 : 0.16 },
      },
      transparent: true,
      depthWrite: false,
    });
  }, [isDark]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      starGeometry.dispose();
      material.dispose();
      starMaterial.dispose();
    };
  }, [geometry, starGeometry, material, starMaterial]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      scrollTarget.current = Math.min(Math.max(y / HERO_SCROLL_RANGE, 0), 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    const dpr = state.gl.getPixelRatio();
    material.uniforms.uPixelRatio.value = dpr;
    starMaterial.uniforms.uPixelRatio.value = dpr;

    scrollCurrent.current = THREE.MathUtils.lerp(
      scrollCurrent.current,
      scrollTarget.current,
      0.08
    );
    material.uniforms.uProgress.value = scrollCurrent.current;
    material.uniforms.uTime.value = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.075;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.18,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        state.pointer.x * 0.12,
        0.04
      );
    }
  });

  return (
    <>
      <points geometry={starGeometry} material={starMaterial} />
      <group ref={groupRef}>
        <points geometry={geometry} material={material} />
      </group>
    </>
  );
}

// Fallback estático mobile (<768px): estado final ya activado, SVG sin animación.
// Usa el mismo esqueleto determinista proyectado a 2D.
const FALLBACK_PATHS = (() => {
  const rand = mulberry32(20260923);
  const paths: { d: string; width: number; depth: number }[] = [];
  const nodes: { x: number; y: number }[] = [];

  function grow(x: number, y: number, angle: number, length: number, depth: number) {
    const ex = x + Math.cos(angle) * length;
    const ey = y + Math.sin(angle) * length;
    const cx = x + Math.cos(angle + 0.4) * length * 0.55;
    const cy = y + Math.sin(angle + 0.4) * length * 0.55;
    paths.push({
      d: `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      width: Math.max(0.4, 2.1 - depth * 0.55),
      depth,
    });
    if (depth >= 2) return;
    nodes.push({ x: ex, y: ey });
    const children = depth === 0 ? 3 : 2;
    for (let c = 0; c < children; c++) {
      grow(
        ex,
        ey,
        angle + (c - (children - 1) / 2) * 0.55 + (rand() - 0.5) * 0.3,
        length * (0.58 + rand() * 0.14),
        depth + 1
      );
    }
  }

  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2 + rand() * 0.25;
    grow(100 + Math.cos(angle) * 14, 100 + Math.sin(angle) * 14, angle, 30 + rand() * 8, 0);
  }
  return { paths, nodes: nodes.slice(0, 10) };
})();

function NeuralStaticFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="w-72 h-72 max-w-full">
        <defs>
          <radialGradient id="nac-soma" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.brand.aiAccent} stopOpacity="0.9" />
            <stop offset="55%" stopColor={colors.brand.primaryDark} stopOpacity="0.55" />
            <stop offset="100%" stopColor={colors.brand.primary} stopOpacity="0" />
          </radialGradient>
        </defs>
        {FALLBACK_PATHS.paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.depth === 0 ? colors.brand.primary : colors.brand.primaryDark}
            strokeWidth={p.width}
            strokeOpacity={0.55 - p.depth * 0.12}
            strokeLinecap="round"
          />
        ))}
        {FALLBACK_PATHS.nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={2.4} fill={colors.brand.aiAccent} fillOpacity={0.75} />
        ))}
        <circle cx="100" cy="100" r="30" fill="url(#nac-soma)" />
        <circle cx="100" cy="100" r="9" fill={colors.brand.aiAccent} fillOpacity={0.85} />
      </svg>
    </div>
  );
}

export function NeuralAgentCore() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileSync);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  if (isMobile) {
    return <NeuralStaticFallback />;
  }

  return (
    <div className="w-full h-full min-h-[550px] relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 10.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <NeuronScene isDark={theme === "dark"} />
      </Canvas>
    </div>
  );
}
