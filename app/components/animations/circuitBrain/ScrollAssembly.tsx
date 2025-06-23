"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

interface ScrollAssemblyProps {
  children: React.ReactNode;
}

const ScrollAssembly: React.FC<ScrollAssemblyProps> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [assemblyComplete, setAssemblyComplete] = useState(false);
  const { scrollYProgress } = useScroll();

  // Create smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };

  // Assembly happens in first 30% of scroll
  const assemblyProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const smoothAssembly = useSpring(assemblyProgress, springConfig);

  // Disassembly happens in last 20% of scroll, but only after assembly is complete
  const disassemblyProgress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const smoothDisassembly = useSpring(disassemblyProgress, springConfig);

  // Track assembly completion
  useEffect(() => {
    const unsubscribe = smoothAssembly.onChange((value) => {
      if (value >= 0.95 && !assemblyComplete) {
        setAssemblyComplete(true);
      } else if (value < 0.1 && assemblyComplete) {
        setAssemblyComplete(false);
      }
    });

    return unsubscribe;
  }, [smoothAssembly, assemblyComplete]);

  useFrame(() => {
    if (!groupRef.current) return;

    const assemblyValue = smoothAssembly.get();
    const disassemblyValue = smoothDisassembly.get();

    groupRef.current.children.forEach((child, index) => {
      const offset = index * 0.15; // Staggered animation
      const maxDistance = 8; // Maximum displacement distance

      // Generate consistent random positions for each child
      const seed = index * 123.456; // Deterministic seed
      const randomX = (Math.sin(seed) * 2 - 1) * maxDistance;
      const randomY = (Math.sin(seed * 1.5) * 2 - 1) * maxDistance;
      const randomZ = (Math.sin(seed * 2) * 2 - 1) * maxDistance;

      // Assembly animation (components come together)
      if (assemblyValue < 1) {
        const progress = Math.max(
          0,
          Math.min(1, (assemblyValue - offset) / (1 - offset))
        );
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        // Position animation
        child.position.x = randomX * (1 - easedProgress);
        child.position.y = randomY * (1 - easedProgress);
        child.position.z = randomZ * (1 - easedProgress);

        // Rotation animation
        child.rotation.x = (1 - easedProgress) * Math.PI * 2 * Math.sin(seed);
        child.rotation.y = (1 - easedProgress) * Math.PI * 2 * Math.cos(seed);
        child.rotation.z =
          (1 - easedProgress) * Math.PI * 2 * Math.sin(seed * 0.7);

        // Scale animation
        child.scale.setScalar(0.1 + easedProgress * 0.9);
      }

      // Disassembly animation (only if assembly is complete)
      if (assemblyComplete && disassemblyValue > 0) {
        const progress = Math.max(
          0,
          Math.min(1, (disassemblyValue + offset) / (1 + offset))
        );
        const easedProgress = Math.pow(progress, 2); // Ease in quad

        // Position animation (spread out)
        child.position.x += randomX * easedProgress * 1.5;
        child.position.y += randomY * easedProgress * 1.5;
        child.position.z += randomZ * easedProgress * 1.5;

        // Rotation animation
        child.rotation.x += easedProgress * Math.PI * Math.sin(seed * 1.2);
        child.rotation.y += easedProgress * Math.PI * Math.cos(seed * 1.2);
        child.rotation.z += easedProgress * Math.PI * Math.sin(seed * 0.8);

        // Scale animation (fade out)
        const scaleValue = Math.max(0.1, 1 - easedProgress);
        child.scale.setScalar(scaleValue);

        // Opacity animation for materials
        child.traverse((node) => {
          if (node instanceof THREE.Mesh && node.material) {
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              if (material.transparent !== undefined) {
                material.transparent = true;
                material.opacity = scaleValue;
              }
            });
          }
        });
      }
    });

    // Overall group rotation when assembled
    if (assemblyComplete && disassemblyValue < 0.1) {
      const time = Date.now() * 0.001;
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default ScrollAssembly;
