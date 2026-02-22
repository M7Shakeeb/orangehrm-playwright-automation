# OrangeHRM Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.58.1-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber_BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/orangehrm-playwright-automation/smoke-tests.yml?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/M7Shakeeb/orangehrm-playwright-automation/actions)

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

## Test Scenarios (Week 1 Completion)

Currently, the **Login Module** is fully automated with the following coverage:

| ID | Scenario | Type | Status |
| :--- | :--- | :--- | :--- |
| **TC_001** | Successful login with valid credentials | Smoke | ✅ Passing |
| **TC_002** | Login fails with invalid username | Negative | ✅ Passing |
| **TC_003** | Login fails with invalid password | Negative | ✅ Passing |
| **TC_004** | Validation error: Empty username | Functional | ✅ Passing |
| **TC_005** | Validation error: Empty password | Functional | ✅ Passing |

## Test Reporting

After execution, a summary is printed to the console. For a detailed report:

1.  Navigate to the `reports/` folder.
2.  Open `cucumber-report.html` in any browser.
3.  **On Failure:** Check the report or the `screenshots/` folder for images named `FAILED_<ScenarioName>_<Timestamp>.png`.

## Roadmap

* **Week 2:** Dashboard & Admin Module (User Management), Docker Integration.
* **Week 3:** PIM Module (Data-Driven Testing), Cross-Browser setup.
* **Week 4:** Leave Module, CI/CD Pipeline (GitHub Actions), Advanced Reporting.

## Author

* Shakeeb
* QA Automation Engineer
* [\[LinkedIn Profile\]](https://www.linkedin.com/in/shakeeb-mohammed-m7/)
* [\[GitHub Profile\]](https://github.com/M7Shakeeb)

---
*License: MIT*