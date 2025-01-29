import { expect, Page } from '@playwright/test';

export class RegistrationPage {
  private page: Page;
  
 
  constructor(page: Page) {
    this.page = page;
  }



  async registeruser(randomEmail: string, fullName: string, randomPhone: string, password: string){
    await this.page.goto('/login');
    await this.page.getByPlaceholder('Email Address').fill(randomEmail);
    await this.page.getByLabel('Next').click();
    
    await this.page.getByLabel('First Name').fill(fullName.split(" ")[0]);
    await this.page.getByLabel('Last Name').fill(fullName.split(" ")[1]);
    
    await this.page.getByPlaceholder('1 (702) 123-').fill(randomPhone);
    
    await this.page.getByLabel('Create a Password').fill(password);
    await this.page.getByLabel('I confirm that I am at least').check();
    await expect(this.page.getByLabel('I confirm that I am at least')).toBeChecked();
    await this.page.getByLabel('Submit').click();
    await this.page.getByLabel('Loading').locator('span').nth(2).waitFor({ state: 'hidden' }); 
    
    await this.page.goto('/program/sdet-test-scholarship');
    await expect(this.page.getByRole('button', { name: 'Begin' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Begin' }).click();
  }
}