import { describe, it, expect } from 'vitest'

describe('Test infrastructure', () => {
  it('vitest runs', () => {
    expect(1 + 1).toBe(2)
  })

  it('matchMedia mock works', () => {
    expect(window.matchMedia).toBeDefined()
    expect(window.matchMedia('(prefers-color-scheme: dark)')).toBeDefined()
  })

  it('localStorage mock works', () => {
    localStorage.setItem('test', 'value')
    expect(localStorage.setItem).toHaveBeenCalledWith('test', 'value')
  })
})
