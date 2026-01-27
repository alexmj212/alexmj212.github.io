# Architecture

**Analysis Date:** 2026-01-27

## Pattern Overview

**Overall:** Component-Driven SPA with Section-Based Layout

**Key Characteristics:**
- Single-page application (SPA) built with React 18 and React Router
- Multi-route architecture with portfolio, resume, and cover letter pages
- Fixed Three.js 3D background animation layer with security-focused error boundary
- Tailwind CSS-based styling with dark mode support and custom design tokens
- TypeScript for type safety throughout the codebase
- Data-driven component approach with centralized content in data files

## Layers

**Presentation Layer (UI Components):**
- Purpose: Render user interface and handle user interactions
- Location: `src/components/`
- Contains: React functional components with hooks, styled with Tailwind CSS classes
- Depends on: Data layer (portfolio, skills, experience), Theme utilities, Three.js for background
- Used by: App.tsx routing layer

**Data Layer (Content Management):**
- Purpose: Centralize and manage all page content and configuration
- Location: `src/data/`
- Contains: TypeScript interfaces and exported data arrays (portfolioData, skillsData, experienceData)
- Depends on: Nothing (static data)
- Used by: Presentation layer components

**Routing Layer:**
- Purpose: Handle page navigation and route rendering
- Location: `src/index.tsx` (BrowserRouter setup)
- Contains: Routes configuration with three main pages
- Depends on: React Router DOM, App component, Resume component, CoverLetter component
- Used by: Browser/browser history

**Application Root:**
- Purpose: Main application layout and section orchestration
- Location: `src/App.tsx`
- Contains: Hero section, About section, Portfolio, Skills, Experience, Footer
- Depends on: All major section components, ThreeBackground, Navbar
- Used by: Router as home route

**Theme & Utilities:**
- Purpose: Dark mode management and UI utilities
- Location: `src/dark-mode.tsx` (theme logic), `src/components/` (utility components)
- Contains: Theme toggle, localStorage persistence, system preference detection
- Depends on: localStorage, window.matchMedia
- Used by: Navbar, ThreeBackground (for color-aware rendering)

## Data Flow

**Page Navigation Flow:**

1. User loads site → BrowserRouter initializes routes
2. Route matches → App, Resume, or CoverLetter component renders
3. Component tree renders from App.tsx
4. Section components fetch data from `src/data/`
5. Components render with Tailwind styling
6. User interaction (click navigation) → scroll to section or navigate to route

**Portfolio Dialog Flow:**

1. User clicks portfolio card → Portfolio component state updates
2. Selected item stored in component state (selectedItem, isDialogOpen)
3. PortfolioDialog component receives item and isOpen props
4. Dialog element showModal() called via useEffect
5. User clicks close/backdrop → onClose callback updates parent state
6. Dialog closes and states reset

**Three.js Background Animation Flow:**

1. App mounts → ThreeBackground component initializes
2. useEffect hook creates Three.js scene, camera, renderer
3. Particles array created with config-driven positioning
4. Animation loop via requestAnimationFrame continuously:
   - Updates particle progress along perspective tracks
   - Calculates position based on depth and convergence factor
   - Renders scene with WebGL
5. Window resize event updates camera aspect and renderer size
6. Component unmount → cleanup via useEffect (cancel animation frame, dispose renderer)

**State Management:**
- Local component state for UI interactions (menu toggles, dialog states, scroll tracking)
- localStorage for theme persistence
- No global state management (Redux/Zustand) - data flows from parent to child via props
- React Router manages navigation state

## Key Abstractions

**Section Components (Layout Pattern):**
- Purpose: Render major page sections with consistent styling and structure
- Examples: `src/components/portfoilo/Portfolio.tsx`, `src/components/skills/Skills.tsx`, `src/components/experience/Experience.tsx`
- Pattern: Each returns JSX with container-responsive class, section title, and content grid

**Data Interface Pattern:**
- Purpose: Define shape of content at type level
- Examples: `PortfolioItem`, `SkillCategory`, `ExperienceItem` interfaces in `src/data/`
- Pattern: TypeScript interfaces with required/optional fields, exported from data files

**Dialog/Modal Pattern:**
- Purpose: Display detailed content in focused view without navigation
- Example: `PortfolioDialog` component in `src/components/portfoilo/Portfolio.tsx`
- Pattern: HTML dialog element with backdrop, modal management via useRef and useEffect

**Error Boundary Pattern:**
- Purpose: Catch and gracefully handle React errors without crashing app
- Location: `src/components/ErrorBoundary.tsx`
- Pattern: Class component implementing getDerivedStateFromError and componentDidCatch lifecycle methods

**Three.js Integration Pattern:**
- Purpose: Manage 3D graphics initialization, animation, and cleanup in React lifecycle
- Location: `src/components/ThreeBackground.tsx`
- Pattern: useEffect for setup, nested animation loop with requestAnimationFrame, cleanup on unmount

## Entry Points

**Main Application:**
- Location: `src/index.tsx`
- Triggers: Browser loads HTML, JavaScript bundle executes
- Responsibilities: Bootstrap React app, set up BrowserRouter, render root component to #root DOM element

**Home Page:**
- Location: `src/App.tsx`
- Triggers: User visits `/` or BrowserRouter route matches
- Responsibilities: Orchestrate main page layout including hero, about, portfolio, skills, experience sections

**Resume Page:**
- Location: `src/components/Resume.tsx`
- Triggers: User navigates to `/resume`
- Responsibilities: Render printable resume layout with experience details

**Cover Letter Page:**
- Location: `src/components/CoverLetter.tsx`
- Triggers: User navigates to `/cover-letter`
- Responsibilities: Render printable cover letter document

**Three.js Background:**
- Location: `src/components/ThreeBackground.tsx` (within App)
- Triggers: App component mounts, canvas element available
- Responsibilities: Initialize WebGL scene, manage particle animation, handle resize events

## Error Handling

**Strategy:** Defensive programming with security-focused error boundary and safe defaults

**Patterns:**

- **Error Boundary:** `src/components/ErrorBoundary.tsx` wraps Three.js background to prevent 3D animation errors from crashing entire app. Shows user-friendly message if 3D fails to load.

- **Three.js Safe Color Parsing:** `src/components/ThreeBackground.tsx` includes `validateHexColor()`, `parseColorSafely()`, `getCSSColorSafely()` functions. All color operations have try-catch blocks with fallback colors (0x0b8bd5). Invalid CSS variables or colors log warnings and use default.

- **Theme Detection Safe Fallback:** `src/dark-mode.tsx` checks localStorage, then system preference via `window.matchMedia()`. Falls back to light theme if detection fails.

- **Dialog Click Detection:** `src/components/portfoilo/Portfolio.tsx` PortfolioDialog validates click coordinates against dialog bounds to properly detect backdrop clicks across browsers.

- **Image Load Failures:** Portfolio images have `onError` handler that hides images if they fail to load, preventing broken image states.

- **Canvas/DOM Safety:** ThreeBackground checks if canvas element exists before proceeding, throws error if root element missing in index.tsx.

## Cross-Cutting Concerns

**Logging:**
- Console logging in development (ThreeBackground has extensive logs for debugging)
- Error logging in ErrorBoundary (logs error message, name, stack trace with truncation for security)
- No centralized logging service

**Validation:**
- TypeScript static type checking at compile time
- Runtime color validation in ThreeBackground for user input safety
- HTML5 native form validation (in Resume/CoverLetter components)

**Authentication:**
- Not applicable for static portfolio site
- No authentication mechanisms in place

**Dark Mode:**
- User preference stored in localStorage under 'theme' key
- Falls back to system `prefers-color-scheme: dark` media query
- Theme class applied to document root element (dark)
- Tailwind CSS dark: modifier used throughout for dark-specific styles
- Three.js colors respond to theme via `getThemeAwareColor()` utility

**Accessibility:**
- Semantic HTML (dialog, button, nav elements)
- ARIA attributes (role="alert" on ErrorBoundary fallback)
- Focus management in Navbar (focus first menu item on open, return to button on close)
- Keyboard navigation (Escape key closes menu and dialog)
- Motion preferences respected (`prefers-reduced-motion` in ThreeBackground config)
- Mobile touch optimization via viewport meta tag

**Performance:**
- Three.js particle geometry reused across all particles (single buffer geometry cloned for material variations)
- WebGL renderer pixel ratio limited to max 2 for performance
- Trail resolution configurable to reduce draw calls
- CSS animations use Tailwind utilities (no inline style calculations)
- Image loading lazy or error-handled to prevent render blocking

---

*Architecture analysis: 2026-01-27*
