"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { Text } from "@react-three/drei";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface MicrocontrollerProps {
  position?: [number, number, number];
  scale?: number;
  animated?: boolean;
  onSignal?: (signal: string) => void;
}

export const Microcontroller: React.FC<MicrocontrollerProps> = ({
  position = [0, 0, 0],
  scale = 1,
  animated = true,
  onSignal,
}) => {
  const groupRef = useRef<Group>(null);
  const [signalActive, setSignalActive] = useState(false);

  useFrame((state) => {
    if (groupRef.current && animated) {
      // Subtle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      groupRef.current.scale.setScalar(scale);

      // Signal simulation
      if (Math.floor(state.clock.elapsedTime * 2) % 3 === 0) {
        if (!signalActive) {
          setSignalActive(true);
          onSignal?.("Processing data...");
        }
      } else {
        setSignalActive(false);
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main MCU chip */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Pin array */}
      {Array.from({ length: 4 }).map((_, side) => (
        <group key={side}>
          {Array.from({ length: 8 }).map((_, pin) => {
            const isHorizontal = side % 2 === 0;
            const x = isHorizontal
              ? (pin - 3.5) * 0.15
              : side === 1
                ? 0.7
                : -0.7;
            const y = isHorizontal
              ? side === 0
                ? 0.7
                : -0.7
              : (pin - 3.5) * 0.15;

            return (
              <mesh key={pin} position={[x, y, 0.05]}>
                <boxGeometry args={[0.08, 0.02, 0.1]} />
                <meshStandardMaterial color="#c0c0c0" />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Status LED */}
      <mesh position={[0.4, 0.4, 0.25]}>
        <sphereGeometry args={[0.05]} />
        <CircuitMaterial
          color1={signalActive ? "#00ff00" : "#ff0000"}
          color2="#ffffff"
          intensity={signalActive ? 1.5 : 0.5}
          animated={animated}
        />
      </mesh>

      {/* Crystal oscillator */}
      <mesh position={[-0.3, 0.3, 0.15]}>
        <boxGeometry args={[0.15, 0.1, 0.08]} />
        <meshStandardMaterial color="#silver" />
      </mesh>

      {/* Capacitors */}
      <mesh position={[-0.3, -0.3, 0.12]}>
        <cylinderGeometry args={[0.03, 0.03, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.3, -0.3, 0.12]}>
        <cylinderGeometry args={[0.03, 0.03, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Data flow visualization */}
      {signalActive && (
        <group>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[0, 0, 0.3 + i * 0.1]}>
              <ringGeometry args={[0.6 + i * 0.1, 0.62 + i * 0.1]} />
              <CircuitMaterial
                color1="#00d4ff"
                color2="#00ffff"
                intensity={1 - i * 0.2}
                animated={animated}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Labels */}
      <Text
        position={[0, -0.8, 0.05]}
        fontSize={0.08}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        STM32F407
      </Text>

      <Text
        position={[0, 0.8, 0.05]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        ARM Cortex-M4
      </Text>
    </group>
  );
};

export default Microcontroller;
