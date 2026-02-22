Feature: Admin User Management
  As an admin user
  I want to manage system users
  So that I can control application access

  Background:
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "admin123"
    And I navigate to the Admin module
    Then the Admin page should be displayed

  @smoke @admin @critical
  Scenario: Admin page loads successfully
    Then I should see the search section
    And I should see the Add button

  @admin @search
  Scenario: Search for existing user by username
    When I search for user "Admin"
    Then I should see the user "Admin" in the results table

  @admin @search
  Scenario: Search for non-existing user returns no results
    When I search for user "NonExistentUser999"
    Then I should see "No Records Found" message

  @admin @add @critical
  Scenario: Add new user successfully
    When I click the Add button
    And I select user role "ESS"
    And I enter employee name "a"
    And I select status "Enabled"
    And I enter unique username
    And I enter the new user password "Test1234!"
    And I enter confirm password "Test1234!"
    And I click Save button
    Then the user should be added successfully
    And I should see the new user in the results table

  @admin @add @validation
  Scenario: Add user with duplicate username shows error
    When I click the Add button
    And I select user role "Admin"
    And I enter employee name "e"
    And I select status "Enabled"
    And I enter the new user username "Admin"
    And I enter the new user password "Test1234!"
    And I enter confirm password "Test1234!"
    And I click Save button
    Then I should see validation error

  @admin @edit
  Scenario: Edit existing user successfully
    Given I have added a test user with employee "m"
    When I search for the test user
    And I click edit icon for the user
    And I change the status to "Disabled"
    And I click Save button
    Then the user should be updated successfully

  @admin @delete
  Scenario: Delete user successfully
    Given I have added a test user with employee "r"
    When I delete the test user
    Then the user should be deleted successfully
    And I should not see the user in results

  @admin @search
  Scenario: Reset search filters
    When I search for user "Admin"
    And I click Reset button
    Then the search fields should be cleared
