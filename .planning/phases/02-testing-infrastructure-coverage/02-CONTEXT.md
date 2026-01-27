# Phase 2: Testing Infrastructure & Coverage - Context

**Gathered:** 2026-01-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish comprehensive test foundation with Vitest, unit tests, and browser-based testing for WebGL components. This phase creates the testing infrastructure enabling confidence in all future changes. Sets up Vitest, achieves 70% coverage, and verifies memory leak fixes from Phase 1 through automated tests.

**In scope:** Test framework setup, unit tests for components, Playwright browser tests for WebGL/memory, coverage reporting
**Out of scope:** E2E user flows (Phase 4), accessibility testing (Phase 3), CI integration (Phase 4)

</domain>

<decisions>
## Implementation Decisions

### WebGL & Memory Testing Approach
- **Real browser testing with Playwright** via Vitest's `@vitest/browser` package (not separate Playwright Test runner)
- All tests run in unified Vitest framework for consistent reporting and configuration
- ThreeBackground component gets browser-based tests to verify actual WebGL context and GPU memory cleanup
- **Memory leak threshold: <5MB heap growth** (more lenient than Phase 1's <1MB to account for test environment variance)
- **5 mount/unmount cycles** per memory test (matches Phase 1 manual verification success criteria)
- Tests verify real GPU resource disposal, not just mocked disposal calls

### Coverage Thresholds & Enforcement
- **Global 70% coverage target** (not per-file enforcement)
- Allows some files below threshold as long as overall codebase meets 70%
- **Fail test run if coverage drops below threshold** (enforced locally, not just in CI)
- Track **all four metrics**: statements, branches, functions, lines (all must meet 70%)
- **Exclude only config files** from coverage: `vite.config.ts`, `vitest.config.ts`
- All source code (components, hooks, utils) counts toward coverage
- Test files themselves (`.test.tsx`) are included in coverage tracking

### Claude's Discretion
- Test organization structure (co-located vs separate folders)
- Naming conventions for test files
- Mock strategy for React Router, theme context, and other dependencies
- Whether to add Playwright browser tests for other components beyond ThreeBackground
- Fixture/test data management approach
- Specific assertion libraries or testing utilities to include

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard Vitest and Playwright best practices.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-testing-infrastructure-coverage*
*Context gathered: 2026-01-27*
