"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  title: string;
  iconUrl: string;
}
interface ToolboxProps {
  skills: Skill[];
}

function ToolPlane({ index, total, pos, iconUrl }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useTexture<string>(iconUrl);

  // Random protrusion start height
  const startY = 0.2 + Math.random() * 0.5;
  const endY = 2.5;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills-toolbox",
        start: "top top",
        end: "+=" + total * 100 + "%",
        scrub: true,
        snap: 1 / total,
      },
    });

    tl.fromTo(
      ref.current!.position,
      { y: startY },
      { y: endY, duration: 1 },
      index / total
    );

    return () => {
      tl.kill();
    };
  }, [index, total, startY]);

  return (
    <mesh ref={ref} position={[pos.x, startY, pos.z]}>
      <planeGeometry args={[0.4, 0.4]} />
      <meshStandardMaterial
        map={tex}
        transparent
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function ToolboxWithLid({ skills }: { skills: Skill[] }) {
  const lid = useRef<THREE.Mesh>(null);

  const finishMetal = useTexture("/textures/brushed_metal.png");
  const normalMetal = useTexture("/textures/brushed_metal.png");

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills-toolbox",
        start: "top top",
        end: "top+=20%",
        scrub: true,
      },
    });
    tl.to(lid.current!.rotation, { x: -Math.PI / 2, duration: 1 });
    return () => {
      tl.kill();
    };
  }, []);

  const r = 1.2;
  return (
    <group>
      {/* Base with rounded edges */}
      <RoundedBox
        args={[3, 0.3, 2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0.15, 0]}
      >
        <meshStandardMaterial
          map={finishMetal}
          normalMap={normalMetal}
          metalness={0.8}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Lid */}
      <RoundedBox
        args={[3, 0.2, 2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0.55, -1]}
        ref={lid}
      >
        <meshStandardMaterial
          map={finishMetal}
          normalMap={normalMetal}
          metalness={0.8}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Tool icons scattered and protruding */}
      {skills.map((s, i) => {
        const ang = Math.random() * Math.PI * 2;
        const pos = new THREE.Vector3(
          Math.cos(ang) * r,
          0,
          Math.sin(ang) * r * 0.7
        );
        return (
          <ToolPlane
            key={i}
            index={i}
            total={skills.length}
            pos={pos}
            iconUrl={s.iconUrl}
          />
        );
      })}
    </group>
  );
}

export default function SkillsToolbox({ skills }: ToolboxProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeStep = useRef(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current!,
      start: "top top",
      end: "+=" + skills.length * 100 + "%",
      scrub: true,
      pin: true,
      snap: 1 / skills.length,
      onUpdate: (self) =>
        (activeStep.current = Math.floor(self.progress * skills.length)),
    });
    return () => st.kill();
  }, [skills.length]);

  return (
    <section
      id="skills-toolbox"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0d0d12] text-white grid grid-cols-2 overflow-hidden"
    >
      <div className="h-full">
        <Canvas flat camera={{ position: [0, 3, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 4]} intensity={1} />
          <Suspense fallback={<Html center>Loading…</Html>}>
            <ToolboxWithLid skills={skills} />
          </Suspense>
          <OrbitControls enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="p-8 flex flex-col space-y-4 overflow-y-auto">
        <motion.h2
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Skills Toolbox
        </motion.h2>

        {skills.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center space-x-4 p-4 bg-gray-900/70 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={
              i <= activeStep.current
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <img src={s.iconUrl} alt={s.title} className="w-10 h-10" />
            <span className="text-lg">{s.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
