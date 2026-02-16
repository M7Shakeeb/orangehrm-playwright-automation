import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../types/world';

/**
 * Compound step for login - reusable for Background
 */
When('I login with username {string} and password {string}', async function(this: CustomWorld, username: string, password: string) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

/**
 * Verify on dashboard page
 */
Then('I should be on the dashboard page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.verifyDashboardDisplayed();
});

/**
 * Verify dashboard heading is visible
 */
Then('the dashboard heading should be visible', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await expect(dashboardPage.dashboardHeading).toBeVisible();
});

/**
 * Verify all navigation menus are visible
 */
Then('all navigation menu items should be visible', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.verifyAllNavigationMenusVisible();
});

/**
 * Click on Admin menu
 */
When('I click on the Admin menu', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToAdmin();
});

/**
 * Verify redirected to Admin page
 */
Then('I should be redirected to the Admin page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  await this.page.waitForURL('**/admin/**', { timeout: 10000 });
  expect(this.page.url()).toContain('/admin');
});

/**
 * Click on PIM menu
 */
When('I click on the PIM menu', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToPIM();
});

/**
 * Verify redirected to PIM page
 */
Then('I should be redirected to the PIM page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  await this.page.waitForURL('**/pim/**', { timeout: 10000 });
  expect(this.page.url()).toContain('/pim');
});

/**
 * Click on Leave menu
 */
When('I click on the Leave menu', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToLeave();
});

/**
 * Verify redirected to Leave page
 */
Then('I should be redirected to the Leave page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  await this.page.waitForURL('**/leave/**', { timeout: 10000 });
  expect(this.page.url()).toContain('/leave');
});

/**
 * Open user dropdown
 */
When('I open the user dropdown', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.openUserDropdown();
});

/**
 * Click logout option
 */
When('I click on logout option', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logoutOption.click();
});

/**
 * Verify redirected to login page
 */
Then('I should be redirected to the login page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  await this.page.waitForURL('**/auth/login**', { timeout: 10000 });
  expect(this.page.url()).toContain('/auth/login');
});

/**
 * Verify cannot access dashboard without login
 */
Then('I should not be able to access dashboard without re-login', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  // Try to navigate directly to dashboard
  await this.page.goto('/web/index.php/dashboard/index');
  
  // Should be redirected back to login
  await this.page.waitForURL('**/auth/login**', { timeout: 5000 });
  expect(this.page.url()).toContain('/auth/login');
});

/**
 * Click on Dashboard menu to go back
 */
When('I click on the Dashboard menu', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToDashboard();
});
