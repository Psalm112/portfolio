import React from "react";
import AnimatedCounter from "./AnimatedCounter";

interface AchievementCardProps {
  number: number;
  suffix?: string;
  label: string;
  description: string;
  duration?: number;
  delay?: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  number,
  suffix,
  label,
  description,
  duration = 2,
  delay = 0,
}) => (
  <div
    className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-gray-700/40 text-center"
    style={{ transitionDelay: `${delay}s` }}
  >
    <div className="font-orbitron text-2xl lg:text-3xl font-bold text-cyan-400 mb-2">
      <AnimatedCounter end={number} suffix={suffix} duration={duration} />
    </div>
    <div className="font-jetbrains text-xs lg:text-sm font-semibold text-white uppercase tracking-wide mb-1">
      {label}
    </div>
    <div className="font-inter text-xs text-gray-400">{description}</div>
  </div>
);

export default React.memo(AchievementCard);
