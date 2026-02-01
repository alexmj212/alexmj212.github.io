import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';

test.describe('Portfolio browsing flow', () => {
  test('can open project modal, view details, and close', async ({ page }) => {
    const home = new HomePage(page);
    const portfolio = new PortfolioPage(page);

    await home.goto();
    await home.navigateToSection('Portfolio');
    await expect(home.portfolioSection).toBeInViewport();

    // Open first project
    await portfolio.openProject(0);

    // Verify modal has content
    await expect(portfolio.portfolioModal).toBeVisible();
    await expect(portfolio.portfolioModal.getByRole('heading', { level: 2 })).toBeVisible();

    // Close with close button
    await portfolio.closeModal();
  });

  test('can close modal with Escape key', async ({ page }) => {
    const home = new HomePage(page);
    const portfolio = new PortfolioPage(page);

    await home.goto();
    await portfolio.openProject(0);
    await portfolio.closeModalWithEscape();
  });
});
