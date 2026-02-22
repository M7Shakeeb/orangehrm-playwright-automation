import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

// User data structure for add/edit operations
export interface AddUserData {
  role: string;
  employeeName: string;
  status: string;
  username: string;
  password: string;
}

/**
 * Admin User Management Page Object
 */
export class AdminPage {
  readonly page: Page;

  // Containers
  readonly searchContainer: Locator;
  readonly addFormContainer: Locator;
  readonly deleteDialog: Locator;

  // Header
  readonly pageHeading: Locator;
  readonly addButton: Locator;

  // Search section
  readonly searchUsernameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly resultsTable: Locator;
  readonly tableRows: Locator;
  readonly noRecordsFound: Locator;

  // Form fields
  readonly formUserRoleDropdown: Locator;
  readonly formEmployeeNameInput: Locator;
  readonly formStatusDropdown: Locator;
  readonly formUsernameInput: Locator;
  readonly formPasswordInput: Locator;
  readonly formConfirmPasswordInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Delete confirmation
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define containers for scoping
    this.searchContainer = page.locator('.oxd-table-filter');
    this.addFormContainer = page.locator('.orangehrm-card-container');
    this.deleteDialog = page.locator('.orangehrm-dialog-popup');

    // Header elements
    this.pageHeading = page.locator('h6.oxd-topbar-header-breadcrumb-module');
    this.addButton = page.locator('button').filter({ hasText: 'Add' });

    // Search section
    this.searchUsernameInput = this.searchContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .locator('input');

    this.searchButton = this.searchContainer.locator('button[type="submit"]');
    this.resetButton = this.searchContainer.locator('button').filter({ hasText: 'Reset' });
    this.resultsTable = page.locator('.oxd-table-body');
    this.tableRows = this.resultsTable.locator('.oxd-table-card');
    this.noRecordsFound = page.locator('.oxd-toast-content').filter({ hasText: 'No Records Found' });

    // Form fields
    this.formUserRoleDropdown = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'User Role' })
      .locator('.oxd-select-text');

    this.formEmployeeNameInput = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Name' })
      .locator('input');

    this.formStatusDropdown = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Status' })
      .locator('.oxd-select-text');

    this.formUsernameInput = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .locator('input');

    this.formPasswordInput = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Password' })
      .first()
      .locator('input');

    this.formConfirmPasswordInput = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Confirm Password' })
      .locator('input');

    this.saveButton = this.addFormContainer.locator('button[type="submit"]');
    this.cancelButton = this.addFormContainer.locator('button').filter({ hasText: 'Cancel' });

    // Delete confirmation
    this.confirmDeleteButton = this.deleteDialog.locator('button').filter({ hasText: 'Yes, Delete' });
  }

  // ==================== VERIFICATION ====================

  async verifyAdminPageDisplayed() {
    await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
    await expect(this.searchContainer).toBeVisible();
  }

  async verifyUserExistsInTable(username: string) {
    const userCell = this.tableRows.locator('div').filter({ hasText: username }).first();
    await expect(userCell).toBeVisible({ timeout: 5000 });
  }

  async verifyNoRecordsFound() {
    await expect(this.noRecordsFound).toBeVisible({ timeout: 5000 });
  }

  // ==================== SEARCH ====================

  /**
   * Search user by username - waits for API response
   */
  async searchUserByUsername(username: string) {
    await this.searchUsernameInput.fill(username);
    
    const responsePromise = this.page.waitForResponse(response => 
      response.url().includes('/api/v2/admin/users') && response.status() === 200
    );
    
    await this.searchButton.click();
    await responsePromise;
  }

  async clickResetButton() {
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== FORM HELPERS ====================

  /**
   * Select option from custom dropdown
   */
  async selectDropdownOption(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click();
    const option = this.page.locator('.oxd-select-option').filter({ hasText: optionText });
    await expect(option).toBeVisible({ timeout: 3000 });
    await option.click();
  }

  /**
   * Handle autocomplete field - waits for API
   */
  async enterEmployeeName(employeeName: string) {
    await this.formEmployeeNameInput.fill(employeeName);
    
    await this.page.waitForResponse(resp => 
      resp.url().includes('/employees') && resp.status() === 200
    );
    
    const dropdownOption = this.page.locator('.oxd-autocomplete-option').first();
    await expect(dropdownOption).toBeVisible({ timeout: 3000 });
    await dropdownOption.click();
  }

  /**
   * Fill user form fields (reusable for add/edit)
   */
  async fillUserForm(userData: AddUserData) {
    await this.selectDropdownOption(this.formUserRoleDropdown, userData.role);
    await this.enterEmployeeName(userData.employeeName);
    await this.selectDropdownOption(this.formStatusDropdown, userData.status);
    await this.formUsernameInput.fill(userData.username);
    
    if (userData.password) {
      await this.formPasswordInput.fill(userData.password);
      await this.formConfirmPasswordInput.fill(userData.password);
    }
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  // ==================== ADD USER ====================

  async clickAddButton() {
    await this.addButton.click();
  }

  /**
   * Complete add user workflow
   */
  async addUser(userData: AddUserData) {
    await this.clickAddButton();
    await this.fillUserForm(userData);
    await this.clickSaveButton();
    await expect(this.resultsTable).toBeVisible({ timeout: 10000 });
  }

  // ==================== EDIT USER ====================

  async clickEditForUser(username: string) {
    await this.searchUserByUsername(username);
    
    const userRow = this.tableRows.filter({ hasText: username }).first();
    const editIcon = userRow.locator('i.bi-pencil-fill');
    await editIcon.click();
    
    await expect(this.saveButton).toBeVisible({ timeout: 5000 });
  }

  async changeStatus(status: string) {
    await this.selectDropdownOption(this.formStatusDropdown, status);
  }

  /**
   * Complete edit user workflow
   */
  async editUser(username: string, newStatus: string) {
    await this.clickEditForUser(username);
    await this.changeStatus(newStatus);
    await this.clickSaveButton();
    await expect(this.resultsTable).toBeVisible({ timeout: 10000 });
  }

  // ==================== DELETE USER ====================

  async clickDeleteForUser(username: string) {
    await this.searchUserByUsername(username);
    
    const userRow = this.tableRows.filter({ hasText: username }).first();
    const deleteIcon = userRow.locator('i.bi-trash');
    await deleteIcon.click();
    
    await expect(this.confirmDeleteButton).toBeVisible({ timeout: 3000 });
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
    await expect(this.deleteDialog).toBeHidden({ timeout: 5000 });
  }

  /**
   * Complete delete user workflow
   */
  async deleteUser(username: string) {
    await this.clickDeleteForUser(username);
    await this.confirmDelete();
  }
}
