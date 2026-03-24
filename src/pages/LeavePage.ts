import { Page, Locator, expect } from '@playwright/test';

export interface AddLeaveData {
  leaveType: string;
  fromDate: string;
  toDate: string;
  comment?: string;
}

export class LeavePage {
  readonly page: Page;

  // --- Containers ---
  readonly filterContainer: Locator;
  readonly formContainer: Locator;

  // --- Header ---
  readonly pageHeading: Locator;
  readonly applyLeaveLink: Locator;
  readonly leaveListTabLink: Locator;
  readonly leaveListTableHeader: Locator;


  // --- Shared Environment Guard ---
  readonly noLeaveBalanceMessage: Locator;

  // --- Apply Leave Form ---
  readonly leaveTypeDropdown: Locator;

  // --- My Leave List Filter ---
  readonly filterLeaveTypeDropdown: Locator;
  readonly filterLeaveStatusDropdown: Locator;
  readonly searchButton: Locator;
  readonly selectedStatusChips: Locator;
  readonly statusChipCloseIcons: Locator;

  // --- Results Table ---
  readonly resultsTable: Locator;
  readonly tableRows: Locator;
  readonly noRecordsFound: Locator;

  constructor(page: Page) {
    this.page = page;

    this.filterContainer = page.locator('.oxd-table-filter');
    this.formContainer = page.locator('.orangehrm-card-container');
    this.pageHeading = page.locator('h6.oxd-topbar-header-breadcrumb-module');

    this.noLeaveBalanceMessage = page
      .locator('.oxd-text')
      .filter({ hasText: 'No leave types with leave balance' });

    this.leaveTypeDropdown = this.formContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Leave Type' })
      .locator('.oxd-select-text');

    this.filterLeaveTypeDropdown = this.filterContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Leave Type' })
      .locator('.oxd-select-text');

    this.filterLeaveStatusDropdown = this.filterContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Show Leave with Status' })
      .locator('.oxd-select-text');

    this.searchButton = this.filterContainer.locator('button[type="submit"]');

    this.resultsTable = page.locator('.oxd-table-body');
    this.tableRows = this.resultsTable.locator('.oxd-table-card');

    this.applyLeaveLink = page.locator('.oxd-topbar-body').locator('a').filter({ hasText: 'Apply' });

    this.noRecordsFound = page
      .locator('.oxd-toast-content')
      .filter({ hasText: 'No Records Found' })
      .first();

    this.selectedStatusChips = this.filterContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Show Leave with Status' })
      .locator('.oxd-chip');
    this.statusChipCloseIcons = this.selectedStatusChips.locator('i'); // The 'x' icon inside the chip

    this.leaveListTabLink = page
      .locator('.oxd-topbar-body')
      .locator('a')
      .filter({ hasText: 'Leave List' });

    this.leaveListTableHeader = page.locator('.oxd-table-header');

  }

  // ==================== PRIVATE HELPERS ====================

  private async waitForPageLoader(): Promise<void> {
    await this.page
      .locator('.oxd-loading-spinner')
      .waitFor({ state: 'hidden', timeout: 15000 })
      .catch(() => {
        // Spinner not appearing on fast loads is not an error
      });
  }

  // ==================== VERIFICATION ====================

  async verifyLeavePageDisplayed(): Promise<void> {
    await expect(this.pageHeading).toBeVisible({ timeout: 30000 });
  }

  async verifyLeaveExistsInTable(leaveType: string): Promise<void> {
    const leaveCell = this.tableRows
      .locator('div')
      .filter({ hasText: leaveType })
      .first();
    await expect(leaveCell).toBeVisible({ timeout: 30000 });
  }

  async hasNoLeaveBalance(): Promise<boolean> {
    return await this.noLeaveBalanceMessage.isVisible();
  }

  // ==================== NAVIGATION ====================

  async navigateToApplyLeave(): Promise<void> {
    const leaveTypesLoaded = this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/v2/leave/leave-types') &&
        response.status() === 200,
      { timeout: 30000 }
    );

    await this.page.goto('/web/index.php/leave/applyLeave');
    await leaveTypesLoaded;
    await this.waitForPageLoader();
    // Waits for either the form OR the no-balance message — both are valid states
    await Promise.race([
      expect(this.formContainer).toBeVisible({ timeout: 15000 }),
      expect(this.noLeaveBalanceMessage).toBeVisible({ timeout: 15000 }),
    ]).catch(() => {
      // At least one must be visible — if neither appears, steps will surface the failure
    });
  }

  async navigateToMyLeaveList(): Promise<void> {
    await this.page.goto('/web/index.php/leave/viewMyLeaveList');
    await this.waitForPageLoader();
    await this.verifyLeavePageDisplayed();
  }

  // ==================== FORM HELPERS ====================

  async selectDropdownOption(
    dropdownLocator: Locator,
    optionText: string
  ): Promise<void> {
    await dropdownLocator.click();
    const option = this.page
      .locator('.oxd-select-option')
      .filter({ hasText: optionText });
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
  }

  async fillDateInput(inputLocator: Locator, dateValue: string): Promise<void> {
    // Triple-click selects all text safely on both Mac and Windows
    await inputLocator.click({ clickCount: 3 });
    await inputLocator.press('Backspace');
    await inputLocator.pressSequentially(dateValue, { delay: 50 });
    // Click a neutral area to safely dismiss the calendar widget
    await this.pageHeading.click({ force: true });
  }

  // ==================== APPLY LEAVE ====================

  async clickApplyButton(): Promise<void> {
    await this.applyLeaveLink.click();
    await this.page.waitForResponse(
      (r) => r.url().includes('/api/v2/leave/leave-types') && r.status() === 200,
      { timeout: 30000 }
    );
  }

  async fillLeaveForm(data: AddLeaveData): Promise<void> {
    await this.selectDropdownOption(this.leaveTypeDropdown, data.leaveType);

    const fromDateInput = this.formContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'From Date' })
      .locator('input');
    const toDateInput = this.formContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'To Date' })
      .locator('input');

    await this.fillDateInput(fromDateInput, data.fromDate);
    await this.fillDateInput(toDateInput, data.toDate);

    if (data.comment) {
      const commentInput = this.formContainer
        .locator('.oxd-input-group')
        .filter({ hasText: 'Comments' })
        .locator('textarea');
      await commentInput.fill(data.comment);
    }
  }

  async clickSaveButton(): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (r) => r.url().includes('/api/v2/leave/leave-requests') && r.status() === 200,
      { timeout: 30000 }
    );
    await this.formContainer.locator('button[type="submit"]').click();
    await responsePromise;
  }

  async applyLeave(data: AddLeaveData): Promise<void> {
    await this.clickApplyButton();
    await this.fillLeaveForm(data);
    await this.clickSaveButton();
  }


  // ==================== FILTER / SEARCH ====================

  async filterByLeaveType(leaveType: string): Promise<void> {
    await this.selectDropdownOption(this.filterLeaveTypeDropdown, leaveType);
    
    // Strict matcher: only waits for the actual leave-requests GET call
    const responsePromise = this.page.waitForResponse(r => 
      r.url().includes('/leave-requests') && r.request().method() === 'GET' && r.status() === 200
    );
    await this.searchButton.click();
    await responsePromise;
  }

  async filterByStatus(status: string): Promise<void> {
    await this.selectDropdownOption(this.filterLeaveStatusDropdown, status);
    
    // Safely close the multi-select dropdown
    await this.pageHeading.click({ force: true });
    
    const responsePromise = this.page.waitForResponse(
      r => 
        r.url().includes('/leave-requests') && 
        r.request().method() === 'GET' && 
        [200, 304].includes(r.status()),
      { timeout: 15000 }
    ).catch(() => {});

    await this.searchButton.click();
    await responsePromise;
  }

  async clearAllSelectedStatuses(): Promise<void> {

    await this.selectedStatusChips.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    while ((await this.selectedStatusChips.count()) > 0) {
      const initialCount = await this.selectedStatusChips.count();
      await this.statusChipCloseIcons.first().click();
      // Wait for the DOM to actually remove the chip before looping again
      await expect(this.selectedStatusChips).toHaveCount(initialCount - 1, { timeout: 5000 });
    }
    // FIX: Click a neutral spot to safely close any auto-expanded dropdown
    await this.pageHeading.click({ force: true });
  }


  async navigateToLeaveListTab(): Promise<void> {
  await this.leaveListTabLink.click();
  await this.waitForPageLoader();
  }

  async verifyLeaveListColumns(): Promise<void> {
    const expectedColumns = [
      'Date', 'Employee Name', 'Leave Type',
      'Leave Balance (Days)', 'Number of Days',
      'Status', 'Comments', 'Actions'
    ];
    
    for (const column of expectedColumns) {
      await expect(
        this.leaveListTableHeader.getByText(column, { exact: true }).first()
      ).toBeVisible({ timeout: 10000 });
    }
  }
}
