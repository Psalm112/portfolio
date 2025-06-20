"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="flex flex-col items-center space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <motion.p
        className="text-sm text-blueprint-muted font-mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL TO EXPLORE
      </motion.p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="cursor-pointer"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <FaChevronDown className="h-6 w-6 text-blueprint-primary" />
      </motion.div>
      <div className="w-px h-16 bg-gradient-to-b from-blueprint-primary to-transparent" />
    </motion.div>
  );
};

export default ScrollIndicator;
