import { Page, expect } from '@playwright/test';

export class ReviewPage {
  private page: Page;
  private selectors = {
    completedSections: '[data-testid="completed-section"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async validateAllPagesAnswered() {
    const completedSections = await this.page.locator(this.selectors.completedSections);
    const totalSections = await this.page.locator('[data-testid="application-section"]').count();
    
    await expect(completedSections).toHaveCount(totalSections);
  }

  async proceedToSubmission() {
    await this.page.click('button[type="submit"]');
  }
}