"use client";

import { motion } from "framer-motion";

const experience = [
  {
    year: "2024",
    title: "Lead Frontend Developer",
    description: "Developed interactive UIs…",
  },
  {
    year: "2022",
    title: "Communication Systems Lead",
    description: "Designed RF antennas…",
  },
  {
    year: "2020",
    title: "Robotics/Embedded Systems Eng.",
    description: "Built microcontroller robots…",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        className="text-3xl font-orbitron text-[#64b5f6]"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
      >
        Experience Timeline
      </motion.h2>
      <div className="mt-8 flex flex-col space-y-4 max-w-2xl">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            className="bg-[#1a202c] rounded-lg p-4 text-[#e2e8f0]"
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            initial={{ opacity: 0, x: -30 }}
            transition={{ delay: i * 0.2 }}
          >
            <span className="font-jetbrains text-[#64b5f6]">{exp.year}</span>
            <h3 className="font-orbitron">{exp.title}</h3>
            <p className="text-gray-300">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
