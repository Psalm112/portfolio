"use client";

import { Suspense, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Text,
  useProgress,
  Html,
  PerspectiveCamera,
  PerformanceMonitor,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  SMAA,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";

interface CircuitBoardProps {
  morphProgress: number;
  showAssembly: boolean;
}

interface BrainProps {
  morphProgress: number;
  showAssembly: boolean;
}

interface AnimatedSceneProps {
  showAssembly: boolean;
}

// Performance-optimized Circuit Board Component
function CircuitBoard({ morphProgress, showAssembly }: CircuitBoardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Memoized geometry and materials for performance
  const { boardGeometry, traceGeometry, componentGeometries } = useMemo(() => {
    const board = new THREE.PlaneGeometry(6, 4);
    const trace = new THREE.CylinderGeometry(0.02, 0.02, 1);
    const components = {
      resistor: new THREE.BoxGeometry(0.3, 0.1, 0.05),
      capacitor: new THREE.CylinderGeometry(0.05, 0.05, 0.2),
      chip: new THREE.BoxGeometry(0.4, 0.3, 0.08),
    };
    return {
      boardGeometry: board,
      traceGeometry: trace,
      componentGeometries: components,
    };
  }, []);

  const tracePaths = useMemo(() => {
    const paths = [];
    for (let i = 0; i < 15; i++) {
      const startX = (Math.random() - 0.5) * 5;
      const startY = (Math.random() - 0.5) * 3;
      const endX = (Math.random() - 0.5) * 5;
      const endY = (Math.random() - 0.5) * 3;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, startY, 0.01),
        new THREE.Vector3(
          (startX + endX) / 2,
          (startY + endY) / 2 + Math.random() * 0.5,
          0.01
        ),
        new THREE.Vector3(endX, endY, 0.01),
      ]);

      paths.push({
        curve,
        geometry: new THREE.TubeGeometry(curve, 20, 0.01, 8, false),
        id: i,
      });
    }
    return paths;
  }, []);

  const components = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2.5,
        0.05 + Math.random() * 0.02,
      ] as [number, number, number],
      rotation: [0, 0, Math.random() * Math.PI] as [number, number, number],
      type: ["resistor", "capacitor", "chip"][Math.floor(Math.random() * 3)] as
        | "resistor"
        | "capacitor"
        | "chip",
      scale: showAssembly
        ? ([0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4, 1] as [
            number,
            number,
            number
          ])
        : ([0, 0, 0] as [number, number, number]),
      id: i,
    }));
  }, [showAssembly]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }

    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0.1, 1 - morphProgress);
    }
  });

  return (
    <group ref={groupRef}>
      {/* PCB Base */}
      <mesh geometry={boardGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial
          ref={materialRef}
          color="#0a4f37"
          transparent
          opacity={1 - morphProgress * 0.9}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Circuit Traces with Animation */}
      {tracePaths.map((trace, index) => (
        <mesh key={trace.id} geometry={trace.geometry}>
          <meshStandardMaterial
            color="#00ff88"
            transparent
            opacity={(1 - morphProgress) * (showAssembly ? 1 : 0)}
            emissive="#00ff44"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Electronic Components */}
      {components.map((comp) => (
        <mesh
          key={comp.id}
          geometry={componentGeometries[comp.type]}
          position={comp.position}
          rotation={comp.rotation}
          scale={comp.scale}
        >
          <meshStandardMaterial
            color={
              comp.type === "chip"
                ? "#1a1a1a"
                : comp.type === "resistor"
                ? "#8B4513"
                : "#4169E1"
            }
            transparent
            opacity={1 - morphProgress}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Connection Points */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`point-${i}`}
          position={[
            Math.cos((i * Math.PI) / 4) * 2,
            Math.sin((i * Math.PI) / 4) * 1.5,
            0.02,
          ]}
        >
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ff6600"
            emissiveIntensity={0.3}
            transparent
            opacity={1 - morphProgress}
          />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced Brain Component with Neural Pathways
function Brain({ morphProgress, showAssembly }: BrainProps) {
  const brainRef = useRef<THREE.Mesh>(null);
  const neuralRef = useRef<THREE.Group>(null);

  const brainGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.8, 128, 128);
    const positions = geometry.attributes.position.array;
    const normals = geometry.attributes.normal.array;

    for (let i = 0; i < positions.length; i += 3) {
      const vertex = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );

      // Complex brain surface generation
      const phi = Math.acos(vertex.y / vertex.length());
      const theta = Math.atan2(vertex.z, vertex.x);

      // Multiple noise layers
      const noise1 = Math.sin(phi * 6) * Math.cos(theta * 4) * 0.15;
      const noise2 = Math.sin(phi * 12) * Math.cos(theta * 8) * 0.08;
      const noise3 = Math.sin(phi * 18) * Math.cos(theta * 12) * 0.04;
      const noise4 =
        Math.sin(vertex.x * 8) *
        Math.cos(vertex.y * 6) *
        Math.sin(vertex.z * 10) *
        0.06;

      const totalNoise = noise1 + noise2 + noise3 + noise4;
      const scaleFactor = 1 + totalNoise;

      vertex.multiplyScalar(scaleFactor);

      positions[i] = vertex.x;
      positions[i + 1] = vertex.y;
      positions[i + 2] = vertex.z;
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Neural network connections
  const neuralConnections = useMemo(() => {
    const connections = [];
    const nodeCount = 50;
    const nodes = [];

    // Generate brain surface nodes
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.4;

      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
      );
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.2 && Math.random() > 0.7) {
          const curve = new THREE.CatmullRomCurve3([
            nodes[i],
            nodes[i]
              .clone()
              .lerp(nodes[j], 0.5)
              .add(
                new THREE.Vector3(
                  (Math.random() - 0.5) * 0.3,
                  (Math.random() - 0.5) * 0.3,
                  (Math.random() - 0.5) * 0.3
                )
              ),
            nodes[j],
          ]);

          connections.push({
            geometry: new THREE.TubeGeometry(curve, 16, 0.008, 8, false),
            id: `${i}-${j}`,
          });
        }
      }
    }

    return { connections, nodes };
  }, []);

  useFrame((state) => {
    if (brainRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      brainRef.current.scale.setScalar(scale * morphProgress);
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      {/* Main Brain */}
      <mesh ref={brainRef} geometry={brainGeometry}>
        <meshStandardMaterial
          color="#ff6b9d"
          transparent
          opacity={morphProgress * 0.9}
          roughness={0.6}
          metalness={0.2}
          emissive="#ff1744"
          emissiveIntensity={morphProgress * 0.1}
        />
      </mesh>

      {/* Neural Connections */}
      <group ref={neuralRef} scale={morphProgress}>
        {neuralConnections.connections.map((connection) => (
          <mesh key={connection.id} geometry={connection.geometry}>
            <meshStandardMaterial
              color="#ff9a9e"
              transparent
              opacity={morphProgress * 0.7}
              emissive="#ff6b9d"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}

        {/* Neural Nodes */}
        {neuralConnections.nodes.map((node, i) => (
          <mesh key={i} position={node.toArray()}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial
              color="#ffeb3b"
              emissive="#ffc107"
              emissiveIntensity={0.5}
              transparent
              opacity={morphProgress}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Animated Scene Controller
function AnimatedScene({ showAssembly }: AnimatedSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [morphProgress, setMorphProgress] = useState(0);
  const [dpr, setDpr] = useState(1);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }

    // Smooth morphing animation
    const progress = showAssembly
      ? Math.min(1, (Math.sin(clock.elapsedTime * 0.4) + 1) / 2)
      : 0;
    setMorphProgress(progress);
  });

  return (
    <>
      <PerformanceMonitor
        onIncline={() => setDpr(Math.min(2, dpr + 0.1))}
        onDecline={() => setDpr(Math.max(0.5, dpr - 0.1))}
      />

      <group ref={groupRef}>
        <CircuitBoard
          morphProgress={morphProgress}
          showAssembly={showAssembly}
        />
        <Brain morphProgress={morphProgress} showAssembly={showAssembly} />
      </group>
    </>
  );
}

// Loading Component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm">
          Loading 3D Scene... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

export default function CircuitBrainAnimation({ showAssembly = false }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<Loader />}>
          {/* Optimized Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color="#64b5f6"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, -3, 3]} intensity={0.6} color="#ff6b9d" />
          <pointLight position={[3, 3, -3]} intensity={0.4} color="#81c784" />

          {/* Scene */}
          <AnimatedScene showAssembly={showAssembly} />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            minDistance={3}
            maxDistance={12}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />

          {/* Environment */}
          <Environment preset="night" />

          {/* Post-processing Effects */}
          <EffectComposer enableNormalPass={false}>
            <SMAA />
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.025}
              height={300}
            />
            <ChromaticAberration offset={[0.0005, 0.0005]} />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
            <ToneMapping />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
