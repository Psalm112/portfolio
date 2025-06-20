"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

interface ScrollAssemblyProps {
  children: React.ReactNode;
}

const ScrollAssembly: React.FC<ScrollAssemblyProps> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  const assembly = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const disassembly = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  useFrame(() => {
    if (!groupRef.current) return;

    const assemblyValue = assembly.get();
    const disassemblyValue = disassembly.get();

    groupRef.current.children.forEach((child, index) => {
      const offset = index * 0.1;
      const distance = 5;

      // Assembly animation
      if (assemblyValue < 1) {
        const progress = Math.min(assemblyValue + offset, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        child.position.x = (1 - eased) * distance * (Math.random() - 0.5);
        child.position.y = (1 - eased) * distance * (Math.random() - 0.5);
        child.position.z = (1 - eased) * distance * (Math.random() - 0.5);

        child.rotation.x = (1 - eased) * Math.PI * 2 * Math.random();
        child.rotation.y = (1 - eased) * Math.PI * 2 * Math.random();
        child.rotation.z = (1 - eased) * Math.PI * 2 * Math.random();

        child.scale.setScalar(eased);
      }

      // Disassembly animation
      if (disassemblyValue > 0) {
        const progress = Math.min(disassemblyValue - offset * 0.5, 1);
        const eased = Math.pow(progress, 2); // Ease in quad

        child.position.x += eased * distance * (Math.random() - 0.5);
        child.position.y += eased * distance * (Math.random() - 0.5);
        child.position.z += eased * distance * (Math.random() - 0.5);

        child.scale.setScalar(1 - eased);
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
};

export default ScrollAssembly;
