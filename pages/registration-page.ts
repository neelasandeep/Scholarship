import { Page } from '@playwright/test';

export class RegistrationPage {
  private page: Page;
  private selectors = {
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: 'button[type="submit"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/register');
  }

  async registerNewUser(userData: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {
    await this.page.fill(this.selectors.firstNameInput, userData.firstName);
    await this.page.fill(this.selectors.lastNameInput, userData.lastName);
    await this.page.fill(this.selectors.emailInput, userData.email);
    await this.page.fill(this.selectors.passwordInput, userData.password);
    await this.page.click(this.selectors.submitButton);
  }
}