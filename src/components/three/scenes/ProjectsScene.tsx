"use client";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  Environment,
  useTexture,
  Html,
} from "@react-three/drei";
import { WarehouseSystem } from "../models/WarehouseSystem";
import { Postprocessing } from "../effects/Postprocessing";
import { CircuitMaterial } from "../materials/CircuitMaterial";
import { BlueprintMaterial } from "../materials/BlueprintMaterial";
import { projects, projectCategories } from "@/data/projects";
import { Project } from "@/types";
import * as THREE from "three";
import { gsap } from "gsap";

interface ProjectsSceneProps {
  className?: string;
  activeCategory?: string;
  onProjectSelect?: (project: Project) => void;
}

// Interactive Circuit Board Component
const InteractiveCircuitBoard = ({
  project,
  position,
  isActive,
  onClick,
}: {
  project: Project;
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Rotation based on activity
      if (isActive) {
        groupRef.current.rotation.y =
          Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  const getCategoryColor = (category: string) => {
    const categoryData = projectCategories.find((cat) => cat.id === category);
    return categoryData?.color || "#00d4ff";
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Circuit Board */}
      <mesh>
        <boxGeometry args={[3, 2, 0.1]} />
        <CircuitMaterial
          color1={getCategoryColor(project.category)}
          color2="#ffffff"
          intensity={isActive ? 2 : hovered ? 1.5 : 1}
          animated={true}
        />
      </mesh>

      {/* Project Category Indicator */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1, 1, 0.05]} />
        <meshStandardMaterial
          color={getCategoryColor(project.category)}
          emissive={getCategoryColor(project.category)}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </mesh>

      {/* Circuit Traces */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            ((i % 3) - 1) * 0.8,
            (Math.floor(i / 3) - 0.5) * 0.6,
            0.12,
          ]}
        >
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <CircuitMaterial
            color1={getCategoryColor(project.category)}
            intensity={isActive ? 1.5 : 0.8}
            animated={true}
          />
        </mesh>
      ))}

      {/* Connection Points */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 1.2,
            Math.sin((i / 4) * Math.PI * 2) * 0.8,
            0.15,
          ]}
        >
          <sphereGeometry args={[0.05]} />
          <CircuitMaterial
            color1="#00ff88"
            intensity={isActive ? 2 : 1}
            animated={true}
          />
        </mesh>
      ))}

      {/* Project Title */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color={isActive ? "#00ff88" : "#ffffff"}
        anchorX="center"
        font="/fonts/JetBrainsMono-Bold.woff"
        maxWidth={2.5}
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Hover Information */}
      {hovered && (
        <Html position={[0, -2.2, 0]} center>
          <div className="bg-slate-900/90 backdrop-blur-sm border border-blueprint-600/30 rounded-lg p-3 max-w-xs">
            <p className="text-xs text-blueprint-200 font-mono">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-1.5 py-0.5 bg-blueprint-600/20 text-blueprint-300 rounded font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Animated Project Display System
const ProjectDisplaySystem = ({
  activeProject,
  onCategorySelect,
}: {
  activeProject: Project;
  onCategorySelect: (category: string) => void;
}) => {
  const systemRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (systemRef.current) {
      systemRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const renderProjectSpecificModel = () => {
    switch (activeProject.category) {
      case "robotics":
        return (
          <group position={[0, -1, 0]}>
            <WarehouseSystem position={[0, 0, 0]} scale={0.4} animated={true} />
          </group>
        );

      case "embedded":
        return (
          <group>
            {/* Microcontroller System */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 1.5, 0.3]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* GPIO Pins */}
            {Array.from({ length: 20 }).map((_, i) => (
              <mesh
                key={i}
                position={[((i % 10) - 4.5) * 0.2, i < 10 ? 0.8 : -0.8, 0.2]}
              >
                <boxGeometry args={[0.05, 0.15, 0.4]} />
                <CircuitMaterial
                  color1="#ffff00"
                  intensity={1 + Math.sin(Date.now() * 0.01 + i) * 0.5}
                  animated={true}
                />
              </mesh>
            ))}

            {/* LED Indicators */}
            {Array.from({ length: 4 }).map((_, i) => (
              <mesh key={i} position={[(i - 1.5) * 0.4, 0.3, 0.2]}>
                <sphereGeometry args={[0.08]} />
                <CircuitMaterial
                  color1={i % 2 === 0 ? "#00ff88" : "#ff0066"}
                  intensity={2}
                  animated={true}
                />
              </mesh>
            ))}
          </group>
        );

      case "blockchain":
        return (
          <group>
            {/* Blockchain Nodes */}
            {Array.from({ length: 5 }).map((_, i) => (
              <group
                key={i}
                position={[
                  Math.cos((i / 5) * Math.PI * 2) * 2,
                  Math.sin((i / 5) * Math.PI * 2) * 2,
                  0,
                ]}
              >
                <mesh>
                  <boxGeometry args={[0.6, 0.6, 0.6]} />
                  <CircuitMaterial
                    color1="#00d4ff"
                    color2="#00ffff"
                    intensity={1.5}
                    animated={true}
                  />
                </mesh>

                {/* Connection Lines */}
                {i < 4 && (
                  <mesh
                    position={[
                      (Math.cos(((i + 1) / 5) * Math.PI * 2) -
                        Math.cos((i / 5) * Math.PI * 2)) *
                        1,
                      (Math.sin(((i + 1) / 5) * Math.PI * 2) -
                        Math.sin((i / 5) * Math.PI * 2)) *
                        1,
                      0,
                    ]}
                    rotation={[
                      0,
                      0,
                      Math.atan2(
                        Math.sin(((i + 1) / 5) * Math.PI * 2) -
                          Math.sin((i / 5) * Math.PI * 2),
                        Math.cos(((i + 1) / 5) * Math.PI * 2) -
                          Math.cos((i / 5) * Math.PI * 2),
                      ),
                    ]}
                  >
                    <boxGeometry args={[2, 0.05, 0.05]} />
                    <CircuitMaterial
                      color1="#ffffff"
                      intensity={0.8}
                      animated={true}
                    />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        );

      case "frontend":
        return (
          <group>
            {/* Browser Window */}
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[4, 2.5, 0.1]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>

            {/* Browser Bar */}
            <mesh position={[0, 1.6, 0.06]}>
              <boxGeometry args={[4, 0.3, 0.02]} />
              <meshStandardMaterial color="#334155" />
            </mesh>

            {/* Window Controls */}
            {Array.from({ length: 3 }).map((_, i) => (
              <mesh key={i} position={[-1.6 + i * 0.2, 1.6, 0.07]}>
                <sphereGeometry args={[0.06]} />
                <meshStandardMaterial
                  color={i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#10b981"}
                />
              </mesh>
            ))}

            {/* Code Blocks */}
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh
                key={i}
                position={[
                  ((i % 4) - 1.5) * 0.8,
                  0.8 - Math.floor(i / 4) * 0.3,
                  0.06,
                ]}
              >
                <boxGeometry args={[0.6, 0.1, 0.01]} />
                <CircuitMaterial
                  color1={
                    i % 3 === 0
                      ? "#00d4ff"
                      : i % 3 === 1
                        ? "#00ff88"
                        : "#ffff00"
                  }
                  intensity={1}
                  animated={true}
                />
              </mesh>
            ))}
          </group>
        );

      default:
        return (
          <group>
            <mesh>
              <sphereGeometry args={[1]} />
              <CircuitMaterial
                color1="#00d4ff"
                intensity={1.5}
                animated={true}
              />
            </mesh>
          </group>
        );
    }
  };

  return <group ref={systemRef}>{renderProjectSpecificModel()}</group>;
};

// Category Filter System
const CategoryFilterSystem = ({
  activeCategory,
  onCategorySelect,
}: {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}) => {
  return (
    <group position={[0, 4, 0]}>
      {projectCategories.map((category, index) => (
        <group
          key={category.id}
          position={[(index - projectCategories.length / 2 + 0.5) * 2, 0, 0]}
        >
          <mesh
            onClick={() => onCategorySelect(category.id)}
            onPointerOver={(e) => e.stopPropagation()}
          >
            <boxGeometry args={[0.8, 0.8, 0.2]} />
            <CircuitMaterial
              color1={category.color}
              intensity={activeCategory === category.id ? 2 : 1}
              animated={true}
            />
          </mesh>

          <Text
            position={[0, -0.6, 0]}
            fontSize={0.12}
            color={activeCategory === category.id ? category.color : "#ffffff"}
            anchorX="center"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {category.name.toUpperCase()}
          </Text>
        </group>
      ))}
    </group>
  );
};

const ProjectsContent = ({
  activeCategory,
  onProjectSelect,
}: {
  activeCategory: string;
  onProjectSelect?: (project: Project) => void;
}) => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [currentCategory, setCurrentCategory] = useState(
    activeCategory || "all",
  );

  const filteredProjects =
    currentCategory === "all"
      ? projects
      : projects.filter((p) => p.category === currentCategory);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onProjectSelect?.(project);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    const categoryProjects =
      category === "all"
        ? projects
        : projects.filter((p) => p.category === category);

    if (categoryProjects.length > 0) {
      setSelectedProject(categoryProjects[0]);
    }
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 12]} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />

      {/* Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, 0, 5]} intensity={0.4} color="#00d4ff" />
      <pointLight position={[10, -5, -5]} intensity={0.3} color="#00ff88" />

      {/* Blueprint Background Grid */}
      <mesh position={[0, 0, -8]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <BlueprintMaterial
          color="#0070f3"
          opacity={0.1}
          gridSize={25}
          animated={true}
        />
      </mesh>

      {/* Category Filter System */}
      <CategoryFilterSystem
        activeCategory={currentCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Project Display */}
      <group position={[0, 0, 0]}>
        <ProjectDisplaySystem
          activeProject={selectedProject}
          onCategorySelect={handleCategorySelect}
        />

        {/* Project Information Display */}
        <group position={[0, -4, 0]}>
          <Text
            position={[0, 1, 0]}
            fontSize={0.3}
            color="#00d4ff"
            anchorX="center"
            font="/fonts/Orbitron-Bold.woff"
            maxWidth={10}
          >
            {selectedProject.title.toUpperCase()}
          </Text>

          <Text
            position={[0, 0.4, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            font="/fonts/Inter-Regular.woff"
            maxWidth={12}
          >
            {selectedProject.description}
          </Text>

          {/* Technology Tags */}
          <group position={[0, -0.3, 0]}>
            {selectedProject.technologies.slice(0, 6).map((tech, index) => (
              <Text
                key={tech}
                position={[
                  ((index % 3) - 1) * 2,
                  -Math.floor(index / 3) * 0.3,
                  0,
                ]}
                fontSize={0.1}
                color="#00ff88"
                anchorX="center"
                font="/fonts/JetBrainsMono-Regular.woff"
              >
                {tech.toUpperCase()}
              </Text>
            ))}
          </group>
        </group>
      </group>

      {/* Project Navigation Carousel */}
      <group position={[0, -6, 0]}>
        {filteredProjects.slice(0, 5).map((project, index) => (
          <InteractiveCircuitBoard
            key={project.id}
            project={project}
            position={[(index - 2) * 3.5, 0, 0]}
            isActive={selectedProject.id === project.id}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </group>

      {/* Floating Data Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <CircuitMaterial
            color1="#ffffff"
            intensity={Math.random() * 1.5}
            animated={true}
          />
        </mesh>
      ))}

      <Environment preset="night" />
      <Postprocessing bloomIntensity={0.8} chromaticAberrationOffset={0.001} />
    </>
  );
};

export const ProjectsScene: React.FC<ProjectsSceneProps> = ({
  className,
  activeCategory = "all",
  onProjectSelect,
}) => {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <ProjectsContent
            activeCategory={activeCategory}
            onProjectSelect={onProjectSelect}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ProjectsScene;
