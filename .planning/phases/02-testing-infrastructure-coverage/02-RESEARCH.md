# Phase 2: Testing Infrastructure & Coverage - Research

**Researched:** 2026-01-27
**Domain:** React component testing with Vitest, browser-based testing, WebGL validation
**Confidence:** HIGH

## Summary

Vitest 4.0 represents the current standard for testing modern React applications, graduating browser mode to stable and providing first-class TypeScript support powered by Oxc. The recommended stack pairs Vitest with React Testing Library for component testing and @vitest/browser-playwright for WebGL/memory testing requiring real browser environments.

**Key findings:**
- Vitest 4.0 requires Vite 6.0+ and Node 20+, but has no explicit TypeScript version requirement (TypeScript 5.4+ recommended for compatibility with Vite 6)
- Browser mode with Playwright provider enables real WebGL context testing, essential for Three.js component validation
- Coverage configuration has breaking changes in v4: `coverage.all` removed, must explicitly define `coverage.include` patterns
- Memory leak testing requires Playwright's Chrome DevTools Protocol for heap snapshots, but integration patterns are still emerging

**Primary recommendation:** Use unified Vitest framework with browser mode for all tests (no separate Playwright Test runner). Configure jsdom for fast unit tests and Playwright browser provider for WebGL-dependent tests. Set global 70% coverage thresholds with v8 provider (faster than istanbul).

## Standard Stack

The established libraries/tools for React testing with Vitest in 2026:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vitest | ^4.0.x | Test framework | Vite-native, 10-20x faster than Jest, stable browser mode as of v4.0 |
| @vitest/browser-playwright | ^4.0.x | Browser test provider | Official Playwright integration for Vitest, supports parallel execution |
| @testing-library/react | ^16.x | Component testing | Industry standard for user-centric testing, works with any framework |
| @testing-library/user-event | ^14.x | User interaction simulation | Simulates real user events (vs fireEvent low-level API) |
| @testing-library/jest-dom | ^6.x | Custom matchers | Provides semantic assertions like toBeInTheDocument, toHaveAccessibleName |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| happy-dom | ^15.x | DOM environment | Alternative to jsdom, 2-10x faster for simple DOM testing |
| jsdom | ^25.x | DOM environment | More complete Web API coverage than happy-dom, use for complex DOM |
| @vitest/coverage-v8 | ^4.0.x | Coverage provider | Built-in V8 coverage (default), faster than istanbul |
| playwright | ^1.54.x | Browser automation | Peer dependency for @vitest/browser-playwright |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vitest | Jest 30 | Jest has larger ecosystem but slower, no native Vite integration |
| @vitest/browser-playwright | @vitest/browser-webdriverio | WebDriverIO alternative, but Playwright has better parallelization |
| @testing-library/react | Enzyme | Enzyme tests implementation details (deprecated pattern) |
| v8 coverage | istanbul coverage | istanbul more mature but 2-3x slower, use only if v8 incompatible |

**Installation:**
```bash
pnpm add -D vitest @vitest/browser-playwright @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom playwright
```

## Architecture Patterns

### Recommended Project Structure

**Co-located tests** (recommended for feature-based React projects):
```
src/
├── components/
│   ├── ThreeBackground/
│   │   ├── ThreeBackground.tsx
│   │   ├── ThreeBackground.test.tsx       # Unit tests (jsdom)
│   │   └── ThreeBackground.browser.test.tsx  # Browser tests (WebGL)
│   └── Portfolio/
│       ├── PortfolioModal.tsx
│       └── PortfolioModal.test.tsx
├── hooks/
│   ├── useTheme.ts
│   └── useTheme.test.ts
└── test/
    ├── setup.ts                 # Global test setup
    └── utils.tsx                # Custom render helpers
```

**Key decisions:**
- Co-locate tests next to source files (scales better than separate test folders for small-to-medium projects)
- Use `.browser.test.tsx` suffix for browser-mode tests requiring WebGL/real DOM APIs
- Centralize test utilities in `src/test/` for custom renders with providers

### Pattern 1: Vitest Configuration with Multiple Environments

**What:** Configure both jsdom (fast) and browser (real WebGL) test environments
**When to use:** Projects needing both unit tests and browser-based integration tests
**Example:**
```typescript
// vitest.config.ts
// Source: https://vitest.dev/guide/browser/
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Global test settings
    globals: true,
    setupFiles: ['./src/test/setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.config.ts', '**/*.test.{ts,tsx}', 'src/test/**'],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },

    // Default environment for unit tests
    environment: 'jsdom',

    // Browser mode for WebGL tests
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
})
```

### Pattern 2: Custom Render with Providers

**What:** Create test utilities wrapping components with React Router and theme context
**When to use:** Every test file needing routing or theme access (most component tests)
**Example:**
```typescript
// src/test/utils.tsx
// Source: https://dev.to/web-sujal/vitest-react-testing-library-for-remix-react-router-v7-with-typescript-a-complete-setup-guide-4pop
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../contexts/ThemeContext'

interface CustomRenderOptions extends RenderOptions {
  initialRoute?: string
  theme?: 'light' | 'dark'
}

export function renderWithProviders(
  ui: React.ReactElement,
  { initialRoute = '/', theme = 'light', ...options }: CustomRenderOptions = {}
) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider defaultTheme={theme}>
        {ui}
      </ThemeProvider>
    </MemoryRouter>,
    options
  )
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { renderWithProviders as render }
```

### Pattern 3: Test Setup File

**What:** Configure global test environment, mock browser APIs, suppress console noise
**When to use:** Every Vitest project (referenced in vitest.config.ts setupFiles)
**Example:**
```typescript
// src/test/setup.ts
// Source: https://github.com/bvaughn/react-error-boundary/blob/main/vitest.setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock window.matchMedia (not available in jsdom)
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

// Suppress expected console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Error: Uncaught [Error:'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})
```

### Pattern 4: Browser Mode Test with WebGL

**What:** Test Three.js components in real browser environment with WebGL context
**When to use:** Components using WebGL, Canvas API, or GPU resources requiring real browser
**Example:**
```typescript
// src/components/ThreeBackground/ThreeBackground.browser.test.tsx
// Source: https://vitest.dev/guide/browser/ + https://mayashavin.com/articles/component-testing-browser-vitest
import { test, expect } from 'vitest'
import { render, screen } from 'vitest/browser'
import { ThreeBackground } from './ThreeBackground'

test('initializes WebGL context', async () => {
  const { container } = render(<ThreeBackground />)

  const canvas = container.querySelector('canvas')
  expect(canvas).toBeTruthy()

  // Verify WebGL context exists (only possible in real browser)
  const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
  expect(gl).toBeTruthy()
  expect(gl).toBeInstanceOf(WebGLRenderingContext)
})

test('cleans up WebGL resources on unmount', async () => {
  const { unmount } = render(<ThreeBackground />)

  // Get initial context count
  const canvas = document.querySelector('canvas')
  const gl = canvas.getContext('webgl')

  unmount()

  // Verify context is lost after cleanup
  expect(gl.isContextLost()).toBe(true)
})
```

### Pattern 5: Memory Leak Detection

**What:** Test component doesn't leak memory after repeated mount/unmount cycles
**When to use:** Components managing complex resources (WebGL, large data, subscriptions)
**Example:**
```typescript
// src/components/ThreeBackground/ThreeBackground.memory.test.tsx
// Source: https://facebook.github.io/memlab/docs/guides/integrate-with-e2e-frameworks/
import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ThreeBackground } from './ThreeBackground'

test('does not leak memory after multiple mount/unmount cycles', async () => {
  const cycles = 5

  // Take initial snapshot
  const initialMemory = performance.memory?.usedJSHeapSize || 0

  // Perform mount/unmount cycles
  for (let i = 0; i < cycles; i++) {
    const { unmount } = render(<ThreeBackground />)
    await new Promise(resolve => setTimeout(resolve, 100)) // Allow rendering
    unmount()
    await new Promise(resolve => setTimeout(resolve, 100)) // Allow cleanup
  }

  // Force garbage collection if available
  if (global.gc) {
    global.gc()
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Take final snapshot
  const finalMemory = performance.memory?.usedJSHeapSize || 0
  const heapGrowth = finalMemory - initialMemory

  // Assert heap growth is under threshold (5MB for test environment)
  expect(heapGrowth).toBeLessThan(5 * 1024 * 1024)
}, 30000) // 30s timeout for memory test
```

### Anti-Patterns to Avoid

- **Testing implementation details:** Don't test state, props, or internal methods. Test observable behavior only (what users see/do)
- **Using container queries:** Avoid `container.querySelector()`. Use Testing Library queries (getByRole, getByLabelText) which enforce accessibility
- **Using fireEvent instead of userEvent:** fireEvent is low-level and doesn't simulate real interactions (e.g., fireEvent.click doesn't trigger focus)
- **Manual cleanup calls:** React Testing Library auto-cleans up. Manual `cleanup()` calls indicate misunderstanding
- **Over-mocking:** Don't mock what you can test. Only mock external dependencies (APIs, routers) not internal modules
- **Forgetting to restore mocks:** Always use `afterEach(() => vi.clearAllMocks())` to prevent test pollution

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| User interaction simulation | Custom click/type helpers | @testing-library/user-event | Handles focus, keyboard events, timing delays; fireEvent insufficient |
| Custom render wrappers | Copying provider setup per test | Custom render utility (Pattern 2) | Centralize provider wrapping; DRY principle |
| Memory leak detection | Manual heap snapshot analysis | Playwright CDP + performance.memory | Chrome DevTools Protocol provides accurate heap measurements |
| WebGL mocking | Custom WebGL stub | Real browser with @vitest/browser-playwright | Mocks miss GPU cleanup bugs; use real WebGL context |
| DOM matchers | expect(el.className).toContain() | @testing-library/jest-dom | Semantic matchers (toBeVisible, toHaveAccessibleName) improve readability |
| Async utilities | setTimeout + Promises | waitFor, findBy queries | Built-in retry logic, better error messages, configurable timeouts |

**Key insight:** Testing infrastructure has solved most common problems. Don't recreate solutions—invest time understanding existing tools deeply.

## Common Pitfalls

### Pitfall 1: Not Configuring coverage.include After Vitest 4 Upgrade

**What goes wrong:** Coverage report shows 0% or only includes explicitly tested files
**Why it happens:** Vitest 4 removed `coverage.all` option. Must explicitly define `coverage.include` patterns
**How to avoid:** Always set `coverage.include: ['src/**/*.{ts,tsx}']` in vitest.config.ts
**Warning signs:** Coverage report shows only 5-10 files when expecting 50+; "all" files missing from report
**Source:** https://vitest.dev/guide/migration.html#coverage-all-removed

### Pitfall 2: Using vi.spyOn in Browser Mode Tests

**What goes wrong:** Tests fail with "vi.spyOn is not supported in browser mode"
**Why it happens:** Browser mode sandboxing prevents module spy interception
**How to avoid:** Use vi.mock() for module mocking in browser tests, not vi.spyOn
**Warning signs:** Tests pass in jsdom but fail when browser.enabled: true
**Source:** https://vitest.dev/guide/mocking

### Pitfall 3: WebGL Context Loss Not Triggering Cleanup

**What goes wrong:** Memory tests pass but browser shows "Too many active WebGL contexts" warning in production
**Why it happens:** Tests don't verify `forceContextLoss()` called on unmount
**How to avoid:** Check `gl.isContextLost() === true` after component unmount in browser tests
**Warning signs:** Safari/Chrome console warnings about WebGL contexts; memory grows over time
**Source:** https://github.com/pmndrs/react-three-fiber/issues/2655

### Pitfall 4: Testing Error Boundaries Without Suppressing console.error

**What goes wrong:** Test output flooded with React error stack traces; tests may fail due to console noise
**Why it happens:** React logs uncaught errors even when caught by error boundary
**How to avoid:** Mock console.error before rendering component that throws: `vi.spyOn(console, 'error').mockImplementation(() => {})`
**Warning signs:** Test suite output includes red error text; CI logs are hundreds of lines
**Source:** https://github.com/bvaughn/react-error-boundary/blob/main/vitest.setup.ts

### Pitfall 5: Missing window.matchMedia Mock in jsdom Tests

**What goes wrong:** Tests crash with "window.matchMedia is not a function"
**Why it happens:** jsdom doesn't implement matchMedia API; many React components use it
**How to avoid:** Mock in setup.ts (see Pattern 3)
**Warning signs:** Tests fail immediately on render with matchMedia error
**Source:** https://dev.to/web-sujal/vitest-react-testing-library-for-remix-react-router-v7-with-typescript-a-complete-setup-guide-4pop

### Pitfall 6: Incorrect Mock Hoisting with vi.mock

**What goes wrong:** Mocks not applied or throw "Cannot access before initialization"
**Why it happens:** vi.mock() hoists to top of file but factory function must be synchronous or use dynamic import
**How to avoid:** Use `vi.mock(import('./module'))` with dynamic import, or ensure factory is synchronous
**Warning signs:** Original module used instead of mock; ReferenceError in tests
**Source:** https://github.com/vitest-dev/vitest/discussions/5809

### Pitfall 7: Not Using MemoryRouter for React Router Tests

**What goes wrong:** Tests fail with "useNavigate/useParams must be used within Router"
**Why it happens:** React Router hooks require Router context
**How to avoid:** Wrap all components using router hooks in MemoryRouter via custom render utility
**Warning signs:** Router hook errors; can't test navigation behavior
**Source:** https://patelvivek.dev/blog/testing-react-router-vitest

## Code Examples

Verified patterns from official sources:

### Testing Component with React Router Hook

```typescript
// Source: https://patelvivek.dev/blog/testing-react-router-vitest
import { test, expect } from 'vitest'
import { render, screen } from './test/utils' // Custom render with MemoryRouter
import userEvent from '@testing-library/user-event'
import { Portfolio } from './Portfolio'

test('navigates to project details on click', async () => {
  const user = userEvent.setup()
  render(<Portfolio />, { initialRoute: '/projects' })

  const projectCard = screen.getByRole('button', { name: /project alpha/i })
  await user.click(projectCard)

  expect(screen.getByRole('heading', { name: /project alpha/i })).toBeInTheDocument()
})
```

### Testing Dark Mode Theme Switching

```typescript
// Source: React Testing Library best practices
import { test, expect } from 'vitest'
import { render, screen } from './test/utils'
import userEvent from '@testing-library/user-event'
import { App } from './App'

test('persists theme preference to localStorage', async () => {
  const user = userEvent.setup()
  render(<App />)

  const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
  await user.click(themeToggle)

  expect(localStorage.getItem('theme')).toBe('dark')
  expect(document.documentElement).toHaveClass('dark')
})
```

### Testing Error Boundary

```typescript
// Source: https://github.com/bvaughn/react-error-boundary/blob/main/vitest.setup.ts
import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test error')
}

test('renders fallback UI when child throws', () => {
  // Suppress console.error for this test
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThrowError />
    </ErrorBoundary>
  )

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()

  consoleSpy.mockRestore()
})
```

### Mocking Module with vi.mock

```typescript
// Source: https://vitest.dev/guide/mocking
import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock must be at top level
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(() => ({ id: '123' })),
  }
})

test('uses mocked router hooks', () => {
  // Test implementation using mocked hooks
})
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Jest | Vitest 4.x | 2024-2025 | 10-20x faster tests; native Vite integration; ESM-first |
| Enzyme | React Testing Library | 2019 | Test user behavior, not implementation; better accessibility |
| fireEvent | @testing-library/user-event | 2020 | Simulates real user interactions with delays and focus |
| coverage.all: true | coverage.include patterns | Vitest 4.0 (Dec 2024) | Explicit configuration required; more accurate reports |
| @vitest/browser/context | vitest/browser | Vitest 4.0 (Dec 2024) | Simplified imports for browser mode tests |
| v8-to-istanbul | AST-based coverage | Vitest 4.0 (Dec 2024) | More accurate coverage, faster analysis |
| Separate Playwright runner | @vitest/browser-playwright | Vitest 3.0 → 4.0 stable | Unified test framework; consistent reporting |

**Deprecated/outdated:**
- **Enzyme:** Abandoned since 2019. Tests implementation details, incompatible with modern React patterns (hooks)
- **coverage.all option:** Removed in Vitest 4.0. Use `coverage.include` instead
- **vi.restoreAllMocks() for automocks:** Changed in Vitest 4.0; only affects manual spies now
- **poolOptions configuration:** Removed in Vitest 4.0. Use top-level options (maxWorkers, isolate)
- **provider: 'playwright' string syntax:** Deprecated in Vitest 4.0. Use `provider: playwright()` function

## Open Questions

Things that couldn't be fully resolved:

1. **Memory leak testing via Playwright CDP in Vitest browser mode**
   - What we know: Playwright supports Chrome DevTools Protocol for heap snapshots; performance.memory available in Chrome
   - What's unclear: Best practice for integrating CDP heap snapshots within Vitest test flow (not separate Playwright Test runner)
   - Recommendation: Start with performance.memory checks (Pattern 5). Evaluate if Playwright's page.cdpSession() accessible from @vitest/browser-playwright for full heap snapshots

2. **happy-dom vs jsdom performance in this specific project**
   - What we know: happy-dom 2-10x faster for most cases, but lacks some Web APIs; edge cases where happy-dom slower
   - What's unclear: Whether this project's tests would benefit from happy-dom given Three.js/WebGL mocking needs
   - Recommendation: Start with jsdom (more complete APIs). Benchmark with happy-dom if test suite exceeds 30s

3. **TypeScript 5.4+ requirement for Vitest 4.0**
   - What we know: Vite 6 likely requires TypeScript 5.4+; Vitest 4.0 requires Vite 6.0+
   - What's unclear: Vitest 4 package.json shows no explicit TypeScript peer dependency
   - Recommendation: Upgrade to TypeScript 5.6+ (latest stable) during Vite 6 upgrade to avoid compatibility issues

4. **GPU memory cleanup verification in automated tests**
   - What we know: Three.js requires manual dispose() calls; react-three-fiber has history of context leaks
   - What's unclear: How to programmatically verify GPU memory released (not just JS heap)
   - Recommendation: Combine gl.isContextLost() check with Chrome DevTools GPU memory profiling during test development. Automated tests verify context loss; manual verification for GPU memory

## Sources

### Primary (HIGH confidence)
- [Vitest Browser Mode Guide](https://vitest.dev/guide/browser/) - Browser testing configuration
- [Vitest Coverage Config](https://vitest.dev/config/coverage) - Coverage thresholds and providers
- [Vitest 4.0 Release](https://vitest.dev/blog/vitest-4) - New features and breaking changes
- [Vitest Migration Guide](https://vitest.dev/guide/migration.html) - v4.0 upgrade instructions
- [Vitest Mocking Guide](https://vitest.dev/guide/mocking) - Module mocking patterns
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/) - Official setup guide
- [Kent C. Dodds: Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) - Anti-patterns

### Secondary (MEDIUM confidence)
- [Vitest + React Testing Library for Remix & React Router v7](https://dev.to/web-sujal/vitest-react-testing-library-for-remix-react-router-v7-with-typescript-a-complete-setup-guide-4pop) - Custom render patterns
- [react-error-boundary vitest.setup.ts](https://github.com/bvaughn/react-error-boundary/blob/main/vitest.setup.ts) - Test setup example
- [Reliable Component Testing with Vitest's Browser Mode](https://mayashavin.com/articles/component-testing-browser-vitest) - Browser testing patterns
- [Mastering React Testing with Vitest 2.0 Part 2](https://patelvivek.dev/blog/testing-react-router-vitest) - React Router testing
- [MemLab: Integrate with Test Frameworks](https://facebook.github.io/memlab/docs/guides/integrate-with-e2e-frameworks/) - Memory leak testing approach

### Tertiary (LOW confidence)
- [jsdom vs happy-dom GitHub discussion](https://github.com/vitest-dev/vitest/discussions/1607) - Performance comparison (2022, may be outdated)
- [WebGL Context Leaking in react-three-fiber](https://github.com/pmndrs/react-three-fiber/issues/2655) - Known Three.js cleanup issues
- [Test file organization debate](https://www.coreycleary.me/where-to-put-your-tests-in-a-node-project-structure) - Co-located vs separate (no consensus)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Vitest 4.0 + React Testing Library well-documented and widely adopted
- Architecture: MEDIUM - Browser mode patterns emerging; memory testing integration unclear
- Pitfalls: HIGH - Well-documented in official migration guides and community posts

**Research date:** 2026-01-27
**Valid until:** 2026-03-27 (60 days - testing ecosystem stable, Vitest 4.x in active maintenance)
