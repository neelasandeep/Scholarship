import { Page, expect } from '@playwright/test';

export class SubmissionPage {
  private page: Page;
  private selectors = {
    submissionConfirmation: '[data-testid="submission-confirmation"]',
    editButtons: 'button[data-testid="edit-section"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async submit(): Promise<string> {
    await this.page.click('button[type="final-submit"]');
    await expect(this.page.locator(this.selectors.submissionConfirmation)).toBeVisible();
    return this.page.url();
  }

  async validateEditingDisabled() {
    const editButtons = await this.page.locator(this.selectors.editButtons);
    await expect(editButtons).toBeDisabled();
  }
}