"use client";

import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    { title: "Project A", description: "Detailed description for Project A." },
    { title: "Project B", description: "Detailed description for Project B." },
    { title: "Project C", description: "Detailed description for Project C." },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        className="text-3xl font-orbitron text-[#64b5f6]"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
      >
        Projects
      </motion.h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="bg-[#1a202c] rounded-lg p-4 text-[#e2e8f0]"
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="font-orbitron text-[#64b5f6]">{project.title}</h3>
            <p className="text-gray-300">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
