import { Skill } from "@/types";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiSolidity,
  SiEthereum,
  SiArduino,
  SiRaspberrypi,
  SiEspressif,
  SiOpencv,
  SiTensorflow,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiFigma,
  SiAdobecreativecloud,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiStorybook,
  SiGraphql,
  SiSocketdotio,
  SiMqtt,
  SiBluetooth,
  SiLinux,
  SiUbuntu,
} from "react-icons/si";
import {
  DiMongodb,
  DiMysql,
  DiRedis,
  DiReact,
  DiNodejs,
  DiPython,
  DiGit,
  DiLinux,
  DiUbuntu,
  DiAndroid,
  DiApple,
  DiWindows,
} from "react-icons/di";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaAws,
  FaDocker,
  FaFigma,
  FaSketch,
  FaSlack,
  FaJira,
  FaTrello,
  FaGithub,
  FaBrain,
  FaUsers,
  FaComments,
  FaTasks,
  FaLightbulb,
  FaRocket,
  FaCog,
  FaCode,
  FaServer,
  FaMicrochip,
  FaWifi,
  FaBluetooth,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaDatabase,
} from "react-icons/fa";
import {
  TbBrandThreejs,
  TbBrandFramerMotion,
  TbBrandVscode,
  TbBrandGithub,
  TbBrandDocker,
  TbBrandFigma,
} from "react-icons/tb";
import {
  MdDeveloperMode,
  MdAnimation,
  MdDesignServices,
  MdSpeed,
  MdSecurity,
  MdCloud,
  MdIntegrationInstructions,
} from "react-icons/md";

export const skills: Skill[] = [
  // Frontend Skills
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: 95,
    icon: "SiReact",
    description:
      "Advanced React development with hooks, context, performance optimization, and modern patterns",
    experience: "4+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "portfolio-website",
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: 92,
    icon: "SiNextdotjs",
    description:
      "Full-stack React framework with SSR, SSG, API routes, and advanced optimization",
    experience: "3+ years",
    projects: ["blockchain-iot-framework", "portfolio-website"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: 90,
    icon: "SiTypescript",
    description:
      "Type-safe JavaScript development for large-scale, maintainable applications",
    experience: "3+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "portfolio-website",
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: 95,
    icon: "SiJavascript",
    description: "Modern ES6+ JavaScript, async programming, and browser APIs",
    experience: "5+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "smart-home-security",
    ],
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    level: 92,
    icon: "SiTailwindcss",
    description:
      "Utility-first CSS framework for rapid, responsive UI development",
    experience: "3+ years",
    projects: ["blockchain-iot-framework", "portfolio-website"],
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "frontend",
    level: 85,
    icon: "TbBrandThreejs",
    description:
      "3D graphics library for immersive web experiences and data visualization",
    experience: "2+ years",
    projects: ["portfolio-website", "blockchain-iot-framework"],
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "frontend",
    level: 88,
    icon: "MdAnimation",
    description:
      "Professional animation library for complex interactions and micro-animations",
    experience: "2+ years",
    projects: ["portfolio-website", "warehouse-management-gnn"],
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "frontend",
    level: 87,
    icon: "TbBrandFramerMotion",
    description: "React animation library for smooth, declarative animations",
    experience: "2+ years",
    projects: ["blockchain-iot-framework", "portfolio-website"],
  },

  // Backend & Blockchain Skills
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: 90,
    icon: "SiNodedotjs",
    description:
      "Server-side JavaScript runtime for scalable, real-time applications",
    experience: "4+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "smart-home-security",
    ],
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    level: 88,
    icon: "SiPython",
    description:
      "Versatile language for ML, automation, data analysis, and IoT applications",
    experience: "4+ years",
    projects: [
      "warehouse-management-gnn",
      "coffee-delivery-robot",
      "blockchain-iot-framework",
    ],
  },
  {
    id: "golang",
    name: "Go",
    category: "backend",
    level: 82,
    icon: "SiGo",
    description:
      "High-performance language for concurrent systems, APIs, and blockchain",
    experience: "2+ years",
    projects: ["blockchain-iot-framework"],
  },
  {
    id: "blockchain",
    name: "Blockchain",
    category: "backend",
    level: 85,
    icon: "SiEthereum",
    description:
      "Distributed ledger technology, smart contracts, and DeFi protocols",
    experience: "2+ years",
    projects: ["blockchain-iot-framework"],
  },
  {
    id: "solidity",
    name: "Solidity",
    category: "backend",
    level: 80,
    icon: "SiSolidity",
    description:
      "Smart contract development for Ethereum and EVM-compatible chains",
    experience: "2+ years",
    projects: ["blockchain-iot-framework"],
  },

  // Embedded Systems & IoT
  {
    id: "c-cpp",
    name: "C/C++",
    category: "embedded",
    level: 92,
    icon: "FaMicrochip",
    description:
      "Low-level programming for embedded systems, real-time applications, and optimization",
    experience: "5+ years",
    projects: [
      "coffee-delivery-robot",
      "smart-home-security",
      "warehouse-management-gnn",
    ],
  },
  {
    id: "arduino",
    name: "Arduino",
    category: "embedded",
    level: 95,
    icon: "SiArduino",
    description:
      "Microcontroller platform for rapid prototyping, IoT, and embedded projects",
    experience: "4+ years",
    projects: [
      "coffee-delivery-robot",
      "smart-home-security",
      "warehouse-management-gnn",
    ],
  },
  {
    id: "raspberry-pi",
    name: "Raspberry Pi",
    category: "embedded",
    level: 90,
    icon: "SiRaspberrypi",
    description:
      "Single-board computer for advanced embedded applications and edge computing",
    experience: "3+ years",
    projects: ["coffee-delivery-robot", "blockchain-iot-framework"],
  },
  {
    id: "esp32",
    name: "ESP32",
    category: "embedded",
    level: 92,
    icon: "SiEspressif",
    description:
      "WiFi/Bluetooth microcontroller for IoT applications and wireless communication",
    experience: "3+ years",
    projects: ["smart-home-security", "blockchain-iot-framework"],
  },
  {
    id: "iot-protocols",
    name: "IoT Protocols",
    category: "embedded",
    level: 88,
    icon: "SiMqtt",
    description:
      "MQTT, CoAP, HTTP/HTTPS, WebSocket protocols for IoT communication",
    experience: "3+ years",
    projects: ["blockchain-iot-framework", "smart-home-security"],
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "embedded",
    level: 82,
    icon: "SiOpencv",
    description:
      "Computer vision library for image processing, object detection, and recognition",
    experience: "2+ years",
    projects: ["coffee-delivery-robot"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "embedded",
    level: 78,
    icon: "SiTensorflow",
    description:
      "Machine learning framework for AI applications and edge deployment",
    experience: "2+ years",
    projects: ["warehouse-management-gnn"],
  },

  // Database & Storage
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    level: 85,
    icon: "SiMongodb",
    description: "NoSQL database for flexible, scalable data storage",
    experience: "3+ years",
    projects: ["blockchain-iot-framework", "smart-home-security"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    level: 80,
    icon: "SiPostgresql",
    description:
      "Advanced relational database with JSON support and complex queries",
    experience: "2+ years",
    projects: ["warehouse-management-gnn"],
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    level: 75,
    icon: "SiRedis",
    description:
      "In-memory data structure store for caching and real-time applications",
    experience: "2+ years",
    projects: ["blockchain-iot-framework"],
  },

  // DevOps & Tools
  {
    id: "git",
    name: "Git",
    category: "tools",
    level: 92,
    icon: "SiGit",
    description:
      "Version control system for collaborative development and CI/CD",
    experience: "5+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "coffee-delivery-robot",
    ],
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    level: 85,
    icon: "SiDocker",
    description:
      "Containerization platform for consistent deployment and scaling",
    experience: "2+ years",
    projects: ["blockchain-iot-framework"],
  },
  {
    id: "aws",
    name: "AWS",
    category: "tools",
    level: 82,
    icon: "FaAws",
    description:
      "Cloud computing platform for scalable infrastructure and services",
    experience: "2+ years",
    projects: ["blockchain-iot-framework", "smart-home-security"],
  },
  {
    id: "figma",
    name: "Figma",
    category: "tools",
    level: 88,
    icon: "SiFigma",
    description:
      "Collaborative design tool for UI/UX development and prototyping",
    experience: "3+ years",
    projects: ["blockchain-iot-framework", "portfolio-website"],
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    level: 95,
    icon: "TbBrandVscode",
    description:
      "Advanced code editor with extensions for full-stack development",
    experience: "4+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "portfolio-website",
    ],
  },

  // Communication & Networking
  {
    id: "wireless-protocols",
    name: "Wireless Protocols",
    category: "embedded",
    level: 85,
    icon: "FaWifi",
    description:
      "WiFi, Bluetooth, LoRa, Zigbee protocols for wireless communication",
    experience: "3+ years",
    projects: ["smart-home-security", "blockchain-iot-framework"],
  },
  {
    id: "network-security",
    name: "Network Security",
    category: "embedded",
    level: 80,
    icon: "FaShieldAlt",
    description:
      "Encryption, authentication, and secure communication protocols",
    experience: "2+ years",
    projects: ["blockchain-iot-framework", "smart-home-security"],
  },

  // Soft Skills
  {
    id: "problem-solving",
    name: "Problem Solving",
    category: "soft-skills",
    level: 95,
    icon: "FaLightbulb",
    description:
      "Analytical thinking and creative solution development for complex challenges",
    experience: "5+ years",
    projects: [
      "blockchain-iot-framework",
      "warehouse-management-gnn",
      "coffee-delivery-robot",
    ],
  },
  {
    id: "team-leadership",
    name: "Team Leadership",
    category: "soft-skills",
    level: 90,
    icon: "FaUsers",
    description:
      "Leading development teams, mentoring developers, and project coordination",
    experience: "3+ years",
    projects: ["blockchain-iot-framework"],
  },
  {
    id: "communication",
    name: "Communication",
    category: "soft-skills",
    level: 92,
    icon: "FaComments",
    description:
      "Clear technical communication, client interaction, and documentation",
    experience: "5+ years",
    projects: ["blockchain-iot-framework", "warehouse-management-gnn"],
  },
  {
    id: "project-management",
    name: "Project Management",
    category: "soft-skills",
    level: 88,
    icon: "FaTasks",
    description:
      "Agile methodologies, sprint planning, and delivery management",
    experience: "3+ years",
    projects: ["blockchain-iot-framework", "warehouse-management-gnn"],
  },
  {
    id: "innovation",
    name: "Innovation",
    category: "soft-skills",
    level: 90,
    icon: "FaRocket",
    description:
      "Creative thinking, emerging technology adoption, and solution architecture",
    experience: "4+ years",
    projects: ["blockchain-iot-framework", "coffee-delivery-robot"],
  },
];

export const getSkillsByCategory = (category: Skill["category"]) =>
  skills.filter((skill) => skill.category === category);

export const getFeaturedSkills = () =>
  skills.filter((skill) => skill.level >= 85);

export const getSkillById = (id: string) =>
  skills.find((skill) => skill.id === id);

export const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "MdDesignServices",
    color: "#3B82F6",
  },
  { id: "backend", name: "Backend", icon: "FaServer", color: "#10B981" },
  { id: "embedded", name: "Embedded", icon: "FaMicrochip", color: "#F59E0B" },
  { id: "tools", name: "Tools", icon: "FaCog", color: "#8B5CF6" },
  { id: "soft-skills", name: "Soft Skills", icon: "FaBrain", color: "#EF4444" },
] as const;
