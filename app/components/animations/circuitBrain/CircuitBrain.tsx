"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import { Text, Sphere, Box, Cylinder } from "@react-three/drei";

const CircuitBrain = () => {
  const groupRef = useRef<THREE.Group>(null);
  const circuitRef = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { scrollYProgress } = useScroll();

  // Generate circuit board pattern
  const circuitPaths = useMemo(() => {
    const paths = [];
    const segments = 50;

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radius = 2 + Math.sin(angle * 3) * 0.5;
      const height = Math.sin(angle * 2) * 0.3;

      paths.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, angle, 0] as [number, number, number],
        scale: 0.1 + Math.random() * 0.05,
      });
    }
    return paths;
  }, []);

  // Generate brain neural nodes
  const brainNodes = useMemo(() => {
    const nodes = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.5 + Math.random() * 0.3;

      nodes.push({
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
        ] as [number, number, number],
        size: 0.02 + Math.random() * 0.03,
        connectionCount: Math.floor(Math.random() * 4) + 1,
      });
    }
    return nodes;
  }, []);

  // Generate neural connections
  const neuralConnections = useMemo(() => {
    const connections = [];
    const maxConnections = 100;

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
            opacity: Math.random() * 0.6 + 0.2,
          });
        }
      }
    }
    return connections;
  }, [brainNodes]);

  useFrame((state) => {
    if (!groupRef.current || !circuitRef.current || !brainRef.current) return;

    const time = state.clock.getElapsedTime();
    const scrollProgress = scrollYProgress.get();

    // Morph between circuit board and brain
    const morphProgress = Math.sin(time * 0.3) * 0.5 + 0.5;
    const scrollMorph = 1 - scrollProgress;
    const finalMorph = morphProgress * scrollMorph;

    // Circuit board visibility and animation
    circuitRef.current.visible = finalMorph > 0.3;
    if (circuitRef.current.visible) {
      circuitRef.current.rotation.y = time * 0.2;
      circuitRef.current.children.forEach((child, index) => {
        const offset = index * 0.1;
        child.position.y = Math.sin(time + offset) * 0.1;
        child.scale.setScalar(0.8 + Math.sin(time * 2 + offset) * 0.2);
      });
    }

    // Brain visibility and animation
    brainRef.current.visible = finalMorph < 0.7;
    if (brainRef.current.visible) {
      brainRef.current.rotation.y = time * 0.1;
      brainRef.current.children.forEach((child, index) => {
        if (child.userData.isNode) {
          const offset = index * 0.05;
          const pulse = Math.sin(time * 3 + offset) * 0.1 + 1;
          child.scale.setScalar(pulse);
        }
      });
    }

    // Overall group animation
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;

    // Responsive scaling
    const scale = Math.min(viewport.width / 10, viewport.height / 10, 1);
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {/* Circuit Board */}
      <group ref={circuitRef}>
        {circuitPaths.map((path, index) => (
          <group
            key={`circuit-${index}`}
            position={path.position}
            rotation={path.rotation}
          >
            {/* Circuit traces */}
            <Cylinder args={[0.01, 0.01, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial
                color="#64b5f6"
                emissive="#64b5f6"
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={0.8}
              />
            </Cylinder>

            {/* Circuit nodes */}
            <Sphere args={[path.scale]}>
              <meshStandardMaterial
                color="#81c784"
                emissive="#81c784"
                emissiveIntensity={0.3}
                roughness={0.2}
                metalness={0.7}
              />
            </Sphere>

            {/* Circuit components */}
            {Math.random() > 0.7 && (
              <Box args={[0.05, 0.02, 0.08]} position={[0, 0.02, 0]}>
                <meshStandardMaterial
                  color="#ffb74d"
                  emissive="#ffb74d"
                  emissiveIntensity={0.1}
                  roughness={0.3}
                  metalness={0.6}
                />
              </Box>
            )}
          </group>
        ))}
      </group>

      {/* Brain Neural Network */}
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
              args={[0.005, 0.005, length]}
              position={center.toArray()}
              rotation={[
                Math.atan2(
                  direction.y,
                  Math.sqrt(direction.x ** 2 + direction.z ** 2)
                ),
                Math.atan2(direction.x, direction.z),
                0,
              ]}
            >
              <meshStandardMaterial
                color="#64b5f6"
                emissive="#64b5f6"
                emissiveIntensity={connection.opacity}
                transparent
                opacity={connection.opacity}
                roughness={0.1}
                metalness={0.9}
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
            userData={{ isNode: true }}
          >
            <meshStandardMaterial
              color="#81c784"
              emissive="#81c784"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        ))}
      </group>
    </group>
  );
};

export default CircuitBrain;
