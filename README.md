# Frontend Portfolio

A modern, animated portfolio website built with Next.js 16, featuring interactive UI components, smooth animations, and a clean atomic design architecture.

## Overview

This portfolio showcases professional projects and work experience through an engaging, performant web interface. The site includes animated backgrounds, parallax scrolling effects, multilingual greetings, and interactive project cards.

## Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router and Turbopack
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Aceternity UI** - Advanced animated components

### Animation Libraries
- **GSAP** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animations
- **Framer Motion** - React animation library

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

## Project Structure

The project follows atomic design principles for scalable component architecture:

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── atoms/                    # Basic building blocks
│   │   ├── container.tsx
│   │   ├── horizontal-text.tsx
│   │   ├── logo.tsx
│   │   ├── star-shape.tsx
│   │   └── theme-toggle.tsx
│   ├── molecules/                # Simple component groups
│   ├── organisms/                # Complex component sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── navbar.tsx
│   │   ├── gradient-background.tsx
│   │   └── horizontal-shapes-background.tsx
│   └── ui/                       # Third-party UI components
│       ├── timeline.tsx
│       ├── flip-words.tsx
│       ├── text-generate-effect.tsx
│       └── spotlight.tsx
├── config/                       # Configuration data
│   ├── gallery.config.tsx        # Photo galleries
│   ├── timeline.config.tsx       # Work experience
│   ├── projects.config.tsx       # Project cards
│   ├── shapes.config.ts          # Shape animations
│   └── gradient.config.ts        # Gradient blobs
├── lib/
│   └── utils.ts                  # Utility functions
└── types/
    └── css.d.ts                  # CSS type declarations
```

## Features

### Hero Section
- Dynamic gradient background with morphing blobs
- Animated star shapes following wavy paths
- Parallax scrolling text effect
- Multilingual greeting animation in 8 languages
- Visibility-based animation triggers

### About Section
- Interactive timeline component
- Work experience showcase
- Photo galleries with layout grid
- Smooth scroll animations

### Projects Section
- Expandable project cards with detailed content
- Modal overlay with React Portal
- Image optimization with Next.js Image
- LinkPreview for external links
- Text generation effects

### Contact Section
- Dotted glow background animation
- Call-to-action buttons
- Email and GitHub links
- Responsive layout

### Additional Features
- Dark mode support with theme toggle
- Responsive navigation bar
- Performance optimized animations
- SEO-friendly structure
- Accessibility considerations

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later (recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fe-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_SITE_URL=your-site-url
```

### Tailwind Configuration

Tailwind is configured in `tailwind.config.ts` with custom theme variables defined in `src/app/globals.css`.

### Component Configuration

All major data configurations are centralized in the `src/config/` directory:

- **gallery.config.tsx** - Photo gallery data for timeline entries
- **timeline.config.tsx** - Work experience and education history
- **projects.config.tsx** - Project showcase data
- **shapes.config.ts** - Animated shape configurations
- **gradient.config.ts** - Background gradient blob settings

## Customization

### Adding New Projects

Edit `src/config/projects.config.tsx`:

```typescript
{
  id: "unique-project-id",
  title: "Project Title",
  description: "Brief description",
  src: "image-url",
  ctaText: "Visit",
  ctaLink: "https://project-url.com",
  content: () => (
    <p>Detailed project description</p>
  )
}
```

### Modifying Timeline

Edit `src/config/timeline.config.tsx` to update work experience entries.

### Adjusting Animations

Modify animation parameters in `src/config/shapes.config.ts` and `src/config/gradient.config.ts`.

## Deployment

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure build settings (auto-detected)
4. Deploy

### Build Optimization

The project is configured for optimal production builds:
- Automatic code splitting
- Image optimization with Next.js Image
- CSS minification
- JavaScript bundling with Turbopack

## Performance

The application is optimized for performance:
- Lazy loading for images and components
- Intersection Observer for animation triggers
- Efficient re-renders with React 19
- Minimal bundle size with code splitting
- Service worker support (PWA ready)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For inquiries, reach out via:
- Email: irul.career@gmail.com
- GitHub: [KhoirulHusein](https://github.com/KhoirulHusein)
