# Quality Engineering Stack Research

**Domain:** React 18 + TypeScript + Vite Quality Engineering Enhancement
**Researched:** 2026-01-27
**Confidence:** HIGH

## Recommended Stack

### Unit & Component Testing

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vitest | ^4.0.17 | Unit and component test runner | Native Vite integration, 10-20x faster than Jest, ESM support out of the box, browser mode for component testing. Industry standard for Vite projects in 2026. |
| @vitest/ui | ^4.0.17 | Test UI dashboard | Built-in test dashboard for visualizing test results and debugging |
| React Testing Library | ^16.1.0 | Component testing utilities | Industry standard for behavior-driven React component testing, focuses on user interactions not implementation details |
| @testing-library/user-event | ^14.5.2 | User interaction simulation | More realistic user interaction simulation than fireEvent, recommended by Testing Library team |
| @testing-library/react | ^16.1.0 | React-specific testing utilities | Complements React Testing Library with React 18 features |

### Code Coverage

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| @vitest/coverage-v8 | ^4.0.17 | Code coverage reporting | Faster than Istanbul, AST-based remapping since v3.2.0 provides Istanbul-level accuracy with V8 speed. Default for Vitest projects. |

### Accessibility Testing

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| vitest-axe | ^1.0.3 | Automated a11y testing | Custom Vitest matcher for axe-core, catches ~30% of accessibility issues automatically, integrates directly with component tests |
| axe-core | ^4.10.2 | A11y testing engine | Industry standard accessibility testing engine, tests against WCAG standards, powers most a11y tools |
| @axe-core/playwright | ^4.10.2 | E2E a11y testing | Integrates axe-core with existing Playwright setup for end-to-end accessibility validation |

### End-to-End Testing

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Playwright | ^1.54.2 | E2E and visual testing | Already installed, supports component testing (experimental), cross-browser testing, network interception. Keep for critical user flows. |
| @playwright/experimental-ct-react | ^1.54.2 | Playwright component testing | Enables component testing in real browsers with Playwright, useful for complex Three.js interactions |

### API Mocking

| Technology | Version | Purpose | When to Use |
|------------|---------|---------|-------------|
| MSW (Mock Service Worker) | ^2.8.3 | API request mocking | Mock API calls at network level, reusable across test environments, Vitest, Playwright, and Storybook. Use when components make HTTP requests. |

### Performance Monitoring

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| web-vitals | ^5.1.0 | Core Web Vitals tracking | Official Google library for measuring LCP, INP, CLS. Small, production-ready, essential for SEO and UX monitoring. |
| @lightningcss/cli | ^1.29.0 | CSS performance optimization | Fast CSS minifier and bundler, better performance than PostCSS for production builds |
| Lighthouse CI | ^0.14.0 | Performance budgets in CI | Automated Lighthouse audits in CI/CD, catches performance regressions before deployment, enforces budgets |

### Memory Profiling (Three.js Specific)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Chrome DevTools | Built-in | Memory profiling | Performance panel with memory tracking, heap snapshots for leak detection, allocation timeline. Essential for Three.js apps. |
| Three.js DevTools | Chrome Extension | Scene inspection | Inspect Three.js scenes, objects, materials, geometry. View GPU memory usage. Browser extension, no package install needed. |
| Stats.js | ^0.17.0 | Runtime FPS monitoring | Lightweight FPS/memory monitor for development, displays real-time performance metrics |

### Development Tools

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| @vitest/browser | ^4.0.17 | Browser-based testing | Tests run in real browser environment (Chromium/Firefox), catches issues JSDOM misses, required for accurate Three.js testing |
| happy-dom | ^15.11.7 | Lightweight DOM for unit tests | Faster than jsdom, better web standards support. Note: incompatible with vitest-axe, use jsdom for a11y tests |
| jsdom | ^25.0.1 | DOM simulation for tests | Industry standard DOM simulation, compatible with all testing libraries. Use for accessibility tests. |
| @types/jest | ^29.5.14 | Jest type definitions | Type definitions for jest-dom matchers even when using Vitest (for compatibility with testing-library matchers) |

## Installation

```bash
# Core Testing
pnpm install -D vitest @vitest/ui @vitest/coverage-v8 @vitest/browser
pnpm install -D @testing-library/react @testing-library/user-event
pnpm install -D happy-dom jsdom

# Accessibility
pnpm install -D vitest-axe axe-core @axe-core/playwright

# API Mocking (if needed)
pnpm install -D msw

# Performance Monitoring
pnpm install web-vitals
pnpm install -D lighthouse @lhci/cli

# Three.js Monitoring
pnpm install -D stats.js

# Playwright component testing (optional, experimental)
pnpm install -D @playwright/experimental-ct-react

# Type definitions
pnpm install -D @types/jest
```

## Configuration Requirements

### Vitest Configuration

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom for accessibility tests, happy-dom for others
    environment: 'jsdom',

    // Setup file for test matchers
    setupFiles: ['./vitest.setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/types/**',
        'src/**/*.d.ts',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },

    // Browser mode for Three.js tests
    browser: {
      enabled: false, // Enable when testing Three.js components
      name: 'chromium',
      provider: 'playwright',
    },
  },
});
```

### TypeScript Compatibility Note

**CRITICAL:** Current project uses TypeScript 4.7.4. Vitest 4.x and modern testing libraries expect TypeScript 5.4+. Recommend upgrading TypeScript to ^5.7.3 (current stable) for full compatibility.

If TypeScript upgrade is blocked, may need to use Vitest 3.x instead of 4.x.

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Test Runner | Vitest | Jest | Jest lacks native ESM support, 10x slower, requires complex Vite configuration. Only use Jest for React Native. |
| Component Testing | React Testing Library | Enzyme | Enzyme deprecated, doesn't support React 18 hooks, tests implementation details not behavior |
| Coverage | @vitest/coverage-v8 | @vitest/coverage-istanbul | V8 is faster and now has same accuracy as Istanbul (since Vitest 3.2.0). Use Istanbul only if non-V8 runtime required. |
| DOM Simulation | jsdom/happy-dom | JSDOM only | happy-dom is 2-3x faster but incompatible with vitest-axe. Use jsdom globally or switch per test suite. |
| E2E Testing | Playwright | Cypress | Playwright already installed, better for parallel execution, native browser automation, no framework lock-in |
| API Mocking | MSW | axios-mock-adapter | MSW works at network level (more realistic), reusable across tools, framework agnostic |
| Error Monitoring | Sentry | LogRocket | Focus recommendation on open source stack first. Consider Sentry later for production error tracking. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Jest | Slow with Vite, requires extensive configuration, experimental ESM support only | Vitest |
| Enzyme | Deprecated, no React 18 support, tests implementation details | React Testing Library |
| @vitest/coverage-c8 | Deprecated (v0.33.0 last update 3 years ago), replaced by @vitest/coverage-v8 | @vitest/coverage-v8 |
| react-axe | Deprecated by Deque, runtime-only accessibility checking | vitest-axe for tests, @axe-core/playwright for E2E |
| jsdom exclusively | Slower than happy-dom for unit tests, but required for a11y tests | Use both: jsdom for a11y tests, happy-dom for unit tests |

## Stack Patterns by Test Type

### Unit Tests (Component Logic)
- **Environment:** happy-dom
- **Runner:** Vitest
- **Libraries:** React Testing Library, @testing-library/user-event
- **Coverage:** @vitest/coverage-v8
- **Pattern:** Fast, isolated, no network calls

### Integration Tests (Component + API)
- **Environment:** jsdom (for DOM APIs)
- **Runner:** Vitest
- **Libraries:** React Testing Library, MSW
- **Pattern:** Test component behavior with mocked API responses

### Accessibility Tests
- **Environment:** jsdom (required for vitest-axe)
- **Runner:** Vitest
- **Libraries:** vitest-axe, axe-core
- **Pattern:** Run axe() on rendered components in test suite

### Three.js Component Tests
- **Environment:** Browser Mode with Chromium
- **Runner:** Vitest with @vitest/browser
- **Libraries:** Playwright, React Testing Library
- **Pattern:** Test WebGL rendering in real browser, check for memory leaks with DevTools

### E2E Tests (Critical Flows)
- **Framework:** Playwright
- **Libraries:** @axe-core/playwright for a11y
- **Pattern:** 3-5 critical user journeys, run in CI, include accessibility checks

### Performance Tests
- **Tools:** Lighthouse CI, web-vitals
- **Pattern:** Performance budgets in CI, track Core Web Vitals in production

## Version Compatibility Matrix

| Package | Current Project | Compatible With | Notes |
|---------|----------------|-----------------|-------|
| React | 18.3.1 | All recommended packages | Full support |
| TypeScript | 4.7.4 | **Upgrade to 5.7+** | Vitest 4.x expects TS 5.4+, may need Vitest 3.x for TS 4.7 |
| Vite | 5.4.19 | Vitest 4.0.17 requires Vite >=v6.0.0 | **Upgrade Vite to 6.0+** or use Vitest 3.x |
| Playwright | 1.54.2 | All packages | Already installed, good to go |
| Three.js | 0.179.1 | Browser Mode testing | Requires real browser, not JSDOM |

## Performance Impact

| Package | Bundle Impact | Runtime Impact | Notes |
|---------|--------------|----------------|-------|
| web-vitals | ~1.5kb gzipped | Minimal | Production dependency, load async |
| vitest-axe | Dev only | N/A | Dev dependency, not in production bundle |
| MSW | Dev only | N/A | Service Worker only active in development |
| Stats.js | ~2kb | Low | Only load in development mode |

## Integration with Existing Stack

### Works With Existing Setup
- Vitest integrates with existing Vite config (`vite.config.ts`)
- Playwright already installed, add @axe-core/playwright for a11y
- web-vitals integrates with React 18 hooks (useEffect)
- Tailwind CSS testing supported via PostCSS

### Requires New Configuration
- Create `vitest.config.ts` for test-specific settings
- Create `vitest.setup.ts` for test matchers and global setup
- Add `.lighthouserc.json` for performance budgets
- Update `tsconfig.json` to include test files

### CI/CD Integration
- Add Vitest to GitHub Actions: `pnpm test`
- Add coverage reporting: `pnpm test:coverage`
- Add Lighthouse CI: `lhci autorun`
- Add Playwright E2E: `pnpm playwright test`

## Sources

### High Confidence (Context7, Official Docs)
- [Vitest Guide](https://vitest.dev/guide/) - Official documentation, confirmed Vite >=v6.0.0 requirement
- [Vitest Coverage Guide](https://vitest.dev/guide/coverage.html) - Coverage providers and configuration
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/) - Component testing best practices

### Medium Confidence (Official + WebSearch verified)
- [How to Unit Test React Components with Vitest and React Testing Library](https://oneuptime.com/blog/post/2026-01-15-unit-test-react-vitest-testing-library/view) - January 2026 guide
- [Testing in 2026: Jest, React Testing Library, and Full Stack Testing Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies) - 2026 testing strategy
- [Vitest vs Jest 30: Why 2026 is the Year of Browser-Native Testing](https://dev.to/dataformathub/vitest-vs-jest-30-why-2026-is-the-year-of-browser-native-testing-2fgb) - 2026 comparison
- [Best React Performance Monitoring Tools in 2026](https://embrace.io/blog/best-react-performance-monitoring-tools/) - Performance monitoring landscape
- [React Performance Monitoring with Web Vitals: The 2025 Developer's Guide](https://medium.com/@mernstackdevbykevin/react-performance-monitoring-with-web-vitals-the-2025-developers-guide-661559271932) - Web Vitals integration
- [How to Test React Applications for Accessibility with axe-core](https://oneuptime.com/blog/post/2026-01-15-test-react-accessibility-axe-core/view) - January 2026 a11y testing guide
- [vitest-axe GitHub](https://github.com/chaance/vitest-axe) - Official vitest-axe documentation
- [MSW Official Site](https://mswjs.io/) - Mock Service Worker documentation
- [Lighthouse CI Official Docs](https://googlechrome.github.io/lighthouse-ci/) - Performance budgets
- [web-vitals npm](https://www.npmjs.com/package/web-vitals) - Current version 5.1.0
- [Component Testing with Playwright in 2026](https://www.browserstack.com/guide/component-testing-react-playwright) - Playwright component testing

### Medium-Low Confidence (Community sources)
- [Three.js Developer Tools](https://discourse.threejs.org/t/three-js-developer-tools/8477) - Community recommendation
- [Chrome DevTools Memory Profiling](https://developer.chrome.com/docs/devtools/memory-problems) - Official Chrome docs
- [Performance Profiling Tools for Three.js](https://discourse.threejs.org/t/performance-profiling-tools-cpu-gpu/17469) - Community recommendations

---
*Stack research for: Quality Engineering Enhancement*
*Researched: 2026-01-27*
*Confidence: HIGH for testing/a11y, MEDIUM for Three.js memory profiling (relies on DevTools)*
