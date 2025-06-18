"use client";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  Environment,
} from "@react-three/drei";
import { RobotArm } from "../models/RobotArm";
import { Postprocessing } from "../effects/Postprocessing";
import { CircuitMaterial } from "../materials/CircuitMaterial";
import { BlueprintMaterial } from "../materials/BlueprintMaterial";

interface SkillsSceneProps {
  className?: string;
}

const SkillsContent = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills = [
    {
      category: "Frontend",
      position: [-6, 2, 0] as [number, number, number],
      color: "#00d4ff",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"],
    },
    {
      category: "Communications",
      position: [0, 4, 0] as [number, number, number],
      color: "#00ff88",
      technologies: ["RF Design", "Signal Processing", "Protocols", "Antennas"],
    },
    {
      category: "Embedded",
      position: [6, 2, 0] as [number, number, number],
      color: "#ffff00",
      technologies: ["ARM", "STM32", "RTOS", "IoT", "Sensors"],
    },
    {
      category: "Robotics",
      position: [0, -2, 0] as [number, number, number],
      color: "#ff0066",
      technologies: ["Control Systems", "Kinematics", "Automation", "Vision"],
    },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <OrbitControls enablePan={true} enableZoom={true} autoRotate={false} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Central robot arm */}
      <RobotArm
        position={[0, -4, 0]}
        scale={0.8}
        animated={true}
        automate={true}
      />

      {/* Skills network */}
      {skills.map((skill, index) => (
        <group key={skill.category} position={skill.position}>
          {/* Skill node */}
          <mesh
            onClick={() =>
              setSelectedSkill(
                selectedSkill === skill.category ? null : skill.category,
              )
            }
          >
            <sphereGeometry args={[0.8]} />
            <CircuitMaterial
              color1={skill.color}
              color2="#ffffff"
              intensity={selectedSkill === skill.category ? 2 : 1}
              animated={true}
            />
          </mesh>

          {/* Skill label */}
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.3}
            color={skill.color}
            anchorX="center"
            font="/fonts/Orbitron-Bold.woff"
          >
            {skill.category.toUpperCase()}
          </Text>

          {/* Technology list (show when selected) */}
          {selectedSkill === skill.category && (
            <group>
              {skill.technologies.map((tech, techIndex) => (
                <Text
                  key={tech}
                  position={[0, -2 - techIndex * 0.4, 0]}
                  fontSize={0.15}
                  color="#ffffff"
                  anchorX="center"
                  font="/fonts/JetBrainsMono-Regular.woff"
                >
                  {tech}
                </Text>
              ))}
            </group>
          )}

          {/* Connection to center */}
          <mesh
            position={[
              -skill.position[0] * 0.3,
              -skill.position[1] * 0.3 + 2,
              0,
            ]}
          >
            <boxGeometry
              args={[
                Math.abs(skill.position[0]) * 0.6 || 0.05,
                Math.abs(skill.position[1] - 2) * 0.6 || 0.05,
                0.02,
              ]}
            />
            <CircuitMaterial
              color1={skill.color}
              intensity={0.6}
              animated={true}
            />
          </mesh>
        </group>
      ))}

      {/* Blueprint background plane */}
      <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 15]} />
        <BlueprintMaterial
          color="#0070f3"
          opacity={0.1}
          gridSize={20}
          animated={true}
        />
      </mesh>

      <Environment preset="night" />
      <Postprocessing bloomIntensity={1.0} chromaticAberrationOffset={0.002} />
    </>
  );
};

export const SkillsScene: React.FC<SkillsSceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <SkillsContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillsScene;
