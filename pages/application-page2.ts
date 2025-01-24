import { Page, expect } from '@playwright/test';

export class ApplicationPage2 {
  private page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  async validateMinimumActivities() {
    await (this.page.getByRole('button', { name: 'Next Page' })).waitFor({state: "attached"})
    await this.page.getByRole('button', { name: 'Next Page' }).click();
    await expect(this.page.getByText('Please add at least 2 entries')).toBeVisible();

  }

  async addActivities(activities: Array<{name: string,id:string, roles:string, description: string}>) {
    
    for (const activity of activities) {
      await this.page.getByRole('button', { name: 'Add', exact: true }).click();
      await this.page.getByRole('button', { name: 'Add Entry' }).click();
     await this.page.getByPlaceholder('Short Input').fill(activity.name);
     await this.page.getByPlaceholder('123').fill(activity.id);
     await this.page.getByLabel('List any leadership roles,').fill(activity.roles);
     await this.page.getByLabel('Description of Involvement *').fill(activity.description);
     await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    
        }
    await this.page.getByRole('button', { name: 'Next Page' }).click();
    }
}