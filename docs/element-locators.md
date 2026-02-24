# OrangeHRM Element Locators

**Last Updated:** February 5, 2026
**Application Version:** OrangeHRM Demo (Public Instance)

---

## Login Page

**URL:** `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Elements and Locators

| Element              | Selector                       | Selector Type | Notes                                      |
| :------------------- | :----------------------------- | :------------ | :----------------------------------------- |
| Username Input       | `input[name="username"]`       | Attribute     | Stable, name attribute unlikely to change  |
| Password Input       | `input[name="password"]`       | Attribute     | Stable                                     |
| Login Button         | `button[type="submit"]`        | Type + Text   | Generic type, should add text filter       |
| Error Alert          | `.oxd-alert-content-text`      | Class         | Displays on invalid credentials            |
| Login Panel          | `.orangehrm-login-slot`        | Class         | Container for login form                   |
| Validation Error     | `.oxd-input-field-error-message`| Class         | Shows "Required" for empty fields          |
| Forgot Password Link | Text: "Forgot your password"   | Text content  | Link below login button                    |

### Field Validations
- **Username empty:** "Required" message appears below field
- **Password empty:** "Required" message appears below field
- **Invalid credentials:** "Invalid credentials" alert appears at top

---

## Dashboard Page

**URL Pattern:** `/web/index.php/dashboard/index`

### Elements and Locators

| Element            | Selector                                      | Selector Type | Notes                         |
|--------------------|-----------------------------------------------|---------------|-------------------------------|
| Dashboard Heading  | `h6:has-text("Dashboard")`                    | Tag + Text    | Confirms successful login     |
| Main Navigation    | `.oxd-main-menu`                              | Class         | Left sidebar menu             |
| Admin Menu Item    | `a.oxd-main-menu-item:has-text("Admin")`      | Class + Text  | Specific menu option          |
| User Dropdown      | `.oxd-userdropdown`                           | Class         | Top-right, shows logged user  |
| Logout Option      | `a:has-text("Logout")`                        | Tag + Text    | Inside user dropdown          |

---

## Admin Module (User Management)

**URL Pattern:** `/web/index.php/admin/viewSystemUsers`

### Elements and Locators

| Element                   | Selector                                                                                       | Selector Type    | Notes                           |
|---------------------------|------------------------------------------------------------------------------------------------|------------------|---------------------------------|
| **Page Heading**          | `h6.oxd-topbar-header-breadcrumb-module`                                                       | Element + Class  | Validates module load           |
| **Search Username Input** | `searchContainer.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input')` | Scoped Filter    | Avoids brittle CSS paths        |
| **Add Button**            | `button:has-text("Add")`                                                                       | Element + Text   | Navigates to Add form           |
| **Table Rows**            | `.oxd-table-card`                                                                              | Class            | Used to iterate through users   |
| **Delete Confirm Dialog** | `.orangehrm-dialog-popup`                                                                      | Class            | Modal that appears on delete    |
| **Confirm Delete Button** | `deleteDialog.locator('button').filter({ hasText: 'Yes, Delete' })`                            | Scoped Filter    | Final delete confirmation       |

---

## Test Credentials

**Valid User:**
- Username: `Admin`
- Password: `admin123`

**Invalid Test Cases:**
- Wrong username: `InvalidUser` / `admin123`
- Wrong password: `Admin` / `WrongPassword123`
- Empty fields: trigger validation errors

---

## Locator Strategy Notes

**Preferred:** Attribute selectors (`name`, `id`, `data-testid`)
**Acceptable:** Unique class names (`.oxd-alert-content-text`)
**Avoid:** Generic tags alone (`button`, `input`), deep CSS paths, XPath

**Stability Ranking:**
1. 🟢 `data-testid` attributes (most stable, but OrangeHRM doesn't use them)
2. 🟡 `name`, `id` attributes (stable)
3. 🟠 Unique class names (moderate - may change with redesign)
4. 🔴 Text content (fragile - translation issues)
5. 🔴 DOM structure / deep selectors (very fragile)

**Advanced Playwright Scoping:**
For complex forms (like the Admin Add User form), locators should be scoped to a parent container (e.g., `.orangehrm-card-container`) to prevent accidentally selecting elements from the background UI or navigation bars. Text filtering (`.filter({ hasText: '...' })`) is used extensively to isolate specific input groups.