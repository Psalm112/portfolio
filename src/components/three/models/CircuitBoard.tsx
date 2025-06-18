"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { Text } from "@react-three/drei";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface CircuitBoardProps {
  position?: [number, number, number];
  scale?: number;
  animated?: boolean;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
  position = [0, 0, 0],
  scale = 1,
  animated = true,
}) => {
  const groupRef = useRef<Group>(null);
  const boardRef = useRef<Mesh>(null);

  // Generate circuit paths
  const circuitPaths = useMemo(() => {
    const paths = [];
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 3;
      const width = 0.02 + Math.random() * 0.02;
      const length = 0.5 + Math.random() * 1.5;
      paths.push({ x, y, width, length, rotation: Math.random() * Math.PI });
    }
    return paths;
  }, []);

  // Generate components (chips, resistors, etc.)
  const components = useMemo(() => {
    const comps = [];
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 3.5;
      const y = (Math.random() - 0.5) * 2.5;
      const type = Math.random() > 0.5 ? "chip" : "resistor";
      comps.push({ x, y, type, rotation: Math.random() * Math.PI });
    }
    return comps;
  }, []);

  useFrame((state) => {
    if (groupRef.current && animated) {
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main circuit board */}
      <mesh ref={boardRef} position={[0, 0, -0.05]}>
        <boxGeometry args={[4, 3, 0.1]} />
        <meshStandardMaterial color="#0a3d0a" />
      </mesh>

      {/* Circuit paths */}
      {circuitPaths.map((path, index) => (
        <group key={index} position={[path.x, path.y, 0]}>
          <mesh rotation={[0, 0, path.rotation]}>
            <boxGeometry args={[path.length, path.width, 0.01]} />
            <CircuitMaterial
              color1="#00ff88"
              color2="#00ffff"
              intensity={0.8}
              animated={animated}
            />
          </mesh>
        </group>
      ))}

      {/* Electronic components */}
      {components.map((comp, index) => (
        <group key={index} position={[comp.x, comp.y, 0.05]}>
          {comp.type === "chip" ? (
            <mesh rotation={[0, 0, comp.rotation]}>
              <boxGeometry args={[0.3, 0.2, 0.05]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          ) : (
            <mesh rotation={[0, 0, comp.rotation]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2]} />
              <meshStandardMaterial color="#8b4513" />
            </mesh>
          )}
        </group>
      ))}

      {/* Connection points */}
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const radius = 1.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <mesh key={index} position={[x, y, 0.08]}>
            <sphereGeometry args={[0.03]} />
            <CircuitMaterial
              color1="#00d4ff"
              color2="#ffffff"
              intensity={1.2}
              animated={animated}
            />
          </mesh>
        );
      })}

      {/* Labels */}
      <Text
        position={[0, -1.8, 0.1]}
        fontSize={0.15}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        PCB-2024-V1.2
      </Text>
    </group>
  );
};

export default CircuitBoard;
