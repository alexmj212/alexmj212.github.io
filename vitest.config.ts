import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Base configuration for workspace projects
// When vitest.workspace.ts exists, this serves as the shared base config
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

    // Environment for unit tests (jsdom for React components)
    environment: 'jsdom',

    // Test patterns
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['src/**/*.browser.test.{ts,tsx}', 'src/**/*.memory.test.{ts,tsx}'],

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
