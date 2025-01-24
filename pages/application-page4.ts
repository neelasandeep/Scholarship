import { Page, expect } from '@playwright/test';

export class ApplicationPage4 {
  private page: Page;
  private selectors = {
    essayTopicCheckbox: (topic: string) => `input[value="${topic}"]`,
    essayTextarea: (topic: string) => `textarea[name="${topic.toLowerCase()}-essay"]`
  };

  constructor(page: Page) {
    this.page = page;
  }

  async validateEssayOptions() {
    const topics = ['Cars', 'Animals', 'School', 'Other'];
    for (const topic of topics) {
      await this.page.click(this.selectors.essayTopicCheckbox(topic));
      const essayTextarea = this.page.locator(this.selectors.essayTextarea(topic));
      await expect(essayTextarea).toBeVisible();
    }
  }

  async selectEssayTopics(topics: string[]) {
    for (const topic of topics) {
      await this.page.click(this.selectors.essayTopicCheckbox(topic));
    }
  }

  async writeEssays(essays: Record<string, string>) {
    for (const [topic, content] of Object.entries(essays)) {
      await this.page.fill(this.selectors.essayTextarea(topic), content);
    }
    await this.page.click('button[type="next"]');
  }
}