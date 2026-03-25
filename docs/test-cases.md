# Test Cases — OrangeHRM Automation Project

> **52 test cases** across 5 modules. Automated cases are executed via Playwright + Cucumber BDD.
> All test cases were written in Jira (project key: `OHRM`) and exported here for portfolio visibility.
> See [`/src/features/`](../src/features/) for the corresponding Gherkin scenarios.

---

## Summary

| Module | Total Cases | ✅ Automated | 🔵 Manual Only |
| :--- | :---: | :---: | :---: |
| Login | 5 | 5 | 0 |
| Dashboard | 6 | 6 | 0 |
| Admin | 12 | 9 | 3 |
| PIM | 21 | 16 | 5 |
| Leave | 8 | 6 | 2 |
| **Total** | **52** | **42** | **10** |

> **Manual Only** cases cover scenarios that require an isolated or non-shared environment
> (e.g. mismatched password validation that conflicts with shared state, leave submission
> requiring confirmed non-zero balance). They are fully documented and executable by a human tester.

---

## Login Module

**Feature file:** `src/features/login.feature`

| TC ID | Title | Type | Priority | Automation |
| :--- | :--- | :--- | :--- | :--- |
| `TC_LOGIN_001` | Valid login with correct credentials | Smoke Test | P0 - Critical | ✅ Automated |
| `TC_LOGIN_002` | Login fails with invalid username | Smoke Test | P0 - Critical | ✅ Automated |
| `TC_LOGIN_003` | Login fails with invalid password | Smoke Test | P0 - Critical | ✅ Automated |
| `TC_LOGIN_004` | Validation error when username is empty | Validation | P1 - High | ✅ Automated |
| `TC_LOGIN_005` | Validation error when password is empty | Validation | P1 - High | ✅ Automated |

<details>
<summary><strong>TC_LOGIN_001</strong> — Valid login with correct credentials</summary>

**Jira Issue:** `OHRM-1` | **Type:** Smoke Test | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that a user can successfully log in with valid credentials.

**Preconditions:**
- User navigates to OrangeHRM login page
- Application is accessible

**Test Steps:**
1. Open browser and navigate to `https://opensource-demo.orangehrmlive.com`
2. Verify login page is displayed
3. Enter username: `Admin`
4. Enter password: `admin123`
5. Click "Login" button

**Expected Result:**
- User is redirected to Dashboard page
- URL contains `/dashboard`
- Dashboard heading "Dashboard" is visible
- Main navigation menu is visible

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_LOGIN_002</strong> — Login fails with invalid username</summary>

**Jira Issue:** `OHRM-2` | **Type:** Smoke Test | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that login fails with an appropriate error when an invalid username is provided.

**Preconditions:**
- User is on the login page

**Test Steps:**
1. Navigate to login page
2. Enter username: `InvalidUser123`
3. Enter password: `admin123`
4. Click "Login" button

**Expected Result:**
- Error message is displayed
- Error text contains "Invalid credentials"
- User remains on login page
- Login button is still visible

**Test Data:** `Username: InvalidUser123 | Password: admin123`

</details>

<details>
<summary><strong>TC_LOGIN_003</strong> — Login fails with invalid password</summary>

**Jira Issue:** `OHRM-3` | **Type:** Smoke Test | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that login fails when correct username but wrong password is entered.

**Preconditions:**
- User is on the login page

**Test Steps:**
1. Navigate to login page
2. Enter username: `Admin`
3. Enter password: `WrongPassword123`
4. Click "Login" button

**Expected Result:**
- Error message is displayed
- Error text contains "Invalid credentials"
- User remains on login page
- Password field is cleared (security feature)

**Test Data:** `Username: Admin | Password: WrongPassword123`

</details>

<details>
<summary><strong>TC_LOGIN_004</strong> — Validation error when username is empty</summary>

**Jira Issue:** `OHRM-4` | **Type:** Validation | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that an appropriate validation message is shown when the username field is left empty.

**Preconditions:**
- User is on the login page

**Test Steps:**
1. Navigate to login page
2. Leave username field empty
3. Enter password: `admin123`
4. Click "Login" button

**Expected Result:**
- Validation message "Required" appears below username field
- Login does not proceed
- User remains on login page

**Test Data:** `Username: (empty) | Password: admin123`

</details>

<details>
<summary><strong>TC_LOGIN_005</strong> — Validation error when password is empty</summary>

**Jira Issue:** `OHRM-5` | **Type:** Validation | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that an appropriate validation message is shown when the password field is left empty.

**Preconditions:**
- User is on the login page

**Test Steps:**
1. Navigate to login page
2. Enter username: `Admin`
3. Leave password field empty
4. Click "Login" button

**Expected Result:**
- Validation message "Required" appears below password field
- Login does not proceed
- User remains on login page

**Test Data:** `Username: Admin | Password: (empty)`

</details>

---

## Dashboard Module

**Feature file:** `src/features/dashboard.feature`

| TC ID | Title | Type | Priority | Automation |
| :--- | :--- | :--- | :--- | :--- |
| `TC_DASHBOARD_001` | Dashboard loads correctly after successful login | Functional | P0 - Critical | ✅ Automated |
| `TC_DASHBOARD_002` | All main navigation menu items are visible | Functional | P1 - High | ✅ Automated |
| `TC_DASHBOARD_003` | Navigation from dashboard to Admin module | Functional | P1 - High | ✅ Automated |
| `TC_DASHBOARD_004` | Navigation from dashboard to PIM and Leave modules | Functional | P2 - Medium | ✅ Automated |
| `TC_DASHBOARD_005` | Logged-in user can successfully log out | Functional | P0 - Critical | ✅ Automated |
| `TC_DASHBOARD_006` | User cannot access dashboard directly after logging out | Functional | P2 - Medium | ✅ Automated |

<details>
<summary><strong>TC_DASHBOARD_001</strong> — Dashboard loads correctly after successful login</summary>

**Jira Issue:** `OHRM-6` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that the dashboard page loads correctly after a successful login.

**Preconditions:**
- Application is accessible at the OrangeHRM demo URL
- Valid credentials are available (Admin / admin123)
- User is not already logged in

**Test Steps:**
1. Navigate to the OrangeHRM login page
2. Enter valid username "Admin"
3. Enter valid password "admin123"
4. Click the Login button
5. Observe the resulting page

**Expected Result:**
- User is redirected to the dashboard
- URL contains `/dashboard/index`
- Dashboard heading is visible
- Main navigation menu is visible on the left sidebar

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_DASHBOARD_002</strong> — All main navigation menu items are visible</summary>

**Jira Issue:** `OHRM-7` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify all main navigation menu items are visible on the dashboard.

**Preconditions:**
- User is logged in as Admin
- User is on the dashboard page

**Test Steps:**
1. Navigate to the OrangeHRM login page
2. Login with valid credentials
3. Observe the left navigation sidebar
4. Verify each menu item is visible: Admin, PIM, Leave, Time, Recruitment, My Info, Performance

**Expected Result:**
- All 7 navigation menu items are visible in the left sidebar
- Each menu item is clickable

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_DASHBOARD_003</strong> — Navigation from dashboard to Admin module</summary>

**Jira Issue:** `OHRM-8` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify navigation from the dashboard to the Admin module.

**Preconditions:**
- User is logged in as Admin
- User is on the dashboard page

**Test Steps:**
1. Login with valid credentials
2. Observe the dashboard page loads
3. Click the "Admin" menu item in the left navigation
4. Observe the resulting page

**Expected Result:**
- User is redirected to the Admin module
- URL contains `/admin/`
- Admin page heading is visible

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_DASHBOARD_004</strong> — Navigation from dashboard to PIM and Leave modules</summary>

**Jira Issue:** `OHRM-9` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify navigation from the dashboard to the PIM and Leave modules.

**Preconditions:**
- User is logged in as Admin
- User is on the dashboard page

**Test Steps:**
1. Login with valid credentials
2. Click the "PIM" menu item in the left navigation
3. Verify URL contains `/pim/`
4. Navigate back to dashboard
5. Click the "Leave" menu item
6. Verify URL contains `/leave/`

**Expected Result:**
- PIM page loads successfully after clicking PIM menu
- Leave page loads successfully after clicking Leave menu
- URL updates correctly for each navigation

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_DASHBOARD_005</strong> — Logged-in user can successfully log out</summary>

**Jira Issue:** `OHRM-10` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that a logged-in user can successfully log out.

**Preconditions:**
- User is logged in as Admin
- User is on the dashboard page

**Test Steps:**
1. Login with valid credentials
2. Locate the user dropdown in the top-right corner
3. Click the user dropdown
4. Verify the Logout option appears
5. Click "Logout"
6. Observe the resulting page

**Expected Result:**
- User dropdown opens on click
- Logout option is visible in the dropdown
- After clicking Logout, user is redirected to login page
- URL contains `/auth/login`

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_DASHBOARD_006</strong> — User cannot access dashboard directly after logging out</summary>

**Jira Issue:** `OHRM-11` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that the user cannot access the dashboard directly after logging out.

**Preconditions:**
- User has successfully logged out
- User is on the login page

**Test Steps:**
1. Login and then logout to reach the login page
2. Manually navigate to `/web/index.php/dashboard/index` in the browser
3. Observe the resulting page

**Expected Result:**
- Application does not allow unauthenticated access to the dashboard
- User is redirected back to the login page
- URL contains `/auth/login`

**Test Data:** `Username: Admin | Password: admin123 | Direct URL: /web/index.php/dashboard/index`

</details>
## Admin Module — User Management

**Feature file:** `src/features/admin.feature`

| TC ID | Title | Type | Priority | Automation |
| :--- | :--- | :--- | :--- | :--- |
| `TC_ADMIN_001` | Admin module loads and displays User Management page | Functional | P0 - Critical | ✅ Automated |
| `TC_ADMIN_002` | Search for existing user by username returns correct result | Functional | P1 - High | ✅ Automated |
| `TC_ADMIN_003` | Search for non-existent username displays No Records Found | Functional | P1 - High | ✅ Automated |
| `TC_ADMIN_004` | Reset button clears all search filter fields | Functional | P2 - Medium | ✅ Automated |
| `TC_ADMIN_005` | Add new system user successfully with valid data | Functional | P0 - Critical | ✅ Automated |
| `TC_ADMIN_006` | Newly created user appears in search results by username | Functional | P1 - High | ✅ Automated |
| `TC_ADMIN_007` | Edit existing user username successfully | Functional | P1 - High | ✅ Automated |
| `TC_ADMIN_008` | Updated username appears correctly in search results | Functional | P1 - High | ✅ Automated |
| `TC_ADMIN_009` | Delete user successfully and verify removal from list | Functional | P1 - High | ✅ Automated |
| `TC_ADMIN_010` | Add user form displays validation errors for empty required fields | Validation | P1 - High | ✅ Automated |
| `TC_ADMIN_011` | Add user fails when password and confirm password do not match | Validation | P2 - Medium | 🔵 Manual Only |
| `TC_ADMIN_012` | Canceling delete confirmation dialog preserves the user record | Functional | P2 - Medium | 🔵 Manual Only |

<details>
<summary><strong>TC_ADMIN_001</strong> — Admin module loads and displays User Management page</summary>

**Jira Issue:** `OHRM-13` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify the Admin module loads successfully and displays the User Management page with the correct heading and search form.

**Preconditions:**
- User is logged in as Admin
- User is on the Dashboard page

**Test Steps:**
1. Log in with username "Admin" and password "admin123"
2. Locate "Admin" in the left navigation sidebar
3. Click the "Admin" menu item
4. Wait for the page to load

**Expected Result:**
- URL contains `/admin/viewSystemUsers`
- Page heading "User Management" is visible
- Search form with Username, User Role, Employee Name, and Status fields is visible
- "Add" button is present

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_ADMIN_002</strong> — Search for existing user by username returns correct result</summary>

**Jira Issue:** `OHRM-14` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that searching for an existing username returns the matching user record in the results table.

**Preconditions:**
- User is logged in as Admin
- User is on the User Management page
- A user with username "Admin" exists in the system

**Test Steps:**
1. Navigate to the Admin → User Management page
2. Enter "Admin" in the Username search field
3. Click the "Search" button
4. Wait for the API response (`GET /api/v2/admin/users`)

**Expected Result:**
- The results table displays at least one row
- The row contains a user with username "Admin"
- No unrelated usernames appear in filtered results

**Test Data:** `Search Username: Admin`

</details>

<details>
<summary><strong>TC_ADMIN_003</strong> — Search for non-existent username displays No Records Found</summary>

**Jira Issue:** `OHRM-15` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that searching for a username that does not exist returns a "No Records Found" state.

**Preconditions:**
- User is logged in as Admin
- User is on the User Management page

**Test Steps:**
1. Navigate to the Admin → User Management page
2. Enter "NonExistentUser_xyz987" in the Username search field
3. Click the "Search" button
4. Wait for the API response

**Expected Result:**
- No rows appear in the results table
- A "No Records Found" toast notification is displayed
- No error messages or page breaks occur

**Test Data:** `Search Username: NonExistentUser_xyz987`

</details>

<details>
<summary><strong>TC_ADMIN_004</strong> — Reset button clears all search filter fields</summary>

**Jira Issue:** `OHRM-16` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that clicking the Reset button clears all search filter fields on the User Management page.

**Preconditions:**
- User is logged in as Admin
- User is on the User Management page
- A search has been performed (Username field has a value)

**Test Steps:**
1. Navigate to the Admin → User Management page
2. Enter "Admin" in the Username search field
3. Click "Search" and observe results
4. Click the "Reset" button
5. Inspect the Username search field

**Expected Result:**
- Username field is cleared (empty string)
- User Role and Status dropdowns reset to default
- Results table reloads with all users

**Test Data:** `Search Username: Admin`

</details>

<details>
<summary><strong>TC_ADMIN_005</strong> — Add new system user successfully with valid data</summary>

**Jira Issue:** `OHRM-17` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that a new system user can be added successfully with all required fields completed.

**Preconditions:**
- User is logged in as Admin
- User is on the User Management page
- At least one employee record exists in PIM to assign to the new user

**Test Steps:**
1. Click the "Add" button on the User Management page
2. Select "ESS" from the User Role dropdown
3. Type a seed letter in the Employee Name autocomplete field (e.g. "a")
4. Wait for autocomplete suggestions to load
5. Select the first suggestion from the dropdown
6. Select "Enabled" from the Status dropdown
7. Enter a unique username (e.g. `TestUser_<timestamp>`)
8. Enter a valid password (e.g. `Test1741234567890!`)
9. Enter the same value in Confirm Password
10. Click the "Save" button

**Expected Result:**
- Form submits without validation errors
- Success toast notification appears
- User is redirected back to the User Management list
- New user row is visible in the table

**Test Data:** `Username: TestUser_<timestamp> | Role: ESS | Status: Enabled | Password: Test<timestamp>!`

</details>

<details>
<summary><strong>TC_ADMIN_006</strong> — Newly created user appears in search results by username</summary>

**Jira Issue:** `OHRM-18` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that a newly added system user immediately appears in search results when searching by their exact username.

**Preconditions:**
- A new user has been created (see TC_ADMIN_005)
- User is on the User Management page

**Test Steps:**
1. Navigate to the User Management page
2. Enter the newly created username in the Username search field
3. Click the "Search" button
4. Wait for the API response

**Expected Result:**
- Exactly one result row appears
- The row contains the exact username entered during creation
- The assigned role and status match what was set during creation

**Test Data:** `Username: TestUser_<timestamp> (generated in TC_ADMIN_005)`

</details>

<details>
<summary><strong>TC_ADMIN_007</strong> — Edit existing user username successfully</summary>

**Jira Issue:** `OHRM-19` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that an existing system user's username can be updated successfully via the edit form.

**Preconditions:**
- A test user exists (created in TC_ADMIN_005)
- User is on the User Management page

**Test Steps:**
1. Search for the test user by their current username
2. Click the edit (pencil) icon in the user's row
3. Wait for the edit form to load
4. Clear the Username field
5. Enter a new unique username (e.g. `TestUser_edited_<timestamp>`)
6. Click the "Save" button

**Expected Result:**
- Success toast notification (.oxd-toast-content--success) appears
- User is redirected back to the User Management list
- The new username is visible in the table

**Test Data:** `New Username: TestUser_edited_<timestamp>`

</details>

<details>
<summary><strong>TC_ADMIN_008</strong> — Updated username appears correctly in search results</summary>

**Jira Issue:** `OHRM-20` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify the updated username is searchable and the old username no longer returns results.

**Preconditions:**
- TC_ADMIN_007 has been completed
- User is on the User Management page

**Test Steps:**
1. Search by the **new** username
2. Verify the user appears in results
3. Search by the **old** username
4. Verify no records are found

**Expected Result:**
- New username returns exactly one result row
- Old username returns "No Records Found"

**Test Data:** `Old Username: TestUser_<timestamp> | New Username: TestUser_edited_<timestamp>`

</details>

<details>
<summary><strong>TC_ADMIN_009</strong> — Delete user successfully and verify removal from list</summary>

**Jira Issue:** `OHRM-21` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that a system user can be deleted and no longer appears in the user list.

**Preconditions:**
- A test user exists in the system
- User is on the User Management page

**Test Steps:**
1. Search for the test user by username
2. Click the delete (trash) icon in the user's row
3. Verify the confirmation dialog appears
4. Click "Yes, Delete" in the dialog
5. Wait for dialog to close
6. Verify success toast notification appears
7. Search for the deleted user by username
8. Verify no records are found

**Expected Result:**
- Confirmation dialog appears on delete icon click
- Success toast (.oxd-toast-content--success) shown after confirmation
- Deleted user no longer appears in search results
- "No Records Found" displayed when searching by the deleted username

**Test Data:** `Username: TestUser_edited_<timestamp> (from TC_ADMIN_007)`

</details>

<details>
<summary><strong>TC_ADMIN_010</strong> — Add user form displays validation errors for empty required fields</summary>

**Jira Issue:** `OHRM-22` | **Type:** Validation | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that the Add User form displays validation errors when required fields are left empty and Save is clicked.

**Preconditions:**
- User is logged in as Admin
- User is on the Add User form

**Test Steps:**
1. Click "Add" on the User Management page
2. Leave all fields empty (do not select User Role, Employee Name, Status, or Username)
3. Click the "Save" button
4. Observe validation messages

**Expected Result:**
- Form is NOT submitted
- "Required" validation error appears below each mandatory empty field
- User remains on the Add User form
- No API call is made

**Test Data:** `All fields: (empty)`

</details>

<details>
<summary><strong>TC_ADMIN_011</strong> — Add user fails when password and confirm password do not match</summary>

**Jira Issue:** `OHRM-23` | **Type:** Validation | **Priority:** P2 - Medium | **Automation:** 🔵 Manual Only

**Objective:**
Verify that the Add User form rejects submission when the Password and Confirm Password fields contain different values.

**Preconditions:**
- User is logged in as Admin
- User is on the Add User form

**Test Steps:**
1. Fill in all required fields with valid values
2. Enter password: `Test123!`
3. Enter confirm password: `DifferentPass123!`
4. Click "Save"
5. Observe the form response

**Expected Result:**
- Form is NOT submitted
- Validation error "Passwords do not match" appears below the Confirm Password field
- User remains on the Add User form

**Test Data:** `Password: Test123! | Confirm Password: DifferentPass123!`

> **Note:** Manual Only — OrangeHRM's password mismatch validation behavior is inconsistent on the shared demo when other users are concurrently modifying user records.

</details>

<details>
<summary><strong>TC_ADMIN_012</strong> — Canceling delete confirmation dialog preserves the user record</summary>

**Jira Issue:** `OHRM-24` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** 🔵 Manual Only

**Objective:**
Verify that clicking "No, Cancel" on the delete confirmation dialog does NOT delete the user.

**Preconditions:**
- A test user exists in the system
- User is on the User Management page

**Test Steps:**
1. Search for the test user by username
2. Click the delete (trash) icon in the user's row
3. Verify the confirmation dialog appears
4. Click "No, Cancel" in the dialog
5. Verify the dialog closes
6. Search for the user by username again

**Expected Result:**
- Dialog closes without deleting the user
- No success toast is shown
- User still appears in search results

**Test Data:** `Username: TestUser_<timestamp>`

> **Note:** Manual Only — requires a guaranteed clean user record on the shared demo to verify cancel-then-search reliably.

</details>
## PIM Module — Employee Management

**Feature file:** `src/features/pim.feature`

| TC ID | Title | Type | Priority | Automation |
| :--- | :--- | :--- | :--- | :--- |
| `TC_PIM_001` | PIM module loads and displays Employee List page | Functional | P0 - Critical | ✅ Automated |
| `TC_PIM_002` | Search for existing employee by name returns correct result | Functional | P1 - High | ✅ Automated |
| `TC_PIM_003` | Search for non-existent employee displays No Records Found | Functional | P1 - High | ✅ Automated |
| `TC_PIM_004` | Search by valid Employee ID returns the specific employee record | Functional | P2 - Medium | ✅ Automated |
| `TC_PIM_005` | Reset button successfully clears all search filter fields and reloads table | Functional | P2 - Medium | ✅ Automated |
| `TC_PIM_006` | Add new employee successfully with unique first name, last name, and custom ID | Functional | P0 - Critical | ✅ Automated |
| `TC_PIM_007` | Newly created employee appears accurately in search results by name | Functional | P1 - High | ✅ Automated |
| `TC_PIM_008` | Add Employee form displays validation errors when required Name fields are empty | Validation | P1 - High | ✅ Automated |
| `TC_PIM_009` | Employee ID field accepts custom numeric input to prevent parallel data collisions | Functional | P2 - Medium | ✅ Automated |
| `TC_PIM_010` | Edit existing employee first name successfully via Personal Details tab | Functional | P1 - High | ✅ Automated |
| `TC_PIM_011` | Delete employee record successfully and verify removal from list | Functional | P1 - High | ✅ Automated |
| `TC_PIM_012` | Canceling delete confirmation dialog preserves the employee record | Functional | P2 - Medium | 🔵 Manual Only |
| `TC_PIM_013` | Full E2E Lifecycle: Add, Verify, Edit, Verify, Delete, Verify, and Logout | End-to-End | P0 - Critical | ✅ Automated |
| `TC_PIM_014` | Add multiple employees successfully using data-driven Scenario Outline | Functional / Data-Driven | P2 - Medium | ✅ Automated |
| `TC_PIM_015` | Left navigation sidebar correctly routes to the PIM module | Functional | P2 - Medium | ✅ Automated |
| `TC_PIM_016` | Add Employee form fails submission and shows error when Last Name is empty | Validation | P2 - Medium | 🔵 Manual Only |
| `TC_PIM_017` | Middle Name field is optional and allows successful form submission when empty | Functional | P2 - Medium | 🔵 Manual Only |
| `TC_PIM_018` | Partial name search correctly returns all matching employee records | Functional | P1 - High | 🔵 Manual Only |
| `TC_PIM_019` | Personal Details page correctly displays the exact names entered during creation | Functional | P1 - High | 🔵 Manual Only |
| `TC_PIM_020` | Add Employee workflow executes successfully across Chromium, Firefox, and WebKit | Functional / Cross-Browser | P1 - High | ✅ Automated |
| `TC_PIM_021` | Framework supports parallel execution (2 workers) without data collisions or state bleeding | Infrastructure / Non-Functional | P1 - High | ✅ Automated |

<details>
<summary><strong>TC_PIM_001</strong> — PIM module loads and displays Employee List page</summary>

**Jira Issue:** `OHRM-25` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify the PIM module loads successfully and displays the Employee List page with the correct heading and search form.

**Preconditions:**
- User is logged in as Admin
- User is on the Dashboard page

**Test Steps:**
1. Log in with username "Admin" and password "admin123"
2. Click "PIM" in the left navigation sidebar
3. Wait for the page to load
4. Verify URL contains `/pim/viewEmployeeList`
5. Verify the PIM heading and search section are visible

**Expected Result:**
- URL contains `/pim/viewEmployeeList`
- PIM page heading is visible
- Search form with Employee Name and Employee ID fields is visible
- "Add" button is present

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_PIM_002</strong> — Search for existing employee by name returns correct result</summary>

**Jira Issue:** `OHRM-26` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that searching for an existing employee by name returns at least one matching result.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page
- At least one employee named "Admin" exists in the demo data

**Test Steps:**
1. Navigate to PIM → Employee List
2. Enter "Admin" in the Employee Name search field
3. Click the "Search" button
4. Wait for the API response (`GET /api/v2/pim/employees`)

**Expected Result:**
- Results table displays at least one matching row
- Employee name in results contains "Admin"
- No unrelated results appear

**Test Data:** `Search Name: Admin`

</details>

<details>
<summary><strong>TC_PIM_003</strong> — Search for non-existent employee displays No Records Found</summary>

**Jira Issue:** `OHRM-26` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that searching for a name that does not exist returns a "No Records Found" state.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page

**Test Steps:**
1. Navigate to PIM → Employee List
2. Enter "ZZZ_NonExistent_XYZ" in the Employee Name search field
3. Click the "Search" button
4. Wait for the API response

**Expected Result:**
- No rows appear in the results table
- "No Records Found" toast notification is displayed
- No error messages or page breaks

**Test Data:** `Search Name: ZZZ_NonExistent_XYZ`

</details>

<details>
<summary><strong>TC_PIM_004</strong> — Search by valid Employee ID returns the specific employee record</summary>

**Jira Issue:** `OHRM-27` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that searching for an employee by Employee ID returns the correct result.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page
- At least one employee with ID "0001" exists in the demo data

**Test Steps:**
1. Leave the Employee Name field empty
2. Type "0001" in the Employee ID search field
3. Click the "Search" button
4. Wait for the API response

**Expected Result:**
- The employee with ID 0001 appears in the results table
- No other unrelated employees are shown

**Test Data:** `Employee ID: 0001`

</details>

<details>
<summary><strong>TC_PIM_005</strong> — Reset button successfully clears all search filter fields and reloads table</summary>

**Jira Issue:** `OHRM-28` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that clicking the Reset button clears all search filter fields.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page
- A search has been performed (fields contain values)

**Test Steps:**
1. Type "Admin" in the Employee Name search field
2. Click the "Search" button
3. Verify results are shown
4. Click the "Reset" button
5. Inspect the Employee Name and Employee ID fields

**Expected Result:**
- Employee Name field is cleared (empty string)
- Employee ID field is cleared (empty string)
- Results table reloads with all employees

**Test Data:** `Search term: Admin`

</details>

<details>
<summary><strong>TC_PIM_006</strong> — Add new employee successfully with unique first name, last name, and custom ID</summary>

**Jira Issue:** `OHRM-29` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify that a new employee can be added successfully with valid first and last name data.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page

**Test Steps:**
1. Click the "Add" button
2. Wait for the Add Employee form to load
3. Overwrite the auto-generated Employee ID with a unique custom value
4. Enter a unique first name (e.g., `TestEmp<timestamp>`)
5. Enter a unique last name (e.g., `TestEmp<timestamp>`)
6. Click the "Save" button
7. Wait for redirect to the employee profile page

**Expected Result:**
- Form is submitted successfully
- User is redirected to the new employee's Personal Details profile page
- First name, last name, and custom Employee ID entered are visible

**Test Data:** `First Name: DataGenerator.generateUniqueEmployeeName() | Last Name: DataGenerator.generateUniqueEmployeeName() | Employee ID: Math.random() generated string`

</details>

<details>
<summary><strong>TC_PIM_007</strong> — Newly created employee appears accurately in search results by name</summary>

**Jira Issue:** `OHRM-30` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that a newly added employee appears in the employee list when searched by name.

**Preconditions:**
- A new employee has been added (see TC_PIM_006)
- User has navigated back to the PIM Employee List page

**Test Steps:**
1. Navigate to the PIM Employee List page
2. Enter the newly added employee's first name in the Employee Name field
3. Click the "Search" button
4. Verify the employee appears in the results table

**Expected Result:**
- The newly created employee is visible in the search results table
- The employee's name matches the data entered during creation

**Test Data:** `First Name: the unique name generated in TC_PIM_006`

</details>

<details>
<summary><strong>TC_PIM_008</strong> — Add Employee form displays validation errors when required Name fields are empty</summary>

**Jira Issue:** `OHRM-31` | **Type:** Validation | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that the Add Employee form displays validation errors when First Name and Last Name are left empty.

**Preconditions:**
- User is logged in as Admin
- User is on the Add Employee form

**Test Steps:**
1. Click the "Add" button on the PIM Employee List page
2. Clear the First Name field (leave empty)
3. Clear the Last Name field (leave empty)
4. Click the "Save" button
5. Observe the form

**Expected Result:**
- Form is NOT submitted
- Inline validation error messages appear below the required fields
- Error message text reads "Required" below First Name and Last Name fields

**Test Data:** `First Name: (empty) | Last Name: (empty)`

</details>

<details>
<summary><strong>TC_PIM_009</strong> — Employee ID field accepts custom numeric input to prevent parallel data collisions</summary>

**Jira Issue:** `OHRM-32` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that the auto-generated Employee ID field can be manually overwritten to support parallel data creation.

**Preconditions:**
- User is logged in as Admin
- User is on the Add Employee form

**Test Steps:**
1. Click the "Add" button on the PIM Employee List page
2. Wait for the Add Employee form to load
3. Locate the Employee ID field and note the pre-populated value
4. Clear the field and enter a custom 6-digit numeric string
5. Fill in required name fields and click Save

**Expected Result:**
- The Employee ID field accepts custom user input
- The system successfully saves the employee with the custom ID instead of the auto-generated one

**Test Data:** `Employee ID: Random 6-digit string (e.g., Math.floor(100000 + Math.random() * 900000))`

</details>

<details>
<summary><strong>TC_PIM_010</strong> — Edit existing employee first name successfully via Personal Details tab</summary>

**Jira Issue:** `OHRM-33` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that an existing employee's name can be edited successfully via the Personal Details tab.

**Preconditions:**
- A test employee exists in the system (added via TC_PIM_006)
- User is on the PIM Employee List page

**Test Steps:**
1. Search for the test employee by name
2. Click the edit (pencil) icon in the employee's row
3. Wait for the Personal Details page to load
4. Clear the First Name field
5. Enter a new unique first name
6. Click the "Save" button in the Personal Details section
7. Observe the success notification

**Expected Result:**
- A success toast notification (.oxd-toast-content--success) is displayed
- The employee's first name is updated to the new value
- Searching by the new name returns the employee record

**Test Data:** `Original First Name: TestEmp<timestamp> | New First Name: DataGenerator.generateUniqueEmployeeName()`

</details>

<details>
<summary><strong>TC_PIM_011</strong> — Delete employee record successfully and verify removal from list</summary>

**Jira Issue:** `OHRM-34` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that an employee record can be deleted and no longer appears in the employee list.

**Preconditions:**
- A test employee exists in the system (added via TC_PIM_006)
- User is on the PIM Employee List page

**Test Steps:**
1. Search for the test employee by name
2. Click the delete (trash) icon in the employee's row
3. Verify the confirmation dialog appears
4. Click "Yes, Delete" in the confirmation dialog
5. Wait for the dialog to close
6. Verify success toast notification appears
7. Search for the deleted employee by name
8. Verify no records are found

**Expected Result:**
- Confirmation dialog with "Yes, Delete" button appears on delete icon click
- After confirmation, a success toast (.oxd-toast-content--success) is shown
- The deleted employee no longer appears in search results
- "No Records Found" toast is shown when searching by the deleted name

**Test Data:** `Employee Name: TestEmp<timestamp> (dynamically generated)`

</details>

<details>
<summary><strong>TC_PIM_012</strong> — Canceling delete confirmation dialog preserves the employee record</summary>

**Jira Issue:** `OHRM-35` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** 🔵 Manual Only

**Objective:**
Verify that clicking "No, Cancel" on the delete confirmation dialog cancels the deletion and the employee record is preserved.

**Preconditions:**
- A test employee exists in the system
- User is on the PIM Employee List page

**Test Steps:**
1. Search for the test employee by name
2. Click the delete (trash) icon in the employee's row
3. Verify the confirmation dialog appears
4. Click "No, Cancel" in the dialog
5. Verify the dialog closes
6. Search for the employee by name again

**Expected Result:**
- The confirmation dialog closes without deleting the employee
- No success toast is shown
- The employee still appears in the search results after searching again

**Test Data:** `Employee Name: TestEmp<timestamp>`

> **Note:** Manual Only — requires a guaranteed clean employee record on the shared demo to verify cancel-then-search reliably.

</details>

<details>
<summary><strong>TC_PIM_013</strong> — Full E2E Lifecycle: Add, Verify, Edit, Verify, Delete, Verify, and Logout</summary>

**Jira Issue:** `OHRM-36` | **Type:** End-to-End | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify the complete employee management lifecycle: Add → Verify → Edit → Verify → Delete → Verify → Logout.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page

**Test Steps:**
1. Click the "Add" button and fill in a unique first and last name
2. Click "Save" and verify redirect to employee profile page
3. Navigate back to the employee list
4. Search for the new employee by first name
5. Verify the employee appears in the results table
6. Click the edit icon for the employee
7. Update the first name to a new unique value
8. Click "Save" and verify success toast
9. Navigate back to the employee list
10. Search by the updated first name
11. Verify the employee appears with the updated name
12. Click the delete icon for the employee
13. Confirm deletion via "Yes, Delete"
14. Verify success toast and employee no longer in results
15. Click the user dropdown and select "Logout"
16. Verify redirect to the login page

**Expected Result:**
- Each step completes without errors
- Employee is successfully created, found, updated, found again, deleted, not found, and session ends on the login page

**Test Data:** `All names: DataGenerator.generateUniqueEmployeeName()`

</details>

<details>
<summary><strong>TC_PIM_014</strong> — Add multiple employees successfully using data-driven Scenario Outline</summary>

**Jira Issue:** `OHRM-37` | **Type:** Functional / Data-Driven | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that multiple employees with different name combinations can be added successfully using a data-driven Scenario Outline approach.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page

**Test Steps:**
1. Click the "Add" button
2. Enter the first name from the data set (see Test Data)
3. Enter the last name from the data set
4. Click "Save"
5. Verify redirect to the employee profile page
6. Repeat for each row in the Examples table

**Expected Result:**
- All three employee records are created successfully
- For each record, the user is redirected to the profile page after saving
- No validation errors appear for any data set row

**Test Data:**

| firstName | lastName |
| :--- | :--- |
| TestDataFirst1 | TestDataLast1 |
| TestDataFirst2 | TestDataLast2 |
| TestDataFirst3 | TestDataLast3 |

</details>

<details>
<summary><strong>TC_PIM_015</strong> — Left navigation sidebar correctly routes to the PIM module</summary>

**Jira Issue:** `OHRM-38` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that navigating to the PIM module from the Dashboard using the left navigation menu works correctly.

**Preconditions:**
- User is logged in as Admin
- User is currently on the Dashboard page

**Test Steps:**
1. Locate "PIM" in the left navigation sidebar
2. Click the "PIM" menu item
3. Wait for the page to load
4. Verify the URL contains "/pim/"
5. Verify the PIM module heading is visible

**Expected Result:**
- Clicking "PIM" navigates the user to the PIM Employee List page
- URL changes to contain `/pim/viewEmployeeList`
- PIM page heading and search section are visible

**Test Data:** N/A

</details>

<details>
<summary><strong>TC_PIM_016</strong> — Add Employee form fails submission and shows error when Last Name is empty</summary>

**Jira Issue:** `OHRM-39` | **Type:** Validation | **Priority:** P2 - Medium | **Automation:** 🔵 Manual Only

**Objective:**
Verify that the Add Employee form does not submit when only the first name is provided and last name is left empty.

**Preconditions:**
- User is logged in as Admin
- User is on the Add Employee form

**Test Steps:**
1. Click the "Add" button on the PIM Employee List page
2. Enter a valid value in the First Name field
3. Leave the Last Name field empty
4. Click the "Save" button
5. Observe the form behaviour

**Expected Result:**
- The form is NOT submitted
- A "Required" validation error appears below the Last Name field only
- The First Name field does not show an error

**Test Data:** `First Name: TestValidation | Last Name: (empty)`

</details>

<details>
<summary><strong>TC_PIM_017</strong> — Middle Name field is optional and allows successful form submission when empty</summary>

**Jira Issue:** `OHRM-40` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** 🔵 Manual Only

**Objective:**
Verify that the employee Middle Name field is optional and the form saves successfully when it is left blank.

**Preconditions:**
- User is logged in as Admin
- User is on the Add Employee form

**Test Steps:**
1. Click the "Add" button on the PIM Employee List page
2. Enter a unique value in the First Name field
3. Leave the Middle Name field empty
4. Enter a unique value in the Last Name field
5. Click the "Save" button
6. Verify redirect to the employee profile page

**Expected Result:**
- The form submits successfully without a middle name
- User is redirected to the employee profile page
- No validation error appears for the Middle Name field

**Test Data:** `First Name: DataGenerator.generateUniqueEmployeeName() | Middle Name: (empty) | Last Name: DataGenerator.generateUniqueEmployeeName()`

</details>

<details>
<summary><strong>TC_PIM_018</strong> — Partial name search correctly returns all matching employee records</summary>

**Jira Issue:** `OHRM-41` | **Type:** Functional | **Priority:** P1 - High | **Automation:** 🔵 Manual Only

**Objective:**
Verify that the employee search form correctly handles a partial name search and returns all matching employees.

**Preconditions:**
- User is logged in as Admin
- User is on the PIM Employee List page
- Multiple employees with names starting with "Test" exist from prior runs

**Test Steps:**
1. Type "Test" in the Employee Name search field
2. Click the "Search" button
3. Wait for the API response
4. Count the number of rows in the results table
5. Verify each row's employee name contains "Test"

**Expected Result:**
- All employees whose names contain "Test" are returned
- Multiple rows may appear (due to previous test runs on the shared demo)
- No employees without "Test" in their name appear in the results

**Test Data:** `Search term: Test`

> **Note:** Manual Only — result count is non-deterministic on the shared demo (varies by how many test runs have been executed previously).

</details>

<details>
<summary><strong>TC_PIM_019</strong> — Personal Details page correctly displays the exact names entered during creation</summary>

**Jira Issue:** `OHRM-42` | **Type:** Functional | **Priority:** P1 - High | **Automation:** 🔵 Manual Only

**Objective:**
Verify that the Personal Details page of an employee displays the correct first name and last name that were entered during creation.

**Preconditions:**
- A new employee has been added with known first and last name
- User has been redirected to the employee's profile page after saving

**Test Steps:**
1. After saving a new employee, observe the Personal Details page
2. Locate the First Name input field
3. Verify it contains the value entered during creation
4. Locate the Last Name input field
5. Verify it contains the value entered during creation

**Expected Result:**
- First Name field shows the exact value entered during the Add Employee step
- Last Name field shows the exact value entered during the Add Employee step
- The profile page URL contains the auto-generated employee number

**Test Data:** `First Name: DataGenerator.generateUniqueEmployeeName() | Last Name: DataGenerator.generateUniqueEmployeeName()`

</details>

<details>
<summary><strong>TC_PIM_020</strong> — Add Employee workflow executes successfully across Chromium, Firefox, and WebKit</summary>

**Jira Issue:** `OHRM-43` | **Type:** Functional / Cross-Browser | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that the PIM Add Employee workflow completes successfully across all three supported browsers: Chromium, Firefox, and WebKit.

**Preconditions:**
- Tests are executed using `npm run test:cross-browser`
- OrangeHRM demo site is accessible

**Test Steps:**
1. Run: `npm run test:cross-browser`
2. Observe execution on Chromium — verify Add Employee completes
3. Observe execution on Firefox — verify Add Employee completes
4. Observe execution on WebKit — verify Add Employee completes
5. Review the three generated HTML reports: `reports/cucumber-chromium.html`, `reports/cucumber-firefox.html`, `reports/cucumber-webkit.html`

**Expected Result:**
- The full active suite (tags `not @skip`) passes on all three browser engines
- All three report files are generated with green status

**Test Data:** `Dynamic names per browser run`

</details>

<details>
<summary><strong>TC_PIM_021</strong> — Framework supports parallel execution (2 workers) without data collisions or state bleeding</summary>

**Jira Issue:** `OHRM-44` | **Type:** Infrastructure / Non-Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify that the test automation framework supports parallel execution without state bleeding or data collisions between worker processes.

**Preconditions:**
- `cucumber.json` is configured with `"parallel": 2`
- Framework utilizes `CustomWorld` (`this.scenarioData`) for state management

**Test Steps:**
1. Open terminal and run the regression suite using: `npm test`
2. Observe Cucumber spawn 2 parallel worker processes
3. Monitor the dynamic data generation (Employee IDs and Names) during the run
4. Review the final Cucumber execution report

**Expected Result:**
- Multiple scenarios execute simultaneously
- No variables or state bleed between Worker 1 and Worker 2
- Custom Employee ID injection prevents OrangeHRM database race conditions
- Suite completes significantly faster than sequential execution with 100% pass rate

**Test Data:** N/A — framework-level infrastructure test

</details>
## Leave Module — Leave Management

**Feature file:** `src/features/leave.feature`

| TC ID | Title | Type | Priority | Automation |
| :--- | :--- | :--- | :--- | :--- |
| `TC_LEAVE_001` | Leave module loads successfully and displays navigation options | Functional | P0 - Critical | ✅ Automated |
| `TC_LEAVE_002` | Apply Leave page renders successfully with form or zero-balance guard | Functional | P0 - Critical | ✅ Automated |
| `TC_LEAVE_003` | Apply leave request submitted successfully with valid data | Functional | P1 - High | 🔵 Manual Only |
| `TC_LEAVE_004` | Apply leave form displays validation errors for empty required fields | Validation | P1 - High | 🔵 Manual Only |
| `TC_LEAVE_005` | My Leave List loads and displays results area | Functional | P1 - High | ✅ Automated |
| `TC_LEAVE_006` | My Leave List filters results successfully by leave status | Functional | P2 - Medium | ✅ Automated |
| `TC_LEAVE_007` | Leave List admin tab displays all expected table columns | Functional | P2 - Medium | ✅ Automated |
| `TC_LEAVE_008` | End-to-end leave management flow completes successfully | End-to-End | P0 - Critical | ✅ Automated |

<details>
<summary><strong>TC_LEAVE_001</strong> — Leave module loads successfully and displays navigation options</summary>

**Jira Issue:** `OHRM-45` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify the Leave module loads successfully after login and displays the correct navigation options.

**Preconditions:**
- Application is accessible at `https://opensource-demo.orangehrmlive.com`
- Admin user credentials are valid (Admin / admin123)
- User is logged in and on the Dashboard

**Test Steps:**
1. Navigate to `https://opensource-demo.orangehrmlive.com`
2. Log in with username "Admin" and password "admin123"
3. Click "Leave" in the left navigation menu
4. Observe the page heading and top navigation bar

**Expected Result:**
- Leave module heading is visible
- Top navigation bar displays "Apply", "My Leave", "Entitlements", "Reports", "Configure", and "Leave List" options
- No error messages or broken UI elements

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_LEAVE_002</strong> — Apply Leave page renders successfully with form or zero-balance guard</summary>

**Jira Issue:** `OHRM-46` | **Type:** Functional | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify the Apply Leave page loads and renders a usable state — either the full leave application form or the zero-balance guard message — confirming the routing and page initialisation work correctly regardless of the shared demo's entitlement state.

**Preconditions:**
- Admin user is logged in
- User is on the Leave module

**Test Steps:**
1. Log in as Admin
2. Navigate to the Leave module
3. Click "Apply" in the Leave top navigation bar
4. Wait for the page to fully load

**Expected Result:**
- Page navigates to `/web/index.php/leave/applyLeave` without error
- Either the Apply Leave form (containing the Leave Type dropdown) is visible, OR the message "No leave types with leave balance" is displayed
- In either case no JavaScript errors or blank page is shown

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_LEAVE_003</strong> — Apply leave request submitted successfully with valid data</summary>

**Jira Issue:** `OHRM-47` | **Type:** Functional | **Priority:** P1 - High | **Automation:** 🔵 Manual Only

**Objective:**
Verify that an admin user can successfully submit a leave application when leave balance is available.

**Preconditions:**
- Admin user is logged in
- At least one leave type with a non-zero balance exists for the Admin account (verify manually before running; skip if balance is zero)

**Test Steps:**
1. Log in as Admin
2. Navigate to Leave → Apply
3. Select "Annual Leave" from the Leave Type dropdown
4. Enter From Date: `2026-04-01`
5. Enter To Date: `2026-04-01`
6. Enter a comment: "Automation test leave request"
7. Click the Apply button
8. Observe the result

**Expected Result:**
- Leave request is submitted without validation errors
- User is redirected to the My Leave List page OR a success confirmation is displayed
- The new leave entry appears in the list with status "Pending Approval"

**Test Data:** `Leave Type: Annual Leave | From Date: 2026-04-01 | To Date: 2026-04-01 | Comment: Automation test leave request`

> **Note:** Manual Only — the shared demo's leave balance is unpredictable (other users deplete it). This test requires confirmed non-zero balance before execution.

</details>

<details>
<summary><strong>TC_LEAVE_004</strong> — Apply leave form displays validation errors for empty required fields</summary>

**Jira Issue:** `OHRM-48` | **Type:** Validation | **Priority:** P1 - High | **Automation:** 🔵 Manual Only

**Objective:**
Verify that the Apply Leave form displays appropriate validation errors when mandatory fields are left empty and the Apply button is clicked.

**Preconditions:**
- Admin user is logged in
- User has navigated to the Apply Leave page and the full form is rendered (leave balance must be non-zero; skip if zero-balance message is shown)

**Test Steps:**
1. Log in as Admin
2. Navigate to Leave → Apply
3. Confirm the Apply Leave form is visible (Leave Type dropdown is present)
4. Do not select a Leave Type
5. Do not enter From Date or To Date
6. Click the Apply button
7. Observe validation messages below each required field

**Expected Result:**
- At least one inline validation error message is displayed (e.g. "Required")
- Form is not submitted
- User remains on the Apply Leave page

**Test Data:** `All fields left empty`

> **Note:** Manual Only — requires guaranteed non-zero leave balance to reach the form state. The zero-balance guard replaces the form entirely on the shared demo when balance is depleted.

</details>

<details>
<summary><strong>TC_LEAVE_005</strong> — My Leave List loads and displays results area</summary>

**Jira Issue:** `OHRM-49` | **Type:** Functional | **Priority:** P1 - High | **Automation:** ✅ Automated

**Objective:**
Verify the My Leave List page loads and displays a results area (either populated rows or a no-records state) after navigation.

**Preconditions:**
- Admin user is logged in
- User is on the Leave module

**Test Steps:**
1. Log in as Admin
2. Navigate to the Leave module
3. Click "My Leave" in the Leave top navigation bar
4. Wait for the page to finish loading

**Expected Result:**
- Page navigates to `/web/index.php/leave/viewMyLeaveList` without error
- Either leave request rows are displayed in the table, OR the "No Records Found" state is shown
- The filter section (Date range, Leave Type, Status dropdowns) is visible

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_LEAVE_006</strong> — My Leave List filters results successfully by leave status</summary>

**Jira Issue:** `OHRM-50` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify that the My Leave List filter correctly filters records when a specific leave status is selected, and that clearing default status chips before applying a new status produces a clean filtered result.

**Preconditions:**
- Admin user is logged in
- User is on the My Leave List page

**Test Steps:**
1. Log in as Admin
2. Navigate to Leave → My Leave
3. Observe the pre-selected status chips in the "Show Leave with Status" filter field
4. Click the × icon on each pre-selected status chip to clear all defaults
5. Click the "Show Leave with Status" dropdown and select "Rejected"
6. Click the Search button
7. Observe the results table

**Expected Result:**
- All pre-selected status chips are removed before the new filter is applied
- After clicking Search, the results area updates
- If matching records exist, all displayed rows show status "Rejected"
- If no matching records exist, the "No Records Found" state is shown
- No records with a non-Rejected status appear in the results

**Test Data:** `Filter Status: Rejected`

</details>

<details>
<summary><strong>TC_LEAVE_007</strong> — Leave List admin tab displays all expected table columns</summary>

**Jira Issue:** `OHRM-51` | **Type:** Functional | **Priority:** P2 - Medium | **Automation:** ✅ Automated

**Objective:**
Verify the Leave List (admin view) tab is accessible and displays the correct table column structure expected for admin-level leave management.

**Preconditions:**
- Admin user is logged in
- User is on the Leave module

**Test Steps:**
1. Log in as Admin
2. Navigate to the Leave module
3. Click "Leave List" in the Leave top navigation bar
4. Wait for the table to render

**Expected Result:**
- Page navigates to the Leave List view without error
- The table header displays exactly the following columns: Date, Employee Name, Leave Type, Leave Balance (Days), Number of Days, Status, Comments, Actions
- Column order and labels match exactly

**Test Data:** `Username: Admin | Password: admin123`

</details>

<details>
<summary><strong>TC_LEAVE_008</strong> — End-to-end leave management flow completes successfully</summary>

**Jira Issue:** `OHRM-52` | **Type:** End-to-End | **Priority:** P0 - Critical | **Automation:** ✅ Automated

**Objective:**
Verify the complete end-to-end leave management flow: login → navigate to Leave module → verify module loads → access Apply Leave page → check My Leave List → verify Leave List admin tab columns → logout. Confirms all primary Leave module touchpoints work in a single continuous session.

**Preconditions:**
- Application is accessible
- Admin credentials are valid
- No specific leave balance required (page-load and navigation verification only)

**Test Steps:**
1. Navigate to `https://opensource-demo.orangehrmlive.com`
2. Log in with username "Admin" and password "admin123"
3. Verify Dashboard loads successfully
4. Click "Leave" in the left navigation menu
5. Verify the Leave module heading is visible and "Apply" link is present
6. Navigate to the Apply Leave page — verify it renders without error
7. Navigate to My Leave List — verify the results area is visible
8. Navigate to the Leave List tab — verify the correct 8 table columns are displayed
9. Click the user dropdown (top-right) and click Logout
10. Verify the application redirects to the login page

**Expected Result:**
- All navigation transitions complete without errors or page breaks
- Leave module heading visible at step 5
- Apply Leave page renders a usable state at step 6
- My Leave List results area visible at step 7
- All 8 Leave List columns present at step 8
- Logout redirects to `/auth/login` at step 10

**Test Data:** `Username: Admin | Password: admin123`

</details>

---

## Notes

- All test cases have status **Done** in Jira (project `OHRM`, issues `OHRM-1` through `OHRM-52`).
- Test cases were written progressively over 4 weeks alongside the automation framework.
- `DataGenerator` utility generates unique timestamped values for all dynamic test data fields.
- **Manual Only** cases are fully documented here and can be executed by a human tester at any time.
- **Manual Only** cases can be automated when a dedicated (non-shared) OrangeHRM instance is available — all corresponding Page Object methods already exist in `LeavePage.ts`, `AdminPage.ts`, and `PIMPage.ts`.
- The `@skip` tag in Gherkin feature files corresponds to the **Manual Only** automation status here.
