"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "@/components/three/scenes/HeroScene";
import { HeroAnimations } from "./HeroAnimations";
import { Blueprint3D } from "./Blueprint3D";
import { Button } from "@/components/ui/Button/Button";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animated title reveal
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
          duration: 1.2,
          ease: "power3.out",
        },
      )
        .fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            y: progress * -100,
            opacity: 1 - progress * 0.5,
            duration: 0.3,
          });
        },
      });
    },
    { scope: containerRef },
  );

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-blueprint-grid bg-[length:50px_50px] opacity-10" />

      {/* Electric Circuit Animation */}
      <div className="absolute inset-0 z-10">
        <Blueprint3D />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <h1
            ref={titleRef}
            className={cn(
              "text-6xl md:text-8xl lg:text-9xl font-display font-bold",
              "bg-gradient-to-r from-blueprint-300 via-electric-blue to-blueprint-500",
              "bg-clip-text text-transparent",
              "drop-shadow-2xl",
              "transform-gpu",
            )}
            style={{
              textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
          >
            Samuel
            <span className="block text-5xl md:text-7xl lg:text-8xl text-electric-cyan">
              Oyenuga
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl font-mono text-blueprint-200 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="text-electric-blue">Frontend Engineer</span> ×{" "}
            <span className="text-electric-cyan">Communications Engineer</span>{" "}
            × <span className="text-electric-green">Embedded Systems</span>
            <br />
            <span className="text-lg text-blueprint-300 mt-4 block">
              Crafting innovative solutions at the intersection of web,
              hardware, and intelligent systems
            </span>
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              onClick={scrollToProjects}
              variant="primary"
              size="lg"
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="border-blueprint-400 text-blueprint-300 hover:bg-blueprint-400/10"
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blueprint-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-electric-blue rounded-full mt-2 animate-pulse" />
          </div>
          <span className="text-xs text-blueprint-300 font-mono">SCROLL</span>
        </div>
      </div>

      {/* Hero Animations Component */}
      <HeroAnimations />
    </div>
  );
};
