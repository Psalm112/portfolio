"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const FloatingCode = () => {
  const groupRef = useRef<THREE.Group>(null);

  const codeSnippets = useMemo(
    () => [
      "const brain = new NeuralNetwork()",
      "function processData(input) {",
      "  return ai.predict(input);",
      "}",
      "import { useState } from 'react';",
      "const [state, setState] = useState();",
      "useEffect(() => {",
      "  fetchData().then(setData);",
      "}, []);",
      "interface Props {",
      "  data: DataType[];",
      "}",
      "async function analyze() {",
      "  const result = await ml.process();",
      "  return optimization(result);",
      "}",
    ],
    []
  );

  const textElements = useMemo(() => {
    return codeSnippets.map((code, index) => {
      const angle = (index / codeSnippets.length) * Math.PI * 2;
      const radius = 5 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 4;

      return {
        text: code,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [
          (Math.random() - 0.5) * 0.3,
          angle + Math.PI,
          (Math.random() - 0.5) * 0.2,
        ] as [number, number, number],
        speed: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.4,
      };
    });
  }, [codeSnippets]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, index) => {
      const element = textElements[index];
      if (!element) return;

      const offset = index * 0.1;

      // Floating animation
      child.position.y =
        element.position[1] + Math.sin(time * element.speed + offset) * 0.2;

      // Gentle rotation
      child.rotation.y =
        element.rotation[1] + Math.sin(time * 0.2 + offset) * 0.1;

      // Fade in/out effect
      const material = (child as any).material;
      if (material) {
        material.opacity =
          element.opacity * (0.5 + Math.sin(time + offset) * 0.3);
      }
    });

    // Overall group rotation
    groupRef.current.rotation.y = time * 0.01;
  });

  return (
    <group ref={groupRef}>
      {textElements.map((element, index) => (
        <Text
          key={index}
          position={element.position}
          rotation={element.rotation}
          fontSize={0.1}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="left"
          font="/fonts/JetBrainsMono-Regular.woff"
          anchorX="center"
          anchorY="middle"
        >
          {element.text}
          <meshStandardMaterial
            color="#64b5f6"
            emissive="#64b5f6"
            emissiveIntensity={0.1}
            transparent
            opacity={element.opacity}
          />
        </Text>
      ))}
    </group>
  );
};

export default FloatingCode;
