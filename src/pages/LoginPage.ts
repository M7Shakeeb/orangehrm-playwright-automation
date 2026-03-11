import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

/**
 * Page Object Model for OrangeHRM Login Page
 * Handles all interactions with the login page
 */
export class LoginPage {
  readonly page: Page;

  // Locators - defined once, used everywhere
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly loginPanel: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]').filter({ hasText: 'Login' });
    this.errorAlert = page.locator('.oxd-alert-content-text');
    this.loginPanel = page.locator('.orangehrm-login-slot');
    this.validationErrors = page.locator('.oxd-input-field-error-message');
  }

  // Navigate to login page
  async navigate() {
    await this.page.goto('/web/index.php/auth/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Verify login page is fully loaded and displayed
  async verifyLoginPageDisplayed() {
    await expect(this.loginPanel).toBeVisible({ timeout: 30000 });
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Enter text in username field
   * @param username - Username to enter
   */
  async enterUsername(username: string) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  /**
   * Enter text in password field
   * @param password - Password to enter
   */
  async enterPassword(password: string) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  // Click the login button
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Complete login flow with username and password
   * @param username - Username
   * @param password - Password
   */
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // Verify error alert is displayed
  async verifyErrorAlertDisplayed() {
    await expect(this.errorAlert).toBeVisible({ timeout: 30000 });
  }

  /**
   * Get error alert text content
   * @returns Error message text
   */
  async getErrorAlertText(): Promise<string> {
    await this.errorAlert.waitFor({ state: 'visible', timeout: 30000 });
    const text = await this.errorAlert.textContent();
    return text?.trim() || '';
  }

  // Verify username field has "Required" validation error
  async verifyUsernameRequiredError() {
    const usernameError = this.validationErrors.first();
    await expect(usernameError).toBeVisible({ timeout: 30000 });
    await expect(usernameError).toHaveText('Required');
  }

  // Verify password field has "Required" validation error
  async verifyPasswordRequiredError() {
    const passwordError = this.validationErrors.last();
    await expect(passwordError).toBeVisible({ timeout: 30000 });
    await expect(passwordError).toHaveText('Required');
  }

  // Verify user is still on login page (URL check)
  async verifyStillOnLoginPage() {
    await this.page.waitForURL('**/auth/login**', { timeout: 30000 });
    expect(this.page.url()).toContain('/auth/login');
    await expect(this.loginButton).toBeVisible();
  }
}
