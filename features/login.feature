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
      | username      | password     |
      | standard_user | secret_sauce |

  @negative
  Scenario Outline: Unsuccessful Login
    Given I navigate to the Sauce Demo login page
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see an error message "<error_message>"

    Examples:
      | username      | password    | error_message                                                             |
      | invalid_user  | wrong_pass  | Epic sadface: Username and password do not match any user in this service |
      |              | secret_sauce | Epic sadface: Username is required                                        |
      | standard_user |             | Epic sadface: Password is required                                        |
