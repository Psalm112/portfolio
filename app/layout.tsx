import type { Metadata, Viewport } from "next";
// import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  Orbitron,
} from "next/font/google";
import ScrollProgress from "./components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Samuel Adebola Oyenuga | Frontend, Communications & Embedded Systems Engineer",
  description:
    "Expert Frontend Engineer specializing in Next.js, React, and modern web technologies. Communications Engineer with expertise in signal processing and network systems. Embedded Systems Engineer creating innovative IoT and robotics solutions.",
  keywords: [
    "Frontend Engineer",
    "Communications Engineer",
    "Embedded Systems",
    "Next.js",
    "React",
    "TypeScript",
    "Robotics",
    "IoT",
  ],
  authors: [{ name: "Samuel Adebola Oyenuga" }],
  openGraph: {
    title: "Samuel Adebola Oyenuga | Multi-Disciplinary Engineer",
    description:
      "Expert in Frontend Development, Communications Systems, and Embedded Engineering",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Adebola Oyenuga | Multi-Disciplinary Engineer",
    description:
      "Expert in Frontend Development, Communications Systems, and Embedded Engineering",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// export const themeColor = "#64b5f6";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}  ${orbitron.variable} bg-gradient-to-br from-gray-900 via-black to-gray-800`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global WebGL context loss handler
              window.addEventListener('webglcontextlost', function(event) {
                console.warn('WebGL context lost globally, attempting recovery...');
                event.preventDefault();
                
                // Set a flag for components to check
                window.webglContextLost = true;
                
                // Attempt recovery after a delay
                setTimeout(() => {
                  window.webglContextLost = false;
                  console.log('WebGL context recovery attempted');
                }, 2000);
              });
              
              // Prevent multiple rapid context losses
              let contextLossCount = 0;
              let lastContextLoss = 0;
              
              window.addEventListener('webglcontextlost', function(event) {
                const now = Date.now();
                if (now - lastContextLoss < 5000) {
                  contextLossCount++;
                } else {
                  contextLossCount = 1;
                }
                lastContextLoss = now;
                
                if (contextLossCount > 3) {
                  console.error('Multiple WebGL context losses detected. Consider reducing graphics quality.');
                }
              });
            `,
          }}
        />
      </head>
      <body className="relative font-sans antialiased overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <ScrollProgress />
        <div className="relative z-10">{children}</div>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  );
}
