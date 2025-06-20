"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingStages = [
    "Initializing...",
    "Loading Frontend Modules...",
    "Connecting Communication Systems...",
    "Booting Embedded Components...",
    "Synchronizing Data...",
    "Ready to Launch!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingStages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingStages.length;
        return loadingStages[nextIndex];
      });
    }, 300);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blueprint-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#64b5f6"
              strokeWidth="2"
              strokeDasharray="314"
              strokeDashoffset="314"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="35"
              fill="none"
              stroke="#81c784"
              strokeWidth="2"
              strokeDasharray="220"
              strokeDashoffset="220"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="20"
              fill="none"
              stroke="#ffb74d"
              strokeWidth="2"
              strokeDasharray="126"
              strokeDashoffset="126"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="5"
              fill="#64b5f6"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.svg>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="h-1 bg-blueprint-lines rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blueprint-primary to-blueprint-secondary rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between text-sm font-mono text-blueprint-muted">
            <span>{Math.round(progress)}%</span>
            <motion.span
              key={loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {loadingText}
            </motion.span>
          </div>
        </div>

        {/* Binary Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {Array.from({ length: 50 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-blueprint-primary font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
              }}
              animate={{
                y: window.innerHeight + 20,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
