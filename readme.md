# OrangeHRM Playwright Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.58.1-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber_BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/M7Shakeeb/orangehrm-playwright-automation/smoke-tests.yml?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/M7Shakeeb/orangehrm-playwright-automation/actions)

A production-quality test automation framework for the
[OrangeHRM Demo](https://opensource-demo.orangehrmlive.com) application,
built as a portfolio project demonstrating modern QA engineering practices.

**Status: 4-week project complete — March 23, 2026**

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| TypeScript | Strict mode | Type-safe test code |
| Playwright | ^1.58.1 | Browser automation |
| Cucumber | ^12.6.0 | BDD / Gherkin scenarios |
| Docker | Latest | Containerized execution |
| GitHub Actions | - | CI/CD pipeline |
| Node.js | 18.x+ | Runtime |

---

## Project Structure

```text
orangehrm-playwright-automation/
├── .github/workflows/    # CI/CD pipeline (smoke + regression matrix)
├── src/
│   ├── features/         # Gherkin feature files
│   │   ├── login.feature
│   │   ├── dashboard.feature
│   │   ├── admin.feature
│   │   ├── pim.feature
│   │   └── leave.feature
│   ├── steps/            # Step definitions
│   │   ├── loginSteps.ts
│   │   ├── dashboardSteps.ts
│   │   ├── adminSteps.ts
│   │   ├── pimSteps.ts
│   │   └── leaveSteps.ts
│   ├── pages/            # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── AdminPage.ts
│   │   ├── PIMPage.ts
│   │   └── LeavePage.ts
│   ├── hooks/            # Cucumber hooks (browser setup/teardown)
│   │   └── hooks.ts
│   ├── utils/            # Utilities
│   │   ├── config.ts
│   │   ├── dataGenerator.ts
│   │   └── generate-report.js
│   └── types/            # TypeScript interfaces
│       └── world.ts
├── reports/              # Generated HTML/JSON reports
├── screenshots/          # Failure screenshots (auto-captured)
├── docs/                 # Documentation
│   ├── master-test-plan.md
│   ├── element-locators.md
│   ├── docker-setup.md
├── Dockerfile
├── docker-compose.yml
├── cucumber.json
├── tsconfig.json
├── package.json
└── .env
```

---

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm
- Git

### Installation

```powershell
git clone https://github.com/M7Shakeeb/orangehrm-playwright-automation.git
cd orangehrm-playwright-automation
npm install
npx playwright install
```

### Run All Tests

```powershell
npm test
```

### Run Smoke Tests Only

```powershell
npm run test:smoke
```

---

## All Available Commands

<details>
<summary><strong>👉 Click to view all execution commands and profiles</strong></summary>

### Local Execution

| Command | Description |
| :--- | :--- |
| `npm test` | Run full test suite (parallel: 2, default profile) |
| `npm run test:headed` | Run with browser UI visible (for debugging) |
| `npm run test:smoke` | Run `@smoke` tagged scenarios only |
| `npm run test:regression` | Run full suite with minimal output |
| `npm run test:pim` | Run PIM feature file only (excludes `@skip`) |
| `npm run test:leave` | Run Leave feature file only (excludes `@skip`) |
| `npm run test:leave:headed` | Run Leave feature in headed mode (for debugging) |
| `npm run test:chrome` | Run full suite on Chromium |
| `npm run test:firefox` | Run full suite on Firefox |
| `npm run test:webkit` | Run full suite on WebKit |
| `npm run test:cross-browser` | Run full suite on all 3 browsers sequentially |

### Tag-Based Execution

```powershell
# Run by tag
npx cucumber-js src/features -p default --tags "@smoke"
npx cucumber-js src/features -p default --tags "@pim and @add"
npx cucumber-js src/features -p default --tags "@e2e"
npx cucumber-js src/features -p default --tags "not @skip"
npx cucumber-js src/features -p default --tags "@data-driven"
npx cucumber-js src/features -p default --tags "@leave"
```

### Cross-Browser (Single Feature)

```powershell
npx cross-env BROWSER=firefox cucumber-js src/features/pim.feature -p firefox --tags "not @skip"
npx cross-env BROWSER=webkit cucumber-js src/features/leave.feature -p webkit --tags "not @skip"
npx cross-env BROWSER=webkit cucumber-js src/features -p webkit --tags "@smoke"
```

### Reports

```powershell
# Generate enhanced HTML report from last JSON run
npm run report

# Open enhanced report (Windows)
start reports\enhanced\index.html

# Open cross-browser reports
start reports\cucumber-chromium.html
start reports\cucumber-firefox.html
start reports\cucumber-webkit.html
```

### Docker Execution

```powershell
# Build the Docker image
npm run docker:build

# Run all tests in Docker
npm run docker:test

# Run smoke tests in Docker
npm run docker:test:smoke

# Run with a specific browser
docker compose run -e BROWSER=firefox playwright-tests npm test

# Clean up
npm run docker:clean
```

See `docs/docker-setup.md` for full Docker guide.

</details>

---

## CI/CD

GitHub Actions runs `@smoke` tagged tests automatically on every push to `main`
and on every pull request. A regression job then runs the full suite across all
three browsers (Chromium, Firefox, WebKit) after the smoke job passes.

- **Pipeline:** `.github/workflows/smoke-tests.yml`
- **Triggers:** Push to `main`, Pull Requests to `main`, Manual dispatch
- **Smoke job:** Chromium headless — fast feedback on every push
- **Regression job:** Browser matrix (Chromium, Firefox, WebKit) — runs after smoke
- **Environment:** Docker container (ubuntu-latest)
- **Artifacts:** HTML reports and failure screenshots retained for 14 days

---

## Test Coverage

<details>
<summary><strong>👉 Click to view module breakdown and test types</strong></summary>

### Modules Automated

| Module | Runnable Scenarios | @skip | Tags |
| :--- | :--- | :--- | :--- |
| Login | 5 | 0 | `@smoke @login @critical @validation` |
| Dashboard | 6 | 0 | `@smoke @dashboard @critical @navigation` |
| Admin (User Mgmt) | 6 | 2 | `@smoke @admin @critical @add @edit @delete @search @validation @skip` |
| PIM (Employee Mgmt) | 13 | 2 | `@smoke @pim @critical @add @edit @delete @search @validation @e2e @data-driven @skip` |
| Leave (Leave Mgmt) | 5 | 3 | `@smoke @leave @critical @list @navigation @search @apply @cancel @data-driven @skip` |
| **Total** | **35 runnable** | **7 @skip** | |

> **Note on `@skip` scenarios:** Fragile scenarios on the shared demo are tagged `@skip` rather than deleted.

### Test Types

| Type | Description |
| :--- | :--- |
| **Smoke** | Critical path — runs on every CI push |
| **Functional** | Feature-level CRUD and workflow validations |
| **Validation** | Form validation and error handling |
| **End-to-End** | Full lifecycle flows (Login → CRUD → Logout) |
| **Data-Driven** | Scenario Outline with inline Gherkin Examples tables |
| **Cross-Browser** | Chromium, Firefox, WebKit |

</details>

---

## Design Patterns

### Page Object Model

Each page has its own class in `src/pages/`. Locators are defined in the
constructor using container scoping and label-based filtering:

```typescript
this.filterContainer = page.locator('.oxd-table-filter');
this.leaveTypeDropdown = this.filterContainer
  .locator('.oxd-input-group')
  .filter({ hasText: 'Leave Type' })
  .locator('.oxd-select-text');
```

### API-Aware Waiting

No `waitForTimeout()` anywhere in the framework. All async operations wait
for the relevant API response:

```typescript
const responsePromise = this.page.waitForResponse(
  (r) =>
    r.url().includes('/api/v2/leave/leave-requests') &&
    r.status() === 200
);
await this.searchButton.click();
await responsePromise;
```

### Parallel-Safe World Object

Scenario-specific data is stored in `this.scenarioData` (not module-level
variables), making all scenarios safe for `parallel: 2` execution:

```typescript
this.scenarioData.testLeaveType = 'Annual Leave';
this.scenarioData.testLeaveFromDate = '2026-04-01';
```

### Defensive Shared-Environment Guards

The shared demo has an unpredictable state (e.g., zero leave balance). Page
objects use `Promise.race` to handle multiple valid UI states gracefully:

```typescript
await Promise.race([
  expect(this.formContainer).toBeVisible({ timeout: 15000 }),
  expect(this.noLeaveBalanceMessage).toBeVisible({ timeout: 15000 }),
]).catch(() => {});
```

### Dynamic Data Generation

All test data is generated at runtime to avoid collisions on the shared demo:

```typescript
DataGenerator.generateUniqueEmployeeName() // → TestEmp1741234567890
DataGenerator.generateUniqueUsername()      // → TestUser_1741234567890
DataGenerator.generatePassword()            // → Test1741234567890!
```

---

## Configuration

### Environment Variables (.env)

```text
BASE_URL=https://opensource-demo.orangehrmlive.com
BROWSER=chromium
HEADED=false
TIMEOUT=30000
VIEWPORT_WIDTH=1920
VIEWPORT_HEIGHT=1080
```

Override at runtime using `cross-env`:

```powershell
npx cross-env BROWSER=firefox HEADED=true npm test
```

### Documentation

| Document | Location | Description |
| :--- | :--- | :--- |
| Master Test Plan | `docs/master-test-plan.md` | Full test strategy, scope, and weekly milestones |
| Element Locators | `docs/element-locators.md` | All CSS selectors and locator notes (all 5 modules) |
| Docker Setup | `docs/docker-setup.md` | Docker build and run guide |
| Test Cases | `docs/test-cases.md` | All 52 Jira test cases with steps, expected results, and automation status |

---

## Test Credentials

```text
URL:      https://opensource-demo.orangehrmlive.com
Username: Admin
Password: admin123
```

**This is a shared public demo environment.** Test data created during runs
persists until the demo site is reset by OrangeHRM. Leave balance may be
zero at any time — Apply Leave tests are covered as Manual Only Jira cases.

---

## Author

* **Shakeeb**
* QA Automation Engineer
* [LinkedIn Profile](https://www.linkedin.com/in/shakeeb-mohammed-m7/)
* [GitHub Profile](https://github.com/M7Shakeeb)

---
*License: MIT*