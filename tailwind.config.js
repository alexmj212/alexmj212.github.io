const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./_site/**/*.html",
    "./index.html",
    "./blog.html", 
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/**/*.md"
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: {
          DEFAULT: colors.gray[700],
          dark: colors.gray[900],
        },
        white: {
          DEFAULT: colors.white,
          dark: colors.gray[300],
        },
        blue: colors.blue,
        gray: colors.gray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        accent1: {
          DEFAULT: "var(--carolina-blue)",
          dark: "var(--carolina-blue-dark)",
        },
        accent2: {
          DEFAULT: "var(--russian-green)",
          dark: "var(--russian-green-dark)",
        },
        accent3: {
          DEFAULT: "var(--ruby-red)",
          dark: "var(--ruby-red-dark)",
        },
        panel: {
          DEFAULT: colors.white,
          dark: colors.gray[800],
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        // Keep existing for compatibility
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans2: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        header: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Fluid responsive sizes
        'fluid-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 3rem)',
        'fluid-hero': 'clamp(2.5rem, 8vw, 5rem)',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'extra-wide': '0.25em',
      },
      lineHeight: {
        'extra-tight': '1.1',
        'super-tight': '1.2',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '1.75',
        'extra-loose': '2',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['dark']
    },
  },
  plugins: [],
};
