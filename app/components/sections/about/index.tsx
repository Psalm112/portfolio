import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// skill bar component
const SkillBar = ({
  skill,
  percentage,
  delay = 0,
}: {
  skill: string;
  percentage: number;
  delay?: number;
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && barRef.current) {
      gsap.to(barRef.current.querySelector(".skill-fill"), {
        width: `${percentage}%`,
        duration: 1.5,
        delay: delay,
        ease: "power2.out",
      });
    }
  }, [isInView, percentage, delay]);

  return (
    <motion.div
      ref={barRef}
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex justify-between items-center">
        <span className="font-jetbrains text-sm font-medium text-gray-300">
          {skill}
        </span>
        <span className="font-orbitron text-xs text-cyan-400 font-bold">
          {percentage}%
        </span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="skill-fill h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full w-0"
          style={{ width: 0 }}
        />
      </div>
    </motion.div>
  );
};

// const CircuitPattern = () => (
//   <div className="absolute inset-0 opacity-5 pointer-events-none">
//     <svg width="100%" height="100%" className="animate-pulse">
//       <defs>
//         <pattern
//           id="circuit"
//           patternUnits="userSpaceOnUse"
//           width="100"
//           height="100"
//         >
//           <path
//             d="M10,10 L90,10 L90,90 L10,90 Z"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1"
//           />
//           <circle cx="10" cy="10" r="2" fill="currentColor" />
//           <circle cx="90" cy="90" r="2" fill="currentColor" />
//         </pattern>
//       </defs>
//       <rect width="100%" height="100%" fill="url(#circuit)" />
//     </svg>
//   </div>
// );
// Animated counter component
const AnimatedCounter = ({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView && counterRef.current) {
      gsap.to(counterRef.current, {
        textContent: end,
        duration,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent =
              Math.ceil(this.targets()[0].textContent) + suffix;
          }
        },
      });
    }
  }, [isInView, end, suffix, duration]);

  return <span ref={counterRef}>0{suffix}</span>;
};

// Floating tech elements
const FloatingTechElement = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{
      delay,
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 3 + Math.random() * 2,
    }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const expertise = [
    { skill: "React.js / Next.js", percentage: 95 },
    { skill: "TypeScript / JavaScript", percentage: 92 },
    { skill: "Embedded Systems (Arduino/IoT)", percentage: 88 },
    { skill: "Blockchain Development", percentage: 85 },
    { skill: "Machine Learning (GNN/ANN)", percentage: 82 },
    { skill: "Hardware-Software Integration", percentage: 90 },
  ];

  const achievements = [
    {
      number: 5,
      suffix: "+",
      label: "Years Experience",
      description: "Frontend Development",
    },
    {
      number: 2500,
      suffix: "",
      label: "TPS Achieved",
      description: "Blockchain IoT Network",
    },
    {
      number: 15,
      suffix: "+",
      label: "Projects Delivered",
      description: "Full-Stack Solutions",
    },
    {
      number: 95,
      suffix: "%",
      label: "Energy Reduction",
      description: "IoT Optimization",
    },
  ];

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
                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-jetbrains text-cyan-400 font-semibold text-sm uppercase tracking-wide">
                      Blockchain IoT Framework
                    </h4>
                    <p className="font-inter text-gray-300 text-sm leading-relaxed">
                      Developed a secure, scalable architecture using ZK-Rollups
                      and Verkle Trees, achieving 99.7% uptime during DDoS
                      attacks
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-jetbrains text-purple-400 font-semibold text-sm uppercase tracking-wide">
                      AI-Powered Warehouse System
                    </h4>
                    <p className="font-inter text-gray-300 text-sm leading-relaxed">
                      Built GNN-optimized inventory management reducing worker
                      travel time and handling risk for fragile items
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-jetbrains text-green-400 font-semibold text-sm uppercase tracking-wide">
                      Autonomous Service Robot
                    </h4>
                    <p className="font-inter text-gray-300 text-sm leading-relaxed">
                      Created multi-functional coffee delivery bot with human
                      following, obstacle avoidance, and mobile app control
                    </p>
                  </div>
                </motion.div>
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
                <motion.div
                  key={achievement.label}
                  className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-gray-700/40 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-orbitron text-2xl lg:text-3xl font-bold text-cyan-400 mb-2">
                    <AnimatedCounter
                      end={achievement.number}
                      suffix={achievement.suffix}
                      duration={2 + index * 0.2}
                    />
                  </div>
                  <div className="font-jetbrains text-xs lg:text-sm font-semibold text-white uppercase tracking-wide mb-1">
                    {achievement.label}
                  </div>
                  <div className="font-inter text-xs text-gray-400">
                    {achievement.description}
                  </div>
                </motion.div>
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
              <span className="relative z-10 flex items-center justify-center space-x-2">
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
              </span>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-gray-600 hover:border-cyan-400 rounded-lg font-orbitron font-semibold text-gray-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Get in touch for collaboration opportunities"
            >
              <span className="flex items-center justify-center space-x-2">
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
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* <CircuitPattern /> */}
    </section>
  );
}
