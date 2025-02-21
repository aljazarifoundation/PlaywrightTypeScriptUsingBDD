# Playwright TypeScript BDD Automation

This project automates end-to-end testing using **Playwright, TypeScript, and Cucumber (BDD framework)**.

## 📌 Prerequisites

Ensure you have the following installed:
- **Node.js (LTS recommended)** → [Download](https://nodejs.org/)
- **Playwright** → Installed via dependencies
- **Cucumber.js** → Installed via dependencies

## 🚀 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/PlaywrightTypeScriptUsingBDD.git
   cd PlaywrightTypeScriptUsingBDD
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```

## 📂 Project Structure

```
📂 PlaywrightTypeScriptUsingBDD
 ┣ 📂 features/                # Cucumber feature files (Scenarios & Gherkin syntax)
 ┣ 📂 steps/                   # Step definitions mapping Gherkin steps to Playwright actions
 ┣ 📂 support/                 # Hooks, utilities, and helper functions for tests
 ┣ 📂 reports/                 # Generated test reports (HTML & JSON)
 ┣ 📜 package.json             # Project dependencies & npm scripts
 ┣ 📜 package-lock.json        # Auto-generated dependency lock file
 ┣ 📜 report.js                # Script for generating multiple-cucumber-html-reporter
 ┣ 📜 tsconfig.json            # TypeScript configuration
 ┣ 📜 cucumber.js              # Cucumber configuration file
 ┣ 📜 playwright.config.ts     # Playwright test configuration (Browsers, timeouts, etc.)
 ┗ 📜 README.md                # Documentation and setup instructions
```

## 📝 Writing Tests

### Example Feature File (`features/login.feature`)
```gherkin
Feature: Login to Sauce Demo
  As a user
  I want to be able to log in with valid and invalid credentials
  So that I can access the inventory page or see an error message

  @positive
  Scenario Outline: Successful Login
    Given I navigate to the Sauce Demo login page
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see the products page

    Examples:
      | username       | password      |
      | standard_user | secret_sauce |

  @negative
  Scenario Outline: Invalid Login
    Given I navigate to the Sauce Demo login page
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see an error message

    Examples:
      | username | password   |
      | invalid  | wrong_pass |
```

## ▶️ Running Tests

### Run All Scenarios
```sh
npx cucumber-js
```

### Run Only Positive Scenarios
```sh
npx cucumber-js --tags "@positive"
```

### Run Only Negative Scenarios
```sh
npx cucumber-js --tags "@negative"
```

### Run Tests in Headed Mode (Non-Headless)
```sh
HEADLESS=false npx cucumber-js
```

## 📊 Generating Reports

### Generate Multiple Cucumber HTML Report
```sh
"generate_multiplehtml_report": "node report.js",
```

## 🛠 Debugging

If you encounter issues, try:
```sh
npx playwright test --debug
```
## 📹 Video

https://github.com/user-attachments/assets/cc599842-68a4-496b-ad48-9e5f69683567



## 📜 License
This project is licensed under the **MIT License**.


