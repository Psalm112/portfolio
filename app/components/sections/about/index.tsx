import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SkillBar,
  // AnimatedCounter,
  FloatingTechElement,
  FeaturedProjectCard,
  AchievementCard,
} from "./components";
import { expertise, achievements, featuredProjects } from "./data/about";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden"
      role="main"
      aria-labelledby="about-heading"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-lg" />

        {/* Floating tech icons */}
        <FloatingTechElement className="top-16 right-1/4 text-2xl" delay={0.5}>
          ⚛️
        </FloatingTechElement>
        <FloatingTechElement className="bottom-20 left-1/4 text-xl" delay={1.2}>
          🔗
        </FloatingTechElement>
        <FloatingTechElement className="top-1/3 right-12 text-2xl" delay={2.1}>
          🤖
        </FloatingTechElement>
        <FloatingTechElement className="bottom-1/3 left-16 text-xl" delay={1.8}>
          📡
        </FloatingTechElement>
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
            Get to know me
          </motion.span>

          <motion.h2
            id="about-heading"
            className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              Bridging Digital
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
              & Physical Worlds
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column - Story & Philosophy */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Story */}
            <div className="space-y-6">
              <motion.p
                className="font-inter text-lg lg:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                As a{" "}
                <span className="text-cyan-400 font-semibold">
                  Frontend Engineer
                </span>{" "}
                and{" "}
                <span className="text-purple-400 font-semibold">
                  ICT graduate
                </span>{" "}
                with 5+ years of experience, I specialize in creating seamless
                digital experiences while architecting intelligent embedded
                systems that power the next generation of connected
                technologies.
              </motion.p>

              <motion.p
                className="font-inter text-base lg:text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                My journey spans from building{" "}
                <span className="text-green-400 font-medium">
                  high-performance React applications
                </span>
                for startups to developing{" "}
                <span className="text-cyan-400 font-medium">
                  blockchain-secured IoT networks
                </span>{" "}
                that achieved 2,500 TPS with 95% energy efficiency improvement.
                I&apos;ve created everything from autonomous coffee delivery
                robots to warehouse management systems powered by Graph Neural
                Networks.
              </motion.p>

              <motion.p
                className="font-inter text-base lg:text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                What sets me apart is my ability to bridge the gap between
                intuitive user interfaces and complex backend systems, whether
                it&apos;s integrating machine learning algorithms into web
                applications or designing hardware-software architectures that
                scale from prototype to production.
              </motion.p>
            </div>

            {/* Key Projects Highlight */}
            <motion.div
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-gray-700/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-6">
                Featured Innovations
              </h3>
              <div className="space-y-4">
                {featuredProjects.map((project) => (
                  <FeaturedProjectCard
                    key={project.title}
                    color={project.color}
                    title={project.title}
                    description={project.description}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills & Achievements */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Technical Expertise */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-gray-700/30">
              <motion.h3
                className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Technical Expertise
              </motion.h3>
              <div className="space-y-6">
                {expertise.map((item, index) => (
                  <SkillBar
                    key={item.skill}
                    skill={item.skill}
                    percentage={item.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.label}
                  number={achievement.number}
                  suffix={achievement.suffix}
                  label={achievement.label}
                  description={achievement.description}
                  duration={2 + index * 0.2}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>

            {/* Philosophy */}
            <motion.div
              className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-green-500/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-cyan-400/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💡</span>
                </div>
                <h3 className="font-orbitron text-lg lg:text-xl font-bold text-white">
                  My Philosophy
                </h3>
              </div>
              <blockquote className="font-inter text-base lg:text-lg text-gray-300 leading-relaxed italic">
                &quot;The future belongs to systems that seamlessly integrate
                the digital and physical worlds. Every line of code I write and
                every circuit I design is a step toward making technology more
                intelligent, accessible, and human-centered.&quot;
              </blockquote>
            </motion.div>
          </motion.div>
        </div>

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
            Ready to bring your next innovative project to life? Let&apos;s
            build something extraordinary together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-orbitron font-semibold text-white shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="View my technical projects and case studies"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <a
                className="relative z-10 flex items-center justify-center space-x-2"
                href="#projects"
              >
                <span>View My Projects</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-gray-600 hover:border-cyan-400 rounded-lg font-orbitron font-semibold text-gray-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Get in touch for collaboration opportunities"
            >
              <a
                className="flex items-center justify-center space-x-2"
                href="#contact"
              >
                <span>Let&apos;s Connect</span>
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
