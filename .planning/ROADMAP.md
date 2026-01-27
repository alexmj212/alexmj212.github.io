# Roadmap: Resume & Portfolio Site - Production Quality

## Overview

This roadmap transforms the portfolio site into production-quality code demonstrating senior frontend engineering expertise. Four phases deliver stability, testing infrastructure, accessibility compliance, and automated quality gates. The journey starts with critical memory leak fixes and ends with comprehensive CI integration validating performance, accessibility, and test coverage on every PR.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Critical Fixes & Code Cleanup** - Fix production stability issues and eliminate technical debt
- [ ] **Phase 2: Testing Infrastructure & Coverage** - Establish test foundation with Vitest and comprehensive unit tests
- [ ] **Phase 3: Accessibility Compliance** - Achieve WCAG 2.1 AA standards with automated and manual validation
- [ ] **Phase 4: Performance & CI Integration** - Add production monitoring and automated quality gates

## Phase Details

### Phase 1: Critical Fixes & Code Cleanup
**Goal**: Eliminate production stability issues and technical debt blocking quality improvements
**Depends on**: Nothing (first phase)
**Requirements**: MEM-01, MEM-02, MEM-04, ERR-01, ERR-02, DEBT-01, DEBT-02, DEBT-03, BUG-01, BUG-02, BUG-03, BUG-04
**Success Criteria** (what must be TRUE):
  1. Three.js animation runs without memory leaks (heap stabilizes after 5 mount/unmount cycles)
  2. Portfolio dialog opens and closes cleanly without stale event listeners
  3. Error boundaries catch and display errors gracefully across all routes
  4. Console shows zero warnings or errors in production build
  5. Portfolio section displays correctly without layout bugs
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 2: Testing Infrastructure & Coverage
**Goal**: Establish comprehensive test foundation enabling confidence in all future changes
**Depends on**: Phase 1 (needs clean code to test)
**Requirements**: TEST-01, TEST-02, TEST-03, TEST-04, TEST-05, TEST-06, TEST-07, TEST-08, TEST-09, MEM-03
**Success Criteria** (what must be TRUE):
  1. Vitest runs all tests successfully with >70% coverage
  2. ThreeBackground component tests verify WebGL initialization and cleanup in real browser
  3. Portfolio modal tests verify open/close/keyboard navigation without memory leaks
  4. Theme switching tests confirm dark mode persistence works
  5. Coverage reports show statements, branches, functions, and lines metrics
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 3: Accessibility Compliance
**Goal**: Achieve WCAG 2.1 AA compliance demonstrating inclusive design expertise
**Depends on**: Phase 2 (needs test infrastructure for automated accessibility testing)
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, A11Y-07, A11Y-08, A11Y-09, A11Y-10, A11Y-11, A11Y-12, A11Y-13
**Success Criteria** (what must be TRUE):
  1. Keyboard navigation works for all interactive elements (Tab, Enter, Escape)
  2. Screen readers announce content correctly (tested with NVDA and VoiceOver)
  3. Focus management traps focus in portfolio modal and returns to trigger on close
  4. Color contrast meets WCAG AA standards (4.5:1 for normal text)
  5. Automated accessibility tests (vitest-axe and @axe-core/playwright) pass with zero violations
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 4: Performance & CI Integration
**Goal**: Integrate comprehensive quality gates preventing regressions and monitoring production performance
**Depends on**: Phase 3 (integrates all previous quality layers)
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, CI-01, CI-02, CI-03, CI-04, CI-05, CI-06, CI-07, CI-08, CI-09, CI-10, CI-11, E2E-01, E2E-02, E2E-03, E2E-04, E2E-05
**Success Criteria** (what must be TRUE):
  1. Core Web Vitals meet thresholds (LCP <2.5s, INP <200ms, CLS <0.1)
  2. Three.js animation pauses when off-screen and adapts particle count to device performance
  3. Playwright E2E tests verify 5 critical user flows (portfolio, resume, mobile, theme, keyboard nav)
  4. GitHub Actions workflows run all quality gates on every PR (unit tests, E2E, accessibility, Lighthouse)
  5. Lighthouse CI enforces performance (90+) and accessibility (90+) score thresholds
**Plans**: TBD

Plans:
- [ ] TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Critical Fixes & Code Cleanup | 0/TBD | Not started | - |
| 2. Testing Infrastructure & Coverage | 0/TBD | Not started | - |
| 3. Accessibility Compliance | 0/TBD | Not started | - |
| 4. Performance & CI Integration | 0/TBD | Not started | - |

---
*Roadmap created: 2026-01-27*
*Last updated: 2026-01-27*
