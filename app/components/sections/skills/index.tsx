import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Html,
  MeshDistortMaterial,
  Line,
} from "@react-three/drei";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { skills, SkillsType } from "./data/skills";

gsap.registerPlugin(ScrollTrigger);

// 3D Skill Node Component
const SkillNode = ({
  position,
  color,
  label,
  proficiency,
  category,
  index,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  proficiency: number;
  category: string;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() + index) * 0.1;
      meshRef.current.rotation.y =
        Math.cos(clock.getElapsedTime() + index) * 0.1;

      if (hovered) {
        meshRef.current.scale.setScalar(
          1.2 + Math.sin(clock.getElapsedTime() * 2) * 0.1
        );
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const nodeColor = new THREE.Color(color);
  const scale = 0.3 + (proficiency / 100) * 0.4;

  return (
    <Float speed={1 + index * 0.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={nodeColor}
          transparent
          opacity={0.8}
          distort={hovered ? 0.6 : 0.2}
          speed={2}
          roughness={0}
          metalness={0.8}
        />

        {hovered && (
          <Html center>
            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/50 pointer-events-none">
              <div className="font-jetbrains text-cyan-400 text-xs font-bold uppercase tracking-wide">
                {category}
              </div>
              <div className="font-orbitron text-white text-sm font-semibold">
                {label}
              </div>
              <div className="font-inter text-gray-300 text-xs">
                {proficiency}% Proficiency
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
};

// Connecting Lines Component
const SkillConnections = ({ skills }: { skills: SkillsType[] }) => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        if (skills[i].category === skills[j].category) {
          lines.push({
            from: skills[i].position,
            to: skills[j].position,
            opacity: 0.2,
          });
        }
      }
    }
    return lines;
  }, [skills]);

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => {
        const points = [
          new THREE.Vector3(...connection.from),
          new THREE.Vector3(...connection.to),
        ];

        return (
          <Line
            key={index}
            points={points}
            color="#00D4FF"
            transparent
            opacity={connection.opacity}
            lineWidth={1}
          />
        );
      })}
    </group>
  );
};

// Skills 3D Scene
const Skills3DScene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333EA" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        intensity={1}
        color="#10B981"
      />

      {skills.map((skill, index) => (
        <SkillNode
          key={skill.label}
          position={skill.position}
          color={skill.color}
          label={skill.label}
          proficiency={skill.proficiency}
          category={skill.category}
          index={index}
        />
      ))}

      <SkillConnections skills={skills} />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

// Skill Category Card
const SkillCategoryCard = ({
  category,
  skills,
  icon,
  gradient,
  delay = 0,
}: {
  category: string;
  skills: string[];
  icon: string;
  gradient: string;
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/20 group overflow-hidden`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
          <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white">
            {category}
          </h3>
        </div>

        <div className="space-y-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.1 + index * 0.05 }}
            >
              <div className="w-2 h-2 bg-white rounded-full opacity-60" />
              <span className="font-jetbrains text-sm lg:text-base text-gray-200 font-medium">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Proficiency Meter
const ProficiencyMeter = ({
  skill,
  percentage,
  category,
  delay = 0,
}: {
  skill: string;
  percentage: number;
  category: string;
  delay?: number;
}) => {
  const meterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(meterRef, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView && meterRef.current) {
      const meter = meterRef.current.querySelector(
        ".proficiency-fill"
      ) as HTMLElement;
      if (meter) {
        gsap.to(meter, {
          width: `${percentage}%`,
          duration: 1.5,
          delay: delay,
          ease: "power2.out",
        });
      }
    }
  }, [isInView, percentage, delay]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Frontend":
        return "from-cyan-400 to-blue-500";
      case "Backend":
        return "from-green-400 to-emerald-500";
      case "Embedded":
        return "from-purple-400 to-pink-500";
      case "AI/ML":
        return "from-orange-400 to-red-500";
      case "Blockchain":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <motion.div
      ref={meterRef}
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-jetbrains text-white font-semibold text-sm lg:text-base">
            {skill}
          </h4>
          <span className="font-inter text-xs text-gray-400 uppercase tracking-wide">
            {category}
          </span>
        </div>
        <motion.span
          className="font-orbitron text-lg lg:text-xl font-bold text-cyan-400"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>

      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`proficiency-fill h-full bg-gradient-to-r ${getCategoryColor(
            category
          )} rounded-full w-0 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const skillCategories = [
    {
      category: "Frontend Engineering",
      skills: [
        "React.js & Next.js",
        "TypeScript/JavaScript",
        "Tailwind CSS & SCSS",
        "State Management (Redux)",
        "Web Performance Optimization",
      ],
      icon: "⚛️",
      gradient: "from-cyan-500/20 to-blue-600/20",
    },
    {
      category: "Backend Integration",
      skills: [
        "Node.js & Express",
        "REST API Development",
        "Firebase & Cloud Functions",
        "Database Design",
        "Authentication Systems",
      ],
      icon: "🔧",
      gradient: "from-green-500/20 to-emerald-600/20",
    },
    {
      category: "Embedded Systems",
      skills: [
        "Arduino Programming",
        "IoT Device Integration",
        "Sensor Networks",
        "Hardware-Software Interface",
        "Real-time Systems",
      ],
      icon: "🤖",
      gradient: "from-purple-500/20 to-pink-600/20",
    },
    {
      category: "AI & Blockchain",
      skills: [
        "Machine Learning Integration",
        "Graph Neural Networks",
        "Blockchain Development",
        "Smart Contracts",
        "Edge Computing",
      ],
      icon: "🧠",
      gradient: "from-orange-500/20 to-red-600/20",
    },
  ];

  const topSkills = [
    { skill: "React.js / Next.js", percentage: 95, category: "Frontend" },
    { skill: "TypeScript", percentage: 92, category: "Frontend" },
    { skill: "Arduino & IoT Systems", percentage: 90, category: "Embedded" },
    { skill: "API Integration", percentage: 88, category: "Backend" },
    { skill: "Blockchain Development", percentage: 85, category: "Blockchain" },
    { skill: "Machine Learning", percentage: 82, category: "AI/ML" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      role="main"
      aria-labelledby="skills-heading"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-16 left-10 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-16 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: contentY }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
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
            Technical Expertise
          </motion.span>

          <motion.h2
            id="skills-heading"
            className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              Full-Stack
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
              Innovation Arsenal
            </span>
          </motion.h2>

          <motion.p
            className="font-inter text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            From crafting pixel-perfect user interfaces to architecting
            intelligent embedded systems, I leverage cutting-edge technologies
            to build solutions that bridge the digital and physical worlds.
          </motion.p>
        </motion.div>

        {/* 3D Skills Visualization */}
        <motion.div
          className="mb-20 lg:mb-24"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50">
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Skills3DScene />
            </Canvas>

            {/* Interaction hint */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/30">
              <p className="font-jetbrains text-cyan-400 text-xs uppercase tracking-wide">
                🖱️ Drag to explore • Hover nodes for details
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.category}
              category={category.category}
              skills={category.skills}
              icon={category.icon}
              gradient={category.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Proficiency Meters */}
        <motion.div
          className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-gray-700/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h3
            className="font-orbitron text-2xl lg:text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Core Competencies
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {topSkills.map((skill, index) => (
              <ProficiencyMeter
                key={skill.skill}
                skill={skill.skill}
                percentage={skill.percentage}
                category={skill.category}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.p
            className="font-inter text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Ready to leverage these skills for your next groundbreaking project?
            Let&apos;s build something that pushes the boundaries of what&apos;s
            possible.
          </motion.p>

          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-lg font-orbitron font-semibold text-white shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            aria-label="View detailed project implementations"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>See Skills in Action</span>
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
    </section>
  );
}
