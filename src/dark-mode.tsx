export enum themeOptions {
  DARK = "dark",
  LIGHT = "light",
}

export function setTheme(theme: themeOptions) {
  switch (theme) {
    case themeOptions.DARK:
      document.documentElement.classList.add(themeOptions.DARK);
      localStorage.theme = themeOptions.DARK;
      break;
    default:
      document.documentElement.classList.remove(themeOptions.DARK);
      localStorage.theme = themeOptions.LIGHT;
      break;
  }
}

export function toggleTheme() {
  if ("theme" in localStorage) {
    if (localStorage.theme === themeOptions.LIGHT) {
      setTheme(themeOptions.DARK);
    } else {
      setTheme(themeOptions.LIGHT);
    }
  } else {
    initializeThemeDetection();
  }
}

export function getTheme(): string {
  return localStorage.theme;
}

export function initializeThemeDetection() {
  // Initialize theme from localStorage or system preference
  if (localStorage.theme === themeOptions.DARK ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(themeOptions.DARK);
  } else {
    setTheme(themeOptions.LIGHT);
  }

  // Listen to OS theme settings
  // Note: This listener persists for app lifetime - no cleanup needed
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      setTheme(themeOptions.DARK);
    } else {
      setTheme(themeOptions.LIGHT);
    }
  });
}
