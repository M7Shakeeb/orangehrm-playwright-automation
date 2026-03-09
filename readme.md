# OrangeHRM Playwright Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.58.1-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber_BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/M7Shakeeb/orangehrm-playwright-automation/smoke-tests.yml?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/M7Shakeeb/orangehrm-playwright-automation/actions)

A production-quality test automation framework for the
[OrangeHRM Demo](https://opensource-demo.orangehrmlive.com) application,
built as a portfolio project demonstrating modern QA engineering practices.

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
├── .github/workflows/    # CI/CD pipeline
├── src/
│   ├── features/         # Gherkin feature files
│   │   ├── login.feature
│   │   ├── dashboard.feature
│   │   ├── admin.feature
│   │   └── pim.feature
│   ├── steps/            # Step definitions
│   │   ├── loginSteps.ts
│   │   ├── dashboardSteps.ts
│   │   ├── adminSteps.ts
│   │   └── pimSteps.ts
│   ├── pages/            # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── AdminPage.ts
│   │   └── PIMPage.ts
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
│   └── cross-browser-testing.md
├── Dockerfile
├── docker-compose.yml
├── cucumber.json
├── tsconfig.json
├── package.json
└── .env
```

---

### Prerequisites
- Node.js 18.x or higher
- npm
- Git

### Installation

```powershell
git clone <your-repo-url>
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
| `npm test` | Run full test suite (all browsers default to Chromium) |
| `npm run test:headed` | Run with browser UI visible (for debugging) |
| `npm run test:smoke` | Run `@smoke` tagged scenarios only |
| `npm run test:regression` | Run full suite with minimal output |
| `npm run test:pim` | Run PIM feature file only (excludes `@skip`) |
| `npm run test:chrome` | Run full suite on Chromium |
| `npm run test:firefox` | Run full suite on Firefox |
| `npm run test:webkit` | Run full suite on WebKit |
| `npm run test:cross-browser` | Run full suite on all 3 browsers sequentially |

### Tag-Based Execution

```powershell
# Run by tag (append --tags "..." to cucumber-js command)
npx cucumber-js src/features --tags "@smoke"
npx cucumber-js src/features --tags "@pim and @add"
npx cucumber-js src/features --tags "@e2e"
npx cucumber-js src/features --tags "not @skip"
npx cucumber-js src/features --tags "@data-driven"
```

### Cross-Browser (Single Feature)

```powershell
npx cross-env BROWSER=firefox npx cucumber-js src/features/pim.feature -p firefox --tags "not @skip"
npx cross-env BROWSER=webkit npx cucumber-js src/features -p webkit --tags "@smoke"
```

### Reports

```powershell
# Generate HTML report from last JSON run
npm run report

# Open report (Windows)
start reports\cucumber-report.html

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

GitHub Actions runs `@smoke` tagged tests automatically on every push to `main`.

- **Pipeline:** `.github/workflows/smoke-tests.yml`
- **Trigger:** Push to `main` branch
- **Browser:** Chromium (headless)
- **Environment:** Docker container (ubuntu-latest)

---

## Test Coverage

<details>
<summary><strong>👉 Click to view module breakdown and test types</strong></summary>

### Modules Automated

| Module | Scenarios | Tags |
| :--- | :--- | :--- |
| Login | 5 | `@smoke @login @critical @validation` |
| Dashboard | 6 | `@smoke @dashboard @critical @navigation` |
| Admin (User Mgmt) | 8 | `@smoke @admin @critical @add @edit @delete @search @validation` |
| PIM (Employee Mgmt) | 13 | `@smoke @pim @critical @add @edit @delete @search @validation @e2e @data-driven` |
| **Total** | **32 runnable** | *(2 @skip)* |

### Test Types

| Type | Description |
| :--- | :--- |
| **Smoke** | Critical path — runs on every CI push |
| **Functional** | Feature-level CRUD validations |
| **Validation** | Form validation and error handling |
| **End-to-End** | Full lifecycle flows (Login → CRUD → Logout) |
| **Data-Driven** | Scenario Outline with inline Gherkin Examples tables |
| **Cross-Browser** | Chromium, Firefox, WebKit |

</details>

---

## Design Patterns

### Page Object Model

Each page has its own class in `src/pages/`. Locators are defined in the constructor using container scoping and label-based filtering:

```typescript
this.searchContainer = page.locator('.oxd-table-filter');
this.searchInput = this.searchContainer
  .locator('.oxd-input-group')
  .filter({ hasText: 'Employee Name' })
  .locator('input');
```

### API-Aware Waiting

No `waitForTimeout()` anywhere in the framework. All async operations wait for the relevant API response:

```typescript
const responsePromise = this.page.waitForResponse(
  (response) =>
    response.url().includes('/api/v2/pim/employees') &&
    response.status() === 200
);
await this.searchButton.click();
await responsePromise;
```

### Parallel-Safe World Object

Scenario-specific data is stored in `this.scenarioData` (not module-level variables), making all scenarios safe for parallel execution:

```typescript
this.scenarioData.testFirstName = DataGenerator.generateUniqueEmployeeName();
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
| Master Test Plan | `docs/master-test-plan.md` | Full test strategy and scope |
| Element Locators | `docs/element-locators.md` | All CSS selectors and locator notes |
| Docker Setup | `docs/docker-setup.md` | Docker build and run guide |

---

## Test Credentials

```text
URL:      https://opensource-demo.orangehrmlive.com
Username: Admin
Password: admin123
```
**This is a shared public demo environment.** Test data created during runs persists until the demo site is reset by OrangeHRM.

---

## Author

* **Shakeeb**
* QA Automation Engineer
* [\[LinkedIn Profile\]](https://www.linkedin.com/in/shakeeb-mohammed-m7/)
* [\[GitHub Profile\]](https://github.com/M7Shakeeb)

---
*License: MIT*