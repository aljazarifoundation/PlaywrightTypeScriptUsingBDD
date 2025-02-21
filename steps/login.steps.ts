import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I navigate to the Sauce Demo login page", async function () {
  await this.page.goto("https://www.saucedemo.com/");
});

When(
  "I enter username {string} and password {string}",
  async function (username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
  }
);

When("I click the login button", async function () {
  await this.page.click("#login-button");
});

Then("I should see the products page", async function () {
  await this.page.waitForSelector(".inventory_list");
  expect(await this.page.url()).toContain("inventory.html");
});

Then(
  "I should see an error message {string}",
  async function (expectedError: string) {
    const errorMessage = await this.page.textContent(".error-message-container");
    expect(errorMessage?.trim()).toBe(expectedError);
  }
);
