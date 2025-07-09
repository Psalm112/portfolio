import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClothTransitionProps {
  isActive: boolean;
  direction: "up" | "down";
  onComplete?: () => void;
}

export const ClothTransition: React.FC<ClothTransitionProps> = ({
  isActive,
  direction,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  const variants = {
    initial: {
      y: direction === "down" ? "-100%" : "100%",
      scaleY: 0,
    },
    animate: {
      y: "0%",
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        staggerChildren: 0.05,
      },
    },
    exit: {
      y: direction === "down" ? "100%" : "-100%",
      scaleY: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  const stripVariants = {
    initial: {
      scaleY: 0,
      transformOrigin: direction === "down" ? "top" : "bottom",
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Create cloth strips for realistic fabric effect */}
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-95"
                style={{
                  left: `${(i / 12) * 100}%`,
                  width: `${100 / 12}%`,
                  transformOrigin: direction === "down" ? "top" : "bottom",
                }}
                variants={stripVariants}
                custom={i}
                transition={{
                  delay: i * 0.02,
                }}
              >
                {/* Add subtle texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent" />

                {/* Cloth wave effect */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 20%, rgba(147,51,234,0.1) 70%, transparent 100%)",
                      "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}

            {/* Center gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
