"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SkillsScene } from "@/components/three/scenes/SkillsScene";
import { SkillCategory } from "./SkillCategory";
import { CircuitBoard3D } from "./CircuitBoard3D";
import { AnimatedIcons } from "./AnimatedIcons";
import { useGSAP } from "@/hooks/useGSAP";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { gsap } from "gsap";
import { cn } from "@/lib/utils/cn";

const skillCategories = [
  {
    id: "frontend",
    name: "Frontend Engineering",
    icon: "⚛️",
    color: "#00d4ff",
    skills: [
      { name: "React/Next.js", level: 95, years: 4 },
      { name: "TypeScript", level: 90, years: 3 },
      { name: "JavaScript ES6+", level: 95, years: 5 },
      { name: "Tailwind CSS", level: 90, years: 3 },
      { name: "GSAP/Framer Motion", level: 85, years: 2 },
      { name: "Three.js/WebGL", level: 80, years: 2 },
      { name: "Redux/Zustand", level: 88, years: 3 },
      { name: "GraphQL/REST", level: 85, years: 3 },
    ],
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    icon: "🔧",
    color: "#00ff88",
    skills: [
      { name: "Arduino/ESP32", level: 95, years: 5 },
      { name: "C/C++", level: 90, years: 4 },
      { name: "Circuit Design", level: 88, years: 4 },
      { name: "PCB Design", level: 85, years: 3 },
      { name: "Sensor Integration", level: 92, years: 4 },
      { name: "IoT Protocols", level: 90, years: 3 },
      { name: "RTOS", level: 80, years: 2 },
      { name: "ARM Cortex", level: 75, years: 2 },
    ],
  },
  {
    id: "communications",
    name: "Communications",
    icon: "📡",
    color: "#ffff00",
    skills: [
      { name: "RF Design", level: 85, years: 3 },
      { name: "Signal Processing", level: 88, years: 4 },
      { name: "Wireless Protocols", level: 90, years: 3 },
      { name: "Antenna Design", level: 80, years: 2 },
      { name: "Network Security", level: 85, years: 3 },
      { name: "Protocol Analysis", level: 88, years: 3 },
      { name: "SDR", level: 75, years: 2 },
      { name: "Modulation", level: 85, years: 3 },
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain & AI",
    icon: "🔗",
    color: "#ff8800",
    skills: [
      { name: "Solidity/Smart Contracts", level: 85, years: 2 },
      { name: "Web3.js/Ethers.js", level: 80, years: 2 },
      { name: "Machine Learning", level: 75, years: 2 },
      { name: "Graph Neural Networks", level: 70, years: 1 },
      { name: "Python/TensorFlow", level: 78, years: 2 },
      { name: "Blockchain Architecture", level: 82, years: 2 },
      { name: "DeFi Protocols", level: 75, years: 1 },
      { name: "ZK-Proofs", level: 70, years: 1 },
    ],
  },
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const { elementRef, inView } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  useGSAP(
    () => {
      if (!inView) return;

      const tl = gsap.timeline();

      // Title animation
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
        },
      );

      // Skills categories staggered animation
      const categories =
        containerRef.current?.querySelectorAll(".skill-category");
      if (categories) {
        tl.fromTo(
          categories,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [inView],
    },
  );

  return (
    <div
      ref={elementRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-900"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <SkillsScene activeCategory={activeCategory} />
          </Suspense>
        </Canvas>
      </div>

      {/* Circuit Board Animation */}
      <div className="absolute inset-0 z-10">
        <CircuitBoard3D />
      </div>

      <div ref={containerRef} className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={cn(
              "text-5xl md:text-7xl font-display font-bold mb-6",
              "bg-gradient-to-r from-blueprint-300 via-electric-blue to-electric-cyan",
              "bg-clip-text text-transparent",
            )}
          >
            Technical Expertise
          </h2>
          <p className="text-xl text-blueprint-200 max-w-3xl mx-auto font-mono">
            A comprehensive skillset spanning frontend development, embedded
            systems, communications engineering, and emerging technologies
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={category.id} className="skill-category">
              <SkillCategory
                category={category}
                isActive={activeCategory === category.id}
                onSelect={() => setActiveCategory(category.id)}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Animated Icons */}
        <AnimatedIcons activeCategory={activeCategory} />

        {/* Technical Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { label: "Years Experience", value: "5+", icon: "📅" },
            { label: "Projects Completed", value: "50+", icon: "🚀" },
            { label: "Technologies Mastered", value: "30+", icon: "⚡" },
            { label: "Lines of Code", value: "100K+", icon: "💻" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-slate-900/50 backdrop-blur-sm border border-blueprint-500/20 rounded-lg hover:border-electric-blue/50 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-electric-blue mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-blueprint-300 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
