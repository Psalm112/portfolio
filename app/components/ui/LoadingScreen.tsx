"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

interface LoadingStage {
  text: string;
  duration: number;
  icon: string;
}

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingStages: LoadingStage[] = useMemo(
    () => [
      { text: "Initializing Core Systems", duration: 300, icon: "⚡" },
      { text: "Loading Frontend Modules", duration: 250, icon: "🎯" },
      { text: "Connecting IoT Networks", duration: 200, icon: "🌐" },
      { text: "Securing Blockchain Layer", duration: 300, icon: "🔐" },
      { text: "Optimizing Neural Networks", duration: 250, icon: "🧠" },
      { text: "Calibrating Sensors", duration: 200, icon: "📡" },
      { text: "Deploying Edge Computing", duration: 200, icon: "⚙️" },
      { text: "System Ready", duration: 200, icon: "✅" },
    ],
    []
  );

  const updateProgress = useCallback(() => {
    const totalStages = loadingStages.length;
    const progressPerStage = 100 / totalStages;

    setProgress((prev) => {
      const newProgress = Math.min(prev + progressPerStage, 100);
      if (newProgress >= 100) {
        setIsComplete(true);
      }
      return newProgress;
    });
  }, [loadingStages.length]);

  useEffect(() => {
    if (currentStage >= loadingStages.length) return;

    const timer = setTimeout(() => {
      updateProgress();
      setCurrentStage((prev) => prev + 1);
    }, loadingStages[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage, loadingStages, updateProgress]);

  const currentStageData =
    loadingStages[currentStage] || loadingStages[loadingStages.length - 1];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjBaIiBzdHJva2U9IiMwMEQ0RkYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==')] animate-pulse" />
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 80, -80, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: "20%", right: "10%" }}
        />
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-2xl mx-auto">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <motion.div
            className="relative inline-block"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Samuel Oyenuga
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-lg md:text-xl text-gray-300 font-space-grotesk font-medium">
              Frontend Engineer • IoT Systems Architect
            </p>
            <p className="text-sm md:text-base text-gray-400 font-inter">
              Blockchain Security • Neural Networks • Embedded Systems
            </p>
          </motion.div>
        </motion.div>

        {/* Progress Section */}
        <div className="space-y-6">
          {/* Main Progress Bar */}
          <div className="relative">
            <div className="w-full max-w-md mx-auto h-3 bg-gray-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm" />
                <motion.div
                  className="absolute right-0 top-0 w-1 h-full bg-white/80 rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between text-sm text-gray-400 mt-2 font-jetbrains">
              <span>Loading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Current Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center justify-center space-x-3"
            >
              <motion.span
                className="text-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {currentStageData.icon}
              </motion.span>
              <span className="text-cyan-400 font-jetbrains text-sm md:text-base font-medium">
                {currentStageData.text}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Stage Indicators */}
          <div className="flex justify-center space-x-2">
            {loadingStages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStage
                    ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-gray-600"
                }`}
                animate={{
                  scale: index === currentStage ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: index === currentStage ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center space-x-6 text-xs font-jetbrains text-gray-500"
          >
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Core Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Networks Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>AI Ready</span>
            </div>
          </motion.div>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-green-400 font-jetbrains text-sm md:text-base font-medium"
          >
            ✅ All systems operational. Welcome aboard!
          </motion.div>
        )}
      </div>

      {/* Accessibility Features */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Loading progress: {Math.round(progress)}%. Current stage:{" "}
        {currentStageData.text}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
