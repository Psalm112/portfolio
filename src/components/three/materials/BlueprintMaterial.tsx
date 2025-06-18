"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createBlueprintMaterial } from "../shaders/BlueprintShader";

interface BlueprintMaterialProps {
  color?: string;
  opacity?: number;
  gridSize?: number;
  animated?: boolean;
  children?: React.ReactNode;
}

export const BlueprintMaterial: React.FC<BlueprintMaterialProps> = ({
  color = "#0070f3",
  opacity = 0.8,
  gridSize = 20.0,
  animated = true,
  children,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const materialConfig = useMemo(
    () => createBlueprintMaterial({ color, opacity, gridSize, animated }),
    [color, opacity, gridSize, animated],
  );

  useFrame((state) => {
    if (materialRef.current && animated) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return <shaderMaterial ref={materialRef} {...materialConfig} />;
};

export default BlueprintMaterial;
