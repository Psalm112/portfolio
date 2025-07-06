import React from "react";
import { motion } from "framer-motion";
import { stats } from "../data/stats";

const StatsSection: React.FC = () => {
  return (
    <motion.div
      className="mb-20 lg:mb-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div
              className={`font-orbitron text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
            >
              {stat.value}
            </div>
            <div className="font-jetbrains text-sm text-gray-300 font-medium uppercase tracking-wide mb-1">
              {stat.label}
            </div>
            <div className="font-inter text-xs text-gray-400 font-light">
              {stat.description}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsSection;
