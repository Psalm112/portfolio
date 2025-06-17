export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category:
    | "frontend"
    | "embedded"
    | "blockchain"
    | "robotics"
    | "ml"
    | "fullstack";
  technologies: string[];
  features: string[];
  image?: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideo?: string;
  featured: boolean;
  year: number;
  timeline: string;
  teamSize?: number;
  myRole: string;
  status: "completed" | "in-progress" | "concept";
  challenges: string[];
  solutions: string[];
  metrics?: {
    [key: string]: string;
  };
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "freelance" | "contract";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  projects: string[];
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "embedded" | "tools" | "soft-skills";
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  rating: number;
  date: string;
  projectId?: string;
  linkedin?: string;
  verified: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  projectType: "frontend" | "embedded" | "iot" | "fullstack" | "consulting";
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
  twitterCard: "summary" | "summary_large_image";
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
    powerPreference: "high-performance" | "low-power" | "default";
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

export interface BlueprintTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    paper: string;
    grid: string;
    text: string;
  };
  spacing: {
    unit: number;
    grid: number;
  };
  typography: {
    heading: string;
    body: string;
    mono: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
