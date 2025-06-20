"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const TechnicalDrawing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" as const },
    },
  };

  const skillAreas = [
    {
      id: "brain",
      x: 200,
      y: 60,
      label: "AI/ML Integration",
      color: "#64b5f6",
    },
    { id: "eyes", x: 180, y: 90, label: "Computer Vision", color: "#81c784" },
    {
      id: "mouth",
      x: 200,
      y: 120,
      label: "Voice Processing",
      color: "#ffb74d",
    },
    {
      id: "chest",
      x: 200,
      y: 200,
      label: "System Architecture",
      color: "#f48fb1",
    },
    {
      id: "hands",
      x: 120,
      y: 180,
      label: "Hardware Control",
      color: "#ce93d8",
    },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      <motion.svg
        width="400"
        height="500"
        viewBox="0 0 400 500"
        className="w-full h-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Grid Background */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#2d3748"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          <pattern
            id="smallGrid"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 5 0 L 0 0 0 5"
              fill="none"
              stroke="#2d3748"
              strokeWidth="0.3"
              opacity="0.2"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#smallGrid)" />

        {/* Blueprint Frame */}
        <motion.rect
          x="10"
          y="10"
          width="380"
          height="480"
          fill="none"
          stroke="#64b5f6"
          strokeWidth="2"
          variants={drawVariants}
        />

        {/* Title Block */}
        <motion.g variants={drawVariants}>
          <rect
            x="20"
            y="20"
            width="200"
            height="60"
            fill="none"
            stroke="#64b5f6"
            strokeWidth="1"
          />
          <text
            x="30"
            y="40"
            className="fill-blueprint-primary text-sm font-mono"
          >
            ENGINEER.BLUEPRINT
          </text>
          <text x="30" y="55" className="fill-blueprint-text text-xs font-mono">
            Multi-Disciplinary System
          </text>
          <text
            x="30"
            y="70"
            className="fill-blueprint-muted text-xs font-mono"
          >
            v2.0.24
          </text>
        </motion.g>

        {/* Human Figure Outline */}
        <motion.g variants={drawVariants}>
          {/* Head */}
          <motion.circle
            cx="200"
            cy="120"
            r="40"
            fill="none"
            stroke="#64b5f6"
            strokeWidth="2"
            variants={drawVariants}
          />

          {/* Body */}
          <motion.rect
            x="160"
            y="160"
            width="80"
            height="120"
            fill="none"
            stroke="#64b5f6"
            strokeWidth="2"
            variants={drawVariants}
          />

          {/* Arms */}
          <motion.line
            x1="160"
            y1="180"
            x2="120"
            y2="200"
            stroke="#64b5f6"
            strokeWidth="2"
            variants={drawVariants}
          />
          <motion.line
            x1="240"
            y1="180"
            x2="280"
            y2="200"
            stroke="#64b5f6"
            strokeWidth="2"
            variants={drawVariants}
          />

          {/* Legs */}
          <motion.line
            x1="180"
            y1="280"
            x2="160"
            y2="350"
            stroke="#64b5f6"
            strokeWidth="2"
            variants={drawVariants}
          />
          <motion.line
            x1="220"
            y1="280"
            x2="240"
            y2="350"
            stroke="#64b5f6"
            strokeWidth="2"
            variants={drawVariants}
          />
        </motion.g>

        {/* Internal Systems */}
        <motion.g variants={drawVariants} className="opacity-70">
          {/* Brain/Processing Unit */}
          <motion.circle
            cx="200"
            cy="110"
            r="15"
            fill="none"
            stroke="#81c784"
            strokeWidth="1.5"
            variants={drawVariants}
          />
          <motion.path
            d="M 190 110 Q 200 100 210 110 Q 200 120 190 110"
            fill="none"
            stroke="#81c784"
            strokeWidth="1"
            variants={drawVariants}
          />

          {/* Circuit Patterns in Chest */}
          <motion.rect
            x="175"
            y="180"
            width="50"
            height="30"
            fill="none"
            stroke="#ffb74d"
            strokeWidth="1"
            variants={drawVariants}
          />
          <motion.line
            x1="180"
            y1="195"
            x2="220"
            y2="195"
            stroke="#ffb74d"
            strokeWidth="0.8"
            variants={drawVariants}
          />
          <motion.line
            x1="190"
            y1="185"
            x2="190"
            y2="205"
            stroke="#ffb74d"
            strokeWidth="0.8"
            variants={drawVariants}
          />
          <motion.line
            x1="210"
            y1="185"
            x2="210"
            y2="205"
            stroke="#ffb74d"
            strokeWidth="0.8"
            variants={drawVariants}
          />

          {/* Data Flow Lines */}
          <motion.path
            d="M 180 140 Q 160 160 180 180"
            fill="none"
            stroke="#f48fb1"
            strokeWidth="1"
            strokeDasharray="3,3"
            variants={drawVariants}
          />
          <motion.path
            d="M 220 140 Q 240 160 220 180"
            fill="none"
            stroke="#f48fb1"
            strokeWidth="1"
            strokeDasharray="3,3"
            variants={drawVariants}
          />
        </motion.g>

        {/* Interactive Skill Areas */}
        {skillAreas.map((area, index) => (
          <motion.g key={area.id}>
            <motion.circle
              cx={area.x}
              cy={area.y}
              r="8"
              fill={area.color}
              opacity={hoveredArea === area.id ? 0.8 : 0.4}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 0.4,
                  transition: { delay: 1.5 + index * 0.2 },
                },
              }}
              whileHover={{ scale: 1.3, opacity: 0.8 }}
              onHoverStart={() => setHoveredArea(area.id)}
              onHoverEnd={() => setHoveredArea(null)}
              className="cursor-pointer"
            />
            <motion.circle
              cx={area.x}
              cy={area.y}
              r="15"
              fill="none"
              stroke={area.color}
              strokeWidth="1"
              opacity={hoveredArea === area.id ? 0.6 : 0}
              animate={{
                scale: hoveredArea === area.id ? [1, 1.2, 1] : 1,
                opacity: hoveredArea === area.id ? 0.6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.g>
        ))}

        {/* Dimensions and Annotations */}
        <motion.g variants={drawVariants} className="opacity-60">
          <motion.line
            x1="50"
            y1="80"
            x2="50"
            y2="360"
            stroke="#64b5f6"
            strokeWidth="0.5"
          />
          <motion.line
            x1="45"
            y1="80"
            x2="55"
            y2="80"
            stroke="#64b5f6"
            strokeWidth="0.5"
          />
          <motion.line
            x1="45"
            y1="360"
            x2="55"
            y2="360"
            stroke="#64b5f6"
            strokeWidth="0.5"
          />
          <text
            x="30"
            y="220"
            className="fill-blueprint-primary text-xs font-mono"
            transform="rotate(-90 30 220)"
          >
            HEIGHT: 280px
          </text>
        </motion.g>
      </motion.svg>

      {/* Skill Labels */}
      {hoveredArea && (
        <motion.div
          className="absolute top-0 left-0 bg-blueprint-bg/90 backdrop-blur-sm border border-blueprint-lines rounded px-3 py-2 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            left: `${skillAreas.find((s) => s.id === hoveredArea)?.x}px`,
            top: `${
              (skillAreas.find((s) => s.id === hoveredArea)?.y || 0) - 40
            }px`,
            transform: "translateX(-50%)",
          }}
        >
          <p className="text-sm font-mono text-blueprint-primary whitespace-nowrap">
            {skillAreas.find((s) => s.id === hoveredArea)?.label}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TechnicalDrawing;
