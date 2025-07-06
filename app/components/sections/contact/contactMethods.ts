export interface ContactMethod {
  id: string;
  type: "email" | "phone" | "linkedin" | "github" | "website" | "location";
  label: string;
  value: string;
  href: string;
  icon: string; // SVG path data
  color: string;
  gradient: string;
  description: string;
}

export const contactMethods: ContactMethod[] = [
  {
    id: "email",
    type: "email",
    label: "Email",
    value: "samueladebolaoyenuga@gmail.com",
    href: "mailto:samueladebolaoyenuga@gmail.com",
    icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    color: "from-cyan-500 to-blue-600",
    gradient: "from-cyan-900/20 via-blue-800/20 to-indigo-900/20",
    description: "Click to copy email address",
  },
  {
    id: "phone",
    type: "phone",
    label: "Phone",
    value: "+234 913 657 7132",
    href: "tel:+2349136577132",
    icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z",
    color: "from-green-500 to-emerald-600",
    gradient: "from-green-900/20 via-emerald-800/20 to-teal-900/20",
    description: "Click to copy phone number",
  },
  {
    id: "linkedin",
    type: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/samuel-oyenuga",
    href: "https://www.linkedin.com/in/samuel-oyenuga-b90aaa1b3/",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    color: "from-blue-600 to-indigo-700",
    gradient: "from-blue-900/20 via-indigo-800/20 to-purple-900/20",
    description: "Connect with me professionally",
  },
  //   {
  //     id: "github",
  //     type: "github",
  //     label: "GitHub",
  //     value: "github.com/Psalm112",
  //     href: "https://github.com/Psalm112",
  //     icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  //     color: "from-gray-600 to-gray-800",
  //     gradient: "from-gray-900/20 via-gray-800/20 to-black/20",
  //     description: "code repositories",
  //   },
  //   {
  //     id: "website",
  //     type: "website",
  //     label: "Portfolio",
  //     value: "samueladebola.vercel.app",
  //     href: "https://samueladebola.vercel.app",
  //     icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  //     color: "from-purple-500 to-pink-600",
  //     gradient: "from-purple-900/20 via-pink-800/20 to-rose-900/20",
  //     description: "Explore my portfolio website",
  //   },
  //   {
  //     id: "location",
  //     type: "location",
  //     label: "Location",
  //     value: "Lagos, Nigeria",
  //     href: "https://maps.google.com/?q=Lagos,Nigeria",
  //     icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  //     color: "from-orange-500 to-red-600",
  //     gradient: "from-orange-900/20 via-red-800/20 to-pink-900/20",
  //     description: "Based in Lagos, Nigeria",
  //   },
];
