import type { Metadata, Viewport } from "next";
import "./globals.css";
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
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}
      suppressHydrationWarning
      style={{
        backgroundColor: "#0f172a",
        backgroundImage:
          "linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%)",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            html, body {
              background-color: #0f172a !important;
              background-image: linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%) !important;
              background-attachment: fixed !important;
              min-height: 100vh !important;
            }
            
            .section-transition {
              background: linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%);
              background-attachment: fixed;
            }
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent white flashes
              document.documentElement.style.backgroundColor = '#0f172a';
              document.documentElement.style.backgroundImage = 'linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%)';
              document.documentElement.style.backgroundAttachment = 'fixed';
              
              // Global WebGL context loss handler
              window.addEventListener('webglcontextlost', function(event) {
                console.warn('WebGL context lost globally, attempting recovery...');
                event.preventDefault();
                window.webglContextLost = true;
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
      <body
        className="relative font-sans antialiased overflow-x-hidden min-h-screen force-bg performance-optimized"
        style={{
          backgroundColor: "#0f172a",
          backgroundImage:
            "linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <ScrollProgress />
        <div className="relative z-10 force-bg min-h-screen">{children}</div>
      </body>
    </html>
  );
}
