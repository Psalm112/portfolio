export interface Stat {
  value: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export const stats: Stat[] = [
  {
    value: "24/7",
    label: "Response Time",
    description: "Quick turnaround",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    description: "Quality guaranteed",
    icon: "⭐",
    color: "from-green-400 to-emerald-500",
  },
  {
    value: "5+",
    label: "Years Experience",
    description: "Proven expertise",
    icon: "🏆",
    color: "from-purple-400 to-pink-500",
  },
  {
    value: "Remote",
    label: "Work Style",
    description: "Global collaboration",
    icon: "🌍",
    color: "from-blue-400 to-cyan-500",
  },
];
