# OrangeHRM Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.58.1-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber_BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/M7Shakeeb/orangehrm-playwright-automation/smoke-tests.yml?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/M7Shakeeb/orangehrm-playwright-automation/actions)

A production-quality automated testing framework for the [OrangeHRM Demo Application](https://opensource-demo.orangehrmlive.com/). This project demonstrates a robust implementation of **Behavior Driven Development (BDD)** using **Playwright** and **TypeScript**.

## Key Features

* **Page Object Model (POM):**
* **Cucumber BDD:** Gherkin syntax.
* **Custom World Implementation:** Type-safe context sharing between steps using a custom `World` class.
* **Robust Hooks:**
    * Automatic browser context creation with **custom User-Agent** (bypasses headless bot detection).
    * **Auto-Screenshots** on test failure attached directly to reports.
    * Global setup/teardown for efficient resource management.
* **Headless Stability:** Optimized timeouts (30s) and explicit waits to handle network lag in CI environments.
* **Cross-Browser Support:** Configured for Chromium, Firefox, and WebKit.

## Project Structure

```text
orangehrm-playwright-automation/
├── src/
│   ├── features/         # Gherkin feature files (Test Scenarios)
│   ├── hooks/            # Global hooks (Before/After/AfterAll)
│   ├── pages/            # Page Object Classes (Locators & Methods)
│   ├── steps/            # Step Definitions (Glue code)
│   ├── types/            # Custom Type Definitions (CustomWorld)
│   └── utils/            # Configuration & Utilities
├── reports/              # Generated HTML/JSON test reports
├── screenshots/          # Auto-captured failure screenshots
├── test-data/            # (Planned) External JSON data files
├── .env                  # Environment variables (GitIgnored)
├── cucumber.json         # Cucumber runner configuration
├── package.json          # Dependencies & Scripts
└── tsconfig.json         # TypeScript compiler options
```

## Prerequisites

* **Node.js:** v18 or higher
* **npm:** v8 or higher
* **IDE:** VS Code
* **Docker Desktop** 

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd orangehrm-playwright-automation
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

4.  **Configure Environment Variables:**
    Create a file named `.env` in the root directory and paste the following:
    ```ini
    BASE_URL=https://opensource-demo.orangehrmlive.com
    BROWSER=chromium
    HEADED=false
    TIMEOUT=60000
    ```

## Executing Tests

The framework includes pre-configured npm scripts for common execution modes.

| Command | Description |
| :--- | :--- |
| `npm test` | Run all tests in **Headless** mode (Default) |
| `npm run test:headed` | Run all tests in **Headed** mode (Visible browser) |
| `npm run test:firefox` | Run tests using the **Firefox** engine |
| `npm run test:webkit` | Run tests using the **WebKit** (Safari) engine |
| `npm run test:tags "@smoke"` | Run only scenarios tagged with `@smoke` |
| `npm run report` | Generates the Enhanced HTML Report via multiple-cucumber-html-reporter |
| `npm run docker:build` | Builds the Ubuntu/Playwright Docker image |
| `npm run docker:test:smoke` | Executes the smoke test suite inside the isolated Docker container |

## Test Scenarios (Week 2 Completion)

The framework currently provides automated coverage for the following modules:

**1. Login Module**
* ✅ Successful login, invalid credentials, empty field validations.

**2. Dashboard Module**
* ✅ UI visibility checks, module navigation workflows, logout security.

**3. Admin Module (User Management)**
* ✅ Full CRUD operations (Add, Edit, Delete users).
* ✅ Search functionality and "No Records Found" validations.
* ✅ Duplicate username data constraints.

## Test Reporting

After execution, a summary is printed to the console. For a detailed report:

1.  Run `npm run report`.
2.  Navigate to the `reports/enhanced/` folder.
3.  Open `index.html` in any browser.
4.  **On Failure:** The report automatically embeds full-page visual evidence of the exact failure state.

## Roadmap

* ~~**Week 1:** Foundation, Login Module, Framework Architecture.~~
* ~~**Week 2:** Dashboard & Admin Module (User Management), Docker Integration, Basic CI/CD, Enhanced Reporting.~~
* **Week 3:** PIM Module (Data-Driven Testing), Cross-Browser setup.
* **Week 4:** Leave Module, Enhanced CI/CD Pipeline (GitHub Actions), Final Documentation Polish.

## Author

* Shakeeb
* QA Automation Engineer
* [\[LinkedIn Profile\]](https://www.linkedin.com/in/shakeeb-mohammed-m7/)
* [\[GitHub Profile\]](https://github.com/M7Shakeeb)

---
*License: MIT*