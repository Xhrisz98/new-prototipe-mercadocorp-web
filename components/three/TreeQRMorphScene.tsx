"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/design-tokens";

// Escena de partículas de TreeQRMorph (PROJECT_PLAN.md §5.8 v3). Vive en su propio
// archivo para cargarse en diferido: el estado de reposo A (el <img> real) no depende
// de three.js.
//
// La "materia" son los 625 módulos del QR real. En p=0 la cámara ortográfica mira
// el suelo desde arriba y cada módulo es un cubo cuya cara superior tiene el color
// exacto muestreado de la imagen, sin iluminación — visualmente idéntico al <img>.
// Hacia p=1 la cámara se inclina a una vista isométrica: los módulos claros quedan
// como baldosas del suelo (el patrón del QR sigue en la base, como en tree.icqr.com)
// y los oscuros vuelan en arco. En pleno vuelo cada cubo se transforma en un blob
// esférico suave; los del tronco y las ramas se absorben en la geometría sólida del
// tronco a medida que crece, los de la copa quedan como follaje.

// Geometría de la cuadrícula dentro de tree-qr-scannable-blue.png (2000×2000),
// medida sobre el propio archivo: QR versión 2, 25×25, esquina superior izquierda en
// (437, 306), 1137px de lado → 45.48px por módulo.
export const QR_IMAGE_SRC = "/images/tree-qr-scannable-blue.png";
const IMG_PX = 2000;
const GRID_X0 = 437;
const GRID_Y0 = 306;
const N = 25;
const MODULE_PX = 1137 / N;
const IMG_BG = "#F6F1E7";

// Mundo: 1 unidad = 1 módulo; el módulo (fila r, columna c) tiene centro en
// x = c - 12, z = r - 12, sobre el suelo y = 0.
const pxToWorldX = (px: number) => (px - GRID_X0) / MODULE_PX - N / 2;
const pxToWorldZ = (py: number) => (py - GRID_Y0) / MODULE_PX - N / 2;
const WORLD_IMG = IMG_PX / MODULE_PX; // lado de la imagen completa en unidades de mundo
const IMG_CENTER = new THREE.Vector3(pxToWorldX(IMG_PX / 2), 0, pxToWorldZ(IMG_PX / 2));

// Cámara
const CAM_DISTANCE = 60;
const TREE_TARGET = new THREE.Vector3(0, 7.4, 0);
const TREE_VIEW_EXTENT = 38; // unidades visibles en el lado corto, vista isométrica
const ISO_DIR = new THREE.Vector3(1, 0.86, 1).normalize();

export const MORPH_SECONDS = 2.6;
const MAX_STEP = 0.1;
const TILE_H0 = 0.02; // espesor de los módulos en p=0 (solo se ve su cara superior)
const CANOPY_SPLIT = 4; // partículas por módulo de copa (arrancan superpuestas)
const IDLE_SPEED = 0.12; // rad/s en el estado B

// Tronco
const TRUNK_H = 10.4;
const TRUNK_BASE = new THREE.Vector3(0, 0, -0.25);
const TRUNK_TOP = new THREE.Vector3(0, TRUNK_H, -0.25);
// Ventanas de p en las que crecen tronco y ramas: coinciden con la llegada de sus
// partículas, que se absorben al tocarlo.
const TRUNK_GROW: [number, number] = [0.36, 0.66];
const BRANCH_GROW: [number, number] = [0.56, 0.8];
const GROUND_WINDOW: [number, number] = [0.12, 0.42]; // baldosas ganando espesor

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);

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

interface ModuleSample {
  r: number;
  c: number;
  color: THREE.Color;
  dark: boolean;
}

// Muestrea el color real de cada módulo desde el mismo archivo que muestra el <img>.
async function sampleModules(): Promise<ModuleSample[]> {
  const img = new Image();
  img.src = QR_IMAGE_SRC;
  await img.decode();
  const S = 1000;
  const k = S / IMG_PX;
  const cv = document.createElement("canvas");
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context unavailable");
  ctx.drawImage(img, 0, 0, S, S);
  const data = ctx.getImageData(0, 0, S, S).data;
  const out: ModuleSample[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cx = Math.round((GRID_X0 + (c + 0.5) * MODULE_PX) * k);
      const cy = Math.round((GRID_Y0 + (r + 0.5) * MODULE_PX) * k);
      let R = 0, G = 0, B = 0, n = 0;
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const i = ((cy + dy) * S + (cx + dx)) * 4;
          R += data[i];
          G += data[i + 1];
          B += data[i + 2];
          n++;
        }
      }
      const color = new THREE.Color().setRGB(R / n / 255, G / n / 255, B / n / 255, THREE.SRGBColorSpace);
      const lum = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b; // lineal
      out.push({ r, c, color, dark: lum < 0.3 });
    }
  }
  return out;
}

type Kind = "ground" | "trunk" | "branch" | "canopy";

interface Particle {
  kind: Kind;
  src: THREE.Vector3;
  srcColor: THREE.Color;
  dst: THREE.Vector3;
  dstColor: THREE.Color;
  dstScale: THREE.Vector3; // cubos del suelo: tamaño de baldosa; resto: radios del blob
  lift: number;
  a: number; // ventana de p en la que viaja
  b: number;
}

interface Branch {
  start: THREE.Vector3;
  quat: THREE.Quaternion;
  length: number;
}

interface Cluster {
  c: THREE.Vector3;
  r: number;
}

// Solo azules de marca saturados (sin tintes pastel): el volumen lo da la luz.
const CANOPY_PALETTE = ["#0022D2", "#1F3BE6", "#2E4BF2", "#3F5FFF", "#3F5FFF", "#5270FF", "#6B84FF"];
const UP = new THREE.Vector3(0, 1, 0);

function buildStructure(rand: () => number) {
  // Racimos de la copa: dominante, como en la referencia.
  const topY = TRUNK_TOP.y;
  const clusters: Cluster[] = [{ c: new THREE.Vector3(TRUNK_TOP.x, topY + 6.4, TRUNK_TOP.z), r: 4.8 }];
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2 + 0.3;
    clusters.push({ c: new THREE.Vector3(TRUNK_TOP.x + Math.cos(ang) * 5.6, topY + 3.2 + rand() * 1.0, TRUNK_TOP.z + Math.sin(ang) * 5.6), r: 3.9 + rand() * 0.5 });
  }
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2 + 1.1;
    clusters.push({ c: new THREE.Vector3(TRUNK_TOP.x + Math.cos(ang) * 7.0, topY + 0.8, TRUNK_TOP.z + Math.sin(ang) * 7.0), r: 3.1 });
  }

  // Ramas: del último tercio del tronco hacia los 6 racimos del anillo.
  const branches: Branch[] = clusters.slice(1, 7).map((cl, i) => {
    const start = TRUNK_BASE.clone().lerp(TRUNK_TOP, 0.72 + (i % 3) * 0.09);
    const end = start.clone().lerp(cl.c, 0.8);
    const dir = end.clone().sub(start);
    return { start, quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize()), length: dir.length() };
  });

  // Objetivos de las partículas estructurales: puntos dentro del tronco (de abajo
  // hacia arriba) y a lo largo de cada rama.
  const trunkTargets: { pos: THREE.Vector3; order: number }[] = [];
  const LEVELS = 11;
  for (let k = 0; k < LEVELS; k++) {
    for (let j = 0; j < 4; j++) {
      const ang = (j / 4) * Math.PI * 2 + k * 0.7;
      const y = 0.4 + (k / (LEVELS - 1)) * (TRUNK_H - 0.8);
      trunkTargets.push({ pos: new THREE.Vector3(TRUNK_BASE.x + Math.cos(ang) * 0.45, y, TRUNK_BASE.z + Math.sin(ang) * 0.45), order: k / (LEVELS - 1) });
    }
  }
  const branchTargets: { pos: THREE.Vector3; order: number }[] = [];
  for (const br of branches) {
    const dir = new THREE.Vector3(0, 1, 0).applyQuaternion(br.quat);
    const steps = Math.max(3, Math.round(br.length / 1.1));
    for (let s = 1; s <= steps; s++) branchTargets.push({ pos: br.start.clone().addScaledVector(dir, (br.length * s) / steps), order: s / steps });
  }
  return { clusters, branches, trunkTargets, branchTargets };
}

// Puntos de copa: volumen lleno (distribución casi uniforme con leve sesgo hacia
// afuera), repartidos según el volumen de cada racimo.
function fillCanopy(rand: () => number, clusters: Cluster[], count: number) {
  const out: { pos: THREE.Vector3; radius: number; order: number }[] = [];
  const vol = clusters.map((cl) => cl.r ** 3);
  const volSum = vol.reduce((a, b) => a + b, 0);
  let placed = 0;
  clusters.forEach((cl, i) => {
    const n = i === clusters.length - 1 ? count - placed : Math.round((count * vol[i]) / volSum);
    placed += n;
    for (let j = 0; j < n; j++) {
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const rr = cl.r * Math.pow(rand(), 0.4);
      const s = Math.sqrt(1 - u * u);
      const pos = new THREE.Vector3(cl.c.x + rr * s * Math.cos(th), cl.c.y + rr * u * 0.82, cl.c.z + rr * s * Math.sin(th));
      out.push({ pos, radius: 0.62 + rand() * 0.34, order: clamp01((pos.y - 8) / 14) });
    }
  });
  return out;
}

function buildParticles(samples: ModuleSample[]) {
  const rand = mulberry32(593983315);
  const dark = samples.filter((s) => s.dark);
  const light = samples.filter((s) => !s.dark);
  const structure = buildStructure(rand);
  const { trunkTargets, branchTargets } = structure;
  const canopySources = dark.length - trunkTargets.length - branchTargets.length;
  const canopy = fillCanopy(rand, structure.clusters, canopySources * CANOPY_SPLIT);

  const srcPos = (s: ModuleSample) => new THREE.Vector3(s.c - (N - 1) / 2, TILE_H0 / 2, s.r - (N - 1) / 2);
  const particles: Particle[] = [];

  // Suelo: módulos claros, no se mueven — solo ganan espesor (baldosas).
  for (const s of light) {
    const h = 0.3 + rand() * 0.3;
    const p = srcPos(s);
    particles.push({ kind: "ground", src: p, srcColor: s.color, dst: new THREE.Vector3(p.x, h / 2, p.z), dstColor: s.color.clone(), dstScale: new THREE.Vector3(1, h, 1), lift: 0, a: GROUND_WINDOW[0], b: GROUND_WINDOW[1] });
  }

  // Tronco y ramas: cada objetivo (de abajo hacia arriba) toma el módulo oscuro
  // libre más cercano en planta — el tronco se arma con los módulos del centro.
  const free = dark.map((s) => ({ s, pos: srcPos(s), used: false }));
  const takeNearest = (x: number, z: number) => {
    let best = -1;
    let bd = Infinity;
    free.forEach((f, i) => {
      if (f.used) return;
      const d = (f.pos.x - x) ** 2 + (f.pos.z - z) ** 2;
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    free[best].used = true;
    return free[best];
  };
  const trunkColor = new THREE.Color(colors.brand.primary);
  const branchColor = new THREE.Color(colors.brand.primary).lerp(new THREE.Color(colors.brand.primaryDark), 0.5);
  for (const t of trunkTargets) {
    const f = takeNearest(t.pos.x, t.pos.z);
    // Llega justo cuando el tronco ya creció hasta esa altura.
    const b = THREE.MathUtils.lerp(TRUNK_GROW[0] + 0.04, TRUNK_GROW[1], t.order);
    particles.push({ kind: "trunk", src: f.pos, srcColor: f.s.color, dst: t.pos, dstColor: trunkColor, dstScale: new THREE.Vector3(0.62, 0.62, 0.62), lift: 1.5 + t.order * 2, a: b - 0.3, b });
  }
  for (const t of branchTargets) {
    const f = takeNearest(t.pos.x, t.pos.z);
    const b = THREE.MathUtils.lerp(BRANCH_GROW[0] + 0.04, BRANCH_GROW[1], t.order);
    particles.push({ kind: "branch", src: f.pos, srcColor: f.s.color, dst: t.pos, dstColor: branchColor, dstScale: new THREE.Vector3(0.5, 0.5, 0.5), lift: 3 + rand() * 2, a: b - 0.3, b });
  }

  // Copa: cada módulo oscuro restante se divide en CANOPY_SPLIT partículas que
  // arrancan exactamente superpuestas (mismo lugar, tamaño y color) y se separan.
  const remaining = free.filter((f) => !f.used);
  const canopyFree = canopy.map((t) => ({ t, used: false }));
  for (const f of remaining) {
    for (let k = 0; k < CANOPY_SPLIT; k++) {
      let best = -1;
      let bd = Infinity;
      canopyFree.forEach((c, i) => {
        if (c.used) return;
        const d = (c.t.pos.x * 0.55 - f.pos.x * 0.45) ** 2 + (c.t.pos.z * 0.55 - f.pos.z * 0.45) ** 2 + rand() * 4;
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      if (best < 0) break;
      canopyFree[best].used = true;
      const t = canopyFree[best].t;
      const a = 0.44 + t.order * 0.14 + rand() * 0.1;
      // Blob levemente achatado/estirado al azar: orgánico, no esfera perfecta.
      const r = t.radius;
      particles.push({
        kind: "canopy",
        src: f.pos,
        srcColor: f.s.color,
        dst: t.pos,
        dstColor: new THREE.Color(CANOPY_PALETTE[Math.floor(rand() * CANOPY_PALETTE.length)]),
        dstScale: new THREE.Vector3(r * (0.9 + rand() * 0.25), r * (0.8 + rand() * 0.2), r * (0.9 + rand() * 0.25)),
        lift: 4 + rand() * 4,
        a,
        b: Math.min(1, a + 0.34),
      });
    }
  }
  // Orden: primero el suelo, después las que vuelan ordenadas por el inicio de su
  // ventana — así, para cualquier p, las que se mueven forman un rango contiguo y solo
  // ese rango se sube a la GPU (ver writeParticles).
  const ground = particles.filter((pt) => pt.kind === "ground");
  const fly = particles.filter((pt) => pt.kind !== "ground").sort((x, y) => x.a - y.a);
  return { particles: [...ground, ...fly], groundCount: ground.length, branches: structure.branches };
}

// Material de los cubos: Lambert con un uniform `uLit` que mezcla entre el color
// plano sin luz (p=0 — tiene que coincidir con la imagen) y el color iluminado.
function makeCubeMaterial(uLit: { value: number }) {
  const mat = new THREE.MeshLambertMaterial({ color: "#ffffff", toneMapped: false });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uLit = uLit;
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uLit;")
      .replace("#include <opaque_fragment>", "outgoingLight = mix(diffuseColor.rgb, outgoingLight, uLit);\n#include <opaque_fragment>");
  };
  return mat;
}

// Tronco torneado: base ensanchada (raíces) y afinamiento hacia arriba, con el
// gradiente de marca #0022D2 → #3F5FFF en colores de vértice.
function makeTrunkGeometry() {
  const pts: THREE.Vector2[] = [];
  const STEPS = 24;
  for (let i = 0; i <= STEPS; i++) {
    const y = (i / STEPS) * TRUNK_H;
    const r = 0.62 + 0.42 * (1 - y / TRUNK_H) + 0.75 * Math.exp(-y * 1.3);
    pts.push(new THREE.Vector2(r, y));
  }
  pts.push(new THREE.Vector2(0.001, TRUNK_H));
  const g = new THREE.LatheGeometry(pts, 20);
  const base = new THREE.Color(colors.brand.primary);
  const top = new THREE.Color(colors.brand.primary).lerp(new THREE.Color(colors.brand.primaryDark), 0.55);
  const c = new THREE.Color();
  const pos = g.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    c.copy(base).lerp(top, pos.getY(i) / TRUNK_H);
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
}

// Acentos de luz en las 4 esquinas del suelo (en lugar del pasto de la referencia).
function buildCornerLights(rand: () => number) {
  const out: { pos: THREE.Vector3; size: number; phase: number }[] = [];
  const edge = (N + 0.6) / 2 - 0.9;
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    for (let i = 0; i < 7; i++) {
      out.push({
        pos: new THREE.Vector3(sx * (edge - rand() * 2.2), 0.7 + rand() * 1.8, sz * (edge - rand() * 2.2)),
        size: 0.1 + rand() * 0.12,
        phase: rand() * Math.PI * 2,
      });
    }
  }
  return out;
}

interface SceneProps {
  target: 0 | 1;
  active: boolean;
  instant: boolean;
  isDark: boolean;
  samples: ModuleSample[];
  onReady: () => void;
  onSettled: (p: 0 | 1) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

function MorphScene({ target, active, instant, isDark, samples, onReady, onSettled, rootRef }: SceneProps) {
  const { particles, groundCount, branches } = useMemo(() => buildParticles(samples), [samples]);
  const flying = useMemo(() => particles.slice(groundCount), [particles, groundCount]);
  const corners = useMemo(() => buildCornerLights(mulberry32(7)), []);
  const { camera, size, invalidate } = useThree();

  const cubeRef = useRef<THREE.InstancedMesh>(null);
  const blobRef = useRef<THREE.InstancedMesh>(null);
  const branchRef = useRef<THREE.InstancedMesh>(null);
  const cornerRef = useRef<THREE.InstancedMesh>(null);
  const haloRef = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const bgRef = useRef<THREE.Mesh>(null);
  const slabRef = useRef<THREE.Mesh>(null);

  const uLit = useMemo(() => ({ value: 0 }), []);
  const cubeMaterial = useMemo(() => makeCubeMaterial(uLit), [uLit]);
  const cubeGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  // Blob: esfera de baja poligonización con normales suavizadas.
  const blobGeometry = useMemo(() => new THREE.SphereGeometry(1, 10, 7), []);
  const trunkGeometry = useMemo(() => makeTrunkGeometry(), []);
  const branchGeometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.26, 0.5, 1, 10, 1);
    g.translate(0, 0.5, 0);
    return g;
  }, []);
  const glowGeometry = useMemo(() => new THREE.SphereGeometry(1, 10, 8), []);

  const pRef = useRef(0);
  const writtenPRef = useRef(-1);
  const idleRef = useRef(0);
  const clockRef = useRef(0);
  const framesRef = useRef(0);
  const readyRef = useRef(false);
  const settledRef = useRef<0 | 1 | null>(0);

  // Orientaciones de cámara: cenital (mira el suelo desde arriba, con el "arriba" de
  // pantalla = -z, así fila 0 del QR queda arriba) e isométrica.
  const qTop = useMemo(() => {
    const m = new THREE.Matrix4().lookAt(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
    return new THREE.Quaternion().setFromRotationMatrix(m);
  }, []);
  const qIso = useMemo(() => {
    const m = new THREE.Matrix4().lookAt(ISO_DIR, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));
    return new THREE.Quaternion().setFromRotationMatrix(m);
  }, []);

  useLayoutEffect(() => {
    const cube = cubeRef.current;
    const blob = blobRef.current;
    if (!cube || !blob) return;
    particles.forEach((pt, i) => cube.setColorAt(i, pt.srcColor));
    flying.forEach((pt, j) => blob.setColorAt(j, pt.srcColor));
    // Buffers que se reescriben en cada frame de la transición: marcarlos dinámicos
    // evita que bufferSubData espere a la GPU (perfilado: sin esto, esa espera se
    // comía 2.2s de los 2.6s de B→A en desktop). Debe fijarse antes de la primera
    // subida a la GPU — este efecto corre antes del primer render.
    for (const mesh of [cube, blob]) {
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.instanceColor?.setUsage(THREE.DynamicDrawUsage);
    }
    if (cube.instanceColor) cube.instanceColor.needsUpdate = true;
    if (blob.instanceColor) blob.instanceColor.needsUpdate = true;
  }, [particles, flying]);

  // Cambios de objetivo, visibilidad o tema: pide un frame.
  useEffect(() => {
    settledRef.current = null;
    invalidate();
  }, [target, active, isDark, size, invalidate]);

  const m = useMemo(() => new THREE.Matrix4(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const scl = useMemo(() => new THREE.Vector3(), []);
  const col = useMemo(() => new THREE.Color(), []);
  const ctrl = useMemo(() => new THREE.Vector3(), []);
  const idQuat = useMemo(() => new THREE.Quaternion(), []);
  const tmpTarget = useMemo(() => new THREE.Vector3(), []);
  const zero = useMemo(() => new THREE.Matrix4().makeScale(0, 0, 0), []);

  // Posiciones/tamaños de todas las partículas para un p dado. Solo se recalcula
  // cuando p cambia — en el reposo B (idle) no se toca ninguna instancia.
  // prevP < 0 → escritura completa. Si no, solo se recalculan y suben a la GPU las
  // partículas cuya ventana [a, b] se cruza con el tramo recorrido desde la última
  // escritura: el resto está quieto (todavía en origen o ya en destino). Sin esto,
  // subir ~230KB de instancias por frame hacía esperar a bufferSubData.
  const writeParticles = (p: number, prevP: number) => {
    const cube = cubeRef.current;
    const blob = blobRef.current;
    if (!cube || !blob) return;
    const full = prevP < 0;
    const pmin = full ? -Infinity : Math.min(p, prevP);
    const pmax = full ? Infinity : Math.max(p, prevP);
    const G = groundCount;

    const groundActive = full || (GROUND_WINDOW[0] <= pmax && GROUND_WINDOW[1] >= pmin);
    if (groundActive) {
      for (let i = 0; i < G; i++) {
        const pt = particles[i];
        const t = easeInOutCubic(span(p, pt.a, pt.b));
        pos.lerpVectors(pt.src, pt.dst, t);
        scl.set(1, THREE.MathUtils.lerp(TILE_H0, pt.dstScale.y, t), 1);
        m.compose(pos, idQuat, scl);
        cube.setMatrixAt(i, m);
      }
    }

    // Rango de voladoras activas (ordenadas por `a`).
    let k0 = flying.length;
    let k1 = -1;
    for (let k = 0; k < flying.length; k++) {
      const pt = flying[k];
      if (pt.a > pmax) break;
      if (pt.b >= pmin) {
        if (k < k0) k0 = k;
        k1 = k;
      }
    }

    for (let j = k0; j <= k1; j++) {
      const pt = flying[j];
      const i = G + j;
      const t = easeInOutCubic(span(p, pt.a, pt.b));
      // Arco cuadrático: sube por encima del punto medio y baja al objetivo.
      ctrl.copy(pt.src).add(pt.dst).multiplyScalar(0.5);
      ctrl.y += pt.lift;
      const u = 1 - t;
      pos.set(
        u * u * pt.src.x + 2 * u * t * ctrl.x + t * t * pt.dst.x,
        u * u * pt.src.y + 2 * u * t * ctrl.y + t * t * pt.dst.y,
        u * u * pt.src.z + 2 * u * t * ctrl.z + t * t * pt.dst.z
      );
      // Cubo → blob en el primer tramo del vuelo (en p=0 solo existe el cubo, así el
      // primer frame sigue calzando con la imagen).
      const morph = smooth(span(t, 0.08, 0.4));
      if (morph >= 1) cube.setMatrixAt(i, zero);
      else {
        const k = 1 - morph;
        scl.set(k, THREE.MathUtils.lerp(TILE_H0, 1, span(t, 0, 0.2)) * k, k);
        m.compose(pos, idQuat, scl);
        cube.setMatrixAt(i, m);
      }
      // Tronco y ramas: el blob se absorbe al llegar (el sólido ya creció ahí).
      const absorb = pt.kind === "canopy" ? 1 : 1 - smooth(span(t, 0.8, 1));
      const g = morph * absorb;
      if (g <= 0) blob.setMatrixAt(j, zero);
      else {
        scl.copy(pt.dstScale).multiplyScalar(g);
        m.compose(pos, idQuat, scl);
        blob.setMatrixAt(j, m);
      }
      blob.setColorAt(j, col.copy(pt.srcColor).lerp(pt.dstColor, t));
    }

    const cubeM = cube.instanceMatrix;
    const blobM = blob.instanceMatrix;
    const blobC = blob.instanceColor;
    if (full) {
      cubeM.needsUpdate = true;
      blobM.needsUpdate = true;
      if (blobC) blobC.needsUpdate = true;
    } else {
      cubeM.clearUpdateRanges();
      blobM.clearUpdateRanges();
      blobC?.clearUpdateRanges();
      if (groundActive) {
        cubeM.addUpdateRange(0, G * 16);
        cubeM.needsUpdate = true;
      }
      if (k1 >= k0) {
        const n = k1 - k0 + 1;
        cubeM.addUpdateRange((G + k0) * 16, n * 16);
        cubeM.needsUpdate = true;
        blobM.addUpdateRange(k0 * 16, n * 16);
        blobM.needsUpdate = true;
        if (blobC) {
          blobC.addUpdateRange(k0 * 3, n * 3);
          blobC.needsUpdate = true;
        }
      }
    }

    // Tronco sólido: crece desde la base al ritmo en que llegan sus partículas.
    const trunk = trunkRef.current;
    if (trunk) {
      const g = easeOutCubic(span(p, TRUNK_GROW[0], TRUNK_GROW[1]));
      // En p=0 queda aplastado bajo las baldosas (sigue "visible" para que su shader
      // se compile en el precalentamiento).
      trunk.scale.set(g > 0 ? 1 : 1e-3, Math.max(g, 1e-3), g > 0 ? 1 : 1e-3);
    }
    const br = branchRef.current;
    if (br) {
      branches.forEach((b, i) => {
        const g = easeOutCubic(span(p, BRANCH_GROW[0], BRANCH_GROW[1]));
        if (g <= 0) br.setMatrixAt(i, zero);
        else {
          scl.set(0.55 + 0.45 * g, b.length * g, 0.55 + 0.45 * g);
          m.compose(b.start, b.quat, scl);
          br.setMatrixAt(i, m);
        }
      });
      br.instanceMatrix.needsUpdate = true;
    }
  };

  const writeCorners = (p: number, time: number) => {
    const core = cornerRef.current;
    const halo = haloRef.current;
    if (!core || !halo) return;
    const appear = smooth(span(p, 0.72, 1));
    corners.forEach((c, i) => {
      const pulse = 1 + Math.sin(time * 1.6 + c.phase) * 0.18;
      const s = c.size * appear * pulse;
      pos.copy(c.pos);
      pos.y += Math.sin(time * 0.9 + c.phase) * 0.25 * appear;
      if (s <= 0) {
        core.setMatrixAt(i, zero);
        halo.setMatrixAt(i, zero);
        return;
      }
      scl.setScalar(s);
      m.compose(pos, idQuat, scl);
      core.setMatrixAt(i, m);
      scl.setScalar(s * 3.2);
      m.compose(pos, idQuat, scl);
      halo.setMatrixAt(i, m);
    });
    core.instanceMatrix.needsUpdate = true;
    halo.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    writeParticles(0, -1);
    writeCorners(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particles]);

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    framesRef.current++;

    // Avance de p hacia el objetivo (instantáneo con motion reducida).
    const prev = pRef.current;
    if (instant) pRef.current = target;
    else if (framesRef.current > 1 && active) {
      const step = Math.min(delta, MAX_STEP) / MORPH_SECONDS;
      pRef.current = target > prev ? Math.min(target, prev + step) : Math.max(target, prev - step);
    }
    const p = pRef.current;
    const moving = p !== target;
    const idle = p >= 1 && !instant && active;
    if (idle) clockRef.current += Math.min(delta, MAX_STEP);

    // Idle solo en el estado B; al volver, la rotación acumulada se deshace en el
    // tramo final de la copa (camino más corto, nunca más de media vuelta).
    if (idle) idleRef.current += Math.min(delta, MAX_STEP) * IDLE_SPEED;
    if (p < 1 && idleRef.current !== 0) idleRef.current = Math.atan2(Math.sin(idleRef.current), Math.cos(idleRef.current));
    const idleWeight = easeInOutCubic(span(p, 0.55, 1));
    if (groupRef.current) groupRef.current.rotation.y = idleRef.current * idleWeight;

    // Cámara
    const cam = camera as THREE.OrthographicCamera;
    const e = easeInOutCubic(span(p, 0, 0.42));
    cam.quaternion.copy(qTop).slerp(qIso, e);
    tmpTarget.copy(IMG_CENTER).lerp(TREE_TARGET, e);
    cam.position.set(0, 0, CAM_DISTANCE).applyQuaternion(cam.quaternion).add(tmpTarget);
    const side = Math.min(size.width, size.height);
    cam.zoom = THREE.MathUtils.lerp(side / WORLD_IMG, side / TREE_VIEW_EXTENT, e);
    cam.updateProjectionMatrix();

    uLit.value = easeInOutCubic(span(p, 0.03, 0.3));

    // El fondo de la imagen no se desvanece (a media opacidad sobre el tema oscuro se
    // veía gris sucio): se encoge, opaco, hasta el tamaño de la base del suelo y queda
    // tapado por ella.
    const bg = bgRef.current;
    if (bg) {
      const g = easeInOutCubic(span(p, 0.03, 0.3));
      const s = THREE.MathUtils.lerp(1, (N + 0.6) / WORLD_IMG, g);
      bg.scale.set(s, s, 1);
      bg.position.set(IMG_CENTER.x * (1 - g), -0.02, IMG_CENTER.z * (1 - g));
      bg.visible = p < 0.4;
    }
    // La base nunca se marca invisible: en p=0 queda aplastada en y=-0.5, tapada por el
    // fondo opaco. Así su shader se compila en el precalentamiento y no a mitad de la
    // transición.
    const slab = slabRef.current;
    if (slab) {
      const s = easeInOutCubic(span(p, 0.08, 0.36));
      slab.scale.set(1, Math.max(s, 1e-3), 1);
    }

    if (p !== writtenPRef.current) {
      writeParticles(p, writtenPRef.current);
      writtenPRef.current = p;
    }
    if (p > 0.72 || writtenPRef.current !== p) writeCorners(p, clockRef.current);

    rootRef.current?.setAttribute("data-morph-progress", p.toFixed(3));

    // El frame 1 ya está dibujado cuando corre el frame 2: recién ahí es "ready".
    if (!readyRef.current && framesRef.current >= 2) {
      readyRef.current = true;
      onReady();
    }
    if (!moving && settledRef.current !== target && readyRef.current) {
      settledRef.current = target;
      onSettled(target);
    }

    if (moving || idle || !readyRef.current) invalidate();
  });

  return (
    <>
      {/* Luz suave y difusa: ambiente + hemisférica dominan, direccionales tenues. */}
      <ambientLight intensity={isDark ? 0.62 : 0.68} />
      <hemisphereLight args={["#E6EBFF", "#1B2A8F", isDark ? 0.75 : 0.7]} />
      <directionalLight position={[6, 14, 5]} intensity={isDark ? 0.75 : 0.8} />
      <directionalLight position={[-8, 5, -6]} intensity={0.3} color={colors.brand.primaryDark} />

      {/* Fondo de la imagen real (#F6F1E7), del tamaño exacto del <img>: solo en p≈0. */}
      <mesh ref={bgRef} position={[IMG_CENTER.x, -0.02, IMG_CENTER.z]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[WORLD_IMG, WORLD_IMG]} />
        <meshBasicMaterial color={IMG_BG} toneMapped={false} />
      </mesh>

      <group ref={groupRef}>
        {/* Base del suelo: por los huecos que dejan los módulos oscuros se ve su cara
            superior, así el patrón del QR queda en el suelo. */}
        <mesh ref={slabRef} position={[0, -0.5, 0]} scale={[1, 1e-3, 1]}>
          <boxGeometry args={[N + 0.6, 1, N + 0.6]} />
          <meshLambertMaterial color={isDark ? "#C9D1F2" : "#D8DDF2"} />
        </mesh>

        <mesh ref={trunkRef} geometry={trunkGeometry} position={[TRUNK_BASE.x, 0, TRUNK_BASE.z]} scale={[1e-3, 1e-3, 1e-3]}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <instancedMesh ref={branchRef} args={[branchGeometry, undefined, branches.length]} frustumCulled={false}>
          <meshLambertMaterial color={new THREE.Color(colors.brand.primary).lerp(new THREE.Color(colors.brand.primaryDark), 0.5)} />
        </instancedMesh>

        <instancedMesh ref={cubeRef} args={[cubeGeometry, cubeMaterial, particles.length]} frustumCulled={false} />
        <instancedMesh ref={blobRef} args={[blobGeometry, undefined, flying.length]} frustumCulled={false}>
          <meshLambertMaterial color="#ffffff" />
        </instancedMesh>

        {/* Acentos de luz #3F5FFF en las esquinas: núcleo + halo aditivo tenue. */}
        <instancedMesh ref={cornerRef} args={[glowGeometry, undefined, corners.length]} frustumCulled={false}>
          <meshBasicMaterial color={colors.brand.primaryDark} toneMapped={false} />
        </instancedMesh>
        <instancedMesh ref={haloRef} args={[glowGeometry, undefined, corners.length]} frustumCulled={false}>
          <meshBasicMaterial
            color={colors.brand.primaryDark}
            toneMapped={false}
            transparent
            opacity={isDark ? 0.22 : 0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>
      </group>
    </>
  );
}

interface TreeQRMorphSceneProps {
  target: 0 | 1;
  active: boolean;
  instant: boolean;
  isDark: boolean;
  onReady: () => void;
  onSettled: (p: 0 | 1) => void;
}

export default function TreeQRMorphScene(props: TreeQRMorphSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [samples, setSamples] = useState<ModuleSample[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    sampleModules().then((s) => {
      if (!cancelled) setSamples(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={rootRef} className="w-full h-full" data-morph-progress="0">
      {samples && (
        <Canvas
          orthographic
          flat
          frameloop="demand"
          camera={{ position: [0, CAM_DISTANCE, 0], near: 0.1, far: 200, zoom: 10 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <MorphScene {...props} samples={samples} rootRef={rootRef} />
        </Canvas>
      )}
    </div>
  );
}
