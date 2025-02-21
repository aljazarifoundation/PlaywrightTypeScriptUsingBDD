import { Before, After, AfterStep, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { BrowserManager } from "./browser";
import fs from "fs";

setDefaultTimeout(60 * 1000); // Set timeout to 60 seconds

Before(async function () {
  this.browserManager = new BrowserManager();
  await BrowserManager.launchBrowser(); // Start browser
  await this.browserManager.createContext(); // New isolated context
  this.page = this.browserManager.page; // Attach page instance to scenario
});

AfterStep(async function (step) {
  // Capture screenshot after each step
  const screenshotPath = `reports/screenshots/${step.pickle.name}-${Date.now()}.png`;
  await this.page.screenshot({ path: screenshotPath, fullPage: true });

  // Read screenshot as base64
  const imageBuffer = fs.readFileSync(screenshotPath);
  const base64Image = imageBuffer.toString("base64");

  // Attach screenshot in a format readable by Cucumber (or any testing framework)
  //this.attach(base64Image, "image/png");
});

After(async function (scenario) {
  // Safely check if the scenario has a result and if it's failed
  if (scenario.result && scenario.result.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${scenario.pickle.name}-FAILED-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    // Read screenshot as base64
    const imageBuffer = fs.readFileSync(screenshotPath);
    const base64Image = imageBuffer.toString("base64");

    // Attach screenshot in a format readable by Cucumber (or any testing framework)
    this.attach(base64Image, "image/png");
  }

  await this.browserManager.closeContext(); // Close the browser context after each scenario
});
