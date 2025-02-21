import { chromium, firefox, webkit, Browser, BrowserContext, Page } from "playwright";
import fs from "fs";

export class BrowserManager {
  private static browser: Browser;
  private context!: BrowserContext;
  public page!: Page;
  private static browserType: string = process.env.BROWSER || "chromium"; // Default: Chromium
  private static screenshotDir: string = "reports/screenshots/"; // Directory for saving screenshots

  // Configurable options for debugging, slowMo, timeouts, etc.
  private static browserOptions = {
    headless: false, // Run browser in headless mode (set to true if you want to run without UI)
    slowMo: 50, // Slows down Playwright actions (50ms delay between each action)
    timeout: 60000, // Timeout for each action (60 seconds)
    viewport: { width: 1280, height: 800 }, // Default viewport size
    devtools: true, // Opens DevTools for debugging
  };

  static async launchBrowser() {
    if (!this.browser) {
      switch (this.browserType) {
        case "firefox":
          this.browser = await firefox.launch({
            headless: BrowserManager.browserOptions.headless,
            slowMo: BrowserManager.browserOptions.slowMo,
            devtools: BrowserManager.browserOptions.devtools,
          });
          break;
        case "webkit":
          this.browser = await webkit.launch({
            headless: BrowserManager.browserOptions.headless,
            slowMo: BrowserManager.browserOptions.slowMo,
            devtools: BrowserManager.browserOptions.devtools,
          });
          break;
        default:
          this.browser = await chromium.launch({
            headless: BrowserManager.browserOptions.headless,
            slowMo: BrowserManager.browserOptions.slowMo,
            devtools: BrowserManager.browserOptions.devtools,
          });
      }
    }
    return this.browser;
  }

  async createContext() {
    this.context = await BrowserManager.browser.newContext({
      viewport: BrowserManager.browserOptions.viewport, 
    });

    this.page = await this.context.newPage();
  }

  async closeContext() {
    // Capture a screenshot after the test
    const screenshotPath = `${BrowserManager.screenshotDir}${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    // Optionally read the image as base64 if you want to attach it somewhere
    const imageBuffer = fs.readFileSync(screenshotPath);
    const base64Image = imageBuffer.toString("base64");

    //console.log(`Screenshot saved at: ${screenshotPath}`);
    //console.log(`Base64 image: ${base64Image}`);

    await this.page.close();
    await this.context.close();
  }

  static async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = undefined as any;
    }
  }
}
