"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

const NeuralParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color("#64b5f6");
    const color2 = new THREE.Color("#81c784");
    const color3 = new THREE.Color("#ffb74d");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spherical distribution around the brain
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Random color selection
      const colorChoice = Math.random();
      const selectedColor =
        colorChoice < 0.5 ? color1 : colorChoice < 0.8 ? color2 : color3;

      colors[i3] = selectedColor.r;
      colors[i3 + 1] = selectedColor.g;
      colors[i3 + 2] = selectedColor.b;

      sizes[i] = Math.random() * 0.02 + 0.01;
    }

    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const geometry = pointsRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;

    // Animate particles
    for (let i = 0; i < positions.length; i += 3) {
      const index = i / 3;
      const offset = index * 0.01;

      // Create flowing motion along neural pathways
      positions[i] += Math.sin(time + offset) * 0.001;
      positions[i + 1] += Math.cos(time * 0.5 + offset) * 0.001;
      positions[i + 2] += Math.sin(time * 0.7 + offset) * 0.001;

      // Keep particles within bounds
      const distance = Math.sqrt(
        positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
      );

      if (distance > 8) {
        positions[i] *= 0.5;
        positions[i + 1] *= 0.5;
        positions[i + 2] *= 0.5;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} sizes={sizes}>
      <PointMaterial
        transparent
        opacity={0.6}
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </Points>
  );
};

export default NeuralParticles;
