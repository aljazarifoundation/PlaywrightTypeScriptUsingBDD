Feature: Checkout process in Sauce Demo
  As a user
  I want to complete the checkout process
  So that I can purchase items successfully

  @positive
  Scenario Outline: Successful checkout
    Given I am logged into Sauce Demo
    When I add "<item>" to the cart
    And I proceed to checkout
    And I enter "<firstName>", "<lastName>", and "<postalCode>"
    And I confirm the order
    Then I should see the order confirmation

    Examples:
      | item            | firstName | lastName | postalCode |
      | Sauce Labs Bike Light | John      | Doe       | 12345      |

  @negative
  Scenario Outline: Checkout fails with missing details
    Given I am logged into Sauce Demo
    When I add "<item>" to the cart
    And I proceed to checkout
    And I enter "<firstName>", "<lastName>", and "<postalCode>"
    And I confirm the order
    Then I should see an error message

    Examples:
      | item            | firstName | lastName | postalCode |
      | Sauce Labs Backpack | John      | Doe       |           |
      | Sauce Labs T-Shirt  |          | Doe       | 12345      |
      | Sauce Labs Onesie   | John      |          | 12345      |
