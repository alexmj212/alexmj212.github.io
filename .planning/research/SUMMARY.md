# Project Research Summary

**Project:** Quality Engineering Enhancement for React Portfolio
**Domain:** Production-grade React 18 + TypeScript + Vite SPA with Three.js
**Researched:** 2026-01-27
**Confidence:** HIGH

## Executive Summary

This portfolio site requires production-quality quality engineering infrastructure to demonstrate senior frontend engineering capabilities. The research reveals a three-pronged approach: (1) fix critical memory leaks in Three.js and dialog components, (2) establish comprehensive test coverage using Vitest + React Testing Library with browser-native testing for WebGL, and (3) achieve WCAG 2.1 AA accessibility compliance through automated and manual validation.

The recommended stack leverages Vitest over Jest for 10-20x faster test execution and native Vite integration. Vitest Browser Mode enables testing Three.js canvas components in real browsers with actual WebGL, avoiding brittle mocks. Accessibility testing combines automated tools (vitest-axe, @axe-core/playwright) with mandatory manual screen reader validation, acknowledging that automated tools only catch ~30% of accessibility issues.

The critical risk is memory leaks from incomplete Three.js resource disposal and stale event listener references in dialog components. These are already present in production and compound over user sessions, degrading performance and potentially crashing browser tabs. Immediate action required: comprehensive disposal in useEffect cleanup, verified through Chrome DevTools heap snapshots showing memory stabilization after repeated mount/unmount cycles.

## Key Findings

### Recommended Stack

The testing infrastructure centers on Vitest as the test runner, with specialized tools for different testing layers. Vitest provides native Vite integration, 10-20x faster execution than Jest, and ESM support out of the box. Critical for this project: Vitest Browser Mode enables testing Three.js components with real WebGL instead of unreliable mocks.

**Core technologies:**
- **Vitest v4.0.17 + React Testing Library**: Unit and component test runner with user-centric testing utilities — industry standard for Vite projects in 2026
- **@vitest/browser + Playwright**: Browser-native testing mode for Three.js/WebGL components — catches issues JSDOM cannot detect
- **vitest-axe + axe-core**: Automated accessibility testing integrated into component tests — catches ~30% of WCAG issues automatically
- **@axe-core/playwright**: E2E accessibility validation in real browser context — more accurate than JSDOM-based tests
- **MSW (Mock Service Worker)**: API mocking at network level — reusable across Vitest, Playwright, and Storybook (if added later)
- **web-vitals**: Core Web Vitals tracking library — official Google library for measuring LCP, INP, CLS
- **Lighthouse CI**: Performance budgets in CI/CD — automated audits that fail PRs if performance regresses

**Version compatibility warning:** Current project uses TypeScript 4.7.4 and Vite 5.4.19. Vitest 4.x requires TypeScript 5.4+ and Vite 6.0+. Recommend upgrading both before test infrastructure implementation to avoid compatibility issues.

### Expected Features

The research identifies features across four categories: table stakes (required for professional credibility), differentiators (showcases senior expertise), anti-features (common mistakes to avoid), and dependencies between features.

**Must have (table stakes):**
- **Unit Testing (Component)**: React Testing Library + Vitest for basic component rendering and user interactions — production sites have tests, senior engineers write tests
- **Responsive Design Validation**: Already implemented via Tailwind, needs testing verification
- **Performance Basics**: Core Web Vitals (LCP <2.5s, INP <200ms, CLS <0.1) — table stakes for SEO
- **Accessibility Fundamentals**: WCAG 2.1 AA compliance (semantic HTML, ARIA labels, keyboard navigation) — legal requirement with 2026 deadlines
- **Error Boundaries**: Expand beyond Three.js to route-level boundaries — prevents white screen of death
- **Clean Console**: Remove dev console.logs, handle React warnings — sign of code quality

**Should have (competitive differentiators):**
- **Memory Leak Detection & Prevention**: Demonstrates advanced debugging skills, addresses known Three.js issue in codebase
- **Automated Accessibility Testing**: jest-axe + axe-core in CI catches regressions before deployment
- **E2E Testing (Critical Flows)**: Playwright for 3-5 critical user journeys — few portfolios test end-to-end
- **Performance Monitoring (RUM)**: Web Vitals API tracks LCP, INP, CLS from real users
- **Lighthouse CI in GitHub Actions**: Automated performance budgets prevent regressions — fails PR if LCP >2.5s or accessibility score <90
- **Continuous Testing in CI**: Every PR runs unit, a11y, E2E tests, and Lighthouse — full quality gate

**Explicitly avoid (anti-features):**
- **100% Test Coverage**: Diminishing returns after ~80% — target 80% with focus on critical paths, document what's NOT tested and why
- **Testing Every Component**: Not all components need unit tests — test integration points and user flows over implementation details
- **Premium Monitoring Services**: Datadog/New Relic costs exceed portfolio value — use free tiers: Web Vitals API + Google Analytics 4 for RUM
- **Comprehensive E2E Test Suite**: Maintenance nightmare — limit to 3-5 critical flows: portfolio browsing, resume download, theme toggle, mobile navigation

**Feature dependencies:**
```
Testing Foundation (Vitest + RTL)
  ├─→ Test Coverage Reporting
  ├─→ Continuous Testing in CI
  └─→ E2E Testing (shared utilities)

Accessibility Fundamentals (semantic HTML, ARIA)
  ├─→ Automated Accessibility Testing (vitest-axe)
  ├─→ Manual Accessibility Audit (screen readers)
  └─→ Lighthouse CI (a11y score threshold)

Performance Stack (Core Web Vitals)
  ├─→ Performance Monitoring (Web Vitals API)
  ├─→ Performance Budget Enforcement
  └─→ Memory Leak Detection
```

### Architecture Approach

Quality engineering infrastructure follows a layered testing pyramid architecture with integrated performance monitoring and accessibility tooling. The architecture leverages Vite's native ESM support and dev server for fast test execution, browser-native performance profiling via React DevTools and Chrome's Performance panel, and automated accessibility validation at both component and E2E layers.

**Architectural Principle:** Colocate quality tooling with existing code while maintaining clear separation of concerns through configuration files and dedicated test utilities.

**Major components:**
1. **Vitest Layer (Unit/Integration)** — Colocated `.test.tsx` files next to components, runs in jsdom (for accessibility tests) or happy-dom (for speed), MSW for API mocking, vitest-axe for automated WCAG checks
2. **Playwright Layer (E2E)** — Separate `/e2e` folder, 3-5 critical user journeys, @axe-core/playwright for full-page accessibility audits, runs in CI on PR creation
3. **Performance Monitoring** — React Profiler API for component render tracking, Chrome DevTools Performance panel for memory profiling, web-vitals for production RUM tracking
4. **CI/CD Integration** — GitHub Actions workflows for unit tests (fast, blocks commits), E2E tests (slower, runs on PR), and Lighthouse CI (performance budgets)

**Recommended structure:**
```
src/
  components/
    App.tsx
    App.test.tsx              # Colocated component test
    Portfolio.tsx
    Portfolio.test.tsx        # Colocated component test
  test-utils/
    renderWithRouter.tsx      # Shared test utilities
    axe-config.ts             # Accessibility test config
    mocks/                    # MSW handlers
  setupTests.ts               # Global test setup

e2e/                          # Separate E2E tests
  tests/
    portfolio.spec.ts
    accessibility.spec.ts
  playwright.config.ts

.github/workflows/
  test.yml                    # Unit + integration (fast)
  e2e.yml                     # E2E tests (slower)
  accessibility.yml           # Dedicated a11y audits
```

**Critical patterns:**
- **Colocated Component Testing**: `.test.tsx` files next to components encourage testing during development, reduce context switching
- **MSW for API Mocking**: Network-level interception reusable across Vitest, Playwright, Storybook (if added)
- **E2E Critical Journeys Only**: Limit to 3-5 flows following testing pyramid (70% unit, 20% integration, 10% E2E)
- **React Profiler API**: Programmatic performance measurement for ThreeBackground and performance-critical components
- **Bundle Analysis in CI**: Vite bundle analyzer + size budgets prevent bloat from reaching production

### Critical Pitfalls

Research identified six critical pitfalls with project-specific relevance based on CONCERNS.md analysis.

1. **Incomplete Three.js Resource Disposal** — Three.js creates GPU resources (geometries, materials, textures) that JavaScript's garbage collector cannot automatically free. Missing even one `.dispose()` call causes permanent GPU memory leaks. **Prevention:** Dispose ALL resources in useEffect cleanup (geometries, materials, textures, render targets, scenes, renderer), monitor `renderer.info.memory` for leak detection. **Warning signs:** FPS degrades over time, browser memory grows without plateau, `renderer.info.memory.geometries` counts increase on remount.

2. **Event Listener Stale References in Dialog Handlers** — Dialog components register event listeners without tracking ref identity. Old listeners persist when `dialogRef.current` changes, causing multiple handlers to fire or stale state references. **Prevention:** Store listener functions in refs to ensure cleanup removes SAME function reference, use `useCallback` with stable dependencies, test repeated open/close cycles. **Warning signs:** Escape key triggers multiple closes, DevTools shows duplicate event handlers, body class `overflow-hidden` persists after close.

3. **Testing Three.js Canvas Without Proper Mocks** — Three.js relies on WebGL APIs unavailable in Node/JSDOM. Tests fail with "WebGL not supported" or developers skip canvas tests entirely. **Prevention:** Use Vitest Browser Mode with real Chrome/Firefox for WebGL, use `@react-three/test-renderer` for unit tests in Node, Playwright for E2E visual regression. **Warning signs:** Tests pass but production has canvas crashes, coverage shows ThreeBackground as "tested" but only mocks exercised.

4. **Canvas Accessibility as an Afterthought** — Adding `<canvas aria-label="...">` isn't sufficient; screen readers see a black box. Canvas renders pixels, not DOM elements, so accessibility tree has no semantic structure. **Prevention:** Create "shadow DOM" of accessible equivalent HTML alongside canvas (visually hidden), use `role="img"` and descriptive `aria-label` for decorative canvas, provide keyboard alternatives for interactive elements, test with NVDA/JAWS screen readers. **Warning signs:** Automated scans pass but manual screen reader testing fails.

5. **Adding Tests That Break Production Functionality** — Introducing test infrastructure triggers subtle bugs: environment-specific code breaks, CSS modules don't load, test mocks interfere with browser behavior. **Prevention:** Start with static analysis (ESLint) before tests, test new code first to prove infrastructure works, use feature flags (`import.meta.env.VITEST`), run tests in CI BEFORE merge. **Warning signs:** Tests pass locally but fail in CI, production build includes test utilities, `npm run build` fails after adding test config.

6. **Modal Accessibility Without Keyboard Trap Testing** — Modal dialogs have ARIA attributes but fail real-world usage: Tab escapes modal, focus doesn't return after close, Escape doesn't work. Browsers don't enforce focus trapping automatically. **Prevention:** Implement focus trap (Tab cycles to first on last element, Shift+Tab cycles to last on first), set `aria-modal="true"` and `role="dialog"`, move focus to first focusable element on open, restore focus to trigger on close, support Escape in ALL states. **Warning signs:** Tab moves focus behind modal, closing modal leaves focus on body, screen reader doesn't announce "dialog opened".

## Implications for Roadmap

Based on combined research, the roadmap should follow a four-phase structure that addresses memory leaks first (production risk), establishes testing foundation second (enables quality validation), adds accessibility third (legal requirement), and integrates advanced quality features fourth (competitive differentiation).

### Phase 1: Memory Leak Fixes & Error Handling
**Rationale:** Critical bugs already in production. Memory leaks compound over user sessions and degrade performance. Must fix before building test infrastructure to validate fixes.

**Delivers:**
- Comprehensive Three.js resource disposal in ThreeBackground component
- Event listener cleanup refactor in Portfolio dialog component
- Route-level error boundaries expansion
- Clean console (no warnings/errors in production build)

**Addresses Pitfalls:**
- Pitfall 1: Incomplete Three.js disposal
- Pitfall 2: Event listener stale references

**Verification:** Chrome DevTools Memory profiler shows heap stabilization after 5x mount/unmount cycles, `renderer.info.memory` counts return to baseline.

**Research flag:** NO — Standard patterns documented, Chrome DevTools workflow sufficient.

### Phase 2: Test Infrastructure Foundation
**Rationale:** Must establish testing foundation before adding features. Required to validate memory leak fixes and prevent regressions. Unit tests are prerequisite for coverage reporting, CI integration, and E2E test utilities.

**Delivers:**
- Vitest + React Testing Library installation and configuration
- First colocated component tests (Button, Navbar, simple components)
- Test utilities folder (`/src/test-utils/`) with shared helpers
- MSW setup for API mocking (if components make HTTP requests)
- Vitest Browser Mode configuration for Three.js testing
- Test coverage reporting (70% threshold initially)

**Uses Stack Elements:**
- Vitest v4.0.17 (requires TypeScript 5.4+ and Vite 6.0+ upgrade)
- React Testing Library v16.1.0
- @vitest/browser for WebGL testing
- MSW v2.8.3 for API mocking

**Addresses Pitfalls:**
- Pitfall 3: Testing Three.js without proper mocks
- Pitfall 5: Adding tests that break production

**Verification:** `npm run test` passes with >70% coverage, Browser Mode tests validate ThreeBackground with real WebGL, CI runs tests on every commit without breaking production build.

**Research flag:** NO — Vitest setup is well-documented for Vite projects, React Testing Library patterns are industry standard.

### Phase 3: Accessibility Baseline
**Rationale:** WCAG 2.1 AA compliance is legal requirement (2026 deadlines). Automated accessibility testing integrates into existing test suite established in Phase 2. Must address semantic HTML and focus management before building advanced features.

**Delivers:**
- Accessibility fundamentals audit and fixes (semantic HTML, ARIA labels)
- vitest-axe integration into component tests
- @axe-core/playwright integration for E2E accessibility audits
- Modal dialog focus trap implementation and keyboard navigation
- Canvas accessibility improvements (shadow DOM for semantic equivalents)
- Manual screen reader testing checklist (NVDA/VoiceOver)
- Lighthouse CI with accessibility score threshold (90+)

**Implements Architecture:**
- Vitest Layer: vitest-axe in component tests (30% automated coverage)
- Playwright Layer: Full-page accessibility audits with @axe-core/playwright
- Manual validation: Screen reader testing for canvas and modals

**Addresses Pitfalls:**
- Pitfall 4: Canvas accessibility afterthought
- Pitfall 6: Modal keyboard trap failures

**Verification:** vitest-axe tests pass with zero violations, Playwright accessibility audits pass, manual screen reader testing completed with documented findings, Lighthouse CI accessibility score >90.

**Research flag:** NO — WCAG 2.1 AA guidelines are well-documented, vitest-axe and @axe-core/playwright have clear integration patterns.

### Phase 4: Advanced Quality & CI Integration
**Rationale:** Integrate all quality layers into automated CI pipeline. Add performance monitoring, E2E tests for critical flows, and establish quality gates that block PRs on failures. This phase showcases senior engineering expertise through comprehensive quality engineering.

**Delivers:**
- E2E tests for 3-5 critical user journeys (portfolio browsing, resume navigation, mobile menu, theme toggle, dialog interaction)
- Web Vitals API integration for production RUM tracking
- Lighthouse CI performance budgets (LCP <2.5s, accessibility >90)
- GitHub Actions workflows (unit tests, E2E tests, accessibility audits, Lighthouse)
- Performance profiling documentation (Chrome DevTools workflow, heap snapshot analysis)
- Test coverage badge on README
- Quality gate configuration (tests, a11y, performance all blocking)

**Uses Stack Elements:**
- Playwright v1.54.2 (already installed)
- web-vitals v5.1.0 for production monitoring
- Lighthouse CI v0.14.0 for performance budgets
- GitHub Actions for CI/CD orchestration

**Addresses Features:**
- E2E Testing (Critical Flows)
- Performance Monitoring (RUM)
- Lighthouse CI in GitHub Actions
- Continuous Testing in CI

**Verification:** All GitHub Actions workflows pass on sample PR, E2E tests complete in <5 minutes, performance budgets enforce LCP <2.5s, coverage reporting uploads to GitHub.

**Research flag:** NO — Playwright E2E patterns are well-documented, Lighthouse CI setup is straightforward, GitHub Actions integration has established practices.

### Phase Ordering Rationale

- **Memory leaks first:** Production risk with compounding impact over user sessions. Must fix before building test infrastructure to validate fixes. Memory profiling workflow is independent of test infrastructure.

- **Test infrastructure second:** Required foundation for all subsequent phases. Unit tests enable coverage reporting, CI integration, and provide shared utilities for E2E tests. Vitest Browser Mode specifically needed to test memory leak fixes in ThreeBackground.

- **Accessibility third:** Depends on test infrastructure (vitest-axe integrates into component tests). Semantic HTML fixes inform component test structure. Manual accessibility audit validates automated test results.

- **Advanced quality last:** Integrates everything from previous phases into CI pipeline. E2E tests reuse test utilities from Phase 2. Lighthouse CI validates fixes from Phase 1 and accessibility from Phase 3. Performance monitoring tracks real-world impact.

**Critical path:**
```
Phase 1 (Memory Leaks) ─┐
                         ├─→ Phase 4 (CI Integration)
Phase 2 (Test Infra) ───┤
  ├─→ Phase 3 (A11y) ───┘
  └─→ Phase 4 (E2E)
```

**Parallelization opportunities:**
- Phase 1 and Phase 2 setup (Vitest config) can overlap if memory fixes are scoped separately
- Phase 3 accessibility fundamentals and Phase 4 performance monitoring documentation can happen in parallel after Phase 2

**Estimated duration:**
- Phase 1: 2-3 days (memory leak fixes + verification)
- Phase 2: 3-4 days (test infrastructure + first tests + Browser Mode setup)
- Phase 3: 3-4 days (accessibility audit + automated testing + focus management)
- Phase 4: 3-4 days (E2E tests + CI workflows + performance monitoring)
- **Total:** 11-15 days for complete implementation

### Research Flags

All phases use well-documented patterns and technologies with high-confidence sources. No phases require deeper research during planning.

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Chrome DevTools memory profiling workflow is well-documented, Three.js disposal patterns are established in community
- **Phase 2:** Vitest setup for Vite projects is industry standard, React Testing Library patterns are mature
- **Phase 3:** WCAG 2.1 AA guidelines are comprehensive, vitest-axe/axe-core integration is documented
- **Phase 4:** Playwright E2E patterns are well-established, Lighthouse CI setup is straightforward

**Project-specific validation needed (not research):**
- Phase 1: Verify `renderer.info.memory` API behavior in current Three.js version (0.179.1)
- Phase 2: Validate Vite 6.0+ and TypeScript 5.4+ upgrade path before Vitest 4.x installation
- Phase 3: Manual screen reader testing with NVDA/VoiceOver on actual portfolio content
- Phase 4: GitHub Actions workflow configuration specific to repository settings

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Context7 + official Vitest/React Testing Library docs + verified 2026 sources. Version compatibility matrix clearly documented. Only uncertainty: TypeScript/Vite upgrade impact. |
| Features | **HIGH** | Feature landscape derived from industry standards (WCAG 2.1 AA legal requirements, Core Web Vitals for SEO), validated with multiple 2026 sources. MVP prioritization matrix aligns table stakes vs. differentiators. |
| Architecture | **HIGH** | Layered testing pyramid architecture is industry-standard pattern. Vitest + Playwright integration points documented by official sources. Colocated component testing pattern validated by React community. |
| Pitfalls | **HIGH** | Critical pitfalls directly match CONCERNS.md issues in codebase. Three.js disposal patterns verified by Three.js community + multiple implementation guides. Event listener cleanup patterns are React best practices. |

**Overall confidence:** HIGH

The research is grounded in official documentation (Vitest, React Testing Library, WCAG 2.1, Playwright), industry standards (testing pyramid, WCAG compliance deadlines), and project-specific context (CONCERNS.md memory leak documentation). All recommended technologies are mature (2+ years) with active communities and clear migration paths.

### Gaps to Address

**Version Upgrade Impact (MEDIUM priority):**
- Current project: TypeScript 4.7.4 + Vite 5.4.19
- Vitest 4.x requires: TypeScript 5.4+ + Vite 6.0+
- **Resolution:** Evaluate upgrade path in Phase 2 kickoff. If TypeScript/Vite upgrade is blocked, fallback to Vitest 3.x (compatible with current versions but lacks some newer features).

**Three.js Disposal Completeness (HIGH priority):**
- Research identifies geometries, materials, textures, render targets as requiring disposal
- **Gap:** Current ThreeBackground implementation details unknown — may have additional resources (controls, helpers, composer effects)
- **Resolution:** Audit actual component in Phase 1 kickoff, consult `renderer.info` for complete resource inventory, test disposal with heap snapshots.

**Accessibility Manual Testing Scope (LOW priority):**
- Automated tools catch ~30% of accessibility issues
- Manual screen reader testing required for remaining ~70%
- **Gap:** Scope of manual testing unclear (which screen readers, which browsers, which user flows)
- **Resolution:** Phase 3 planning establishes minimum manual test matrix: NVDA on Chrome (Windows), VoiceOver on Safari (macOS), covering 3 critical flows (homepage, portfolio dialog, navigation).

**Performance Budget Thresholds (LOW priority):**
- Lighthouse CI requires specific thresholds (LCP, INP, CLS values)
- **Gap:** Current performance baseline unknown
- **Resolution:** Phase 4 kickoff runs Lighthouse audit to establish baseline, sets budgets at 110% of current values to prevent regressions without blocking initial setup.

**MSW Usage Determination (LOW priority):**
- MSW recommended for API mocking at network level
- **Gap:** Unknown if portfolio components make HTTP requests requiring MSW
- **Resolution:** Phase 2 planning audits components for fetch/axios calls. If none found, defer MSW setup to future need. If found, implement MSW handlers for those specific endpoints.

## Sources

### Primary (HIGH confidence)

**Official Documentation:**
- [Vitest Guide](https://vitest.dev/guide/) — Test runner configuration, Browser Mode setup, coverage providers
- [Vitest Coverage Guide](https://vitest.dev/guide/coverage.html) — v8 vs. Istanbul comparison, AST remapping accuracy
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/) — Component testing best practices, user-centric queries
- [Playwright Documentation](https://playwright.dev/docs/intro) — E2E test patterns, CI setup, accessibility testing
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) — Accessibility guidelines and success criteria
- [React Profiler API](https://react.dev/reference/react/Profiler) — Performance instrumentation patterns
- [Chrome DevTools Memory Profiling](https://developer.chrome.com/docs/devtools/memory-problems) — Heap snapshot workflow, leak detection

**Context7 Library Research:**
- Vitest configuration and Browser Mode patterns
- React Testing Library integration with Vitest
- Accessibility testing with axe-core

### Secondary (MEDIUM confidence)

**2026 Industry Sources:**
- [How to Unit Test React Components with Vitest and React Testing Library (Jan 2026)](https://oneuptime.com/blog/post/2026-01-15-unit-test-react-vitest-testing-library/) — Current best practices
- [Testing in 2026: Jest, React Testing Library, and Full Stack Testing Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies) — Testing landscape
- [Vitest vs Jest 30: Why 2026 is the Year of Browser-Native Testing](https://dev.to/dataformathub/vitest-vs-jest-30-why-2026-is-the-year-of-browser-native-testing-2fgb) — Vitest performance comparison
- [How to Test React Applications for Accessibility with axe-core (Jan 2026)](https://oneuptime.com/blog/post/2026-01-15-test-react-accessibility-axe-core/view) — Accessibility testing integration
- [Best React Performance Monitoring Tools in 2026](https://embrace.io/blog/best-react-performance-monitoring-tools/) — Performance monitoring landscape
- [What WCAG 2.1 AA Means for ADA Title II Web Compliance in 2026](https://adabook.medium.com/what-wcag-2-1-aa-means-for-ada-title-ii-web-compliance-in-2026-904d60fff912) — Legal requirements

**Three.js Memory Management:**
- [100 Three.js Best Practices (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips) — Resource disposal patterns
- [Three.js Memory Leak Prevention](https://roger-chi.vercel.app/blog/tips-on-preventing-memory-leak-in-threejs-scene) — GPU resource management
- [Dispose things correctly in three.js forum](https://discourse.threejs.org/t/dispose-things-correctly-in-three-js/6534) — Community consensus on disposal

**React Event Cleanup:**
- [Preventing Memory Leaks in React with useEffect Hooks](https://www.c-sharpcorner.com/article/preventing-memory-leaks-in-react-with-useeffect-hooks/) — Event listener patterns
- [How to Avoid Memory Leaks in JavaScript Event Listeners](https://dev.to/alex_aslam/how-to-avoid-memory-leaks-in-javascript-event-listeners-4hna) — Stale reference prevention

### Tertiary (LOW confidence)

**Community Sources:**
- [Three.js Developer Tools](https://discourse.threejs.org/t/three-js-developer-tools/8477) — Browser extension recommendation
- [Performance Profiling Tools for Three.js](https://discourse.threejs.org/t/performance-profiling-tools-cpu-gpu/17469) — Stats.js and GPU profiling
- [Bridging WebGL and Accessibility](https://javascript.plainenglish.io/bridging-webgl-and-accessibility-55e6d7802403) — Canvas accessibility patterns
- [Building an Accessible Modal Dialog in React](https://clhenrick.io/blog/react-a11y-modal-dialog/) — Focus trap implementation

---
*Research completed: 2026-01-27*
*Ready for roadmap: yes*
