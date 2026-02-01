import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Theme toggle', () => {
  test('can toggle between light and dark mode', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Check initial state
    const initialDark = await home.isDarkMode();

    // Toggle theme
    await home.toggleDarkMode();

    // Verify theme changed
    const afterToggle = await home.isDarkMode();
    expect(afterToggle).not.toBe(initialDark);

    // Toggle back
    await home.toggleDarkMode();
    const afterSecondToggle = await home.isDarkMode();
    expect(afterSecondToggle).toBe(initialDark);
  });

  test('theme persists across page reload', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Set to dark mode
    const isDark = await home.isDarkMode();
    if (!isDark) {
      await home.toggleDarkMode();
    }
    expect(await home.isDarkMode()).toBe(true);

    // Reload page
    await page.reload();
    await expect(home.heroTitle).toBeVisible();

    // Should still be dark
    expect(await home.isDarkMode()).toBe(true);
  });
});
