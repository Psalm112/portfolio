"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Load Google Analytics
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_location: window.location.href,
        page_title: document.title,
        send_page_view: false
      });
    `;
    document.head.appendChild(script2);

    // Track page view
    window.gtag("config", GA_TRACKING_ID, {
      page_path: pathname,
    });

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [pathname]);

  return null;
};

// Custom event tracking functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  if (!GA_TRACKING_ID || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackContact = (method: string) => {
  trackEvent("contact", "engagement", method);
};

export const trackProjectView = (projectName: string) => {
  trackEvent("view_project", "project", projectName);
};

export const trackSkillHover = (skillName: string) => {
  trackEvent("hover_skill", "skill", skillName);
};
