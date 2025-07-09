import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  Orbitron,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
  preload: true,
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
  themeColor: "#0f172a",
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
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-navbutton-color" content="#0f172a" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Prevent FOUC and optimize initial render
                const style = document.createElement('style');
                style.textContent = \`
                  html, body {
                    background-color: #0f172a !important;
                    background-image: linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%) !important;
                    background-attachment: fixed !important;
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    overflow-x: hidden;
                  }
                  
                  /* Preload critical styles */
                  .performance-optimized {
                    contain: layout style paint;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    will-change: transform;
                  }
                  
                  /* Smooth scroll optimization */
                  html {
                    scroll-behavior: smooth;
                  }
                  
                  @media (prefers-reduced-motion: reduce) {
                    html {
                      scroll-behavior: auto;
                    }
                  }
                \`;
                document.head.appendChild(style);
                
                // Optimize WebGL performance
                let webglContextLost = false;
                window.addEventListener('webglcontextlost', function(e) {
                  e.preventDefault();
                  webglContextLost = true;
                  setTimeout(() => { webglContextLost = false; }, 2000);
                }, { passive: false });
                
                // Performance monitoring
                if ('performance' in window) {
                  window.addEventListener('load', function() {
                    requestIdleCallback(() => {
                      const perfData = performance.getEntriesByType('navigation')[0];
                      if (perfData?.loadEventEnd - perfData?.loadEventStart > 3000) {
                        console.warn('Consider optimizing for better performance');
                      }
                    });
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="relative font-sans antialiased overflow-x-hidden min-h-screen performance-optimized">
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
