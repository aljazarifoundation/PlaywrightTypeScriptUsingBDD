import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am logged into Sauce Demo", async function () {
  await this.page.goto("https://www.saucedemo.com/");
  await this.page.fill("#user-name", "standard_user");
  await this.page.fill("#password", "secret_sauce");
  await this.page.click("#login-button");
  await this.page.waitForSelector(".inventory_list");
});

When("I add {string} to the cart", async function (item: string) {
  const itemSelector = `text=${item}`;
  await this.page.click(itemSelector);
  await this.page.click("#add-to-cart");
});

When("I proceed to checkout", async function () {
  await this.page.click(".shopping_cart_link");
  await this.page.click("#checkout");
});

When("I enter {string}, {string}, and {string}", async function (firstName: string, lastName: string, postalCode: string) {
  await this.page.fill("#first-name", firstName);
  await this.page.fill("#last-name", lastName);
  await this.page.fill("#postal-code", postalCode);
});

When("I confirm the order", async function () {
  await this.page.click("#continue");
  await this.page.click("#finish");
});

Then("I should see the order confirmation", async function () {
  const confirmationText = await this.page.textContent(".complete-header");
  expect(confirmationText).toContain("Thank you for your order!");
});

Then("I should see an error message", async function () {
  const errorMessage = await this.page.textContent(".error-message-container");
  expect(errorMessage).not.toBeNull();
});
