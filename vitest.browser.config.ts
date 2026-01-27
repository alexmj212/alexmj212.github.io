import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { playwright } from '@vitest/browser-playwright'

// Browser testing configuration for WebGL and memory tests
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

    // Browser tests run in real Chromium with WebGL support
    browser: {
      enabled: true,
      provider: playwright({
        launch: {
          headless: true,
        },
      }),
      instances: [{ browser: 'chromium' }],
    },

    // Include only browser and memory test files
    include: ['src/**/*.browser.test.{ts,tsx}', 'src/**/*.memory.test.{ts,tsx}'],

    // Browser tests need longer timeout for WebGL setup
    testTimeout: 30000,
  },
})
