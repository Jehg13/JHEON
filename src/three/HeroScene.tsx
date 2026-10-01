import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Points } from "three";
import * as THREE from "three";

const palette = ["#ee536b", "#568cff", "#9a72ff", "#d9e2ff"];

function Constellation({ count }: { count: number }) {
  const field = useRef<Group>(null);
  const pointsRef = useRef<Points>(null);
  const nodesRef = useRef<Group>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.399963;
      const radius = 1 + ((index * 37) % 100) / 38;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius * 0.88;
      positions[index * 3 + 2] = ((index * 19) % 100) / 17 - 3;
      const color = new THREE.Color(palette[index % palette.length]);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  const nodes = useMemo(
    () =>
      Array.from({ length: 19 }, (_, index) => {
        const angle = index * 2.399963;
        const radius = 0.65 + ((index * 29) % 100) / 35;
        return {
          key: index,
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.8,
            ((index * 23) % 100) / 31 - 1.7,
          ] as [number, number, number],
          color: palette[index % palette.length],
          scale: 0.018 + ((index * 7) % 10) / 350,
          phase: index * 0.43,
        };
      }),
    [],
  );

  const connections = useMemo(() => {
    const result: number[] = [];
    nodes.forEach((node, index) => {
      const next = nodes[(index + 4) % nodes.length];
      result.push(...node.position, ...next.position);
    });
    return result;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!field.current || !nodesRef.current) return;
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      x * 0.38,
      1.1,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      y * 0.28,
      1.1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
    field.current.rotation.y = THREE.MathUtils.damp(
      field.current.rotation.y,
      x * 0.09 + Math.sin(state.clock.elapsedTime * 0.13) * 0.035,
      0.8,
      delta,
    );
    field.current.rotation.x = THREE.MathUtils.damp(
      field.current.rotation.x,
      -y * 0.06,
      0.8,
      delta,
    );
    nodesRef.current.children.forEach((child, index) => {
      const node = nodes[index];
      child.position.y =
        node.position[1] +
        Math.sin(state.clock.elapsedTime * 0.42 + node.phase) * 0.035;
    });
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.006;
    }
  });

  return (
    <group ref={field}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[geometry.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[geometry.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          vertexColors
          transparent
          opacity={0.84}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(connections), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8385d7"
          transparent
          opacity={0.13}
          depthWrite={false}
        />
      </lineSegments>
      <group ref={nodesRef}>
        {nodes.map((node) => (
          <mesh key={node.key} position={node.position} scale={node.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={node.color} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0, -2]}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial
          color="#a854bd"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [count, setCount] = useState(() =>
    window.innerWidth < 720 ? 150 : 350,
  );
  const reducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ).current;

  useEffect(() => {
    const updateCount = () =>
      setCount(window.innerWidth < 720 ? 150 : 350);
    window.addEventListener("resize", updateCount, { passive: true });
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 43 }}
      dpr={[1, 1.2]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 2]} color="#517aff" intensity={3} />
      <pointLight position={[-3, -1, 1]} color="#c54879" intensity={2} />
      <Constellation count={count} />
    </Canvas>
  );
}
