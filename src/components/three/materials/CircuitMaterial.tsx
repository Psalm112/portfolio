"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createElectricMaterial } from "../shaders/ElectricShader";

interface CircuitMaterialProps {
  color1?: string;
  color2?: string;
  color3?: string;
  intensity?: number;
  speed?: number;
  animated?: boolean;
}

export const CircuitMaterial: React.FC<CircuitMaterialProps> = ({
  color1 = "#00d4ff",
  color2 = "#00ffff",
  color3 = "#ffffff",
  intensity = 1.0,
  speed = 1.0,
  animated = true,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const materialConfig = useMemo(
    () => createElectricMaterial({ color1, color2, color3, intensity, speed }),
    [color1, color2, color3, intensity, speed],
  );

  useFrame((state) => {
    if (materialRef.current && animated) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return <shaderMaterial ref={materialRef} {...materialConfig} />;
};

export default CircuitMaterial;
