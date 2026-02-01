import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly navbar: Locator;
  readonly skipLink: Locator;
  readonly aboutSection: Locator;
  readonly portfolioSection: Locator;
  readonly skillsSection: Locator;
  readonly experienceSection: Locator;
  readonly darkModeToggle: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.getByRole('heading', { name: /hey, i'm aj/i });
    this.navbar = page.getByRole('navigation', { name: 'Main navigation' });
    this.skipLink = page.getByRole('link', { name: /skip to main content/i });
    this.aboutSection = page.locator('#about');
    this.portfolioSection = page.locator('#portfolio');
    this.skillsSection = page.locator('#skills');
    this.experienceSection = page.locator('#experience');
    this.darkModeToggle = page.getByRole('button', { name: /switch to (light|dark) mode/i });
    this.mobileMenuButton = page.getByRole('button', { name: /open main menu|close main menu/i });
    this.mobileMenu = page.locator('#mobile-menu');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.heroTitle).toBeVisible();
  }

  async navigateToSection(section: string) {
    await this.page.getByRole('link', { name: section }).first().click();
  }

  async toggleDarkMode() {
    await this.darkModeToggle.first().click();
  }

  async isDarkMode(): Promise<boolean> {
    return this.page.locator('html').evaluate(el => el.classList.contains('dark'));
  }
}
