export interface ProjectType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Software" | "Hardware" | "Full-Stack" | "Research";
  technologies: string[];
  keyFeatures: string[];
  metrics?: {
    label: string;
    value: string;
    icon: string;
  }[];
  links: {
    github?: string;
    live?: string;
    paper?: string;
    demo?: string;
  };
  image: string;
  gradient: string;
  accentColor: string;
  type: "robot" | "iot" | "webapp" | "research";
}

export const projects: ProjectType[] = [
  {
    id: "coffee-delivery-bot",
    title: "Autonomous Coffee Delivery Bot",
    subtitle: "Intelligent Service Robot",
    description:
      "An autonomous mobile robot designed for coffee delivery in restaurant environments. Features advanced navigation, human-following capabilities, obstacle avoidance, and remote control via mobile app.",
    category: "Hardware",
    technologies: [
      "Arduino",
      "C++",
      "React Native",
      "Bluetooth",
      "Computer Vision",
      "PID Control",
    ],
    keyFeatures: [
      "Autonomous navigation with real-time mapping",
      "Human detection and following system",
      "Dynamic obstacle avoidance using multiple sensors",
      "Line tracking for predefined routes",
      "Remote control via mobile application",
      "Load balancing and spill prevention mechanisms",
      "Voice command integration",
      "Battery monitoring and auto-charging dock",
    ],
    metrics: [
      { label: "Navigation Accuracy", value: "98.5%", icon: "🎯" },
      { label: "Delivery Success Rate", value: "99.2%", icon: "✅" },
      { label: "Response Time", value: "250ms", icon: "⚡" },
    ],
    links: {
      github: "https://github.com/Psalm112/coffee-delivery-bot",
      demo: "https://youtu.be/coffee-bot-demo",
    },
    image: "/projects/coffee-bot.jpg",
    gradient: "from-amber-900/20 via-orange-800/20 to-red-900/20",
    accentColor: "#F59E0B",
    type: "robot",
  },
  {
    id: "warehouse-management-gnn",
    title: "Warehouse Management System with GNN",
    subtitle: "AI-Powered Logistics Optimization",
    description:
      "A hardware-software integrated warehouse management system using Graph Neural Networks and Dijkstra's algorithm for optimal inventory control and pathfinding.",
    category: "Full-Stack",
    technologies: [
      "Arduino",
      "Python",
      "TensorFlow",
      "Graph Neural Networks",
      "React",
      "Node.js",
      "MongoDB",
    ],
    keyFeatures: [
      "Real-time shelf occupancy tracking with IR sensors",
      "GNN-based path optimization learning",
      "Dynamic edge weight adjustment based on item fragility",
      "LED-guided navigation system",
      "Remote inventory control interface",
      "Predictive analytics for space utilization",
      "Cost-aware routing algorithms",
      "Hardware-software integration with Arduino",
    ],
    metrics: [
      { label: "Travel Time Reduction", value: "45%", icon: "🚀" },
      { label: "Inventory Accuracy", value: "99.8%", icon: "📊" },
      { label: "Path Optimization", value: "2500 TPS", icon: "🔄" },
    ],
    links: {
      github: "https://github.com/Psalm112/warehouse-gnn",
      paper: "https://papers.warehouse-gnn.pdf",
      demo: "https://warehouse-demo.vercel.app",
    },
    image: "/projects/warehouse-system.jpg",
    gradient: "from-purple-900/20 via-blue-800/20 to-cyan-900/20",
    accentColor: "#9333EA",
    type: "iot",
  },
  {
    id: "blockchain-iot-framework",
    title: "Blockchain IoT Security Framework",
    subtitle: "Research Project - Final Year",
    description:
      "A novel blockchain-based architecture for secure and scalable IoT networks, featuring ZK-Rollups, edge computing, and Verkle Trees for energy-efficient communication.",
    category: "Research",
    technologies: [
      "Blockchain",
      "ZK-Rollups",
      "Solidity",
      "Edge Computing",
      "Verkle Trees",
      "IoT Protocols",
      "Smart Contracts",
    ],
    keyFeatures: [
      "Layered blockchain architecture for IoT scalability",
      "ZK-Rollups for Layer 2 scaling (99.8% off-chain data)",
      "Edge computing for ZKP computation offloading",
      "ECC authentication with smart contracts",
      "MQTT, CoAP, and HTTP protocol compatibility",
      "DDoS attack resistance (99.7% uptime)",
      "Energy-efficient consensus mechanism",
      "Verkle Trees for enhanced privacy",
    ],
    metrics: [
      { label: "Transaction Speed", value: "2,500 TPS", icon: "⚡" },
      { label: "Energy Reduction", value: "95%", icon: "🌱" },
      { label: "Security Uptime", value: "99.7%", icon: "🔒" },
    ],
    links: {
      github: "https://github.com/Psalm112/blockchain-iot",
      paper: "https://research.blockchain-iot.pdf",
      demo: "https://blockchain-iot-demo.vercel.app",
    },
    image: "/projects/blockchain-iot.jpg",
    gradient: "from-emerald-900/20 via-teal-800/20 to-cyan-900/20",
    accentColor: "#10B981",
    type: "research",
  },
  {
    id: "smart-home-security",
    title: "Smart Home Security System",
    subtitle: "IoT-Based Access Control",
    description:
      "An intelligent home security system featuring motion detection, automatic door control, and multi-sensor integration for comprehensive home monitoring.",
    category: "Hardware",
    technologies: [
      "Arduino",
      "PIR Sensors",
      "IR Sensors",
      "Servo Motors",
      "ESP32",
      "MQTT",
      "React Dashboard",
    ],
    keyFeatures: [
      "Human motion detection with PIR sensors",
      "Automatic door opening/closing mechanism",
      "Multi-zone monitoring with IR sensors",
      "Real-time security dashboard",
      "Mobile app notifications",
      "Night vision camera integration",
      "Emergency alert system",
      "Remote access control",
    ],
    metrics: [
      { label: "Detection Accuracy", value: "99.3%", icon: "👁️" },
      { label: "Response Time", value: "150ms", icon: "⚡" },
      { label: "False Alarms", value: "<0.1%", icon: "🎯" },
    ],
    links: {
      github: "https://github.com/Psalm112/smart-home-security",
      demo: "https://smart-home-demo.vercel.app",
    },
    image: "/projects/smart-home.jpg",
    gradient: "from-red-900/20 via-pink-800/20 to-purple-900/20",
    accentColor: "#DC2626",
    type: "iot",
  },
  {
    id: "dezenmart-dapp",
    title: "Dezenmart - Decentralized E-commerce",
    subtitle: "Crypto-Powered Marketplace",
    description:
      "A decentralized e-commerce platform enabling secure crypto transactions with built-in escrow system and real-time buyer-seller communication.",
    category: "Full-Stack",
    technologies: [
      "Next.js",
      "TypeScript",
      "Web3.js",
      "Solidity",
      "IPFS",
      "Tailwind CSS",
      "Socket.io",
    ],
    keyFeatures: [
      "Wallet connection and crypto payments",
      "Smart contract-based escrow system",
      "Real-time buyer-seller chat",
      "Decentralized product storage on IPFS",
      "Automated payment release on delivery",
      "Dispute resolution mechanism",
      "Multi-chain compatibility",
      "Gas optimization strategies",
    ],
    metrics: [
      { label: "Transaction Security", value: "100%", icon: "🔒" },
      { label: "Gas Optimization", value: "40%", icon: "⛽" },
      { label: "User Adoption", value: "2.5K+", icon: "👥" },
    ],
    links: {
      github: "https://github.com/Psalm112/dezenmart",
      live: "https://dezenmart.vercel.app",
    },
    image: "/projects/dezenmart.jpg",
    gradient: "from-blue-900/20 via-purple-800/20 to-pink-900/20",
    accentColor: "#3B82F6",
    type: "webapp",
  },
  {
    id: "telehealth-platform",
    title: "Telehealth Training Platform",
    subtitle: "Healthcare Security Education",
    description:
      "A comprehensive React-based platform for phishing awareness training specifically designed for healthcare professionals, featuring interactive lessons and simulated attacks.",
    category: "Software",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "WebRTC",
      "Chart.js",
      "JWT Authentication",
    ],
    keyFeatures: [
      "Interactive video lessons and tutorials",
      "Simulated phishing email scenarios",
      "Real-time progress tracking",
      "Compliance reporting dashboard",
      "Multi-role user management",
      "Certificate generation system",
      "Analytics and performance metrics",
      "Mobile-responsive design",
    ],
    metrics: [
      { label: "User Engagement", value: "40%", icon: "📈" },
      { label: "Completion Rate", value: "89%", icon: "🎓" },
      { label: "Content Updates", value: "50%", icon: "⚡" },
    ],
    links: {
      github: "https://github.com/Psalm112/telehealth-platform",
      demo: "https://telehealth-demo.vercel.app",
    },
    image: "/projects/telehealth.jpg",
    gradient: "from-green-900/20 via-emerald-800/20 to-teal-900/20",
    accentColor: "#10B981",
    type: "webapp",
  },
];
