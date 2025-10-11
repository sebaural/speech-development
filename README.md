# Site Redesign (React + Vite + TypeScript)

Modern, professional, and user-friendly starter site that communicates trust and innovation.

## Quick start (Linux / Bash)

Install dependencies:

```bash
# Node LTS (>=18) recommended
npm install
```

Run the dev server:

```bash
npm run dev
```

Run the mock API server (separate terminal):

```bash
npm run start:server
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
npm run preview
```

## What you get

- React + Vite + TypeScript scaffold
- Tailwind CSS included
- Accessible components (Headless UI ready)
- Framer Motion for subtle animations
- Simple Express mock API at `/server` for contact form
- ESLint + Prettier + Vitest sample test

Replace placeholder content and images in `src` with your real assets.

## Hero component (reusable)

The project includes a reusable `Hero` component at `src/components/Hero.tsx`. It's designed to be page-configurable via props and supports modern image fallbacks (AVIF → WebP → JPG → SVG), per-slide composition (`objectPosition`), and optional autoplay.

Props (TypeScript)

- `slides?: Slide[]` — array of slide objects. If omitted, a built-in default slide set is used.
- `autoplay?: boolean` — whether the hero should advance automatically (default: `true`).
- `heightClasses?: string` — Tailwind utility classes to control the hero's height on different screens (default: responsive 30–50vh classes).

Slide shape (`Slide`)

- `title: string` — required slide title
- `subtitle?: string` — optional subtitle text
- `cta?: { text: string; href: string }` — optional primary call-to-action
- `avif?: string` — AVIF source (preferred)
- `webp?: string` — WebP source
- `jpg?: string` — JPEG/PNG source
- `svg?: string` — SVG fallback
- `objectPosition?: string` — CSS `object-position` value for image composition (e.g. `center 20%`)

Quick usage

1. Define slides per page (recommended location: `src/data/*`). Example:

```ts
// src/data/homeSlides.ts
import type { Slide } from '../components/Hero'

const homeSlides: Slide[] = [
	{
		title: 'Welcome to Our Redesign',
		subtitle: 'A modern, professional experience built for trust and growth.',
		cta: { text: 'See features', href: '/features' },
		avif: '/images/hero-1.avif',
		webp: '/images/hero-1.webp',
		jpg: '/images/hero-1.jpg',
		svg: '/images/hero-1.svg',
		objectPosition: 'center 20%',
	},
]

export default homeSlides
```

2. Import and pass slides from a page:

```tsx
import Hero from '../components/Hero'
import homeSlides from '../data/homeSlides'

export default function HomePage() {
	return <Hero slides={homeSlides} heightClasses="h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh]" />
}
```

Notes

- If image converters are available in your environment, the helper `scripts/generate-images.sh` can create optimized JPG/WebP/AVIF assets from the SVG placeholders in `public/images/`. If the environment lacks `cwebp` or `avifenc`, the script will produce JPGs and skip those formats. Alternatively, consider using a Node-based image tool like `sharp` for CI-friendly image generation.

