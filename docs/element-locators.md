# OrangeHRM Element Locators

**Last Updated:** March 23, 2026
**Application Version:** OrangeHRM Demo (Public Instance)

---

## Login Page

**URL:** `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Elements and Locators

| Element              | Selector                        | Selector Type | Notes                                      |
| :------------------- | :------------------------------ | :------------ | :----------------------------------------- |
| Username Input       | `input[name="username"]`        | Attribute     | Stable, name attribute unlikely to change  |
| Password Input       | `input[name="password"]`        | Attribute     | Stable                                     |
| Login Button         | `button[type="submit"]`         | Type + Text   | Filtered with `.filter({ hasText: 'Login' })` |
| Error Alert          | `.oxd-alert-content-text`       | Class         | Displays on invalid credentials            |
| Login Panel          | `.orangehrm-login-slot`         | Class         | Container for login form                   |
| Validation Error     | `.oxd-input-field-error-message`| Class         | Shows "Required" for empty fields          |
| Forgot Password Link | Text: "Forgot your password"    | Text content  | Link below login button                    |

### Field Validations
- **Username empty:** "Required" message appears below field
- **Password empty:** "Required" message appears below field
- **Invalid credentials:** "Invalid credentials" alert appears at top

---

## Dashboard Page

**URL Pattern:** `/web/index.php/dashboard/index`

### Elements and Locators

| Element            | Selector                                          | Selector Type | Notes                        |
|--------------------|---------------------------------------------------|---------------|------------------------------|
| Dashboard Heading  | `h6.filter({ hasText: 'Dashboard' })`             | Tag + Text    | Confirms successful login    |
| Main Navigation    | `.oxd-sidepanel`                                  | Class         | Left sidebar panel           |
| Admin Menu Item    | `a.oxd-main-menu-item.filter({ hasText: 'Admin' })`| Class + Text | Specific menu option         |
| PIM Menu Item      | `a.oxd-main-menu-item.filter({ hasText: 'PIM' })` | Class + Text  | Navigates to PIM module      |
| Leave Menu Item    | `a.oxd-main-menu-item.filter({ hasText: 'Leave' })`| Class + Text | Navigates to Leave module    |
| User Dropdown      | `.oxd-userdropdown-tab`                           | Class         | Top-right, shows logged user |
| Logout Option      | `a[href*="logout"]`                               | Attribute     | Inside user dropdown         |

---

## Admin Module (User Management)

**URL Pattern:** `/web/index.php/admin/viewSystemUsers`

### Containers (Scoping)

| Container          | Selector                        | Purpose                                  |
|--------------------|---------------------------------|------------------------------------------|
| Search Container   | `.oxd-table-filter`             | Scopes all search field locators         |
| Add Form Container | `.orangehrm-card-container`     | Scopes all add/edit form field locators  |
| Delete Dialog      | `.orangehrm-dialog-popup`       | Scopes delete confirmation locators      |

### Elements and Locators

| Element                   | Selector                                                                                        | Selector Type  | Notes                           |
|---------------------------|-------------------------------------------------------------------------------------------------|----------------|---------------------------------|
| Page Heading              | `h6.oxd-topbar-header-breadcrumb-module`                                                        | Element + Class| Validates module load           |
| Add Button                | `button.filter({ hasText: 'Add' })`                                                             | Element + Text | Navigates to Add form           |
| Search Username Input     | `searchContainer.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input')`  | Scoped Filter  | Avoids brittle CSS paths        |
| Search Button             | `searchContainer.locator('button[type="submit"]')`                                              | Scoped Type    | Submit button in search section |
| Reset Button              | `searchContainer.locator('button').filter({ hasText: 'Reset' })`                                | Scoped Text    | Clears search fields            |
| Table Rows                | `.oxd-table-body .oxd-table-card`                                                               | Class chain    | Each row is one user record     |
| No Records Found          | `.oxd-toast-content.filter({ hasText: 'No Records Found' })`                                    | Scoped Text    | Toast notification              |
| User Role Dropdown        | `addFormContainer.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text')` | Scoped Filter | Custom dropdown |
| Employee Name Input       | `addFormContainer.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input')` | Scoped Filter | Autocomplete field |
| Status Dropdown           | `addFormContainer.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text')` | Scoped Filter | Custom dropdown |
| Username Input (form)     | `addFormContainer.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input')` | Scoped Filter  | New user's username             |
| Password Input            | `addFormContainer.locator('.oxd-input-group').filter({ hasText: 'Password' }).first().locator('input')` | Scoped Filter | `.first()` avoids Confirm Password match |
| Confirm Password Input    | `addFormContainer.locator('.oxd-input-group').filter({ hasText: 'Confirm Password' }).locator('input')` | Scoped Filter | Confirm field |
| Save Button               | `addFormContainer.locator('button[type="submit"]')`                                             | Scoped Type    | Submits the form                |
| Edit Icon                 | `userRow.locator('i.bi-pencil-fill')`                                                           | Scoped Class   | Per-row, scoped to table row    |
| Delete Icon               | `userRow.locator('i.bi-trash')`                                                                 | Scoped Class   | Per-row, scoped to table row    |
| Confirm Delete Button     | `deleteDialog.locator('button').filter({ hasText: 'Yes, Delete' })`                             | Scoped Text    | Final delete confirmation       |
| Success Toast             | `.oxd-toast-content--success`                                                                   | Class          | Appears after successful action |

### API Endpoints (for waitForResponse)
- **Search / List users:** `GET /api/v2/admin/users`
- **Add user:** `POST /api/v2/admin/users`
- **Edit user:** `PUT /api/v2/admin/users/{id}`
- **Delete user:** `DELETE /api/v2/admin/users`

### Autocomplete Behaviour (Employee Name field)
- Type a single letter seed (e.g., `"a"`, `"e"`, `"m"`, `"r"`)
- Wait for `GET /api/v2/pim/employees` response (status 200)
- Select the first option: `.oxd-autocomplete-option.first()`

---

## PIM Module (Employee Management)

**URL Pattern:** `/web/index.php/pim/viewEmployeeList`

### Containers (Scoping)

| Container              | Selector                               | Purpose                                        |
|------------------------|----------------------------------------|------------------------------------------------|
| Search Container       | `.oxd-table-filter`                    | Scopes all search field locators               |
| Add Form Container     | `.orangehrm-card-container`            | Scopes add employee form (shared with Admin)   |
| Delete Dialog          | `.orangehrm-dialog-popup`              | Scopes delete confirmation (shared with Admin) |
| Profile Form Container | `.orangehrm-edit-employee-content`     | Scopes the employee profile/edit page          |

### Employee List Page

| Element                | Selector                                                                                                  | Selector Type  | Notes                                       |
|------------------------|-----------------------------------------------------------------------------------------------------------|----------------|---------------------------------------------|
| Page Heading           | `h6.oxd-topbar-header-breadcrumb-module`                                                                  | Element + Class| Validates PIM module loaded                 |
| Add Button             | `button.filter({ hasText: 'Add' })`                                                                       | Text           | Opens Add Employee form                     |
| Search Employee Name   | `searchContainer.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input')`       | Scoped Filter  | Plain text input on search form             |
| Search Employee ID     | `searchContainer.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input')`         | Scoped Filter  | Numeric ID search field                     |
| Search Button          | `searchContainer.locator('button[type="submit"]')`                                                        | Scoped Type    | Submits search form                         |
| Reset Button           | `searchContainer.locator('button').filter({ hasText: 'Reset' })`                                          | Scoped Text    | Clears all search fields                    |
| Table Rows             | `.oxd-table-body .oxd-table-card`                                                                         | Class chain    | Each row is one employee record             |
| No Records Found       | `.oxd-toast-content.filter({ hasText: 'No Records Found' })`                                              | Scoped Text    | Toast — auto-dismisses                      |
| Edit Icon              | `employeeRow.locator('i.bi-pencil-fill')`                                                                 | Scoped Class   | Per-row, scoped to table row                |
| Delete Icon            | `employeeRow.locator('i.bi-trash')`                                                                       | Scoped Class   | Per-row, scoped to table row                |
| Confirm Delete Button  | `deleteDialog.locator('button').filter({ hasText: 'Yes, Delete' })`                                       | Scoped Text    | Final confirmation in delete dialog         |
| Success Toast          | `.oxd-toast-content--success`                                                                             | Class          | Appears after add/edit/delete success       |

### Add Employee Form

**URL Pattern:** `/web/index.php/pim/addEmployee`

| Element          | Selector                                         | Selector Type | Notes                                          |
|------------------|--------------------------------------------------|---------------|------------------------------------------------|
| First Name Input | `input[name="firstName"]`                        | Attribute     | Direct `name` attribute — more stable than label filter here |
| Middle Name Input| `input[name="middleName"]`                       | Attribute     | Optional field                                 |
| Last Name Input  | `input[name="lastName"]`                         | Attribute     | Required field                                 |
| Employee ID      | `.orangehrm-employee-id-wrapper input`           | Scoped tag    | Auto-generated — overwritten via Playwright to prevent parallel collisions |
| Save Button      | `button[type="submit"].filter({ hasText: 'Save' })`| Type + Text | Submits the Add Employee form                  |
| Cancel Button    | `button.filter({ hasText: 'Cancel' })`           | Text          | Returns to employee list without saving        |
| Validation Error | `.oxd-input-field-error-message`                 | Class         | "Required" below empty mandatory fields        |

### Employee Profile / Edit Page

**URL Pattern:** `/web/index.php/pim/viewPersonalDetails/empNumber/{id}`

| Element               | Selector                                           | Selector Type | Notes                                          |
|-----------------------|----------------------------------------------------|---------------|------------------------------------------------|
| First Name Input      | `input[name="firstName"]`                          | Attribute     | Same `name` attributes as Add form             |
| Middle Name Input     | `input[name="middleName"]`                         | Attribute     | Optional                                       |
| Last Name Input       | `input[name="lastName"]`                           | Attribute     | Required                                       |
| Save Button (Profile) | `button[type="submit"].filter({ hasText: 'Save' })`| Type + Text   | Multiple Save buttons exist per tab            |

### API Endpoints (for waitForResponse)
- **Search / List employees:** `GET /api/v2/pim/employees`
- **Add employee:** `POST /api/v2/pim/employees`
- **Get employee detail:** `GET /api/v2/pim/employees/{id}`
- **Edit employee:** `PUT /api/v2/pim/employees/{id}/personal-details`
- **Delete employee:** `DELETE /api/v2/pim/employees`

### PIM-Specific Behaviours (Critical for Test Stability)

| Behaviour | Detail |
|---|---|
| **Post-save redirect** | Saving a new employee redirects to `/pim/viewPersonalDetails/empNumber/<id>` — NOT back to the list |
| **Employee Name on search form** | Plain text input — does NOT trigger autocomplete on the search/filter form |
| **Employee Name in Admin form** | IS an autocomplete (used when adding a system user in Admin module) |
| **No Records Found toast** | Auto-dismisses after ~3 seconds — assert immediately after search |
| **Employee ID field** | System-generated numeric string — read with `inputValue()` only |
| **Profile page tabs** | Personal Details, Contact Details, Emergency Contacts, etc. — only Personal Details tab is automated |

---

## Leave Module (Leave Management)

**URL Patterns:**
- Apply Leave: `/web/index.php/leave/applyLeave`
- My Leave List: `/web/index.php/leave/viewMyLeaveList`
- Leave List (admin): `/web/index.php/leave/viewLeaveList`

### Containers (Scoping)

| Container        | Selector                    | Purpose                                       |
|------------------|-----------------------------|-----------------------------------------------|
| Filter Container | `.oxd-table-filter`         | Scopes all filter/search field locators on list pages |
| Form Container   | `.orangehrm-card-container` | Scopes Apply Leave form fields                |
| Cancel Dialog    | `.orangehrm-dialog-popup`   | Scopes cancel confirmation dialog locators    |

### Leave Module Navigation (Top Bar)

| Element         | Selector                                                              | Selector Type    | Notes                          |
|-----------------|-----------------------------------------------------------------------|------------------|--------------------------------|
| Page Heading    | `h6.oxd-topbar-header-breadcrumb-module`                              | Element + Class  | Validates module load          |
| Apply Link      | `.oxd-topbar-body a` filtered `{ hasText: 'Apply' }`                 | Container + Text | Opens Apply Leave form         |
| My Leave Link   | `.oxd-topbar-body a` filtered `{ hasText: 'My Leave' }`              | Container + Text | Opens My Leave List            |
| Leave List Link | `.oxd-topbar-body a` filtered `{ hasText: 'Leave List' }`            | Container + Text | Admin-level leave list view    |

### Apply Leave Form

| Element               | Selector                                                                                              | Selector Type | Notes                                          |
|-----------------------|-------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------|
| Leave Type Dropdown   | `formContainer.locator('.oxd-input-group').filter({ hasText: 'Leave Type' }).locator('.oxd-select-text')` | Scoped Filter | Depends on HR config in demo                   |
| From Date Input       | `formContainer.locator('.oxd-input-group').filter({ hasText: 'From Date' }).locator('input')`         | Scoped Filter | OrangeHRM custom calendar widget               |
| To Date Input         | `formContainer.locator('.oxd-input-group').filter({ hasText: 'To Date' }).locator('input')`           | Scoped Filter | OrangeHRM custom calendar widget               |
| Comment Textarea      | `formContainer.locator('.oxd-input-group').filter({ hasText: 'Comments' }).locator('textarea')`       | Scoped Filter | Optional field                                 |
| Submit Button         | `formContainer.locator('button[type="submit"]')`                                                      | Scoped Type   | Applies the leave request                      |
| No Balance Message    | `page.locator('.oxd-text').filter({ hasText: 'No leave types with leave balance' })`                  | Class + Text  | Shared demo guard — replaces form when balance is zero |

### My Leave List / Leave List Filter Section

| Element                  | Selector                                                                                                                  | Selector Type | Notes                                     |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------|
| Leave Type Filter        | `filterContainer.locator('.oxd-input-group').filter({ hasText: 'Leave Type' }).locator('.oxd-select-text')`               | Scoped Filter | Filters results by leave type             |
| Status Filter Dropdown   | `filterContainer.locator('.oxd-input-group').filter({ hasText: 'Show Leave with Status' }).locator('.oxd-select-text')`   | Scoped Filter | Multi-select; pre-populated on page load  |
| Selected Status Chips    | `filterContainer.locator('.oxd-input-group').filter({ hasText: 'Show Leave with Status' }).locator('.oxd-chip')`          | Scoped Class  | Each chip represents one selected status  |
| Chip Close Icons         | `selectedStatusChips.locator('i')`                                                                                        | Scoped Tag    | Click to remove individual status chip    |
| Search Button            | `filterContainer.locator('button[type="submit"]')`                                                                        | Scoped Type   | Submits the filter                        |

### Results Table

| Element          | Selector                                                              | Selector Type | Notes                               |
|------------------|-----------------------------------------------------------------------|---------------|-------------------------------------|
| Table Body       | `.oxd-table-body`                                                     | Class         | Contains all leave result rows      |
| Table Rows       | `.oxd-table-body .oxd-table-card`                                     | Class chain   | Each row = one leave record         |
| Table Header     | `.oxd-table-header`                                                   | Class         | Contains column header labels       |
| No Records Found | `.oxd-toast-content` filtered `{ hasText: 'No Records Found' }` first | Class + Text  | Auto-dismisses after ~3 seconds     |
| Success Toast    | `.oxd-toast-content--success`                                         | Class         | Appears after successful leave action |

### Cancel Confirmation Dialog

| Element               | Selector                                                              | Selector Type | Notes                           |
|-----------------------|-----------------------------------------------------------------------|---------------|---------------------------------|
| Cancel Dialog         | `.orangehrm-dialog-popup`                                             | Class         | Scopes cancel confirmation      |
| Confirm Cancel Button | `cancelDialog.locator('button').filter({ hasText: 'Yes, Cancel' })`  | Scoped Text   | Confirms cancellation           |

### API Endpoints (for waitForResponse)

| Method   | Endpoint                              | Triggered By                              |
|----------|---------------------------------------|-------------------------------------------|
| `GET`    | `/api/v2/leave/leave-types`           | Navigating to Apply Leave page            |
| `GET`    | `/api/v2/leave/leaveEntitlements`     | Leave type dropdown balance population    |
| `POST`   | `/api/v2/leave/leaveRequests`         | Submitting Apply Leave form               |
| `GET`    | `/api/v2/leave/leave-requests`        | Searching / filtering leave list          |
| `PUT`    | `/api/v2/leave/leaveRequests/{id}`    | Cancelling a leave request                |

### Leave-Specific Behaviours (Critical for Test Stability)

| Behaviour | Detail |
|---|---|
| **Date picker interaction** | OrangeHRM uses a custom calendar widget. Triple-click to select existing text, press Backspace, then use `pressSequentially(dateValue, { delay: 50 })`. After entry, click a neutral element (e.g. page heading with `{ force: true }`) to dismiss the calendar before proceeding to the next field. |
| **Leave type population** | The Leave Type dropdown is populated from HR configuration. Types may differ depending on when the demo was last reset. Always select by exact label text — never assume index position. |
| **Approval workflow constraint** | In some OrangeHRM versions, an Admin cannot approve their own leave request. Use a separate ESS user to apply and the Admin account to approve when testing the approval workflow. |
| **Leave balance — zero state** | The shared demo may show zero balance for the Admin account (depleted by other users). A zero balance shows "No leave types with leave balance" instead of the apply form. This is a valid state handled by the defensive guard in `navigateToApplyLeave()` via `Promise.race`. |
| **Leave list refresh** | After applying leave, the list does not auto-refresh. Navigate explicitly to `viewMyLeaveList` and wait for the `GET /api/v2/leave/leave-requests` response (status 200 or 304) before asserting new records. |
| **Status filter multi-select** | The "Show Leave with Status" field is multi-select. Default chips (Pending, Approved, etc.) are pre-populated on page load. Clear all chips before applying a new filter to avoid unintentional compound filtering. |
| **Loading spinner** | A `.oxd-loading-spinner` element appears briefly on page transitions. Wait for it to reach `state: 'hidden'` before asserting page content. The wait can be wrapped in `.catch(() => {})` since it may not appear on fast loads. |

---

## Test Credentials

**Valid User:**
- Username: `Admin`
- Password: `admin123`
--
