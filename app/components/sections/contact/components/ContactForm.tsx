import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactContent } from "../data/content";

interface ContactFormProps {
  isInView: boolean;
  content: ContactContent["contactForm"];
}

const ContactForm: React.FC<ContactFormProps> = ({ isInView, content }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-12"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="font-orbitron text-2xl lg:text-3xl font-bold text-white mb-4">
          {content.formTitle}
        </h3>
        <p className="font-inter text-gray-300 max-w-2xl mx-auto">
          {content.formDescription}
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="font-jetbrains text-sm font-medium text-gray-300"
            >
              {content.fields.name.label}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              placeholder={content.fields.name.placeholder}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="font-jetbrains text-sm font-medium text-gray-300"
            >
              {content.fields.email.label}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              placeholder={content.fields.email.placeholder}
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="font-jetbrains text-sm font-medium text-gray-300"
          >
            {content.fields.subject.label}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            placeholder={content.fields.subject.placeholder}
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="font-jetbrains text-sm font-medium text-gray-300"
          >
            {content.fields.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none"
            placeholder={content.fields.message.placeholder}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-orbitron font-semibold text-white shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{content.submitButton.loading}</span>
            </div>
          ) : (
            content.submitButton.default
          )}
        </motion.button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <motion.div
            className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-jetbrains text-green-400">
                {content.messages.success}
              </span>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-jetbrains text-red-400">
                {content.messages.error}
              </span>
            </div>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;
