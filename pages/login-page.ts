import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private selectors = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    nextbuutton: 'button#login-page__cta',
    // loginButton: 'button[type="submit"]',
    errorMessage: '[data-testid="login-error"]',
    forgotPasswordLink: 'a[href="/forgot-password"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.click(this.selectors.nextbuutton);
    await this.page.waitForSelector(this.selectors.passwordInput);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.nextbuutton);
    // await this.page.click(this.selectors.loginButton);
  }

  async validateSuccessfulLogin() {
    await expect(this.page).toHaveURL('applicant/applications');
  }

  async validateLoginError() {
    const errorElement = this.page.locator(this.selectors.errorMessage);
    await expect(errorElement).toBeVisible();
  }

  async forgotPassword(email: string) {
    await this.page.click(this.selectors.forgotPasswordLink);
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.click('button[type="reset-password"]');
  }

  async loginWithInvalidCredentials(email: string, password: string) {
    await this.login(email, password);
    await this.validateLoginError();
  }
}

