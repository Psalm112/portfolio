
"use client";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Environment } from "@react-three/drei";
import { WarehouseSystem } from "../models/WarehouseSystem";
import { Postprocessing } from "../effects/Postprocessing";
import { CircuitMaterial } from "../materials/CircuitMaterial";

interface ProjectsSceneProps {
  className?: string;
}

const ProjectsContent = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "IoT Warehouse Management",
      description: "Automated inventory system with real-time tracking",
      component: <WarehouseSystem position={[0, -2, 0]} scale={0.3} animated={true} />
    },
    {
      title: "Smart Communication Hub",
      description: "Multi-protocol communication gateway"
    },
    {
      title: "Embedded Control System",
      description: "Real-time control for industrial automation"
    }
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 12]} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        autoRotate={false}
      />

      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, 0, 5]} intensity={0.4} color="#00d4ff" />

      {/* Main project display */}
      <group>
        {projects[activeProject].component}
        
        {/* Project info display */}
        <group position={[0, 6, 0]}>
          <Text
            position={[0, 1, 0]}
            fontSize={0.4}
            color="#00d4ff"
            anchorX="center"
            font="/fonts/Orbitron-Bold.woff"
          >
            {projects[activeProject].title}
          </Text>
          
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            font="/fonts/Inter-Regular.woff"
            maxWidth={8}
          >
            {projects[activeProject].description}
          </Text>
        </group>

        {/* Project navigation */}
        <group position={[0, -6, 0]}>
          {projects.map((_, index) => (
            <mesh
              key={index}
              position={[(index - 1) * 2, 0, 0]}
              onClick={() => setActiveProject(index)}
            >
              <sphereGeometry args={[0.3]} />
              <CircuitMaterial
                color1={index === activeProject ? "#00ff88" : "#333333"}
                intensity={index === activeProject ? 1.5 : 0.5}
                animated={true}
              />
            </mesh>
          ))}
        </group>
      </group>

      <Environment preset="night" />
      <Postprocessing