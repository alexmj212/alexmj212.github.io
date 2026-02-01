import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Resume navigation', () => {
  test('can navigate to all resume sections', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Navigate to About
    await home.navigateToSection('About');
    await expect(home.aboutSection).toBeInViewport();

    // Navigate to Skills
    await home.navigateToSection('Skills');
    await expect(home.skillsSection).toBeInViewport();

    // Navigate to Experience
    await home.navigateToSection('Experience');
    await expect(home.experienceSection).toBeInViewport();
  });

  test('sections render meaningful content', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // About section has portrait and bio text
    await expect(home.aboutSection.getByRole('img', { name: /portrait/i })).toBeVisible();
    await expect(home.aboutSection.getByRole('heading', { name: /about me/i })).toBeVisible();

    // Skills section renders
    await expect(home.skillsSection.getByRole('heading', { name: /skills/i })).toBeVisible();

    // Experience section renders
    await expect(home.experienceSection.getByRole('heading', { name: /experience/i })).toBeVisible();
  });
});
