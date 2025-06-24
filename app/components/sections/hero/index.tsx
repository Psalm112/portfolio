// components/Hero.tsx
"use client";

import React, { Suspense, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Text3D,
  Center,
  useGLTF,
  Html,
} from "@react-three/drei";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import * as THREE from "three";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

// Types
interface ParticleSystemProps {
  count: number;
  circuitRef: React.MutableRefObject<THREE.Group | null>;
  brainRef: React.MutableRefObject<THREE.Group | null>;
}

interface CodeSnippet {
  id: string;
  code: string;
  language: string;
  position: [number, number, number];
}

// Particle system for neural connections
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count,
  circuitRef,
  brainRef,
}) => {
  const particles = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions within viewport
      positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Gradient colors (blue to cyan to green)
      const t = Math.random();
      colors[i3] = THREE.MathUtils.lerp(0.2, 0.4, t); // R
      colors[i3 + 1] = THREE.MathUtils.lerp(0.8, 1.0, t); // G
      colors[i3 + 2] = THREE.MathUtils.lerp(1.0, 0.6, t); // B
    }

    return { positions, velocities, colors };
  }, [count, viewport]);

  useFrame((state) => {
    if (!particles.current) return;

    const positions = particles.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Floating motion with sine waves
      positions[i3] +=
        particlesData.velocities[i3] + Math.sin(time + i) * 0.001;
      positions[i3 + 1] +=
        particlesData.velocities[i3 + 1] + Math.cos(time + i) * 0.001;
      positions[i3 + 2] += particlesData.velocities[i3 + 2];

      // Wrap around boundaries
      if (Math.abs(positions[i3]) > viewport.width) positions[i3] *= -0.8;
      if (Math.abs(positions[i3 + 1]) > viewport.height)
        positions[i3 + 1] *= -0.8;
      if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -0.8;
    }

    particles.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesData.positions, 3]}
          count={count}
          array={particlesData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particlesData.colors, 3]}
          count={count}
          array={particlesData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Circuit Board Component
const CircuitBoard: React.FC<{ morphProgress: number }> = ({
  morphProgress,
}) => {
  const circuitRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF("/models/circuit_board.glb"); // Your circuit model path

  useFrame((state) => {
    if (!circuitRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotation animation
    circuitRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    circuitRef.current.rotation.x = Math.cos(time * 0.2) * 0.1;

    // Morphing scale and opacity
    const scale = THREE.MathUtils.lerp(1, 0.1, morphProgress);
    const opacity = THREE.MathUtils.lerp(1, 0, morphProgress);

    circuitRef.current.scale.setScalar(scale);

    // Update materials opacity
    circuitRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = opacity;
          });
        } else {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      }
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={circuitRef} position={[0, 0, 0]}>
        {/* Your circuit board nodes will be mapped here */}
        <primitive object={nodes.Scene} />
      </group>
    </Float>
  );
};

// Brain Component
const Brain: React.FC<{ morphProgress: number }> = ({ morphProgress }) => {
  const brainRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF("/models/brain.gltf"); // Your brain model path

  useFrame((state) => {
    if (!brainRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle floating and rotation
    brainRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    brainRef.current.rotation.y = time * 0.1;

    // Morphing scale and opacity
    const scale = THREE.MathUtils.lerp(0.1, 1.2, morphProgress);
    const opacity = THREE.MathUtils.lerp(0, 1, morphProgress);

    brainRef.current.scale.setScalar(scale);

    // Update materials
    brainRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = opacity;
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.emissive.setHSL(0.6, 0.5, 0.1 * morphProgress);
            }
          });
        } else {
          child.material.transparent = true;
          child.material.opacity = opacity;
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissive.setHSL(0.6, 0.5, 0.1 * morphProgress);
          }
        }
      }
    });
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={brainRef} position={[0, 0, 0]}>
        <primitive object={nodes.Brain} />
      </group>
    </Float>
  );
};

// Floating Code Snippets
const FloatingCode: React.FC<{ snippet: CodeSnippet; delay: number }> = ({
  snippet,
  delay,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime + delay;
    meshRef.current.position.y += Math.sin(time) * 0.001;
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <Html
        position={snippet.position}
        transform
        occlude
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="code-snippet bg-gray-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3 font-mono text-sm text-cyan-300 max-w-xs">
          <div className="text-xs text-gray-400 mb-1">{snippet.language}</div>
          <pre className="whitespace-pre-wrap text-xs leading-relaxed">
            {snippet.code}
          </pre>
        </div>
      </Html>
    </Float>
  );
};

// Main 3D Scene
const Scene: React.FC<{ morphProgress: number }> = ({ morphProgress }) => {
  const circuitRef = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const codeSnippets: CodeSnippet[] = useMemo(
    () => [
      {
        id: "1",
        code: `const innovate = () => {\n  return creativity\n    .merge(technology)\n    .optimize();\n};`,
        language: "JavaScript",
        position: [-4, 2, -2],
      },
      {
        id: "2",
        code: `.hero {\n  transform: perspective(1000px)\n    rotateX(10deg);\n  animation: float 3s ease-in-out\n    infinite;\n}`,
        language: "CSS",
        position: [4, -1, -1],
      },
      {
        id: "3",
        code: `interface Developer {\n  skills: string[];\n  passion: boolean;\n  innovation: true;\n}`,
        language: "TypeScript",
        position: [-3, -2, 1],
      },
      {
        id: "4",
        code: `query Performance {\n  optimization\n  accessibility\n  userExperience\n}`,
        language: "GraphQL",
        position: [3, 2, 0],
      },
    ],
    []
  );

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 8]}
        fov={isMobile ? 60 : 50}
        near={0.1}
        far={100}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <Environment preset="night" />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00ffff" />

      <CircuitBoard morphProgress={morphProgress} />
      <Brain morphProgress={morphProgress} />

      <ParticleSystem
        count={isMobile ? 150 : 300}
        circuitRef={circuitRef}
        brainRef={brainRef}
      />

      {codeSnippets.map((snippet, index) => (
        <FloatingCode key={snippet.id} snippet={snippet} delay={index * 0.5} />
      ))}
    </>
  );
};

// Loading Component
const LoadingFallback: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[0.1, 0.1, 0.1]} />
    <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
  </mesh>
);

// Main Hero Component
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const morphProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
    >
      {/* Fixed Navigation Spacer */}
      <div className="h-16 lg:h-20" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: yTransform, opacity: opacityTransform }}
            className="space-y-6 lg:space-y-8 text-left lg:pr-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #00ffff 50%, #0099ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Transforming
                <br />
                <span className="text-white">Ideas Into</span>
                <br />
                Digital Reality
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Senior Frontend Engineer specializing in cutting-edge web
              technologies. I architect scalable solutions that merge innovative
              design with powerful functionality, creating digital experiences
              that drive business growth.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full overflow-hidden shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700"
            >
              {[
                { label: "Years Experience", value: "15+" },
                { label: "Projects Delivered", value: "200+" },
                { label: "Client Satisfaction", value: "99%" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            <Canvas
              shadows
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
              frameloop="demand"
              className="rounded-2xl"
            >
              <Suspense fallback={<LoadingFallback />}>
                <Scene morphProgress={morphProgress.get()} />
              </Suspense>
            </Canvas>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent rounded-2xl pointer-events-none animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
