"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        className="text-3xl font-orbitron text-[#64b5f6]"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
      >
        Get in Touch
      </motion.h2>
      <form className="mt-4 flex flex-col space-y-4 max-w-xl w-full">
        <input
          placeholder="Your Name"
          required
          className="bg-[#1a202c] p-3 rounded text-[#e2e8f0]"
        />
        <input
          placeholder="Your Email"
          required
          type="email"
          className="bg-[#1a202c] p-3 rounded text-[#e2e8f0]"
        />
        <textarea
          placeholder="Your Message"
          required
          className="bg-[#1a202c] p-3 rounded text-[#e2e8f0]"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#64b5f6] text-[#0f1419] rounded p-3 font-orbitron"
        >
          Send Message
        </motion.button>
      </form>
    </section>
  );
}
