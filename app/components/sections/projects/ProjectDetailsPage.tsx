
"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float, 
  Text,
  Html
} from '@react-three/drei';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ProjectType } from './data/projects';
import { projectDetails, ProjectDetailType } from './data/projectDetails';
import Link from 'next/link';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as THREE from 'three';

// Enhanced 3D Hero Section
const ProjectHero3D = ({ project }: { project: ProjectType }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Smooth mouse interaction
      groupRef.current.rotation.y += mousePosition.x * 0.01;
      groupRef.current.rotation.x += mousePosition.y * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
        {/* Dynamic 3D representation based on project type */}
        {project.type === 'robot' && (
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial 
              color={project.accentColor} 
              metalness={0.8} 
              roughness={0.2}
              emissive={project.accentColor}
              emissiveIntensity={0.1}
            />
          </mesh>
        )}
        
        {project.type === 'webapp' && (
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
            <meshStandardMaterial 
              color={project.accentColor} 
              metalness={0.9} 
              roughness={0.1}
            />
          </mesh>
        )}
        
        {/* Floating particles around the main object */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Float key={i} speed={2 + i * 0.1}>
            <mesh
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color={project.accentColor}
                emissive={project.accentColor}
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        ))}
      </Float>
    </group>
  );
};

// Project Overview Section
const ProjectOverview = ({ 
  project, 
  details 
}: { 
  project: ProjectType; 
  details: ProjectDetailType; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-orbitron text-3xl lg:text-4xl font-bold text-white mb-6">
              Project Overview
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-jetbrains text-cyan-400 text-sm uppercase tracking-wider mb-2">
                  Challenge
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {details.overview.challenge}
                </p>
              </div>
              
              <div>
                <h3 className="font-jetbrains text-cyan-400 text-sm uppercase tracking-wider mb-2">
                  Solution
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {details.overview.solution}
                </p>
              </div>
              
              <div>
                <h3 className="font-jetbrains text-cyan-400 text-sm uppercase tracking-wider mb-2">
                  Impact
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {details.overview.impact}
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h4 className="font-jetbrains text-cyan-400 text-sm uppercase tracking-wider mb-2">
                  Duration
                </h4>
                <p className="text-white font-orbitron text-xl">
                  {details.overview.duration}
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h4 className="font-jetbrains text-cyan-400 text-sm uppercase tracking-wider mb-2">
                  Team Size
                </h4>
                <p className="text-white font-orbitron text-xl">
                  {details.overview.team}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h4 className="font-jetbrains text-cyan-400 text-sm uppercase tracking-wider mb-2">
                My Role
              </h4>
              <p className="text-white font-orbitron text-lg">
                {details.overview.role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Case Study Section
const CaseStudySection = ({ details }: { details: ProjectDetailType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl lg:text-4xl font-bold text-white mb-6">
            Case Study
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Deep dive into the methodology, challenges, and solutions
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-2xl p-8 border border-red-500/20"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              Problem Statement
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {details.caseStudy.problemStatement}
            </p>
          </motion.div>

          {/* Research Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 border border-blue-500/20"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
              Research Process
            </h3>
            <div className="space-y-4">
              {details.caseStudy.researchProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Challenges and Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
              Challenges & Solutions
            </h3>
            <div className="space-y-8">
              {details.caseStudy.challengesAndSolutions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="bg-black/30 rounded-lg p-6 border border-gray-700"
                >
                  <div className="mb-4">
                    <h4 className="font-jetbrains text-red-400 text-sm uppercase tracking-wider mb-2">
                      Challenge
                    </h4>
                    <p className="text-gray-300">{item.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-jetbrains text-green-400 text-sm uppercase tracking-wider mb-2">
                      Solution
                    </h4>
                    <p className="text-gray-300">{item.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-jetbrains text-blue-400 text-sm uppercase tracking-wider mb-2">
                      Outcome
                    </h4>
                    <p className="text-gray-300">{item.outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Results Section
const ResultsSection = ({ details }: { details: ProjectDetailType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl lg:text-4xl font-bold text-white mb-6">
            Results & Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Measurable outcomes and performance improvements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {details.caseStudy.results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300"
            >
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">
                {result.metric}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Before</span>
                  <span className="text-red-400 font-jetbrains">{result.before}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">After</span>
                  <span className="text-green-400 font-jetbrains">{result.after}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Improvement</span>
                    <span className="text-cyan-400 font-jetbrains font-bold text-lg">
                      {result.improvement}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Technical Details Section
const TechnicalDetailsSection = ({ details }: { details: ProjectDetailType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'architecture', label: 'Architecture' },
    { id: 'code', label: 'Code Examples' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl lg:text-4xl font-bold text-white mb-6">
            Technical Implementation
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Deep dive into the technical architecture and implementation details
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-jetbrains text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Architecture Tab */}
          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700"
            >
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
                System Architecture
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {details.technicalDetails.architecture}
              </p>
            </motion.div>
          )}

          {/* Code Examples Tab */}
          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="