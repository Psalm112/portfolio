import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

interface SkillBarProps {
  skill: string;
  percentage: number;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({
  skill,
  percentage,
  delay = 0,
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

export default React.memo(SkillBar);
