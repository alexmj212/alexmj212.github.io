# Phase 4 Research: Performance & CI Integration

**Domain:** Production performance monitoring and automated quality gates for React portfolio site
**Researched:** 2026-01-31
**Overall Confidence:** HIGH

## Executive Summary

Phase 4 integrates comprehensive quality gates to prevent regressions across performance, accessibility, and testing. The research reveals a mature ecosystem with well-established tools: `web-vitals` library for RUM monitoring, Lighthouse CI for performance budgets, Playwright for E2E testing (already in project), and GitHub Actions for CI orchestration. The project already has strong foundations (Playwright 1.54.2, Vitest 4.x, existing deploy workflow), making integration straightforward.

**Key Finding:** This phase is primarily about orchestration and configuration rather than new tooling. The critical challenges are CI workflow organization (parallel vs sequential jobs), performance threshold calibration, and E2E test scope definition.

**Critical Insight:** Web Vitals measurement requires careful implementation - the library must be called once per page load to avoid memory leaks, and analytics integration should use `navigator.sendBeacon()` for reliable reporting during page unload.

## Key Findings

**Stack:** `web-vitals@5.x` (RUM), `@lhci/cli@0.15.x` (performance gates), Playwright 1.54.2 (E2E, already installed), GitHub Actions (CI)

**Architecture:** Three-tier CI workflow - (1) quality gates (tests, Lighthouse) run in parallel on PR, (2) merge requires all gates passing, (3) deploy to GitHub Pages on main branch push

**Critical Pitfall:** Lighthouse CI requires `fetch-depth: 20` in checkout action and base branch comparison setup, or GitHub status checks won't link to PRs correctly

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Web Vitals Integration** - Foundation for performance monitoring
   - Addresses: PERF-01 (RUM integration), PERF-02 (threshold tracking)
   - Avoids: Analytics loading pitfall (non-blocking, buffered API usage)

2. **Three.js Performance Optimization** - User-facing performance wins
   - Addresses: PERF-03 (Intersection Observer), PERF-04 (adaptive particles)
   - Avoids: Hard-coded waits, manual visibility checks (use native API)

3. **E2E Test Suite** - Critical user flow coverage
   - Addresses: E2E-01 through E2E-05 (5 critical flows)
   - Avoids: Flaky tests (use Page Object Model, web-first assertions)

4. **Lighthouse CI Setup** - Performance budget enforcement
   - Addresses: CI-01 through CI-05 (thresholds, budgets)
   - Avoids: Shallow git clone, missing Chrome, protocol errors

5. **GitHub Actions Integration** - Complete quality gate orchestration
   - Addresses: CI-06 through CI-11 (all tests in CI)
   - Avoids: Fork security issues (use two-workflow pattern for coverage comments)

**Phase Ordering Rationale:**
- Web Vitals first: Establishes baseline metrics to track improvements
- Three.js optimization second: Delivers measurable performance wins before enforcement
- E2E tests third: Provides comprehensive coverage before CI integration
- Lighthouse CI fourth: Adds budget enforcement after optimizations complete
- GitHub Actions last: Orchestrates all previous components into automated gates

**Research Flags for Plans:**
- Plan 1 (Web Vitals): Standard pattern, unlikely to need deep research
- Plan 2 (Three.js): May need testing strategy research for Intersection Observer verification
- Plan 3 (E2E): Will need Page Object Model structure decisions
- Plan 4 (Lighthouse): Configuration research for budget thresholds
- Plan 5 (GitHub Actions): Matrix strategy research for workflow optimization

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Web Vitals | HIGH | Official library with clear documentation, verified implementation patterns |
| Three.js Optimization | HIGH | Native browser APIs (Intersection Observer), well-documented patterns |
| E2E Testing | HIGH | Playwright already installed, official POM documentation comprehensive |
| Lighthouse CI | HIGH | Official tool with GitHub Actions templates, extensive troubleshooting docs |
| CI Workflow | MEDIUM | Multiple valid approaches (single vs matrix), requires Claude discretion |

## Gaps to Address

**Performance Monitoring Implementation:**
- Where to send Web Vitals data? (Options: console logging for MVP, Google Analytics 4, dedicated RUM service)
- What granularity for analytics? (Per-metric, aggregated, or both)

**E2E Test Scope:**
- How deep should each flow test go? (Happy path only vs edge cases)
- Mobile viewport testing depth? (Separate test file or parameterized tests)

**CI Workflow Optimization:**
- Single workflow with matrix vs multiple workflows? (Research shows both work, need cost/speed tradeoff analysis)
- Parallel execution limits? (256 job max per workflow, unlikely to hit)

**Budget Thresholds:**
- Initial bundle size limits? (Need baseline measurement first)
- Image size budgets? (Project uses optimized images, needs audit)

These gaps are intentional - they require phase-specific decisions based on project state at execution time.

---

# Technology Stack

**Project:** alexmj212.github.io - Portfolio Site
**Researched:** 2026-01-31

## Recommended Stack

### Performance Monitoring
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| web-vitals | 5.x | RUM monitoring (LCP, INP, CLS) | Official Google library, buffered API prevents measurement timing issues, 2KB bundle size |
| @types/web-vitals | 5.x | TypeScript types | Type safety for metric callbacks |

**Installation:**
```bash
npm install web-vitals
npm install -D @types/web-vitals
```

**Rationale:** The `web-vitals` library is the authoritative implementation for measuring Core Web Vitals. Key advantages:
- Uses buffered PerformanceObserver (no need for early loading)
- Matches Google's CrUX methodology exactly
- Provides attribution build for debugging
- Supports all modern analytics platforms

### Lighthouse CI
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @lhci/cli | 0.15.x | Performance budgets & regression detection | Official Google tool, integrates with GitHub Actions, enforces thresholds |

**Installation:**
```bash
npm install -g @lhci/cli@0.15.x  # CI environment only
```

**Rationale:** Lighthouse CI automates performance audits on every PR:
- Catches performance regressions before merge
- Enforces budgets for scripts, images, and timings
- Displays results as GitHub status checks
- Maintains historical trend data

### End-to-End Testing
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @playwright/test | 1.54.2 | E2E test framework | Already installed, official best practices for React, supports Page Object Model |

**No new installation required** - Playwright already present in project.

**Rationale:** Playwright provides reliable E2E testing:
- Auto-waiting prevents flaky tests
- Role-based selectors align with accessibility
- Browser coverage (Chromium, Firefox, WebKit)
- Built-in trace viewer for debugging

### CI/CD Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GitHub Actions | N/A (platform) | CI orchestration | Already used for deployment, matrix strategies enable parallel execution |

**No installation required** - platform feature.

**Rationale:** GitHub Actions provides:
- Free for public repositories
- Native integration with PRs and status checks
- Artifact storage for coverage reports
- Workflow composition and reusability

## Supporting Tools

### Performance Analysis
| Tool | Purpose | When to Use |
|------|---------|-------------|
| Chrome DevTools | Lighthouse audits, performance profiling | Local development, debugging performance issues |
| PageSpeed Insights | CrUX data comparison | Validating RUM data against Google's aggregated metrics |
| Lighthouse CI Server | Historical trend tracking | Optional - for team visibility and dashboards |

### Testing Utilities
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @axe-core/playwright | 4.11.0 | Accessibility E2E tests | Already installed, integrate into E2E flows for a11y validation |
| vitest-axe | 0.1.0 | Accessibility unit tests | Already installed, component-level a11y validation |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| RUM Library | web-vitals | Custom implementation | web-vitals matches Google's methodology exactly, avoiding measurement discrepancies |
| RUM Library | web-vitals | @perfio/web-vitals (third-party fork) | Official library is canonical source, better maintained |
| Performance CI | @lhci/cli | Lighthouse GitHub Action (treosh) | CLI provides more configuration flexibility and matches official docs |
| Performance CI | @lhci/cli | SpeedCurve, DebugBear (paid SaaS) | Free budget constraints, GitHub Actions sufficient for portfolio site |
| E2E Framework | Playwright | Cypress | Playwright already installed, better TypeScript support, multi-browser coverage |
| CI Platform | GitHub Actions | CircleCI, Travis CI | Already using GitHub Actions for deploy, free for public repos |

## Configuration Files Required

### Lighthouse CI Configuration
**File:** `lighthouserc.js`

**Purpose:** Defines URLs to audit, assertion thresholds, and budget enforcement.

**Example Structure:**
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/resume'],
      numberOfRuns: 3, // Reduce variance
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Free option
    },
  },
};
```

### Performance Budget
**File:** `budget.json`

**Purpose:** Define resource size and timing limits.

**Example Structure:**
```json
[
  {
    "path": "/*",
    "timings": [
      {"metric": "interactive", "budget": 5000},
      {"metric": "first-contentful-paint", "budget": 2000}
    ],
    "resourceSizes": [
      {"resourceType": "script", "budget": 150},
      {"resourceType": "image", "budget": 500},
      {"resourceType": "total", "budget": 1000}
    ],
    "resourceCounts": [
      {"resourceType": "third-party", "budget": 10}
    ]
  }
]
```

### Playwright Configuration Updates
**File:** `playwright.config.ts` (already exists)

**Updates Needed:** Add E2E test directory, configure for CI environment.

## Installation Summary

**New dependencies:**
```bash
npm install web-vitals
npm install -D @types/web-vitals
```

**Global CLI (CI only):**
```bash
npm install -g @lhci/cli@0.15.x
```

**Already installed (no action needed):**
- @playwright/test@1.54.2
- @axe-core/playwright@4.11.0
- vitest@4.0.5

## Sources

**HIGH Confidence:**
- [web-vitals GitHub Repository](https://github.com/GoogleChrome/web-vitals) - Official library documentation
- [Lighthouse CI GitHub Repository](https://github.com/GoogleChrome/lighthouse-ci) - Official CI tool
- [Playwright Page Object Model](https://playwright.dev/docs/pom) - Official documentation
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) - Official guidelines
- [Web Vitals Measurement Guide](https://web.dev/articles/vitals-measurement-getting-started) - Official implementation guide

**MEDIUM Confidence:**
- [Lighthouse CI Configuration Documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) - Official config reference
- [Performance Budgets with Lighthouse](https://www.afasterweb.com/2020/01/28/performance-budgets-with-lighthouse/) - Community implementation guide
- [GitHub Actions Matrix Strategy](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow) - Official GitHub docs

---

# Feature Landscape

**Domain:** Performance monitoring, CI/CD quality gates, E2E testing
**Researched:** 2026-01-31

## Table Stakes

Features users expect from production-quality portfolio sites. Missing = unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Fast page loads (LCP <2.5s) | Google ranking factor, user expectation | Medium | Requires measurement, optimization, and enforcement |
| Smooth interactions (INP <200ms) | Modern web standard, accessibility requirement | Medium | React SPA already performant, needs verification |
| Visual stability (CLS <0.1) | User frustration if layouts shift | Low | Project likely already compliant, needs measurement |
| Mobile responsiveness | 60%+ traffic from mobile devices | Low | Already implemented, needs E2E verification |
| Accessibility compliance | Legal requirement, inclusive design | Low | Phase 3 complete, needs E2E verification |
| Continuous deployment | Developer productivity expectation | Low | Already exists via GitHub Actions |

## Differentiators

Features that set production portfolios apart from amateur projects. Not expected, but valued by technical recruiters.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Automated performance budgets | Demonstrates DevOps expertise, prevents regressions | Medium | Lighthouse CI enforces thresholds on every PR |
| Real User Monitoring (RUM) | Shows data-driven decision making | Low | web-vitals library integration |
| E2E test coverage | Demonstrates QA engineering skills | High | 5 critical flows per requirements |
| CI/CD quality gates | Shows senior engineering maturity | Medium | All tests block merge |
| Performance monitoring in production | Proactive rather than reactive approach | Medium | RUM data collection and reporting |
| Test coverage reporting | Transparency, quality metrics | Low | Already have Vitest coverage, add to PR comments |
| Adaptive performance (particle count) | Demonstrates UX awareness | Medium | Shows consideration for low-end devices |

## Anti-Features

Features to explicitly NOT build. Common mistakes in this domain.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Heavy analytics tracking (Google Analytics, Mixpanel, etc.) | Hurts Core Web Vitals, privacy concerns | Lightweight web-vitals to console or minimal RUM endpoint |
| Third-party performance monitoring SaaS | Costs money, overkill for portfolio | Use free Lighthouse CI + web-vitals library |
| Comprehensive E2E test suite (100+ tests) | High maintenance burden, slow CI | 5 critical flows covering main user journeys |
| 100% code coverage requirement | Diminishing returns, slow tests | 70% threshold already set in Phase 2 |
| Daily Lighthouse audits | Wastes CI minutes, no value without code changes | Run on PR only |
| Custom performance budgets per page | Over-engineering for 2-3 page site | Global budget for all pages |
| Manual performance testing | Not scalable, human error prone | Automated Lighthouse CI on every PR |
| Synthetic monitoring (cron jobs) | Unnecessary for static portfolio site | RUM from actual users instead |

## Feature Dependencies

```
Core Web Vitals Tracking (PERF-01, PERF-02)
  ↓
Three.js Optimization (PERF-03, PERF-04)
  ↓ (optimization provides measurable wins)
Lighthouse CI Setup (CI-01 to CI-05)
  ↓ (thresholds based on actual measurements)
GitHub Actions Integration (CI-06 to CI-11)

E2E Test Suite (E2E-01 to E2E-05)
  ↓ (independent path, runs in parallel)
GitHub Actions Integration (CI-06 to CI-11)
```

**Critical Dependency:** Web Vitals tracking must precede Lighthouse thresholds. You can't set meaningful budgets without baseline measurements.

**Parallel Tracks:** E2E testing is independent of performance monitoring and can be developed concurrently.

## MVP Recommendation

For Phase 4 MVP, prioritize in this order:

1. **Web Vitals RUM** (PERF-01, PERF-02) - Establishes metrics
2. **Three.js Optimization** (PERF-03, PERF-04) - User-facing performance wins
3. **Core E2E Flows** (E2E-01 to E2E-05) - Critical path coverage
4. **Lighthouse CI** (CI-01 to CI-05) - Budget enforcement
5. **GitHub Actions Quality Gates** (CI-06 to CI-11) - Automation

Defer to post-MVP (future enhancements):
- **Performance Budget Refinement:** Start with generous budgets, tighten based on data
- **Coverage PR Comments:** Nice-to-have for transparency, not blocking
- **Advanced Web Vitals Analytics:** Console logging sufficient for MVP, defer GA4 integration
- **Lighthouse CI Server:** Temporary public storage sufficient, defer self-hosted server
- **Additional E2E Scenarios:** 5 flows cover critical paths, defer edge cases

## Performance Budget Baseline Recommendations

Based on roadmap success criteria and industry standards:

| Metric | Target | Source |
|--------|--------|--------|
| Performance Score | 90+ | Roadmap requirement CI-02 |
| Accessibility Score | 90+ | Roadmap requirement CI-03 |
| LCP | <2.5s | Roadmap requirement PERF-02, Google "good" threshold |
| INP | <200ms | Roadmap requirement PERF-02, Google "good" threshold |
| CLS | <0.1 | Roadmap requirement PERF-02, Google "good" threshold |
| Total Bundle Size | <1MB | Industry standard for portfolios |
| JavaScript Bundle | <150KB | Prevents INP degradation |
| Image Budget | <500KB total | Portfolio sites average 300-500KB images |

**Calibration Strategy:**
1. Run Lighthouse locally on current build
2. Set initial budgets at 110% of current values (allows headroom)
3. Tighten budgets by 5-10% each month as optimizations land

## Sources

**Core Web Vitals Thresholds:**
- [Understanding Core Web Vitals and Google Search](https://developers.google.com/search/docs/appearance/core-web-vitals) - Official Google documentation
- [Core Web Vitals 2026 Complete Guide](https://senorit.de/en/blog/core-web-vitals-2026) - Current thresholds verified
- [How Core Web Vitals Thresholds Were Defined](https://web.dev/articles/defining-core-web-vitals-thresholds) - Methodology

**Performance Budgets:**
- [Performance Budgets with Lighthouse](https://www.afasterweb.com/2020/01/28/performance-budgets-with-lighthouse/) - Implementation guide
- [Lighthouse CI Configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) - Official budget.json spec

**E2E Testing Best Practices:**
- [Guide to Playwright E2E Testing 2026](https://www.deviqa.com/blog/guide-to-playwright-end-to-end-testing-in-2025/) - Current best practices
- [15 Playwright Best Practices 2026](https://www.browserstack.com/guide/playwright-best-practices) - Official recommendations

---

# Architecture Patterns

**Domain:** Performance monitoring, CI/CD pipelines, E2E testing
**Researched:** 2026-01-31

## Recommended Architecture

### Three-Tier CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                     Pull Request Opened                      │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │   GitHub Actions Trigger │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │   Quality Gate Workflow  │
        │   (Runs in Parallel)     │
        └─┬───────┬───────┬───────┘
          │       │       │
    ┌─────▼─┐ ┌──▼───┐ ┌─▼─────┐
    │ Unit  │ │ E2E  │ │Lhouse │
    │ Tests │ │Tests │ │  CI   │
    │Vitest │ │P'wght│ │ Perf  │
    └───┬───┘ └──┬───┘ └───┬───┘
        │        │         │
        └────────┴─────────┘
                 │
    ┌────────────▼────────────┐
    │   All Gates Pass?       │
    └─────┬──────────┬────────┘
          │ YES      │ NO
    ┌─────▼──┐  ┌────▼─────┐
    │ Merge  │  │  Block   │
    │Enabled │  │  Merge   │
    └─────┬──┘  └──────────┘
          │
    ┌─────▼──────────────────┐
    │  Merge to main         │
    └─────┬──────────────────┘
          │
    ┌─────▼──────────────────┐
    │ Deploy Workflow        │
    │ (build + GitHub Pages) │
    └────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Web Vitals Reporter | Collects LCP, INP, CLS in production | Analytics endpoint (console or external) |
| Intersection Observer Controller | Pauses Three.js when off-screen | ThreeBackground component animation loop |
| Adaptive Performance Manager | Detects device capability, adjusts particle count | ThreeBackground component CONFIG |
| E2E Test Suite | Verifies critical user flows | Playwright test runner, Page Objects |
| Page Objects | Encapsulate UI interactions | E2E test cases |
| Lighthouse CI Runner | Enforces performance budgets | GitHub Actions, lighthouserc.js config |
| GitHub Actions Workflows | Orchestrates quality gates | All test runners, deployment |

### Data Flow: Web Vitals RUM

```
User Interaction (page load, click, scroll)
  ↓
Browser Performance APIs (PerformanceObserver)
  ↓
web-vitals Library (onLCP, onINP, onCLS callbacks)
  ↓
Metric Aggregation (name, value, id, delta)
  ↓
Analytics Reporter (navigator.sendBeacon or console.log)
  ↓
Analytics Endpoint (external service or browser console)
```

**Key Decisions:**
- Call `onCLS()`, `onINP()`, `onLCP()` **once** per page load (React `useEffect` with empty deps)
- Use `navigator.sendBeacon()` for reliable reporting during page unload
- Report only final metric values (not intermediate updates) for production

### Data Flow: Lighthouse CI

```
PR Opened
  ↓
GitHub Actions Workflow Triggered
  ↓
Checkout Code (fetch-depth: 20 for comparison)
  ↓
Install Dependencies (npm ci)
  ↓
Build Production Bundle (npm run build)
  ↓
Start Dev Server (background)
  ↓
Lighthouse CI Collect (3 runs per URL)
  ↓
Lighthouse CI Assert (compare to thresholds)
  ↓
Upload Results (temporary-public-storage)
  ↓
Post GitHub Status Check (pass/fail)
```

**Key Decisions:**
- Run 3 Lighthouse audits per URL to reduce variance
- Use temporary public storage (free, no server required)
- Set `fetch-depth: 20` to enable base branch comparison
- Run on `pull_request` event only (not on push to main)

## Patterns to Follow

### Pattern 1: Web-First Assertions (Playwright)
**What:** Use Playwright's built-in assertions with auto-retry instead of manual waits.

**When:** All E2E test interactions and verifications.

**Example:**
```typescript
// ❌ BAD: Hard-coded waits
await page.waitForTimeout(2000);
expect(await page.locator('.modal').isVisible()).toBe(true);

// ✅ GOOD: Web-first assertions with auto-retry
await expect(page.locator('.modal')).toBeVisible();
```

**Why:** Eliminates flaky tests caused by timing issues. Playwright automatically retries assertions until they pass or timeout.

### Pattern 2: Page Object Model (E2E Organization)
**What:** Encapsulate page interactions in classes, separate from test logic.

**When:** E2E tests with reusable UI interactions.

**Example:**
```typescript
// pages/PortfolioPage.ts
export class PortfolioPage {
  readonly page: Page;
  readonly portfolioCard: Locator;
  readonly portfolioModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.portfolioCard = page.getByRole('article').first();
    this.portfolioModal = page.getByRole('dialog');
  }

  async openFirstProject() {
    await this.portfolioCard.click();
    await expect(this.portfolioModal).toBeVisible();
  }

  async closeModal() {
    await this.page.keyboard.press('Escape');
    await expect(this.portfolioModal).not.toBeVisible();
  }
}

// tests/portfolio.spec.ts
test('portfolio flow', async ({ page }) => {
  const portfolio = new PortfolioPage(page);
  await portfolio.openFirstProject();
  await portfolio.closeModal();
});
```

**Why:** Keeps tests readable, centralizes selectors, makes UI changes easier to maintain.

### Pattern 3: Intersection Observer for Visibility
**What:** Use native Intersection Observer API to detect when Three.js canvas is off-screen.

**When:** Optimizing expensive animations or effects.

**Example:**
```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  let animationId: number;
  let isVisible = true;

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        animate(); // Resume animation
      } else {
        cancelAnimationFrame(animationId); // Pause
      }
    },
    { threshold: 0 } // Fire as soon as any part enters viewport
  );

  observer.observe(canvas);

  const animate = () => {
    if (!isVisible) return; // Safety check
    // ... render logic ...
    animationId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    observer.disconnect();
    cancelAnimationFrame(animationId);
  };
}, []);
```

**Why:** Browser-native, efficient, zero CPU usage when off-screen. Better than manual scroll listeners.

### Pattern 4: Device Detection for Adaptive Performance
**What:** Detect mobile vs desktop to adjust resource-intensive features.

**When:** Features with significant performance differences across device classes.

**Example:**
```typescript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

const CONFIG = {
  particleCount: isMobile ? 25 : 50, // Fewer particles on mobile
  trailCount: isMobile ? 8 : 16,
};
```

**Why:** Simple, effective for static performance tiers. More complex approaches (FPS monitoring, Device Memory API) add overhead.

### Pattern 5: GitHub Actions Matrix for Parallel Tests
**What:** Use matrix strategy to run test suites in parallel.

**When:** Multiple independent test suites (unit, E2E, accessibility).

**Example:**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        test-suite: [unit, e2e, accessibility]
    steps:
      - name: Run ${{ matrix.test-suite }} tests
        run: npm run test:${{ matrix.test-suite }}
```

**Why:** Reduces total CI time from sequential (5+5+5=15min) to parallel (max(5,5,5)=5min).

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hard-Coded Waits in E2E Tests
**What:** Using `page.waitForTimeout(2000)` instead of assertions.

**Why Bad:** Creates flaky tests - sometimes 2s is too short, sometimes too long. Wastes CI time.

**Instead:** Use `await expect(locator).toBeVisible()` with auto-retry.

### Anti-Pattern 2: CSS/XPath Selectors in E2E Tests
**What:** `page.locator('.btn-primary')` or `page.locator('//div[@class="modal"]')`.

**Why Bad:** Breaks when UI changes (class names, DOM structure). Not user-centric.

**Instead:** Use role-based selectors: `page.getByRole('button', {name: 'Submit'})`.

### Anti-Pattern 3: Multiple web-vitals Calls Per Page Load
**What:** Calling `onCLS()` in multiple components or on every render.

**Why Bad:** Causes memory leaks, duplicate reporting, incorrect metrics.

**Instead:** Call once in root component with empty dependency array:
```typescript
useEffect(() => {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
}, []); // Empty deps = once per mount
```

### Anti-Pattern 4: Shallow Git Clone in Lighthouse CI
**What:** Using default `actions/checkout@v3` without `fetch-depth`.

**Why Bad:** Lighthouse CI can't compare to base branch, GitHub status checks won't link to PR.

**Instead:** Add `fetch-depth: 20` to checkout step.

### Anti-Pattern 5: Blocking Analytics Loading
**What:** Loading analytics in `<head>` before app code.

**Why Bad:** Delays LCP (Largest Contentful Paint), hurts performance score.

**Instead:** Load analytics asynchronously after app initialization, or use `navigator.sendBeacon()` for reporting without blocking.

### Anti-Pattern 6: Test Data Pollution
**What:** Creating test data in one test, depending on it in another.

**Why Bad:** Tests fail when run in isolation or different order. Flaky CI builds.

**Instead:** Each test creates and cleans up its own data (use `beforeEach`/`afterEach`).

## Scalability Considerations

| Concern | At Current Scale (1 user/portfolio) | At 10K users/day | At 1M users/day |
|---------|-------------------------------------|------------------|-----------------|
| Web Vitals Storage | Console logging sufficient | Need analytics platform (GA4 free tier) | Need dedicated RUM service (paid) |
| Lighthouse CI Frequency | Every PR (low volume) | Every PR (same) | Every PR (same) |
| E2E Test Execution Time | <5 minutes acceptable | Need test sharding across machines | Need distributed test grid |
| GitHub Actions Minutes | Free tier sufficient (2000 min/month) | Likely still free | May need paid tier |
| Performance Budgets | Static budgets work | Dynamic budgets based on p75 | Dynamic + regional budgets |

**Current Phase Recommendation:** Console logging for Web Vitals, free Lighthouse CI, single GitHub Actions workflow. No scalability concerns for portfolio site.

## Sources

**HIGH Confidence:**
- [Playwright Best Practices](https://playwright.dev/docs/best-practices) - Official documentation
- [Playwright Page Object Model](https://playwright.dev/docs/pom) - Official pattern guide
- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Browser API documentation
- [GitHub Actions Matrix Strategy](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow) - Official GitHub docs

**MEDIUM Confidence:**
- [Adaptive Loading Guide](https://web.dev/articles/adaptive-loading-cds-2019) - Performance optimization patterns
- [BrowserStack Playwright Best Practices](https://www.browserstack.com/guide/playwright-best-practices) - Community best practices compilation

---

# Domain Pitfalls

**Domain:** Performance monitoring, Lighthouse CI, E2E testing, GitHub Actions
**Researched:** 2026-01-31

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Shallow Git Clone Breaking Lighthouse CI
**What Goes Wrong:** GitHub status checks post to wrong PR or don't appear at all. Lighthouse CI can't compute diffs between current and base branch.

**Why It Happens:** Default `actions/checkout@v3` uses `fetch-depth: 1` (shallow clone) for speed. Lighthouse CI needs git history to compare commits.

**Consequences:**
- GitHub status checks say "passed" but aren't linked to PR
- Can't see performance regressions (no baseline comparison)
- Developers merge PRs without seeing Lighthouse results

**Prevention:**
```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 20  # Fetch enough history for comparison
    ref: ${{ github.event.pull_request.head.sha }}  # Link to correct PR
```

**Detection:** Check GitHub PR status checks. If Lighthouse results don't appear, git depth is likely the issue.

**Source:** [Lighthouse CI Troubleshooting](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/troubleshooting.md) - Official docs

---

### Pitfall 2: Multiple web-vitals Calls Causing Memory Leaks
**What Goes Wrong:** Calling `onCLS()`, `onINP()`, `onLCP()` on every render or in multiple components causes memory leaks and duplicate metrics.

**Why It Happens:** Developers treat web-vitals like event handlers, calling them in multiple places "to be safe."

**Consequences:**
- Browser tab memory grows unbounded
- Analytics receives duplicate metrics (inflated data)
- Performance monitoring becomes unreliable

**Prevention:**
```typescript
// ✅ CORRECT: Call once per page load
useEffect(() => {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
}, []); // Empty deps = once per mount

// ❌ WRONG: Called on every render
useEffect(() => {
  onCLS(sendToAnalytics);
}); // No deps = every render
```

**Detection:** Check browser DevTools memory profiler for growing heap. Look for duplicate metric events in analytics.

**Source:** [Web Vitals Field Measurement Best Practices](https://web.dev/articles/vitals-field-measurement-best-practices) - Official guide

---

### Pitfall 3: Hard-Coded Waits Creating Flaky E2E Tests
**What Goes Wrong:** Tests pass locally but fail randomly in CI. Test suite becomes unreliable, developers lose confidence.

**Why It Happens:** Developers use `waitForTimeout(2000)` instead of web-first assertions. CI machines are slower than local, causing race conditions.

**Consequences:**
- 10-30% of CI runs fail randomly
- Developers ignore test failures ("it's just flaky")
- Real bugs slip through because tests aren't trusted
- Wasted CI minutes on retries

**Prevention:**
```typescript
// ❌ WRONG: Hard-coded wait
await page.waitForTimeout(2000);
const isVisible = await page.locator('.modal').isVisible();
expect(isVisible).toBe(true);

// ✅ CORRECT: Web-first assertion
await expect(page.locator('.modal')).toBeVisible();
```

**Detection:** Run E2E tests 10 times locally. If any failures occur, tests are flaky. Check for `waitForTimeout` calls.

**Sources:**
- [Stop Writing Flaky Tests - Playwright Mistakes](https://medium.com/@anna_tomka/stop-writing-flaky-tests-how-to-avoid-common-playwright-mistakes-425da48b82d4) - Expert analysis
- [Avoiding Flaky Tests in Playwright](https://betterstack.com/community/guides/testing/avoid-flaky-playwright-tests/) - Best practices guide

---

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

### Pitfall 4: CSS/XPath Selectors Breaking E2E Tests
**What Goes Wrong:** UI redesign breaks all E2E tests. Hundreds of selectors need updating.

**Prevention:** Use role-based selectors that mirror user behavior:
```typescript
// ❌ Fragile: Breaks when class changes
page.locator('.btn-primary')

// ✅ Robust: Works even if classes change
page.getByRole('button', {name: 'Submit'})
```

**Source:** [Playwright Best Practices - Selectors](https://playwright.dev/docs/best-practices) - Official guide

---

### Pitfall 5: Blocking Analytics Hurting Core Web Vitals
**What Goes Wrong:** Adding Google Analytics or similar tracking scripts in `<head>` increases LCP by 500-1000ms, failing Lighthouse CI.

**Prevention:**
- Load analytics asynchronously after app initialization
- Use `navigator.sendBeacon()` for reporting (doesn't block)
- Keep web-vitals library (2KB) as only analytics dependency

**Source:** [Google Analytics Causing Failed Core Web Vitals](https://nitropack.io/blog/post/google-analytics-failed-core-web-vitals) - Analysis

---

### Pitfall 6: Missing Chrome in CI Environment
**What Goes Wrong:** Lighthouse CI fails with "Chrome not found" error in GitHub Actions.

**Prevention:** Use `actions/setup-node@v4` which includes Chromium, or explicitly install Chrome:
```yaml
- name: Install Chrome
  run: |
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
    sudo apt-get update
    sudo apt-get install google-chrome-stable
```

**Source:** [Lighthouse CI Troubleshooting - Missing Chrome](https://googlechrome.github.io/lighthouse-ci/docs/troubleshooting.html) - Official docs

---

### Pitfall 7: Test Data Pollution Between E2E Tests
**What Goes Wrong:** Tests pass when run individually, fail when run together. CI failures are non-deterministic.

**Prevention:**
- Each test creates and cleans up its own data
- Use `test.beforeEach()` and `test.afterEach()` for setup/teardown
- Don't rely on data created by previous tests

**Source:** [Manage Playwright Flaky Tests](https://testdino.com/blog/manage-playwright-flaky-tests/) - Testing guide

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable.

### Pitfall 8: Lighthouse Variance Causing False Positives
**What Goes Wrong:** Performance score fluctuates between 89 and 92, causing random CI failures.

**Prevention:** Run multiple Lighthouse audits and average:
```javascript
// lighthouserc.js
collect: {
  numberOfRuns: 3, // Reduce variance
}
```

**Source:** [Lighthouse CI Configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) - Official docs

---

### Pitfall 9: Forgetting to Install Playwright Browsers
**What Goes Wrong:** E2E tests fail with "Browser not found" in CI.

**Prevention:** Add `npx playwright install` step in GitHub Actions:
```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps chromium
```

---

### Pitfall 10: Race Conditions in Intersection Observer
**What Goes Wrong:** Animation doesn't pause when scrolling quickly, or resumes multiple times.

**Prevention:** Add visibility check in animation loop:
```typescript
const animate = () => {
  if (!isVisible) return; // Safety check
  // ... render logic ...
  animationId = requestAnimationFrame(animate);
};
```

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Web Vitals Integration | Multiple calls causing memory leaks | Call once in root component with empty deps |
| Three.js Optimization | Intersection Observer race conditions | Add isVisible safety check in animation loop |
| E2E Test Suite | Hard-coded waits creating flaky tests | Use web-first assertions exclusively |
| Lighthouse CI Setup | Shallow git clone breaking status checks | Add fetch-depth: 20 to checkout action |
| GitHub Actions Integration | Missing browsers in CI | Add playwright install step |

## Testing Anti-Patterns Summary

**Most Common E2E Mistakes (in order of impact):**
1. Hard-coded waits (`waitForTimeout`) instead of assertions
2. CSS/XPath selectors instead of role-based selectors
3. Test data pollution (no cleanup)
4. Missing async/await (causes skipped waits)
5. No Page Object Model (repetitive, hard to maintain)

**Source:** [Say Goodbye to Flaky Tests - Playwright Best Practices](https://medium.com/@samuel.sperling/say-goodbye-to-flaky-tests-playwright-best-practices-every-test-automation-engineer-must-know-9dfeb9bb5017) - Expert compilation

## CI/CD Anti-Patterns Summary

**Most Common GitHub Actions Mistakes:**
1. Shallow git clone (breaks Lighthouse CI comparison)
2. Missing fetch-depth in checkout
3. Not caching dependencies (slow builds)
4. Running tests sequentially instead of parallel
5. No artifact uploads (can't debug failures)

**Source:** [Lighthouse CI GitHub Actions Setup](https://blog.logrocket.com/lighthouse-meets-github-actions-use-lighthouse-ci/) - Implementation guide

## Sources

**All findings verified with official documentation or expert community sources.**

**HIGH Confidence:**
- [Lighthouse CI Troubleshooting](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/troubleshooting.md)
- [Web Vitals Field Measurement Best Practices](https://web.dev/articles/vitals-field-measurement-best-practices)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

**MEDIUM Confidence:**
- [Stop Writing Flaky Tests](https://medium.com/@anna_tomka/stop-writing-flaky-tests-how-to-avoid-common-playwright-mistakes-425da48b82d4)
- [Lighthouse Meets GitHub Actions](https://blog.logrocket.com/lighthouse-meets-github-actions-use-lighthouse-ci/)
- [Google Analytics Core Web Vitals Issues](https://nitropack.io/blog/post/google-analytics-failed-core-web-vitals)

---

# Research Complete

**Project:** alexmj212.github.io
**Mode:** Ecosystem research
**Confidence:** HIGH

This research provides comprehensive coverage of Phase 4 requirements across five domains:

1. **Technology Stack:** Official libraries (web-vitals, @lhci/cli) with version recommendations
2. **Feature Landscape:** Table stakes, differentiators, and anti-features for production portfolios
3. **Architecture Patterns:** Three-tier CI pipeline, Page Object Model, Intersection Observer patterns
4. **Domain Pitfalls:** 10 specific pitfalls with prevention strategies

**Ready for Roadmap Creation:** All research questions answered with HIGH confidence. Phase planning can proceed.

---

## Sources Summary

**Web Vitals & Performance Monitoring:**
- [web-vitals npm package](https://www.npmjs.com/package/web-vitals)
- [Web Vitals GitHub Repository](https://github.com/GoogleChrome/web-vitals)
- [Getting Started with Web Vitals](https://web.dev/articles/vitals-measurement-getting-started)
- [Core Web Vitals Report Documentation](https://support.google.com/webmasters/answer/9205520?hl=en)
- [Interop 2026: Key APIs for RUM](https://www.rumvision.com/blog/interop-2026-key-apis-for-sitespeed-and-rum/)

**Lighthouse CI:**
- [Lighthouse CI GitHub Repository](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse CI Configuration Docs](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [Lighthouse CI Action - GitHub Marketplace](https://github.com/marketplace/actions/lighthouse-ci-action)
- [Performance Budgets with Lighthouse](https://www.afasterweb.com/2020/01/28/performance-budgets-with-lighthouse/)

**Playwright E2E Testing:**
- [Playwright Page Object Model](https://playwright.dev/docs/pom)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Guide to Playwright Testing 2026](https://www.deviqa.com/blog/guide-to-playwright-end-to-end-testing-in-2025/)
- [15 Best Practices for Playwright 2026](https://www.browserstack.com/guide/playwright-best-practices)
- [Stop Writing Flaky Tests](https://medium.com/@anna_tomka/stop-writing-flaky-tests-how-to-avoid-common-playwright-mistakes-425da48b82d4)

**GitHub Actions:**
- [GitHub Actions Matrix Strategy](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow)
- [Parallel Execution with Job Matrix](https://documentation.provar.com/documentation/devops/continuous-integration/github-actions/parallel-execution-in-github-actions-using-job-matrix/)
- [GitHub Actions Code Coverage](https://josh-ops.com/posts/github-code-coverage/)

**Three.js Performance:**
- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Adaptive Loading Guide](https://web.dev/articles/adaptive-loading-cds-2019)
- [Three.js RequestAnimationFrame Best Practices](https://discoverthreejs.com/book/first-steps/animation-loop/)

**Core Web Vitals Standards:**
- [Understanding Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Core Web Vitals 2026 Complete Guide](https://senorit.de/en/blog/core-web-vitals-2026)
- [How Thresholds Were Defined](https://web.dev/articles/defining-core-web-vitals-thresholds)
