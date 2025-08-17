


          
# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design with dark mode support, animations, and sections for showcasing projects and skills.

## Features

- 🌓 Dark/Light mode support
- 🎨 Modern and clean design
- 📱 Fully responsive
- ⚡ Fast performance
- 🔄 Smooth animations with Framer Motion
- 🎯 SEO optimized
- 🎨 Tailwind CSS styling
- 🧩 Modular component architecture

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies
```bash
pnpm install
```

3. Run the development server
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Project Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## Customization

1. Update personal information in `components/hero.tsx` and `components/about.tsx`
2. Modify projects in `components/projects.tsx`
3. Update contact information in `components/contact.tsx`
4. Customize theme colors in `app/globals.css`

