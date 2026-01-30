import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNavbar = () => {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

describe('Navbar - Accessibility (A11Y-12)', () => {
  it('has no accessibility violations', async () => {
    const { container } = renderNavbar()
    // Disable color-contrast rule as jsdom doesn't support canvas getContext
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false }
      }
    })
    // Assert no violations (manual check since toHaveNoViolations may not be available)
    expect(results.violations).toEqual([])
  })

  it('has accessible navigation landmark', () => {
    renderNavbar()
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()
  })

  it('mobile menu button has accessible name and aria-expanded', () => {
    renderNavbar()
    const menuButton = screen.getByLabelText(/open main menu/i)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('dark mode toggle has accessible label', () => {
    renderNavbar()
    // Desktop dark mode toggle
    const toggles = screen.getAllByLabelText(/switch to (dark|light) mode/i)
    expect(toggles.length).toBeGreaterThan(0)
  })
})
