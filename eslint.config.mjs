import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // react-hooks/purity y react-hooks/immutability dan falsos positivos aquí:
    // mutar buffers/refs (TypedArrays, THREE.Object3D) dentro de useFrame es el
    // patrón correcto y recomendado en React Three Fiber para animar a 60fps
    // sin pasar por el ciclo de render de React — no es un error real.
    // Ver AGENTS.md "Excepción documentada de ESLint". No extender a otras rutas.
    files: ["components/three/**"],
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
    },
  },
];

export default eslintConfig;
