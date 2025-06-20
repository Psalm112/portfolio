/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: "#0f1419",
          primary: "#64b5f6",
          secondary: "#81c784",
          accent: "#ffb74d",
          lines: "#2d3748",
          text: "#e2e8f0",
          muted: "#94a3b8",
          dark: "#1e293b",
          grid: "#1a365d",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
        tech: ["Orbitron", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        circuit: "circuit 3s ease-in-out infinite",
        scan: "scan 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 5px #64b5f6, 0 0 10px #64b5f6, 0 0 15px #64b5f6",
          },
          "100%": {
            boxShadow: "0 0 10px #64b5f6, 0 0 20px #64b5f6, 0 0 30px #64b5f6",
          },
        },
        circuit: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },
      backgroundImage: {
        "blueprint-grid": `
          radial-gradient(circle at 1px 1px, rgba(100, 181, 246, 0.3) 1px, transparent 0),
          linear-gradient(rgba(100, 181, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 181, 246, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "blueprint-grid": "20px 20px, 20px 20px, 20px 20px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
