export interface ExperienceItem {
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

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  // cgpa: string;
  achievements: string[];
  relevantCourses: string[];
  color: string;
}

export const experiences: ExperienceItem[] = [
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

export const education: EducationItem = {
  id: "futa-engineering",
  institution: "Federal University of Technology Akure",
  degree: "Bachelor of Engineering",
  field: "Information and Communication Technology",
  period: "2019 – 2024",
  location: "Akure, Nigeria",
  // cgpa: "4.27/5.00",
  achievements: [
    // "Graduated with First Class Honors (CGPA: 4.27/5.00)",
    "final year projects in AI and Blockchain",
    "Published research on blockchain-based IoT security frameworks",
    "Developed warehouse management system using Graph Neural Networks",
    "Created autonomous coffee delivery robot with advanced navigation",
    // "Presented research at international conferences on emerging technologies",
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
