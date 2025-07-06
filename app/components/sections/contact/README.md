# Contact Section - Modular Structure

This contact section has been refactored into a modular, maintainable structure that makes it easy to add, remove, or edit content without touching the main component code.

## 📁 File Structure

```
contact/
├── data/
│   ├── contactMethods.ts     # Contact method configurations
│   ├── stats.ts              # Statistics data
│   ├── floatingShapes.ts     # Floating shapes configuration
│   └── content.ts            # All text content
├── components/
│   ├── FloatingShapes.tsx    # Reusable floating shapes component
│   ├── ContactCard.tsx       # Reusable contact card component
│   ├── ContactForm.tsx       # Reusable contact form component
│   ├── StatsSection.tsx      # Reusable stats section component
│   ├── CallToAction.tsx      # Reusable call-to-action component
│   └── index.ts              # Component exports
├── index.tsx                 # Main contact component
└── README.md                 # This file
```

## 🛠️ How to Modify Content

### 1. Contact Methods (`data/contactMethods.ts`)

To add, remove, or edit contact methods:

```typescript
// Add a new contact method
{
  id: "twitter",
  type: "twitter",
  label: "Twitter",
  value: "@yourhandle",
  href: "https://twitter.com/yourhandle",
  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
  color: "from-blue-400 to-blue-600",
  gradient: "from-blue-900/20 via-blue-800/20 to-indigo-900/20",
  description: "Follow me on Twitter",
}

// Remove a contact method by deleting its entry from the array
// Edit existing methods by modifying their properties
```

### 2. Statistics (`data/stats.ts`)

To modify the statistics section:

```typescript
// Add a new stat
{
  value: "50+",
  label: "Projects Completed",
  description: "Successful deliveries",
  icon: "🚀",
  color: "from-indigo-400 to-purple-500",
}

// Remove stats by deleting entries from the array
// Edit existing stats by modifying their properties
```

### 3. Floating Shapes (`data/floatingShapes.ts`)

To modify the background floating shapes:

```typescript
// Add a new shape
{
  id: "diamond-1",
  type: "diamond",
  size: 45,
  position: { x: 50, y: 50, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  color: "from-pink-500/20 to-rose-600/20",
  opacity: 0.4,
  duration: 14,
}

// Remove shapes by deleting entries from the array
// Edit existing shapes by modifying their properties
```

### 4. Text Content (`data/content.ts`)

To modify any text content:

```typescript
// Edit header content
header: {
  subtitle: "Get In Touch",
  title: "Let's Create",
  titleHighlight1: "Let's Create",
  titleHighlight2: "Together",
  description: "Your custom description here...",
}

// Edit form content
contactForm: {
  subtitle: "Direct Communication",
  title: "Send Me a Message",
  description: "Your form description...",
  formTitle: "Let's Build Something Amazing Together",
  formDescription: "Your form description...",
  fields: {
    name: {
      label: "Name *",
      placeholder: "Your full name",
    },
    // ... other fields
  },
  submitButton: {
    default: "Send Message",
    loading: "Sending Message...",
  },
  messages: {
    success: "Message sent successfully!",
    error: "Something went wrong.",
  },
}

// Edit call-to-action content
callToAction: {
  title: "Ready to Start Your Project?",
  description: "Your CTA description...",
  primaryButton: {
    text: "Start a Conversation",
    href: "mailto:your@email.com",
    ariaLabel: "Send an email to discuss your project",
  },
  secondaryButton: {
    text: "Connect on LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
    ariaLabel: "Connect on LinkedIn",
  },
}

// Edit footer content
footer: {
  copyright: "© 2025 Your Name. Crafted with passion...",
  availability: "Available for freelance projects...",
}
```

## 🎨 Customization Options

### Colors and Styling

Each contact method has customizable colors:

```typescript
{
  color: "from-cyan-500 to-blue-600",        // Icon background gradient
  gradient: "from-cyan-900/20 via-blue-800/20 to-indigo-900/20", // Card background
}
```

### Icons

Icons are defined as SVG path data. You can:
- Use existing Material Design icons
- Create custom SVG paths
- Use emoji icons for stats

### Animations

All animations are handled by Framer Motion and GSAP. The timing and effects are defined in the component files and can be customized there.

## 🔧 Adding New Components

To add a new section or component:

1. Create the component in the `components/` directory
2. Add its data configuration to the appropriate data file
3. Export it from `components/index.ts`
4. Import and use it in the main `index.tsx` file

## 📝 Best Practices

1. **Keep data separate from components**: All content should be in the `data/` directory
2. **Use TypeScript interfaces**: Define proper types for all data structures
3. **Maintain consistency**: Follow the existing naming conventions and structure
4. **Test changes**: Always test your changes to ensure they work correctly
5. **Document changes**: Update this README when adding new features

## 🚀 Quick Start

To make a simple change:

1. **Edit contact information**: Modify `data/contactMethods.ts`
2. **Change text content**: Modify `data/content.ts`
3. **Update statistics**: Modify `data/stats.ts`
4. **Customize shapes**: Modify `data/floatingShapes.ts`

The changes will automatically appear in the contact section without needing to modify any component code! 