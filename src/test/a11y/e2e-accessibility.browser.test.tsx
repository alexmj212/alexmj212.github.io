import { describe, it, expect } from 'vitest'
import axe from 'axe-core'

describe('E2E Accessibility (A11Y-10)', () => {
  it('homepage has no WCAG AA violations', async () => {
    // This test runs in Vitest browser mode with a real Chromium browser
    // The page is already loaded by Vitest's dev server

    // Wait for app to be fully loaded
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true)
      } else {
        window.addEventListener('load', () => resolve(true))
      }
    })

    // Run axe-core accessibility scan on the entire page
    const results = await axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] }
    })

    // Log any violations for debugging
    if (results.violations.length > 0) {
      console.error('Accessibility violations found:', results.violations.length)
      results.violations.forEach(violation => {
        console.error(`- ${violation.id}: ${violation.help}`)
        console.error(`  Impact: ${violation.impact}`)
        console.error(`  Elements: ${violation.nodes.length}`)
      })
    }

    expect(results.violations).toEqual([])
  })
})
