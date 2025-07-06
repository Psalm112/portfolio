// Data and types for About section

export interface ExpertiseItem {
  skill: string;
  percentage: number;
}

export interface AchievementItem {
  number: number;
  suffix?: string;
  label: string;
  description: string;
}

export interface FeaturedProject {
  color: string; // e.g. 'cyan', 'purple', 'green'
  title: string;
  description: string;
}

export const expertise: ExpertiseItem[] = [
  { skill: "React.js / Next.js", percentage: 95 },
  { skill: "TypeScript / JavaScript", percentage: 92 },
  { skill: "Embedded Systems (Arduino/IoT)", percentage: 88 },
  { skill: "Blockchain Development", percentage: 85 },
  { skill: "Machine Learning (GNN/ANN)", percentage: 82 },
  { skill: "Hardware-Software Integration", percentage: 90 },
];

export const achievements: AchievementItem[] = [
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

export const featuredProjects: FeaturedProject[] = [
  {
    color: "cyan",
    title: "Blockchain IoT Framework",
    description:
      "Developed a secure, scalable architecture using ZK-Rollups and Verkle Trees, achieving 99.7% uptime during DDoS attacks",
  },
  {
    color: "purple",
    title: "AI-Powered Warehouse System",
    description:
      "Built GNN-optimized inventory management reducing worker travel time and handling risk for fragile items",
  },
  {
    color: "green",
    title: "Autonomous Service Robot",
    description:
      "Created multi-functional coffee delivery bot with human following, obstacle avoidance, and mobile app control",
  },
];
