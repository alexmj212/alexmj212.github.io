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

  if (localStorage.theme === themeOptions || (!('theme' in localStorage) &&window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(themeOptions.DARK);
  } else {
    setTheme(themeOptions.LIGHT);
  }
  // Listen to OS theme settings
  window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
    if (e.matches) {
      setTheme(themeOptions.DARK);
    } else {
      setTheme(themeOptions.LIGHT);
    }
  });
}
