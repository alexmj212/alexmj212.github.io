# Technology Stack

**Analysis Date:** 2026-01-27

## Languages

**Primary:**
- TypeScript 4.7.4 - All source code in `src/`
- JavaScript - Build configuration and Node.js scripts

**Secondary:**
- CSS3 - Styling with Tailwind CSS
- HTML5 - Template and semantic markup in `public/index.html`

## Runtime

**Environment:**
- Node.js 25.2.1

**Package Manager:**
- pnpm 10.22.0+sha512
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 - UI library and component framework
- React Router DOM 7.8.2 - Client-side routing (`src/index.tsx`)
- React DOM 18.3.1 - React rendering

**Graphics:**
- Three.js 0.179.1 - 3D graphics and animations (`src/components/ThreeBackground.tsx`)

**Animation:**
- Framer Motion 12.23.12 - Motion and animation effects
- React Scroll 1.8.7 - Smooth scrolling utilities

**Icons & UI:**
- FontAwesome React 0.2.3 - React icon component wrapper
- FontAwesome SVG Core 6.7.2 - SVG icon engine
- FontAwesome Free Brands 6.7.2 - Brand icons
- FontAwesome Free Solid 6.7.2 - Solid icons
- Font Source Inter 5.2.6 - System font

**Testing & Quality:**
- Playwright 1.54.2 - End-to-end testing framework

**Build & Development:**
- Vite 5.4.19 - Build tool and dev server (`vite.config.ts`)
- Vitejs Plugin React 5.0.0 - React fast refresh plugin
- TypeScript 4.7.4 - Type checking

## Key Dependencies

**Critical:**
- React 18.3.1 - Core framework, cannot be removed
- TypeScript 4.7.4 - Type safety across entire codebase
- Vite 5.4.19 - Determines entire build pipeline
- Three.js 0.179.1 - Required for `ThreeBackground` component with 3D animations

**Styling:**
- Tailwind CSS 3.4.17 - Utility-first CSS framework (`tailwind.config.js`)
- PostCSS 7+ - CSS transformation (via `postcss.config.js`)
- Autoprefixer 10.4.21 - Vendor prefixes
- CSSNano 7.1.0 - CSS minification in production
- PostCSS Import 16.1.1 - CSS file imports

**Infrastructure:**
- React Router DOM 7.8.2 - Handles routes to `/`, `/resume`, `/cover-letter`
- Framer Motion 12.23.12 - Animation framework for smooth UX
- React Scroll 1.8.7 - Navigation scroll utilities

## Configuration

**Environment:**
- Development: Last version of Chrome, Firefox, Safari
- Production: >0.2% market share browsers, excluding dead browsers and Opera Mini
- Dark mode: Enabled via Tailwind CSS class strategy (`tailwind.config.js`)

**Build:**
- `vite.config.ts`: Output to `build/` directory, source maps enabled
- `tsconfig.json`: ES2020 target, React JSX mode, strict mode enabled
- `tailwind.config.js`: Dark mode class-based, custom theme extensions
- `postcss.config.js`: Autoprefixer, Tailwind CSS, PostCSS Import, CSSNano in production

**Port:**
- Dev server: Port 3000

## Platform Requirements

**Development:**
- Node.js 25.2.1
- pnpm 10.22.0
- TypeScript support in editor (strict mode enabled)

**Production:**
- Static hosting (GitHub Pages ready via GitHub Actions)
- Deployment: GitHub Pages at https://alexmj212.dev
- Browser support: Modern browsers (>0.2% market share, ES2020 compatible)

## Scripts

**Available Commands:**
```bash
npm run dev       # Start Vite dev server on port 3000
npm run build     # TypeScript check + Vite production build to ./build
npm run preview   # Preview production build locally
```

---

*Stack analysis: 2026-01-27*
