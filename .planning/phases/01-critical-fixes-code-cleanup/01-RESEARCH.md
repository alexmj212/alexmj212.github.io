# Phase 1: Critical Fixes & Code Cleanup - Research

**Researched:** 2026-01-27
**Domain:** React memory management, Three.js cleanup, error boundaries, production build optimization
**Confidence:** HIGH

## Summary

Phase 1 addresses production stability issues in a React 18.3.1 + Vite 5.4.19 + Three.js 0.179.1 application. The codebase already has some cleanup infrastructure (ErrorBoundary component, portfolio dialog cleanup in useEffect), but critical gaps exist: Three.js GPU resources aren't fully disposed, console statements persist in production, deprecated `addListener()` is used for media queries, and error boundaries don't cover all major sections.

Research confirms that memory leaks in React Three.js applications stem from three primary sources: GPU resources (geometries, materials, textures, renderer), browser event listeners (resize, media query), and animation frame callbacks. The standard approach requires explicit disposal in useEffect cleanup functions, with verification through Chrome DevTools heap snapshots comparing 5+ mount/unmount cycles.

Error boundary best practices emphasize route-level and section-level placement (not just global), with React Router v7.8.2 providing built-in integration. Production console removal is handled via Vite's esbuild configuration using the `drop` option. Layout debugging relies on Chrome/Firefox DevTools visual inspectors for flexbox/grid issues.

**Primary recommendation:** Implement comprehensive useEffect cleanup audits across all components, add esbuild.drop to vite.config.ts, replace addListener with addEventListener, and wrap portfolio/skills/experience sections with error boundaries. Verify memory stability using manual Chrome DevTools heap snapshots after 5 mount/unmount cycles.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.3.1 | Component framework | Already in use, mature cleanup APIs (useEffect, useRef) |
| Three.js | 0.179.1 | WebGL 3D rendering | Already in use, requires manual disposal patterns |
| Vite | 5.4.19 | Build tool with esbuild | Already in use, built-in console removal via esbuild.drop |
| TypeScript | 4.7.4 | Type safety | Already in use, catches cleanup pattern errors at compile time |
| Chrome DevTools | Browser native | Memory profiling | Industry standard for heap snapshot analysis, no installation needed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Router | 7.8.2 | Route-level error boundaries | Already in use, provides built-in ErrorBoundary route prop |
| Playwright | 1.54.2 | E2E testing with component mount/unmount | Already in use, can automate memory leak verification |
| @playwright/test | 1.54.2 | Component testing framework | Already in use, experimental component testing with unmount() method |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual DevTools | Automated Playwright tests | Manual more practical for initial verification; automated better for CI/CD regression prevention |
| Class error boundaries | react-error-boundary (npm) | No external dependency needed; phase context emphasizes no over-engineering |
| vite-plugin-remove-console | Built-in esbuild.drop | Built-in approach is simpler, no extra plugin needed |

**Installation:**
No new packages required - all tools already in package.json

## Architecture Patterns

### Recommended Project Structure
Current structure is appropriate - no reorganization needed:
```
src/
├── components/           # Component-level error boundaries here
│   ├── ErrorBoundary.tsx # Already exists, needs duplication + placement
│   ├── ThreeBackground.tsx # Memory leak source - needs full cleanup
│   └── portfoilo/Portfolio.tsx # Dialog cleanup partially done, needs audit
├── dark-mode.tsx        # addListener source - needs replacement
└── App.tsx              # Section-level error boundary placement
```

### Pattern 1: Three.js Cleanup in React useEffect
**What:** Comprehensive disposal of all WebGL resources in useEffect cleanup function
**When to use:** Any component rendering Three.js scenes, geometries, materials, textures
**Example:**
```typescript
// Source: https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549
useEffect(() => {
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Animation loop
  let animationId: number;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  // CRITICAL: Cleanup function
  return () => {
    // 1. Cancel animation frame
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    // 2. Traverse scene and dispose geometries/materials
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        // Materials can be arrays
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });

    // 3. Dispose renderer (releases GPU context)
    renderer.dispose();

    // 4. Clear scene
    scene.clear();
  };
}, []);
```

### Pattern 2: Event Listener Cleanup with Exact Reference
**What:** Store event handler reference in scope to remove exact same function
**When to use:** Any event listener added to DOM elements, window, or MediaQueryList
**Example:**
```typescript
// Source: https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### Pattern 3: Dialog Event Handler Cleanup
**What:** Clean up all dialog event listeners (close, click, keydown) on unmount
**When to use:** Native HTML dialog elements with showModal()
**Example:**
```typescript
// Source: https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e
useEffect(() => {
  const dialog = dialogRef.current;
  if (!dialog) return;

  const handleClose = () => onClose();
  const handleBackdropClick = (e: MouseEvent) => {
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom) {
      onClose();
    }
  };

  dialog.addEventListener('close', handleClose);
  dialog.addEventListener('click', handleBackdropClick);

  return () => {
    dialog.removeEventListener('close', handleClose);
    dialog.removeEventListener('click', handleBackdropClick);
  };
}, [onClose]);
```

### Pattern 4: MediaQueryList addEventListener (Replacing addListener)
**What:** Use standard addEventListener instead of deprecated addListener
**When to use:** Listening to system color scheme or media query changes
**Example:**
```typescript
// Source: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
// ❌ Deprecated - BEFORE:
const mql = window.matchMedia('(prefers-color-scheme: dark)');
mql.addListener((e) => {
  if (e.matches) setTheme('dark');
});

// ✅ Modern - AFTER:
const mql = window.matchMedia('(prefers-color-scheme: dark)');
mql.addEventListener('change', (e) => {
  if (e.matches) setTheme('dark');
});

// With cleanup:
useEffect(() => {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    if (e.matches) setTheme('dark');
  };

  mql.addEventListener('change', handleChange);

  return () => {
    mql.removeEventListener('change', handleChange);
  };
}, []);
```

### Pattern 5: Route-Level Error Boundaries
**What:** Wrap major sections with isolated error boundaries to prevent cascade failures
**When to use:** Portfolio, Skills, Experience sections and any Three.js components
**Example:**
```typescript
// Source: https://legacy.reactjs.org/docs/error-boundaries.html
// App.tsx structure
const App = () => {
  return (
    <div>
      <ErrorBoundary fallback={<div>Three.js failed to load</div>}>
        <ThreeBackground />
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Portfolio section unavailable</div>}>
        <Portfolio />
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Skills section unavailable</div>}>
        <Skills />
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Experience section unavailable</div>}>
        <Experience />
      </ErrorBoundary>
    </div>
  );
};
```

### Pattern 6: Image Error Handling with Fallback
**What:** Provide user-visible feedback when images fail to load
**When to use:** Portfolio images, portrait images, any dynamic image sources
**Example:**
```typescript
// Source: https://medium.com/@webcore1/react-fallback-for-broken-images-strategy-a8dfa9c1be1e
// Current implementation hides image - IMPROVE to show fallback
const [imageError, setImageError] = useState(false);

<div className="image-container">
  {!imageError ? (
    <img
      src={item.images[0]}
      alt={item.project}
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="fallback-placeholder">
      <span>📷</span>
      <p>Image unavailable</p>
    </div>
  )}
</div>
```

### Anti-Patterns to Avoid
- **Forgetting animation frame cleanup**: Always store `animationIdRef.current = requestAnimationFrame()` and `cancelAnimationFrame()` in cleanup
- **Disposing renderer but not geometries/materials**: GPU memory leaks even if renderer is disposed
- **Inline event handlers without cleanup**: `onClick` handlers are fine, but `addEventListener` requires cleanup
- **Global error boundary only**: Section-level boundaries prevent one broken widget from crashing entire app
- **Hiding broken images without user feedback**: Current `display: 'none'` pattern leaves empty space with no explanation

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Console removal in production | Custom Babel plugin, string replacement scripts | Vite's `esbuild.drop: ['console', 'debugger']` | Built-in, tree-shakes correctly, handles edge cases (console in strings, computed properties) |
| Error boundaries | Functional component with try/catch | React class component with getDerivedStateFromError | Error boundaries MUST be class components, functional components can't catch render errors |
| Memory leak detection | Custom mount counters | Chrome DevTools heap snapshots with Comparison view | Official tool, proven workflow, detects all leak types (not just event listeners) |
| MediaQueryList polyfills | Custom browser detection logic | Native `addEventListener` with optional fallback check | Modern browsers support it, Safari 14+ supports it, TypeScript types are correct |
| Theme management duplication | Multiple implementations across files | Single source of truth in dark-mode.tsx | Current codebase has duplication flagged in DEBT-02 - consolidate, don't create third implementation |

**Key insight:** React memory leaks are rarely visible in immediate testing because garbage collection is delayed. Chrome DevTools heap snapshots force GC and reveal true retained memory. Don't trust "it looks fine" - take snapshots.

## Common Pitfalls

### Pitfall 1: Incomplete Three.js Disposal (GPU Memory Leak)
**What goes wrong:** Disposing renderer but not traversing scene to dispose geometries/materials leaves GPU memory allocated. Heap looks fine but GPU VRAM grows unbounded.
**Why it happens:** Three.js documentation emphasizes `dispose()` methods but doesn't make clear that EVERY geometry, material, texture needs explicit disposal - garbage collector doesn't free GPU resources.
**How to avoid:**
1. Traverse entire scene graph: `scene.traverse((obj) => { ... })`
2. Check for `THREE.Mesh` instances
3. Dispose geometry: `mesh.geometry?.dispose()`
4. Dispose materials (can be array): `Array.isArray(mesh.material) ? mesh.material.forEach(m => m.dispose()) : mesh.material?.dispose()`
5. Dispose textures if used: `material.map?.dispose()`
6. Finally dispose renderer: `renderer.dispose()`
**Warning signs:** Animation slows down after route navigation, Chrome Task Manager shows GPU memory climbing, but heap snapshots show no leak

### Pitfall 2: Dialog Event Listener Stale References
**What goes wrong:** Dialog event listeners reference old `onClose` callback from previous render, causing state updates on unmounted components.
**Why it happens:** `onClose` callback changes identity on parent re-render but event listener wasn't re-attached with new reference.
**How to avoid:**
1. Include `onClose` in useEffect dependency array: `useEffect(() => { ... }, [onClose])`
2. Or wrap `onClose` with `useCallback` in parent component
3. Ensure cleanup removes listeners before re-adding: `return () => { dialog.removeEventListener(...) }`
**Warning signs:** Console warning "Can't perform a React state update on an unmounted component", dialog closes but parent state doesn't update

### Pitfall 3: React Strict Mode Double-Mounting Confusion
**What goes wrong:** Developer sees cleanup run twice in development, assumes cleanup is broken, removes it.
**Why it happens:** React 18 Strict Mode intentionally mounts → unmounts → remounts components to surface cleanup bugs early.
**How to avoid:**
1. KEEP cleanup functions even if they run twice in dev
2. Verify behavior in production build: `pnpm build && pnpm preview`
3. Use `console.log` counts to understand flow, then remove logs
4. Expect this pattern in dev: mount → cleanup → mount → cleanup on unmount
**Warning signs:** Developer comments like "cleanup runs twice so I removed it", tests passing in dev but memory leaks in production

### Pitfall 4: Console Removal Without Error/Warn Preservation
**What goes wrong:** Removing ALL console methods (including `console.error`, `console.warn`) hides legitimate runtime errors in production.
**Why it happens:** Developer uses `drop: ['console']` which removes every console method, not just `console.log`.
**How to avoid:**
1. Use specific array: `drop: ['console', 'debugger']` removes console.log, console.debug, console.info
2. Keep error/warn: Don't drop console.error or console.warn - these catch real issues
3. Or use `pure: ['console.log']` for surgical removal
4. Test production build to ensure errors still surface
**Warning signs:** Production errors invisible, users report bugs but no logs captured, error tracking service shows nothing

### Pitfall 5: Error Boundary Doesn't Catch Event Handlers
**What goes wrong:** Error thrown in `onClick` handler crashes app despite error boundary wrapping component.
**Why it happens:** Error boundaries only catch errors in render, lifecycle methods, constructors - NOT in event handlers (React limitation).
**How to avoid:**
1. Wrap event handler logic in try/catch: `onClick={() => { try { ... } catch (e) { handleError(e) } }}`
2. Use global error handler: `window.addEventListener('error', ...)`
3. Document which errors boundaries catch vs don't catch
4. Test by throwing errors in event handlers, not just render
**Warning signs:** Error boundary doesn't trigger, error propagates to window.onerror, console shows uncaught error in event handler

### Pitfall 6: Verifying Memory Stability with Single Snapshot
**What goes wrong:** Taking one heap snapshot after component unmount shows no leak, but repeated mount/unmount cycles reveal growth.
**Why it happens:** JavaScript garbage collection is lazy - objects may not be freed immediately. Some leaks only appear after multiple cycles when GC pressure builds.
**How to avoid:**
1. Take BASELINE snapshot before mounting
2. Mount → unmount component 5 times
3. Force garbage collection (DevTools has button)
4. Take COMPARISON snapshot
5. Check retained size delta - should be near zero
6. Success criteria from context: "heap stabilizes after 5 mount/unmount cycles"
**Warning signs:** First unmount looks clean but 5th unmount shows 5x baseline memory, developer declares victory after single test

## Code Examples

Verified patterns from official sources:

### Memory Leak Verification Workflow (Chrome DevTools)
```bash
# Source: https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots
# Manual DevTools workflow:

1. Open Chrome DevTools → Memory tab
2. Select "Heap snapshot" profiling type
3. Click "Take snapshot" (BASELINE)
4. In app: Navigate to component route (mount ThreeBackground)
5. Navigate away (unmount ThreeBackground)
6. Repeat mount/unmount 4 more times (5 total cycles)
7. Click garbage collection icon (🗑️) to force GC
8. Take another snapshot (COMPARISON)
9. Switch to "Comparison" view, compare COMPARISON to BASELINE
10. Look for retained objects that shouldn't exist
11. Success criteria: Retained size delta < 1MB, no scene/renderer/geometry objects retained

# Expected result: Near-zero growth
# Failure pattern: Detached DOM nodes, retained event listeners, scene objects still in heap
```

### Comprehensive Three.js Cleanup (Addressing MEM-01)
```typescript
// Source: Three.js forum discussions + codebase analysis
// File: src/components/ThreeBackground.tsx

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  // Track for disposal
  const particleGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  geometries.push(particleGeometry);

  const particleMaterial = new THREE.MeshLambertMaterial({ color: 0x0b8bd5 });
  materials.push(particleMaterial);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
    materials.push(particle.material); // Track cloned material
    scene.add(particle);
  }

  // Animation loop
  let animationId: number;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  // Resize handler
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', handleResize);

  // CLEANUP FUNCTION
  return () => {
    // 1. Cancel animation frame
    if (animationId !== undefined) {
      cancelAnimationFrame(animationId);
    }

    // 2. Remove event listeners
    window.removeEventListener('resize', handleResize);

    // 3. Traverse scene and dispose all geometries/materials
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();

        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });

    // 4. Dispose tracked resources
    geometries.forEach(geo => geo.dispose());
    materials.forEach(mat => mat.dispose());

    // 5. Clear scene
    scene.clear();

    // 6. Dispose renderer (releases GPU context)
    renderer.dispose();
  };
}, []); // Empty deps - run once on mount
```

### Vite Production Console Removal (Addressing DEBT-01)
```typescript
// Source: https://github.com/vitejs/vite/discussions/7920
// File: vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: true,
    minify: 'esbuild',
    esbuild: {
      // Remove console.log, console.debug, console.info, debugger statements
      // Keeps console.error and console.warn for production error tracking
      drop: ['console', 'debugger'],
    },
  },
})
```

### Theme Detection with addEventListener (Addressing DEBT-03)
```typescript
// Source: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
// File: src/dark-mode.tsx

export function initializeThemeDetection() {
  // Initial theme detection
  if (localStorage.theme === themeOptions.DARK ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(themeOptions.DARK);
  } else {
    setTheme(themeOptions.LIGHT);
  }
}

// In component using theme detection:
useEffect(() => {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');

  const handleThemeChange = (e: MediaQueryListEvent) => {
    if (e.matches) {
      setTheme(themeOptions.DARK);
    } else {
      setTheme(themeOptions.LIGHT);
    }
  };

  // ✅ Modern approach (replaces deprecated addListener)
  mql.addEventListener('change', handleThemeChange);

  return () => {
    mql.removeEventListener('change', handleThemeChange);
  };
}, []);
```

### Section-Level Error Boundaries (Addressing ERR-02)
```typescript
// Source: https://legacy.reactjs.org/docs/error-boundaries.html
// File: src/App.tsx

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Three.js already has error boundary - KEEP */}
      <ErrorBoundary fallback={
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800" />
      }>
        <ThreeBackground />
      </ErrorBoundary>

      <div className="app-container">
        <Navbar />

        {/* Home section - no error boundary needed (static content) */}
        <div id="home">...</div>

        {/* Portfolio section - ADD error boundary */}
        <div id="portfolio">
          <ErrorBoundary fallback={
            <div className="w-full py-24">
              <div className="container-responsive">
                <p className="text-red-600">Portfolio section temporarily unavailable.</p>
              </div>
            </div>
          }>
            <Portfolio />
          </ErrorBoundary>
        </div>

        {/* Skills section - ADD error boundary */}
        <div id="skills">
          <ErrorBoundary fallback={
            <div className="w-full py-24">
              <div className="container-responsive">
                <p className="text-red-600">Skills section temporarily unavailable.</p>
              </div>
            </div>
          }>
            <Skills />
          </ErrorBoundary>
        </div>

        {/* Experience section - ADD error boundary */}
        <div id="experience">
          <ErrorBoundary fallback={
            <div className="w-full py-24">
              <div className="container-responsive">
                <p className="text-red-600">Experience section temporarily unavailable.</p>
              </div>
            </div>
          }>
            <Experience />
          </ErrorBoundary>
        </div>

        <Footer />
      </div>
    </div>
  );
};
```

### Image Error Handling with User Feedback (Addressing BUG-04)
```typescript
// Source: https://medium.com/@webcore1/react-fallback-for-broken-images-strategy-a8dfa9c1be1e
// File: src/components/portfoilo/Portfolio.tsx

// IMPROVEMENT PATTERN - current code uses display: 'none', replace with state-based fallback

const [imageError, setImageError] = useState(false);

{portfolioItem.images && portfolioItem.images.length > 0 && (
  <div className="portfolio-image-container">
    {!imageError ? (
      <img
        src={portfolioItem.images[0]}
        alt={portfolioItem.project}
        className="portfolio-image"
        onError={() => setImageError(true)}
      />
    ) : (
      <div className="portfolio-image-fallback flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800 text-gray-400">
        <span className="text-4xl mb-2">📷</span>
        <p className="text-sm">Image not available</p>
      </div>
    )}
  </div>
)}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `MediaQueryList.addListener()` | `MediaQueryList.addEventListener('change', handler)` | Deprecated 2020, removed from spec | Must update dark-mode.tsx (DEBT-03), modern browsers no longer guarantee support |
| Global error boundary only | Section-level error boundaries with React Router integration | Best practice since React 16 (2017), formalized in React Router v6+ | Portfolio/Skills/Experience sections must get individual boundaries (ERR-02) |
| Implicit garbage collection for Three.js | Explicit `dispose()` calls for all GPU resources | Always required, but React 18 Strict Mode makes leaks more visible | Must traverse scene and dispose every geometry/material/texture (MEM-01) |
| Removing all console methods | Selective console removal (keep error/warn) | 2022+ build tools optimize | Use `drop: ['console', 'debugger']` not blanket removal (DEBT-01) |
| React class components for error boundaries | Still class components (no functional alternative) | Limitation persists in React 18 | Cannot use hooks for error boundaries, must use class with getDerivedStateFromError |

**Deprecated/outdated:**
- `MediaQueryList.addListener()`: Replace with `addEventListener('change', ...)` everywhere
- `console.log` in production: Vite esbuild.drop removes automatically
- Single global error boundary: Granular boundaries prevent cascade failures

**Current codebase status:**
- ✅ Already using React 18.3.1 with Strict Mode benefits
- ✅ Already has ErrorBoundary class component (src/components/ErrorBoundary.tsx)
- ✅ Portfolio dialog has some cleanup (lines 56-61 in Portfolio.tsx)
- ❌ Three.js missing geometry/material disposal (ThreeBackground.tsx lines 341-350 incomplete)
- ❌ MediaQueryList.addListener on line 43 of dark-mode.tsx (DEBT-03)
- ❌ 12 console statements across 2 files (ErrorBoundary.tsx, ThreeBackground.tsx)
- ❌ Error boundaries only on ThreeBackground, not on Portfolio/Skills/Experience sections

## Open Questions

Things that couldn't be fully resolved:

1. **Memory Stability Threshold**
   - What we know: Success criteria mentions "heap stabilizes after 5 mount/unmount cycles"
   - What's unclear: Acceptable heap growth delta - is <100KB ok? <1MB? Zero growth expected?
   - Recommendation: Start with manual DevTools verification, define threshold as "retained size delta <1MB and no Three.js objects in Comparison view". Refine based on observed baseline memory variance.

2. **Automated vs Manual Memory Leak Verification**
   - What we know: Playwright 1.54.2 has experimental component testing with `unmount()` method, Chrome DevTools is proven manual approach
   - What's unclear: Is Playwright component testing stable enough for memory leak CI/CD? Phase context says Claude's discretion.
   - Recommendation: Use manual Chrome DevTools heap snapshots for Phase 1 verification (faster to implement, proven workflow). Add Playwright automated tests in Phase 2 (testing phase) if manual verification succeeds. Context emphasizes "no over-engineering" - manual is simpler.

3. **Theme Management Consolidation Scope**
   - What we know: DEBT-02 says "Theme management consolidated (single implementation, no duplication)"
   - What's unclear: Codebase analysis shows dark-mode.tsx as single source. Where is duplication? In components reading theme directly vs using centralized functions?
   - Recommendation: Audit all theme-related code (search for "dark:", "prefers-color-scheme", localStorage.theme) to identify duplication. Consolidate to dark-mode.tsx exports. Document as discovery task in planning.

4. **Production Build Console Removal Scope**
   - What we know: DEBT-01 requires "All console.log/console.warn removed from production build"
   - What's unclear: Should console.error also be removed? Requirement lists log AND warn explicitly, but not error.
   - Recommendation: Remove console.log, console.debug, console.info using `drop: ['console', 'debugger']`. KEEP console.error for production error tracking. Update requirement interpretation: "console.warn" likely means "warnings" not the method itself.

5. **Portfolio Layout Bug Specifics**
   - What we know: BUG-01 says "Portfolio layout bugs fixed (elements aligned correctly)"
   - What's unclear: No specific layout bugs documented. Need to identify actual issues.
   - Recommendation: Use Chrome DevTools CSS Grid/Flexbox inspector on Portfolio section, compare with design intent. Check responsive breakpoints (mobile, tablet, desktop). Document findings during implementation. Context doesn't specify bugs, so this is discovery work.

## Sources

### Primary (HIGH confidence)
- **MDN Web Docs - MediaQueryList.addListener**: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener (Deprecation status, browser compatibility)
- **Chrome DevTools - Heap Snapshots**: https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots (Memory profiling workflow, snapshot comparison)
- **React Documentation - Error Boundaries**: https://legacy.reactjs.org/docs/error-boundaries.html (What error boundaries catch, implementation requirements, placement best practices)
- **Three.js Forum - Dispose Patterns**: https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549 (Scene cleanup, geometry/material disposal patterns)
- **Three.js Forum - Dispose Correctly**: https://discourse.threejs.org/t/dispose-things-correctly-in-three-js/6534 (Comprehensive disposal guide)

### Secondary (MEDIUM confidence)
- **LogRocket - useEffect Cleanup**: https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/ (React cleanup patterns, event listener removal)
- **Vite GitHub Discussion #7920**: https://github.com/vitejs/vite/discussions/7920 (Console removal with esbuild.drop configuration)
- **Medium - React Image Fallback Strategy**: https://medium.com/@webcore1/react-fallback-for-broken-images-strategy-a8dfa9c1be1e (Image error handling with state-based fallback)
- **Medium - HTML Dialog in React**: https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e (Dialog event cleanup patterns)
- **Playwright Component Testing**: https://playwright.dev/docs/test-components (Automated mount/unmount testing)
- **React Testing Library Cleanup**: https://testing-library.com/docs/react-testing-library/api/ (Memory leak verification with Jest)

### Tertiary (LOW confidence - WebSearch only, flagged for validation)
- **C-Sharp Corner - Memory Leaks in React**: https://www.c-sharpcorner.com/article/preventing-memory-leaks-in-react-with-useeffect-hooks/ (General patterns, needs official doc verification)
- **DEV.to - React useEffect Best Practices**: https://dev.to/hkp22/reacts-useeffect-best-practices-pitfalls-and-modern-javascript-insights-g2f (Community patterns, not authoritative)
- **CodeWalnut - React Memory Leaks**: https://www.codewalnut.com/insights/5-react-memory-leaks-that-kill-performance (Blog post, no official backing)

### Additional Resources
- **React Router Error Boundaries**: https://reactrouter.com/how-to/error-boundary (Route-level error boundary integration)
- **Three.js GitHub Issue #18759**: https://github.com/mrdoob/three.js/issues/18759 (WebGLRenderer memory leak discussions)
- **Chrome DevTools - Flexbox Inspector**: https://developer.chrome.com/docs/devtools/css/flexbox (Layout debugging for BUG-01)
- **Firefox DevTools - CSS Grid**: Referenced in search results as "best Grid inspection tools" (Layout debugging alternative)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools already in package.json, no new dependencies needed
- Architecture: HIGH - Patterns verified with official documentation (MDN, React docs, Chrome DevTools)
- Pitfalls: HIGH - Based on common issues documented in Three.js forum, React docs, and browser DevTools guides
- Memory verification: MEDIUM - Manual DevTools workflow is proven, but automated Playwright approach needs validation
- Layout bugs (BUG-01): LOW - No specific bugs documented, requires discovery during implementation

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable technologies: React 18, Three.js, Vite, Chrome DevTools)

**Known gaps requiring investigation during planning:**
1. Exact location of theme management duplication (DEBT-02)
2. Specific portfolio layout bugs (BUG-01) - discovery task
3. Memory stability threshold definition - propose <1MB delta for 5 cycles
4. Verification method choice (manual vs automated) - recommend manual for Phase 1
