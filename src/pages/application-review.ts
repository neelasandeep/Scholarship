import { expect, Page } from '@playwright/test';
import { CommonUtils } from '../utils/commonUtils';
import path from 'path';

export class ApplicationReview {
  private page: Page;
 

  constructor(page: Page) {
    this.page = page;
  }

  async fillStageOneDetails(){
    await this.page.getByPlaceholder('Enter your state').click();
    await this.page.getByText('Alaska').click();
    await this.page.getByPlaceholder('Enter your city').fill('Hyderabad');
    await this.page.getByPlaceholder('Enter your zip code').fill('90001');
    await this.page.getByPlaceholder('Enter your country').click();
    await this.page.getByText('Afghanistan').click();
    await this.page.getByPlaceholder('Enter your street address').fill('hhfhf');
    await this.page.getByPlaceholder('Enter additional street').fill('hdhd');
    await this.page.getByRole('button', { name: 'Next Page' }).click();
    await expect(this.page.getByRole('button', { name: 'Add Entry' })).toBeVisible();
  }

  async fillSecondStageDetails(){
     await this.page.getByRole('button', { name: 'Next Page' }).click();
        await expect( this.page.getByText('Please add at least 2 entries')).toBeVisible();
        for (let i = 0; i < 4; i++) {
        await this.addData(this.page);
        }
        await this.page.getByRole('button', { name: 'Next Page' }).click();
        await expect(this.page.getByPlaceholder('Please enter the name of your')).toBeVisible();
  }

  async addData(page: Page){
    await page.getByRole('button', { name: 'Add Entry' }).click();
    await page.getByPlaceholder('Short Input').fill(CommonUtils.generateRandomText(5));
    await page.getByPlaceholder('123').fill(String(CommonUtils.generateRandomNumber()));
    await page.getByLabel('List any leadership roles,').fill(CommonUtils.generateRandomText(7));
    await page.getByLabel('Description of Involvement *').fill(CommonUtils.generateRandomText(8));
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.waitForTimeout(3000);  
      
  }

  async fillThirdStageDetails(){
    await this.page.getByPlaceholder('Please enter the name of your').fill('fff');
    await this.page.getByPlaceholder('Enter high school street').fill('ff');
    await this.page.getByPlaceholder('Enter additional high school').fill('ggh');
    await this.page.getByPlaceholder('Enter high school city').fill('hh');
    await this.page.getByPlaceholder('Enter high school state').click();
    await this.page.getByRole('option', { name: 'Alaska' }).click();
    await this.page.getByPlaceholder('e.g. 55413').fill('9000');
    await this.page.getByPlaceholder('Enter your current GPA').fill('5');
    
    await this.page.getByPlaceholder('Enter a date').fill('2025');
   
    const filePath = path.join(process.cwd(), 'src', 'test-data', 'school-transcript.pdf');
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
     
    await this.page.getByRole('button', { name: 'Next Page' }).click();
    await expect(this.page.getByLabel('Cars')).toBeVisible();
  }

 

}