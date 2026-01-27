import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ReactElement, ReactNode } from 'react'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string
}

// Wrapper with MemoryRouter for components using react-router-dom
function AllProviders({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

// Custom render that wraps with providers
function customRender(
  ui: ReactElement,
  { initialRoute = '/', ...options }: CustomRenderOptions = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    ),
    ...options,
  })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { customRender as render }

// Also export the named version for clarity
export { customRender as renderWithProviders }
