import React from "react";
import { motion } from "framer-motion";

interface FloatingTechElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingTechElement: React.FC<FloatingTechElementProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    className={`absolute ${className}`}
    style={{ willChange: "transform, opacity" }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{
      delay,
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 3 + Math.random() * 2,
    }}
  >
    {children}
  </motion.div>
);

export default FloatingTechElement;
