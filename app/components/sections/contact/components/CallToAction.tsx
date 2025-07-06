import React from "react";
import { motion } from "framer-motion";
import { ContactContent } from "../data/content";

interface CallToActionProps {
  content: ContactContent["callToAction"];
}

const CallToAction: React.FC<CallToActionProps> = ({ content }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-green-500/20 rounded-2xl blur-xl" />
        <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-12 max-w-4xl mx-auto">
          <motion.h3
            className="font-orbitron text-2xl lg:text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {content.title}
          </motion.h3>

          <motion.p
            className="font-inter text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {content.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.a
              href={content.primaryButton.href}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-xl font-orbitron font-semibold text-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label={content.primaryButton.ariaLabel}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>{content.primaryButton.text}</span>
              </span>
            </motion.a>

            <motion.a
              href={content.secondaryButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-cyan-400 rounded-xl font-orbitron font-semibold text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-400/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label={content.secondaryButton.ariaLabel}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>{content.secondaryButton.text}</span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CallToAction;
