import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import CircuitBoard from "./CircuitBoard";
import Brain from "./Brain";

function AnimatedScene() {
  const groupRef = useRef();
  const [morphProgress, setMorphProgress] = useState(0);

  useFrame(({ clock }) => {
    // Continuous rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
    }

    // Morphing animation (oscillates between 0 and 1)
    const progress = (Math.sin(clock.elapsedTime * 0.5) + 1) / 2;
    setMorphProgress(progress);
  });

  return (
    <group ref={groupRef}>
      <CircuitBoard morphProgress={morphProgress} />
      <Brain morphProgress={morphProgress} />

      {/* Particle effects */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
            ]}
          >
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial
              color={morphProgress > 0.5 ? "#ff6b9d" : "#00ff88"}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function CircuitBrainAnimation() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#00ff88" />
        <pointLight position={[-2, -2, 2]} intensity={1} color="#ff6b9d" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.6}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* Scene */}
        <AnimatedScene />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={10}
        />

        {/* Environment */}
        <Environment preset="night" />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h2 className="text-2xl font-bold mb-2">Neural Evolution</h2>
        <p className="text-sm opacity-80">Digital → Biological Intelligence</p>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: "50%" }}
          />
        </div>
        <p className="text-white text-xs mt-2 text-center">
          Morphing Animation in Progress
        </p>
      </div>
    </div>
  );
}
