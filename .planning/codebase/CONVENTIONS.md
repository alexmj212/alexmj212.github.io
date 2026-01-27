# Coding Conventions

**Analysis Date:** 2026-01-27

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `Navbar.tsx`, `ErrorBoundary.tsx`, `ThreeBackground.tsx`)
- Data files: camelCase (e.g., `portfolioData.ts`, `experienceData.ts`, `skillsData.ts`)
- Style files: kebab-case with context (e.g., `document.css`, `tailwind-input.css`)
- Subdirectories for related components: lowercase (e.g., `components/portfoilo/`, `components/skills/`, `components/experience/`)

**Functions:**
- Function names: camelCase (e.g., `validateHexColor`, `parseColorSafely`, `getCSSColorSafely`, `handleScroll`, `toggleMenu`)
- Event handlers: `handle` prefix followed by camelCase (e.g., `handleScroll`, `handleResize`, `handleLinkClick`, `handleKeyDown`, `handleBackdropClick`)
- Hook functions: standard camelCase with `use` prefix when custom (e.g., `useDarkMode`)
- Utility functions: camelCase (e.g., `initThree`, `createParticleTrails`, `animate`)

**Variables:**
- Component props: camelCase (e.g., `showLabel`, `iconSize`, `labelSize`, `onDarkBG`, `styleVariant`, `isMenuOpen`, `isDarkMode`)
- State variables: camelCase (e.g., `isMenuOpen`, `isNavbarVisible`, `lastScrollY`, `isDarkMode`, `hasError`)
- Constants/Config objects: UPPER_SNAKE_CASE for globals or object properties for local config (e.g., `CONFIG` with nested properties, `PERSPECTIVE`, `ContactItems`)
- Derived/computed values: camelCase (e.g., `currentScrollY`, `scrollThreshold`, `particlesPerTrail`, `trailIndex`)

**Types:**
- Interface names: PascalCase (e.g., `ButtonProps`, `HeaderProps`, `ContactListProps`, `PortfolioItem`, `SkillCategory`, `PortfolioDialogProps`)
- Type aliases: PascalCase (e.g., `ContactItem`, `AnchorProps`, `ListProps`, `ListItemProps`, `BadgeProps`)
- Discriminated union properties: camelCase (e.g., `styleVariant`, `technical_highlights`)

**React Components:**
- Default exports for main components (e.g., `export default App;`)
- Named exports for sub-components when needed (e.g., `export const List`, `export const ListItem`)
- Props type pattern: `ComponentNameProps` extending `React.HTMLProps<HTMLElement>` when inheriting native attributes

## Code Style

**Formatting:**
- No explicit linter configured (ESLint/Prettier not in dependencies)
- Indentation: 2 spaces (observed throughout codebase)
- Line length: no strict limit observed, but lines kept reasonable (80-120 characters typical)
- Semicolons: consistently used
- Quotes: double quotes for strings, single quotes in JSX attributes

**TypeScript:**
- Strict mode enabled: `"strict": true` in `tsconfig.json`
- No strict enforcement of unused locals/parameters: `"noUnusedLocals": false`, `"noUnusedParameters": false`
- ES2020 target for modern JavaScript features
- JSX: react-jsx mode (automatic JSX transform)
- Explicit type annotations on function parameters and return types
- Type definitions: interfaces for complex props, type aliases for unions

**Import/Export Style:**
- ES6 module syntax throughout
- Default imports for components: `import ComponentName from "..."`
- Named imports for utilities and types
- Relative paths with `../../` for data and sibling components
- Centralized data in `src/data/` directory

## Import Organization

**Order:**
1. React/React DOM imports (e.g., `import React from "react"`)
2. External libraries and packages (e.g., `@fortawesome/*`, `react-router-dom`, `three`)
3. Internal components (e.g., `import Navbar from "./Navbar"`)
4. Internal data/utilities (e.g., `import portfolioData from "../../data/portfolioData"`)
5. Styles (e.g., `import "../styles/document.css"`)

**Path Aliases:**
- Vite path alias configured: `@` resolves to `./src` (in `vite.config.ts`)
- However, aliases not used in observed codebase; relative paths preferred
- Path alias available for future use if needed

**Example from codebase (`src/App.tsx`):**
```typescript
import ThreeBackground from "./components/ThreeBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./components/portfoilo/Portfolio";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import ContactList from "./components/ContactList";
```

## Error Handling

**Patterns:**
- Try-catch blocks for error-prone operations (e.g., color parsing, DOM queries, Three.js initialization)
- Fallback values on error: `const fallbackColor = 0x0b8bd5;`
- Console logging with severity levels: `console.error()`, `console.warn()`, `console.log()`
- Error-safe operations with type guards: `error instanceof Error ? error.message : String(error)`

**Example from `ThreeBackground.tsx`:**
```typescript
try {
  const cleanColor = colorValue.replace('#', '');
  if (!/^[A-Fa-f0-9]{6}$/.test(cleanColor)) {
    console.warn('Invalid color format, using fallback:', colorValue);
    return 0x0b8bd5; // fallback color
  }
  return parseInt(cleanColor, 16);
} catch (error) {
  console.warn('Color parsing failed, using fallback:', error);
  return 0x0b8bd5; // fallback color
}
```

- Error Boundary component: Class-based error boundary for React error isolation (`src/components/ErrorBoundary.tsx`)
  - Catches errors during rendering and provides graceful fallback UI
  - Logs errors with limited stack trace for security
  - Optional `onError` callback for custom error handling
  - Security-focused: doesn't expose detailed error messages to users

## Logging

**Framework:** `console` object (no logging library)

**Patterns:**
- `console.log()`: initialization messages and general debugging (e.g., "ThreeBackground: Canvas mounted...")
- `console.warn()`: recoverable errors with fallback values (e.g., "Invalid color format, using fallback...")
- `console.error()`: critical failures (e.g., "Three.js initialization error")

**Guidelines:**
- Logs include context: variable values, operation being performed
- Security consideration: avoid logging sensitive data
- In `ThreeBackground.tsx`: logs are contextual for Three.js initialization debugging
- Error messages include helpful fallback information

## Comments

**When to Comment:**
- Security implications (marked with `// Security:` prefix)
- Complex algorithms or non-obvious logic (e.g., perspective calculations in ThreeBackground)
- Configuration explanations (CONFIG object with inline comments)
- Browser API gotchas (e.g., focus management in Navbar)

**JSDoc/TSDoc:**
- Used sparingly; only observed in `ErrorBoundary.tsx`
- Block comment style: `/** ... */` for component documentation
- Single-line comments for implementation details: `// ...`

**Example from `ErrorBoundary.tsx`:**
```typescript
/**
 * Security-focused Error Boundary for Three.js and other components
 * Prevents crashes from propagating and provides graceful degradation
 */
class ErrorBoundary extends Component<Props, State> {
  // ...
}
```

**Example from `ThreeBackground.tsx`:**
```typescript
// Security: Color validation utility
const validateHexColor = (color: string): boolean => {
  // ...
};

// ===== CONFIGURABLE ANIMATION SETTINGS =====
const CONFIG = {
  // Particle Settings
  particleCount: 50,
  // ...
};
```

## Function Design

**Size:** Functions tend to be compact (10-50 lines typical), with longer functions for:
- Animation loops (e.g., `animate()` in ThreeBackground)
- Component render methods (e.g., `Navbar` component ~280 lines)
- Complex initialization (e.g., Three.js setup in ThreeBackground)

**Parameters:**
- Props pattern: single props object extending `React.HTMLProps<T>` for components
- Event handlers: receive React event objects (e.g., `handleScroll()`, `handleKeyDown()`)
- Destructuring in function signatures: `const { icon, children, className } = props;`

**Return Values:**
- React components: return JSX or null
- Event handlers: mostly void (state setters called in body)
- Utility functions: explicit return types (boolean, number, object, null)
- Pattern: early returns for guard clauses (e.g., `if (!canvas) return;`)

**Example functional component pattern:**
```typescript
type ButtonProps = {
  icon?: IconDefinition;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const { icon, children, className } = props;
  return (
    <button className={`${className || ""}`}>
      {icon && <span><FontAwesomeIcon icon={icon} /></span>}
      {children}
    </button>
  );
};

export default Button;
```

## Module Design

**Exports:**
- Default exports for main components: `export default ComponentName;`
- Named exports for utility functions and types: `export const functionName = ...;`, `export interface TypeName { ... }`
- Data modules export both named and default: `export const data = [...]; export default data;`

**Barrel Files:**
- Not used in this codebase; each file explicitly imports from source
- Components imported individually from their file paths

**Example export patterns:**

From `src/components/List.tsx`:
```typescript
export const List: React.FunctionComponent<ListProps> = (props: ListProps) => { ... };
export const ListItem: React.FunctionComponent<ListItemProps> = (props: ListItemProps) => { ... };
export default List;
```

From `src/data/experienceData.ts`:
```typescript
export interface ExperienceItem { ... }
export const experienceData: ExperienceItem[] = [...];
export default experienceData;
```

## Accessibility

**Patterns:**
- ARIA attributes: `role`, `aria-label`, `aria-expanded`, `aria-hidden`, `aria-live`
- Focus management: explicit focus handling in interactive components (Navbar)
- Semantic HTML: `<nav>`, `<article>`, `<section>` tags used appropriately
- Keyboard navigation: Escape key handlers, tab management
- Color contrast: dark mode support with CSS custom properties

**Example from `Navbar.tsx`:**
```typescript
// Focus management for accessibility
if (newMenuState && firstMenuItemRef.current) {
  setTimeout(() => {
    firstMenuItemRef.current?.focus();
  }, 100);
}

// Keyboard navigation handler
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isMenuOpen]);
```

## State Management

**Patterns:**
- React Hooks for functional components: `useState`, `useEffect`, `useRef`, `useCallback`
- Custom hooks for reusable logic: `useDarkMode` hook in Navbar
- Context not used (simple state scope)
- localStorage for persistence: theme preference stored with `localStorage.getItem/setItem`
- Local component state for UI state (menu open, scroll position, animation refs)

**Dependencies:**
- `useEffect` dependency arrays explicitly specified
- Event listener cleanup: always returned from useEffect with remove/off calls
- Animation frame cleanup: `cancelAnimationFrame` called on unmount

---

*Convention analysis: 2026-01-27*
