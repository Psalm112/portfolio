"use client";

import { motion } from "framer-motion";

export default function Communication() {
  return (
    <section
      id="communication"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        className="text-3xl font-orbitron text-[#64b5f6]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Communication Engineering
      </motion.h2>
      <motion.p
        className="mt-3 max-w-3xl text-gray-300 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Designing and optimizing signal towers, antenna design, and RF
        engineering.
      </motion.p>
      <motion.img
        src="/sketches/signal-tower.png"
        alt="Signal Tower Diagram"
        className="w-[500px] rounded-xl shadow-xl mt-8"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
    </section>
  );
}
