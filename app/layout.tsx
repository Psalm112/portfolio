import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name | Frontend, Communications & Embedded Systems Engineer",
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
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name | Multi-Disciplinary Engineer",
    description:
      "Expert in Frontend Development, Communications Systems, and Embedded Engineering",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name | Multi-Disciplinary Engineer",
    description:
      "Expert in Frontend Development, Communications Systems, and Embedded Engineering",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#64b5f6",
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
    >
      <body className="font-sans antialiased bg-blueprint-bg text-blueprint-text overflow-x-hidden">
        <div className="fixed inset-0 bg-blueprint-grid bg-blueprint-grid opacity-30 pointer-events-none" />
        <div className="relative z-10">{children}</div>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  );
}
