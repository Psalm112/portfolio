import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  Orbitron,
} from "next/font/google";
// import ScrollProgress from "./components/ui/ScrollProgress";
// import PerformanceMonitor from "./components/ui/PerformanceMonitor";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent white flashes and optimize initial load
              (function() {
                document.documentElement.style.backgroundColor = '#0f172a';
                document.documentElement.style.backgroundImage = 'linear-gradient(135deg, #1e293b 0%, #000000 50%, #1e293b 100%)';
                document.documentElement.style.backgroundAttachment = 'fixed';
                
                // Optimize smooth scroll with better performance
                if ('scrollBehavior' in document.documentElement.style) {
                  document.documentElement.style.scrollBehavior = 'smooth';
                } else {
                  import('smoothscroll-polyfill').then((smoothscroll) => {
                    smoothscroll.polyfill();
                  }).catch(() => {
                    // Fallback for smooth scroll
                    const originalScrollTo = window.scrollTo;
                    window.scrollTo = function(options) {
                      if (options && options.behavior === 'smooth') {
                        const target = options.top || 0;
                        const start = window.pageYOffset;
                        const distance = target - start;
                        const duration = 800;
                        let startTime = null;
                        
                        function animation(currentTime) {
                          if (startTime === null) startTime = currentTime;
                          const timeElapsed = currentTime - startTime;
                          const run = ease(timeElapsed, start, distance, duration);
                          window.scrollTo(0, run);
                          if (timeElapsed < duration) requestAnimationFrame(animation);
                        }
                        
                        function ease(t, b, c, d) {
                          t /= d / 2;
                          if (t < 1) return c / 2 * t * t + b;
                          t--;
                          return -c / 2 * (t * (t - 2) - 1) + b;
                        }
                        
                        requestAnimationFrame(animation);
                      } else {
                        originalScrollTo.call(this, options);
                      }
                    };
                  });
                }
                
                // Optimized WebGL context management
                let webglContextLost = false;
                let contextLossCount = 0;
                let lastContextLoss = 0;
                
                window.addEventListener('webglcontextlost', function(event) {
                  event.preventDefault();
                  webglContextLost = true;
                  contextLossCount++;
                  lastContextLoss = Date.now();
                  
                  if (contextLossCount > 3) {
                    console.warn('Multiple WebGL context losses detected. Consider reducing graphics quality.');
                  }
                  
                  setTimeout(() => {
                    webglContextLost = false;
                  }, 2000);
                }, { passive: false });
                
                // Performance monitoring
                if ('performance' in window) {
                  window.addEventListener('load', function() {
                    setTimeout(() => {
                      const perfData = performance.getEntriesByType('navigation')[0];
                      if (perfData && perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                        console.warn('Page load time is slow. Consider optimizing assets.');
                      }
                    }, 100);
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="relative font-sans antialiased overflow-x-hidden min-h-screen performance-optimized">
        {/* <ScrollProgress /> */}
        {/* <PerformanceMonitor /> */}
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
