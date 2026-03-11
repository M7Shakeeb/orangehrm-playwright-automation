import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

/**
 * Page Object Model for OrangeHRM Dashboard Page
 * Handles dashboard verification, navigation, and logout functionality
 */
export class DashboardPage {
  readonly page: Page;

  // Main dashboard elements
  readonly dashboardHeading: Locator;
  readonly mainNavigation: Locator;
  readonly userDropdown: Locator;
  readonly logoutOption: Locator;
  readonly quickLaunchPanel: Locator;

  // Navigation menu items
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly timeMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly myInfoMenu: Locator;
  readonly performanceMenu: Locator;
  readonly dashboardMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    // Main elements
    this.dashboardHeading = page.locator('h6').filter({ hasText: 'Dashboard' });
    this.mainNavigation = page.locator('.oxd-sidepanel');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutOption = page.locator('a[href*="logout"]');
    this.quickLaunchPanel = page.locator('.orangehrm-dashboard-widget').first();

    // Navigation menu items - using href patterns for specificity
    this.adminMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Admin' });
    this.pimMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'PIM' });
    this.leaveMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Leave' });
    this.timeMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Time' });
    this.recruitmentMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Recruitment' });
    this.myInfoMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'My Info' });
    this.performanceMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Performance' });
    this.dashboardMenu = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Dashboard' });
  }

  /**
   * Wait for dashboard page to load after login
   */
  async waitForDashboardLoad() {
    await this.page.waitForURL('**/dashboard/index**', { timeout: 30000 });
  }

  /**
   * Verify dashboard page is displayed with all key elements
   */
  async verifyDashboardDisplayed() {
    await this.waitForDashboardLoad();
    await expect(this.dashboardHeading).toBeVisible({ timeout: 30000 });
    await expect(this.mainNavigation).toBeVisible();
  }

  /**
   * Verify URL contains dashboard path
   */
  async verifyDashboardURL() {
    await this.page.waitForURL('**/dashboard/**', { timeout: 30000 });
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

  /**
   * Verify all main navigation menu items are visible
   */
  async verifyAllNavigationMenusVisible() {
    const menus = [
      this.adminMenu,
      this.pimMenu,
      this.leaveMenu,
      this.timeMenu,
      this.recruitmentMenu,
      this.myInfoMenu,
      this.performanceMenu
    ];

    for (const menu of menus) {
      await expect(menu).toBeVisible({ timeout: 30000 });
    }
  }

  /**
   * Click on Admin menu to navigate to Admin module
   */
  async navigateToAdmin() {
    await this.adminMenu.click();
    await this.page.waitForURL('**/admin/**', { timeout: 30000 });
  }

  /**
   * Click on PIM menu to navigate to PIM module
   */
  async navigateToPIM() {
    await this.pimMenu.click();
    await this.page.waitForURL('**/pim/**', { timeout: 30000 });
  }

  /**
   * Click on Leave menu to navigate to Leave module
   */
  async navigateToLeave() {
    await this.leaveMenu.click();
    await this.page.waitForURL('**/leave/**', { timeout: 30000 });
  }

  /**
   * Click on Time menu to navigate to Time module
   */
  async navigateToTime() {
    await this.timeMenu.click();
    await this.page.waitForURL('**/time/**', { timeout: 30000 });
  }

  /**
   * Click on user dropdown to reveal logout option
   */
  async openUserDropdown() {
    await this.userDropdown.click();
    await expect(this.logoutOption).toBeVisible({ timeout: 30000 });
  }

  /**
   * Perform logout action
   * Opens dropdown, clicks logout, waits for redirect to login page
   */
  async logout() {
    await this.openUserDropdown();
    await this.logoutOption.click();
    await this.page.waitForURL('**/auth/login**', { timeout: 30000 });
  }

  /**
   * Verify logout was successful (on login page)
   */
  async verifyLogoutSuccessful() {
    await this.page.waitForURL('**/auth/login**', { timeout: 30000 });
    expect(this.page.url()).toContain('/auth/login');
  }

  /**
   * Navigate back to dashboard from any module
   */
  async navigateToDashboard() {
    await this.dashboardMenu.click();
    await this.waitForDashboardLoad();
  }
}
