# Phase 1: Critical Fixes & Code Cleanup - Context

**Gathered:** 2026-01-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Eliminate production stability issues (memory leaks, error handling, console warnings, layout bugs) and address technical debt listed in DEBT-01, DEBT-02, DEBT-03. This phase establishes a stable baseline for future testing and accessibility work. No new features, no speculative refactoring — fix what's broken, clean what's dirty.

</domain>

<decisions>
## Implementation Decisions

### Memory leak fixing approach
- **Comprehensive audit**: Check all components with useEffect, event listeners, timers, or subscriptions for proper cleanup — not just the known Three.js animation and portfolio dialog issues
- **Dev-only profiling helpers**: Add development utilities to detect memory leaks (e.g., mount counters, listener tracking)
- **Verification approach**: Claude's discretion — choose manual (DevTools) vs automated (mount/unmount tests) based on practicality
- **Memory stability threshold**: Claude's discretion — set acceptable threshold based on browser memory behavior (success criteria mentions 5 cycles, Claude determines exact heap growth limits)

### Code debt prioritization
- **Unused code**: Delete aggressively — remove all unused imports, functions, components, and files immediately
- **Deprecated dependencies**: Update if low risk — replace deprecated APIs and dependencies with stable alternatives (no major version jumps in this phase)
- **Refactoring during fixes**: Refactor if improving clarity — improve code structure when touching files if it makes the fix clearer or prevents future issues
- **Prioritization**: Fix everything listed — address all DEBT-01, DEBT-02, DEBT-03 requirements completely in this phase

### Claude's Discretion
- Exact memory leak verification method (manual vs automated)
- Memory stability threshold implementation (heap growth limits)
- Judgment calls on when refactoring adds value vs unnecessary complexity
- Decisions on which deprecated patterns to update first based on risk assessment

</decisions>

<specifics>
## Specific Ideas

- Success criteria is explicit: "heap stabilizes after 5 mount/unmount cycles" for memory leaks
- Phase boundary is strict: no new features, no over-engineering
- This is foundational work — next phases (testing, accessibility) depend on this stability

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-critical-fixes-code-cleanup*
*Context gathered: 2026-01-27*
