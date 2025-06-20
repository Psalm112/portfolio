"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TechnicalDrawing from "@/app/components/animations/TechnicalDrawing";
import SkillBars from "@/app/components/ui/SkillBars";
import StatsCounter from "@/app/components/ui/StatsCounter";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="font-tech text-4xl sm:text-5xl font-bold text-blueprint-primary glow-text mb-4">
                ABOUT_ME.exe
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blueprint-primary to-blueprint-secondary mb-8" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-lg text-blueprint-text/90 leading-relaxed"
            >
              <p>
                I'm a{" "}
                <span className="text-blueprint-primary font-semibold">
                  multi-disciplinary engineer
                </span>{" "}
                with expertise spanning frontend development, communications
                systems, and embedded engineering. My passion lies in bridging
                the gap between software and hardware, creating innovative
                solutions that seamlessly integrate digital interfaces with
                physical systems.
              </p>

              <p>
                With a strong foundation in{" "}
                <span className="text-blueprint-secondary font-semibold">
                  modern web technologies
                </span>
                and deep knowledge of{" "}
                <span className="text-blueprint-accent font-semibold">
                  signal processing and embedded systems
                </span>
                , I bring a unique perspective to every project. Whether it's
                crafting responsive user experiences or designing robust
                communication protocols, I thrive on solving complex technical
                challenges.
              </p>

              <p>
                My approach combines{" "}
                <span className="text-blueprint-primary font-semibold">
                  cutting-edge development practices
                </span>
                with{" "}
                <span className="text-blueprint-secondary font-semibold">
                  engineering fundamentals
                </span>
                , ensuring solutions that are not only innovative but also
                reliable, scalable, and maintainable.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
              <StatsCounter />
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="font-tech text-xl text-blueprint-primary mb-6">
                CORE_COMPETENCIES
              </h3>
              <SkillBars />
            </motion.div>
          </div>

          {/* Right Column - Technical Drawing */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center"
          >
            <TechnicalDrawing />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
