---
phase: 04-performance-ci-integration
plan: 01
subsystem: performance
tags: [web-vitals, performance-budget, lighthouse-ci, throttle, monitoring]

# Dependency graph
requires:
  - phase: 03-accessibility-compliance
    provides: Complete testing infrastructure (Vitest, Playwright)
provides:
  - Core Web Vitals monitoring foundation (LCP, INP, CLS)
  - Performance budget definition for Lighthouse CI enforcement
  - Throttled scroll handler for reduced re-renders
affects: [04-02-lighthouse-ci, 04-03-bundle-optimization]

# Tech tracking
tech-stack:
  added: [web-vitals]
  patterns: [RUM monitoring via Web Vitals API, inline throttle implementation]

key-files:
  created: [src/vitals.ts, budget.json]
  modified: [src/App.tsx, src/components/Navbar.tsx]

key-decisions:
  - "Web Vitals console logging in dev mode only (no analytics integration)"
  - "100ms throttle interval for Navbar scroll handler"
  - "Generous performance budget starting points (will tighten based on CI data)"
  - "Inline throttle implementation vs external library (sufficient for single handler)"

patterns-established:
  - "reportWebVitals called once per page load via useEffect with empty deps"
  - "Throttle pattern using useRef for timer tracking and cleanup in useEffect return"

# Metrics
duration: 3min
completed: 2026-01-31
---

# Phase 4 Plan 1: Core Web Vitals & Performance Budget

**Web Vitals monitoring integrated (LCP, INP, CLS) with console logging in dev mode, Navbar scroll handler throttled to 100ms, and Lighthouse CI performance budget defined**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-01T00:57:13Z
- **Completed:** 2026-02-01T01:00:25Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Core Web Vitals (LCP, INP, CLS) tracked via web-vitals library with console logging
- Performance budget established in budget.json (150KB scripts, 500KB images, 1000KB total)
- Navbar scroll handler optimized with 100ms throttling to reduce re-renders

## Task Commits

Each task was committed atomically:

1. **Task 1: Install web-vitals and create reporter module** - `94ac2dd` (feat)
2. **Task 2: Throttle Navbar scroll handler and create performance budget** - `2df8952` (feat)

## Files Created/Modified
- `src/vitals.ts` - Web Vitals reporter module with LCP, INP, CLS tracking
- `src/App.tsx` - Integrated reportWebVitals with useEffect (once per page load)
- `src/components/Navbar.tsx` - Added throttle timer ref and 100ms throttling to scroll handler
- `budget.json` - Lighthouse CI performance budget with size and timing limits
- `package.json` / `package-lock.json` - Added web-vitals dependency

## Decisions Made

**Web Vitals console logging strategy:**
- Development mode only (`import.meta.env.DEV` check)
- No analytics integration (deferred per CONTEXT.md)
- Callback parameter supports future analytics without refactoring

**Throttle implementation:**
- 100ms interval balances responsiveness with performance
- Inline implementation using useRef (no lodash dependency for single handler)
- Timer cleanup in useEffect return prevents memory leaks

**Performance budget values:**
- Generous starting points from RESEARCH.md recommendations
- script: 150KB, image: 500KB, total: 1000KB
- Will be tightened based on actual Lighthouse CI measurements in 04-02

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - straightforward implementation of Web Vitals API and throttle pattern.

## Next Phase Readiness

Ready for 04-02 (Lighthouse CI Integration):
- Web Vitals foundation established for RUM monitoring
- Performance budget defined for CI enforcement
- Baseline performance optimizations in place (throttled scroll)
- Testing infrastructure from Phase 3 ready for CI workflows

---
*Phase: 04-performance-ci-integration*
*Completed: 2026-01-31*
