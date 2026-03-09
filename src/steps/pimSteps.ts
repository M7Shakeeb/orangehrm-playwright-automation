import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PIMPage, AddEmployeeData } from '../pages/PIMPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DataGenerator } from '../utils/dataGenerator';
import { CustomWorld } from '../types/world';

// NAVIGATION

When('I navigate to the PIM module', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToPIM();
});

// VERIFICATION

Then('the PIM page should be displayed', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.verifyPIMPageDisplayed();
});

Then('I should see the employee search section', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await expect(pimPage.searchButton).toBeVisible();
  await expect(pimPage.resetButton).toBeVisible();
});

Then('I should see the PIM Add button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await expect(pimPage.addButton).toBeVisible();
});

Then('I should see at least one result in the employee table', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await expect(pimPage.tableRows.first()).toBeVisible({ timeout: 10000 });
});

Then('I should see no employee records found', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.verifyNoRecordsFound();
});

Then('the employee should be saved and profile page displayed', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await this.page.waitForURL('**/pim/viewPersonalDetails/**', { timeout: 15000 });
  await expect(this.page.locator('input[name="firstName"]')).toBeVisible({ timeout: 10000 });
});

Then('I store the new employee name for later use', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  expect(this.scenarioData.testFirstName).not.toBe('');
  expect(this.scenarioData.testLastName).not.toBe('');
});

Then('I should see the test employee in the results table', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const firstName = this.scenarioData.testFirstName ?? '';
  await pimPage.verifyEmployeeExistsInTable(firstName);
});

Then('the employee should be updated successfully', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await expect(
    this.page.locator('.oxd-toast-content--success')
  ).toBeVisible({ timeout: 10000 });
});

Then('the employee should be deleted successfully', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await expect(
    this.page.locator('.oxd-toast-content--success')
  ).toBeVisible({ timeout: 10000 });
});

Then('I should not see the deleted employee in the list', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const firstName = this.scenarioData.testFirstName ?? '';
  await pimPage.searchByEmployeeName(firstName);
  await pimPage.verifyNoRecordsFound();
});

Then('the employee search fields should be cleared', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const nameValue = await pimPage.searchEmployeeNameInput.inputValue();
  const idValue = await pimPage.searchEmployeeIdInput.inputValue();
  expect(nameValue).toBe('');
  expect(idValue).toBe('');
});

Then('I should see employee form validation errors', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const errorMessage = this.page.locator('.oxd-input-field-error-message');
  await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
});

// SEARCH

When('I search for employee name {string}', async function (this: CustomWorld, name: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.searchByEmployeeName(name);
});

When('I search for the test employee by name', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const firstName = this.scenarioData.testFirstName ?? '';
  await pimPage.searchByEmployeeName(firstName);
});

When('I search for employee by ID {string}', async function (this: CustomWorld, employeeId: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.searchByEmployeeId(employeeId);
});

When('I click the employee search Reset button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.clickResetButton();
});

// ADD EMPLOYEE

When('I click the PIM Add button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.clickAddButton();
});

When('I fill in the employee first name with a unique value', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testFirstName = DataGenerator.generateUniqueEmployeeName();
  const pimPage = new PIMPage(this.page);
  await pimPage.firstNameInput.clear();
  await pimPage.firstNameInput.fill(this.scenarioData.testFirstName);
});

When('I fill in the employee last name with a unique value', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testLastName = DataGenerator.generateUniqueEmployeeName();
  const pimPage = new PIMPage(this.page);
  await pimPage.lastNameInput.clear();
  await pimPage.lastNameInput.fill(this.scenarioData.testLastName);
});

When('I fill in the employee first name with {string}', async function (this: CustomWorld, firstName: string) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testFirstName = firstName;
  const pimPage = new PIMPage(this.page);
  await pimPage.firstNameInput.clear();
  await pimPage.firstNameInput.fill(firstName);
});

When('I fill in the employee last name with {string}', async function (this: CustomWorld, lastName: string) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testLastName = lastName;
  const pimPage = new PIMPage(this.page);
  await pimPage.lastNameInput.clear();
  await pimPage.lastNameInput.fill(lastName);
});

When('I clear the first name field', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.firstNameInput.clear();
});

When('I clear the last name field', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.lastNameInput.clear();
});

When('I save the new employee', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  
  // FIX: Overwrite the auto-generated ID to prevent parallel collisions
  const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();
  await pimPage.employeeIdInput.fill(uniqueId);
  
  await pimPage.clickSaveButton();
});

// NAVIGATE

When('I navigate back to the employee list', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.navigateToEmployeeList();
});

// EDIT EMPLOYEE

When('I click edit for the test employee', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const firstName = this.scenarioData.testFirstName ?? '';
  await pimPage.clickEditForEmployee(firstName);
});

When('I update the employee first name to a new unique value', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testUpdatedFirstName = DataGenerator.generateUniqueEmployeeName();
  const pimPage = new PIMPage(this.page);
  await pimPage.editFirstNameInput.clear();
  await pimPage.editFirstNameInput.fill(this.scenarioData.testUpdatedFirstName);
});

When('I click the employee save button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  await pimPage.editSaveButton.click();
});

// DELETE EMPLOYEE

When('I delete the test employee', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const firstName = this.scenarioData.testFirstName ?? '';
  await pimPage.deleteEmployee(firstName);
});

When('I delete the test employee by updated name', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const pimPage = new PIMPage(this.page);
  const updatedFirstName = this.scenarioData.testUpdatedFirstName ?? '';
  await pimPage.deleteEmployee(updatedFirstName);
});

// SETUP

Given('I have added a test employee', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  this.scenarioData.testFirstName = DataGenerator.generateUniqueEmployeeName();
  this.scenarioData.testLastName = DataGenerator.generateUniqueEmployeeName();
  const employeeData: AddEmployeeData = {
    firstName: this.scenarioData.testFirstName,
    lastName: this.scenarioData.testLastName,
  };
  const pimPage = new PIMPage(this.page);
  await pimPage.addEmployee(employeeData);
  // Leaves us on the profile page — navigate back is a separate step
});
