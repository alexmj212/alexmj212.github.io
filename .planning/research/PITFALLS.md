# Pitfalls Research: React + Three.js Memory Leaks, Testing, and Accessibility

**Domain:** Frontend quality engineering for React + Three.js portfolio site
**Researched:** 2026-01-27
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Incomplete Three.js Resource Disposal

**What goes wrong:**
Three.js creates GPU resources (geometries, materials, textures) that JavaScript's garbage collector cannot automatically free. Missing even one `.dispose()` call causes permanent GPU memory leaks that accumulate on every render cycle, eventually crashing the browser tab or degrading performance.

**Why it happens:**
Developers assume React's cleanup in `useEffect` is sufficient, but Three.js manages GPU resources outside React's lifecycle. The GPU retains buffers, shader programs, and textures even after JavaScript objects are garbage collected.

**How to avoid:**
- Dispose ALL Three.js resources in useEffect cleanup function
- Required disposals: geometries, materials, textures, render targets, scenes, and renderer
- For materials, check if material is an array (multi-material meshes) and dispose each
- Dispose all texture maps: lightMap, bumpMap, normalMap, specularMap, envMap, etc.
- Close ImageBitmap objects explicitly when loading GLTF models (ImageBitmap.close())
- Monitor `renderer.info.memory` — if counts keep growing between mounts, you have leaks

**Warning signs:**
- Browser DevTools Memory profiler shows increasing detached DOM nodes
- `renderer.info.memory.geometries` or `.textures` counts increase on component remount
- FPS degrades over time during repeated navigation to/from the Three.js canvas
- Browser tab memory usage grows continuously without plateau

**Phase to address:**
Phase 1: Memory Leak Fixes — Add comprehensive disposal in ThreeBackground component cleanup

**Sources:**
- [Three.js Memory Management Best Practices](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [Dispose things correctly in three.js forum](https://discourse.threejs.org/t/dispose-things-correctly-in-three-js/6534)
- [Roger Chi: Tips on preventing memory leak in Three.js](https://roger-chi.vercel.app/blog/tips-on-preventing-memory-leak-in-threejs-scene)

---

### Pitfall 2: Event Listener Stale References in Dialog Handlers

**What goes wrong:**
Dialog components register event listeners (Escape key, backdrop clicks) without tracking which `dialogRef.current` they're attached to. If `dialogRef.current` changes between opens/closes, old listeners persist and accumulate, causing multiple handlers to fire or references to stale component state.

**Why it happens:**
React refs can change identity, and `addEventListener` doesn't automatically clean up when the ref target changes. The cleanup function removes listeners from the CURRENT ref, but listeners attached to the PREVIOUS ref remain in memory.

**How to avoid:**
- Store listener functions in refs to ensure cleanup removes the SAME function reference
- Use `useCallback` with stable dependencies for event handler functions
- Verify cleanup runs BEFORE new listeners attach with `console.assert`
- Call `document.body.classList.remove('overflow-hidden')` in ALL close paths (onClose, Escape, backdrop)
- Test repeated open/close cycles — memory should stabilize, not grow

**Warning signs:**
- Escape key triggers multiple close handlers
- Modal closes twice (first time works, second time logs error)
- DevTools Event Listeners inspector shows duplicate handlers on document/dialog
- Body class `overflow-hidden` persists after modal closes

**Phase to address:**
Phase 1: Memory Leak Fixes — Refactor Portfolio dialog event handlers to use stable refs

**Sources:**
- [Preventing Memory Leaks in React with useEffect](https://www.c-sharpcorner.com/article/preventing-memory-leaks-in-react-with-useeffect-hooks/)
- [How to Avoid Memory Leaks in JavaScript Event Listeners](https://dev.to/alex_aslam/how-to-avoid-memory-leaks-in-javascript-event-listeners-4hna)
- [How to Cleanup Event Listeners in React](https://www.pluralsight.com/guides/how-to-cleanup-event-listeners-react)

---

### Pitfall 3: Testing Three.js Canvas Without Proper Mocks

**What goes wrong:**
Three.js relies on WebGL APIs unavailable in Node/JSDOM test environments. Tests fail with `WebGL not supported` or `canvas.getContext is not a function`, leading developers to skip testing or write brittle mocks that don't catch real bugs.

**Why it happens:**
Vitest/Jest run in JSDOM by default, which has no WebGL implementation. Developers either skip canvas tests entirely or create shallow mocks that bypass actual Three.js initialization, missing memory leaks, resize bugs, and animation frame issues.

**How to avoid:**
- Use `@react-three/test-renderer` for unit testing Three.js components in Node.js
- For integration tests, use Vitest Browser Mode with real Chrome/Firefox (provides real WebGL)
- Mock only external dependencies (window.matchMedia, CSS variables), not Three.js itself
- Playwright E2E tests for visual regression and actual GPU rendering
- Test cleanup explicitly: mount/unmount 5x and verify memory stabilizes

**Warning signs:**
- Tests pass but production has canvas crashes
- Coverage reports show ThreeBackground as "tested" but only mocks were exercised
- E2E tests fail with "canvas not rendering" while component tests pass
- Memory leak tests require setTimeout hacks to "wait for cleanup"

**Phase to address:**
Phase 2: Test Infrastructure — Set up Vitest Browser Mode for canvas testing

**Sources:**
- [React Three Fiber Testing Documentation](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Testing in 2026: Vitest and Full Stack Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)
- [Guide to React Testing Library using Vitest](https://makersden.io/blog/guide-to-react-testing-library-vitest)

---

### Pitfall 4: Canvas Accessibility as an Afterthought

**What goes wrong:**
Developers add `<canvas aria-label="...">` thinking accessibility is solved, but screen readers still see a black box. Users with disabilities cannot understand what the canvas displays, navigate interactive elements, or perceive animations — failing WCAG 2.1 AA compliance.

**Why it happens:**
Canvas renders pixels, not DOM elements, so the accessibility tree has no semantic structure. ARIA labels only provide a static description; they don't convey animation changes, user interactions, or dynamic content.

**How to avoid:**
- WCAG 1.1.1 (Non-text Content): Provide text alternative describing canvas purpose
- WCAG 1.4.11 (Non-text Contrast): Ensure 3:1 contrast ratio for visual elements
- Create "shadow DOM" of accessible equivalent HTML alongside canvas (visually hidden)
- Use `@react-three/a11y` if migrating to react-three-fiber
- Add `role="img"` and descriptive `aria-label` for decorative canvas
- For interactive canvas, provide keyboard alternatives for all mouse interactions
- Test with NVDA/JAWS screen readers, not just automated axe-core

**Warning signs:**
- Automated accessibility scans (axe-core) pass but manual screen reader testing fails
- Canvas description doesn't update when animations start/stop
- Keyboard navigation skips over canvas entirely
- Color contrast violations in particle colors against background

**Phase to address:**
Phase 3: Accessibility Improvements — Add semantic HTML shadow DOM for canvas

**Sources:**
- [Bridging WebGL and Accessibility](https://javascript.plainenglish.io/bridging-webgl-and-accessibility-55e6d7802403)
- [Three.js & Accessibility by Pip Lev](https://medium.com/@piplev/three-js-accessibility-c4f45d83f2c6)
- [Accessible WebGL by Anneka Goss](https://annekagoss.medium.com/accessible-webgl-43d15f9caa21)
- [WCAG 2.2 Non-text Content Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

---

### Pitfall 5: Adding Tests That Break Production Functionality

**What goes wrong:**
Introducing test infrastructure to an existing codebase triggers subtle bugs: environment-specific code breaks (import.meta.env checks fail in tests), CSS modules don't load, or test mocks interfere with real browser behavior. Production deploys fail or introduce regressions.

**Why it happens:**
Tests run in a different environment (JSDOM vs browser), with different module resolution (ESM vs CommonJS), and different global objects. Code written for browser assumes `window` exists; tests assume `process.env` exists. The mismatch causes brittle tests or production bugs.

**How to avoid:**
- Start with static analysis (ESLint) before tests — lowest cost, immediate value
- Test new code first, not existing code — prove infrastructure works safely
- Use feature flags to conditionally enable tests (`import.meta.env.VITEST`)
- Configure Vitest globals: `globals: true`, `environment: 'jsdom'`
- Mock browser APIs at test setup level, not per-test
- Run tests in CI BEFORE merge, not after deploy
- For production site, test in isolated branch first, verify no behavior changes

**Warning signs:**
- Tests pass locally but fail in CI (or vice versa)
- Production build includes test utilities or mocks
- `npm run build` fails after adding test config
- Tests modify global state and don't restore it (Date.now, localStorage, window.matchMedia)

**Phase to address:**
Phase 2: Test Infrastructure — Vitest setup with isolated test config, no production impact

**Sources:**
- [How to Add Testing to an Existing Project](https://kentcdodds.com/blog/how-to-add-testing-to-an-existing-project)
- [How to Get Started Testing a React Codebase](https://blacksheepcode.com/posts/how_to_get_started_testing)
- [Best Practices for React UI Testing in 2026](https://trio.dev/best-practices-for-react-ui-testing/)

---

### Pitfall 6: Modal Accessibility Without Keyboard Trap Testing

**What goes wrong:**
Modal dialogs claim to be accessible (have ARIA attributes) but fail real-world usage: Tab escapes the modal, focus doesn't return after close, Escape doesn't work, or screen readers don't announce modal state. Users with disabilities cannot interact with portfolio items.

**Why it happens:**
Developers add `aria-modal="true"` and assume it works, but browsers don't enforce focus trapping automatically. Focus management requires JavaScript, and edge cases (Shift+Tab on first element, Tab on last element) are often untested.

**How to avoid:**
- Implement focus trap: Tab on last element cycles to first, Shift+Tab on first cycles to last
- Set `aria-modal="true"` and `role="dialog"` on modal container
- Move focus to first focusable element on open (usually close button or heading)
- Restore focus to trigger element on close (save `document.activeElement` before open)
- Support Escape key to close in ALL modal states
- Test with keyboard only (no mouse): can you open, navigate, and close?
- Test with screen reader: does it announce modal opened? Does focus stay trapped?
- Use react-modal or react-aria-modal libraries for battle-tested implementations

**Warning signs:**
- Tab key moves focus to elements behind modal (body content)
- Closing modal leaves focus on body, not original trigger button
- Screen reader doesn't announce "dialog opened" or reads background content
- Escape key works sometimes but not after certain interactions

**Phase to address:**
Phase 3: Accessibility Improvements — Refactor Portfolio dialog for full WCAG 2.1 AA compliance

**Sources:**
- [Building an Accessible Modal Dialog in React](https://clhenrick.io/blog/react-a11y-modal-dialog/)
- [How to Create an Accessible React Modal](https://tinloof.com/blog/how-to-create-an-accessible-react-modal)
- [react-modal Accessibility Documentation](https://reactcommunity.org/react-modal/accessibility/)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skipping Three.js disposal on "simple" scenes | Faster development | Memory leaks compound over user session; every page visit increases leak | Never — even small scenes leak GPU memory |
| Using `setTimeout` instead of animation frame cleanup | Tests pass faster | Flaky tests; doesn't match production timing; hides real cleanup bugs | Never — use proper cleanup, mock timers if needed |
| Mocking entire Three.js library in tests | Tests run in Node.js | Zero confidence in actual rendering; misses GPU issues; false positives | Only for pure logic tests (not integration) |
| Adding `aria-label` without shadow DOM | Quick WCAG 1.1.1 compliance | Screen readers get static description only; dynamic content inaccessible | Acceptable for purely decorative canvas (like background particles) |
| Testing only in JSDOM without Browser Mode | Faster CI builds | Misses WebGL issues, canvas sizing bugs, real event handling | Early MVP tests only; must add Browser Mode before production |
| Skipping focus trap for "simple" modals | Less code to maintain | Keyboard users cannot navigate; WCAG 2.1.2 failure; lawsuits | Never for interactive modals; only for alert() replacements |

---

## Integration Gotchas

Common mistakes when connecting React lifecycle to Three.js rendering.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| useEffect cleanup | Disposing renderer but not geometries/materials | Traverse entire scene, dispose all children, then dispose renderer |
| Animation frames | Not canceling requestAnimationFrame in cleanup | Store animationId in ref, call cancelAnimationFrame(animationId) in cleanup |
| Window resize listeners | Adding resize listener without removing in cleanup | Use useEffect with `window.addEventListener('resize', handler)` and `return () => window.removeEventListener('resize', handler)` |
| Color theme changes | Not disposing old materials when theme switches | Create new materials on theme change, dispose old materials before replacement |
| React 18 StrictMode | useEffect runs twice in dev, creating duplicate canvases | Check if canvas already initialized: `if (rendererRef.current) return;` |
| CSS variable reads | Reading CSS vars on mount only, not on theme change | Re-read CSS vars in useEffect with theme dependency, or use MutationObserver |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Full viewport canvas on mobile | Mobile devices drop frames, battery drain | Reduce pixel ratio on low-end devices: `Math.min(devicePixelRatio, 2)`, reduce particle count 50% on mobile | >1080p resolution or older mobile GPUs |
| Animation running when canvas off-screen | Wasted CPU/GPU cycles | Use Intersection Observer to pause animation when canvas not visible | After user scrolls past hero section |
| No throttling on scroll handlers | Navbar visibility handler fires 1000s of times per scroll | Throttle to 60fps max, or use Intersection Observer instead | Any page with scroll events |
| Recalculating particle positions every frame | Unnecessary computation for static elements | Use incremental updates, cache calculations, viewport culling | >100 particles or complex geometries |
| Loading uncompressed textures | 4K PNG uses 64MB+ VRAM | Use KTX2 with Basis Universal for 10x compression (6MB), or WebP for better compression than JPEG/PNG | Any texture >512x512 |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Parsing CSS color variables without validation | XSS via injected color values (e.g., `--color: "javascript:alert(1)"`) | Validate hex pattern `/^#[A-Fa-f0-9]{6}$/` before parseInt, use fallback color on validation failure |
| Loading external 3D models without sanitization | Malicious GLTF could include scripts or exploit parser bugs | Only load local/trusted models, validate file signatures, use Content Security Policy headers |
| Storing theme preference without validation | localStorage poisoning could inject invalid theme values | Validate against enum (DARK/LIGHT) before applying, sanitize on read |
| Exposing debug logs in production | Performance data reveals system architecture, timing attacks | Wrap debug logs: `if (import.meta.env.DEV) console.log(...)`, remove in production build |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Canvas loads before page content | Users see blank screen, perceive slow load | Show static placeholder or loading state, hydrate canvas after paint |
| No loading state for portfolio images | Missing images silently hide, users think content is broken | Show skeleton loaders, handle `onError` with fallback image or error message |
| Navbar scroll threshold too sensitive | Navbar flickers on/off during small scrolls | Add hysteresis: hide at 100px, show at 80px (20px buffer zone) |
| No reduced motion preference support | Users with vestibular disorders experience nausea from animations | Check `prefers-reduced-motion` media query, disable animations if set |
| Modal opens instantly without transition | Jarring for users, no visual feedback | Add 200ms fade-in transition, allows focus to settle before keyboard navigation |
| No visual focus indicators on custom elements | Keyboard users cannot see where focus is | Add `:focus-visible` styles (2px outline, high contrast) to ALL interactive elements |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Memory leak fixes:** Verified with repeated mount/unmount cycles (5x minimum) in DevTools Memory profiler — heap should stabilize, not grow linearly
- [ ] **Event listener cleanup:** DevTools Event Listeners panel shows no duplicate handlers after 5 open/close cycles on modal
- [ ] **Three.js disposal:** `renderer.info.memory` counts (geometries, textures, programs) return to baseline after unmount
- [ ] **Test infrastructure:** Tests run in CI before merge, not just locally; test failure blocks deploy
- [ ] **Accessibility testing:** Manual screen reader testing (NVDA/JAWS), not just automated axe-core scans
- [ ] **Keyboard navigation:** Can operate entire site without mouse — Tab/Shift+Tab/Enter/Escape work for all interactions
- [ ] **Focus management:** Focus visible on all interactive elements (`:focus-visible`), focus returns to trigger after modal close
- [ ] **Canvas description:** Screen reader announces canvas purpose (via aria-label) and provides alternative for dynamic content
- [ ] **Color contrast:** WCAG 2.1 AA contrast ratio (3:1 for graphics, 4.5:1 for text) verified with browser DevTools or Contrast Checker
- [ ] **Performance testing:** Animation maintains 60fps on low-end device (throttled CPU in DevTools), no frame drops during scroll

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Memory leak discovered in production | MEDIUM | 1. Add renderer.info.memory monitoring to error logger (Sentry), 2. Deploy disposal fixes, 3. Verify with users reporting "slowness" |
| Canvas fails to initialize | LOW | Error boundary catches WebGL unavailable, show fallback static image with message |
| Focus trap broken in modal | LOW | 1. Revert to native `<dialog>` element (built-in focus trap), or 2. Use react-modal library |
| WCAG audit failure | HIGH | 1. Add shadow DOM for semantic equivalents, 2. Implement focus management, 3. Re-audit with WCAG consultant |
| Test infrastructure breaks build | LOW | Feature flag test config (`if (import.meta.env.VITEST)`), revert test changes, isolate in branch |
| Animation causes motion sickness reports | MEDIUM | 1. Add `prefers-reduced-motion` check immediately, 2. Disable animations for affected users, 3. Consider gentler default animation |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Incomplete Three.js disposal | Phase 1: Memory Leaks | DevTools Memory profiler — 5x mount/unmount cycles, heap stabilizes |
| Event listener stale references | Phase 1: Memory Leaks | DevTools Event Listeners panel — no duplicate handlers after 5 modal cycles |
| Testing Three.js without mocks | Phase 2: Test Infrastructure | Browser Mode tests pass with real WebGL, coverage >80% for ThreeBackground |
| Canvas accessibility afterthought | Phase 3: Accessibility | Manual screen reader testing (NVDA/JAWS) + axe-core passes, focus trap verified |
| Tests breaking production | Phase 2: Test Infrastructure | CI runs tests on PR, production build succeeds, no new console errors in staging |
| Modal keyboard trap failures | Phase 3: Accessibility | Keyboard-only manual test (no mouse), Tab cycles within modal, Escape closes |

---

## Project-Specific Warnings from CONCERNS.md

These pitfalls directly address known issues in the codebase:

### 1. **Dialog Event Handler Cleanup (CONCERNS.md Line 35-40)**
Current code registers event listeners without tracking ref identity. Fix requires stable function refs and testing repeated open/close cycles.

### 2. **ThreeBackground Memory Leak (CONCERNS.md Line 70-89)**
Animation frame loop runs even when off-screen. Add Intersection Observer to pause when canvas not visible, dispose all GPU resources in cleanup.

### 3. **Missing Test Infrastructure (CONCERNS.md Line 149-153)**
Zero tests despite test dependencies. Phase 2 adds Vitest with Browser Mode for canvas, React Testing Library for components.

### 4. **No Accessibility Testing (CONCERNS.md Line 160-163)**
ARIA attributes added but untested. Phase 3 requires manual screen reader testing and axe-core integration tests.

### 5. **Production Site Risk (PROJECT.md context)**
Cannot afford to break existing functionality. All test additions must be feature-flagged and verified in staging before production deploy.

---

## Sources

### Memory Management
- [100 Three.js Best Practices (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [Three.js Memory Leak Prevention](https://roger-chi.vercel.app/blog/tips-on-preventing-memory-leak-in-threejs-scene)
- [Dispose things correctly in three.js forum](https://discourse.threejs.org/t/dispose-things-correctly-in-three-js/6534)
- [When to dispose: How to completely clean up a Three.js scene](https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549)
- [Why Your Three.js App is Secretly Eating GPU Memory](https://ritik-chopra28.medium.com/why-your-three-js-app-is-secretly-eating-gpu-memory-and-how-to-stop-it-fe8ca6b2f72d)

### React Event Listener Cleanup
- [Preventing Memory Leaks in React with useEffect Hooks](https://www.c-sharpcorner.com/article/preventing-memory-leaks-in-react-with-useeffect-hooks/)
- [How to Avoid Memory Leaks in JavaScript Event Listeners](https://dev.to/alex_aslam/how-to-avoid-memory-leaks-in-javascript-event-listeners-4hna)
- [How to Fix Memory Leaks in React Applications](https://www.freecodecamp.org/news/fix-memory-leaks-in-react-apps/)
- [How to Cleanup Event Listeners in React](https://www.pluralsight.com/guides/how-to-cleanup-event-listeners-react)

### Testing Strategies
- [Testing in 2026: Jest, React Testing Library, and Full Stack Testing Strategies](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)
- [How to Unit Test React Components with Vitest](https://oneuptime.com/blog/post/2026-01-15-unit-test-react-vitest-testing-library/view)
- [React Three Fiber Testing Documentation](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Vitest with React Testing Library: A Modern Approach](https://blog.incubyte.co/blog/vitest-react-testing-library-guide/)
- [How to Add Testing to an Existing Project](https://kentcdodds.com/blog/how-to-add-testing-to-an-existing-project)

### Accessibility
- [Bridging WebGL and Accessibility](https://javascript.plainenglish.io/bridging-webgl-and-accessibility-55e6d7802403)
- [Three.js & Accessibility by Pip Lev](https://medium.com/@piplev/three-js-accessibility-c4f45d83f2c6)
- [Accessible WebGL by Anneka Goss](https://annekagoss.medium.com/accessible-webgl-43d15f9caa21)
- [Building an Accessible Modal Dialog in React](https://clhenrick.io/blog/react-a11y-modal-dialog/)
- [How to Create an Accessible React Modal](https://tinloof.com/blog/how-to-create-an-accessible-react-modal)
- [react-modal Accessibility Documentation](https://reactcommunity.org/react-modal/accessibility/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [How to Test React Applications for Accessibility with axe-core](https://oneuptime.com/blog/post/2026-01-15-test-react-accessibility-axe-core/view)

---

*Pitfalls research for: React + Three.js portfolio site memory leak fixes, test coverage, and WCAG 2.1 AA accessibility*
*Researched: 2026-01-27*
*Confidence: HIGH (verified with official docs, community best practices, and cross-referenced multiple sources)*
