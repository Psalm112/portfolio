"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
// import NeuralParticles from "@/app/components/animations/circuitBrain/NeuralParticles";
import TypewriterText from "@/app/components/ui/TypewriterText";
import ScrollIndicator from "@/app/components/ui/ScrollIndicator";
import dynamic from "next/dynamic";

// Dynamically import the CircuitBrainAnimation for better performance
const CircuitBrainAnimation = dynamic(
  () =>
    import("@/app/components/animations/circuitBrain/CircuitBrainAnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 border-2 border-blueprint-primary/30 rounded-full animate-spin border-t-blueprint-primary" />
          <div className="absolute inset-4 border border-blueprint-secondary/20 rounded-full animate-pulse" />
        </div>
      </div>
    ),
  }
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const brainScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const brainOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle 3D scene loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ y, opacity, scale }}
      role="banner"
      aria-label="Hero section with 3D brain animation"
    >
      {/* Background Effects Layer */}
      <div className="absolute inset-0 z-0">
        {/* <ParticleField /> */}

        {/* Enhanced grid overlay for depth */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(100, 181, 246, 0.4) 1px, transparent 0),
                linear-gradient(rgba(100, 181, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 181, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px, 50px 50px, 50px 50px",
            }}
          />
        </div>
      </div>

      {/* 3D Circuit Brain Animation */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          scale: prefersReducedMotion ? 1 : brainScale,
          opacity: prefersReducedMotion ? 0.5 : brainOpacity,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 2,
          delay: prefersReducedMotion ? 0 : 1.5,
          ease: "easeOut",
        }}
      >
        {/* <CircuitBrainAnimation /> */}
        {/* {!prefersReducedMotion && <CircuitBrainAnimation />}

        {/* Fallback for reduced motion */}
        {/* {prefersReducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-64 h-64 border-2 border-blueprint-primary/30 rounded-full" />
              <div className="absolute inset-4 border border-blueprint-secondary/20 rounded-full" />
              <div className="absolute inset-8 border border-blueprint-accent/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blueprint-primary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}  */}
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.1 : 1,
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
          className="space-y-8"
        >
          {/* Main Title */}
          <motion.div className="space-y-4">
            <motion.h1
              className="font-tech text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.1 : 1,
                delay: prefersReducedMotion ? 0 : 0.8,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <span className="block text-blueprint-primary glow-text">
                MULTI-DISCIPLINARY
              </span>
              <span className="block text-blueprint-text">ENGINEER</span>
            </motion.h1>

            <motion.div
              className="text-xl sm:text-2xl lg:text-3xl text-blueprint-muted font-mono min-h-[2em] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.1 : 1,
                delay: prefersReducedMotion ? 0 : 1.2,
              }}
            >
              <TypewriterText
                texts={[
                  "Frontend Development Expert",
                  "Communications Systems Engineer",
                  "Embedded Systems Specialist",
                  "Full-Stack Problem Solver",
                  "AI/ML Integration Specialist",
                  "IoT Solutions Architect",
                ]}
                speed={prefersReducedMotion ? 1 : 50}
                deleteSpeed={prefersReducedMotion ? 1 : 30}
                delayBetweenTexts={prefersReducedMotion ? 100 : 2000}
                // disabled={prefersReducedMotion}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 1,
              delay: prefersReducedMotion ? 0 : 1.5,
            }}
          >
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-blueprint-text/80 leading-relaxed">
              Bridging the gap between software and hardware, creating
              innovative solutions that span from responsive web applications to
              embedded robotics systems.
            </p>

            <p className="max-w-2xl mx-auto text-base text-blueprint-muted/70 leading-relaxed font-mono">
              Where circuits meet code, and algorithms meet reality.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 1,
              delay: prefersReducedMotion ? 0 : 1.8,
            }}
          >
            <motion.button
              className="group px-8 py-4 bg-blueprint-primary text-blueprint-bg font-semibold rounded-lg
                       hover:bg-blueprint-secondary transition-all duration-300 blueprint-border
                       hover:shadow-lg hover:shadow-blueprint-primary/25 focus:outline-none 
                       focus:ring-2 focus:ring-blueprint-primary focus:ring-offset-2 
                       focus:ring-offset-blueprint-bg"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="View my work and projects"
            >
              <span className="flex items-center gap-2">
                View My Work
                <motion.div
                  animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                >
                  →
                </motion.div>
              </span>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-blueprint-primary text-blueprint-primary font-semibold rounded-lg
                       hover:bg-blueprint-primary hover:text-blueprint-bg transition-all duration-300
                       hover:shadow-lg hover:shadow-blueprint-primary/25 focus:outline-none 
                       focus:ring-2 focus:ring-blueprint-primary focus:ring-offset-2 
                       focus:ring-offset-blueprint-bg"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Get in touch with me"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Enhanced Tech Stack Preview */}
          <motion.div
            className="pt-12 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 1,
              delay: prefersReducedMotion ? 0 : 2.1,
            }}
          >
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-blueprint-muted mb-2 font-mono tracking-wider">
                CORE TECHNOLOGIES
              </p>

              {/* Tech categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {[
                  {
                    category: "Frontend",
                    techs: ["React", "Next.js", "TypeScript", "Three.js"],
                    color: "blueprint-primary",
                  },
                  {
                    category: "Backend",
                    techs: ["Go", "Python", "Node.js", "GraphQL"],
                    color: "blueprint-secondary",
                  },
                  {
                    category: "Hardware",
                    techs: ["C/C++", "ARM", "FPGA", "RF Design"],
                    color: "blueprint-accent",
                  },
                ].map((group, groupIndex) => (
                  <motion.div
                    key={group.category}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.1 : 0.5,
                      delay: prefersReducedMotion ? 0 : 2.3 + groupIndex * 0.1,
                    }}
                  >
                    <h3
                      className={`text-xs font-mono text-${group.color} tracking-wider`}
                    >
                      {group.category.toUpperCase()}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {group.techs.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className={`px-3 py-1 border border-blueprint-lines rounded-md text-blueprint-text/70
                                   hover:border-${group.color} hover:text-${group.color} transition-colors
                                   text-sm font-mono cursor-default`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: prefersReducedMotion ? 0.1 : 0.5,
                            delay: prefersReducedMotion
                              ? 0
                              : 2.5 + groupIndex * 0.1 + index * 0.05,
                          }}
                          whileHover={
                            prefersReducedMotion ? {} : { scale: 1.05 }
                          }
                          tabIndex={0}
                          role="button"
                          aria-label={`${tech} technology`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Performance metrics indicator */}
          <motion.div
            className="pt-8 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 1,
              delay: prefersReducedMotion ? 0 : 3,
            }}
          >
            <div className="flex items-center justify-center space-x-4 text-xs font-mono text-blueprint-muted">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>3D Rendering Active</span>
              </span>
              <span className="text-blueprint-lines">|</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Neural Network Simulation</span>
              </span>
              <span className="text-blueprint-lines">|</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>Performance Optimized</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 1,
          delay: prefersReducedMotion ? 0 : 2.5,
        }}
      >
        <ScrollIndicator />
      </motion.div>

      {/* Loading state for 3D scene */}
      {!isLoaded && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center bg-blueprint-bg/50 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          style={{ pointerEvents: "none" }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-2 border-blueprint-primary/30 rounded-full animate-spin border-t-blueprint-primary" />
            <p className="text-sm text-blueprint-muted font-mono">
              Initializing Neural Network...
            </p>
          </div>
        </motion.div>
      )}

      {/* Skip to main content for screen readers */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                   focus:px-4 focus:py-2 focus:bg-blueprint-primary focus:text-blueprint-bg 
                   focus:rounded-md focus:font-medium"
      >
        Skip to main content
      </a>
    </motion.section>
  );
};

export default Hero;
