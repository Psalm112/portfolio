"use client";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  Environment,
} from "@react-three/drei";
import { Microcontroller } from "../models/Microcontroller";
import { Postprocessing } from "../effects/Postprocessing";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface AboutSceneProps {
  className?: string;
}

const AboutContent = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 3, 8]} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        autoRotate
        autoRotateSpeed={0.3}
      />

      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#00d4ff" />

      {/* Skills constellation */}
      <group>
        {/* Frontend Development */}
        <group position={[-3, 2, 0]}>
          <mesh>
            <sphereGeometry args={[0.5]} />
            <CircuitMaterial
              color1="#00d4ff"
              color2="#00ffff"
              intensity={1.2}
              animated={true}
            />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#00d4ff"
            anchorX="center"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            FRONTEND
          </Text>
        </group>

        {/* Communications */}
        <group position={[3, 2, 0]}>
          <mesh>
            <sphereGeometry args={[0.5]} />
            <CircuitMaterial
              color1="#00ff88"
              color2="#ffffff"
              intensity={1.2}
              animated={true}
            />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#00ff88"
            anchorX="center"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            COMMUNICATIONS
          </Text>
        </group>

        {/* Embedded Systems */}
        <group position={[0, -1, 0]}>
          <Microcontroller
            scale={1.5}
            animated={true}
            onSignal={(signal) => console.log(signal)}
          />
          <Text
            position={[0, -2, 0]}
            fontSize={0.2}
            color="#ffff00"
            anchorX="center"
            font="/fonts/JetBrainsMono-Regular.woff"
          >
            EMBEDDED SYSTEMS
          </Text>
        </group>

        {/* Connection lines */}
        {[
          [
            [-3, 2, 0],
            [0, -1, 0],
          ],
          [
            [3, 2, 0],
            [0, -1, 0],
          ],
          [
            [-3, 2, 0],
            [3, 2, 0],
          ],
        ].map((line, i) => (
          <mesh
            key={i}
            position={[
              (line[0][0] + line[1][0]) / 2,
              (line[0][1] + line[1][1]) / 2,
              (line[0][2] + line[1][2]) / 2,
            ]}
          >
            <boxGeometry
              args={[
                Math.abs(line[1][0] - line[0][0]) || 0.05,
                Math.abs(line[1][1] - line[0][1]) || 0.05,
                0.02,
              ]}
            />
            <CircuitMaterial color1="#ffffff" intensity={0.6} animated={true} />
          </mesh>
        ))}
      </group>

      <Environment preset="night" />
      <Postprocessing bloomIntensity={0.8} />
    </>
  );
};

export const AboutScene: React.FC<AboutSceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <AboutContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AboutScene;
