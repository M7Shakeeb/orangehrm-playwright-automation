import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LeavePage } from '../pages/LeavePage';
import { DashboardPage } from '../pages/DashboardPage';
import { CustomWorld } from '../types/world';

// NAVIGATION

When('I navigate to the Leave module', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToLeave();
});

When('I navigate to the Apply Leave page', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await leavePage.navigateToApplyLeave();
});

When('I navigate to My Leave List', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await leavePage.navigateToMyLeaveList();
});

// VERIFICATION

Then('the Leave page should be displayed', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await leavePage.verifyLeavePageDisplayed();
});

Then('I should see the Leave module heading', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await leavePage.verifyLeavePageDisplayed();
});

Then('I should see the Apply Leave option', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await expect(leavePage.applyLeaveLink).toBeVisible({ timeout: 10000 });
});
Then(
  'I should see the Apply Leave form or the no balance message',
  async function (this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const leavePage = new LeavePage(this.page);
    
    await expect(
      leavePage.formContainer.or(leavePage.noLeaveBalanceMessage).first()
    ).toBeVisible({ timeout: 15000 });
  }
);

Then(
  'the leave list results area should be visible',
  async function (this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const leavePage = new LeavePage(this.page);
    
    // Race: Waits for EITHER the first table row OR the empty state toast to appear
    await Promise.race([
      leavePage.tableRows.first().waitFor({ state: 'visible', timeout: 15000 }),
      leavePage.noRecordsFound.waitFor({ state: 'visible', timeout: 15000 })
    ]);
  }
);

// FILTER / SEARCH

When(
  'I clear all default leave statuses',
  async function (this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const leavePage = new LeavePage(this.page);
    await leavePage.clearAllSelectedStatuses();
  }
);

When('I navigate to the Leave List tab', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await leavePage.navigateToLeaveListTab();
});

Then('the leave list table should show all expected columns', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  const leavePage = new LeavePage(this.page);
  await leavePage.verifyLeaveListColumns();
});

When(
  'I filter the leave list by status {string}',
  async function (this: CustomWorld, status: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const leavePage = new LeavePage(this.page);
    await leavePage.filterByStatus(status);
  }
);
