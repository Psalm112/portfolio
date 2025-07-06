export interface ContactContent {
  header: {
    subtitle: string;
    title: string;
    titleHighlight1: string;
    titleHighlight2: string;
    description: string;
  };
  contactMethods: {
    subtitle: string;
    title: string;
    description: string;
  };
  contactForm: {
    subtitle: string;
    title: string;
    description: string;
    formTitle: string;
    formDescription: string;
    fields: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
    };
    submitButton: {
      default: string;
      loading: string;
    };
    messages: {
      success: string;
      error: string;
    };
  };
  stats: {
    title?: string;
    description?: string;
  };
  callToAction: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
      ariaLabel: string;
    };
    secondaryButton: {
      text: string;
      href: string;
      ariaLabel: string;
    };
  };
  footer: {
    copyright: string;
    availability: string;
  };
}

export const contactContent: ContactContent = {
  header: {
    subtitle: "Get In Touch",
    title: "Let's Create",
    titleHighlight1: "Let's Create",
    titleHighlight2: "Together",
    description:
      "Ready to transform your ideas into reality? Whether you need a cutting-edge web application, innovative IoT solution, or blockchain integration, I'm here to bring your vision to life with precision, creativity, and technical excellence.",
  },
  contactMethods: {
    subtitle: "Multiple Ways to Connect",
    title: "Choose Your Preferred Method",
    description:
      "From direct communication to professional networking, here are all the ways you can reach out to me.",
  },
  contactForm: {
    subtitle: "Direct Communication",
    title: "Send Me a Message",
    description:
      "Prefer to reach out directly? Use the form below to send me a detailed message about your project or inquiry.",
    formTitle: "Let's Build Something Amazing Together",
    formDescription:
      "Have a project in mind? Whether it's a cutting-edge web application, IoT system, or blockchain solution, I'd love to hear from you.",
    fields: {
      name: {
        label: "Name *",
        placeholder: "Your full name",
      },
      email: {
        label: "Email *",
        placeholder: "your.email@example.com",
      },
      subject: {
        label: "Subject *",
        placeholder: "What's this about?",
      },
      message: {
        label: "Message *",
        placeholder:
          "Tell me about your project, timeline, and any specific requirements...",
      },
    },
    submitButton: {
      default: "Send Message",
      loading: "Sending Message...",
    },
    messages: {
      success: "Message sent successfully! I'll get back to you soon.",
      error: "Something went wrong. Please try again or contact me directly.",
    },
  },
  stats: {
    title: "Quick Stats",
    description: "Why work with me",
  },
  callToAction: {
    title: "Ready to Start Your Project?",
    description:
      "From concept to deployment, I'll work with you every step of the way to ensure your project not only meets but exceeds your expectations. Let's discuss how we can bring your ideas to life.",
    primaryButton: {
      text: "Start a Conversation",
      href: "mailto:samueladebolaoyenuga@gmail.com",
      ariaLabel: "Send an email to discuss your project",
    },
    secondaryButton: {
      text: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/samuel-oyenuga-b90aaa1b3/",
      ariaLabel: "Connect on LinkedIn",
    },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Samuel Adebola Oyenuga. Crafted with passion and precision.`,
    availability: "Available for collaborations worldwide",
  },
};
