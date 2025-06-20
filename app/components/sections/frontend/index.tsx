"use client";

import { motion } from "framer-motion";

export default function Frontend() {
  return (
    <section
      id="frontend"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        className="text-3xl font-orbitron text-[#64b5f6]"
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        Frontend Engineering
      </motion.h2>
      <motion.p
        className="mt-3 max-w-3xl text-gray-300 text-center"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
      >
        Deconstruction and assembly of a modern browser layout. Combining
        precision engineering, Next.js, TypeScript, and Framer Motion.
      </motion.p>
      <motion.img
        src="/sketches/frontend-wireframe.png"
        alt="Frontend Architecture Diagram"
        className="w-[600px] rounded-xl shadow-xl mt-8"
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        initial={{ scale: 0.95 }}
        transition={{ duration: 0.5 }}
      />
    </section>
  );
}
