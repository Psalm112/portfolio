import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  type: "Current" | "Contract" | "Freelance" | "Full-time";
  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
    icon: string;
  }[];
  color: string;
  gradient: string;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  cgpa: string;
  achievements: string[];
  relevantCourses: string[];
  color: string;
}

// Animated Timeline Component
const TimelineConnector = ({
  isActive,
  delay = 0,
}: {
  isActive: boolean;
  delay?: number;
}) => {
  return (
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 to-gray-800">
      <motion.div
        className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 origin-top"
        initial={{ scaleY: 0 }}
        animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  );
};

// Experience Card Component
const ExperienceCard = ({
  experience,
  index,
  isLast = false,
}: {
  experience: ExperienceItem;
  index: number;
  isLast?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Current":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "Contract":
        return "bg-gradient-to-r from-blue-500 to-cyan-600";
      case "Freelance":
        return "bg-gradient-to-r from-purple-500 to-pink-600";
      case "Full-time":
        return "bg-gradient-to-r from-orange-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Current":
        return "🚀";
      case "Contract":
        return "💼";
      case "Freelance":
        return "🎯";
      case "Full-time":
        return "🏢";
      default:
        return "⚡";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative pl-20 pb-16 group"
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Timeline Node */}
      <motion.div
        className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-gray-900 ${experience.color} shadow-lg z-10`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        whileHover={{ scale: 1.2 }}
      />

      {/* Timeline Connector */}
      {!isLast && (
        <TimelineConnector isActive={isInView} delay={index * 0.1 + 0.4} />
      )}

      {/* Experience Card */}
      <motion.article
        className={`relative bg-gradient-to-br ${experience.gradient} backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-white/20`}
        whileHover={{ scale: 1.02, y: -4 }}
        role="article"
        aria-labelledby={`experience-${experience.id}-title`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <motion.span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-jetbrains font-bold text-white uppercase tracking-wider ${getTypeColor(
                    experience.type
                  )}`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <span className="mr-1.5">{getTypeIcon(experience.type)}</span>
                  {experience.type}
                </motion.span>
              </div>

              <h3
                id={`experience-${experience.id}-title`}
                className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-1"
              >
                {experience.position}
              </h3>

              <p className="font-inter text-lg text-cyan-400 font-semibold mb-2">
                {experience.company}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-jetbrains">{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-jetbrains">{experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="font-inter text-gray-300 text-sm lg:text-base leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* Achievements */}
        <div className="relative z-10 mb-6">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Key Achievements
          </h4>
          <div className="space-y-3">
            {experience.achievements
              .slice(0, isExpanded ? undefined : 3)
              .map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="font-inter leading-relaxed">
                    {achievement}
                  </span>
                </motion.div>
              ))}
          </div>

          {experience.achievements.length > 3 && (
            <motion.button
              className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-jetbrains uppercase tracking-wider font-medium transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded
                ? "Show Less"
                : `+${experience.achievements.length - 3} More Achievements`}
            </motion.button>
          )}
        </div>

        {/* Metrics */}
        {experience.metrics && (
          <div className="relative z-10 mb-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {experience.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xl mb-2">{metric.icon}</div>
                  <div className="font-orbitron text-lg font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="font-inter text-xs text-gray-400">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="relative z-10">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

// Education Card Component
const EducationCard = ({
  education,
  index,
}: {
  education: EducationItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      <motion.article
        className={`relative bg-gradient-to-br from-indigo-900/20 via-purple-800/20 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:border-white/20`}
        whileHover={{ scale: 1.02, y: -4 }}
        role="article"
        aria-labelledby={`education-${education.id}-title`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h3
                id={`education-${education.id}-title`}
                className="font-orbitron text-xl lg:text-2xl font-bold text-white"
              >
                {education.degree}
              </h3>
              <p className="font-inter text-cyan-400 font-semibold">
                {education.field}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-inter text-lg text-purple-300 font-semibold mb-2">
              {education.institution}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-jetbrains">{education.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-jetbrains">{education.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-jetbrains">CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="relative z-10 mb-6">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Academic Achievements
          </h4>
          <div className="space-y-2">
            {education.achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="font-inter leading-relaxed">
                  {achievement}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Relevant Courses */}
        <div className="relative z-10">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Relevant Coursework
          </h4>
          <div className="flex flex-wrap gap-2">
            {education.relevantCourses.map((course, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-purple-400/50 hover:text-purple-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

// Main Experience Component
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const experiences: ExperienceItem[] = [
    {
      id: "dezenmart-founding",
      company: "Dezenmart",
      position: "Founding Frontend Engineer",
      period: "May 2025 – Present",
      location: "Nigeria",
      type: "Current",
      description:
        "Leading the development of a revolutionary decentralized e-commerce platform that bridges traditional commerce with blockchain technology. Spearheading the frontend architecture for secure crypto transactions and seamless user experiences.",
      achievements: [
        "Built comprehensive wallet connection system supporting multiple blockchain networks",
        "Implemented smart contract-based escrow system reducing transaction disputes by 95%",
        "Developed real-time buyer-seller chat functionality with end-to-end encryption",
        "Created responsive frontend handling 10K+ concurrent users with sub-200ms load times",
        "Optimized smart contract interactions reducing gas fees by 40%",
        "Established CI/CD pipeline improving deployment frequency by 300%",
        "Mentored junior developers on Web3 integration best practices",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Web3.js",
        "Solidity",
        "Tailwind CSS",
        "Framer Motion",
        "Socket.io",
        "IPFS",
        "MetaMask",
        "WalletConnect",
      ],
      metrics: [
        { label: "User Growth", value: "2.5K+", icon: "👥" },
        { label: "Transaction Success", value: "99.8%", icon: "✅" },
        { label: "Gas Optimization", value: "40%", icon: "⛽" },
      ],
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      gradient: "from-green-900/20 via-emerald-800/20 to-teal-900/20",
    },
    {
      id: "komas500-contract",
      company: "Komas500",
      position: "Frontend Engineer",
      period: "Dec 2024 – Present",
      location: "Nigeria",
      type: "Contract",
      description:
        "Contracted to optimize API integration patterns and enhance frontend performance for a fast-growing fintech startup. Focus on modern state management and efficient data fetching strategies.",
      achievements: [
        "Redesigned API integration architecture improving response times by 60%",
        "Implemented efficient state management solutions reducing memory usage by 35%",
        "Developed reusable component library increasing development velocity by 50%",
        "Optimized frontend performance achieving 95+ Lighthouse scores across all metrics",
        "Established frontend monitoring and analytics improving debugging efficiency by 75%",
        "Collaborated with backend team to optimize GraphQL query performance",
      ],
      technologies: [
        "React",
        "TypeScript",
        "GraphQL",
        "Apollo Client",
        "Zustand",
        "React Query",
        "Tailwind CSS",
        "Vite",
        "ESLint",
        "Prettier",
      ],
      metrics: [
        { label: "Performance Gain", value: "60%", icon: "🚀" },
        { label: "Lighthouse Score", value: "95+", icon: "📊" },
        { label: "Dev Velocity", value: "50%", icon: "⚡" },
      ],
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      gradient: "from-blue-900/20 via-cyan-800/20 to-indigo-900/20",
    },
    {
      id: "freelance-engineer",
      company: "Independent Contractor",
      position: "Freelance Frontend Engineer",
      period: "Sep 2020 – Dec 2024",
      location: "Remote",
      type: "Freelance",
      description:
        "Delivered high-quality web applications across healthcare, real estate, and education sectors. Specialized in creating performant, accessible, and user-centric solutions for diverse client needs.",
      achievements: [
        "Developed biomedical researcher CMS increasing content update efficiency by 50%",
        "Built React-based telehealth platform serving 5K+ healthcare professionals",
        "Created cross-platform attendance system reducing administrative workload by 25%",
        "Implemented phishing awareness training platform with 89% completion rate",
        "Delivered 15+ projects on time and within budget maintaining 100% client satisfaction",
        "Established long-term partnerships with 8 clients leading to recurring contracts",
        "Mentored 5 junior developers through code reviews and pair programming sessions",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Firebase",
        "Tailwind CSS",
        "Chakra UI",
        "Framer Motion",
        "Chart.js",
        "WebRTC",
      ],
      metrics: [
        { label: "Projects Delivered", value: "15+", icon: "🎯" },
        { label: "Client Satisfaction", value: "100%", icon: "⭐" },
        { label: "User Engagement", value: "40%", icon: "📈" },
      ],
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      gradient: "from-purple-900/20 via-pink-800/20 to-rose-900/20",
    },
    {
      id: "prunedge-contract",
      company: "Prunedge Development Technologies",
      position: "Software Developer",
      period: "Sep 2023 – Jan 2024",
      location: "Lagos, Nigeria",
      type: "Contract",
      description:
        "Contracted to develop enterprise-grade applications for major clients including Keystone Bank. Focused on performance optimization and seamless backend integration.",
      achievements: [
        "Optimized Keystone Bank HRMS components improving load speeds by 15%",
        "Developed responsive HomePulse real estate platform with advanced filtering",
        "Implemented mortgage calculator with real-time computation capabilities",
        "Enhanced user engagement through intuitive UI/UX design principles",
        "Collaborated with cross-functional teams on REST API integration",
        "Delivered pixel-perfect implementations from Figma designs",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "REST APIs",
        "SCSS",
        "Material-UI",
        "Redux Toolkit",
        "Axios",
        "React Hook Form",
        "React Router",
      ],
      metrics: [
        { label: "Load Speed Improvement", value: "15%", icon: "⚡" },
        { label: "Code Quality Score", value: "A+", icon: "🏆" },
        { label: "Client Retention", value: "100%", icon: "🤝" },
      ],
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      gradient: "from-orange-900/20 via-red-800/20 to-pink-900/20",
    },
  ];

  const education: EducationItem = {
    id: "futa-engineering",
    institution: "Federal University of Technology Akure",
    degree: "Bachelor of Engineering",
    field: "Information and Communication Technology",
    period: "2019 – 2024",
    location: "Akure, Nigeria",
    cgpa: "4.27/5.00",
    achievements: [
      "Graduated with First Class Honors (CGPA: 4.27/5.00)",
      "Led multiple award-winning final year projects in AI and Blockchain",
      "Published research on blockchain-based IoT security frameworks",
      "Developed warehouse management system using Graph Neural Networks",
      "Created autonomous coffee delivery robot with advanced navigation",
      "Presented research at international conferences on emerging technologies",
      "Mentored junior students in embedded systems and software development",
    ],
    relevantCourses: [
      "Embedded Systems Design",
      "Microprocessor Systems",
      "Digital Signal Processing",
      "Computer Networks",
      "Software Engineering",
      "Database Systems",
      "Artificial Intelligence",
      "Machine Learning",
      "Blockchain Technology",
      "IoT Systems",
      "Computer Vision",
      "Control Systems",
    ],
    color: "bg-gradient-to-r from-indigo-500 to-purple-600",
  };

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-gray-800 overflow-hidden"
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
            Let's collaborate on your next groundbreaking project. From
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
                <span>Let's Connect</span>
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
