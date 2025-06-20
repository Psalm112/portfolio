"use client";

import { motion } from "framer-motion";

export default function EmbeddedSection() {
  return (
    <section
      id="embedded"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        className="text-3xl font-orbitron text-[#64b5f6]"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
      >
        Embedded Systems & Robotics
      </motion.h2>
      <motion.p
        className="mt-3 max-w-3xl text-gray-300 text-center"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
      >
        Robot disassembly and reassembly, microcontroller design, PCB layout,
        and sensor integration.
      </motion.p>
      <motion.img
        src="/sketches/robot-disassembly.png"
        alt="Robot Disassembly Diagram"
        className="w-[600px] rounded-xl shadow-xl mt-8"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
    </section>
  );
}
