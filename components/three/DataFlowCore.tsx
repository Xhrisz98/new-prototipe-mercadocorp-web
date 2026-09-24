"use client";

import React, { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/design-tokens";
import { useTheme } from "@/components/theme/ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// Rango de scroll (px) del hero para el morph reposo → activado. Fuera del rango
// el estado queda fijo: la velocidad depende del progreso ya acotado, así que
// nunca sigue acelerando.
const HERO_SCROLL_RANGE = 300;

const TRAIL_COUNT_DESKTOP = 1800;
// Tablet (768-1024px): ~45% menos partículas que desktop — el viewport es más
// angosto y el mismo conteo se ve saturado/pesado en ese rango intermedio.
const TRAIL_COUNT_TABLET = Math.round(TRAIL_COUNT_DESKTOP * 0.55);
const TRAIL_POINTS = 12;
const BASE_SPEED = 0.16;
const ACTIVE_SPEED_MULT = 2.6;
const CONTRACTION = 0.8;
const FUNNEL_DEPTH = 0.3;
// Inclinación del disco: la elipse aparente tiene razón ≈ sin(DISC_TILT) — ~0.55
// da la vista oblicua de la referencia (1.0+ se ve casi de frente, tipo túnel).
const DISC_TILT = 0.58;
const SCREEN_TILT = 0.34;

// Detección síncrona de mobile vía matchMedia con useSyncExternalStore: el
// cliente lee el valor real en el primer render, pero durante la hidratación
// React usa el snapshot del servidor (desktop) y corrige justo después. Con
// useState(getIsMobileSync) la rama mobile no coincidía con el HTML del servidor
// y React descartaba y regeneraba todo el árbol ("Hydration failed").
const MOBILE_QUERY = "(max-width: 767px)";
// Tramo intermedio: animado pero reducido. El límite es solo de ancho (nunca de
// alto/orientación), así que una tablet en landscape (ej. iPad 1024x768) sigue
// cayendo aquí por su ancho real y no se trata como mobile ni como desktop.
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1024px)";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

const subscribeMobile = subscribeMedia(MOBILE_QUERY);
const subscribeTablet = subscribeMedia(TABLET_QUERY);

const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getMobileServerSnapshot = () => false;
const getTabletSnapshot = () => window.matchMedia(TABLET_QUERY).matches;
const getTabletServerSnapshot = () => false;

// PRNG determinista: la misma espiral en cada render.
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

interface Trail {
  radius: number;
  angle: number;
  speed: number;
  arc: number;
  height: number;
  bright: number;
  size: number;
  bold: boolean;
}

// Anillos concéntricos con densidad decreciente hacia afuera, más una fracción de
// "polvo" disperso entre bandas para dar profundidad.
function buildTrails(count: number): Trail[] {
  const rand = mulberry32(51423);
  const bands = [0.18, 0.24, 0.31, 0.39, 0.48, 0.58, 0.69, 0.8, 0.91, 1.0];
  const weights = bands.map((b) => Math.pow(1.12 - b, 1.25));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  const trails: Trail[] = [];
  for (let i = 0; i < count; i++) {
    const isDust = rand() < 0.16;
    let radius: number;
    if (isDust) {
      radius = 0.15 + Math.pow(rand(), 0.85) * 0.95;
    } else {
      let pick = rand() * totalWeight;
      let band = 0;
      while (band < bands.length - 1 && pick > weights[band]) {
        pick -= weights[band];
        band++;
      }
      radius = bands[band] + (rand() - 0.5) * 0.05;
    }

    // Una fracción de estelas se dibuja como "barra de luz" gruesa (varias líneas
    // paralelas), igual que los trazos más intensos de la referencia.
    const bold = !isDust && rand() < 0.22;
    trails.push({
      radius,
      angle: rand() * Math.PI * 2,
      // Rotación diferencial: el interior gira más rápido que el exterior.
      speed: Math.pow(Math.max(radius, 0.12), -0.6),
      arc: isDust ? 0.01 + rand() * 0.03 : 0.14 + rand() * 0.5,
      height: (rand() - 0.5) * 0.045 * (0.5 + radius),
      bright: isDust ? 0.4 + rand() * 0.4 : bold ? 0.85 + rand() * 0.15 : 0.55 + rand() * 0.45,
      size: isDust ? 1.3 + rand() * 1.0 : bold ? 3.0 + rand() * 1.6 : 1.8 + rand() * 1.8,
      bold,
    });
  }
  return trails;
}

function setTrailAttributes(
  geometry: THREE.BufferGeometry,
  count: number,
  fill: (write: (trail: Trail, t: number) => void) => void
) {
  const arrays = {
    aRadius: new Float32Array(count),
    aAngle: new Float32Array(count),
    aSpeed: new Float32Array(count),
    aT: new Float32Array(count),
    aArc: new Float32Array(count),
    aHeight: new Float32Array(count),
    aBright: new Float32Array(count),
    aSize: new Float32Array(count),
  };
  let o = 0;
  fill((trail, t) => {
    arrays.aRadius[o] = trail.radius;
    arrays.aAngle[o] = trail.angle;
    arrays.aSpeed[o] = trail.speed;
    arrays.aT[o] = t;
    arrays.aArc[o] = trail.arc;
    arrays.aHeight[o] = trail.height;
    arrays.aBright[o] = trail.bright;
    arrays.aSize[o] = trail.size;
    o++;
  });
  // La posición real se calcula en el vertex shader; three.js solo exige el atributo.
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  for (const [name, array] of Object.entries(arrays)) {
    geometry.setAttribute(name, new THREE.BufferAttribute(array, 1));
  }
}

function buildGeometries(count: number) {
  const trails = buildTrails(count);
  const segments = TRAIL_POINTS - 1;

  const BOLD_OFFSETS = [-0.0045, 0, 0.0045];
  const strands = trails.flatMap((trail) =>
    trail.bold
      ? BOLD_OFFSETS.map((dr) => ({ ...trail, radius: trail.radius + dr }))
      : [trail]
  );

  const lines = new THREE.BufferGeometry();
  setTrailAttributes(lines, strands.length * segments * 2, (write) => {
    for (const strand of strands) {
      for (let s = 0; s < segments; s++) {
        write(strand, s / segments);
        write(strand, (s + 1) / segments);
      }
    }
  });

  const heads = new THREE.BufferGeometry();
  setTrailAttributes(heads, trails.length, (write) => {
    for (const trail of trails) write(trail, 1);
  });

  return { lines, heads };
}

const flowPositionChunk = /* glsl */ `
  uniform float uPhase;
  uniform float uProgress;
  uniform float uScale;

  attribute float aRadius;
  attribute float aAngle;
  attribute float aSpeed;
  attribute float aT;
  attribute float aArc;
  attribute float aHeight;
  attribute float aBright;
  attribute float aSize;

  varying float vT;
  varying float vRadius;
  varying float vBright;

  vec3 flowPosition() {
    float contraction = mix(1.0, ${CONTRACTION.toFixed(2)}, uProgress);
    float arc = aArc * mix(1.0, 1.5, uProgress);
    float angle = aAngle + uPhase * aSpeed - (1.0 - aT) * arc;
    // La cola queda un poco más afuera que la cabeza: cada estela traza espiral, no círculo.
    float r = aRadius * (1.0 + (1.0 - aT) * 0.035) * contraction;
    // Embudo: el centro se hunde para dar profundidad de vórtice.
    float funnel = -${FUNNEL_DEPTH.toFixed(2)} * pow(1.0 - clamp(aRadius, 0.0, 1.0), 2.0);
    vT = aT;
    vRadius = aRadius;
    vBright = aBright;
    return vec3(cos(angle) * r, aHeight + funnel, sin(angle) * r) * uScale;
  }
`;

const flowColorChunk = /* glsl */ `
  uniform vec3 uOuter;
  uniform vec3 uInner;
  uniform vec3 uHighlight;
  uniform vec3 uGreen;
  uniform float uProgress;
  uniform float uAlpha;
  uniform float uSafeX;
  uniform vec2 uResolution;

  varying float vT;
  varying float vRadius;
  varying float vBright;

  float radialNorm() {
    return clamp((vRadius - 0.15) / 0.85, 0.0, 1.0);
  }

  vec3 flowColor(float rn, float highlight) {
    // #0022D2 en las trayectorias exteriores → #3F5FFF hacia el núcleo.
    vec3 color = mix(uInner, uOuter, smoothstep(0.05, 0.85, rn));
    color = mix(color, uHighlight, clamp(highlight, 0.0, 1.0));
    // El verde solo existe en el estado activado, y solo en el núcleo.
    float coreMask = 1.0 - smoothstep(0.0, 0.3, rn);
    return mix(color, uGreen, uProgress * coreMask);
  }

  // Zona segura: nunca se dibuja sobre la columna del H1/CTA (medida del DOM).
  float safeZone() {
    float sx = gl_FragCoord.x / uResolution.x;
    return smoothstep(uSafeX + 0.01, uSafeX + 0.09, sx);
  }
`;

const lineVertexShader = /* glsl */ `
  ${flowPositionChunk}
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(flowPosition(), 1.0);
  }
`;

const lineFragmentShader = /* glsl */ `
  ${flowColorChunk}
  void main() {
    float rn = radialNorm();
    vec3 color = flowColor(rn, pow(1.0 - rn, 1.5) * 0.7 + pow(vT, 6.0) * 0.35);
    // Estela: cola transparente, cabeza brillante; más brillo hacia el centro.
    float alpha = pow(vT, 1.4) * vBright * mix(1.0, 0.72, rn) * uAlpha * safeZone();
    gl_FragColor = vec4(color, alpha);
  }
`;

const headVertexShader = /* glsl */ `
  uniform float uPixelRatio;
  ${flowPositionChunk}
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(flowPosition(), 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`;

const headFragmentShader = /* glsl */ `
  ${flowColorChunk}
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = 1.0 - smoothstep(0.0, 0.5, d);
    float rn = radialNorm();
    vec3 color = flowColor(rn, 0.45 + (1.0 - rn) * 0.3);
    float alpha = falloff * vBright * mix(1.0, 0.6, rn) * uAlpha * safeZone();
    gl_FragColor = vec4(color, alpha);
  }
`;

const coreVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coreFragmentShader = /* glsl */ `
  uniform vec3 uInner;
  uniform vec3 uGreen;
  uniform float uProgress;
  uniform float uCoreAlpha;
  uniform float uSafeX;
  uniform vec2 uResolution;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - vec2(0.5)) * 2.0;
    float glow = pow(clamp(1.0 - d, 0.0, 1.0), 2.4);
    vec3 color = mix(uInner, uGreen, uProgress);
    float sx = gl_FragCoord.x / uResolution.x;
    float safe = smoothstep(uSafeX + 0.01, uSafeX + 0.09, sx);
    gl_FragColor = vec4(color, glow * uCoreAlpha * mix(0.35, 1.0, uProgress) * safe);
  }
`;

// Geometría de la primera pantalla medida del DOM (ver DataFlowCore): el hero
// puede ser más alto que el viewport, así que la espiral se centra y escala
// respecto a la parte del canvas visible al cargar, no al canvas completo.
interface HeroLayout {
  safeX: number;
  centerFrac: number;
  visibleFrac: number;
}

interface SceneProps {
  isDark: boolean;
  isTablet: boolean;
  layoutRef: React.RefObject<HeroLayout>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}

function FlowScene({ isDark, isTablet, layoutRef, pointerRef }: SceneProps) {
  const viewport = useThree((s) => s.viewport);
  const outerRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const scrollTarget = useRef(0);
  const progress = useRef(0);
  const phase = useRef(0);
  const parallax = useRef({ x: 0, y: 0 });

  const { lines, heads } = useMemo(
    () => buildGeometries(isTablet ? TRAIL_COUNT_TABLET : TRAIL_COUNT_DESKTOP),
    [isTablet]
  );

  const { lineMaterial, headMaterial, coreMaterial } = useMemo(() => {
    const uniforms = {
      uPhase: { value: 0 },
      uProgress: { value: 0 },
      uScale: { value: 1 },
      uPixelRatio: { value: 1 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uSafeX: { value: 0 },
      uOuter: { value: new THREE.Color(colors.brand.primary) },
      uInner: { value: new THREE.Color(colors.brand.primaryDark) },
      // En oscuro las cabezas/núcleo se aclaran; en claro un casi-blanco
      // desaparecería sobre el fondo, así que el realce se queda en azul vivo.
      uHighlight: {
        value: isDark ? new THREE.Color(0.62, 0.82, 1.0) : new THREE.Color(colors.brand.primaryDark),
      },
      uGreen: { value: new THREE.Color(colors.brand.aiAccent) },
      uAlpha: { value: isDark ? 0.95 : 0.8 },
      uCoreAlpha: { value: isDark ? 0.9 : 0.55 },
    };
    // Aditivo sobre fondo oscuro da el brillo de la referencia; sobre fondo claro
    // lavaría todo a blanco, así que ahí se usa blending normal.
    const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    const common = { uniforms, transparent: true, depthWrite: false, blending };
    return {
      lineMaterial: new THREE.ShaderMaterial({
        ...common,
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
      }),
      headMaterial: new THREE.ShaderMaterial({
        ...common,
        vertexShader: headVertexShader,
        fragmentShader: headFragmentShader,
      }),
      coreMaterial: new THREE.ShaderMaterial({
        ...common,
        vertexShader: coreVertexShader,
        fragmentShader: coreFragmentShader,
      }),
    };
  }, [isDark]);

  useEffect(() => {
    return () => {
      lineMaterial.dispose();
      headMaterial.dispose();
      coreMaterial.dispose();
    };
  }, [lineMaterial, headMaterial, coreMaterial]);

  useEffect(() => {
    return () => {
      lines.dispose();
      heads.dispose();
    };
  }, [lines, heads]);

  useEffect(() => {
    const handleScroll = () => {
      scrollTarget.current = THREE.MathUtils.clamp((window.scrollY || 0) / HERO_SCROLL_RANGE, 0, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const u = lineMaterial.uniforms;
    const layout = layoutRef.current ?? { safeX: 0, centerFrac: 0.5, visibleFrac: 1 };

    // Composición: la espiral vive en el lado derecho y se recorta contra el borde,
    // dejando la izquierda libre para el texto. En tablet el hero es más angosto y
    // el texto (max-w-xl) ocupa proporcionalmente más ancho, así que la espiral se
    // reduce y se recorre más a la derecha para no quedar desproporcionada.
    const scaleFactor = isTablet ? 0.52 : 0.62;
    const centerXFactor = isTablet ? 0.7 : 0.6;
    // Ultrawide (>1440px CSS): el tamaño está atado a viewport.height, así que un
    // canvas muy ancho dejaría la espiral chica con espacio vacío alrededor. Se
    // compensa con un boost gradual hasta +25% a partir de ~2200px.
    const cssWidth = state.size.width;
    const widescreenT = isTablet
      ? 0
      : THREE.MathUtils.clamp((cssWidth - 1440) / (2200 - 1440), 0, 1);
    const widescreenBoost = THREE.MathUtils.lerp(1, 1.25, widescreenT);
    const scale = viewport.height * layout.visibleFrac * scaleFactor * widescreenBoost;
    const centerX = viewport.width * 0.5 * centerXFactor;
    const centerY = (1 - 2 * layout.centerFrac) * viewport.height * 0.5;

    progress.current = THREE.MathUtils.lerp(progress.current, scrollTarget.current, 0.08);
    const p = progress.current;
    phase.current += dt * BASE_SPEED * THREE.MathUtils.lerp(1, ACTIVE_SPEED_MULT, p);

    const canvas = state.gl.domElement;
    u.uPhase.value = phase.current;
    u.uProgress.value = p;
    u.uScale.value = scale;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    u.uResolution.value.set(canvas.width, canvas.height);
    u.uSafeX.value = layout.safeX;

    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    parallax.current.x = THREE.MathUtils.lerp(parallax.current.x, pointer.x, 0.04);
    parallax.current.y = THREE.MathUtils.lerp(parallax.current.y, pointer.y, 0.04);

    if (outerRef.current) {
      outerRef.current.position.set(
        centerX + parallax.current.x * 0.12,
        centerY + parallax.current.y * 0.08,
        0
      );
      outerRef.current.rotation.z = SCREEN_TILT + parallax.current.x * 0.05;
    }
    if (tiltRef.current) {
      tiltRef.current.rotation.x = DISC_TILT - parallax.current.y * 0.06;
    }
    if (coreRef.current && tiltRef.current) {
      // El núcleo es un plano de brillo: se contrarrota para mirar siempre a cámara.
      coreRef.current.rotation.x = -tiltRef.current.rotation.x;
      coreRef.current.position.set(0, -FUNNEL_DEPTH * 0.75 * scale, 0);
      coreRef.current.scale.setScalar(scale * 0.55);
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={tiltRef}>
        <lineSegments geometry={lines} material={lineMaterial} frustumCulled={false} />
        <points geometry={heads} material={headMaterial} frustumCulled={false} />
        <mesh ref={coreRef} material={coreMaterial}>
          <planeGeometry args={[1, 1]} />
        </mesh>
      </group>
    </group>
  );
}

// Fallback estático mobile (<768px): estado final (núcleo activado), sin animación.
const FALLBACK_RINGS = [0.2, 0.28, 0.37, 0.47, 0.58, 0.7, 0.83, 0.96];

function DataFlowStaticFallback() {
  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <svg
        viewBox="-110 -110 220 220"
        className="absolute -right-[38%] top-[46%] w-[125%] max-w-none opacity-45 dark:opacity-60"
        style={{ transform: "rotate(-20deg) scaleY(0.55)" }}
      >
        <defs>
          <radialGradient id="dfc-core">
            <stop offset="0%" stopColor={colors.brand.aiAccent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.brand.aiAccent} stopOpacity="0" />
          </radialGradient>
        </defs>
        {FALLBACK_RINGS.map((r, i) => (
          <circle
            key={r}
            r={r * 100}
            fill="none"
            stroke={i < 3 ? colors.brand.primaryDark : colors.brand.primary}
            strokeWidth={i < 3 ? 1.6 : 1.1}
            strokeOpacity={0.85 - i * 0.07}
            strokeDasharray={`${14 + i * 5} ${7 + i * 3}`}
            strokeLinecap="round"
          />
        ))}
        <circle r="22" fill="url(#dfc-core)" />
      </svg>
    </div>
  );
}

// Alto del Navbar (h-20): el hero arranca debajo de él.
const NAVBAR_PX = 80;

export function DataFlowCore() {
  const { theme } = useTheme();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
  const isTablet = useSyncExternalStore(subscribeTablet, getTabletSnapshot, getTabletServerSnapshot);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HeroLayout>({ safeX: 0, centerFrac: 0.5, visibleFrac: 1 });
  const pointerRef = useRef({ x: 0, y: 0 });

  // Mide del DOM (cualquier ancho, cualquier idioma):
  // - el borde derecho real de la columna de texto, para que el shader nunca
  //   dibuje encima del H1/CTA;
  // - qué franja del canvas es visible en la primera pantalla, para centrar ahí
  //   la espiral aunque el hero sea más alto que el viewport.
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const root = rootRef.current;
    const text = root?.closest("section")?.querySelector<HTMLElement>("[data-hero-text]");
    if (!root) return;

    const update = () => {
      const canvasRect = root.getBoundingClientRect();
      if (canvasRect.width === 0 || canvasRect.height === 0) return;
      const canvasTop = canvasRect.top + window.scrollY;
      const visibleTop = Math.max(canvasTop, NAVBAR_PX);
      const visibleHeight = Math.max(1, Math.min(window.innerHeight, canvasTop + canvasRect.height) - visibleTop);
      // Se sube el centro geométrico para compensar el embudo, que hunde visualmente
      // el núcleo hacia abajo.
      const centerPx = visibleTop - canvasTop + visibleHeight * 0.5 - 80;
      const textRect = text?.getBoundingClientRect();

      layoutRef.current = {
        safeX: textRect
          ? THREE.MathUtils.clamp((textRect.right - canvasRect.left) / canvasRect.width, 0, 0.9)
          : 0,
        centerFrac: THREE.MathUtils.clamp(centerPx / canvasRect.height, 0.15, 0.85),
        visibleFrac: THREE.MathUtils.clamp(visibleHeight / canvasRect.height, 0.2, 1),
      };
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    if (text) observer.observe(text);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [isMobile, prefersReducedMotion]);

  // El canvas es pointer-events-none (no debe bloquear clics sobre el texto), así
  // que el parallax escucha el puntero a nivel de ventana.
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const handleMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isMobile, prefersReducedMotion]);

  return (
    <div ref={rootRef} className="w-full h-full relative pointer-events-none select-none">
      {/* El fallback va siempre en el HTML y su visibilidad la decide CSS, así que en
          mobile (o con prefers-reduced-motion, en cualquier ancho) se ve desde el
          primer paint, antes de que cargue el JS. motion-reduce:!block fuerza la
          prioridad sobre md:hidden vía !important — sin eso el orden de las media
          queries generadas por Tailwind no está garantizado. */}
      <div className="absolute inset-0 md:hidden motion-reduce:!block">
        <DataFlowStaticFallback />
      </div>
      {/* En mobile o con motion reducida el contenedor queda en display:none (R3F no
          crea contexto WebGL con tamaño 0) y el Canvas ni siquiera se monta. */}
      {!isMobile && !prefersReducedMotion && (
        <div className="absolute inset-0 hidden md:block motion-reduce:!hidden">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.75]}
          >
            <FlowScene isDark={theme === "dark"} isTablet={isTablet} layoutRef={layoutRef} pointerRef={pointerRef} />
          </Canvas>
        </div>
      )}
    </div>
  );
}
