# Playwright Automation BDD Framework

A comprehensive **Behavior-Driven Development (BDD)** test automation framework built with **Playwright** and **Cucumber** using **TypeScript**. This framework enables scalable, maintainable, and well-documented end-to-end testing with a focus on readability and reusability.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Available Scripts](#available-scripts)
- [Project Architecture](#project-architecture)
- [Test Examples](#test-examples)
- [Reporting](#reporting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project leverages **Playwright** for cross-browser testing capabilities and **Cucumber** for writing tests in Gherkin syntax, making them human-readable and business-friendly. The framework is built with **TypeScript** for type safety and better code quality.

**Key Highlights:**
- 🎯 BDD approach with Gherkin feature files
- 🔄 Cross-browser support (Chromium, Firefox, WebKit)
- 📸 Automatic screenshots on failure
- 📹 Video recording capabilities
- 🎨 Visual regression testing with pixel-level comparison
- 📊 Multiple report formats (HTML, JSON, JUnit)
- 🏷️ Tag-based test execution
- 🔐 Environment-based configuration

## Features

- **BDD Framework:** Write tests in plain English using Gherkin syntax
- **Multi-Browser Support:** Run tests on Chromium, Firefox, and WebKit
- **Visual Testing:** Pixel-perfect visual regression testing
- **Parallel Execution:** Run tests in parallel for faster feedback
- **Comprehensive Reporting:** HTML, JSON, and JUnit report generation
- **Screenshot & Trace:** Automatic failure artifacts and trace recordings
- **Environment Management:** Support for multiple environments (dev, stage, prod)
- **API Testing:** Integration with Axios for API automation
- **Email Notifications:** Test result notifications via email
- **Logging:** Winston-based comprehensive logging

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Playwright | ^1.57.0 | Web automation & testing |
| Cucumber | 12.5.0 | BDD framework |
| TypeScript | ^5.6.2 | Language with type safety |
| Node.js | 18+ | Runtime environment |
| Axios | 1.13.4 | HTTP client for API testing |
| Winston | ^3.19.0 | Logging framework |
| Pixelmatch | 7.1.0 | Visual regression testing |

## Project Structure

```
playwright-automation/
├── src/
│   ├── main/
│   │   ├── config/                 # Configuration files
│   │   │   ├── config.index.ts
│   │   │   ├── constants.ts
│   │   │   ├── env.config.ts
│   │   │   ├── getUserCreds.ts
│   │   │   └── ***.login.info.ts
│   │   ├── fixture/                # Test fixtures & hooks
│   │   │   ├── cucumberWorld.ts
│   │   │   ├── executionHook.ts
│   │   │   ├── reportingHook.ts
│   │   │   └── visualTesting.ts
│   │   └── utils/                  # Utility functions
│   │       ├── actions.index.ts
│   │       ├── api.actions.ts
│   │       ├── core.component.actions.ts
│   │       ├── custom.component.actions.ts
│   │       ├── navigation.actions.ts
│   │       └── utils.ts
│   └── test/
│       ├── features/               # Feature files (Gherkin)
│       │   └── swag-labs/
│       │       └── loginValidation.feature
│       ├── pages/                  # Page Object Models
│       │   └── swag-labs/
│       │       ├── login.page.ts
│       │       └── dashboard.page.ts
│       ├── steps/                  # Step definitions
│       │   └── swag-labs/
│       │       ├── login.steps.ts
│       │       └── dashboard.steps.ts
│       ├── resources/              # Test resources
│       │   ├── golden-images/      # Reference images for visual testing
│       │   └── uploadFiles/        # Files for upload tests
│       └── testdata/               # Test data files
├── test-results/                   # Test execution reports
├── playwright.config.ts            # Playwright configuration
├── cucumber.js                     # Cucumber configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── CHANGELOG.md                    # Version history
└── README.md                       # This file
```

## Prerequisites

Before setting up the project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git**

Verify installation:
```bash
node --version
npm --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/joyvaz/playwright-automation.git
cd playwright-automation
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including Playwright browsers.

### 3. Install Playwright Browsers

```bash
npx playwright install
```

## Configuration

### Environment Configuration

Create a `.env` file in the project root (if not already present):

```env
TEST_ENV=stage
BROWSERNAME=chromium
HEADLESS=true
MOCKED=false
TAGS=@smoke
```

**Available Environment Variables:**

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `TEST_ENV` | dev, stage, prod | stage | Test environment |
| `BROWSERNAME` | chromium, firefox, webkit | chromium | Browser type |
| `HEADLESS` | true, false | true | Run browser in headless mode |
| `MOCKED` | true, false | false | Use mocked API responses |
| `TAGS` | Any Cucumber tag | @smoke | Feature tags to run |

### Login Credentials

Update login credentials in `src/main/config/`:
- `swagLabs.login.info.ts` - Swag Labs credentials
- `demoApp.login.info.ts` - Demo App credentials
- `placeHolder.login.info.ts` - Placeholder credentials

## Running Tests

### Available Scripts

```bash
# Run all tests
npm run test

# Run BDD tests with Cucumber
npm run "npm test bdd"

# Run smoke tests
npm run smoke-test

# Run tests by specific tags
npm run test-by-tags -- "@smoke and @login"

# Run tests in parallel (2 workers)
npm run test-parallel

# Run tests with parameters
npm run test-with-params ENV=stage BROWSER=chromium TAGS=@smoke
```

### Examples

**Run all smoke tests:**
```bash
npm run smoke-test
```

**Run tests with specific tags:**
```bash
npm run test-by-tags -- "@login and not @wip"
```

**Run tests in a specific browser:**
```bash
cross-env BROWSERNAME=firefox npm run smoke-test
```

**Run tests headless (CI mode):**
```bash
cross-env HEADLESS=true npm run smoke-test
```

## Project Architecture

### Design Patterns

1. **Page Object Model (POM):** Each page is represented as a class with locators and action methods
2. **World Object:** Shared context between steps using Cucumber's World
3. **Hook Architecture:** Before/After hooks for setup and teardown
4. **Fixture Management:** Centralized fixture handling in `fixture/` directory

### Key Components

#### Page Objects
- Located in `src/test/pages/`
- Encapsulate page elements and interactions
- Provide reusable methods for common actions

#### Step Definitions
- Located in `src/test/steps/`
- Map Gherkin scenarios to test code
- Use shared World context

#### Test Fixtures
- **executionHook.ts:** Setup/teardown logic
- **reportingHook.ts:** Report generation and formatting
- **visualTesting.ts:** Visual regression testing utilities
- **launchBrowser.ts:** Browser initialization

### Action Utilities

| File | Purpose |
|------|---------|
| `actions.index.ts` | Main action orchestrator |
| `core.component.actions.ts` | Basic component interactions (click, type, etc.) |
| `custom.component.actions.ts` | Custom element-specific actions |
| `navigation.actions.ts` | Page navigation utilities |
| `api.actions.ts` | API testing helpers |
| `utils.ts` | General utility functions |

## Test Examples

### Feature File Example
Located in `src/test/features/swag-labs/loginValidation.feature`:

```gherkin
@smoke
Feature: Validate Swag Labs login

    Validate user login functionality of Swag Labs application with different credentials.

    Scenario Outline: Verify Swag labs login for <userType>
        Given User is on Swag Labs login page
        When user login to swag labs as <userType>
        Then user should see the products dashboard page

        Examples:
            | userType      |
            | standard_user |
```

### Step Definition Example
```typescript
Given('User is on Swag Labs login page', async function () {
    await navigateToLoginPage();
});

When('user login to swag labs as {string}', async function (userType: string) {
    const credentials = getUserCredentials(userType);
    await performLogin(credentials.username, credentials.password);
});

Then('user should see the products dashboard page', async function () {
    await verifyDashboardPage();
});
```

## Reporting

### Report Types

1. **HTML Report:** `test-results/html-reports/index.html`
   - Interactive, user-friendly format
   - Screenshots and videos for failed tests

2. **JSON Report:** `test-results/json-reports/report.json`
   - Machine-readable format
   - Suitable for CI/CD integration

3. **JUnit Report:** `test-results/junit-reports/report.xml`
   - Standard format for CI/CD systems
   - Compatible with Jenkins, Azure Pipelines, etc.

4. **Cucumber HTML Report:** `test-results/cucumber-report.html`
   - BDD-specific reporting
   - Scenario-level details

### Viewing Reports

After test execution, reports are generated automatically. Open the HTML report:

```bash
# On Windows
start test-results/html-reports/index.html

# On macOS
open test-results/html-reports/index.html

# On Linux
xdg-open test-results/html-reports/index.html
```

## Contributing

### Guidelines

1. **Branch Naming:** Use descriptive names (e.g., `feature/user-login-tests`, `fix/flaky-tests`)
2. **Commit Messages:** Follow conventional commits (feat:, fix:, test:, docs:)
3. **Code Style:** Follow TypeScript best practices and project conventions
4. **Testing:** Ensure all new features include corresponding test cases
5. **Documentation:** Update README and comments for significant changes

### Workflow

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Run all tests locally
5. Commit with descriptive messages
6. Push and create a pull request

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Repository

- **Repository:** [playwright-automation](https://github.com/joyvaz/playwright-automation)
- **Owner:** Joy Francis Vaz
- **Version:** 1.0.0

## Changelog

For a detailed list of changes, see [CHANGELOG.md](CHANGELOG.md)
