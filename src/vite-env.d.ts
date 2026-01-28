/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Vite defines process.env.NODE_ENV at build time
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
  }
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'test'
  }
}

// V8 garbage collection function (available with --expose-gc flag)
// Used in memory leak tests to force garbage collection before heap measurement
declare function gc(): void
