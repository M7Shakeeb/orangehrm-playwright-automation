# Master Test Plan - OrangeHRM Test Automation

**Project:** OrangeHRM Demo Application Test Automation
**Author:** Shakeeb
**Date:** March 23, 2026
**Version:** 1.5
**Status:** Active

---

## 1. Introduction

### 1.1 Project Overview
This document outlines a comprehensive test automation strategy for the OrangeHRM
Demo Application, it is also a part of my portfolio project to demonstrate
proficiency in modern test automation practices.

**Primary Objective:** Build a production quality test automation framework
using Playwright, TypeScript, Cucumber BDD, Page Object Model design pattern,
and CI/CD integration.

**Application Under Test:**
- **Name:** OrangeHRM Demo
- **URL:** https://opensource-demo.orangehrmlive.com
- **Type:** Public demo instance (HRMS application)
- **Access:** Open access with demo credentials

### 1.2 Document Purpose
This Master Test Plan serves to:
- Define testing scope, objectives, and priorities
- Establish test approach and methodology
- Document risks and mitigation strategies
- Set entry/exit criteria for test execution
- Provide a roadmap for the 4-week project timeline

---

## 2. Scope Definition

### 2.1 Modules In Scope

| Priority | Module | Features to Test | Week |
|----------|--------|------------------|------|
| **P0 - Critical** | **Login** | Valid login, invalid credentials, field validation, session management | Week 1 |
| **P0 - Critical** | **Dashboard** | (Verification) Post-login verification, page load confirmation | Week 1 |
| **P0 - Critical** | **Dashboard** | (Full Testing) Navigation menu, user dropdown, logout, widgets | Week 2 |
| **P1 - High** | **Admin** | User management (search, add, edit, delete users), role assignment | Week 2 |
| **P1 - High** | **PIM** | Employee management (search, add, edit, delete employees) | Week 3 |
| **P2 - Medium** | **Leave** | Apply leave, leave list, leave type configuration, status filtering | Week 4 |

### 2.2 Test Types In Scope
✅ **Functional Testing** - Feature-level validations (CRUD operations, workflows)
✅ **UI Testing** - Element visibility, form validations, navigation flows
✅ **Smoke Testing** - Critical path scenarios for rapid feedback
✅ **Regression Testing** - Full suite execution to catch regressions
✅ **Cross-Browser Testing** - Chromium, Firefox, WebKit compatibility
✅ **Negative Testing** - Invalid inputs, error handling, boundary conditions
✅ **Data-Driven Testing** - Scenario Outline with inline Gherkin Examples tables (Week 3+)
✅ **End-to-End Testing** - Full lifecycle flows across multiple modules (Week 3+)

### 2.3 Out of Scope (for now)
❌ **API Testing** - No backend API validation (UI-only focus)
❌ **Performance Testing** - No load, stress, or performance benchmarking
❌ **Security Testing** - No penetration testing, SQL injection, XSS testing
❌ **Mobile Testing** - Desktop browsers only (no mobile app)
❌ **Database Validation** - No direct database queries or data validation
❌ **Accessibility Testing** - No WCAG/ADA compliance checks
❌ **Localization Testing** - English language only

---

## 3. Test Strategy

### 3.1 Test Automation Approach
**Framework:** Playwright + TypeScript + Cucumber BDD

**Design Pattern:** Page Object Model (POM).
- **Structure:** Each page = 1 class with locators and methods.
- **Naming Convention:** `<PageName>Page.ts` (e.g., `LoginPage.ts`).

**BDD with Gherkin Syntax:**
- **Feature files** describe test scenarios in plain English.
- **Step definitions** map Gherkin steps to code.

**Test Data Management:**
- **Week 1:** Hardcoded credentials for login tests only.
- **Week 2+:** Dynamic data generation (timestamps, UUIDs) to avoid collisions.
- **Week 3+:** Data-driven Scenario Outline with inline Gherkin `Examples` tables.

**Architectural Pivot (Parallel Execution Support):**
Module-level variables (e.g., `let testUsername = ''`) are officially deprecated to support parallel execution. When running `parallel: 2`, module-level variables share memory space between workers, causing state bleeding and test collisions. All dynamic scenario state must now be strictly stored in `CustomWorld.scenarioData`.

**Shared Environment Strategy (Week 4 Leave Module):**
Apply Leave submission and Cancel Leave are excluded from automated scenarios due to the shared demo's unreliable leave entitlement state (other users deplete balances). These workflows are documented with `@skip` tags and covered by Manual Only Jira test cases. Navigation, rendering, and filter scenarios are fully automated using defensive guards.

### 3.2 Test Prioritization Strategy
**P0 - Critical (Smoke Tests):**
- Must pass for every build.
- **Pass criteria:** 100% pass rate required.

**P1 - High (Core Functionality):**
- Major features and workflows.
- **Pass criteria:** 95%+ pass rate required.

**P2 - Medium (Extended Functionality):**
- Secondary features.
- **Pass criteria:** 90%+ pass rate acceptable.

### 3.3 Test Execution Strategy
**Local Development:**
- Run smoke tests before commit (`npm run test:smoke`).
- Use headed mode for debugging (`npm run test:headed`).
- Run Leave module only (`npm run test:leave`).

**Dockerized Execution (Week 2+):**
- Tests run inside Docker containers for consistent environment.

**CI/CD Pipeline (Week 2+):**
- **Platform:** GitHub Actions.
- **Trigger:** Every push to `main` branch, pull requests.
- **Smoke job:** Chromium only (fast feedback, runs first).
- **Regression job:** Browser matrix (Chromium, Firefox, WebKit) — runs after smoke passes.

**Cross-Browser Testing (Week 3+):**
- Run full suite against: Chromium, Firefox, WebKit.
- Command: `npm run test:cross-browser`
- Frequency: Before releases, weekly regression.
- Each browser generates its own HTML report.

**Parallel Execution (Week 3+):**
- `"parallel": 2` in default Cucumber profile.
- Scenario data stored in `CustomWorld.scenarioData`.
- Cross-browser named profiles remain at `parallel: 1`.

---

## 4. Test Environment

### 4.1 Application Environment

| Attribute | Details |
|-----------|---------|
| **Application URL** | https://opensource-demo.orangehrmlive.com |
| **Environment Type** | Public demo instance (shared, non-isolated) |
| **Uptime SLA** | None - public demo, no guarantees |
| **Data Persistence** | Demo data pre-populated, but may change |
| **Reset Capability** | None - we cannot reset to clean state |

**Limitations:**
- ⚠️ Shared environment - other users testing simultaneously.
- ⚠️ Cannot delete pre-existing demo data.
- ⚠️ Parallel: 2 is the safe maximum for the shared demo site.
- ⚠️ Leave balance may be zero at any time — Apply Leave tests run as Manual Only.

### 4.2 Test Execution Environment

| Environment | Component | Specification |
|-------------|-----------|---------------|
| **Local** | OS | Windows 10/11 (primary) |
| **Local** | Node.js | 18.x or higher |
| **Local** | IDE | Visual Studio Code |
| **Docker** | Base Image | `mcr.microsoft.com/playwright` (matches package.json version) |
| **Docker** | OS | Ubuntu 22.04 (Jammy) |
| **CI/CD** | Runner | GitHub Actions (ubuntu-latest) |

---

## 5. Test Deliverables

### 5.1 Code Artifacts
- ✅ Page Object Model classes (`src/pages/`)
- ✅ Cucumber feature files (`src/features/`)
- ✅ Step definitions (`src/steps/`)
- ✅ Test hooks (`src/hooks/`)
- ✅ Configuration files (`.env`, `cucumber.json`, `package.json`)
- ✅ **Docker Artifacts:** `Dockerfile`, `docker-compose.yml`, `.dockerignore` (Week 2+)
- ✅ **CI/CD:** GitHub Actions workflow `.yml` with smoke + regression matrix (Week 2+/4+)
- ✅ **Utilities:** `DataGenerator` with type-safe interfaces (Week 2+/3+)

### 5.2 Documentation
- ✅ Master Test Plan (this document)
- ✅ README with setup instructions
- ✅ Element locators reference (`docs/element-locators.md`)
- ✅ Test case specifications in Jira (TC_LOGIN through TC_LEAVE)
- ✅ Docker setup guide (`docs/docker-setup.md`) (Week 2+)
- ✅ Test case specifications (`docs/test-cases.md`) — all 52 Jira cases exported with full steps

### 5.3 Test Reports
- **Week 1:** Cucumber JSON report & Basic HTML report.
- **Week 2+:** Enhanced HTML Report (w/ Screenshots) & CI/CD Execution Logs.
- **Week 3+:** Per-browser HTML reports (`cucumber-chromium.html`, `cucumber-firefox.html`, `cucumber-webkit.html`).
- **Week 4+:** Enhanced HTML report via `multiple-cucumber-html-reporter` with `projectName`, `customData`, and `saveCollectedJSON`.

---

## 6. Entry and Exit Criteria

### 6.1 Entry Criteria
- ✅ Application URL is accessible.
- ✅ Test framework fully installed.
- ✅ Page objects implemented for target module.
- ✅ Feature files & Step definitions written.

### 6.2 Exit Criteria
- ✅ All planned test scenarios executed.
- ✅ **P0 Critical tests:** 100% pass rate.
- ✅ **P1 High tests:** 95%+ pass rate.
- ✅ Code committed and pushed to GitHub.
- ✅ CI/CD pipeline green (Week 2+).

### 6.3 Weekly Milestones

**Week 1 - Exit Criteria:**
- [x] Framework setup complete (Playwright + Cucumber + TypeScript).
- [x] Login module automated (5 scenarios).
- [x] Dashboard page object created (basic verification).
- [x] 100% smoke tests passing locally.
- [x] Master Test Plan documented.
- [x] GitHub repository initialized and code pushed.
- [x] Jira project created with 5 test cases.

**Week 2 - Exit Criteria:**
- [x] Dashboard module fully automated (navigation, logout).
- [x] Admin module (user management) automated.
- [x] Docker environment configured (`Dockerfile`, `docker-compose.yml`, `.dockerignore`).
- [x] Basic CI/CD pipeline active.
- [x] Enhanced HTML reporting implemented.

**Week 3 - Exit Criteria:**
- [x] PIM module (employee management) automated (13 runnable + 2 @skip scenarios).
- [x] Full E2E scenario: Login → Add Employee → Verify → Edit → Verify → Delete → Verify → Logout.
- [x] Data-driven testing with inline Scenario Outlines.
- [x] Cross-browser testing active (Chromium, Firefox, WebKit).
- [x] `npm run test:cross-browser` script operational.
- [x] `npm run test:pim` script operational.
- [x] Parallel execution configured (`parallel: 2`) with World-based scenario data.
- [x] 20 Jira test cases added for PIM (TC_PIM_001 through TC_PIM_020).
- [x] Element locators doc updated with PIM section.

**Week 4 - Exit Criteria:**
- [x] Leave module automated (5 runnable scenarios, 3 @skip scaffolded).
- [x] Full E2E: Login → Leave module → Apply Leave page → My Leave List → Leave List columns → Logout.
- [x] Data-driven Scenario Outline with inline Examples (scaffolded under @skip).
- [x] Enhanced CI/CD: PR trigger, regression job, browser matrix (chromium/firefox/webkit).
- [x] Enhanced HTML report: `projectName`, `customData`, `saveCollectedJSON` configured.
- [x] TypeScript compile check passed, no `any` types (except internal Playwright context options).
- [x] 8 Jira test cases added (TC_LEAVE_001 through TC_LEAVE_008).
- [x] `element-locators.md` updated with complete Leave module section.
- [x] Total runnable scenario count: 30+ across all modules.

---

## 7. Risk Management

### 7.1 Risks and Mitigation Strategies

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| **Demo site unavailable** | High | Add retry logic; Check site status before execution. |
| **Data collision** | High | Use dynamic data generation (timestamps/UUIDs). |
| **Flaky tests** | Medium | Use explicit waits and Playwright auto-waiting. |
| **Docker/OS Mismatch** | High | Use `.dockerignore` to exclude local `node_modules`. |
| **GitHub Actions Quota** | Low | Limit CI runs to `main` branch + PRs only. |
| **Parallel execution instability** | Medium | Cap at `parallel: 2`; revert to 1 if demo site rate-limits. |
| **Shared demo data mutation** | Medium | Use `DataGenerator` for unique names; tag fragile tests `@skip`. |
| **Leave balance depletion** | Medium | Defensive `Promise.race` guard in `navigateToApplyLeave()`; apply/cancel tests are Manual Only. |

---

## 8. Defect Management

**For Test Automation Defects (our code):**
1. Fix immediately if blocking.
2. Create GitHub issue for tracking.

**For Application Defects (OrangeHRM demo):**
1. Document the issue in test comments.
2. Skip the test scenario (add `@skip` tag).
3. Add comment in Jira test case.

---

## 9. Project Schedule

### 9.1 Timeline Overview
**Total Duration:** 4 weeks
**Start Date:** February 3, 2026
**Completion Date:** March 23, 2026

### 9.2 Weekly Breakdown

| Week | Focus Areas | Key Deliverables |
|------|-------------|------------------|
| **Week 1** | Foundation + Login | Framework, Login PO, 5 Scenarios, Jira, Git Repo |
| **Week 2** | Dashboard + Admin + Docker | Admin PO, Dockerfile, CI Pipeline, Enhanced Reporting |
| **Week 3** | PIM + Cross-Browser + Parallel | PIM PO, E2E, Data-Driven, Cross-Browser, 30 Scenarios |
| **Week 4** | Leave + CI/CD Polish + Final Docs | Leave PO, E2E, Regression Matrix, 30+ Scenarios, README |

---

## 10. Success Metrics
- ✅ **Code Quality:** Zero hardcoded waits, 100% POM compliance, TypeScript strict mode.
- ✅ **Test Stability:** >95% pass rate on stable tests, <5% flakiness.
- ✅ **Performance:** <15 minutes for full suite execution.
- ✅ **Parallel Safety:** All scenario-specific data stored in `CustomWorld.scenarioData`.
- ✅ **Portfolio Ready:** Clear README, Working CI/CD, Jira test cases, 4 documentation files.

---

## 11. Tools and Technologies

| Category | Tool | Purpose |
|----------|------|---------|
| **Framework** | Playwright | Browser automation |
| **Language** | TypeScript | Type-safe code |
| **BDD** | Cucumber | Gherkin scenarios |
| **Container** | Docker | Consistent environment (Week 2) |
| **CI/CD** | GitHub Actions | Automated pipeline (Week 2+) |
| **Reporting** | Cucumber HTML + multiple-cucumber-html-reporter | Test reports |
| **Cross-Browser** | Playwright (Chromium/Firefox/WebKit) | Browser compatibility (Week 3) |

---

## 12. Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 5, 2026 | Initial Master Test Plan creation |
| 1.1 | Feb 9, 2026 | Corrected timeline inconsistencies, added Docker strategy |
| 1.2 | Feb 10, 2026 | Simplified structure, reduced verbosity, improved readability |
| 1.3 | Feb 19, 2026 | Marked Week 2 milestones as complete, updated reporting tools |
| 1.4 | Mar 4, 2026 | Marked Week 3 milestones as complete; added parallel execution, cross-browser, data-driven, and E2E entries |
| 1.5 | Mar 23, 2026 | Marked Week 4 complete; added Leave module scope, @skip strategy, CI/CD regression matrix, enhanced reporting config, Jira TC_LEAVE entries, updated scenario count to 30+ |

---

**Approved By:** Shakeeb
**Date:** March 23, 2026