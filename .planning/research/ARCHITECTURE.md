# Architecture Research: Quality Engineering Integration

**Domain:** Quality Engineering Infrastructure for React 18 + TypeScript + Vite SPA
**Researched:** 2026-01-27
**Confidence:** HIGH

## Executive Summary

Quality engineering infrastructure for a React 18 + TypeScript + Vite application follows a layered testing pyramid architecture with integrated performance monitoring and accessibility tooling. The architecture leverages Vite's native ESM support and dev server to provide fast test execution (10-20x faster than Jest-based setups), browser-native performance profiling via React DevTools and Chrome's Performance panel, and automated accessibility validation integrated at both component and E2E test layers.

**Key Architectural Principle:** Colocate quality tooling with existing code while maintaining clear separation of concerns through configuration files and dedicated test utilities.

## Standard Architecture

### Quality Engineering Layers

```
┌─────────────────────────────────────────────────────────────┐
│                  CI/CD Pipeline (GitHub Actions)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Unit Tests   │  │ Integration  │  │  E2E Tests   │       │
│  │ (Vitest)     │  │ Tests        │  │ (Playwright) │       │
│  │  + a11y      │  │ (Vitest)     │  │  + a11y      │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                   Coverage Report                            │
│               (v8/Istanbul via Vitest)                       │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│               Development Environment (Local)                │
├─────────────────────────────────────────────────────────────┤
│  Component Testing Layer (React Testing Library + Vitest)   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ App.test.tsx │  │ Portfolio    │  │ Navbar       │       │
│  │              │  │ .test.tsx    │  │ .test.tsx    │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│              Test Utilities & Mocks (MSW)                    │
│           (/src/test-utils/, setupTests.ts)                  │
├─────────────────────────────────────────────────────────────┤
│        E2E Testing Layer (Playwright)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  e2e/                                                 │   │
│  │    tests/                                             │   │
│  │      portfolio.spec.ts                                │   │
│  │      navigation.spec.ts                               │   │
│  │      accessibility.spec.ts                            │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│     Performance Monitoring (Browser DevTools)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ React        │  │ Chrome       │  │ Vite Bundle  │       │
│  │ Profiler     │  │ Performance  │  │ Analyzer     │       │
│  │ API          │  │ Panel        │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│               Application Layer (Existing)                   │
│  React 18 Components + Three.js + Vite Build System         │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Vitest** | Unit and integration test runner | Vite-native test framework with jsdom environment, React Testing Library integration |
| **React Testing Library** | Component testing utilities | User-centric DOM queries (getByRole, getByLabelText), renderHook for hooks testing |
| **Playwright** | E2E test orchestration | Headless browser automation (Chromium, Firefox, WebKit), visual regression, trace recording |
| **vitest-axe** | Accessibility validation (unit/integration) | axe-core integration for automated WCAG compliance checking in component tests |
| **@axe-core/playwright** | Accessibility validation (E2E) | axe-core integration for full-page accessibility audits in E2E tests |
| **MSW (Mock Service Worker)** | API mocking | Network-level request interception for both tests and Storybook (if added later) |
| **React Profiler API** | Component render performance tracking | Programmatic performance measurement via <Profiler> component wrapper |
| **Chrome DevTools Performance** | Memory and runtime profiling | Heap snapshots, allocation timelines, React Performance Tracks (React 19.2+) |
| **Vite Bundle Analyzer** | Build optimization analysis | Treemap visualization of bundle size, chunk analysis, dead code identification |

## Recommended Project Structure

```
alexmj212.github.io/
├── src/
│   ├── components/
│   │   ├── App.tsx
│   │   ├── App.test.tsx              # Colocated component test
│   │   ├── Navbar.tsx
│   │   ├── Navbar.test.tsx           # Colocated component test
│   │   ├── ThreeBackground.tsx
│   │   ├── ThreeBackground.test.tsx  # Colocated component test
│   │   ├── portfoilo/
│   │   │   ├── Portfolio.tsx
│   │   │   └── Portfolio.test.tsx    # Colocated component test
│   │   └── ...
│   ├── test-utils/
│   │   ├── renderWithRouter.tsx      # Test utility for Router context
│   │   ├── axe-config.ts             # Shared accessibility test config
│   │   └── mocks/
│   │       ├── handlers.ts           # MSW request handlers
│   │       └── server.ts             # MSW server setup
│   ├── setupTests.ts                 # Global test setup (vitest-axe matchers)
│   └── vitest.config.ts              # Vitest configuration
│
├── e2e/                              # Separate E2E tests (Playwright)
│   ├── tests/
│   │   ├── portfolio.spec.ts         # Portfolio page E2E tests
│   │   ├── navigation.spec.ts        # Navigation and routing E2E tests
│   │   ├── accessibility.spec.ts     # Full-page accessibility audits
│   │   └── three-background.spec.ts  # Three.js rendering E2E tests
│   ├── fixtures/
│   │   └── test-data.ts              # E2E test fixtures
│   └── playwright.config.ts          # Playwright configuration
│
├── .github/
│   └── workflows/
│       ├── test.yml                  # CI pipeline: unit + integration tests
│       ├── e2e.yml                   # CI pipeline: E2E tests (separate job)
│       └── accessibility.yml         # CI pipeline: dedicated a11y audits
│
├── coverage/                         # Generated coverage reports
├── test-results/                     # Playwright test results
└── playwright-report/                # Playwright HTML report
```

### Structure Rationale

- **Colocated component tests:** Tests live alongside components (App.test.tsx next to App.tsx) to encourage testing during development and reduce context switching. This follows the 2026 recommendation for smaller-to-medium projects where test discoverability is critical.
- **Separate E2E folder:** Playwright tests are isolated in `/e2e` because they test the application as a whole, not individual components, and have different configuration needs (browser automation, baseURL, slower execution).
- **Centralized test utilities:** `/src/test-utils/` provides shared testing infrastructure (custom render functions, MSW mocks, axe configuration) to avoid duplication across component tests.
- **CI workflow separation:** Unit/integration tests run fast (~seconds) and should block PRs immediately; E2E tests run slower (~minutes) and can run in parallel or on merge to main.

## Architectural Patterns

### Pattern 1: Colocated Component Testing with Accessibility Validation

**What:** Place `.test.tsx` files next to their corresponding component files, with accessibility checks integrated directly into component tests using vitest-axe.

**When to use:** For all presentational components with user interaction (buttons, forms, navigation, dialogs). Essential for components with ARIA attributes or complex keyboard interactions.

**Trade-offs:**
- ✅ **Pros:** Encourages testing during feature development, easier to locate tests, accessibility becomes a default consideration
- ❌ **Cons:** Test files can clutter component folders in IDEs, may require custom ignore patterns for production builds

**Example:**
```typescript
// src/components/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

expect.extend(toHaveNoViolations);

describe('Navbar', () => {
  it('should render navigation with accessible markup', async () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Functional assertions
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();

    // Accessibility validation
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should toggle mobile menu with keyboard', async () => {
    const { user } = setup(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /menu/i });

    await user.click(menuButton);
    expect(screen.getByRole('menu')).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
```

### Pattern 2: MSW for API Mocking (Network-Level Interception)

**What:** Use Mock Service Worker to intercept network requests at the browser/Node.js level, eliminating the need to mock fetch, axios, or react-query directly.

**When to use:** For components or pages that fetch data from APIs, especially when testing loading states, error handling, or data-dependent UI. Also useful for Storybook stories (future enhancement).

**Trade-offs:**
- ✅ **Pros:** Tests work with real HTTP clients (no mocking internals), reusable across unit/integration/E2E/Storybook, realistic network simulation (latency, errors)
- ❌ **Cons:** Additional setup complexity, requires understanding of service worker lifecycle, debugging can be harder if handlers aren't correctly configured

**Example:**
```typescript
// src/test-utils/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock a GitHub API request if portfolio items fetch from API
  http.get('https://api.github.com/repos/:owner/:repo', ({ params }) => {
    return HttpResponse.json({
      name: params.repo,
      description: 'Mocked repository description',
      stargazers_count: 42
    });
  }),
];

// src/test-utils/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// src/setupTests.ts
import { server } from './test-utils/mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Pattern 3: E2E Critical User Journeys (3-5 Flows)

**What:** Limit E2E tests to 3-5 critical user journeys that validate core business logic and cross-cutting concerns (navigation, data persistence, complex interactions). Run full-page accessibility audits at this layer.

**When to use:** For flows like "user navigates from home to portfolio, opens dialog, and views project details" or "user toggles dark mode and preference persists on reload." These tests validate the integration of multiple components, routing, and browser APIs.

**Trade-offs:**
- ✅ **Pros:** High confidence that the app works as users experience it, catches integration bugs missed by unit tests, validates real browser behavior (localStorage, animations, WebGL)
- ❌ **Cons:** Slow execution (30s-5min per test), flaky if not carefully written, expensive to maintain if over-used

**Example:**
```typescript
// e2e/tests/portfolio.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Portfolio interaction flow', () => {
  test('should navigate to portfolio, open dialog, and view project', async ({ page }) => {
    await page.goto('/');

    // Navigate to portfolio section
    await page.getByRole('link', { name: /portfolio/i }).click();
    await expect(page).toHaveURL('/#portfolio');

    // Open first portfolio item
    const firstCard = page.locator('[data-testid="portfolio-card"]').first();
    await firstCard.click();

    // Verify dialog opens with project details
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading')).toContainText(/project name/i);

    // Close dialog and verify it's gone
    await page.getByRole('button', { name: /close/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('should have no accessibility violations on portfolio page', async ({ page }) => {
    await page.goto('/#portfolio');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

### Pattern 4: React Profiler API for Performance Instrumentation

**What:** Wrap components with React's `<Profiler>` component to programmatically measure render performance during development and testing. Collect metrics like render duration, phase (mount/update), and interaction tracking.

**When to use:** For performance-critical components (Three.js background, large lists, complex animations) or when investigating re-render issues. Useful during development and in performance regression tests.

**Trade-offs:**
- ✅ **Pros:** Programmatic access to render metrics, integrates with React DevTools, can be used in production builds with minimal overhead
- ❌ **Cons:** Requires manual instrumentation, data collection/analysis logic needed, not suitable for memory leak detection

**Example:**
```typescript
// src/components/ThreeBackground.tsx
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // Set of "interactions" that were being traced during this render
) => {
  if (import.meta.env.DEV) {
    console.log(`ThreeBackground [${phase}]: ${actualDuration.toFixed(2)}ms`);
    if (actualDuration > 16.67) { // Frame budget for 60fps
      console.warn('ThreeBackground render exceeded frame budget');
    }
  }
};

export const ThreeBackground = () => {
  return (
    <Profiler id="ThreeBackground" onRender={onRenderCallback}>
      {/* Existing Three.js component code */}
    </Profiler>
  );
};
```

### Pattern 5: Bundle Analysis in CI with Size Budget Enforcement

**What:** Integrate Vite bundle analyzer into CI pipeline to visualize bundle composition and enforce size budgets. Fail builds if bundle size increases beyond acceptable thresholds.

**When to use:** On every PR to catch bundle bloat early. Essential when adding new dependencies or refactoring import structures. Helps identify duplicate dependencies and dead code.

**Trade-offs:**
- ✅ **Pros:** Prevents bundle bloat from reaching production, visualizes impact of dependency choices, catches barrel file imports
- ❌ **Cons:** Requires baseline establishment and threshold tuning, can create false alarms if not configured properly

**Example:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three'],
        },
      },
    },
  },
});
```

```yaml
# .github/workflows/bundle-analysis.yml
name: Bundle Analysis
on: pull_request

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Check bundle size
        run: |
          SIZE=$(du -sk dist | cut -f1)
          LIMIT=1000 # 1MB limit (adjust as needed)
          if [ $SIZE -gt $LIMIT ]; then
            echo "Bundle size ($SIZE KB) exceeds limit ($LIMIT KB)"
            exit 1
          fi
      - name: Upload bundle analysis
        uses: actions/upload-artifact@v4
        with:
          name: bundle-stats
          path: dist/stats.html
```

## Data Flow

### Test Execution Flow (Development)

```
Developer saves component file
    ↓
Vitest HMR triggers (watch mode)
    ↓
┌──────────────────────────────────────┐
│ Test File (*.test.tsx)               │
├──────────────────────────────────────┤
│ 1. Import component                  │
│ 2. Setup test environment            │
│    - MSW handlers (if API calls)     │
│    - Custom render with Router       │
│    - vitest-axe matchers             │
├──────────────────────────────────────┤
│ 3. Render component                  │
│    - React Testing Library render()  │
│    - Simulate user interactions      │
├──────────────────────────────────────┤
│ 4. Assert behavior                   │
│    - Query DOM (getByRole, etc.)     │
│    - Expect conditions               │
├──────────────────────────────────────┤
│ 5. Accessibility check               │
│    - await axe(container)            │
│    - expect().toHaveNoViolations()   │
└──────────────────────────────────────┘
    ↓
Pass/Fail feedback (<1 second with Vitest)
```

### E2E Test Execution Flow (CI)

```
GitHub Actions workflow triggered (PR or merge)
    ↓
┌──────────────────────────────────────┐
│ Install dependencies                 │
│ - npm ci                             │
│ - npx playwright install --with-deps │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ Start dev server                     │
│ - npm run dev (background)           │
│ - Wait for http://localhost:3000     │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ Run Playwright tests                 │
│ - Browser automation (Chromium)      │
│ - Execute user journeys              │
│ - Capture screenshots/videos         │
│ - Run axe-core accessibility scans   │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ Generate reports                     │
│ - HTML report (playwright-report/)   │
│ - Test results (test-results/)       │
│ - Upload artifacts to GitHub Actions │
└──────────────────────────────────────┘
    ↓
Pass/Fail status updates PR
```

### Performance Profiling Flow (Development)

```
Developer suspects performance issue
    ↓
Open Chrome DevTools Performance panel
    ↓
Start recording + interact with app
    ↓
Stop recording
    ↓
┌───────────────────────────────────────┐
│ React Performance Tracks (React 19.2+)│
│ - Scheduler track (priority levels)   │
│ - Components track (render durations) │
│ - Server track (if using SSR)         │
├───────────────────────────────────────┤
│ Chrome Profiler Data                  │
│ - JavaScript execution flame graph    │
│ - Network waterfall                   │
│ - Memory timeline                     │
└───────────────────────────────────────┘
    ↓
Identify bottleneck (e.g., ThreeBackground re-renders)
    ↓
┌───────────────────────────────────────┐
│ React Profiler Tab (React DevTools)   │
│ - Ranked components by render time    │
│ - Flame graph of component tree       │
│ - "Why did this component render?"    │
└───────────────────────────────────────┘
    ↓
Fix issue (useMemo, useCallback, React.memo)
    ↓
Re-profile to verify improvement
```

### Memory Leak Detection Flow

```
Suspect memory leak (e.g., dialog not unmounting)
    ↓
Chrome DevTools → Memory panel
    ↓
Take baseline heap snapshot
    ↓
Perform action (open/close dialog 10x)
    ↓
Take second heap snapshot
    ↓
Compare snapshots (Comparison view)
    ↓
┌───────────────────────────────────────┐
│ Identify retained objects             │
│ - Detached DOM nodes                  │
│ - Event listeners not cleaned up      │
│ - Three.js geometries/materials       │
└───────────────────────────────────────┘
    ↓
Review component useEffect cleanup
    ↓
┌───────────────────────────────────────┐
│ Fix cleanup in useEffect              │
│ return () => {                        │
│   // Dispose Three.js resources       │
│   // Remove event listeners           │
│   // Cancel pending requests          │
│ }                                     │
└───────────────────────────────────────┘
    ↓
Re-test with heap snapshots to verify fix
```

## Integration Points

### Vite Integration (Build System)

| Tool | Integration Pattern | Notes |
|------|---------------------|-------|
| **Vitest** | Shares Vite config via `vite.config.ts`; add `test` block | Vitest reads Vite config automatically; supports `process.env.VITEST` for conditional config |
| **Bundle Analyzer** | Vite plugin (rollup-plugin-visualizer) | Runs during `npm run build`; outputs `dist/stats.html` treemap |
| **Coverage Reporter** | Vitest coverage.provider (v8 or istanbul) | v8 is faster; istanbul is more accurate (but as of Vitest 3.2.0, v8 uses AST remapping for identical accuracy) |

### React Testing Library Integration

| Tool | Integration Pattern | Notes |
|------|---------------------|-------|
| **Vitest** | Import `render` from '@testing-library/react'; run with `vitest` CLI | Vitest provides expect, describe, it, beforeEach globals |
| **vitest-axe** | Extend matchers: `expect.extend(toHaveNoViolations)` | Fork of jest-axe compatible with Vitest; requires jsdom environment |
| **MSW** | Setup server in `setupTests.ts`; configure handlers in `/test-utils/mocks/` | Intercepts fetch/XHR at network level; works with jsdom |

### Playwright Integration

| Tool | Integration Pattern | Notes |
|------|---------------------|-------|
| **Vite Dev Server** | Configure `webServer` in `playwright.config.ts` | Playwright starts dev server automatically; waits for baseURL availability |
| **@axe-core/playwright** | `new AxeBuilder({ page }).analyze()` in E2E tests | Runs axe-core in real browser context; more accurate than jsdom |
| **CI (GitHub Actions)** | Install browsers with `npx playwright install --with-deps` | Browsers are cached between runs; requires headless:true in CI |

### Performance Monitoring Integration

| Tool | Integration Pattern | Notes |
|------|---------------------|-------|
| **React Profiler API** | Wrap component with `<Profiler onRender={callback}>` | Callback receives render metrics; use `import.meta.env.DEV` guard for production |
| **Chrome DevTools** | Manual profiling via Performance panel | React Performance Tracks require React 19.2+ (or 18.3+ with React DevTools extension) |
| **Memory Profiler** | Heap snapshots via Memory panel | Look for detached DOM nodes, retained event listeners, Three.js resource leaks |

### Accessibility Integration Points

| Layer | Tool | Integration Pattern | Coverage |
|-------|------|---------------------|----------|
| **Unit/Integration** | vitest-axe | Component tests with `axe(container)` | ~30% of a11y issues (automated checks) |
| **E2E** | @axe-core/playwright | Full-page scans in Playwright tests | ~30% of a11y issues (in real browser context) |
| **Manual** | React DevTools, Keyboard testing | Developer validation of focus management, screen reader output | Remaining ~70% (color contrast in real UI, semantic meaning) |
| **CI** | Dedicated GitHub Actions workflow | Fail PR if vitest-axe or Playwright axe tests fail | Enforces baseline accessibility |

## Build Order & Dependencies

### Recommended Implementation Order

Testing infrastructure should be implemented in layers, from foundation to pyramid peak:

**Phase 1: Foundation (Unit Test Infrastructure)**
- Install Vitest + React Testing Library
- Configure `vitest.config.ts` with jsdom environment
- Create `src/setupTests.ts` for global test setup
- Add colocated test for one simple component (e.g., Button.tsx)
- Verify `npm run test` works

**Dependencies:** None (pure testing foundation)
**Duration:** 1-2 days
**Deliverable:** First passing unit test

**Phase 2: Accessibility Integration (Unit Layer)**
- Install vitest-axe
- Extend matchers in setupTests.ts
- Add accessibility assertions to existing component tests
- Create shared axe config in `/src/test-utils/axe-config.ts`

**Dependencies:** Phase 1 (requires Vitest setup)
**Duration:** 1 day
**Deliverable:** Accessibility-validated component tests

**Phase 3: API Mocking (Integration Test Enabler)**
- Install MSW (msw)
- Create `/src/test-utils/mocks/` with handlers and server setup
- Configure MSW in setupTests.ts (start/stop/reset)
- Add integration test for component that fetches data (if applicable)

**Dependencies:** Phase 1 (requires Vitest setup)
**Duration:** 1-2 days
**Deliverable:** Integration tests with mocked API calls

**Phase 4: E2E Test Infrastructure**
- Install Playwright (`npm init playwright@latest`)
- Configure `playwright.config.ts` with baseURL and webServer
- Create `/e2e/tests/` folder structure
- Write first E2E test for critical user journey (e.g., navigation)
- Verify `npm run test:e2e` works locally

**Dependencies:** None (independent of unit tests, but benefits from app stability)
**Duration:** 1-2 days
**Deliverable:** First passing E2E test

**Phase 5: E2E Accessibility Integration**
- Install @axe-core/playwright
- Add full-page accessibility audit test in `/e2e/tests/accessibility.spec.ts`
- Configure axe rules and tags (WCAG 2.1 AA minimum)

**Dependencies:** Phase 4 (requires Playwright setup)
**Duration:** 0.5-1 day
**Deliverable:** Automated full-page a11y audits

**Phase 6: Performance Monitoring Setup**
- Add React Profiler wrapper to ThreeBackground component
- Document Chrome DevTools Performance panel usage in testing guide
- Add heap snapshot workflow documentation for memory leak detection
- Install and configure vite-bundle-analyzer plugin

**Dependencies:** None (tooling-only, no code changes required beyond Profiler wrapper)
**Duration:** 1 day
**Deliverable:** Performance profiling instrumentation and documentation

**Phase 7: CI/CD Integration**
- Create `.github/workflows/test.yml` for unit/integration tests
- Create `.github/workflows/e2e.yml` for Playwright tests
- Add coverage reporting (upload to Codecov or GitHub)
- Add bundle size check and artifact upload
- Configure status checks to block PRs on test failures

**Dependencies:** Phases 1-5 (requires all test layers implemented)
**Duration:** 1-2 days
**Deliverable:** Automated CI pipeline

**Phase 8: Developer Experience Enhancements**
- Add test scripts to package.json (test:watch, test:coverage, test:e2e:ui)
- Create test utility documentation (how to use MSW, custom render functions)
- Set up test file templates/snippets for IDE
- Configure Playwright trace viewer for debugging

**Dependencies:** Phases 1-7 (polish phase after core infrastructure)
**Duration:** 0.5-1 day
**Deliverable:** Improved testing DX

### Critical Path Dependencies

```
Phase 1 (Vitest + RTL)
    ├─→ Phase 2 (vitest-axe)
    └─→ Phase 3 (MSW)
            └─→ Phase 7 (CI - unit tests)

Phase 4 (Playwright)
    └─→ Phase 5 (@axe-core/playwright)
            └─→ Phase 7 (CI - E2E tests)

Phase 6 (Performance) → No blockers (can happen anytime)

Phase 7 (CI/CD) ← Requires Phases 1-5 complete

Phase 8 (DX) ← Requires Phase 7 complete (polish after foundation)
```

**Parallelization opportunities:**
- Phase 2 and Phase 3 can happen simultaneously after Phase 1
- Phase 4-5 can happen in parallel with Phase 2-3
- Phase 6 is independent and can happen anytime

**Total estimated duration:** 8-12 days for full implementation (excluding ongoing test writing)

### Testing Layer Distribution (2026 Pyramid)

Following modern best practices, the testing distribution should be:

| Layer | Percentage | Execution Time | When to Run |
|-------|-----------|----------------|-------------|
| **Unit Tests** | 70% | <5 seconds | Every file save (watch mode), every commit (CI) |
| **Integration Tests** | 20% | 5-30 seconds | Every commit (CI), local on-demand |
| **E2E Tests** | 5-10% (3-5 critical flows) | 30s-5min | Every PR (CI), merge to main, nightly |

**CI Strategy:**
- **On every commit/push:** Run unit + integration tests (fast feedback)
- **On PR creation/update:** Run full suite including E2E (gate merging)
- **On merge to main:** Run full suite + generate coverage report + deploy
- **Nightly (optional):** Extended E2E suite with visual regression tests

## Anti-Patterns

### Anti-Pattern 1: Testing Implementation Details

**What people do:** Write tests that access component internals (state, private methods) or rely on class names, internal structure, or data-testid everywhere.

**Why it's wrong:** Tests break when refactoring internal implementation, even if user-facing behavior is unchanged. Makes refactoring expensive and discourages code improvements.

**Do this instead:** Query the DOM as users would—by role, label, placeholder text. Use `getByRole('button', { name: 'Submit' })` instead of `getByTestId('submit-button')`. Only use data-testid as a last resort when no semantic alternative exists.

**Example:**
```typescript
// ❌ Bad: Testing implementation details
expect(component.state.isOpen).toBe(true);
expect(container.querySelector('.menu--open')).toBeInTheDocument();

// ✅ Good: Testing user-facing behavior
const menu = screen.getByRole('menu');
expect(menu).toBeVisible();
```

### Anti-Pattern 2: Too Many E2E Tests (Inverted Pyramid)

**What people do:** Write E2E tests for every feature because "they give the most confidence." End up with 100+ E2E tests taking 30+ minutes to run.

**Why it's wrong:** E2E tests are slow, flaky, and expensive to maintain. If the pyramid is inverted (more E2E than unit), CI becomes a bottleneck and developers wait hours for feedback.

**Do this instead:** Limit E2E tests to 3-5 critical user journeys. Push coverage down to unit and integration tests. Use the testing pyramid: 70% unit, 20% integration, 10% E2E.

**Example:**
```typescript
// ❌ Bad: E2E test for button click
test('clicking button changes text', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="button"]');
  await expect(page.locator('text=Changed')).toBeVisible();
});

// ✅ Good: Unit test for button click
it('should change text when clicked', async () => {
  render(<Button />);
  await user.click(screen.getByRole('button'));
  expect(screen.getByText('Changed')).toBeInTheDocument();
});

// ✅ Good: E2E test for critical flow only
test('user can complete portfolio viewing flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Portfolio');
  await page.click('[data-testid="portfolio-card"]:first-child');
  await expect(page.getByRole('dialog')).toBeVisible();
  // ... rest of multi-step flow
});
```

### Anti-Pattern 3: No Cleanup in useEffect (Memory Leaks)

**What people do:** Add event listeners, start intervals, or create Three.js resources in useEffect without cleanup function. Memory leaks accumulate, especially in dialogs or components that mount/unmount frequently.

**Why it's wrong:** Causes memory leaks detected in heap snapshots as "detached DOM nodes." In React 18 with Strict Mode, effects run twice in development, making leaks more obvious. Can cause significant performance degradation over time.

**Do this instead:** Always return a cleanup function from useEffect. Dispose Three.js geometries/materials, remove event listeners, cancel timers/requests.

**Example:**
```typescript
// ❌ Bad: No cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  const interval = setInterval(animate, 16);
  const geometry = new THREE.BoxGeometry();
  // Resources never cleaned up!
}, []);

// ✅ Good: Cleanup function
useEffect(() => {
  window.addEventListener('resize', handleResize);
  const interval = setInterval(animate, 16);
  const geometry = new THREE.BoxGeometry();

  return () => {
    window.removeEventListener('resize', handleResize);
    clearInterval(interval);
    geometry.dispose(); // Free GPU memory
  };
}, []);
```

### Anti-Pattern 4: Color Contrast Blind Spot (Automated Testing Limitation)

**What people do:** Rely solely on automated accessibility testing (axe-core) and assume 100% coverage. Ship color combinations that fail WCAG AA contrast ratios.

**Why it's wrong:** axe-core cannot check color contrast in jsdom (JSDOM doesn't have getComputedStyle for colors). Even in real browsers, automated tools miss ~70% of accessibility issues. Lighthouse/axe miss dynamic color changes (e.g., dark mode).

**Do this instead:** Combine automated testing (30% coverage) with manual validation. Use browser extensions (axe DevTools, Lighthouse) on actual rendered pages. Test dark mode color combinations manually. Validate keyboard navigation and screen reader output for critical flows.

**Example:**
```typescript
// ❌ Bad: Assuming axe-core catches all a11y issues
it('should be accessible', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  // Missing: manual color contrast check, keyboard nav, screen reader testing
});

// ✅ Good: Combine automated + manual validation
it('should be accessible', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// PLUS: Manual checklist in testing guide:
// - [ ] Run axe DevTools extension on rendered page (checks actual colors)
// - [ ] Tab through component with keyboard (focus indicators visible?)
// - [ ] Test with screen reader (VoiceOver/NVDA)
// - [ ] Verify ARIA labels are meaningful
```

### Anti-Pattern 5: Barrel File Imports (Bundle Bloat)

**What people do:** Create index.ts files that re-export all components from a folder, then import from the barrel file: `import { Button, Card, ... } from './components'`. Vite must load ALL components in the barrel file, even if only one is used.

**Why it's wrong:** Breaks tree-shaking, increases bundle size, slows down dev server HMR. Especially bad in Vite where every file in a barrel must be fetched and transformed on initial page load.

**Do this instead:** Import directly from component files: `import { Button } from './components/Button'`. Use bundle analyzer to identify barrel file imports.

**Example:**
```typescript
// ❌ Bad: Barrel file import
// components/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Dialog } from './Dialog';
// ... 20 more components

// App.tsx
import { Button } from './components'; // Loads ALL 20+ components!

// ✅ Good: Direct imports
import { Button } from './components/Button'; // Loads only Button
```

## Scaling Considerations

| Concern | Current Scale (Portfolio SPA) | If Adding Features (Blog, CMS) | If High Traffic (1M+ views/mo) |
|---------|-------------------------------|--------------------------------|--------------------------------|
| **Test Execution Time** | Unit: <5s, E2E: <1min (acceptable for CI) | Consider Vitest sharding: `--shard=1/4` across CI matrix | Use Playwright sharding, parallel workers, dedicated CI runners |
| **Bundle Size** | ~500KB (React + Three.js + router) | Monitor with bundle analyzer, lazy-load routes with React.lazy() | Aggressive code splitting, CDN for static assets, preload critical chunks |
| **Coverage Reporting** | Single coverage report (v8) | Merge coverage from multiple shards: `vitest --merge-reports` | Dedicated coverage service (Codecov), trend tracking |
| **E2E Test Flakiness** | Low (3-5 tests, simple flows) | Playwright auto-waiting handles most flake, add retry logic for network-dependent tests | Implement custom wait-for-stable helpers, visual regression for UI changes |
| **Performance Monitoring** | Manual Chrome DevTools profiling | Add Profiler API instrumentation to key components, log metrics to console | Integrate RUM (Real User Monitoring) like Sentry, track Core Web Vitals, alert on regressions |
| **Accessibility Audits** | Automated (vitest-axe + Playwright axe) for ~30% coverage | Add pa11y-ci for automated CI scans, hire a11y consultant for audit | Continuous monitoring with axe DevTools Pro, user testing with assistive tech users |

### When to Scale Up Tooling

**Add Storybook when:**
- More than 5 developers working on components
- Design system emerges (shared components across projects)
- Visual regression testing needed (Chromatic integration)

**Add Sentry/DataDog when:**
- Errors in production lack context
- Need to track Core Web Vitals for real users
- Performance regressions not caught by local profiling

**Add Chromatic/Percy when:**
- Visual bugs slip through code review (CSS changes affecting multiple pages)
- Design team wants approval workflow for UI changes
- E2E tests flake due to timing issues that visual diffing would catch

**Add Pa11y-CI when:**
- Need to scan entire site (multi-page apps)
- Want automated WCAG compliance reports
- Accessibility audits become too manual

## Sources

### Testing Architecture
- [Vitest Guide](https://vitest.dev/guide/)
- [Testing in 2026: Jest, React Testing Library, and Full Stack Testing Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)
- [Vitest vs Jest 30: Why 2026 is the Year of Browser-Native Testing](https://dev.to/dataformathub/vitest-vs-jest-30-why-2026-is-the-year-of-browser-native-testing-2fgb)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation - Introduction](https://playwright.dev/docs/intro)
- [Setting up CI | Playwright](https://playwright.dev/docs/ci-intro)

### Test Organization Patterns
- [Popular React Folder Structures and Screaming Architecture](https://profy.dev/article/react-folder-structure)
- [React Folder Structure in 5 Steps](https://www.robinwieruch.de/react-folder-structure/)
- [Guidelines to improve your React folder structure](https://maxrozen.com/guidelines-improve-react-app-folder-structure)

### Accessibility Testing
- [How to Test React Applications for Accessibility with axe-core](https://oneuptime.com/blog/post/2026-01-15-test-react-accessibility-axe-core/view)
- [vitest-axe GitHub Repository](https://github.com/chaance/vitest-axe)
- [jest-axe npm Package](https://www.npmjs.com/package/jest-axe)
- [Accessibility audits with Playwright, Axe, and GitHub Actions](https://dev.to/jacobandrewsky/accessibility-audits-with-playwright-axe-and-github-actions-2504)

### Performance Monitoring
- [React Profiler Documentation](https://react.dev/reference/react/Profiler)
- [React Performance tracks](https://react.dev/reference/dev-tools/react-performance-tracks)
- [Understanding Memory Leaks in React: How to Find and Fix Them](https://medium.com/@ignatovich.dm/understanding-memory-leaks-in-react-how-to-find-and-fix-them-fc782cf182be)
- [Memory panel overview | Chrome DevTools](https://developer.chrome.com/docs/devtools/memory)
- [Fix memory problems | Chrome DevTools](https://developer.chrome.com/docs/devtools/memory-problems)

### Bundle Analysis & Optimization
- [Vite 6.0 Build Optimization Guide](https://markaicode.com/vite-6-build-optimization-guide/)
- [Getting Started with Vite Bundle Visualizer](https://www.edstem.com/blog/blog/vite-bundle-visualizer/)
- [Optimizing Your React Vite Application: A Guide to Reducing Bundle Size](https://shaxadd.medium.com/optimizing-your-react-vite-application-a-guide-to-reducing-bundle-size-6b7e93891c96)
- [Performance | Vite](https://vite.dev/guide/performance)

### Mock Service Worker (MSW)
- [Mock Service Worker Documentation](https://mswjs.io/docs/)
- [Testing in 2026: Full Stack Testing Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)
- [Stack Builders - Test React components with Testing Library and MSW](https://www.stackbuilders.com/insights/testing-react-components-with-testing-library-and-mock-service-worker/)

### Coverage Reporting
- [Coverage | Guide | Vitest](https://vitest.dev/guide/coverage.html)
- [V8 Coverage vs Istanbul: Performance and Accuracy](https://dev.to/stevez/v8-coverage-vs-istanbul-performance-and-accuracy-3ei8)

### CI/CD Integration
- [Getting Started with Integrating Playwright and GitHub Actions](https://autify.com/blog/playwright-github-actions)
- [Setting Up GitHub Actions to Run Vitest Unit Tests](https://stevekinney.com/courses/testing/continuous-integration)
- [Implement Playwright in GitHub Actions for CI/CD](https://www.browsercat.com/post/playwright-github-actions-cicd-guide)

### Testing Layer Strategy
- [Unit, Integration, and E2E Testing for Fullstack Apps in 2025](https://talent500.com/blog/fullstack-app-testing-unit-integration-e2e-2025/)
- [End-to-End (E2E) Testing Guide](https://talent500.com/blog/end-to-end-testing-guide/)
- [Unit Testing vs Integration Testing vs E2E Testing: A Complete Guide](https://shiftasia.com/column/unit-integration-e2e-testing-guide/)

---
*Architecture research for: Quality Engineering Infrastructure (React 18 + TypeScript + Vite)*
*Researched: 2026-01-27*
*Confidence: HIGH*
