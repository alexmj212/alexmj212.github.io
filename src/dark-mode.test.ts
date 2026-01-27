import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setTheme, toggleTheme, getTheme, initializeThemeDetection, themeOptions } from './dark-mode'

describe('dark-mode', () => {
  beforeEach(() => {
    // Clear any existing dark class
    document.documentElement.classList.remove('dark')
    // Clear localStorage theme property
    delete (localStorage as any).theme
    // Reset matchMedia mock
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
    delete (localStorage as any).theme
  })

  describe('setTheme', () => {
    it('sets dark theme by adding class and updating localStorage', () => {
      setTheme(themeOptions.DARK)

      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorage.theme).toBe('dark')
    })

    it('sets light theme by removing class and updating localStorage', () => {
      // First set dark
      document.documentElement.classList.add('dark')

      setTheme(themeOptions.LIGHT)

      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(localStorage.theme).toBe('light')
    })
  })

  describe('toggleTheme', () => {
    it('toggles from light to dark when localStorage has light', () => {
      localStorage.theme = 'light'

      toggleTheme()

      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorage.theme).toBe('dark')
    })

    it('toggles from dark to light when localStorage has dark', () => {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')

      toggleTheme()

      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(localStorage.theme).toBe('light')
    })

    it('initializes theme detection when localStorage has no theme', () => {
      // Remove theme from localStorage
      delete (localStorage as any).theme

      // Mock matchMedia to return dark preference
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })

      toggleTheme()

      // Should have initialized based on system preference
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  describe('getTheme', () => {
    it('returns current theme from localStorage', () => {
      localStorage.theme = 'dark'

      expect(getTheme()).toBe('dark')
    })

    it('returns undefined when no theme set', () => {
      delete (localStorage as any).theme

      expect(getTheme()).toBeUndefined()
    })
  })

  describe('initializeThemeDetection', () => {
    it('sets dark theme when localStorage has dark', () => {
      localStorage.theme = 'dark'

      initializeThemeDetection()

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('sets light theme when localStorage has light', () => {
      localStorage.theme = 'light'
      document.documentElement.classList.add('dark')

      initializeThemeDetection()

      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('uses system preference when no localStorage theme (dark)', () => {
      delete (localStorage as any).theme

      // Mock system prefers dark
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })

      initializeThemeDetection()

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('uses light when no localStorage and system prefers light', () => {
      delete (localStorage as any).theme

      // Mock system prefers light
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })

      initializeThemeDetection()

      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('registers listener for system theme changes', () => {
      delete (localStorage as any).theme

      const addEventListenerMock = vi.fn()
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })

      initializeThemeDetection()

      expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
    })
  })

  describe('themeOptions enum', () => {
    it('has DARK and LIGHT values', () => {
      expect(themeOptions.DARK).toBe('dark')
      expect(themeOptions.LIGHT).toBe('light')
    })
  })
})
