import { Page, expect } from '@playwright/test';

export class SubmitApplication {
  private page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  async submitDetails(){
    await this.page.getByLabel('Cars').check();
    await this.page.getByPlaceholder('Long Input').fill('ttttt');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('button', { name: 'Next Page' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}