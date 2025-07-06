import React from "react";
import { motion } from "framer-motion";
import { floatingShapes } from "../data/floatingShapes";

const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className={`absolute bg-gradient-to-br ${shape.color} rounded-lg backdrop-blur-sm`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.position.x}%`,
            top: `${shape.position.y}%`,
            opacity: shape.opacity,
          }}
          initial={{
            rotate: shape.rotation.z,
            scale: 0,
          }}
          animate={{
            rotate: [shape.rotation.z, shape.rotation.z + 360],
            scale: [0, 1, 1, 0.8, 1],
            y: [0, -20, 0, 10, 0],
            x: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
