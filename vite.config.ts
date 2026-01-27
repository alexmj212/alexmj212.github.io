import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    minify: 'esbuild',
    esbuild: {
      // Remove console.log, console.debug, console.info, console.warn in production
      // KEEP console.error for production error tracking
      drop: ['debugger'],
      pure: ['console.log', 'console.debug', 'console.info', 'console.warn'],
    },
  },
  server: {
    port: 3000,
    open: false,
  },
})