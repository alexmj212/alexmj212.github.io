# Codebase Structure

**Analysis Date:** 2026-01-27

## Directory Layout

```
alexmj212.github.io/
├── src/                           # Application source code
│   ├── components/                # React UI components
│   │   ├── experience/            # Experience section components
│   │   ├── portfoilo/             # Portfolio section components (note: typo in folder name)
│   │   ├── skills/                # Skills section components
│   │   ├── App.tsx                # Main application component
│   │   ├── Navbar.tsx             # Navigation bar with dark mode toggle
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Header.tsx             # Minimal header wrapper
│   │   ├── ThreeBackground.tsx    # Three.js 3D background animation
│   │   ├── ErrorBoundary.tsx      # React error boundary for safety
│   │   ├── Resume.tsx             # Resume page component
│   │   ├── CoverLetter.tsx        # Cover letter page component
│   │   ├── ContactList.tsx        # Social links contact component
│   │   ├── Button.tsx             # Button utility component
│   │   ├── Anchor.tsx             # Anchor/link utility component
│   │   ├── Badge.tsx              # Badge display component
│   │   ├── List.tsx               # List utility component
│   │   ├── Panel.tsx              # Panel container component
│   │   ├── Section.tsx            # Section container component
│   │   └── DocumentHeader.tsx     # Header for resume/cover letter
│   ├── data/                      # Static content and data
│   │   ├── portfolioData.ts       # Portfolio projects data and PortfolioItem interface
│   │   ├── skillsData.ts          # Skills categories and Skill interfaces
│   │   └── experienceData.ts      # Work experience data and ExperienceItem interface
│   ├── styles/                    # CSS stylesheets
│   │   ├── base.css               # Base/reset styles
│   │   ├── components.css         # Component-specific styles
│   │   ├── document.css           # Resume/cover letter styles
│   │   ├── typography.css         # Typography and heading styles
│   │   ├── vars.css               # CSS custom properties (design tokens)
│   │   ├── hand-wave.css          # Hand wave animation
│   │   └── tailwind.css           # Tailwind CSS imports
│   ├── img/                       # Image assets in src
│   ├── dark-mode.tsx              # Theme management and localStorage
│   ├── react-app-env.d.ts         # TypeScript environment type definitions
│   ├── setupTests.ts              # Test configuration
│   └── index.tsx                  # Application entry point with routing
│
├── public/                        # Static public assets
│   ├── assets/                    # Project images and resources
│   │   ├── img/                   # Portfolio project screenshots
│   │   ├── css/                   # Additional stylesheets
│   │   └── js/                    # Additional scripts
│   └── img/                       # Public images
│
├── build/                         # Build output directory (generated)
├── .planning/                     # GSD planning documents
│   └── codebase/                  # Codebase analysis documents
├── .vscode/                       # VS Code workspace settings
├── .github/                       # GitHub configuration
│   └── workflows/                 # CI/CD workflows
├── .claude/                       # Claude agent configuration
└── .playwright-mcp/               # Playwright testing configuration

```

## Directory Purposes

**`src/components/`:**
- Purpose: React component implementations for UI rendering
- Contains: Functional components using React 18 hooks, Tailwind CSS classes, TypeScript types
- Key files: `App.tsx` (main app), `ThreeBackground.tsx` (3D animation), `ErrorBoundary.tsx` (error handling), `Navbar.tsx` (navigation with dark mode)
- Organization: Feature-based subdirectories for major sections (experience, portfoilo, skills)

**`src/data/`:**
- Purpose: Centralized content management and data structures
- Contains: TypeScript interfaces defining data shapes and exported data arrays
- Key files: `portfolioData.ts` (projects), `skillsData.ts` (skills categories), `experienceData.ts` (work history)
- Pattern: Each file exports interface definitions and data constant

**`src/styles/`:**
- Purpose: Global and component-specific CSS with Tailwind integration
- Contains: CSS files with custom properties, component classes, typography rules
- Key files: `vars.css` (design tokens), `components.css` (reusable classes), `base.css` (reset/defaults)
- Pattern: Small, focused CSS files combined with Tailwind utility classes in JSX

**`public/assets/`:**
- Purpose: Serve static images and media files from web root
- Contains: Portfolio project screenshots organized by project folder, portrait image, miscellaneous assets
- Accessed: Via relative paths like `/assets/img/portrait.jpg` in HTML/JSX

**`build/`:**
- Purpose: Generated output directory from Vite build process
- Contains: Optimized JavaScript, CSS, HTML bundles for production
- Generated: Yes (not manually edited)
- Committed: No (excluded in .gitignore)

## Key File Locations

**Entry Points:**
- `src/index.tsx`: Initializes React app with BrowserRouter, sets up routing (/, /resume, /cover-letter), renders to #root DOM element
- `src/App.tsx`: Main application component rendering hero, about, portfolio, skills, experience sections
- `index.html`: HTML template file at project root (serves React SPA)

**Configuration:**
- `tsconfig.json`: TypeScript compiler options (target ES2020, JSX react-jsx, strict mode)
- `package.json`: Dependencies, scripts (dev, build, preview), metadata
- `tailwind.config.js`: Tailwind CSS configuration with custom colors, fonts, responsive utilities
- `postcss.config.js`: PostCSS configuration for Tailwind
- `vite.config.ts`: Vite bundler configuration (if exists, implied by package.json scripts)

**Core Logic:**
- `src/components/App.tsx`: Orchestrates page layout and section components (379 lines)
- `src/components/ThreeBackground.tsx`: Three.js 3D particle animation (379 lines, largest file)
- `src/components/portfoilo/Portfolio.tsx`: Portfolio showcase with dialog detail view (263 lines)
- `src/components/Navbar.tsx`: Navigation with dark mode toggle, scroll hiding, mobile menu (286 lines)
- `src/data/portfolioData.ts`: Portfolio project data with PortfolioItem interface (157 lines)
- `src/dark-mode.tsx`: Theme persistence and system preference detection (50 lines)

**Testing:**
- `src/setupTests.ts`: Test environment configuration
- `.playwright-mcp/`: Playwright testing configuration directory

**Documentation & Coordination:**
- `CLAUDE.md`: Project instructions for Claude agents
- `frontend-engineer.md`: Agent task file
- `frontend-code-reviewer.md`: Agent task file
- `.planning/codebase/`: Analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)

## Naming Conventions

**Files:**
- Components: PascalCase (`App.tsx`, `Navbar.tsx`, `Portfolio.tsx`)
- Data/utilities: camelCase (`portfolioData.ts`, `skillsData.ts`, `dark-mode.tsx`)
- Styles: kebab-case (`base.css`, `components.css`, `document.css`)
- Folders: kebab-case or camelCase matching content (`portfoilo`, `skills`, `experience`)

**Directories:**
- Feature folders: lowercase with feature name (`components/`, `data/`, `styles/`, `public/`)
- Component grouping: by feature/section (`components/portfoilo/`, `components/skills/`)
- Config/meta: dot-prefix for tools (`.vscode/`, `.claude/`, `.github/`)

**React Components:**
- Named exports: PascalCase matching filename (`export default Navbar;` in `Navbar.tsx`)
- Props interfaces: Component name + "Props" suffix (e.g., `PortfolioDialogProps`)
- State variables: camelCase (selectedItem, isMenuOpen, isDarkMode)
- Handler functions: on + action pattern (`onClose`, `onClick`, `handleScroll`)

**TypeScript/Data:**
- Interfaces: PascalCase, descriptive names (`PortfolioItem`, `SkillCategory`, `ExperienceItem`)
- Type names end with their kind (Props, Item, Category, etc.)
- Constants: UPPER_SNAKE_CASE (e.g., CONFIG object in ThreeBackground for animation settings)
- Enum members: UPPER_SNAKE_CASE within enum

**CSS Classes:**
- Tailwind utilities: existing Tailwind convention (text-lg, bg-white, dark:bg-gray-900, etc.)
- Custom classes: kebab-case descriptive names (hero-title, portfolio-card, section-bg-alt, container-responsive)
- Pseudo-elements: component-name--state pattern (e.g., gradient-border-left)

## Where to Add New Code

**New Feature:**
- Primary code: `src/components/FeatureName.tsx` (create new component file)
- Data: Add interface and data array to `src/data/` if content-driven
- Styles: Add component-specific classes to `src/styles/components.css` or new CSS file
- Route: Add Route in `src/index.tsx` if new page needed

**New Component/Module:**
- Reusable UI component: `src/components/ComponentName.tsx` (single file) or `src/components/ComponentName/` (folder with index.tsx if complex)
- Section component: `src/components/SectionName/SectionName.tsx` in feature subfolder
- Utility component: `src/components/UtilityName.tsx` in main components folder

**Utilities/Helpers:**
- Theme utilities: Add functions to `src/dark-mode.tsx`
- DOM utilities: Create `src/utils/` folder if multiple files needed
- Type definitions: Add interfaces alongside data in `src/data/`
- Animation utilities: Keep with component file unless shared across multiple components

**Styles:**
- Global styles: Add to `src/styles/base.css`
- Component-scoped utilities: Add to `src/styles/components.css`
- Typography: Add to `src/styles/typography.css`
- Variables/tokens: Add CSS custom properties to `src/styles/vars.css`
- Document/print styles: Add to `src/styles/document.css`

**Data:**
- Content-heavy feature: Create `src/data/featureName.ts` with interface and data export
- UI configuration: Add to existing data file or create new file if complex
- Constants: Store in component file if only used there, or `src/data/` if shared

## Special Directories

**`public/`:**
- Purpose: Static assets served at root URL
- Generated: No (manually maintained)
- Committed: Yes (tracked in git)
- Access: Via absolute paths like `/assets/img/portrait.jpg` in code

**`build/`:**
- Purpose: Production build output from Vite
- Generated: Yes (created by `npm run build`)
- Committed: No (excluded in .gitignore)
- Contains: Minified/optimized JavaScript, CSS, HTML bundles

**`.planning/codebase/`:**
- Purpose: GSD (Get Stuff Done) analysis documents
- Generated: By mapping agents (this STRUCTURE.md, ARCHITECTURE.md, etc.)
- Committed: Yes (tracked in git)
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD configuration
- Generated: No (manually maintained)
- Committed: Yes
- Contains: YAML workflow definitions for automated testing/deployment

**`.vscode/`:**
- Purpose: VS Code workspace settings and extensions
- Generated: No (manually configured)
- Committed: Yes (team configuration)
- Contains: Editor settings, recommended extensions, debug configurations

## File Organization Summary

| Purpose | Location | File Type | Pattern |
|---------|----------|-----------|---------|
| Page components | `src/components/` | `.tsx` | Feature-based folders or single files |
| Section components | `src/components/[feature]/` | `.tsx` | Named [Feature].tsx, one per section |
| Data & interfaces | `src/data/` | `.ts` | One file per data domain (portfolio, skills, experience) |
| Global styles | `src/styles/` | `.css` | Category-based (base, components, typography, vars) |
| Utilities | `src/` | `.tsx` | Functional (dark-mode.tsx) |
| Static assets | `public/assets/` | Various | Organized by asset type/project |
| Built artifacts | `build/` | `.js`, `.css`, `.html` | Auto-generated, not edited |
| Configuration | Root | `.json`, `.js`, `.config.*` | Standard project configs |

---

*Structure analysis: 2026-01-27*
