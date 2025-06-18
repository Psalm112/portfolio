"use client";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import { Postprocessing } from "../effects/Postprocessing";
import { CircuitMaterial } from "../materials/CircuitMaterial";
import { BlueprintMaterial } from "../materials/BlueprintMaterial";

interface HeroSceneProps {
  className?: string;
}

const HeroContent = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Central logo/emblem */}
      <group>
        {/* Main circuit board */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[6, 4, 0.1]} />
          <BlueprintMaterial
            color="#0070f3"
            opacity={0.8}
            gridSize={15}
            animated={true}
          />
        </mesh>

        {/* Circuit traces */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              ((i % 4) - 1.5) * 1.5,
              (Math.floor(i / 4) - 1) * 1.2,
              0.05,
            ]}
          >
            <boxGeometry args={[0.8, 0.05, 0.02]} />
            <CircuitMaterial
              color1="#00d4ff"
              color2="#00ffff"
              intensity={1}
              animated={true}
            />
          </mesh>
        ))}

        {/* Microprocessor */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Connection points */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2,
              Math.sin((i / 8) * Math.PI * 2) * 2,
              0.1,
            ]}
          >
            <sphereGeometry args={[0.1]} />
            <CircuitMaterial color1="#00ff88" intensity={1.5} animated={true} />
          </mesh>
        ))}

        {/* Floating data particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 6,
              Math.random() * 5,
            ]}
          >
            <sphereGeometry args={[0.02]} />
            <CircuitMaterial
              color1="#ffffff"
              intensity={Math.random() * 2}
              animated={true}
            />
          </mesh>
        ))}
      </group>

      <Environment preset="night" />
      <Postprocessing bloomIntensity={1.2} chromaticAberrationOffset={0.001} />
    </>
  );
};

export const HeroScene: React.FC<HeroSceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <HeroContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
