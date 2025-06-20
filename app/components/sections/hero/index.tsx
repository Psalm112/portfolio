"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParticleField from "@/app/components/animations/ParticleField";
import TypewriterText from "@/app/components/ui/TypewriterText";
import ScrollIndicator from "@/app/components/ui/ScrollIndicator";
import dynamic from "next/dynamic";

const CircuitBrainAnimation = dynamic(
  () =>
    import("@/app/components/animations/circuitBrain/CircuitBrainAnimation"),
  { ssr: false }
);
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center space-y-8"
      style={{ y, opacity, scale }}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <ParticleField />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.div className="space-y-4">
              <motion.h1
                className="font-tech text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <span className="block text-blueprint-primary glow-text">
                  MULTI-DISCIPLINARY
                </span>
                <span className="block text-blueprint-text">ENGINEER</span>
              </motion.h1>

              <motion.div
                className="text-xl sm:text-2xl lg:text-3xl text-blueprint-muted font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <TypewriterText
                  texts={[
                    "Frontend Development Expert",
                    "Communications Systems Engineer",
                    "Embedded Systems Specialist",
                    "Full-Stack Problem Solver",
                  ]}
                  speed={50}
                  deleteSpeed={30}
                  delayBetweenTexts={2000}
                />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="max-w-3xl mx-auto text-lg sm:text-xl text-blueprint-text/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Bridging the gap between software and hardware, creating
              innovative solutions that span from responsive web applications to
              embedded robotics systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <motion.button
                className="group px-8 py-4 bg-blueprint-primary text-blueprint-bg font-semibold rounded-lg
                       hover:bg-blueprint-secondary transition-all duration-300 blueprint-border
                       hover:shadow-lg hover:shadow-blueprint-primary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.button>

              <motion.button
                className="group px-8 py-4 border-2 border-blueprint-primary text-blueprint-primary font-semibold rounded-lg
                       hover:bg-blueprint-primary hover:text-blueprint-bg transition-all duration-300
                       hover:shadow-lg hover:shadow-blueprint-primary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div
              className="pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.1 }}
            >
              <p className="text-sm text-blueprint-muted mb-4 font-mono">
                CORE TECHNOLOGIES
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Go",
                  "Python",
                  "C/C++",
                  "ARM",
                  "FPGA",
                  "RF Design",
                  "IoT",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 border border-blueprint-lines rounded-md text-blueprint-text/70
                           hover:border-blueprint-primary hover:text-blueprint-primary transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        <CircuitBrainAnimation />
      </div>

      {/* Scroll Indicator */}

      <ScrollIndicator />
    </motion.section>
  );
};

export default Hero;
