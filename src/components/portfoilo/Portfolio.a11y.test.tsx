import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { MemoryRouter } from 'react-router-dom'
import Portfolio from './Portfolio'

// Helper: render with router context (needed for any link components)
const renderPortfolio = () => {
  return render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>
  )
}

describe('Portfolio - Accessibility (A11Y-11)', () => {
  it('has no accessibility violations on initial render', async () => {
    const { container } = renderPortfolio()
    // Disable color-contrast rule as jsdom doesn't support canvas getContext
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false }
      }
    })
    // Assert no violations (manual check since toHaveNoViolations may not be available)
    expect(results.violations).toEqual([])
  })

  it('portfolio cards are keyboard accessible', () => {
    renderPortfolio()
    const cards = screen.getAllByRole('button')
    // Filter to portfolio card buttons (have aria-label with "project details")
    const portfolioCards = cards.filter(card =>
      card.getAttribute('aria-label')?.includes('project details')
    )
    expect(portfolioCards.length).toBeGreaterThan(0)
    // Buttons are naturally keyboard accessible, no need to check tabIndex
  })

  it('portfolio cards are wrapped in list structure', () => {
    renderPortfolio()
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThan(0)
  })
})
