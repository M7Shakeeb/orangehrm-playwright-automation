import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CustomWorld } from '../types/world';

/**
 * Background step - navigates to login page
 */
Given('I am on the OrangeHRM login page', async function(this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.verifyLoginPageDisplayed();
});

// Enter username
When('I enter username {string}', async function(this: CustomWorld, username: string) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.enterUsername(username);
});

// Enter password
When('I enter password {string}', async function(this: CustomWorld, password: string) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.enterPassword(password);
});

// Click login button
When('I click the login button', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.clickLoginButton();
});

// Leave username field empty
When('I leave the username field empty', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.enterUsername('');
});

// Leave password field empty
When('I leave the password field empty', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.enterPassword('');
});

// Verify redirected to dashboard
Then('I should be redirected to the dashboard page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.verifyDashboardURL();
});

/* Verify dashboard heading is visible(removing this step as it's already covered in dashboardSteps.ts, which is from week 2)

Then('the dashboard heading should be visible', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.verifyDashboardDisplayed();
});
*/


// Verify error alert is displayed with expected text
Then('I should see an error alert containing {string}', async function(this: CustomWorld, expectedText: string) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyErrorAlertDisplayed();
  
  const errorText = await loginPage.getErrorAlertText();
  expect(errorText.toLowerCase()).toContain(expectedText.toLowerCase());
});

// Verify still on login page
Then('I should remain on the login page', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyStillOnLoginPage();
});

// Verify username field has validation error
Then('I should see a validation error for the username field', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyUsernameRequiredError();
});

// Verify password field has validation error
Then('I should see a validation error for the password field', async function(this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyPasswordRequiredError();
});
