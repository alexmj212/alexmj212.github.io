# Phase 4: Performance & CI Integration - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Integrate comprehensive quality gates preventing regressions and monitoring production performance. This includes Core Web Vitals optimization, adaptive Three.js performance tuning, E2E testing with Playwright, and GitHub Actions CI workflows with automated quality checks.

</domain>

<decisions>
## Implementation Decisions

### Three.js Optimization Strategy
- Use Intersection Observer API for off-screen detection (browser-native, efficient)
- Static performance tiers: mobile vs desktop device detection
- Fewer particles on mobile, more on desktop (no dynamic FPS monitoring)
- Stop animation loop entirely when off-screen (requestAnimationFrame stops, zero CPU usage)
- No visual indication of reduced particle count (silent adaptation)

### CI Workflow Structure
- Workflow organization: Claude's discretion (optimize for speed and cost)
- PR blocking conditions:
  - Any test failure (unit, E2E, accessibility)
  - TypeScript compilation errors
  - Vite build failures
  - Lighthouse score drops below thresholds
- Lighthouse thresholds: Performance 90+, Accessibility 90+ (per roadmap success criteria)
- Auto-deploy to GitHub Pages on merge to main (no manual approval)

### Claude's Discretion
- Exact workflow organization (single vs multiple vs tiered)
- Performance monitoring implementation details
- E2E test scenario selection and depth
- Core Web Vitals tracking approach
- Error state handling in CI workflows

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for performance monitoring and CI best practices.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-performance-ci-integration*
*Context gathered: 2026-01-31*
