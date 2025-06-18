"use client";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  Environment,
  Line,
  Sphere,
  Box,
  useTexture,
} from "@react-three/drei";
import { Vector3, Color, MathUtils } from "three";
import { RobotArm } from "../models/RobotArm";
import { Postprocessing } from "../effects/Postprocessing";
import { CircuitMaterial } from "../materials/CircuitMaterial";
import { BlueprintMaterial } from "../materials/BlueprintMaterial";
import { skills, skillCategories, getSkillsByCategory } from "@/data/skills";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
interface SkillsSceneProps {
  className?: string;
}
// Animated skill node component
const SkillNode = ({
  skill,
  position,
  isSelected,
  onClick,
  categoryColor,
  animationDelay = 0,
}: {
  skill: any;
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
  categoryColor: string;
  animationDelay?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state) => {
    if (meshRef.current) {
      // Breathing animation
      const breathe =
        Math.sin(state.clock.elapsedTime * 2 + animationDelay) * 0.05 + 1;
      meshRef.current.scale.setScalar(breathe);
      // Rotation based on skill level
      meshRef.current.rotation.y += skill.level / 10000;

      // Hover effect
      if (hovered) {
        meshRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      }
    }
  });
  return (
    <group position={position}>
      {/* Main skill sphere */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.6, 1]} />
        <CircuitMaterial
          color1={categoryColor}
          color2="#ffffff"
          intensity={isSelected ? 2.5 : hovered ? 1.8 : 1}
          animated={true}
        />
      </mesh>
      {/* Skill level indicator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 0.9, 32]} />
        <meshBasicMaterial
          color={categoryColor}
          transparent
          opacity={(skill.level / 100) * 0.7}
        />
      </mesh>

      {/* Skill name */}
      <Text
        ref={textRef}
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color={isSelected ? "#ffffff" : categoryColor}
        anchorX="center"
        font="/fonts/Orbitron-Bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name.toUpperCase()}
      </Text>

      {/* Skill level percentage */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color={`hsl(${skill.level * 1.2}, 70%, 60%)`}
        anchorX="center"
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        {skill.level}%
      </Text>

      {/* Experience indicator */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.12}
        color="#94a3b8"
        anchorX="center"
        font="/fonts/Inter-Regular.woff"
      >
        {skill.experience}
      </Text>

      {/* Floating particles for high-level skills */}
      {skill.level > 90 && (
        <group>
          {Array.from({ length: 5 }).map((_, i) => (
            <FloatingParticle
              key={i}
              position={[
                Math.sin(i * 2) * 1.5,
                Math.cos(i * 2) * 1.5,
                Math.sin(i * 3) * 0.5,
              ]}
              color={categoryColor}
              delay={i * 0.5}
            />
          ))}
        </group>
      )}
    </group>
  );
};
// Floating particle component
const FloatingParticle = ({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime + delay;
      ref.current.position.x = position[0] + Math.sin(time * 2) * 0.3;
      ref.current.position.y = position[1] + Math.cos(time * 1.5) * 0.2;
      ref.current.position.z = position[2] + Math.sin(time * 3) * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};
// Connection lines between skills
const SkillConnection = ({
  start,
  end,
  color,
  animated = true,
}: {
  start: Vector3;
  end: Vector3;
  color: string;
  animated?: boolean;
}) => {
  const lineRef = useRef<any>(null);
  useFrame((state) => {
    if (lineRef.current && animated) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });
  const points = [start, end];
  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.4}
      dashed
      dashScale={10}
      dashSize={0.5}
      gapSize={0.3}
    />
  );
};
// Category hub component
const CategoryHub = ({
  category,
  position,
  skills,
  isActive,
  onClick,
}: {
  category: any;
  position: [number, number, number];
  skills: any[];
  isActive: boolean;
  onClick: () => void;
}) => {
  const hubRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state) => {
    if (hubRef.current) {
      // Rotation animation
      hubRef.current.rotation.y += 0.01;
      // Pulsing scale for active category
      if (isActive) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1;
        hubRef.current.scale.setScalar(pulse);
      }
    }
  });
  return (
    <group
      ref={hubRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main hub geometry */}
      <mesh>
        <octahedronGeometry args={[1]} />
        <CircuitMaterial
          color1={category.color}
          color2="#ffffff"
          intensity={isActive ? 3 : hovered ? 2 : 1.5}
          animated={true}
        />
      </mesh>
      {/* Category name */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.4}
        color={category.color}
        anchorX="center"
        font="/fonts/Orbitron-Bold.woff"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {category.name.toUpperCase()}
      </Text>

      {/* Skill count indicator */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.2}
        color="#94a3b8"
        anchorX="center"
        font="/fonts/JetBrainsMono-Regular.woff"
      >
        {skills.length} Skills
      </Text>

      {/* Orbiting elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 6, 0]}>
          <mesh position={[1.5, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial
              color={category.color}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
// Main skills content component
const SkillsContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState<
    "intro" | "idle" | "detail"
  >("intro");
  const sceneRef = useRef<THREE.Group>(null);
  // Animation timeline
  useEffect(() => {
    const tl = gsap.timeline();
    // Intro animation
    if (sceneRef.current) {
      tl.set(sceneRef.current.rotation, { y: Math.PI * 2 })
        .to(sceneRef.current.rotation, {
          y: 0,
          duration: 2,
          ease: "power2.out",
        })
        .add(() => setAnimationPhase("idle"), 2);
    }

    return () => {
      tl.kill();
    };
  }, []);
  // Calculate positions for categories in a circle
  const categoryPositions = skillCategories.map((_, index) => {
    const angle = (index / skillCategories.length) * Math.PI * 2;
    const radius = 8;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle * 0.5) * 2,
      Math.sin(angle) * radius,
    ] as [number, number, number];
  });
  // Calculate positions for skills in selected category
  const getSkillPositions = (categoryIndex: number, skillsCount: number) => {
    const basePosition = categoryPositions[categoryIndex];
    return Array.from({ length: skillsCount }, (_, i) => {
      const angle = (i / skillsCount) * Math.PI * 2;
      const radius = 3;
      return [
        basePosition[0] + Math.cos(angle) * radius,
        basePosition[1] + Math.sin(angle * 0.3) * 1,
        basePosition[2] + Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  };
  return (
    <group ref={sceneRef}>
      <PerspectiveCamera makeDefault position={[0, 5, 20]} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        autoRotate={animationPhase === "idle"}
        autoRotateSpeed={0.5}
        maxDistance={30}
        minDistance={10}
      />
      {/* Lighting setup */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#00d4ff" />

      {/* Central robot arm */}
      <RobotArm
        position={[0, -6, 0]}
        scale={1.2}
        animated={true}
        automate={true}
      />

      {/* Category hubs */}
      {skillCategories.map((category, categoryIndex) => {
        const categorySkills = getSkillsByCategory(category.id as any);
        const isActive = selectedCategory === category.id;

        return (
          <group key={category.id}>
            <CategoryHub
              category={category}
              position={categoryPositions[categoryIndex]}
              skills={categorySkills}
              isActive={isActive}
              onClick={() => {
                setSelectedCategory(isActive ? null : category.id);
                setSelectedSkill(null);
                setAnimationPhase(isActive ? "idle" : "detail");
              }}
            />

            {/* Show skills when category is selected */}
            {isActive && (
              <group>
                {categorySkills.map((skill, skillIndex) => {
                  const skillPositions = getSkillPositions(
                    categoryIndex,
                    categorySkills.length,
                  );
                  return (
                    <SkillNode
                      key={skill.id}
                      skill={skill}
                      position={skillPositions[skillIndex]}
                      isSelected={selectedSkill === skill.id}
                      onClick={() =>
                        setSelectedSkill(
                          selectedSkill === skill.id ? null : skill.id,
                        )
                      }
                      categoryColor={category.color}
                      animationDelay={skillIndex * 0.2}
                    />
                  );
                })}

                {/* Connections between skills */}
                {categorySkills.map((skill, skillIndex) => {
                  const skillPositions = getSkillPositions(
                    categoryIndex,
                    categorySkills.length,
                  );
                  const nextIndex = (skillIndex + 1) % categorySkills.length;
                  return (
                    <SkillConnection
                      key={`${skill.id}-connection`}
                      start={new Vector3(...skillPositions[skillIndex])}
                      end={new Vector3(...skillPositions[nextIndex])}
                      color={category.color}
                    />
                  );
                })}
              </group>
            )}

            {/* Connection to center */}
            <SkillConnection
              start={new Vector3(...categoryPositions[categoryIndex])}
              end={new Vector3(0, -4, 0)}
              color={category.color}
              animated={true}
            />
          </group>
        );
      })}

      {/* Blueprint background planes */}
      <group>
        {/* Main background */}
        <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
          <planeGeometry args={[40, 30]} />
          <BlueprintMaterial
            color="#0070f3"
            opacity={0.08}
            gridSize={20}
            animated={true}
          />
        </mesh>

        {/* Secondary grid layers */}
        <mesh position={[0, 0, -14]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[35, 25]} />
          <BlueprintMaterial
            color="#00d4ff"
            opacity={0.05}
            gridSize={10}
            animated={true}
          />
        </mesh>
      </group>

      {/* Floating technical elements */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
            ]}
            color="#00d4ff"
            delay={i * 0.3}
          />
        ))}
      </group>

      <Environment preset="night" />
      <Postprocessing
        bloomIntensity={1.2}
        chromaticAberrationOffset={0.003}
        vignetteOffset={0.3}
        vignetteDarkness={0.8}
      />
    </group>
  );
};
// Loading component
const SkillsLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="loading-spinner" />
    <span className="ml-4 text-blueprint-400 font-mono">
      Initializing Skills Matrix...
    </span>
  </div>
);
// Main component
export const SkillsScene: React.FC<SkillsSceneProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { elementRef, inView } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });
  // GSAP animations for the container
  useGSAP(
    () => {
      if (inView && containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { dependencies: [inView] },
  );
  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full h-full bg-slate-950 rounded-lg overflow-hidden blueprint-bg"
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={<SkillsLoader />}>
            <SkillsContent />
          </Suspense>
        </Canvas>
      </div>
      {/* Info overlay */}
      <div className="absolute top-4 left-4 glass rounded-lg p-4 z-10">
        <h3 className="font-display text-lg font-bold text-blueprint-400 mb-2">
          Skills Matrix
        </h3>
        <p className="text-sm text-slate-300 mb-2">
          Interactive 3D visualization of technical expertise
        </p>
        <div className="text-xs text-slate-400 space-y-1">
          <div>• Click categories to explore skills</div>
          <div>• Drag to rotate, scroll to zoom</div>
          <div>• Particle density indicates skill level</div>
        </div>
      </div>

      {/* Performance monitor */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono">
        <div>Skills: {skills.length}</div>
        <div>Categories: {skillCategories.length}</div>
      </div>
    </div>
  );
};
export default SkillsScene;
