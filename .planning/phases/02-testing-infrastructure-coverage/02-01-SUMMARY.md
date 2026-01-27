---
phase: 02-testing-infrastructure-coverage
plan: 01
subsystem: testing-infrastructure
tags: [vitest, typescript, vite, testing-library, jsdom, coverage]

dependency_graph:
  requires:
    - phase: 01
      reason: "Memory leaks fixed, clean baseline for testing"
  provides:
    - "Vitest 4.x testing infrastructure with jsdom environment"
    - "Custom test utilities with React Router context"
    - "Coverage reporting configured at 70% global thresholds"
  affects:
    - phase: 02
      plans: ["02-02", "02-03", "02-04"]
      reason: "All subsequent testing plans depend on this infrastructure"

tech_stack:
  added:
    - vitest: "^4.0.5"
    - "@vitest/coverage-v8": "^4.0.5"
    - "@vitest/browser-playwright": "^4.0.5"
    - "@testing-library/react": "^16.1.0"
    - "@testing-library/user-event": "^14.6.1"
    - "@testing-library/jest-dom": "^6.6.3"
    - jsdom: "^25.0.1"
  upgraded:
    - typescript: "^4.7.4 -> ^5.6.3"
    - vite: "^5.4.19 -> ^6.0.11"
    - "@vitejs/plugin-react": "^5.0.0 -> ^4.3.4"
  patterns:
    - "Vitest globals enabled (describe/it/expect without imports)"
    - "Custom render wrapper with MemoryRouter for routing tests"
    - "Global test setup with matchMedia and localStorage mocks"

key_files:
  created:
    - vitest.config.ts: "Vitest configuration with jsdom, coverage, setupFiles"
    - src/test/setup.ts: "Global mocks (matchMedia, localStorage) and cleanup"
    - src/test/utils.tsx: "Custom render with React Router context"
    - src/test/smoke.test.ts: "Infrastructure verification tests"
    - src/vite-env.d.ts: "TypeScript type definitions for Vite environment variables"
  modified:
    - package.json: "Upgraded dependencies, added test scripts"
    - tsconfig.json: "Updated for TypeScript 5.6 with bundler moduleResolution"

decisions:
  - id: VITEST-CONFIG-01
    title: "Use Vitest 4.x with TypeScript 5.6 and Vite 6"
    rationale: "Required for modern testing infrastructure. TypeScript 5.6 provides better type safety with bundler mode."
    alternatives: ["Vitest 3.x with older dependencies"]
    tradeoffs: "Required major version upgrades, but provides better DX and compatibility."

  - id: VITEST-CONFIG-02
    title: "Enable Vitest globals for cleaner test syntax"
    rationale: "Avoids repetitive imports of describe/it/expect in every test file."
    alternatives: ["Explicit imports in each test"]
    tradeoffs: "Slight reduction in explicitness, but massive improvement in DX."

  - id: TEST-UTILS-01
    title: "Custom render with MemoryRouter for all component tests"
    rationale: "Many components use react-router-dom hooks/components. Wrapping in MemoryRouter prevents 'useLocation must be used within Router' errors."
    alternatives: ["Mock router hooks individually", "Conditional router wrapper"]
    tradeoffs: "All components wrapped in router even if not needed, but provides consistency."

  - id: TEST-SETUP-01
    title: "Mock matchMedia and localStorage globally in setup.ts"
    rationale: "Theme system uses both extensively. jsdom doesn't provide matchMedia. Mocking globally prevents per-test setup boilerplate."
    alternatives: ["Mock in each test that needs theme", "Use happy-dom instead"]
    tradeoffs: "All tests have mocks even if not needed, but prevents missing mock errors."

  - id: TYPE-ENV-01
    title: "Created vite-env.d.ts for process.env type definitions"
    rationale: "TypeScript 5.6 with bundler moduleResolution is stricter. process.env used in ThreeBackground for development logging."
    alternatives: ["Use import.meta.env instead", "Disable strictness"]
    tradeoffs: "Additional type file, but provides proper type safety without relaxing compiler."

metrics:
  duration: "3min"
  completed: "2026-01-27"
  tasks_completed: 3
  commits: 3
  files_changed: 8
---

# Phase 2 Plan 01: Testing Infrastructure Setup Summary

**One-liner:** Established Vitest 4.x testing infrastructure with TypeScript 5.6, Vite 6, jsdom environment, custom React Router test utilities, and 70% coverage thresholds.

## What Was Built

Successfully upgraded the entire testing stack and established the foundation for Phase 2:

1. **Major dependency upgrades:**
   - TypeScript 4.7.4 → 5.6.3 (improved type safety with bundler mode)
   - Vite 5.4.19 → 6.0.11 (required for Vitest 4)
   - Added Vitest 4.0.5 with full testing ecosystem

2. **Test infrastructure:**
   - Vitest configured with jsdom environment for DOM testing
   - V8 coverage provider with 70% global thresholds (statements, branches, functions, lines)
   - Global test setup with matchMedia and localStorage mocks
   - Custom render utilities wrapping React Router MemoryRouter

3. **Developer experience:**
   - Vitest globals enabled (no import boilerplate)
   - Test scripts: `pnpm test`, `pnpm test:coverage`, `pnpm test:browser`
   - Smoke tests verify infrastructure works correctly

## Key Outcomes

✅ **All success criteria met:**
- Vitest 4.x installed and configured
- TypeScript 5.6+ compiles successfully
- Coverage reporting configured with 70% thresholds
- Test utilities ready for component tests
- matchMedia and localStorage mocks working
- Smoke tests pass (3/3)

✅ **Build verification:**
- `pnpm build` succeeds without TypeScript errors
- `pnpm test --run` executes smoke tests successfully
- `pnpm test:coverage --run` generates coverage reports

## Technical Implementation

### TypeScript 5.6 Compatibility Fix

TypeScript 5.6 with `moduleResolution: "bundler"` is stricter about Node.js globals. Created `src/vite-env.d.ts` to provide type definitions for `process.env.NODE_ENV` used in ThreeBackground cleanup logging.

### Test Utilities Architecture

**src/test/setup.ts** - Global setup executed before all tests:
- Mocks `window.matchMedia` (used by dark mode system)
- Mocks `localStorage` (used by theme persistence)
- Configures automatic cleanup after each test
- Clears all mocks after each test

**src/test/utils.tsx** - Custom render function:
- Wraps components in `MemoryRouter` for react-router-dom compatibility
- Supports `initialRoute` option for testing specific routes
- Re-exports all React Testing Library utilities
- Provides both default `render` and explicit `renderWithProviders`

### Coverage Configuration

70% global thresholds for:
- Statements
- Branches
- Functions
- Lines

Excludes:
- Config files (`**/*.config.ts`)
- Test files (`**/*.test.{ts,tsx}`)
- Test infrastructure (`src/test/**`)
- Type definitions (`src/vite-env.d.ts`, `src/react-app-env.d.ts`)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript 5.6 process.env type errors**
- **Found during:** Task 1 (TypeScript upgrade)
- **Issue:** TypeScript 5.6 with bundler moduleResolution doesn't automatically include Node.js types. ThreeBackground uses `process.env.NODE_ENV` for development logging, causing 4 compilation errors.
- **Fix:** Created `src/vite-env.d.ts` with explicit type definitions for `process.env.NODE_ENV` and Vite's `import.meta.env`
- **Files modified:** `src/vite-env.d.ts` (created)
- **Commit:** 1b6c238
- **Rationale:** TypeScript 5.6's bundler mode is stricter and doesn't auto-include Node types when `types` array is specified. Vite injects `process.env` at build time, so types are needed for development.

## Next Phase Readiness

**Blockers:** None

**Ready for:**
- 02-02: Component Tests (Dark Mode)
- 02-03: Component Tests (Navigation & Routing)
- 02-04: Component Tests (Resume Sections)

All subsequent testing plans can now proceed. Infrastructure is stable and verified.

## Testing Coverage

**Current coverage:** 0% (no component tests yet - expected)

**Infrastructure verification:**
- ✅ Vitest runs successfully
- ✅ matchMedia mock working
- ✅ localStorage mock working
- ✅ Build compiles without errors
- ✅ Coverage reporting operational

**Next:** Plan 02-02 will add first component tests (dark mode system), increasing coverage.

## Files Changed

**Created (5):**
- `vitest.config.ts` - Vitest configuration
- `src/test/setup.ts` - Global test setup
- `src/test/utils.tsx` - Custom test utilities
- `src/test/smoke.test.ts` - Infrastructure verification
- `src/vite-env.d.ts` - Vite environment type definitions

**Modified (3):**
- `package.json` - Dependency upgrades, test scripts
- `tsconfig.json` - TypeScript 5.6 configuration
- `pnpm-lock.yaml` - Lockfile update (365 packages added)

## Commits

1. **1b6c238** - chore(02-01): upgrade TypeScript 5.6 and Vite 6 for Vitest 4 compatibility
2. **04034bd** - chore(02-01): configure Vitest with jsdom and coverage
3. **ca896b5** - test(02-01): create test setup and utility files

---

**Duration:** 3 minutes
**Status:** ✅ Complete
**Next Plan:** 02-02 (Component Tests - Dark Mode System)
