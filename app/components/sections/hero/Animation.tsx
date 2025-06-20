"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const HeroAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const circuitVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 3,
        ease: "easeInOut" as const,
        staggerChildren: 0.2,
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.svg
        width="800"
        height="600"
        viewBox="0 0 800 600"
        className="w-full h-full max-w-4xl opacity-30"
        initial="hidden"
        animate={controls}
        variants={circuitVariants}
      >
        {/* Circuit Board Base */}
        <motion.rect
          x="50"
          y="50"
          width="700"
          height="500"
          fill="none"
          stroke="#64b5f6"
          strokeWidth="2"
          rx="10"
          variants={circuitVariants}
        />

        {/* Main Circuit Paths */}
        <motion.path
          d="M 100 300 L 200 300 L 200 200 L 400 200 L 400 300 L 600 300 L 600 400 L 700 400"
          variants={circuitVariants}
          className="circuit-path"
        />

        <motion.path
          d="M 400 200 L 400 100 L 600 100 L 600 150"
          variants={circuitVariants}
          className="circuit-path"
        />

        <motion.path
          d="M 200 300 L 150 350 L 150 450 L 300 450"
          variants={circuitVariants}
          className="circuit-path"
        />

        {/* Microcontroller */}
        <motion.g variants={nodeVariants}>
          <rect
            x="350"
            y="170"
            width="100"
            height="60"
            fill="#1e293b"
            stroke="#64b5f6"
            strokeWidth="2"
            rx="5"
          />
          <text
            x="400"
            y="205"
            textAnchor="middle"
            className="fill-blueprint-primary text-xs font-mono"
          >
            MCU
          </text>

          {/* MCU Pins */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.circle
              key={i}
              cx={360 + i * 10}
              cy="165"
              r="2"
              fill="#81c784"
              variants={nodeVariants}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.g>

        {/* Sensors */}
        <motion.g variants={nodeVariants}>
          <circle
            cx="150"
            cy="200"
            r="20"
            fill="#2d3748"
            stroke="#81c784"
            strokeWidth="2"
          />
          <text
            x="150"
            y="205"
            textAnchor="middle"
            className="fill-blueprint-secondary text-xs"
          >
            SENSOR
          </text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <circle
            cx="650"
            cy="350"
            r="25"
            fill="#2d3748"
            stroke="#ffb74d"
            strokeWidth="2"
          />
          <text
            x="650"
            y="355"
            textAnchor="middle"
            className="fill-blueprint-accent text-xs"
          >
            RF
          </text>
        </motion.g>

        {/* Data Flow Animation */}
        <motion.circle
          r="4"
          fill="#64b5f6"
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath:
              "path('M 100 300 L 200 300 L 200 200 L 400 200 L 400 300 L 600 300 L 600 400 L 700 400')",
          }}
        />

        {/* Connection Nodes */}
        {[
          { x: 200, y: 300 },
          { x: 400, y: 200 },
          { x: 600, y: 300 },
          { x: 400, y: 300 },
        ].map((node, index) => (
          <motion.circle
            key={index}
            cx={node.x}
            cy={node.y}
            r="6"
            fill="#64b5f6"
            variants={nodeVariants}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              delay: index * 0.3,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Brain/Neural Network Visualization */}
        <motion.g variants={nodeVariants} className="opacity-60">
          {/* Neural connections */}
          <motion.path
            d="M 350 50 Q 400 75 450 50 Q 500 25 550 50"
            fill="none"
            stroke="#81c784"
            strokeWidth="1"
            variants={circuitVariants}
          />
          <motion.path
            d="M 370 70 Q 400 95 430 70"
            fill="none"
            stroke="#81c784"
            strokeWidth="1"
            variants={circuitVariants}
          />

          {/* Neural nodes */}
          {[
            { x: 350, y: 50 },
            { x: 400, y: 80 },
            { x: 450, y: 50 },
            { x: 550, y: 50 },
          ].map((node, index) => (
            <motion.circle
              key={index}
              cx={node.x}
              cy={node.y}
              r="4"
              fill="#81c784"
              variants={nodeVariants}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default HeroAnimation;
