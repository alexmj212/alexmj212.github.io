import { describe, it, expect, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import ThreeBackground from './ThreeBackground'

// Memory API types (Chrome-specific)
interface PerformanceMemory {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

interface PerformanceWithMemory extends Performance {
  memory?: PerformanceMemory
}

describe('ThreeBackground memory', () => {
  it('does not leak memory after 5 mount/unmount cycles', async () => {
    const perf = performance as PerformanceWithMemory

    // Check if memory API available (Chrome only)
    if (!perf.memory) {
      console.warn('performance.memory not available, skipping memory test')
      return
    }

    // Take initial measurement after GC attempt
    if (typeof gc === 'function') {
      gc()
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
    const initialMemory = perf.memory.usedJSHeapSize

    // Perform 5 mount/unmount cycles (per CONTEXT.md)
    const cycles = 5
    for (let i = 0; i < cycles; i++) {
      const { unmount } = render(<ThreeBackground />)

      // Allow time for Three.js to initialize
      await new Promise((resolve) => setTimeout(resolve, 500))

      unmount()
      cleanup()

      // Allow time for cleanup
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // Force GC if available
    if (typeof gc === 'function') {
      gc()
    }
    await new Promise((resolve) => setTimeout(resolve, 500))

    const finalMemory = perf.memory.usedJSHeapSize
    const heapGrowth = finalMemory - initialMemory
    const heapGrowthMB = heapGrowth / (1024 * 1024)

    console.log(`Memory test results:`)
    console.log(`  Initial: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`)
    console.log(`  Final: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`)
    console.log(`  Growth: ${heapGrowthMB.toFixed(2)} MB`)

    // Per CONTEXT.md: <5MB threshold for test environment
    const THRESHOLD_MB = 5
    expect(heapGrowthMB).toBeLessThan(THRESHOLD_MB)
  }, 60000) // 60 second timeout for memory test

  it('verifies WebGL context is released each cycle', async () => {
    const cycles = 3 // Fewer cycles for this specific test

    for (let i = 0; i < cycles; i++) {
      const { container, unmount } = render(<ThreeBackground />)

      await new Promise((resolve) => setTimeout(resolve, 200))

      const canvas = container.querySelector('canvas') as HTMLCanvasElement
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')

      unmount()
      cleanup()

      await new Promise((resolve) => setTimeout(resolve, 200))

      // After unmount, context should be lost (verifies forceContextLoss called)
      if (gl) {
        expect(gl.isContextLost()).toBe(true)
      }
    }
  }, 30000)

  it('verifies dispose was called by checking no WebGL warnings', async () => {
    // Spy on console.warn to detect WebGL context limit warnings
    const warnSpy = vi.spyOn(console, 'warn')

    const cycles = 5
    for (let i = 0; i < cycles; i++) {
      const { unmount } = render(<ThreeBackground />)
      await new Promise((resolve) => setTimeout(resolve, 300))
      unmount()
      cleanup()
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Check no WebGL context warnings (would occur if dispose not called)
    const webglWarnings = warnSpy.mock.calls.filter(
      call => typeof call[0] === 'string' &&
        (call[0].includes('WebGL') || call[0].includes('context'))
    )

    expect(webglWarnings.length).toBe(0)
    warnSpy.mockRestore()
  }, 45000)
})
