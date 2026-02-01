---
phase: 04-performance-ci-integration
plan: 03
subsystem: testing
tags: [playwright, e2e, page-object-model, regression-testing]

# Dependency graph
requires:
  - phase: 03-accessibility-compliance
    provides: WCAG-compliant UI with semantic HTML, ARIA attributes, keyboard navigation
  - phase: 02-testing-infrastructure
    provides: Playwright 1.54.2 installation and browser testing infrastructure
provides:
  - 5 E2E test suites covering critical user flows (12 tests total)
  - Page Object Model architecture for maintainable tests
  - Role-based selectors and web-first assertions
  - Mobile and desktop viewport coverage
affects: [04-05-ci-github-actions]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Page Object Model pattern for E2E tests
    - Role-based selectors (getByRole) for accessibility-driven testing
    - Web-first assertions (toBeVisible, toBeInViewport) instead of hard-coded waits
    - Separate projects for desktop (e2e) and mobile (e2e-mobile) viewports

key-files:
  created:
    - tests/e2e/pages/HomePage.ts
    - tests/e2e/pages/PortfolioPage.ts
    - tests/e2e/portfolio.spec.ts
    - tests/e2e/resume.spec.ts
    - tests/e2e/mobile-menu.spec.ts
    - tests/e2e/theme-toggle.spec.ts
    - tests/e2e/keyboard-nav.spec.ts
  modified:
    - playwright.config.ts
    - package.json
    - src/App.tsx

key-decisions:
  - "Use separate Playwright projects (e2e, e2e-mobile, memory) to avoid viewport conflicts"
  - "Increase action timeout to 10s and use waitUntil: 'networkidle' for React SPA hydration"
  - "Add tabIndex={-1} to main content element to support skip link keyboard navigation"
  - "Use role-based selectors (getByRole) everywhere possible for accessibility-driven testing"
  - "Mobile menu tests run in iPhone 13 viewport, desktop tests in Desktop Chrome"

patterns-established:
  - "Page Object Model: HomePage and PortfolioPage classes encapsulate locators and actions"
  - "Role-based selectors: getByRole('heading'), getByRole('dialog'), getByRole('button')"
  - "Web-first assertions: expect().toBeVisible(), expect().toBeInViewport() - NO waitForTimeout"
  - "Viewport-specific projects: testMatch patterns separate desktop and mobile tests"

# Metrics
duration: 8min
completed: 2026-02-01
---

# Phase 04 Plan 03: E2E Testing for Critical User Flows Summary

**12 Playwright E2E tests covering portfolio browsing, resume navigation, mobile menu, theme toggle, and keyboard navigation using Page Object Model pattern and role-based selectors**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-01T00:57:21Z
- **Completed:** 2026-02-01T01:05:49Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- 5 E2E test suites with 12 total tests (9 desktop + 3 mobile)
- Page Object Model architecture (HomePage, PortfolioPage) for maintainable tests
- Role-based selectors and web-first assertions throughout (NO hard-coded waits)
- Comprehensive coverage of critical user flows (E2E-01 through E2E-05)
- All tests passing with clean build and no regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Set up Page Object Model and Playwright E2E config** - `81f3f49` (feat)
   - Created HomePage and PortfolioPage page objects
   - Updated playwright.config.ts with e2e/e2e-mobile projects
   - Added test:e2e script to package.json

2. **Task 2: Write 5 E2E test specs for critical user flows** - `5e472eb` (feat)
   - Portfolio browsing flow (2 tests: open/close, Escape key)
   - Resume navigation (2 tests: section navigation, content validation)
   - Mobile menu interaction (3 tests: open/close, navigation, Escape)
   - Theme toggle (2 tests: toggle, persistence)
   - Keyboard navigation (3 tests: skip link, Tab, focus indicators)

## Files Created/Modified

**Created:**
- `tests/e2e/pages/HomePage.ts` - Page object for home page with navigation, theme toggle, mobile menu
- `tests/e2e/pages/PortfolioPage.ts` - Page object for portfolio section with modal interactions
- `tests/e2e/portfolio.spec.ts` - E2E-01: Portfolio browsing flow tests
- `tests/e2e/resume.spec.ts` - E2E-02: Resume navigation tests
- `tests/e2e/mobile-menu.spec.ts` - E2E-03: Mobile menu interaction tests
- `tests/e2e/theme-toggle.spec.ts` - E2E-04: Theme toggle tests
- `tests/e2e/keyboard-nav.spec.ts` - E2E-05: Keyboard navigation tests

**Modified:**
- `playwright.config.ts` - Added e2e/e2e-mobile projects, increased actionTimeout to 10s
- `package.json` - Added test:e2e script
- `src/App.tsx` - Added tabIndex={-1} to main content for skip link focus
- `tests/e2e/pages/HomePage.ts` - Increased timeout and added networkidle wait

## Decisions Made

1. **Separate Playwright projects for viewport isolation**
   - Rationale: Mobile menu tests require mobile viewport, but desktop tests need desktop viewport
   - Implementation: Created 3 projects (memory, e2e, e2e-mobile) with testMatch patterns
   - Impact: Prevents viewport conflicts, enables parallel execution

2. **Increased timeouts for React SPA hydration**
   - Rationale: React app takes time to hydrate from client-side JS
   - Implementation: actionTimeout: 10000ms, waitUntil: 'networkidle' on page.goto()
   - Impact: Tests reliably wait for app to fully load

3. **Added tabIndex={-1} to main content element**
   - Rationale: Skip link needs focusable target, but main shouldn't be in tab order
   - Implementation: `<main id="main-content" tabIndex={-1}>`
   - Impact: Skip link now works in E2E tests and real browser usage

4. **Role-based selectors for accessibility-driven testing**
   - Rationale: Tests verify app works with assistive technology
   - Implementation: getByRole('heading'), getByRole('dialog'), getByRole('button')
   - Impact: Tests fail if ARIA/semantic HTML breaks, ensuring accessibility

5. **Mobile menu tests in e2e-mobile project with iPhone 13 viewport**
   - Rationale: Mobile menu is hidden on desktop (md:hidden class)
   - Implementation: Separate testMatch pattern for mobile-menu.spec.ts with iPhone 13 device
   - Impact: Mobile-specific features tested in correct viewport

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added tabIndex={-1} to main content element**
- **Found during:** Task 2 (keyboard navigation tests)
- **Issue:** Skip link couldn't focus #main-content because `<main>` element isn't focusable by default
- **Fix:** Added `tabIndex={-1}` to main element in App.tsx
- **Files modified:** src/App.tsx
- **Verification:** Skip link test passes, focus moves to main content on Enter
- **Committed in:** 5e472eb (Task 2 commit)

**2. [Rule 2 - Missing Critical] Increased timeouts for React hydration**
- **Found during:** Task 2 (all tests failing with timeout)
- **Issue:** Default 5s timeout insufficient for React app to hydrate from client-side JS
- **Fix:** Added actionTimeout: 10000ms to playwright.config.ts, waitUntil: 'networkidle' to HomePage.goto()
- **Files modified:** playwright.config.ts, tests/e2e/pages/HomePage.ts
- **Verification:** All tests pass, hero title visible within timeout
- **Committed in:** 5e472eb (Task 2 commit)

**3. [Rule 1 - Bug] Fixed portfolio modal heading selector specificity**
- **Found during:** Task 2 (portfolio test failing with "strict mode violation")
- **Issue:** portfolioModal.getByRole('heading') matched 5 headings (h2 + 4 h3s)
- **Fix:** Changed to portfolioModal.getByRole('heading', { level: 2 }) to match only h2
- **Files modified:** tests/e2e/portfolio.spec.ts
- **Verification:** Portfolio modal test passes, matches only project title h2
- **Committed in:** 5e472eb (Task 2 commit)

**4. [Rule 3 - Blocking] Restarted dev server to resolve stale vite instance**
- **Found during:** Task 2 (all tests failing with "Invalid hook call" React error)
- **Issue:** Multiple vite instances running on ports 3000-3002 causing React conflicts
- **Fix:** Killed all vite processes, started fresh on port 3000
- **Files modified:** None (operational fix)
- **Verification:** All tests pass, no React hook errors, root innerHTML has content
- **Note:** Not committed (dev server management, not code change)

---

**Total deviations:** 4 auto-fixed (2 missing critical, 1 bug, 1 blocking)
**Impact on plan:** All auto-fixes essential for test correctness and React app functionality. No scope creep.

## Issues Encountered

**Multiple vite dev server instances causing React conflicts:**
- Problem: Tests failed with "Invalid hook call" and empty root innerHTML
- Investigation: Used debug test to capture console errors and page state
- Root cause: Stale vite instances on ports 3000-3002 from previous sessions
- Resolution: Killed all vite processes, restarted fresh server on port 3000
- Prevention: Playwright's `reuseExistingServer: !process.env.CI` should handle this in CI
- Duration: ~2 minutes debugging, immediate resolution after server restart

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for CI integration (Plan 05):**
- All 12 E2E tests passing reliably
- Test:e2e script available for CI workflow
- No flaky tests (no waitForTimeout, all web-first assertions)
- Tests cover 5 critical user flows for regression prevention

**Blockers:** None

**Concerns:** None - tests are stable and ready for CI

---
*Phase: 04-performance-ci-integration*
*Completed: 2026-02-01*
