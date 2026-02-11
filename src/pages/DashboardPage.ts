import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

/**
 * Page Object Model for OrangeHRM Dashboard Page
 * Handles dashboard verification after successful login
 */
export class DashboardPage {
  readonly page: Page;

  // Locators
  readonly dashboardHeading: Locator;
  readonly mainNavigation: Locator;
  readonly userDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.locator('h6').filter({ hasText: 'Dashboard' });
    this.mainNavigation = page.locator('.oxd-sidepanel');
    this.userDropdown = page.locator('.oxd-userdropdown');
  }

  async waitForDashboardLoad() {
    await this.page.waitForURL('**/dashboard/index**', { timeout: 30000 });
  }

  // Verify dashboard page is displayed with all key elements
  async verifyDashboardDisplayed() {
    await this.waitForDashboardLoad();
    await expect(this.dashboardHeading).toBeVisible({ timeout: 10000 });
    await expect(this.mainNavigation).toBeVisible();
  }

  // Verify URL contains dashboard path
  async verifyDashboardURL() {
    await this.page.waitForURL('**/dashboard/**', { timeout: 10000 });
    expect(this.page.url()).toContain('/dashboard/');
  }

  /**
   * Get currently logged in username from user dropdown
   * @returns Username text
   */
  async getLoggedInUsername(): Promise<string> {
    await expect(this.userDropdown).toBeVisible();
    const text = await this.userDropdown.textContent();
    return text?.trim() || '';
  }
}
