import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Mobile menu interaction', () => {
  test('can open and close mobile menu', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Mobile menu button should be visible
    await expect(home.mobileMenuButton).toBeVisible();

    // Open menu
    await home.mobileMenuButton.click();
    await expect(home.mobileMenu).toBeVisible();
    await expect(home.mobileMenuButton).toHaveAttribute('aria-expanded', 'true');

    // Close menu
    await home.mobileMenuButton.click();
    await expect(home.mobileMenu).not.toBeVisible();
  });

  test('mobile menu navigation works', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Open menu and navigate
    await home.mobileMenuButton.click();
    await expect(home.mobileMenu).toBeVisible();

    // Click a nav link
    await home.mobileMenu.getByRole('menuitem', { name: 'Portfolio' }).click();

    // Menu should close after navigation
    await expect(home.mobileMenu).not.toBeVisible();
  });

  test('mobile menu closes on Escape', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.mobileMenuButton.click();
    await expect(home.mobileMenu).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(home.mobileMenu).not.toBeVisible();
  });
});
