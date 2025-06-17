import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "sarah-johnson-cto",
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "TechFlow Solutions",
    image: "/images/testimonials/sarah-johnson.jpg",
    testimonial:
      "Samuel's expertise in both frontend development and embedded systems is exceptional. His blockchain-IoT framework delivered exactly what we needed - secure, scalable, and energy-efficient. The 95% energy reduction compared to traditional solutions was a game-changer for our IoT deployment.",
    rating: 5,
    date: "2024-02",
    projectId: "blockchain-iot-framework",
    linkedin: "https://linkedin.com/in/sarah-johnson-cto",
    verified: true,
  },
  {
    id: "michael-chen-pm",
    name: "Michael Chen",
    role: "Product Manager",
    company: "LogiTech Warehouse Solutions",
    image: "/images/testimonials/michael-chen.jpg",
    testimonial:
      "The warehouse management system Samuel developed using Graph Neural Networks revolutionized our operations. The 40% reduction in travel time and intelligent pathfinding based on item fragility saved us thousands in operational costs. His ability to combine traditional algorithms with modern ML is impressive.",
    rating: 5,
    date: "2023-11",
    projectId: "warehouse-management-gnn",
    linkedin: "https://linkedin.com/in/michael-chen-pm",
    verified: true,
  },
  {
    id: "dr-amanda-rodriguez",
    name: "Dr. Amanda Rodriguez",
    role: "Research Director",
    company: "IoT Innovation Lab",
    image: "/images/testimonials/amanda-rodriguez.jpg",
    testimonial:
      "Working with Samuel on our autonomous robotics project was a pleasure. His coffee delivery robot with multi-modal navigation capabilities exceeded all expectations. The 95% human tracking accuracy and seamless mode switching demonstrated his deep understanding of both hardware and software integration.",
    rating: 5,
    date: "2023-09",
    projectId: "coffee-delivery-robot",
    linkedin: "https://linkedin.com/in/dr-amanda-rodriguez",
    verified: true,
  },
  {
    id: "james-wilson-ceo",
    name: "James Wilson",
    role: "CEO",
    company: "Smart Home Innovations",
    image: "/images/testimonials/james-wilson.jpg",
    testimonial:
      "Samuel delivered a comprehensive smart home security system that perfectly balanced functionality with user experience. The real-time monitoring, automatic access control, and mobile integration were exactly what our customers needed. His attention to detail and security best practices are outstanding.",
    rating: 5,
    date: "2023-07",
    projectId: "smart-home-security",
    linkedin: "https://linkedin.com/in/james-wilson-ceo",
    verified: true,
  },
  {
    id: "lisa-thompson-lead",
    name: "Lisa Thompson",
    role: "Lead Frontend Developer",
    company: "Digital Dynamics",
    image: "/images/testimonials/lisa-thompson.jpg",
    testimonial:
      "Samuel's frontend development skills are top-notch. His React applications are not only visually stunning but also incredibly performant. The 60% performance improvement he achieved on our main application through optimization techniques was remarkable. He's also an excellent mentor to junior developers.",
    rating: 5,
    date: "2024-01",
    linkedin: "https://linkedin.com/in/lisa-thompson-frontend",
    verified: true,
  },
  {
    id: "robert-kim-architect",
    name: "Robert Kim",
    role: "Solutions Architect",
    company: "CloudTech Systems",
    image: "/images/testimonials/robert-kim.jpg",
    testimonial:
      "Samuel's ability to bridge the gap between frontend and embedded systems is unique in the industry. His understanding of both domains allows him to create solutions that are not only technically sound but also user-friendly. The blockchain integration work he did for our IoT platform was exceptional.",
    rating: 5,
    date: "2023-12",
    linkedin: "https://linkedin.com/in/robert-kim-architect",
    verified: true,
  },
  {
    id: "maria-gonzalez-researcher",
    name: "Dr. Maria Gonzalez",
    role: "Senior Research Engineer",
    company: "Federal University of Technology, Akure",
    image: "/images/testimonials/maria-gonzalez.jpg",
    testimonial:
      "Samuel's research contribution to our blockchain-IoT communication framework was outstanding. His work on ZK-Rollups and Verkle Trees implementation helped us achieve breakthrough results in energy efficiency and scalability. His technical writing and research methodology are exemplary.",
    rating: 5,
    date: "2023-06",
    projectId: "blockchain-iot-framework",
    linkedin: "https://linkedin.com/in/dr-maria-gonzalez",
    verified: true,
  },
  {
    id: "david-park-startup",
    name: "David Park",
    role: "Founder",
    company: "RoboTech Startup",
    image: "/images/testimonials/david-park.jpg",
    testimonial:
      "As a startup, we needed someone who could wear multiple hats. Samuel delivered on all fronts - from embedded systems programming to web application development. His autonomous navigation algorithms and sensor fusion techniques gave our robot the intelligence it needed to succeed in the market.",
    rating: 5,
    date: "2023-04",
    linkedin: "https://linkedin.com/in/david-park-robotech",
    verified: true,
  },
];

export const getFeaturedTestimonials = () =>
  testimonials.filter((testimonial) => testimonial.rating >= 5).slice(0, 6);

export const getTestimonialsByProject = (projectId: string) =>
  testimonials.filter((testimonial) => testimonial.projectId === projectId);

export const getVerifiedTestimonials = () =>
  testimonials.filter((testimonial) => testimonial.verified);

export const getTestimonialById = (id: string) =>
  testimonials.find((testimonial) => testimonial.id === id);

export const getRecentTestimonials = (count: number = 4) =>
  testimonials
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

export const getAverageRating = () => {
  const total = testimonials.reduce(
    (sum, testimonial) => sum + testimonial.rating,
    0,
  );
  return (total / testimonials.length).toFixed(1);
};
