"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SkillBars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    { name: "Frontend Development", level: 95, color: "#64b5f6" },
    { name: "React/Next.js", level: 92, color: "#61dafb" },
    { name: "TypeScript", level: 88, color: "#3178c6" },
    { name: "Communications Systems", level: 85, color: "#81c784" },
    { name: "Signal Processing", level: 82, color: "#4caf50" },
    { name: "Embedded Systems", level: 88, color: "#ffb74d" },
    { name: "C/C++", level: 85, color: "#00599c" },
    { name: "IoT & Robotics", level: 80, color: "#f48fb1" },
  ];

  return (
    <div ref={ref} className="space-y-4">
      {skills.map((skill, index) => (
        <div key={skill.name} className="group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-blueprint-text">
              {skill.name}
            </span>
            <span className="text-sm font-mono text-blueprint-muted">
              {skill.level}%
            </span>
          </div>
          <div className="h-2 bg-blueprint-lines rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: [-100, 200] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1 + 1.5,
                }}
              />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillBars;
