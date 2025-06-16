export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'frontend' | 'embedded' | 'iot' | 'fullstack';
  tags: string[];
  technologies: string[];
  image: string;
  images: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
  completed: boolean;
  year: number;
  duration: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'contract' | 'freelance' | 'startup';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  projects: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'embedded' | 'tools' | 'soft-skills';
  level: number; // 1-100
  icon: string;
  description: string;
  experience: string;
  projects: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCourses: string[];
  projects: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  projectType: 'frontend' | 'embedded' | 'iot' | 'fullstack' | 'consulting';
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  ease: string;
  stagger?: number;
}

export interface ThreeScene {
  camera: {
    position: [number, number, number];
    fov: number;
    near: number;
    far: number;
  };
  lights: {
    ambient: {
      intensity: number;
      color: string;
    };
    directional: {
      intensity: number;
      color: string;
      position: [number, number, number];
    };
    point?: {
      intensity: number;
      color: string;
      position: [number, number, number];
    }[];
  };
  performance: {
    pixelRatio: number;
    antialias: boolean;
    alpha: boolean;
    powerPreference: 'high-performance' | 'low-power' | 'default';
  };
}

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fps: number; // Frames per second
  memory: number; // Memory usage
}