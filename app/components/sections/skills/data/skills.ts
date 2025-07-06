export interface SkillsType {
  label: string;
  proficiency: number;
  category: string;
  color: string;
  position: [number, number, number];
}

export const skills: SkillsType[] = [
  // Frontend Skills
  {
    label: "React.js",
    proficiency: 95,
    category: "Frontend",
    color: "#61DAFB",
    position: [2, 1, 0],
  },
  {
    label: "Next.js",
    proficiency: 92,
    category: "Frontend",
    color: "#000000",
    position: [3, -1, 1],
  },
  {
    label: "TypeScript",
    proficiency: 92,
    category: "Frontend",
    color: "#3178C6",
    position: [1, 2, -1],
  },
  {
    label: "Tailwind CSS",
    proficiency: 90,
    category: "Frontend",
    color: "#06B6D4",
    position: [-1, 1.5, 0],
  },

  // Backend & Integration
  {
    label: "Node.js",
    proficiency: 85,
    category: "Backend",
    color: "#339933",
    position: [-2, 0, 1],
  },
  {
    label: "REST APIs",
    proficiency: 88,
    category: "Backend",
    color: "#FF6B35",
    position: [-3, -1, -1],
  },
  {
    label: "Firebase",
    proficiency: 82,
    category: "Backend",
    color: "#FFCA28",
    position: [0, -2, 1],
  },

  // Embedded Systems
  {
    label: "Arduino",
    proficiency: 90,
    category: "Embedded",
    color: "#00979D",
    position: [2, -2, -1],
  },
  {
    label: "IoT Systems",
    proficiency: 88,
    category: "Embedded",
    color: "#4CAF50",
    position: [-2, 2, 1],
  },
  {
    label: "Sensors & Actuators",
    proficiency: 85,
    category: "Embedded",
    color: "#9C27B0",
    position: [0, 0, -2],
  },

  // AI/ML & Blockchain
  {
    label: "Machine Learning",
    proficiency: 82,
    category: "AI/ML",
    color: "#FF9800",
    position: [-1, -1, 2],
  },
  {
    label: "Graph Neural Networks",
    proficiency: 78,
    category: "AI/ML",
    color: "#E91E63",
    position: [1, 0, 2],
  },
  {
    label: "Blockchain",
    proficiency: 85,
    category: "Blockchain",
    color: "#F7931E",
    position: [0, 3, 0],
  },
  {
    label: "Smart Contracts",
    proficiency: 80,
    category: "Blockchain",
    color: "#627EEA",
    position: [-1, -3, 0],
  },
];
