# Resume & Portfolio Site - Production Quality

## What This Is

A professional resume and portfolio site for Alex MJ showcasing senior frontend engineering capabilities. React 18 single-page application with Three.js 3D animated background, portfolio showcase with modal dialogs, dark mode support, and responsive design. Built with TypeScript, Tailwind CSS, and Vite. Deployed at alexmj212.dev.

## Core Value

Production-quality code that demonstrates senior frontend engineering expertise to hiring managers and technical reviewers during active job search.

## Requirements

### Validated

<!-- Already shipped and working in production -->

- ✓ React 18 SPA with TypeScript and strict mode — existing
- ✓ Three.js 3D animated particle background with perspective trails — existing
- ✓ Multi-route architecture (home, resume, cover letter pages) — existing
- ✓ Dark mode with system preference detection and localStorage persistence — existing
- ✓ Portfolio section with modal dialog for detailed project views — existing
- ✓ Skills and experience sections with data-driven components — existing
- ✓ Responsive design with mobile-optimized navigation — existing
- ✓ Error boundary wrapping Three.js for graceful degradation — existing
- ✓ Semantic HTML and basic accessibility (ARIA, keyboard nav) — existing
- ✓ GitHub Pages deployment with custom domain — existing

### Active

<!-- Current scope for this improvement phase -->

- [ ] **MEM-01**: Fix memory leak in Three.js animations and dialog event handlers
- [ ] **MEM-02**: Add memory profiling tests to verify leak prevention
- [ ] **TEST-01**: Add comprehensive unit test coverage for critical components
- [ ] **TEST-02**: Add integration tests for portfolio modal interactions
- [ ] **TEST-03**: Add accessibility testing with axe-core
- [ ] **A11Y-01**: Improve WCAG 2.1 AA compliance (keyboard navigation, screen readers)
- [ ] **A11Y-02**: Add skip links and better focus management
- [ ] **A11Y-03**: Improve ARIA labels and semantic structure
- [ ] **PORT-01**: Fix portfolio section layout bugs
- [ ] **PORT-02**: Fix portfolio interactive bugs (dialog close paths, state cleanup)
- [ ] **PERF-01**: Add performance monitoring (web vitals tracking)
- [ ] **PERF-02**: Optimize Three.js animation (pause when off-screen, adaptive particle count)
- [ ] **DEBT-01**: Remove debug console logging from production code
- [ ] **DEBT-02**: Consolidate theme management (eliminate dual implementations)
- [ ] **DEBT-03**: Replace deprecated addListener() with addEventListener()
- [ ] **DEBT-04**: Fix theme detection logic error in dark-mode.tsx

### Out of Scope

- Enhanced features (full dark mode polish, print-optimized view, portfolio filtering) — defer to v2, focus on core quality
- Content changes or new portfolio projects — keeping current projects, fixing presentation only
- Major visual redesign — maintaining overall aesthetic and brand identity
- Backend or CMS integration — static site architecture preserved
- Blog or dynamic content features — portfolio focus only
- Real-time analytics dashboard — basic web vitals sufficient for v1

## Context

**Purpose:** Active job search for senior frontend engineer roles - site serves as both resume and code sample for technical review.

**Current state:** Working production site with known issues that need addressing before sharing with hiring managers. Memory leak concerns identified but not yet reproduced. Portfolio section has reported layout and interaction bugs. No test coverage exists despite test dependencies in package.json.

**Technical environment:**
- React 18.3.1 with TypeScript 4.7.4
- Vite 5.4.19 build system
- Three.js 0.179.1 for 3D graphics
- Tailwind CSS 3.4.17 for styling
- Playwright 1.54.2 available for E2E testing
- Deployed via GitHub Actions to GitHub Pages

**Urgency:** Actively interviewing - timeline is tight. Need high-impact improvements that demonstrate senior engineering capabilities quickly.

**Capabilities to emphasize:**
1. Performance engineering (memory management, optimization, web vitals)
2. Code quality (testing strategy, maintainability, patterns)
3. Accessibility (WCAG compliance, inclusive design)
4. Architecture (component design, state management, scalability)

## Constraints

- **Content**: Keep current portfolio projects unchanged — fix presentation bugs but no content modifications
- **Design**: Maintain overall aesthetic and visual identity — can adjust implementation details but preserve brand look and feel
- **Stack**: Preserve current architecture (React 18, TypeScript, Vite, Three.js) — no framework migrations or major dependency changes
- **Timeline**: Active interviews mean quick iteration required — prioritize production-quality fixes over experimental features
- **Hosting**: GitHub Pages with custom domain (alexmj212.dev) — static site deployment only
- **Browser support**: Modern browsers (>0.2% market share, ES2020 compatible) — no IE11 support needed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fix memory leak as P0 | Can't showcase anything if site crashes; demonstrates diagnostic skills | — Pending |
| Add test coverage before refactoring | Provides safety net for improvements; shows quality mindset | — Pending |
| Maintain Three.js background | Visual differentiator; shows graphics/performance expertise when optimized | — Pending |
| Keep existing dark mode | Already working; consolidate implementation rather than rebuild | — Pending |

---
*Last updated: 2026-01-27 after initialization*
