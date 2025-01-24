import { Page } from '@playwright/test';

export class ApplicationPage1 {
  private page: Page;
  private selectors = {
    programSelector: '#programSelect',
    beginSelector: 'div[data-testid="tile"] button:nth-child(2) span.mantine-Button-inner',
    requiredFields: {
      address: 'input[name="contact.address"]',
      street: 'input[name="contact.address1"]',
      state: 'input[placeholder="Enter your state"]',
      city: 'input[name="contact.city"]',
      zip: 'input[name="contact.zip"]',
      country: 'input[placeholder="Enter your country"]'
    }
  };

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(programSlug: string) {
    await this.page.goto(`/program/${programSlug}`);
  }

  async beginApplication(){
    await this.page.click(this.selectors.beginSelector);
    await this.page.getByRole('button', { name: 'Start New Application' }).click();
    
  }
  async fillRequiredFields(data: Record<string, string>) {
    await this.page.waitForSelector(this.selectors.requiredFields.address);
    for (const [field, selector] of Object.entries(this.selectors.requiredFields)) {
        if(["country", "state"].includes(field)){
           await  this.handleDropdownWithFirstSelection(selector,data[field])
        }
      await this.page.fill(selector, data[field]);
    }
   
    await this.page.getByRole('button', { name: 'Next Page' }).click();
  }

  private async handleDropdownWithFirstSelection(selector: string, value: string) {
   
    // Click to open dropdown
    await this.page.click(selector);
  
    // Select first matching option after typing
    await this.page.fill(selector, value);
    
    // Press down arrow to highlight first option
    await this.page.keyboard.press('ArrowDown');
    
    // Press Enter to select first option
    await this.page.keyboard.press('Enter');
  }

}