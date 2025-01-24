import { Page } from '@playwright/test';
import path from 'path';

export class ApplicationPage3 {
  private page: Page;
  private selectors = {
    formFields: {
      name: 'input[placeholder="Please enter the name of you"]',
      street:'input[placeholder="Enter high school street"]',
      school:'input[placeholder="Enter additional high school"]',
      city:'input[placeholder="Enter high school city"]',
      state:'input[placeholder="Enter high school state"]',
      zip:'input[placeholder="e.g. 55413"]',
      gpa:'input[placeholder="Enter your current GPA"]',
      transcriptUpload: "input[type='file']"

    }
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm(formData: Record<string, string>) {
    for (const [field, selector] of Object.entries(this.selectors.formFields)) {
        if(["country", "state"].includes(field)){
            await  this.handleDropdownWithFirstSelection(selector,formData[field])
         }

      if (field !== 'transcriptUpload') {
        await this.page.fill(selector, formData[field]);
        await this.page.getByPlaceholder('Enter a date').fill('2025');
      }
    }
  }

  async uploadTranscript(filePath: string) {
    const absolutePath = path.resolve(filePath);
    await this.page.setInputFiles(this.selectors.formFields.transcriptUpload, absolutePath);
    await this.page.click('button[type="next"]');
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