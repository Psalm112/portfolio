import { motion, useInView } from "framer-motion";
import { useState } from "react";
import { useRef } from "react";
import { ExperienceItem } from "../data/experiences";

const TimelineConnector = ({
  isActive,
  delay = 0,
}: {
  isActive: boolean;
  delay?: number;
}) => {
  return (
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 to-gray-800">
      <motion.div
        className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 origin-top"
        initial={{ scaleY: 0 }}
        animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  );
};

const ExperienceCard = ({
  experience,
  index,
  isLast = false,
}: {
  experience: ExperienceItem;
  index: number;
  isLast?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Current":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "Contract":
        return "bg-gradient-to-r from-blue-500 to-cyan-600";
      case "Freelance":
        return "bg-gradient-to-r from-purple-500 to-pink-600";
      case "Full-time":
        return "bg-gradient-to-r from-orange-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Current":
        return "🚀";
      case "Contract":
        return "💼";
      case "Freelance":
        return "🎯";
      case "Full-time":
        return "🏢";
      default:
        return "⚡";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative pl-20 pb-16 group"
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Timeline Node */}
      <motion.div
        className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-gray-900 ${experience.color} shadow-lg z-10`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        whileHover={{ scale: 1.2 }}
      />

      {/* Timeline Connector */}
      {!isLast && (
        <TimelineConnector isActive={isInView} delay={index * 0.1 + 0.4} />
      )}

      {/* Experience Card */}
      <motion.article
        className={`relative bg-gradient-to-br ${experience.gradient} backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-white/20`}
        whileHover={{ scale: 1.02, y: -4 }}
        role="article"
        aria-labelledby={`experience-${experience.id}-title`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <motion.span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-jetbrains font-bold text-white uppercase tracking-wider ${getTypeColor(
                    experience.type
                  )}`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <span className="mr-1.5">{getTypeIcon(experience.type)}</span>
                  {experience.type}
                </motion.span>
              </div>

              <h3
                id={`experience-${experience.id}-title`}
                className="font-orbitron text-xl lg:text-2xl font-bold text-white mb-1"
              >
                {experience.position}
              </h3>

              <p className="font-inter text-lg text-cyan-400 font-semibold mb-2">
                {experience.company}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-jetbrains">{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-jetbrains">{experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="font-inter text-gray-300 text-sm lg:text-base leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* Achievements */}
        <div className="relative z-10 mb-6">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Key Achievements
          </h4>
          <div className="space-y-3">
            {experience.achievements
              .slice(0, isExpanded ? undefined : 3)
              .map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="font-inter leading-relaxed">
                    {achievement}
                  </span>
                </motion.div>
              ))}
          </div>

          {experience.achievements.length > 3 && (
            <motion.button
              className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-jetbrains uppercase tracking-wider font-medium transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded
                ? "Show Less"
                : `+${experience.achievements.length - 3} More Achievements`}
            </motion.button>
          )}
        </div>

        {/* Metrics */}
        {experience.metrics && (
          <div className="relative z-10 mb-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {experience.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xl mb-2">{metric.icon}</div>
                  <div className="font-orbitron text-lg font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="font-inter text-xs text-gray-400">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="relative z-10">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default ExperienceCard;
