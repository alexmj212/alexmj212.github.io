import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    // Enable globals for describe/it/expect without imports
    globals: true,

    // Setup file for mocks and cleanup
    setupFiles: ['./src/test/setup.ts'],

    // Default environment for unit tests
    environment: 'jsdom',

    // Include test file patterns
    include: ['src/**/*.test.{ts,tsx}'],

    // Exclude browser tests from default run (separate project)
    exclude: ['src/**/*.browser.test.{ts,tsx}', 'node_modules'],

    // Coverage configuration (from CONTEXT.md: global 70% threshold)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.config.ts',
        '**/*.test.{ts,tsx}',
        'src/test/**',
        'src/react-app-env.d.ts',
        'src/vite-env.d.ts',
        'src/setupTests.ts', // Old test setup file
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
})
