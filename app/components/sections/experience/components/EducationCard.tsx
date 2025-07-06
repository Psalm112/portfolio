import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { EducationItem } from "../data/experiences";

const EducationCard = ({
  education,
  index,
}: {
  education: EducationItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      <motion.article
        className={`relative bg-gradient-to-br from-indigo-900/20 via-purple-800/20 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:border-white/20`}
        whileHover={{ scale: 1.02, y: -4 }}
        role="article"
        aria-labelledby={`education-${education.id}-title`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h3
                id={`education-${education.id}-title`}
                className="font-orbitron text-xl lg:text-2xl font-bold text-white"
              >
                {education.degree}
              </h3>
              <p className="font-inter text-cyan-400 font-semibold">
                {education.field}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-inter text-lg text-purple-300 font-semibold mb-2">
              {education.institution}
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
                <span className="font-jetbrains">{education.period}</span>
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
                <span className="font-jetbrains">{education.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-jetbrains">CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="relative z-10 mb-6">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Academic Achievements
          </h4>
          <div className="space-y-2">
            {education.achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="font-inter leading-relaxed">
                  {achievement}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Relevant Courses */}
        <div className="relative z-10">
          <h4 className="font-orbitron text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Relevant Coursework
          </h4>
          <div className="flex flex-wrap gap-2">
            {education.relevantCourses.map((course, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-jetbrains text-gray-300 border border-white/10 hover:border-purple-400/50 hover:text-purple-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default EducationCard;
