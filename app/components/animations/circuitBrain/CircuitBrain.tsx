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
  const morphTimeRef = useRef(0);
  const { viewport, size } = useThree();
  const { scrollYProgress } = useScroll();

  // Optimized circuit paths with reduced complexity
  const circuitPaths = useMemo(() => {
    const paths = [];
    const segments = 15; // Reduced from 20

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radius = 1.5 + Math.sin(angle * 3) * 0.2;
      const height = Math.sin(angle * 2) * 0.15;

      paths.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, angle, 0] as [number, number, number],
        scale: 0.05 + Math.random() * 0.015,
        hasComponent: Math.random() > 0.85, // Reduced from 0.8
        componentType: Math.floor(Math.random() * 3), // 0: resistor, 1: capacitor, 2: chip
      });
    }
    return paths;
  }, []);

  // Optimized neural connections with reduced complexity
  const neuralConnections = useMemo(() => {
    const connections = [];
    const connectionCount = 25; // Reduced from 35

    for (let i = 0; i < connectionCount; i++) {
      const start = [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number];
      const end = [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number];

      connections.push({
        start,
        end,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }
    return connections;
  }, []);

  // Optimized brain nodes with reduced complexity
  const brainNodes = useMemo(() => {
    const nodes = [];
    const nodeCount = 20; // Reduced from 30

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: [
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
        ] as [number, number, number],
        size: 0.02 + Math.random() * 0.03,
      });
    }
    return nodes;
  }, []);

  // Optimized animation with requestAnimationFrame throttling
  const lastFrameTime = useRef(0);
  const animateScene = useCallback(
    (state: any) => {
      const currentTime = state.clock.getElapsedTime();

      // Throttle to 60fps max
      if (currentTime - lastFrameTime.current < 1 / 60) return;
      lastFrameTime.current = currentTime;

      if (!groupRef.current || !circuitRef.current || !brainRef.current) return;

      const scrollProgress = scrollYProgress.get();

      // Smooth morphing animation
      morphTimeRef.current += 0.008; // Slower, smoother morphing
      const morphProgress = (Math.sin(morphTimeRef.current) + 1) * 0.5;
      const scrollInfluence = Math.max(0.1, 1 - scrollProgress * 0.8);
      const finalMorph = morphProgress * scrollInfluence;

      // Circuit board visibility and animation
      const circuitVisible = finalMorph > 0.3;
      circuitRef.current.visible = circuitVisible;

      if (circuitVisible) {
        circuitRef.current.rotation.y = currentTime * 0.05;
        circuitRef.current.position.y = Math.sin(currentTime * 0.3) * 0.02;
      }

      // Brain visibility and animation
      const brainVisible = finalMorph < 0.7;
      brainRef.current.visible = brainVisible;

      if (brainVisible) {
        brainRef.current.rotation.y = currentTime * 0.03;
        brainRef.current.rotation.x = Math.sin(currentTime * 0.2) * 0.05;
      }

      // Overall group animation
      groupRef.current.rotation.y = currentTime * 0.01;

      // Responsive scaling
      const baseScale = Math.min(size.width / 1200, size.height / 800, 1);
      const responsiveScale = Math.max(baseScale, 0.5);
      groupRef.current.scale.setScalar(responsiveScale);

      // Smooth position adjustment
      groupRef.current.position.x = 0.3 + Math.sin(currentTime * 0.1) * 0.1;
    },
    [scrollYProgress, size]
  );

  useFrame(animateScene);

  // Memoized materials for better performance
  const circuitMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#64b5f6",
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#81c784",
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const componentMaterials = useMemo(
    () => [
      new THREE.MeshBasicMaterial({
        color: "#ffb74d",
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshBasicMaterial({
        color: "#f06292",
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshBasicMaterial({
        color: "#ba68c8",
        transparent: true,
        opacity: 0.9,
      }),
    ],
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Optimized Circuit Board */}
      <group ref={circuitRef}>
        {circuitPaths.map((path, index) => (
          <group
            key={`circuit-${index}`}
            position={path.position}
            rotation={path.rotation}
          >
            {/* Circuit traces */}
            <Cylinder
              args={[0.003, 0.003, 0.15]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <primitive object={circuitMaterial} />
            </Cylinder>

            {/* Circuit nodes */}
            <Sphere args={[path.scale]}>
              <primitive object={nodeMaterial} />
            </Sphere>

            {/* Electronic components */}
            {path.hasComponent && (
              <Box
                args={
                  path.componentType === 0
                    ? [0.02, 0.005, 0.03]
                    : path.componentType === 1
                    ? [0.015, 0.01, 0.015]
                    : [0.025, 0.008, 0.04]
                }
                position={[0, 0.008, 0]}
              >
                <primitive object={componentMaterials[path.componentType]} />
              </Box>
            )}
          </group>
        ))}
      </group>

      {/* Optimized Brain */}
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
              args={[0.001, 0.001, length]}
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

        {/* Neural nodes with pulsing effect */}

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
