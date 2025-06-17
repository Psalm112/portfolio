import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnimationProvider } from "@/context/AnimationContext";
import { PerformanceProvider } from "@/context/PerformanceContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary/ErrorBoundary";
import { SEOHead } from "@/components/common/SEO/SEOHead";
import { StructuredData } from "@/components/common/SEO/StructuredData";
import { GoogleAnalytics } from "@/components/common/Analytics/GoogleAnalytics";
import { PerformanceMonitor } from "@/components/common/Analytics/PerformanceMonitor";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samuel Oyenuga | Frontend & Embedded Systems Engineer",
  description:
    "Expert Frontend Engineer and Communications/Embedded Systems specialist. Creating innovative solutions with React, Next.js, IoT, and Blockchain technologies.",
  keywords: [
    "Frontend Engineer",
    "Embedded Systems",
    "IoT",
    "Blockchain",
    "React",
    "Next.js",
    "Arduino",
    "Robotics",
  ],
  authors: [{ name: "Samuel Oyenuga" }],
  creator: "Samuel Oyenuga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samueloyenuga.dev",
    title: "Samuel Oyenuga | Frontend & Embedded Systems Engineer",
    description:
      "Expert Frontend Engineer and Communications/Embedded Systems specialist.",
    siteName: "Samuel Oyenuga Portfolio",
    images: [
      {
        url: "/images/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samuel Oyenuga Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Oyenuga | Frontend & Embedded Systems Engineer",
    description:
      "Expert Frontend Engineer and Communications/Embedded Systems specialist.",
    images: ["/images/seo/twitter-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <head>
        <SEOHead />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-white overflow-x-hidden">
        <ErrorBoundary>
          <ThemeProvider>
            <PerformanceProvider>
              <AnimationProvider>
                <div className="relative min-h-screen bg-blueprint-grid bg-[length:100px_100px]">
                  {children}
                </div>
                <PerformanceMonitor />
                <GoogleAnalytics />
              </AnimationProvider>
            </PerformanceProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <StructuredData />
      </body>
    </html>
  );
}
