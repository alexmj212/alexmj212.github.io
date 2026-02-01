import { type Page, type Locator, expect } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;
  readonly portfolioCards: Locator;
  readonly portfolioModal: Locator;
  readonly modalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.portfolioCards = page.locator('#portfolio').getByRole('listitem');
    this.portfolioModal = page.getByRole('dialog');
    this.modalCloseButton = this.portfolioModal.getByRole('button', { name: /close/i });
  }

  async openProject(index = 0) {
    await this.portfolioCards.nth(index).getByRole('button').click();
    await expect(this.portfolioModal).toBeVisible();
  }

  async closeModal() {
    await this.modalCloseButton.click();
    await expect(this.portfolioModal).not.toBeVisible();
  }

  async closeModalWithEscape() {
    await this.page.keyboard.press('Escape');
    await expect(this.portfolioModal).not.toBeVisible();
  }

  async getProjectCount(): Promise<number> {
    return this.portfolioCards.count();
  }
}
