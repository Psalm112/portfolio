"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingStages = useMemo(
    () => [
      "Initializing...",
      "Loading Frontend Modules...",
      "Connecting Communication Systems...",
      "Booting Embedded Components...",
      "Synchronizing Data...",
      "Ready to Launch!",
    ],
    []
  );

  // Optimized progress update
  const updateProgress = useCallback(() => {
    setProgress((prev) => {
      const newProgress = prev + Math.random() * 15;
      return newProgress >= 100 ? 100 : newProgress;
    });
  }, []);

  // Optimized text update
  const updateText = useCallback(() => {
    setLoadingText((prev) => {
      const currentIndex = loadingStages.indexOf(prev);
      const nextIndex = (currentIndex + 1) % loadingStages.length;
      return loadingStages[nextIndex];
    });
  }, [loadingStages]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      updateProgress();
    }, 200);

    const textInterval = setInterval(() => {
      updateText();
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [updateProgress, updateText]);

  // Stop intervals when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      // Cleanup will happen in the main useEffect
    }
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 performance-optimized"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-8 p-8">
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Samuel Oyenuga
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-space-grotesk">
            Multi-Disciplinary Engineer
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 mx-auto space-y-4">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm" />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-cyan-400 font-jetbrains text-sm md:text-base"
        >
          {loadingText}
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
