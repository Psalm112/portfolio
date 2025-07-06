import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences, education } from "./data/experiences";
import { EducationCard, ExperienceCard } from "./components";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      role="main"
      aria-labelledby="experience-heading"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-32 left-10 w-80 h-80 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-16 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
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
            Professional Journey
          </motion.span>

          <motion.h2
            id="experience-heading"
            className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              Experience &
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
              Innovation
            </span>
          </motion.h2>

          <motion.p
            className="font-inter text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            5+ years of transforming ideas into reality through cutting-edge
            frontend engineering, embedded systems innovation, and full-stack
            development excellence.
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 via-cyan-500/30 to-gray-700" />

          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block font-jetbrains text-purple-400 text-sm sm:text-base tracking-widest uppercase mb-4">
              Academic Foundation
            </span>
            <h3 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Engineering Excellence
            </h3>
            <p className="font-inter text-gray-400 max-w-2xl mx-auto">
              Strong academic foundation in Information and Communication
              Technology with focus on emerging technologies and innovation.
            </p>
          </motion.div>

          <EducationCard education={education} index={0} />
        </motion.div>

        {/* Key Projects Highlight */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block font-jetbrains text-green-400 text-sm sm:text-base tracking-widest uppercase mb-4">
              Innovation Showcase
            </span>
            <h3 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Breakthrough Projects
            </h3>
            <p className="font-inter text-gray-400 max-w-2xl mx-auto">
              Pioneering solutions at the intersection of AI, blockchain, and
              embedded systems engineering.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coffee Delivery Bot */}
            <motion.article
              className="relative bg-gradient-to-br from-orange-900/20 via-red-800/20 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:border-orange-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              role="article"
              aria-labelledby="coffee-bot-title"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div>
                    <h4
                      id="coffee-bot-title"
                      className="font-orbitron text-xl font-bold text-white"
                    >
                      Autonomous Coffee Delivery Bot
                    </h4>
                    <span className="font-jetbrains text-sm text-orange-400 uppercase tracking-wide">
                      Embedded Systems • AI Navigation
                    </span>
                  </div>
                </div>

                <p className="font-inter text-gray-300 text-sm mb-4 leading-relaxed">
                  Developed an intelligent autonomous robot with advanced
                  navigation capabilities, human-following algorithms, and
                  real-time obstacle avoidance using Arduino and sensor arrays.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Human-following algorithm with computer vision",
                    "Multi-sensor obstacle avoidance system",
                    "Autonomous line tracking and pathfinding",
                    "Mobile app remote control integration",
                    "Real-time navigation and autopilot modes",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="font-inter leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Arduino",
                    "Computer Vision",
                    "Sensor Networks",
                    "Mobile App",
                    "AI Navigation",
                  ].map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Warehouse Management System */}
            <motion.article
              className="relative bg-gradient-to-br from-blue-900/20 via-indigo-800/20 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:border-blue-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              role="article"
              aria-labelledby="warehouse-title"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div>
                    <h4
                      id="warehouse-title"
                      className="font-orbitron text-xl font-bold text-white"
                    >
                      AI-Powered Warehouse System
                    </h4>
                    <span className="font-jetbrains text-sm text-blue-400 uppercase tracking-wide">
                      Graph Neural Networks • IoT
                    </span>
                  </div>
                </div>

                <p className="font-inter text-gray-300 text-sm mb-4 leading-relaxed">
                  Revolutionary warehouse management system combining Graph
                  Neural Networks with embedded systems for intelligent
                  inventory optimization and pathfinding.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "GNN-based dynamic path optimization",
                    "Real-time inventory tracking with IoT sensors",
                    "Dijkstra's algorithm for route planning",
                    "Arduino-based hardware integration",
                    "Machine learning for predictive analytics",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="font-inter leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Graph Neural Networks",
                    "Arduino",
                    "IoT Sensors",
                    "Machine Learning",
                    "Dijkstra's Algorithm",
                  ].map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Blockchain IoT Framework */}
            <motion.article
              className="relative bg-gradient-to-br from-green-900/20 via-emerald-800/20 to-teal-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:border-green-400/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              role="article"
              aria-labelledby="blockchain-title"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl">
                    🔗
                  </div>
                  <div>
                    <h4
                      id="blockchain-title"
                      className="font-orbitron text-xl font-bold text-white"
                    >
                      Blockchain IoT Framework
                    </h4>
                    <span className="font-jetbrains text-sm text-green-400 uppercase tracking-wide">
                      Final Year Project • Research
                    </span>
                  </div>
                </div>

                <p className="font-inter text-gray-300 text-sm mb-4 leading-relaxed">
                  Groundbreaking blockchain framework for secure and scalable
                  IoT networks achieving 2,500 TPS with 95% energy reduction and
                  99.7% uptime during attacks.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "ZK-Rollups for Layer 2 scaling solutions",
                    "Edge computing integration for efficiency",
                    "Verkle Trees for enhanced privacy",
                    "Smart contracts for IoT authentication",
                    "Cross-protocol middleware compatibility",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="font-inter leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Blockchain",
                    "ZK-Rollups",
                    "Edge Computing",
                    "Smart Contracts",
                    "IoT Security",
                  ].map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-green-400/50 hover:text-green-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "5+",
                label: "Years Experience",
                icon: "⚡",
                color: "from-cyan-400 to-blue-500",
              },
              {
                value: "20+",
                label: "Projects Delivered",
                icon: "🚀",
                color: "from-purple-400 to-pink-500",
              },
              {
                value: "100%",
                label: "Client Satisfaction",
                icon: "⭐",
                color: "from-green-400 to-emerald-500",
              },
              {
                value: "15+",
                label: "Technologies",
                icon: "🛠️",
                color: "from-orange-400 to-red-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div
                  className={`font-orbitron text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="font-inter text-sm text-gray-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h3
            className="font-orbitron text-2xl lg:text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Ready to Build the Future?
          </motion.h3>

          <motion.p
            className="font-inter text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Let&apos;s collaborate on your next groundbreaking project. From
            cutting-edge web applications to innovative embedded systems, I
            bring the expertise to turn your vision into reality.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-lg font-orbitron font-semibold text-white shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              aria-label="Get in touch to discuss your project"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Let&apos;s Connect</span>
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

            <motion.button
              className="group px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-cyan-400 rounded-lg font-orbitron font-semibold text-gray-300 hover:text-cyan-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              aria-label="Download resume PDF"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Download Resume</span>
                <svg
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
