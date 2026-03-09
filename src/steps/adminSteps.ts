import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AdminPage, AddUserData } from '../pages/AdminPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DataGenerator } from '../utils/dataGenerator';
import { CustomWorld } from '../types/world';

// DEFAULT password 
const DEFAULT_TEST_PASSWORD = 'Test1234!';

// NAVIGATION

When('I navigate to the Admin module', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToAdmin();
});

// VERIFICATION

Then('the Admin page should be displayed', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.verifyAdminPageDisplayed();
});

Then('I should see the search section', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await expect(adminPage.searchButton).toBeVisible();
  await expect(adminPage.resetButton).toBeVisible();
});

Then('I should see the Add button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await expect(adminPage.addButton).toBeVisible();
});

Then('I should see the user {string} in the results table', async function (this: CustomWorld, username: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.verifyUserExistsInTable(username);
});

Then('I should see {string} message', async function (this: CustomWorld, message: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  if (message === 'No Records Found') {
    await adminPage.verifyNoRecordsFound();
  }
});

Then('I should see validation error', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const errorMessage = this.page.locator('.oxd-input-field-error-message');
  await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
});

Then('the user should be added successfully', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await this.page.waitForURL('**/admin/viewSystemUsers', { 
    timeout: 30000, 
    waitUntil: 'domcontentloaded' 
  });
});

Then('I should see the new user in the results table', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  const username = this.scenarioData.testUsername ?? '';
  await adminPage.verifyUserExistsInTable(username);
});

Then('the user should be updated successfully', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await this.page.waitForURL('**/admin/viewSystemUsers', { 
    timeout: 30000, 
    waitUntil: 'domcontentloaded' 
  });
});

Then('the user should be deleted successfully', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await expect(
    this.page.locator('.oxd-toast-content--success')
  ).toBeVisible({ timeout: 30000 });
});

Then('I should not see the user in results', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  const username = this.scenarioData.testUsername ?? '';
  await adminPage.searchUserByUsername(username);
  await adminPage.verifyNoRecordsFound();
});

Then('the search fields should be cleared', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  const inputValue = await adminPage.searchUsernameInput.inputValue();
  expect(inputValue).toBe('');
});

// SEARCH

When('I search for user {string}', async function (this: CustomWorld, username: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.searchUserByUsername(username);
});

When('I search for the test user', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  const username = this.scenarioData.testUsername ?? '';
  await adminPage.searchUserByUsername(username);
});

When('I click Reset button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.clickResetButton();
});

// ADD USER

When('I click the Add button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.clickAddButton();
});

When('I select user role {string}', async function (this: CustomWorld, role: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.selectDropdownOption(adminPage.formUserRoleDropdown, role);
});

When('I enter employee name {string}', async function (this: CustomWorld, employeeName: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.enterEmployeeName(employeeName);
});

When('I select status {string}', async function (this: CustomWorld, status: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.selectDropdownOption(adminPage.formStatusDropdown, status);
});

When('I enter unique username', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testUsername = DataGenerator.generateUniqueUsername();
  const adminPage = new AdminPage(this.page);
  await adminPage.formUsernameInput.fill(this.scenarioData.testUsername);
});

When('I enter the new user username {string}', async function (this: CustomWorld, username: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.formUsernameInput.fill(username);
});

When('I enter the new user password {string}', async function (this: CustomWorld, password: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.formPasswordInput.fill(password);
});

When('I enter confirm password {string}', async function (this: CustomWorld, password: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.formConfirmPasswordInput.fill(password);
});

When('I click Save button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.clickSaveButton();
});

// EDIT USER

When('I click edit icon for the user', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  const username = this.scenarioData.testUsername ?? '';
  await adminPage.clickEditForUser(username);
});

When('I change the status to {string}', async function (this: CustomWorld, status: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  await adminPage.changeStatus(status);
});

// DELETE USER

When('I delete the test user', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const adminPage = new AdminPage(this.page);
  const username = this.scenarioData.testUsername ?? '';
  await adminPage.deleteUser(username);
});

// SETUP

Given('I have added a test user with employee {string}', async function (this: CustomWorld, empLetter: string) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testUsername = DataGenerator.generateUniqueUsername();
  this.scenarioData.testPassword = DEFAULT_TEST_PASSWORD;
  const userData: AddUserData = {
    role: 'ESS',
    employeeName: empLetter,
    status: 'Enabled',
    username: this.scenarioData.testUsername,
    password: this.scenarioData.testPassword,
  };
  const adminPage = new AdminPage(this.page);
  await adminPage.addUser(userData);
});
