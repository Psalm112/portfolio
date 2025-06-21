"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import { Sphere, Box, Cylinder } from "@react-three/drei";

const CircuitBrain = () => {
  const groupRef = useRef<THREE.Group>(null);
  const circuitRef = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const { scrollYProgress } = useScroll();

  // Reduced complexity for better performance
  const circuitPaths = useMemo(() => {
    const paths = [];
    const segments = 24; // Significantly reduced

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radius = 1.8 + Math.sin(angle * 2) * 0.3;
      const height = Math.sin(angle * 1.5) * 0.2;

      paths.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, angle, 0] as [number, number, number],
        scale: 0.06 + Math.random() * 0.02,
        hasComponent: Math.random() > 0.85, // Fewer components
      });
    }
    return paths;
  }, []);

  // Optimized brain nodes
  const brainNodes = useMemo(() => {
    const nodes = [];
    const count = 32; // Reduced count

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.0 + Math.random() * 0.3;

      nodes.push({
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
        ] as [number, number, number],
        size: 0.02 + Math.random() * 0.015,
      });
    }
    return nodes;
  }, []);

  // Simplified connections
  const neuralConnections = useMemo(() => {
    const connections = [];
    const maxConnections = 40; // Reduced

    for (let i = 0; i < maxConnections; i++) {
      const nodeA = brainNodes[Math.floor(Math.random() * brainNodes.length)];
      const nodeB = brainNodes[Math.floor(Math.random() * brainNodes.length)];

      if (nodeA !== nodeB) {
        const distance = Math.sqrt(
          Math.pow(nodeA.position[0] - nodeB.position[0], 2) +
            Math.pow(nodeA.position[1] - nodeB.position[1], 2) +
            Math.pow(nodeA.position[2] - nodeB.position[2], 2)
        );

        if (distance < 0.8) {
          connections.push({
            start: nodeA.position,
            end: nodeB.position,
            opacity: Math.random() * 0.4 + 0.2,
          });
        }
      }
    }
    return connections;
  }, [brainNodes]);

  // Throttled animation
  let lastTime = 0;
  const animateScene = useCallback(
    (state: any) => {
      const currentTime = state.clock.getElapsedTime();
      if (currentTime - lastTime < 0.016) return; // ~60fps max
      lastTime = currentTime;

      if (!groupRef.current || !circuitRef.current || !brainRef.current) return;

      const time = currentTime;
      const scrollProgress = scrollYProgress.get();

      // Simplified morph calculation
      const morphProgress = (Math.sin(time * 0.15) + 1) * 0.5;
      const scrollMorph = Math.max(0.2, 1 - scrollProgress * 0.6);
      const finalMorph = morphProgress * scrollMorph;

      // Circuit visibility
      circuitRef.current.visible = finalMorph > 0.4;
      if (circuitRef.current.visible) {
        circuitRef.current.rotation.y = time * 0.1;
      }

      // Brain visibility
      brainRef.current.visible = finalMorph < 0.6;
      if (brainRef.current.visible) {
        brainRef.current.rotation.y = time * 0.05;
      }

      // Overall rotation
      groupRef.current.rotation.y = time * 0.02;

      // Responsive scaling
      const scale = Math.min(size.width / 800, size.height / 600, 1.2);
      groupRef.current.scale.setScalar(Math.max(scale, 0.6));
    },
    [scrollYProgress, size]
  );

  useFrame(animateScene);

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {/* Simplified Circuit Board */}
      <group ref={circuitRef}>
        {circuitPaths.map((path, index) => (
          <group
            key={`circuit-${index}`}
            position={path.position}
            rotation={path.rotation}
          >
            {/* Circuit traces */}
            <Cylinder args={[0.005, 0.005, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial // Using basic material for performance
                color="#64b5f6"
                transparent
                opacity={0.7}
              />
            </Cylinder>

            {/* Circuit nodes */}
            <Sphere args={[path.scale]}>
              <meshBasicMaterial color="#81c784" transparent opacity={0.8} />
            </Sphere>

            {/* Conditional components */}
            {path.hasComponent && (
              <Box args={[0.03, 0.01, 0.04]} position={[0, 0.01, 0]}>
                <meshBasicMaterial color="#ffb74d" transparent opacity={0.9} />
              </Box>
            )}
          </group>
        ))}
      </group>

      {/* Simplified Brain */}
      <group ref={brainRef}>
        {/* Neural connections */}
        {neuralConnections.map((connection, index) => {
          const start = new THREE.Vector3(...connection.start);
          const end = new THREE.Vector3(...connection.end);
          const direction = end.clone().sub(start);
          const length = direction.length();
          const center = start.clone().add(direction.multiplyScalar(0.5));

          return (
            <Cylinder
              key={`connection-${index}`}
              args={[0.002, 0.002, length]}
              position={center.toArray()}
              lookAt={end.toArray()}
            >
              <meshBasicMaterial
                color="#64b5f6"
                transparent
                opacity={connection.opacity}
              />
            </Cylinder>
          );
        })}

        {/* Neural nodes */}
        {brainNodes.map((node, index) => (
          <Sphere
            key={`node-${index}`}
            args={[node.size]}
            position={node.position}
          >
            <meshBasicMaterial color="#81c784" transparent opacity={0.8} />
          </Sphere>
        ))}
      </group>
    </group>
  );
};

export default CircuitBrain;
