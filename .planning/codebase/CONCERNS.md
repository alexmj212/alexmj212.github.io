# Codebase Concerns

**Analysis Date:** 2026-01-27

## Tech Debt

**Debug Console Logging in ThreeBackground**
- Issue: Multiple `console.log()` and `console.warn()` statements left in production code for debugging purposes
- Files: `src/components/ThreeBackground.tsx` (lines 54-55, 58, 321, 330)
- Impact: Console spam in production environment, potential performance impact with verbose logging on every animation frame
- Fix approach: Remove or wrap debug logs behind environment flag (e.g., `import.meta.env.DEV`), or use conditional logging with a feature flag

**Inconsistent Theme Management**
- Issue: Two separate theme implementations that don't communicate cleanly - `dark-mode.tsx` and Navbar's internal `useDarkMode()` hook
- Files: `src/dark-mode.tsx`, `src/components/Navbar.tsx` (lines 4-26)
- Impact: Risk of theme state divergence; potential duplication of theme logic; hard to maintain consistency across the app
- Fix approach: Consolidate theme logic into single hook/context, export from central location, use only in Navbar

**addListener() Deprecated API**
- Issue: `window.matchMedia().addListener()` is deprecated in favor of `addEventListener()`
- Files: `src/dark-mode.tsx` (line 43)
- Impact: Will break in future browsers; console warnings in strict mode browsers
- Fix approach: Replace `addListener()` with `addEventListener()` for forward compatibility

## Known Bugs

**Theme Detection Logic Error**
- Symptoms: `localStorage.theme === themeOptions` comparison always fails (comparing string to enum object)
- Files: `src/dark-mode.tsx` (line 37)
- Trigger: On first app load with no stored theme preference
- Workaround: User's OS theme preference is detected via `window.matchMedia()` so fallback works, but logic is incorrect
- Impact: Theme detection relies on fallback behavior; the actual intended comparison never evaluates correctly

**Dialog Event Handler Cleanup Issue**
- Symptoms: Multiple event listeners registered on dialog without tracking which ref they're attached to
- Files: `src/components/portfoilo/Portfolio.tsx` (lines 52-60)
- Trigger: Opening/closing portfolio items repeatedly
- Potential: If `dialogRef.current` changes, old listeners may persist
- Impact: Possible memory leaks or stale handlers in long sessions with many portfolio interactions

**Image Error Handling Silent Failures**
- Symptoms: Missing portfolio images silently hide via CSS without user feedback
- Files: `src/components/portfoilo/Portfolio.tsx` (lines 86-88, 210-212)
- Trigger: Broken image path or network error loading assets
- Workaround: None; broken images just disappear
- Impact: Users don't know if portfolio content failed to load; poor UX for missing assets

## Security Considerations

**XSS Risk in Portfolio Data**
- Risk: Portfolio data from `portfolioData.ts` renders user-provided HTML content without sanitization
- Files: `src/data/portfolioData.ts`, `src/components/portfoilo/Portfolio.tsx` (lines 107-118)
- Current mitigation: Content is hardcoded by developer, not from external/user sources
- Recommendations: If portfolio content ever comes from external API or user input, implement DOMPurify or similar sanitization

**Deprecated Keyboard Event API**
- Risk: `addListener()` is deprecated and may be removed, leaving keyboard interaction broken
- Files: `src/dark-mode.tsx` (line 43)
- Current mitigation: Fallback to system theme still works via initial `matchMedia()` call
- Recommendations: Update to `addEventListener()` immediately to avoid future breakage

**LocalStorage Theme Vulnerability**
- Risk: Theme preference stored in plaintext localStorage without validation
- Files: `src/dark-mode.tsx`, `src/components/Navbar.tsx`
- Current mitigation: Values validated as enum types at runtime (DARK/LIGHT)
- Recommendations: Continue to validate all localStorage reads before use; consider initializing with safe defaults

## Performance Bottlenecks

**Three.js Canvas at Full Viewport**
- Problem: Canvas rendered at 100% viewport size with full resolution on every device
- Files: `src/components/ThreeBackground.tsx` (lines 74-75, 352-374)
- Cause: No responsive pixel ratio adjustment for low-end devices; animations on 50 particles run every frame
- Current impact: Mobile devices and older browsers may experience frame drops
- Improvement path: Implement adaptive pixel ratio based on FPS; consider reducing particle count on low-performance devices; add performance monitoring

**Navbar Scroll Event High Frequency**
- Problem: `handleScroll()` fires on every scroll pixel, potentially thousands of times during page navigation
- Files: `src/components/Navbar.tsx` (lines 76-89)
- Cause: No throttling or debouncing on scroll listener
- Impact: Expensive state updates and DOM re-renders during scrolling
- Improvement path: Throttle scroll handler to 60fps or lower; consider Intersection Observer API instead for hiding navbar

**Animation Frame Loop Without Optimization**
- Problem: Three.js animation loop re-calculates particle positions every frame without incremental updates
- Files: `src/components/ThreeBackground.tsx` (lines 272-308)
- Cause: Full recalculation of 50 particle positions regardless of visibility
- Impact: Unnecessary computation when canvas is off-screen (e.g., user scrolled past hero)
- Improvement path: Pause animation when canvas is not in viewport using Intersection Observer; implement viewport culling

## Fragile Areas

**ThreeBackground Component Coupled to DOM**
- Files: `src/components/ThreeBackground.tsx`
- Why fragile: Tightly coupled to specific CSS variables, viewport dimensions, and DOM structure; any CSS refactoring could break animations
- Safe modification: Use CSS custom properties with fallback values; test viewport changes after modifications; validate color parsing with unit tests
- Test coverage: No unit tests; integration tested only through manual viewport changes

**PortfolioDialog State Management**
- Files: `src/components/portfoilo/Portfolio.tsx` (lines 10-162)
- Why fragile: Multiple ways to close dialog (onClose, Escape key, backdrop click) with inconsistent state cleanup
- Safe modification: Test all close paths; verify `document.body.classList.remove('overflow-hidden')` is called; check for memory leaks with DevTools
- Test coverage: Gaps in testing modal interactions and cleanup paths

**Typo in Directory Name**
- Issue: Directory named `portfoilo/` instead of `portfolio/`
- Files: `src/components/portfoilo/`
- Why fragile: Spelling inconsistency; any developer copying the pattern will likely misspell
- Safe modification: Consider renaming directory to correct spelling in future refactor (breaking change to imports)
- Current impact: Low; imports work correctly, but confusing for new developers

## Scaling Limits

**Particle Count Hard-coded**
- Current capacity: 50 particles with fixed 16-unit trails
- Limit: Performance degrades noticeably on low-end mobile (60fps target)
- Scaling path: Make particle count responsive; reduce by 50% on mobile; monitor GPU usage with performance API

**Portfolio Data Structure**
- Current capacity: 7 portfolio items with image arrays
- Limit: No pagination or virtual scrolling; all items rendered in DOM
- Scaling path: If scaling beyond 20 items, implement virtual scrolling or lazy loading; consider server-side data fetching

**CSS Bundle Size**
- Current: Tailwind CSS compiled with all utilities included
- Limit: 15% optimization mentioned in TwinSpires dark mode project but not replicated here
- Scaling path: Configure Tailwind to purge unused utilities; use production builds consistently

## Dependencies at Risk

**Three.js Version**
- Risk: ^0.179.1 pinned loosely with caret; no major version lock
- Current usage: Core animation rendering; breaking changes in new major version would require refactor
- Impact: If major version released, would need to test canvas compatibility and potentially rewrite animation code
- Migration plan: Keep on 0.x until stable 1.0; when upgrading, isolate Three.js behind abstraction layer for easier updates

**React Router v7 Breaking Changes**
- Risk: react-router-dom ^7.8.2 is relatively new; app only has 3 routes
- Current usage: Navigation between main app, resume, and cover letter
- Impact: Low risk given simple routing; but future v8+ could introduce breaking changes
- Migration plan: Maintain version lock; defer major upgrades until next full app rebuild

**React 18 Suspense Not Used**
- Risk: Code-splitting and lazy loading not implemented; entire app loads upfront
- Impact: Bundle size penalty; slower initial load on poor connections
- Scaling path: Implement lazy loading for Resume and CoverLetter routes using React.lazy()

## Missing Critical Features

**No Testing Infrastructure**
- Problem: Zero unit or integration tests despite test setup dependencies
- Blocks: Quality assurance; confidence in refactoring; CI/CD validation
- Recommendation: Add vitest or Jest configuration; start with critical components (ErrorBoundary, ThreeBackground, Portfolio modal)

**No Error Logging Service**
- Problem: Errors logged to console only; no remote error tracking
- Blocks: Production error diagnosis; tracking Three.js failures in user sessions
- Recommendation: Integrate Sentry or similar for error tracking in production

**No Accessibility Testing**
- Problem: ARIA attributes added to Navbar but untested; no keyboard navigation tests
- Blocks: Ensuring truly accessible experience for users with disabilities
- Recommendation: Add axe-core integration tests; test keyboard-only navigation flows

## Test Coverage Gaps

**ThreeBackground Component Untested**
- What's not tested: Canvas initialization, animation loop, resize handling, color parsing, theme switching
- Files: `src/components/ThreeBackground.tsx`
- Risk: Complex Three.js integration could silently fail; deprecations in Canvas API not caught
- Priority: High (core visual feature; complex error surface)

**Portfolio Modal Interactions Untested**
- What's not tested: Dialog open/close, event handler cleanup, image loading errors, keyboard escape, backdrop click
- Files: `src/components/portfoilo/Portfolio.tsx`
- Risk: Memory leaks from stale listeners; modal state inconsistencies; body overflow-hidden lingering
- Priority: High (user interaction critical path)

**Dark Mode Theme Switching Untested**
- What's not tested: Toggle logic, localStorage persistence, OS preference detection, CSS class application
- Files: `src/dark-mode.tsx`, `src/components/Navbar.tsx`
- Risk: Theme logic fragility; localStorage bugs silently break user experience
- Priority: Medium (non-critical but affects all users)

**ErrorBoundary Fallback Untested**
- What's not tested: Error catching, fallback rendering, stack trace limiting, error callbacks
- Files: `src/components/ErrorBoundary.tsx`
- Risk: Error boundary might not catch specific error types; fallback UI could fail to render
- Priority: Medium (safety net; needs to work when things break)

**Resume and CoverLetter Routes Untested**
- What's not tested: Page navigation, content rendering, data loading
- Files: `src/components/Resume.tsx`, `src/components/CoverLetter.tsx`
- Risk: Broken links; navigation failures; orphaned routes not caught in CI
- Priority: Medium (lower traffic but still critical user paths)

---

*Concerns audit: 2026-01-27*
