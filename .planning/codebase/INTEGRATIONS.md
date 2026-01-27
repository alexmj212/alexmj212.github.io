# External Integrations

**Analysis Date:** 2026-01-27

## APIs & External Services

**Font Icons:**
- FontAwesome Kit - Icons delivered via CDN
  - SDK/Client: `@fortawesome/react-fontawesome`, `@fortawesome/fontawesome-svg-core`
  - URL: `https://kit.fontawesome.com/926bef921d.js` (loaded in `public/index.html`)
  - Auth: Kit ID in script tag `crossorigin="anonymous"`

**Social & Web Properties:**
- GitHub - Link in footer/contact: `https://github.com/alexmj212`
- LinkedIn - Link in footer/contact: `https://linkedin.com/in/alexmj212`
- Email - Contact link for communication

## Data Storage

**Databases:**
- Not used - Static site architecture

**File Storage:**
- Local filesystem only
- Static assets in `public/` directory
- Images: `public/assets/img/` and `public/img/`
- CNAME: `public/CNAME` for domain routing

**Caching:**
- Browser caching via Vite build output
- No server-side caching needed

**Content:**
- Portfolio data: `src/data/portfolioData.ts` (hardcoded TypeScript objects)
- Experience data: `src/data/experienceData.ts` (hardcoded TypeScript objects)
- Skills data: `src/data/skillsData.ts` (hardcoded TypeScript objects)

## Authentication & Identity

**Auth Provider:**
- Not implemented - Static portfolio site
- No user authentication or account system

**Contact Methods:**
- Email link in `ContactList` component (`src/components/ContactList.tsx`)
- GitHub social link
- LinkedIn social link

## Monitoring & Observability

**Error Tracking:**
- Not configured - No external error monitoring
- Error Boundary component: `src/components/ErrorBoundary.tsx` for graceful degradation

**Logs:**
- Console logging only
- Browser DevTools for debugging
- Three.js background logs security warnings and initialization status

**Performance:**
- No APM/monitoring tools integrated
- Browser performance metrics available via DevTools

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Deployed to `https://alexmj212.dev` via CNAME
- Static site - No server-side code execution

**CI Pipeline:**
- GitHub Actions workflows in `.github/workflows/`
  - `deploy.yml` - Main deployment workflow
  - `claude.yml` - Claude AI agent workflow
  - `claude-code-review.yml` - Code review workflow

**Build Output:**
- Directory: `build/` (specified in `vite.config.ts`)
- Source maps: Enabled for production debugging

## Environment Configuration

**Required env vars:**
- None - This is a static site with no backend dependencies
- All configuration in TypeScript files and config files

**Configuration Files:**
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Styling configuration with dark mode
- `tsconfig.json` - TypeScript compiler options
- `postcss.config.js` - CSS processing pipeline
- `package.json` - Dependencies and build scripts

**Secrets location:**
- No secrets required - Static public site
- FontAwesome Kit ID is public in HTML
- All API keys/IDs are embedded publicly (by design for static site)

## Third-Party Services Integration Points

**Theme Detection:**
- System preference detection: `window.matchMedia("(prefers-color-scheme: dark)")`
- Accessibility: `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Used in `src/components/ThreeBackground.tsx` for theme-aware colors

**Window/Browser APIs Used:**
- `requestAnimationFrame()` - Three.js animation loop
- `ResizeObserver` patterns for responsive design
- `window.innerWidth/Height` - Viewport dimensions
- `document.getComputedStyle()` - CSS variable reading
- `window.matchMedia()` - Media queries and preferences

## Webhooks & Callbacks

**Incoming:**
- None - Static site receives no external events

**Outgoing:**
- None - Site makes no external requests

---

*Integration audit: 2026-01-27*
