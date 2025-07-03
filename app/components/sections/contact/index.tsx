import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactMethod {
  id: string;
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'website' | 'location';
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  description: string;
}

interface FloatingShape {
  id: string;
  type: 'cube' | 'sphere' | 'pyramid' | 'torus';
  size: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  color: string;
  opacity: number;
  duration: number;
}

// Floating 3D Shapes Component
const FloatingShapes = () => {
  const shapes: FloatingShape[] = [
    {
      id: 'cube-1',
      type: 'cube',
      size: 60,
      position: { x: 10, y: 20, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      color: 'from-cyan-500/20 to-blue-600/20',
      opacity: 0.6,
      duration: 8
    },
    {
      id: 'sphere-1',
      type: 'sphere',
      size: 40,
      position: { x: 85, y: 60, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      color: 'from-purple-500/20 to-pink-600/20',
      opacity: 0.5,
      duration: 10
    },
    {
      id: 'pyramid-1',
      type: 'pyramid',
      size: 50,
      position: { x: 75, y: 25, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      color: 'from-green-500/20 to-emerald-600/20',
      opacity: 0.4,
      duration: 12
    },
    {
      id: 'torus-1',
      type: 'torus',
      size: 35,
      position: { x: 20, y: 75, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      color: 'from-orange-500/20 to-red-600/20',
      opacity: 0.3,
      duration: 15
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className={`absolute bg-gradient-to-br ${shape.color} rounded-lg backdrop-blur-sm`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.position.x}%`,
            top: `${shape.position.y}%`,
            opacity: shape.opacity,
          }}
          initial={{
            rotate: shape.rotation.z,
            scale: 0
          }}
          animate={{
            rotate: [shape.rotation.z, shape.rotation.z + 360],
            scale: [0, 1, 1, 0.8, 1],
            y: [0, -20, 0, 10, 0],
            x: [0, 10, 0, -10, 0]
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
      ))}
    </div>
  );
};

// Contact Method Card Component
const ContactCard = ({ 
  contact, 
  index, 
  isInView 
}: { 
  contact: ContactMethod; 
  index: number; 
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (contact.type === 'email' || contact.type === 'phone') {
      handleCopy(contact.value);
    } else {
      window.open(contact.href, '_blank', 'noopener,noreferrer');
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
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
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
          <div className="text-white text-2xl lg:text-3xl">
            {contact.icon}
          </div>
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
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-jetbrains text-xs text-green-400">Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {contact.type === 'email' || contact.type === 'phone' ? (
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2V5h-2v6z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};

// Contact Form Component
const ContactForm = ({ isInView }: { isInView: boolean }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
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
          Let's Build Something Amazing Together
        </h3>
        <p className="font-inter text-gray-300 max-w-2xl mx-auto">
          Have a project in mind? Whether it's a cutting-edge web application, IoT system, or blockchain solution, I'd love to hear from you.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <label htmlFor="name" className="block font-jetbrains text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-inter"
              placeholder="Enter your full name"
              aria-describedby="name-error"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label htmlFor="email" className="block font-jetbrains text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-inter"
              placeholder="your.email@example.com"
              aria-describedby="email-error"
            />
          </motion.div>
        </div>

        {/* Subject */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <label htmlFor="subject" className="block font-jetbrains text-sm font-medium text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 font-inter"
            placeholder="What's this about?"
            aria-describedby="subject-error"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <label htmlFor="message" className="block font-jetbrains text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none font-inter"
            placeholder="Tell me about your project, ideas, or just say hello!"
            aria-describedby="message-error"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`
              relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 
              hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700
              rounded-lg font-orbitron font-semibold text-white shadow-lg 
              transition-all duration-300 min-w-[200px] overflow-hidden
              ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : submitStatus === 'success' ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Message Sent!</span>
              </div>
            ) : (
              <span>Send Message</span>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

// Main Contact Component
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      value: 'samueladebolaoyenuga@gmail.com',
      href: 'mailto:samueladebolaoyenuga@gmail.com',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: 'from-cyan-500 to-blue-600',
      gradient: 'from-cyan-900/20 via-blue-800/20 to-indigo-900/20',
      description: 'Click to copy email address'
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone',
      value: '+234 913 657 7132',
      href: 'tel:+2349136577132',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z"/>
        </svg>
      ),
      color: 'from-green-500 to-emerald-600',
      gradient: 'from-green-900/20 via-emerald-800/20 to-teal-900/20',
      description: 'Click to copy phone number'
    },
    {
      id: 'linkedin',
      type: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/samuel-oyenuga',
      href: 'https://linkedin.com/in/samuel-oyenuga',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: 'from-blue-600 to-indigo-700',
      gradient: 'from-blue-900/20 via-indigo-800/20 to-purple-900/20',
      description: 'Connect with me professionally'
    },
    {
      id: 'github',
      type: 'github',
      label: 'GitHub',
      value: 'github.com/samueladebola',
      href: 'https://github.com/samueladebola',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'from-gray-600 to-gray-800',
      gradient: 'from-gray-900/20 via-gray-800/20 to-black/20',
      description: 'View my code repositories'
    },
    {
      id: 'website',
      type: 'website',
      label: 'Portfolio',
      value: 'samueladebola.vercel.app',
      href: 'https://samueladebola.vercel.app',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      color: 'from-purple-500 to-pink-600',
      gradient: 'from-purple-900/20 via-pink-800/20 to-rose-900/20',
      description: 'Explore my portfolio website'
    },
    {
      id: 'location',
      type: 'location',
      label: 'Location',
      value: 'Lagos, Nigeria',
      href: 'https://maps.google.com/?q=Lagos,Nigeria',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">