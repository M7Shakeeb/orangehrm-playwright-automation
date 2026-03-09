import { Page, Locator, expect } from '@playwright/test';

// Data structure for add/edit employee operations
export interface AddEmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// PIM Employee Management Page Object
export class PIMPage {
  readonly page: Page;

  // --- Containers ---
  readonly searchContainer: Locator;
  readonly addFormContainer: Locator;
  readonly deleteDialog: Locator;
  readonly profileFormContainer: Locator;

  // --- Header / Navigation ---
  readonly pageHeading: Locator;
  readonly addButton: Locator;

  // --- Search Section ---
  readonly searchEmployeeNameInput: Locator;
  readonly searchEmployeeIdInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  // --- Results Table ---
  readonly resultsTable: Locator;
  readonly tableRows: Locator;
  readonly noRecordsFound: Locator;

  // --- Add Employee Form ---
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // --- Edit Profile Form (Personal Details tab) ---
  readonly editFirstNameInput: Locator;
  readonly editMiddleNameInput: Locator;
  readonly editLastNameInput: Locator;
  readonly editSaveButton: Locator;

  // --- Delete Confirmation ---
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define containers first - all locators are scoped to these
    this.searchContainer = page.locator('.oxd-table-filter');
    this.addFormContainer = page.locator('.orangehrm-card-container');
    this.deleteDialog = page.locator('.orangehrm-dialog-popup');

    // The edit profile form uses a different container class
    this.profileFormContainer = page.locator('.orangehrm-edit-employee-content');

    // Header
    this.pageHeading = page.locator('h6.oxd-topbar-header-breadcrumb-module');
    this.addButton = page.locator('button').filter({ hasText: 'Add' });

    // Search section - scoped to searchContainer
    // Employee Name in PIM search is a plain text input (NOT autocomplete on the search form)
    this.searchEmployeeNameInput = this.searchContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Name' })
      .locator('input');

    this.searchEmployeeIdInput = this.searchContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');

    this.searchButton = this.searchContainer.locator('button[type="submit"]');
    this.resetButton = this.searchContainer.locator('button').filter({ hasText: 'Reset' });

    // Results table
    this.resultsTable = page.locator('.oxd-table-body');
    this.tableRows = this.resultsTable.locator('.oxd-table-card');
    this.noRecordsFound = page.locator('.oxd-toast-content').filter({ hasText: 'No Records Found' });

    // Add Employee form fields - these are direct named inputs (not scoped dropdowns)
    // The Add Employee form uses input[name] attributes - more stable than label filtering here
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = this.addFormContainer
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');
    this.saveButton = page.locator('button[type="submit"]').filter({ hasText: 'Save' });
    this.cancelButton = page.locator('button').filter({ hasText: 'Cancel' });

    // Edit profile form - Personal Details tab uses same name attributes
    this.editFirstNameInput = page.locator('input[name="firstName"]');
    this.editMiddleNameInput = page.locator('input[name="middleName"]');
    this.editLastNameInput = page.locator('input[name="lastName"]');

    // On the edit profile page the save button is inside a form section
    this.editSaveButton = page.locator('button[type="submit"]').filter({ hasText: 'Save' }).first();

    // Delete confirmation dialog
    this.confirmDeleteButton = this.deleteDialog
      .locator('button')
      .filter({ hasText: 'Yes, Delete' });
  }

  // VERIFICATION

  async verifyPIMPageDisplayed(): Promise<void> {
    await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
    await expect(this.searchContainer).toBeVisible();
  }

  async verifyEmployeeExistsInTable(name: string): Promise<void> {
    const employeeCell = this.tableRows
      .locator('div')
      .filter({ hasText: name })
      .first();
    await expect(employeeCell).toBeVisible({ timeout: 10000 });
  }

  async verifyEmployeeNotInTable(name: string): Promise<void> {
    const employeeCell = this.tableRows
      .locator('div')
      .filter({ hasText: name })
      .first();
    await expect(employeeCell).not.toBeVisible({ timeout: 10000 });
  }

  async verifyNoRecordsFound(): Promise<void> {
    // OrangeHRM shows "No Records Found" as a toast notification
    await expect(this.noRecordsFound).toBeVisible({ timeout: 10000 });
  }

  // SEARCH

  // Search by employee name - waits for API response
  async searchByEmployeeName(name: string): Promise<void> {
    await this.searchEmployeeNameInput.clear();
    await this.searchEmployeeNameInput.fill(name);
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/v2/pim/employees') &&
        response.status() === 200
    );
    await this.searchButton.click();
    await responsePromise;
  }

  // Search by employee ID - waits for API response
  async searchByEmployeeId(employeeId: string): Promise<void> {
    await this.searchEmployeeIdInput.clear();
    await this.searchEmployeeIdInput.fill(employeeId);
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/v2/pim/employees') &&
        response.status() === 200
    );
    await this.searchButton.click();
    await responsePromise;
  }

  async clickResetButton(): Promise<void> {
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // READ EMPLOYEE ID

  // Reads the auto-generated Employee ID after form loads
  // Called AFTER navigating to Add Employee page and BEFORE saving
  async getEmployeeIdValue(): Promise<string> {
    await this.employeeIdInput.waitFor({ state: 'visible', timeout: 5000 });
    const value = await this.employeeIdInput.inputValue();
    return value.trim();
  }

  // ADD EMPLOYEE

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
    // Wait for the Add Employee form to be ready
    await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
  }

  // Fill the Add Employee form fields
  async fillEmployeeForm(employeeData: AddEmployeeData): Promise<void> {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(employeeData.firstName);

    if (employeeData.middleName) {
      await this.middleNameInput.clear();
      await this.middleNameInput.fill(employeeData.middleName);
    }

    await this.lastNameInput.clear();
    await this.lastNameInput.fill(employeeData.lastName);
  }

  async clickSaveButton(): Promise<void> {
    await this.saveButton.click();
  }

  // Complete add employee workflow
  // NOTE: After save, OrangeHRM redirects to the employee's own profile page
  // We will wait for that redirect rather than expecting the list to reload
  async addEmployee(employeeData: AddEmployeeData): Promise<string> {
      await this.clickAddButton();
      await this.fillEmployeeForm(employeeData);
      
      // FIX: Overwrite the auto-generated ID to prevent parallel collisions
      const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();
      await this.employeeIdInput.fill(uniqueId);
      
      await this.clickSaveButton();
      
      // Wait for redirect to employee profile page
      await this.page.waitForURL('**/pim/viewPersonalDetails/**', { timeout: 30000 });
      return uniqueId;
    }

  // NAVIGATE BACK TO EMPLOYEE LIST

  // After adding/editing, OrangeHRM lands on the profile page.
  // Navigate back to the employee list.
  async navigateToEmployeeList(): Promise<void> {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await this.verifyPIMPageDisplayed();
  }

  // EDIT EMPLOYEE

  // Click the edit (pencil) icon for a specific employee in the results table
async clickEditForEmployee(name: string): Promise<void> {
    await this.searchByEmployeeName(name);
    const employeeRow = this.tableRows.filter({ hasText: name }).first();
    const editIcon = employeeRow.locator('i.bi-pencil-fill');
    await editIcon.click();
    
    // Wait for the employee profile page to load
    await this.page.waitForURL('**/pim/viewPersonalDetails/**', { timeout: 10000 });
    await expect(this.editFirstNameInput).toHaveValue(name, { timeout: 10000 });
  }

  // Update the employee's first and last name on the Personal Details tab
  async updateEmployeeName(
    newFirstName: string,
    newLastName: string
  ): Promise<void> {
    await this.editFirstNameInput.clear();
    await this.editFirstNameInput.fill(newFirstName);
    await this.editLastNameInput.clear();
    await this.editLastNameInput.fill(newLastName);
  }

  // Complete edit employee workflow
  async editEmployee(
    currentName: string,
    newFirstName: string,
    newLastName: string
  ): Promise<void> {
    await this.clickEditForEmployee(currentName);
    await this.updateEmployeeName(newFirstName, newLastName);
    await this.editSaveButton.click();
    // Wait for success toast
    await expect(
      this.page.locator('.oxd-toast-content--success')
    ).toBeVisible({ timeout: 10000 });
  }

  // DELETE EMPLOYEE

  // Click the delete (trash) icon for a specific employee in the results table
  async clickDeleteForEmployee(name: string): Promise<void> {
    await this.searchByEmployeeName(name);
    const employeeRow = this.tableRows.filter({ hasText: name }).first();
    const deleteIcon = employeeRow.locator('i.bi-trash');
    await deleteIcon.click();
    await expect(this.confirmDeleteButton).toBeVisible({ timeout: 5000 });
  }

  async confirmDelete(): Promise<void> {
    await this.confirmDeleteButton.click();
    await expect(this.deleteDialog).toBeHidden({ timeout: 5000 });
  }

  // Complete delete employee workflow - composition method
  async deleteEmployee(name: string): Promise<void> {
    await this.clickDeleteForEmployee(name);
    await this.confirmDelete();
    // Wait for success toast confirming deletion
    await expect(
      this.page.locator('.oxd-toast-content--success')
    ).toBeVisible({ timeout: 10000 });
  }
}
