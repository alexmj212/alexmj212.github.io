# Phase 3: Accessibility Compliance - Research

**Researched:** 2026-01-30
**Domain:** Web Accessibility (WCAG 2.1 AA compliance)
**Confidence:** HIGH

## Summary

This research investigates how to achieve WCAG 2.1 AA compliance for a React 18 portfolio site built with TypeScript, Vite 6, Tailwind CSS, and Vitest 4 testing infrastructure. The standard approach combines automated accessibility testing (vitest-axe for component tests, @axe-core/playwright for E2E tests) with manual testing using screen readers (NVDA, VoiceOver).

Key findings indicate that the existing codebase already has some accessibility considerations (focus management in mobile nav, ARIA labels, semantic HTML roles), but lacks critical features like skip links, focus traps in the portfolio modal dialog, proper ARIA modal attributes, and automated accessibility testing. The native HTML `<dialog>` element (already in use for the portfolio modal) provides a good foundation but requires additional ARIA attributes and focus management enhancements.

**Primary recommendation:** Use vitest-axe and @axe-core/playwright for automated testing to catch 30-40% of issues, implement focus-trap-react for modal focus management, add skip links and proper ARIA attributes, audit color contrast with Tailwind-specific tools, then perform manual screen reader testing with NVDA and VoiceOver to catch issues automated tools miss.

## Standard Stack

The established libraries/tools for accessibility compliance in React applications:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vitest-axe | Latest | Automated a11y testing in component tests | Official Vitest port of jest-axe, integrates with existing React Testing Library setup |
| @axe-core/playwright | Latest | Automated a11y testing in E2E tests | Official Playwright integration from Deque (axe-core maintainer), seamless with existing Playwright config |
| focus-trap-react | Latest | Focus trap for modal dialogs | Most popular React focus trap library (focus-trap family), maintains focus within modals per WAI-ARIA guidelines |
| axe-core | 4.x | Core accessibility testing engine | Industry standard from Deque Systems, powers both vitest-axe and @axe-core/playwright |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @testing-library/user-event | 14.x | Keyboard interaction testing | Already in project, use for testing Tab, Enter, Escape keyboard patterns |
| react-aria | Latest | ARIA hooks (optional) | Only if native HTML dialog approach proves insufficient (current dialog implementation preferred) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vitest-axe | Manual ARIA checks | Automated testing catches 30-40% of issues reliably, manual-only misses common violations |
| focus-trap-react | Custom focus management | Focus traps are complex (edge cases, browser differences), custom solutions are error-prone |
| Native `<dialog>` | react-aria-modal | Native element has better browser support in 2026, simpler implementation, less bundle size |

**Installation:**
```bash
npm install --save-dev vitest-axe @axe-core/playwright
npm install focus-trap-react
```

**Note:** vitest-axe does NOT work with happy-dom environment (bug in happy-dom's Node.prototype.isConnected). Current project uses jsdom (verified in vitest.config.ts), which is compatible.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── a11y/
│   │   ├── SkipLink.tsx           # Skip to main content link
│   │   ├── FocusTrap.tsx          # Wrapper for focus-trap-react (if abstracted)
│   │   └── VisuallyHidden.tsx     # Screen reader only content utility
│   ├── portfoilo/
│   │   ├── Portfolio.tsx          # Enhanced with ARIA modal attributes
│   │   └── Portfolio.a11y.test.tsx # Accessibility-specific tests
│   └── ThreeBackground.tsx        # Enhanced with aria-hidden
├── test/
│   ├── setup.ts                   # Add vitest-axe import here
│   └── a11y/
│       └── helpers.ts             # Shared a11y test utilities
└── styles/
    └── a11y.css                   # Focus indicators, skip links, reduced motion
```

### Pattern 1: Automated Accessibility Testing Setup

**What:** Integrate vitest-axe into existing React Testing Library tests
**When to use:** Every component test that renders UI

**Example:**
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'  // Add this line
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// ... existing setup code

// src/components/portfoilo/Portfolio.a11y.test.tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Portfolio from './Portfolio'

describe('Portfolio - Accessibility', () => {
  it('has no accessibility violations on initial render', async () => {
    const { container } = render(<Portfolio />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('modal has no violations when open', async () => {
    const { container } = render(<Portfolio />)
    // Open modal logic here
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Source:** [vitest-axe GitHub README](https://github.com/chaance/vitest-axe)

### Pattern 2: Playwright Accessibility Testing

**What:** Add @axe-core/playwright to existing Playwright browser tests
**When to use:** E2E tests, especially for interactive flows

**Example:**
```typescript
// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage has no violations', async ({ page }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })

  test('portfolio modal has no violations', async ({ page }) => {
    await page.goto('/')
    await page.click('article:first-child') // Open modal

    const results = await new AxeBuilder({ page })
      .include('dialog')
      .analyze()

    expect(results.violations).toEqual([])
  })
})
```

**Source:** [Playwright Accessibility Testing Docs](https://playwright.dev/docs/accessibility-testing)

### Pattern 3: Focus Trap Implementation for Modal Dialog

**What:** Wrap modal content with focus-trap-react to trap keyboard focus
**When to use:** Any modal dialog, dropdown, or overlay that should trap focus

**Example:**
```typescript
import { FocusTrap } from 'focus-trap-react'
import { useRef, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store the element that triggered the modal
      triggerRef.current = document.activeElement as HTMLElement
      dialogRef.current?.showModal()
      // Focus close button on open
      closeButtonRef.current?.focus()
    } else if (dialogRef.current?.open) {
      dialogRef.current?.close()
      // Return focus to trigger on close
      triggerRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        initialFocus: closeButtonRef,
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: true,
      }}
    >
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="backdrop:bg-black backdrop:bg-opacity-50"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
        <h2 id="modal-title">Modal Title</h2>
        {children}
      </dialog>
    </FocusTrap>
  )
}
```

**Source:** [focus-trap-react GitHub](https://github.com/focus-trap/focus-trap-react), [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### Pattern 4: Skip Links (Visible on Focus)

**What:** Add "Skip to main content" link as first focusable element
**When to use:** Every page (required for WCAG 2.4.1 Bypass Blocks)

**Example:**
```tsx
// src/components/a11y/SkipLink.tsx
const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Skip to main content
    </a>
  )
}

// CSS (in src/styles/a11y.css or tailwind-input.css)
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 9999;
  border: 2px solid transparent;
}

.skip-link:focus {
  top: 0;
  border-color: var(--carolina-blue); /* 2px outline for focus indicator */
  outline: 2px solid var(--carolina-blue);
  outline-offset: 2px;
}

// Usage in App.tsx
const App = () => {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content">
        {/* Main content */}
      </main>
    </>
  )
}
```

**Source:** [WebAIM Skip Navigation Links](https://webaim.org/techniques/skipnav/), [W3C Technique G1](https://www.w3.org/TR/WCAG20-TECHS/G1.html)

### Pattern 5: ARIA Modal Dialog Attributes

**What:** Apply required ARIA attributes to native `<dialog>` element
**When to use:** All modal dialogs

**Example:**
```tsx
<dialog
  ref={dialogRef}
  role="dialog"              // Explicit role (redundant with <dialog> but harmless)
  aria-modal="true"          // REQUIRED: Tells AT this is modal
  aria-labelledby="dialog-title"  // REQUIRED: References visible title
  aria-describedby="dialog-description" // OPTIONAL: References description
  className="..."
>
  <button
    ref={closeButtonRef}
    onClick={onClose}
    aria-label="Close dialog"  // Accessible name for × button
  >
    ×
  </button>

  <h2 id="dialog-title">Project Title</h2>
  <p id="dialog-description">Brief description</p>
  {/* Content */}
</dialog>
```

**Key Requirements:**
- `aria-modal="true"` is REQUIRED to inform assistive tech
- Either `aria-labelledby` (pointing to visible title) OR `aria-label` is REQUIRED
- `aria-describedby` is optional (omit for complex semantic structures)
- Close button must have accessible name (aria-label or visible text)
- Focus trap must prevent Tab from escaping modal
- Escape key must close modal

**Source:** [WAI-ARIA Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### Pattern 6: Three.js Canvas Accessibility

**What:** Mark decorative Three.js canvas as hidden from accessibility tree
**When to use:** Any decorative canvas/animation that doesn't convey content

**Example:**
```tsx
// src/components/ThreeBackground.tsx
const ThreeBackground = () => {
  return (
    <div
      id="three-background"
      role="presentation"  // Decorative container role
      aria-label="Decorative background animation"  // Context for developers
      style={{ /* ... */ }}
    >
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        aria-hidden="true"  // REQUIRED: Hides from screen readers
        style={{ /* ... */ }}
      />
    </div>
  )
}
```

**Important:** aria-hidden="true" removes element and all children from accessibility tree. Do NOT use on focusable elements.

**Source:** [MDN aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden), [Three.js Accessibility on Medium](https://medium.com/@piplev/three-js-accessibility-c4f45d83f2c6)

### Pattern 7: Focus Indicators (WCAG 2.4.13 Focus Appearance)

**What:** Visible, high-contrast focus indicators for all interactive elements
**When to use:** All buttons, links, form inputs, custom interactive elements

**Example:**
```css
/* Global focus indicator (tailwind-input.css) */
*:focus {
  outline: 2px solid var(--carolina-blue); /* 3:1 contrast minimum */
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none; /* Hide for mouse clicks */
}

*:focus-visible {
  outline: 2px solid var(--carolina-blue);
  outline-offset: 2px;
}

/* Dark mode variant */
.dark *:focus-visible {
  outline-color: var(--carolina-blue-dark);
}

/* Button-specific (enhance browser default) */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--carolina-blue);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(11, 139, 213, 0.2); /* Optional glow */
}
```

**WCAG Requirements:**
- 3:1 contrast ratio between focused and unfocused states (WCAG 2.4.13 Level AA)
- 3:1 contrast ratio against adjacent colors (WCAG 1.4.11)
- At least 2 CSS pixels thick (WCAG 2.4.13)
- Must be visible for keyboard users

**Source:** [W3C WCAG 2.2 Success Criterion 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), [WebAIM Contrast Requirements](https://webaim.org/articles/contrast/)

### Pattern 8: Reduced Motion Support

**What:** Respect prefers-reduced-motion user preference
**When to use:** All animations and transitions (Three.js background, modal transitions)

**Example:**
```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```typescript
// In ThreeBackground.tsx CONFIG
const CONFIG = {
  // ... other config
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  reducedMotionSpeedMultiplier: 0.3, // Reduce speed by 70%
}

// Apply in animation loop
const speed = CONFIG.prefersReducedMotion
  ? baseSpeed * CONFIG.reducedMotionSpeedMultiplier
  : baseSpeed
```

**Source:** [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [W3C Technique C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)

### Anti-Patterns to Avoid

- **Don't skip heading levels going down** (h1 → h3): Violates logical hierarchy, confuses screen reader users navigating by headings
- **Don't use aria-hidden on focusable elements**: Causes keyboard traps and focus confusion
- **Don't rely solely on automated testing**: Catches only 30-40% of issues, manual testing required
- **Don't use div/span as buttons without role="button"**: Missing keyboard support and semantics
- **Don't implement custom focus management without testing**: Use established libraries (focus-trap-react)
- **Don't use color alone to convey information**: Fails WCAG 1.4.1 Use of Color
- **Don't forget to test with actual screen readers**: Automated tools can't verify announcement quality

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Focus traps for modals | Custom Tab key handling | focus-trap-react | Edge cases: multiple tabbable elements, radio groups, iframes, shadow DOM, escape deactivation, click outside, return focus on close |
| Accessibility testing | Manual ARIA attribute checks | vitest-axe + @axe-core/playwright | Catches 30-40% of issues reliably, maintains rule consistency, updates with WCAG changes, prevents regressions |
| ARIA live announcements | Custom screen reader detection | ARIA live regions (polite/assertive) | Browser/AT compatibility, timing issues, double announcements, framework rendering conflicts |
| Keyboard navigation patterns | Custom event handlers | Native HTML + ARIA patterns | Tab order calculation, Shift+Tab reverse, Enter vs Space, Arrow key navigation for specific widgets |
| Color contrast checking | Visual inspection | Automated tools (WebAIM, Contrastly) | Precise WCAG ratio calculations, gradient handling, alpha transparency, text size variations |

**Key insight:** Accessibility has numerous edge cases (browser differences, assistive tech variations, user preference combinations). Established solutions have been battle-tested across these scenarios. Custom implementations consistently miss edge cases that only surface with real assistive technology users.

## Common Pitfalls

### Pitfall 1: Automated Testing False Confidence

**What goes wrong:** Team assumes passing vitest-axe tests means the site is accessible. Critical issues remain undetected.

**Why it happens:** Automated tools detect only 30-40% of accessibility issues. They cannot evaluate:
- Quality/meaningfulness of alt text, labels, ARIA descriptions
- Logical heading hierarchy and reading order
- Focus order and keyboard navigation flow
- Dynamic content announcements (timing, appropriateness)
- Context-specific ARIA usage (modal is actually modal-like)
- Real screen reader user experience

**How to avoid:**
- Document that automated testing is Layer 1, not complete coverage
- Require manual screen reader testing (NVDA + VoiceOver minimum) for each feature
- Test actual user flows end-to-end with keyboard only, then screen reader
- Include accessibility acceptance criteria beyond "axe passes"

**Warning signs:**
- No manual testing plan or screen reader test cases
- PRs approved based solely on passing automated tests
- Team doesn't know how to use NVDA/VoiceOver
- No keyboard-only testing in development workflow

**Source:** [Automated Testing Limitations - BrowserStack](https://www.browserstack.com/guide/automate-accessibility-testing), [Why Automated Testing Isn't Enough - Applause](https://www.applause.com/blog/why-automated-accessibility-testing-tools-miss-so-much/)

### Pitfall 2: Focus Trap Without Escape Hatch

**What goes wrong:** Focus gets trapped in modal with no way to exit via keyboard. User stuck tabbing in circles.

**Why it happens:** Developer implements focus cycling (Tab wraps first→last→first) but forgets:
- Escape key handler to close modal
- Close button in tab order
- Backdrop click deactivation (optional but expected)
- Return focus to trigger element on close

**How to avoid:**
- Use focus-trap-react with escapeDeactivates: true
- Always include visible, keyboard-accessible close button as first focusable element
- Test with keyboard only (Tab, Shift+Tab, Escape, Enter)
- Document focus restoration behavior in component

**Warning signs:**
- Tab cycles within modal but Escape doesn't close
- Modal closes but focus goes to body or first page element
- Close button has tabindex="-1" (unreachable via keyboard)
- Click outside works but no keyboard equivalent

**Source:** [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### Pitfall 3: Missing or Incorrect ARIA Modal Attributes

**What goes wrong:** Native `<dialog>` element used without `aria-modal="true"`. Screen readers don't recognize it as modal, allow navigation to background content.

**Why it happens:** Developer assumes native `<dialog>` element automatically communicates modal behavior to assistive tech. It doesn't - ARIA attributes are required.

**How to avoid:**
- Add `aria-modal="true"` to all modal dialogs (native or custom)
- Add `aria-labelledby` or `aria-label` to dialog element
- Test with screen reader (NVDA Browse Mode, VoiceOver VO+Right arrow)
- Verify background content is inert (cannot be reached via screen reader navigation)

**Warning signs:**
- Screen reader can navigate to background content while modal is open
- Modal title not announced when dialog opens
- Dialog role not announced ("dialog" or "modal dialog")

**Source:** [MDN ARIA Modal](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal), [Dialog (Modal) Pattern APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### Pitfall 4: Semantic HTML Violations

**What goes wrong:** Heading hierarchy skipped (h1 → h3), interactive divs without role, lists implemented with div elements. Structure invisible to assistive tech.

**Why it happens:** Visual design requirements conflict with semantic structure. Developer uses CSS to resize headings instead of using correct heading level.

**How to avoid:**
- Strict heading hierarchy (h1 > h2 > h3, no skips going down)
- Visual sizing via CSS classes, not heading level
- Use semantic HTML (button, nav, main, article) before reaching for ARIA
- Run automated tests (axe checks heading order)
- Validate with screen reader heading navigation (NVDA H key, VoiceOver VO+Cmd+H)

**Warning signs:**
- Designer specifies h1 styling for subsection (visual vs semantic)
- "All headings" list in screen reader shows illogical structure
- Interactive elements lack button/link semantics
- Portfolio cards not using article or list markup

**Source:** [WebAIM Semantic Structure](https://webaim.org/techniques/semanticstructure/), [Heading Hierarchy Best Practices](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/)

### Pitfall 5: Color Contrast Failures (Especially Dark Mode)

**What goes wrong:** Text/background combinations fail WCAG AA 4.5:1 ratio. Focus indicators fail 3:1 ratio. Often worse in dark mode.

**Why it happens:** Colors chosen for aesthetics without contrast checking. Tailwind's default grays (gray-400 on gray-900) often fail. Dark mode uses different color variables without re-checking contrast.

**How to avoid:**
- Audit all color combinations with WebAIM Contrast Checker or Contrastly
- Check BOTH light and dark mode variants
- Document passing combinations in design system
- Automate contrast checking in CI (e.g., pa11y-ci with contrast checks)
- Test focus indicators specifically (3:1 requirement, easier to miss)

**Warning signs:**
- Gray text on gray backgrounds (common with Tailwind gray-400/gray-600)
- Accent colors on white/black without contrast verification
- Focus indicators using brand colors without testing
- Dark mode implemented by swapping variables without re-testing

**Codebase-specific risk:**
- Custom CSS variables: --carolina-blue (#0b8bd5), --russian-green (#5b9a63)
- Dark variants: --carolina-blue-dark (#38799d), --russian-green-dark (#52905a)
- MUST verify contrast for all text/background combinations with these colors

**Source:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), [WCAG 1.4.3 Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

### Pitfall 6: Skip Links Not Visible on Focus

**What goes wrong:** Skip link exists but remains invisible when focused. Keyboard users unaware of shortcut.

**Why it happens:** Developer implements skip link with display:none or visibility:hidden, forgets to override on :focus.

**How to avoid:**
- Use position: absolute with off-screen positioning (top: -40px)
- Override to on-screen position on :focus (top: 0)
- Test by pressing Tab immediately on page load
- Verify skip link is first focusable element
- Check contrast ratio meets 4.5:1 for text

**Warning signs:**
- Tab does nothing visible on first press
- Skip link exists in DOM but never appears
- Skip link appears on hover instead of focus
- Multiple Tab presses required before skip link appears

**Source:** [WebAIM Skip Navigation](https://webaim.org/techniques/skipnav/), [Skip Links Implementation Guide](https://www.a11yproject.com/posts/skip-nav-links/)

### Pitfall 7: Route Changes Don't Reset Focus

**What goes wrong:** User clicks navigation link in SPA, route changes, but focus stays on old nav link. Skip-to-content link now many Tabs away.

**Why it happens:** Client-side routing doesn't trigger browser's default focus reset (unlike full page load). Framework doesn't manage focus automatically.

**How to avoid:**
- Focus on main content container (with tabindex="-1") on route change
- OR focus on page heading (h1) on route change
- Listen to route change events in React Router or Vite's router
- Test keyboard navigation: click nav link, verify focus moves to new page content
- Provide skip links on every route for keyboard efficiency

**Warning signs:**
- Tab after navigation starts from previous page's position
- Many Tab presses required to reach new content
- Screen reader doesn't announce route change
- Focus indicator disappears on route change (focus on body)

**Note:** Codebase doesn't use React Router (single page app without multi-page routing based on code inspection). If routes added later, this becomes relevant.

**Source:** [Focus Management in SPAs - CSS-Tricks](https://css-tricks.com/how-we-improved-the-accessibility-of-our-single-page-app-menu/), [SPA Accessibility Discussion - React Router](https://github.com/remix-run/react-router/discussions/9555)

### Pitfall 8: ARIA Live Regions That Don't Work

**What goes wrong:** Dynamic content updates (e.g., "Item added to portfolio filter") but screen reader doesn't announce. ARIA live region seems ignored.

**Why it happens:**
- Live region added to DOM at same time as content (must exist before update)
- aria-live attribute added after content change (must exist before)
- Content replaced via innerHTML/replaceChild instead of text update
- Live region removed/re-added on each update (must persist)
- Conflicting framework rendering (React re-mounts component)

**How to avoid:**
- Render live region on page load, always present in DOM
- Update text content, don't replace entire element
- Use aria-live="polite" for most cases, "assertive" only for urgent alerts
- Test across screen readers (behavior varies: NVDA, JAWS, VoiceOver)
- Use tools like React Aria's useAnnounce hook for framework compatibility

**Warning signs:**
- Live region works in testing but not production
- Works in one screen reader but not another
- Announcements double or triple up
- No announcement when content clearly changes

**Note:** Current codebase doesn't appear to use ARIA live regions. Relevant if adding dynamic notifications (e.g., portfolio filter applied, theme changed).

**Source:** [ARIA Live Regions Guide - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions), [When ARIA Live Isn't Live - k9n.dev](https://k9n.dev/blog/2025-11-aria-live/)

## Code Examples

Verified patterns from official sources:

### Modal Dialog with Complete ARIA and Focus Management

```tsx
// Portfolio.tsx enhanced with accessibility features
import { useState, useEffect, useCallback, useRef } from 'react'
import { FocusTrap } from 'focus-trap-react'
import portfolioData, { PortfolioItem } from '../../data/portfolioData'

interface PortfolioDialogProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({ item, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      // Store triggering element for focus restoration
      triggerRef.current = document.activeElement as HTMLElement

      dialog.showModal()

      // Focus close button immediately (user can Tab forward from there)
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 0)
    } else if (dialog.open) {
      dialog.close()

      // Return focus to portfolio card that opened modal
      triggerRef.current?.focus()
    }
  }, [isOpen])

  if (!item) return null

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        initialFocus: closeButtonRef,
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        allowOutsideClick: true,
        returnFocusOnDeactivate: true,
      }}
    >
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-4 max-w-4xl w-full h-[90vh]"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full h-full overflow-hidden relative flex flex-col">
          {/* Close button - first in tab order */}
          <button
            ref={closeButtonRef}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex justify-center items-center text-gray-600 dark:text-gray-400 text-xl font-bold cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>

          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 p-6 flex-shrink-0">
            <div className="flex-1">
              <h2 id="dialog-title" className="content-h2">{item.project}</h2>
              <p id="dialog-description" className="text-lg mb-3 text-gray-700 dark:text-gray-300">
                {item.caption}
              </p>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 px-6 space-y-6 overflow-y-auto">
            <section aria-labelledby="challenge-heading">
              <h3 id="challenge-heading" className="subsection-header">Challenge</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.challenge}</p>
            </section>

            <section aria-labelledby="solution-heading">
              <h3 id="solution-heading" className="subsection-header">Solution</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.solution}</p>
            </section>

            <section aria-labelledby="impact-heading">
              <h3 id="impact-heading" className="subsection-header">Impact</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.impact}</p>
            </section>
          </div>

          {/* Footer */}
          <div className="flex flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button text-sm px-4 py-2"
              >
                Visit Project
                <span className="sr-only">(opens in new window)</span>
              </a>
            )}
          </div>
        </div>
      </dialog>
    </FocusTrap>
  )
}
```

**Source:** [WAI-ARIA Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/), [focus-trap-react docs](https://github.com/focus-trap/focus-trap-react)

### Keyboard Navigation Testing Pattern

```typescript
// Portfolio.a11y.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import Portfolio from './Portfolio'

describe('Portfolio - Keyboard Navigation', () => {
  it('opens modal on Enter key', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    const firstCard = screen.getAllByRole('article')[0]
    firstCard.focus()
    await user.keyboard('{Enter}')

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('closes modal on Escape key', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    const firstCard = screen.getAllByRole('article')[0]
    await user.click(firstCard)

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('traps focus within modal', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    const firstCard = screen.getAllByRole('article')[0]
    await user.click(firstCard)

    const closeButton = screen.getByRole('button', { name: /close dialog/i })
    const visitLink = screen.queryByRole('link', { name: /visit project/i })

    // Tab should cycle: close button -> content -> footer -> back to close button
    closeButton.focus()
    expect(document.activeElement).toBe(closeButton)

    await user.keyboard('{Tab}')
    // Focus should be on next element (content or link)
    expect(document.activeElement).not.toBe(firstCard) // Should NOT escape to card

    // Shift+Tab should reverse
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(document.activeElement).toBe(closeButton)
  })

  it('returns focus to triggering element on close', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    const firstCard = screen.getAllByRole('article')[0]
    firstCard.focus()
    await user.keyboard('{Enter}')

    const closeButton = screen.getByRole('button', { name: /close dialog/i })
    await user.click(closeButton)

    expect(document.activeElement).toBe(firstCard)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Portfolio />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Source:** [Testing Library User Event](https://testing-library.com/docs/user-event/intro), [vitest-axe examples](https://github.com/chaance/vitest-axe/blob/main/README.md)

### Screen Reader Only Text Utility

```tsx
// src/components/a11y/VisuallyHidden.tsx
import { ReactNode } from 'react'

interface VisuallyHiddenProps {
  children: ReactNode
}

/**
 * Visually hides content while keeping it accessible to screen readers.
 * Use for descriptive text that would be redundant visually but helpful for AT users.
 *
 * Example: <VisuallyHidden>(opens in new window)</VisuallyHidden>
 */
const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return <span className="sr-only">{children}</span>
}

export default VisuallyHidden

// Tailwind CSS (already exists in most Tailwind setups)
// .sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border-width: 0;
// }
```

**Usage:**
```tsx
<a href={item.link} target="_blank" rel="noopener noreferrer">
  Visit Project
  <VisuallyHidden>(opens in new window)</VisuallyHidden>
</a>
```

**Source:** [WebAIM Invisible Content](https://webaim.org/techniques/css/invisiblecontent/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jest-axe | vitest-axe | 2023 | Vitest ecosystem standard, avoids Jest/Vitest type conflicts |
| Manual ARIA testing | Automated axe-core integration | 2020-2024 | 30-40% of issues caught automatically, prevents regressions |
| Custom focus trap implementations | focus-trap-react library | 2018-present | Handles edge cases (radio groups, iframes, shadow DOM), battle-tested |
| WCAG 2.1 AA compliance | WCAG 2.2 AA compliance | 2023 | Added 9 new success criteria, including 2.4.13 Focus Appearance (stricter focus indicators) |
| react-aria-modal (custom dialog) | Native HTML `<dialog>` + ARIA | 2022-2024 | Browser support matured, simpler implementation, smaller bundles |
| Separate test files for a11y | Integrated a11y tests per component | 2024-2026 trend | Accessibility treated as core requirement, not separate concern |

**Deprecated/outdated:**
- **jest-axe**: Replaced by vitest-axe for Vitest projects (2023)
- **WCAG 2.1 AA as target**: WCAG 2.2 AA is current standard (published Oct 2023), includes stricter focus appearance requirements
- **Happy DOM for accessibility testing**: Incompatible with axe-core (Node.prototype.isConnected bug), use jsdom instead

## Open Questions

Things that couldn't be fully resolved:

1. **Heading hierarchy in current codebase**
   - What we know: App.tsx has multiple h1 elements (line 29 "Hey, I'm AJ", line 53 "About Me"), portfolio has section h1 "Portfolio"
   - What's unclear: Is there a site-wide h1 strategy? Should hero section h1 be site-wide, or should each section have h1?
   - Recommendation: Audit complete heading structure, likely change section titles to h2, keep single h1 per page (hero "Hey, I'm AJ")

2. **Current focus indicator implementation**
   - What we know: Navbar has custom focus styles (focus:outline-none focus:ring-2 focus:ring-white)
   - What's unclear: Are these styles applied globally? Do they meet 3:1 contrast ratio in all contexts?
   - Recommendation: Audit all focus styles with contrast checker, extract to global CSS utility classes

3. **Portfolio modal current ARIA attributes**
   - What we know: Native `<dialog>` element used (line 74 Portfolio.tsx), has close button
   - What's unclear: Missing aria-modal="true", missing aria-labelledby, focus management incomplete (no focus trap, no return focus)
   - Recommendation: High-priority enhancement - add ARIA attributes, implement focus trap, test with screen reader

4. **Three.js background screen reader behavior**
   - What we know: ThreeBackground.tsx has decorative canvas animation, no aria-hidden currently
   - What's unclear: How do screen readers currently handle the canvas? Does it cause navigation confusion?
   - Recommendation: Add aria-hidden="true" to canvas, test with NVDA (verify it's skipped in browse mode)

5. **Color contrast compliance**
   - What we know: Custom colors defined (--carolina-blue: #0b8bd5, --russian-green: #5b9a63, dark variants)
   - What's unclear: Have these been tested for WCAG AA contrast ratios against all backgrounds?
   - Recommendation: Systematic audit using WebAIM Contrast Checker or Contrastly, document passing combinations

## Sources

### Primary (HIGH confidence)
- [vitest-axe GitHub Repository](https://github.com/chaance/vitest-axe) - Setup and API documentation
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing) - @axe-core/playwright integration
- [WAI-ARIA Authoring Practices Guide: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) - Official ARIA modal requirements
- [focus-trap-react GitHub Repository](https://github.com/focus-trap/focus-trap-react) - Focus trap implementation
- [W3C WCAG 2.2 Success Criterion 2.4.13: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) - Focus indicator requirements
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/) - WCAG contrast ratio requirements
- [WebAIM: Skip Navigation Links](https://webaim.org/techniques/skipnav/) - Skip link implementation
- [MDN: aria-hidden attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden) - Canvas accessibility
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) - Animation accessibility

### Secondary (MEDIUM confidence)
- [TestParty: Screen Reader Testing Guide](https://testparty.ai/blog/screen-reader-testing-guide) - NVDA and VoiceOver workflows
- [Contrastly - Tailwind Color Contrast Checker](https://www.contrastly.yokotools.dev/) - Tailwind-specific audit tool
- [The A11Y Collective: Modal Accessibility](https://www.a11y-collective.com/blog/modal-accessibility/) - ARIA modal best practices
- [CSS-Tricks: How to Create a Skip to Content Link](https://css-tricks.com/how-to-create-a-skip-to-content-link/) - Skip link patterns
- [W3C: Headings Tutorial](https://www.w3.org/WAI/tutorials/page-structure/headings/) - Semantic heading guidance

### Tertiary (LOW confidence - WebSearch only)
- [BrowserStack: Automating Accessibility Testing](https://www.browserstack.com/guide/automate-accessibility-testing) - Overview of automated testing limitations
- [Applause: Why Automated Tools Miss So Much](https://www.applause.com/blog/why-automated-accessibility-testing-tools-miss-so-much/) - Common pitfalls automated testing misses

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - vitest-axe, @axe-core/playwright, focus-trap-react are industry-standard solutions with official documentation
- Architecture: HIGH - Patterns verified against W3C WAI-ARIA Authoring Practices Guide and MDN documentation
- Pitfalls: MEDIUM-HIGH - Derived from combination of official documentation, recent blog posts, and codebase analysis

**Research date:** 2026-01-30
**Valid until:** Approximately 6 months (accessibility standards are relatively stable, but tool versions and browser support evolve)
**WCAG version researched:** 2.2 Level AA (published October 2023, current as of 2026)
