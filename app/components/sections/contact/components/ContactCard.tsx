import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactMethod } from "../contactMethods";

interface ContactCardProps {
  contact: ContactMethod;
  index: number;
  isInView: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  index,
  isInView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (contact.type === "email" || contact.type === "phone") {
      handleCopy(contact.value);
    } else {
      window.open(contact.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  return (
    <motion.article
      className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${contact.gradient} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500`}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      aria-label={`${contact.label}: ${contact.value}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      />

      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
        initial={false}
        animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
      />

      <div className="relative z-10 p-6 lg:p-8">
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center mb-6 shadow-lg`}
          initial={{ scale: 0, rotate: -45 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full text-white"
          >
            <path d={contact.icon} />
          </svg>
        </motion.div>

        {/* Content */}
        <div className="space-y-3">
          <motion.h3
            className="font-orbitron text-xl lg:text-2xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            {contact.label}
          </motion.h3>

          <motion.p
            className="font-jetbrains text-sm lg:text-base text-gray-300 break-all"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          >
            {contact.value}
          </motion.p>

          <motion.p
            className="font-inter text-xs lg:text-sm text-gray-400 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
          >
            {contact.description}
          </motion.p>
        </div>

        {/* Action Indicator */}
        <motion.div
          className="absolute top-4 right-4 flex items-center space-x-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
        >
          {isCopied ? (
            <motion.div
              className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <svg
                className="w-3 h-3 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-jetbrains text-xs text-green-400">
                Copied!
              </span>
            </motion.div>
          ) : (
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {contact.type === "email" || contact.type === "phone" ? (
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2V5h-2v6z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ContactCard;
