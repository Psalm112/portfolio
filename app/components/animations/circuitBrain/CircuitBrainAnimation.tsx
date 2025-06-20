// Update app/components/animations/circuitBrain/CircuitBrainAnimation.tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Preload,
} from "@react-three/drei";
import { motion } from "framer-motion";
import CircuitBrain from "./CircuitBrain";
import FloatingCode from "./FloatingCode";
import NeuralParticles from "./NeuralParticles";
import ScrollAssembly from "./ScrollAssembly";

const CircuitBrainAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <Canvas
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          camera={{ position: [0, 0, 8], fov: 45 }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#64b5f6" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.4}
            color="#81c784"
          />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#64b5f6"
          />

          <Environment preset="night" />

          <Suspense fallback={null}>
            <ScrollAssembly>
              <CircuitBrain />
              <NeuralParticles />
              <FloatingCode />
            </ScrollAssembly>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={true}
            autoRotateSpeed={0.3}
          />

          <Preload all />
        </Canvas>
      </motion.div>
    </div>
  );
};

export default CircuitBrainAnimation;
