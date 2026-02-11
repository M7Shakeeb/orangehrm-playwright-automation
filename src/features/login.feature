Feature: Login Functionality
  As a user of the OrangeHRM application
  I want to be able to login with the correct credentials

  Background:
    Given I am on the OrangeHRM login page

  @smoke @login @critical
  Scenario: Successful login with valid credentials
    When I enter username "Admin"
    And I enter password "admin123"
    And I click the login button
    Then I should be redirected to the dashboard page
    And the dashboard heading should be visible

  @smoke @login @critical
  Scenario: Login fails with invalid username
    When I enter username "InvalidUser123"
    And I enter password "admin123"
    And I click the login button
    Then I should see an error alert containing "Invalid credentials"
    And I should remain on the login page

  @smoke @login @critical
  Scenario: Login fails with invalid password
    When I enter username "Admin"
    And I enter password "WrongPassword123"
    And I click the login button
    Then I should see an error alert containing "Invalid credentials"
    And I should remain on the login page

  @login @validation
  Scenario: Login validation - Empty username field
    When I leave the username field empty
    And I enter password "admin123"
    And I click the login button
    Then I should see a validation error for the username field

  @login @validation
  Scenario: Login validation - Empty password field
    When I enter username "Admin"
    And I leave the password field empty
    And I click the login button
    Then I should see a validation error for the password field
