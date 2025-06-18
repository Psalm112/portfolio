"use client";

import { useEffect } from "react";

export const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Samuel Oyenuga",
      jobTitle: [
        "Frontend Engineer",
        "Embedded Systems Engineer",
        "Communications Engineer",
      ],
      description:
        "Expert Frontend Engineer and Communications/Embedded Systems specialist. Creating innovative solutions with React, Next.js, IoT, and Blockchain technologies.",
      url: "https://samueloyenuga.dev",
      sameAs: [
        "https://linkedin.com/in/samueloyenuga",
        "https://github.com/samueloyenuga",
        "https://twitter.com/samueloyenuga",
      ],
      knowsAbout: [
        "Frontend Development",
        "React",
        "Next.js",
        "TypeScript",
        "Embedded Systems",
        "IoT",
        "Arduino",
        "Robotics",
        "Communications Engineering",
        "Blockchain",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Your University Name",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Frontend & Embedded Systems Engineer",
        occupationLocation: {
          "@type": "Place",
          name: "Your Location",
        },
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Node.js",
          "Arduino",
          "Raspberry Pi",
          "C/C++",
          "Python",
          "IoT Development",
          "Circuit Design",
          "PCB Design",
          "Robotics",
          "Machine Learning",
        ],
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Frontend Development",
            description:
              "Custom web application development using modern technologies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Embedded Systems Development",
            description: "IoT solutions, robotics, and embedded system design",
          },
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};
