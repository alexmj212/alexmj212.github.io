# Testing Patterns

**Analysis Date:** 2026-01-27

## Test Framework

**Status:** No testing framework configured or active

**Test Runner:**
- None detected - no Jest, Vitest, Mocha, or other test runner in dependencies
- `@playwright/test` is present in `package.json` (v1.54.2) but not configured for application testing
- Playwright appears to be for E2E testing (see `.playwright-mcp` directory) rather than unit testing

**Setup File:**
- File exists: `src/setupTests.ts`
- Contents: imports `@testing-library/jest-dom` but no configuration
- Jest not in dependencies, suggests incomplete or abandoned test setup

**No Test Configuration:**
- `jest.config.js` not found
- `vitest.config.ts` not found
- `playwright.config.ts` not found
- No test-related configuration in `vite.config.ts`

**Run Commands:**
```bash
npm run dev        # Development server
npm run build      # Build for production
npm run preview    # Preview production build
```

No test commands defined in `package.json`.

## Test File Organization

**Current Status:** No test files in source code

**Observations:**
- Glob search found NO `.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx` files in `src/`
- Test files only exist in `node_modules/` (dependency test files)
- No test directory structure (`__tests__/`, `tests/`, etc.)
- Component structure does not indicate test co-location pattern

**Suggested Pattern (if implemented):**
- Test files would likely be co-located with components
- Pattern: `ComponentName.test.tsx` next to `ComponentName.tsx`
- Data tests: `src/data/__tests__/experienceData.test.ts`

## Testing Infrastructure

**Unit Testing:** Not implemented

**Assertion Library:**
- `@testing-library/jest-dom` imported in `setupTests.ts` but not in use
- No assertion library (Jest, Chai, Vitest) in dependencies

**React Testing:**
- React Testing Library NOT in dependencies
- No hooks for component testing observed

**E2E Testing:**
- Playwright installed (`@playwright/test` v1.54.2)
- `.playwright-mcp` directory exists (Playwright MCP integration)
- Not configured for application testing

## Test Types (Missing)

**Unit Tests:** Not implemented

**Integration Tests:** Not implemented

**E2E Tests:** Playwright available but not configured

**Manual Testing:**
- Development mode: `npm run dev` (local development)
- Build preview: `npm run preview` (production preview)

## Coverage

**Status:** No coverage tracking configured

**Requirements:** None enforced

## Recommended Testing Approach (if implementing)

If testing were to be implemented, the architecture suggests:

**Unit Testing Framework Recommendation:**
- Vitest (modern, Vite-integrated, fast)
- Configuration: Create `vitest.config.ts`
- Pattern: React + TypeScript components

**Test Pattern (hypothetical):**
```typescript
// src/components/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import { faClock } from '@fortawesome/free-solid-svg-icons';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Button icon={faClock} />);
    const svgIcon = screen.getByRole('img', { hidden: true });
    expect(svgIcon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class" />);
    expect(container.querySelector('button')).toHaveClass('custom-class');
  });

  it('passes through HTMLButtonElement props', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Component Testing Considerations

**Components with Complex Logic:**
- `ThreeBackground.tsx`: Heavy Three.js initialization, canvas refs, animation frames
  - Would need: Canvas mock, Three.js mock, RAF mock
  - Test focus: error handling, color parsing utilities, initialization flow

- `Navbar.tsx`: Extensive hooks, keyboard handlers, focus management
  - Would need: Event simulation, ref testing utilities
  - Test focus: menu toggle, keyboard navigation, dark mode switching, scroll behavior

- `Portfolio.tsx`: Dialog state management, image loading
  - Would need: Dialog API mocking, image load event simulation
  - Test focus: dialog open/close, filter logic, image error handling

**Simple Components (easy to test):**
- `Button.tsx`: Simple prop rendering
- `Badge.tsx`: Simple prop rendering
- `Header.tsx`: Wrapper component
- `List.tsx`, `ListItem.tsx`: Simple list rendering

**Data Modules (testing candidates):**
- `portfolioData.ts`: Interface compliance, data structure validation
- `skillsData.ts`: Data shape validation
- `experienceData.ts`: Type checking

## Error Handling in Tests (if implemented)

**Pattern from ErrorBoundary:**
```typescript
describe('ErrorBoundary', () => {
  it('catches rendering errors', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/unable to load/i)).toBeInTheDocument();
  });

  it('shows fallback UI when error occurs', () => {
    const customFallback = <div>Custom Error</div>;
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn();
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
  });
});
```

## Testing Utilities (if implemented)

**Expected Imports:**
```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

**Mocking Strategy:**
- Three.js: Mock canvas, WebGL context, animation frame
- FontAwesome: Mock icon components
- Window APIs: Mock `matchMedia`, `localStorage`, `scrollY`
- Event listeners: Verify addEventListener/removeEventListener cleanup

## Accessibility Testing (if implemented)

Given the codebase's accessibility focus (ARIA attributes, semantic HTML, focus management):

```typescript
// Accessible component testing
import { axe } from 'jest-axe';

describe('Navbar - Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('announces menu state to screen readers', () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/open main menu/i);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('manages focus correctly on menu open', () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/open main menu/i);
    fireEvent.click(menuButton);
    // First menu item should receive focus
    expect(screen.getByRole('menuitem', { name: /about/i })).toHaveFocus();
  });
});
```

## Current Testing Status Summary

| Aspect | Status |
|--------|--------|
| Unit Testing | Not implemented |
| Integration Testing | Not implemented |
| E2E Testing | Playwright available, not configured |
| Test Framework | None configured |
| Test Files | None in source code |
| Coverage Reporting | Not configured |
| CI/CD Integration | Not detected |
| Testing Library | Not installed |
| Code Testability | Good - components are small, focused, well-typed |

## Recommendations for Implementation

**Priority 1 (Foundation):**
1. Install testing dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event`
2. Create `vitest.config.ts` in project root
3. Add test scripts to `package.json`:
   ```json
   "test": "vitest",
   "test:ui": "vitest --ui",
   "test:coverage": "vitest --coverage"
   ```
4. Create `src/setup-tests.ts` with proper configuration
5. Start with simple component tests (Button, Badge, List)

**Priority 2 (Component Coverage):**
1. Test accessible interactive components (Navbar, Portfolio)
2. Test data modules and type safety
3. Test error boundaries
4. Test custom hooks (useDarkMode)

**Priority 3 (Quality):**
1. Set up code coverage tracking (target: 80%+)
2. Add accessibility testing with jest-axe
3. Configure E2E tests with Playwright
4. Integrate testing into CI/CD pipeline

---

*Testing analysis: 2026-01-27*
