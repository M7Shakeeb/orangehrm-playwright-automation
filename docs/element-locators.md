# OrangeHRM Element Locators

**Last Updated:** March 4, 2026
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
| Search Employee Name   | `searchContainer.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input')`       | Scoped Filter  | Plain text input on search form (NOT autocomplete) |
| Search Employee ID     | `searchContainer.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input')`         | Scoped Filter  | Numeric ID search field                     |
| Search Button          | `searchContainer.locator('button[type="submit"]')`                                                        | Scoped Type    | Submits search form                         |
| Reset Button           | `searchContainer.locator('button').filter({ hasText: 'Reset' })`                                          | Scoped Text    | Clears all search fields                    |
| Table Rows             | `.oxd-table-body .oxd-table-card`                                                                         | Class chain    | Each row is one employee record             |
| No Records Found       | `.oxd-toast-content.filter({ hasText: 'No Records Found' })`                                              | Scoped Text    | Toast — auto-dismisses after ~3 seconds     |
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
| Employee ID      | `.orangehrm-employee-id-wrapper input`           | Scoped tag    | **Auto-generated by system, but manually overwritten via Playwright in the Page Object to prevent data collisions during parallel test execution.** |
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
| Save Button (Profile) | `button[type="submit"].filter({ hasText: 'Save' })`| Type + Text   | Multiple Save buttons exist per tab — filter helps scope |

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
| **Profile page tabs** | Personal Details, Contact Details, Emergency Contacts, etc. — Week 3 only touches Personal Details tab |

---

## Test Credentials

**Valid User:**
- Username: `Admin`
- Password: `admin123`

**Invalid Test Cases:**
- Wrong username: `InvalidUser` / `admin123`
- Wrong password: `Admin` / `WrongPassword123`
- Empty fields: trigger "Required" validation errors

---

## Locator Strategy Notes

**Preferred:** Attribute selectors (`name`, `id`, `data-testid`)  
**Acceptable:** Unique class names (`.oxd-alert-content-text`)  
**Avoid:** Generic tags alone (`button`, `input`), deep CSS paths, XPath

**Stability Ranking:**
1. 🟢 `data-testid` attributes (most stable — OrangeHRM does not use them)
2. 🟡 `name`, `id` attributes (stable — used for First/Last/Middle Name inputs)
3. 🟠 Unique class names (moderate — may change with redesign)
4. 🔴 Text content (fragile — translation issues)
5. 🔴 DOM structure / deep selectors (very fragile)

**Advanced Playwright Scoping:**  
All complex form locators are scoped to a parent container first
(e.g., `.oxd-table-filter`, `.orangehrm-card-container`) to prevent
accidentally selecting elements from the navigation bar or other sections.
Text filtering (`.filter({ hasText: '...' })`) is used extensively to isolate
specific input groups within a container.