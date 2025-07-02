import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Points,
  PointMaterial,
  shaderMaterial,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// shader material
const TechMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color(0x00d4ff),
    uColor2: new THREE.Color(0x5b21b6),
    uColor3: new THREE.Color(0x059669),
  },
  // Vertex Shader
  `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 pos = position;
    
    // wave effect
    float wave1 = sin(pos.y * 3.0 + uTime * 2.0) * 0.15;
    float wave2 = cos(pos.x * 2.0 + uTime * 1.5) * 0.1;
    vWave = wave1 + wave2;
    
    pos += normal * vWave;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;
  varying float vWave;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = pow(1.0 - fresnel, 2.0);
    
    float mixVal1 = (sin(uTime * 0.8 + vUv.x * 3.1415) + 1.0) * 0.5;
    float mixVal2 = (cos(uTime * 0.6 + vUv.y * 2.0) + 1.0) * 0.5;
    
    vec3 color1 = mix(uColor1, uColor2, mixVal1);
    vec3 color2 = mix(uColor2, uColor3, mixVal2);
    vec3 finalColor = mix(color1, color2, fresnel + vWave * 0.5);
    
    // Add some transparency and glow
    float alpha = 0.9 + fresnel * 0.1;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
  `
);

extend({ TechMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    techMaterial: any;
  }
}

// Particle Field
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particleData = useMemo(() => {
    const count = Math.min(800, Math.floor(viewport.width * 100));
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Positions
      positions[i3] = (Math.random() - 0.5) * viewport.width * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 3;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Colors - IoT network theme
      const colorVariant = Math.random();
      if (colorVariant < 0.4) {
        colors[i3] = 0;
        colors[i3 + 1] = 0.8;
        colors[i3 + 2] = 1; // Cyan
      } else if (colorVariant < 0.7) {
        colors[i3] = 0.35;
        colors[i3 + 1] = 0.13;
        colors[i3 + 2] = 0.71; // Purple
      } else {
        colors[i3] = 0.02;
        colors[i3 + 1] = 0.59;
        colors[i3 + 2] = 0.41; // Green
      }
    }

    return { positions, colors, count };
  }, [viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
      points.current.rotation.x =
        Math.cos(clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  return (
    <Points
      ref={points}
      positions={particleData.positions}
      colors={particleData.colors}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Tech Sculpture
function TechSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      (meshRef.current.material as any).uTime = time;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main torus knot */}
      <mesh ref={meshRef} rotation={[0.5, 0, 0]} scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 260, 32]} />
        <techMaterial attach="material" />
      </mesh>

      {/* Additional smaller elements for visual interest */}
      <mesh position={[2.5, 0, 0]} scale={0.3} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry />
        <meshStandardMaterial
          color="#00D4FF"
          transparent
          opacity={0.7}
          emissive="#00D4FF"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[-2.5, 1.5, 0]} scale={0.25}>
        <tetrahedronGeometry />
        <meshStandardMaterial
          color="#5B21B6"
          transparent
          opacity={0.7}
          emissive="#5B21B6"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[0, -2.5, 1]} scale={0.2}>
        <dodecahedronGeometry />
        <meshStandardMaterial
          color="#059669"
          transparent
          opacity={0.7}
          emissive="#059669"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// Camera Animation
function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(camera.position, {
      z: 12,
      y: 2,
      duration: 1,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [camera]);

  return null;
}

// Loading fallback component
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-cyan-400 font-mono text-sm">
          Initializing Systems...
        </p>
      </div>
    </Html>
  );
}

// Floating tech icons component
function FloatingTechIcons() {
  const icons = ["⚡", "🔗", "🌐", "📡", "🤖", "🔧"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 0,
          }}
          animate={{
            y: [null, -20, null],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
      role="banner"
      aria-label="Samuel Oyenuga - Frontend Engineer and Embedded Systems Specialist"
    >
      {/* Animated background gradients from first hero */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "-10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: "-10%", right: "-10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-green-500/15 to-emerald-600/15 rounded-full blur-xl"
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "30%", right: "20%" }}
        />
      </div>

      <FloatingTechIcons />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">
        {/* Content Section  */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-jetbrains text-cyan-400 text-sm sm:text-base tracking-wider uppercase"
          >
            Hello, I'm Samuel <span className="max-lg:hidden">Adebola</span>
            &nbsp; Oyenuga
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              Frontend Engineer
            </span>
            <br />
            <span className="font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
              & IoT Systems Architect
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg lg:text-xl text-gray-300 max-w-2xl max-lg:mx-auto leading-relaxed font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Bridging the gap between{" "}
            <span className="text-cyan-400 font-medium">
              cutting-edge web applications
            </span>{" "}
            and{" "}
            <span className="text-purple-400 font-medium">
              intelligent embedded systems
            </span>
            . From blockchain-secured IoT networks to AI-powered warehouse
            automation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron font-semibold text-white shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="View my projects and portfolio"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Explore My Work</span>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-gray-600 hover:border-cyan-400 rounded-lg font-orbitron font-semibold text-gray-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Download my resume"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Download Resume</span>
                <svg
                  className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Visualization with torus knot */}
        <motion.div
          className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-[600px] xl:h-[700px] mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, 10], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]}
            aria-label="Interactive 3D visualization of IoT and blockchain networks"
          >
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight position={[-5, -5, -5]} intensity={0.4} />
            <pointLight position={[0, 0, 10]} intensity={0.5} color="#00D4FF" />

            <Suspense fallback={<LoadingFallback />}>
              <ParticleField />
              <TechSculpture />
            </Suspense>

            <CameraAnimation />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="mx-auto w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          animate={{ borderColor: ["#4B5563", "#22D3EE", "#4B5563"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-gray-500 text-xs mt-2 font-jetbrains">
          Scroll to explore
        </p>
      </motion.div>
    </section>
  );
}
