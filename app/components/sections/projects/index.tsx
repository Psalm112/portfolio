import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
  Box,
  Cylinder,
  Torus,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { projects, ProjectType } from "./data/projects";

gsap.registerPlugin(ScrollTrigger);

// 3D Robot Component
const Robot3D = ({
  position,
  rotation,
  scale,
  animated = true,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  animated?: boolean;
}) => {
  const robotRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (robotRef.current && animated) {
      const time = clock.getElapsedTime();
      robotRef.current.rotation.y = rotation[1] + Math.sin(time) * 0.1;
      robotRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;

      if (hovered) {
        robotRef.current.scale.setScalar(scale * 1.1);
      } else {
        robotRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <group
      ref={robotRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Robot Base */}
      <Box args={[1.5, 0.3, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Robot Body */}
      <Box args={[1, 1.2, 0.8]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </Box>

      {/* Robot Head */}
      <Sphere args={[0.4]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#4B5563" metalness={0.9} roughness={0.1} />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.08]} position={[-0.15, 1.65, 0.35]}>
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Sphere args={[0.08]} position={[0.15, 1.65, 0.35]}>
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Arms */}
      <Cylinder
        args={[0.1, 0.1, 0.8]}
        position={[-0.8, 0.8, 0]}
        rotation={[0, 0, Math.PI / 6]}
      >
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.4} />
      </Cylinder>
      <Cylinder
        args={[0.1, 0.1, 0.8]}
        position={[0.8, 0.8, 0]}
        rotation={[0, 0, -Math.PI / 6]}
      >
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.4} />
      </Cylinder>

      {/* Wheels */}
      <Cylinder
        args={[0.3, 0.3, 0.2]}
        position={[-0.6, -0.3, 0.6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.7} />
      </Cylinder>
      <Cylinder
        args={[0.3, 0.3, 0.2]}
        position={[0.6, -0.3, 0.6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.7} />
      </Cylinder>
      <Cylinder
        args={[0.3, 0.3, 0.2]}
        position={[-0.6, -0.3, -0.6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.7} />
      </Cylinder>
      <Cylinder
        args={[0.3, 0.3, 0.2]}
        position={[0.6, -0.3, -0.6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.7} />
      </Cylinder>

      {/* Sensors */}
      <Box args={[0.3, 0.1, 0.1]} position={[0, 0.9, 0.45]}>
        <meshStandardMaterial
          color="#DC2626"
          emissive="#DC2626"
          emissiveIntensity={0.3}
        />
      </Box>
    </group>
  );
};

// 3D IoT Device Component
const IoTDevice3D = ({
  position,
  rotation,
  scale,
  type = "sensor",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  type?: "sensor" | "gateway" | "actuator";
}) => {
  const deviceRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (deviceRef.current) {
      const time = clock.getElapsedTime();
      deviceRef.current.rotation.y = rotation[1] + Math.sin(time * 0.5) * 0.05;

      if (hovered) {
        deviceRef.current.scale.setScalar(scale * 1.1);
      } else {
        deviceRef.current.scale.setScalar(scale);
      }
    }
  });

  const getDeviceColor = () => {
    switch (type) {
      case "sensor":
        return "#10B981";
      case "gateway":
        return "#3B82F6";
      case "actuator":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  return (
    <group
      ref={deviceRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main Device Body */}
      <Box args={[1, 0.6, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={getDeviceColor()}
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Antenna */}
      <Cylinder args={[0.02, 0.02, 0.8]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* LED Indicators */}
      <Sphere args={[0.05]} position={[-0.3, 0.15, 0.41]}>
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.8}
        />
      </Sphere>
      <Sphere args={[0.05]} position={[0, 0.15, 0.41]}>
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.8}
        />
      </Sphere>
      <Sphere args={[0.05]} position={[0.3, 0.15, 0.41]}>
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.8}
        />
      </Sphere>

      {/* Sensor Array */}
      {type === "sensor" && (
        <>
          <Cylinder args={[0.1, 0.1, 0.2]} position={[-0.2, -0.1, 0.5]}>
            <meshStandardMaterial
              color="#1F2937"
              metalness={0.6}
              roughness={0.4}
            />
          </Cylinder>
          <Cylinder args={[0.1, 0.1, 0.2]} position={[0.2, -0.1, 0.5]}>
            <meshStandardMaterial
              color="#1F2937"
              metalness={0.6}
              roughness={0.4}
            />
          </Cylinder>
        </>
      )}

      {/* Gateway Dish */}
      {type === "gateway" && (
        <Torus
          args={[0.3, 0.02]}
          position={[0, 0.4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color="#1F2937"
            metalness={0.8}
            roughness={0.2}
          />
        </Torus>
      )}
    </group>
  );
};

// 3D Blockchain Network Visualization
const BlockchainNetwork3D = ({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) => {
  const networkRef = useRef<THREE.Group>(null);
  const [nodes] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 2,
        Math.sin((i / 4) * Math.PI) * 0.5,
        Math.sin((i / 8) * Math.PI * 2) * 2,
      ] as [number, number, number],
      color: i % 2 === 0 ? "#00D4FF" : "#9333EA",
    }))
  );

  useFrame(({ clock }) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={networkRef} position={position} scale={scale}>
      {/* Network Nodes */}
      {nodes.map((node, index) => (
        <Float key={index} speed={1 + index * 0.1} rotationIntensity={0.2}>
          <Sphere args={[0.15]} position={node.position}>
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>
      ))}

      {/* Central Hub */}
      <Sphere args={[0.3]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#10B981"
          distort={0.3}
          speed={2}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </group>
  );
};

// Project 3D Preview Component
const Project3DPreview = ({
  project,
  className = "",
}: {
  project: ProjectType;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderContent = () => {
    switch (project.type) {
      case "robot":
        return (
          <>
            <Robot3D position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.8} />
            <Environment preset="warehouse" />
            <ContactShadows
              position={[0, -2, 0]}
              scale={10}
              blur={2}
              far={20}
            />
          </>
        );
      case "iot":
        return (
          <>
            <IoTDevice3D
              position={[-1.5, 0, 0]}
              rotation={[0, 0, 0]}
              scale={0.6}
              type="sensor"
            />
            <IoTDevice3D
              position={[0, 0, 0]}
              rotation={[0, Math.PI / 4, 0]}
              scale={0.6}
              type="gateway"
            />
            <IoTDevice3D
              position={[1.5, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.6}
              type="actuator"
            />
            <Environment preset="city" />
            <ContactShadows
              position={[0, -1, 0]}
              scale={8}
              blur={1.5}
              far={15}
            />
          </>
        );
      case "research":
        return (
          <>
            <BlockchainNetwork3D position={[0, 0, 0]} scale={0.8} />
            <Environment preset="sunset" />
          </>
        );
      default:
        return (
          <>
            <Box args={[1, 1, 1]} position={[0, 0, 0]}>
              <meshStandardMaterial
                color={project.accentColor}
                metalness={0.7}
                roughness={0.3}
              />
            </Box>
            <Environment preset="studio" />
          </>
        );
    }
  };

  return (
    <div
      className={`relative w-full h-64 lg:h-80 rounded-xl overflow-hidden ${className}`}
    >
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight
          position={[-5, 5, 5]}
          intensity={0.5}
          color={project.accentColor}
        />

        <Suspense fallback={null}>{renderContent()}</Suspense>

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Loading overlay */}
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center opacity-0 pointer-events-none">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Software":
        return "💻";
      case "Hardware":
        return "🔧";
      case "Full-Stack":
        return "🌐";
      case "Research":
        return "🔬";
      default:
        return "⚡";
    }
  };

  return (
    <motion.article
      ref={cardRef}
      className={`relative bg-gradient-to-br ${project.gradient} backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden group`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.02, y: -8 }}
      role="article"
      aria-labelledby={`project-${project.id}-title`}
      tabIndex={0}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 3D Preview */}
      <div className="relative">
        <Project3DPreview project={project} />

        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getCategoryIcon(project.category)}</span>
            <span className="font-jetbrains text-xs text-white font-medium uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project links overlay */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/70 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          )}

          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/70 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:text-green-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View ${project.title} live demo`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 6h2v8h-2v-8zm1 12c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10z" />
              </svg>
            </motion.a>
          )}

          {project.links.paper && (
            <motion.a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/70 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View ${project.title} research paper`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8">
        <div className="mb-4">
          <h3
            id={`project-${project.id}-title`}
            className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-2"
          >
            {project.title}
          </h3>
          <p className="font-jetbrains text-sm text-cyan-400 uppercase tracking-wider font-medium">
            {project.subtitle}
          </p>
        </div>

        <p className="font-inter text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-orbitron text-sm font-semibold text-white mb-3 uppercase tracking-wide">
            Key Features
          </h4>
          <div className="space-y-2">
            {project.keyFeatures
              .slice(0, isExpanded ? undefined : 3)
              .map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start space-x-2 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="font-inter">{feature}</span>
                </motion.div>
              ))}
          </div>

          {project.keyFeatures.length > 3 && (
            <motion.button
              className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-jetbrains uppercase tracking-wider font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded
                ? "Show Less"
                : `+${project.keyFeatures.length - 3} More`}
            </motion.button>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {project.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.1 }}
              >
                <div className="text-lg mb-1">{metric.icon}</div>
                <div className="font-orbitron text-lg font-bold text-white">
                  {metric.value}
                </div>
                <div className="font-inter text-xs text-gray-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="font-orbitron text-sm font-semibold text-white mb-3 uppercase tracking-wide">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className={`w-full py-3 px-4 bg-gradient-to-r from-transparent to-transparent border-2 border-white/20 rounded-lg font-orbitron font-semibold text-white text-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            borderImage: `linear-gradient(45deg, ${project.accentColor}50, transparent) 1`,
          }}
          aria-label={`Learn more about ${project.title}`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Explore Project</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </motion.button>
      </div>
    </motion.article>
  );
};

// Filter Component
const ProjectFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          className={`px-6 py-3 rounded-full font-jetbrains text-sm font-medium uppercase tracking-wider transition-all duration-300 border-2 ${
            activeCategory === category
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg"
              : "border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-white"
          }`}
          onClick={() => onCategoryChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={activeCategory === category}
          role="button"
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

// Main Projects Component
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const categories = ["All", "Hardware", "Software", "Full-Stack", "Research"];

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-800 via-gray-900 to-black overflow-hidden"
      role="main"
      aria-labelledby="projects-heading"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-20 left-16 w-72 h-72 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block font-jetbrains text-cyan-400 text-sm sm:text-base tracking-widest uppercase mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Featured Work
          </motion.span>

          <motion.h2
            id="projects-heading"
            className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              Innovation
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Portfolio
            </span>
          </motion.h2>

          <motion.p
            className="font-inter text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            From autonomous robots to blockchain-secured IoT networks, explore
            my journey in building intelligent systems that bridge the gap
            between hardware and software innovation.
          </motion.p>
        </motion.div>

        {/* Project Filter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ProjectFilter
            categories={categories}
            activeCategory={activeFilter}
            onCategoryChange={setActiveFilter}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
          layout
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.p
            className="font-inter text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Interested in collaborating on cutting-edge projects? Let&apos;s
            discuss how we can bring your innovative ideas to life with modern
            technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-orbitron font-semibold text-white shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="View all projects on GitHub"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View All Projects</span>
              </span>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-gray-600 rounded-lg font-orbitron font-semibold text-gray-300 hover:border-cyan-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Contact for collaboration"
            >
              <span className="flex items-center space-x-2">
                <span>Let&apos;s Collaborate</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
