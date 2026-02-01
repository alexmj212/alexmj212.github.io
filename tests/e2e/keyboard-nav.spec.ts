import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Keyboard navigation', () => {
  test('skip link works and is first focusable element', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Tab to first focusable element - should be skip link
    await page.keyboard.press('Tab');
    await expect(home.skipLink).toBeFocused();
    await expect(home.skipLink).toBeVisible();

    // Activate skip link
    await page.keyboard.press('Enter');

    // Focus should move to main content area
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('Tab navigates through interactive elements', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Tab through several elements and verify focus moves
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    // Verify some element has focus (not body)
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).not.toBe('BODY');
  });

  test('focus indicators are visible on keyboard navigation', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Tab to an interactive element
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check that focused element has visible outline
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Verify outline style exists (focus-visible CSS)
    const outlineStyle = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.outlineStyle;
    });
    expect(outlineStyle).not.toBe('none');
  });
});
