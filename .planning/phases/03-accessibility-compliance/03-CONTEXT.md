# Phase 3: Accessibility Compliance - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Achieve WCAG 2.1 AA compliance for the portfolio site. This includes:
- Keyboard navigation for all interactive elements (Tab, Enter, Escape)
- Screen reader support with proper ARIA labels and announcements
- Focus management (visible indicators, logical tab order, modal focus traps)
- Color contrast meeting WCAG AA standards (4.5:1 for normal text)
- Automated accessibility testing with vitest-axe and @axe-core/playwright
- Semantic HTML with proper heading hierarchy and landmark regions

This phase establishes accessibility compliance. Performance optimization and CI integration are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Focus Management Strategy

- **Focus indicator style:** Subtle outline (browser default enhanced)
  - 2px solid outline in accent color
  - Respects user preferences
  - Minimal visual impact while meeting WCAG standards

- **Modal open behavior:** Focus moves to modal close button
  - Immediate access to dismiss modal
  - Users can Tab forward to content from there

- **Modal close behavior:** Focus returns to the portfolio card that opened it
  - User can continue browsing from where they left off
  - Maintains context and position in portfolio grid

- **Focus trap in modal:** Yes — strict trap
  - Tab/Shift+Tab cycles only within modal (close button → content → close button)
  - Must use Escape or close button to exit modal
  - Prevents focus from escaping to background content

### Keyboard Navigation Patterns

- **Portfolio card navigation:** Tab only (standard)
  - Tab/Shift+Tab moves between cards
  - Enter opens modal
  - Simple, predictable, follows web conventions

- **Skip links:** Visible only on focus
  - Appears when Tab is pressed
  - Hidden otherwise (doesn't affect visual design)
  - Standard "Skip to content" pattern

- **Custom keyboard shortcuts:** None — standard keys only
  - Tab, Enter, Escape, Space
  - No custom shortcuts (Ctrl+D for theme, number keys for nav, etc.)
  - Simplest and most predictable experience

- **Tab order on route changes:** Reset to top on route change
  - Focus moves to skip link or first heading when navigating between routes
  - Clean slate each time (Home → Resume → Cover Letter)
  - No position preservation across routes

### Semantic Structure & Landmarks

- **Portfolio cards markup:** Articles in a list
  - `<ul>` with `<li><article>` for each card
  - Each project is independent content deserving article tag
  - List provides structure for screen readers

- **Landmark granularity:** Minimal — core regions only
  - header, nav, main, footer
  - Major sections (portfolio, skills, experience) are content within main
  - Avoids landmark overload

- **Heading hierarchy:** Strict hierarchy (WCAG best)
  - h1 > h2 > h3, no skipped levels
  - Visual sizing adjusted with CSS if needed
  - Follows WCAG heading hierarchy rules

- **Three.js background accessibility:** ARIA hidden with context
  - `aria-hidden="true"` on canvas element
  - Parent container has `aria-label` describing it as decorative
  - Screen readers skip it entirely (purely decorative, not content)

### Claude's Discretion

- Color contrast audit methodology (manual vs automated tools)
- Specific ARIA label wording for interactive elements
- Exact positioning and styling of skip links
- Screen reader announcement patterns for dynamic content
- Testing approach with NVDA and VoiceOver
- Focus indicator color selection (as long as it meets contrast requirements)

</decisions>

<specifics>
## Specific Ideas

No specific references or "I want it like X" moments. User prefers standard, predictable patterns that follow WCAG guidelines and web conventions.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-accessibility-compliance*
*Context gathered: 2026-01-30*
