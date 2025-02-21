const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports", // Path where Cucumber JSON reports are saved
  reportPath: "reports/html-report", // Output directory for HTML report
  reportName: "Sauce Demo Test Report",
  pageTitle: "Sauce Demo Test Report",
  displayDuration: true,
  openReportInBrowser: true, // Opens the report after generation
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local Machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Sauce Demo Automation" },
      { label: "Execution Date", value: new Date().toLocaleString() },
    ],
  },
  disableLog: false, // Enable logging
});
