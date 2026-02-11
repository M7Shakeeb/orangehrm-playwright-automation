# Master Test Plan - OrangeHRM Test Automation

**Project:** OrangeHRM Demo Application Test Automation
**Author:** Shakeeb
**Date:** February 9, 2026
**Version:** 1.2
**Status:** Active

---

## 1. Introduction

### 1.1 Project Overview
This document outlines a comprehensive test automation strategy for the OrangeHRM Demo Application, it is also a part of my portfolio project to demonstrate proficiency in modern test automation practices.

**Primary Objective:** Build a production quality test automation framework using Playwright, TypeScript, Cucumber BDD, Page Object Model design pattern, and CI/CD integration.

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
| **P2 - Medium** | **Leave** | Apply leave, leave list, leave type configuration | Week 4 |

### 2.2 Test Types In Scope
✅ **Functional Testing** - Feature-level validations (CRUD operations, workflows)
✅ **UI Testing** - Element visibility, form validations, navigation flows
✅ **Smoke Testing** - Critical path scenarios for rapid feedback
✅ **Regression Testing** - Full suite execution to catch regressions
✅ **Cross-Browser Testing** - Chromium, Firefox, WebKit compatibility
✅ **Negative Testing** - Invalid inputs, error handling, boundary conditions

### 2.3 Out of Scope(for now)
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
- **Week 2+:** External JSON files for test data (stored in `test-data/`).
- **Week 2+:** Dynamic data generation (timestamps, UUIDs) to avoid collisions.

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

**Dockerized Execution (Week 2+):**
- Tests run inside Docker containers for consistent environment.

**CI/CD Pipeline (Week 2+):**
- **Platform:** GitHub Actions.
- **Trigger:** Every push to `main` branch, pull requests.
- **Run:** Smoke tests only (fast feedback).
- **Browsers:** Chromium only in CI (speed optimization).

**Cross-Browser Testing (Week 3+):**
- Run full suite against: Chromium, Firefox, WebKit.
- Frequency: Before releases, weekly regression.

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

### 4.2 Test Execution Environment

| Environment | Component | Specification |
|-------------|-----------|---------------|
| **Local** | OS | Windows 10/11 (primary) |
| **Local** | Node.js | 18.x or higher |
| **Local** | IDE | Visual Studio Code |
| **Docker** | Base Image | `mcr.microsoft.com/playwright` (Matches package.json version) |
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
- ✅ **CI/CD:** GitHub Actions workflow `.yml` (Week 2+)

### 5.2 Documentation
- ✅ Master Test Plan (this document)
- ✅ README with setup instructions
- ✅ Element locators reference (`docs/element-locators.md`)
- ✅ Test case specifications in Jira
- ✅ Docker setup guide (Week 2+)

### 5.3 Test Reports
- **Week 1:** Cucumber JSON report & Basic HTML report.
- **Week 2+:** Enhanced HTML Report (w/ Screenshots) & CI/CD Execution Logs.

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
- [ ] Dashboard module fully automated (navigation, logout).
- [ ] Admin module (user management) automated.
- [ ] Docker environment configured (`Dockerfile`, `docker-compose.yml`, `.dockerignore`).
- [ ] Basic CI/CD pipeline active.
- [ ] Enhanced HTML reporting implemented.

**Week 3 - Exit Criteria:**
- [ ] PIM module (employee management) automated.
- [ ] Data-driven testing with external JSON files.
- [ ] Cross-browser testing active (Chromium, Firefox, WebKit).

**Week 4 - Exit Criteria:**
- [ ] Leave module automated.
- [ ] Enhanced CI/CD pipeline.
- [ ] Comprehensive README and architecture diagrams.

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
**Target Completion:** March 2, 2026

### 9.2 Weekly Breakdown

| Week | Focus Areas | Key Deliverables |
|------|-------------|------------------|
| **Week 1** | Foundation + Login | Framework, Login PO, 5 Scenarios, Jira, Git Repo |
| **Week 2** | Dashboard + Admin + Docker | Admin PO, Dockerfile, CI Pipeline, Enhanced Reporting |
| **Week 3** | PIM + Cross-Browser | PIM PO, Data-Driven Tests, Cross-Browser Exec |
| **Week 4** | Leave + Polish | Leave PO, Final Docs, Demo Video |

---

## 10. Success Metrics
- ✅ **Code Quality:** Zero hardcoded waits, 100% POM compliance, TypeScript strict mode.
- ✅ **Test Stability:** >95% pass rate on stable tests, <5% flakiness.
- ✅ **Performance:** <15 minutes for full suite execution.
- ✅ **Portfolio Ready:** Clear README, Working CI/CD, Demo Video.

---

## 11. Tools and Technologies
| Category | Tool | Purpose |
|----------|------|---------|
| **Framework** | Playwright | Browser automation |
| **Language** | TypeScript | Type-safe code |
| **BDD** | Cucumber | Gherkin scenarios |
| **Container** | Docker | Consistent environment (Week 2) |
| **CI/CD** | GitHub Actions | Automated pipeline (Week 2) |
| **Reporting** | Cucumber HTML | Test reports |

---

## 12. Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 5, 2026 | Initial Master Test Plan creation |
| 1.1 | Feb 9, 2026 | Corrected timeline inconsistencies, added Docker strategy |
| 1.2 | Feb 10, 2026 | Simplified structure, reduced verbosity, improved readability |

---

**Approved By:** Shakeeb
**Date:** February 9, 2026