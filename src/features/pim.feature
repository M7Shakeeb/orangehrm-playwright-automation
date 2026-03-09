Feature: PIM Employee Management
  As an admin user
  I want to manage employees in the PIM module
  So that I can maintain accurate employee records

  Background:
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "admin123"
    And I navigate to the PIM module
    Then the PIM page should be displayed

  @smoke @pim @critical
  Scenario: PIM page loads successfully
    Then I should see the employee search section
    And I should see the PIM Add button

  @pim @search
  Scenario: Search for existing employee by name
    When I search for employee name "Admin"
    Then I should see at least one result in the employee table

  @pim @search
  Scenario: Search for non-existing employee returns no results
    When I search for employee name "ZZZNoSuchEmployee999"
    Then I should see no employee records found

  @pim @search
  Scenario: Search by employee ID
    When I search for employee name "Admin"
    Then I should see at least one result in the employee table
    And I click the employee search Reset button
    When I search for employee by ID "0001"
    Then I should see at least one result in the employee table

  @pim @search
  Scenario: Reset search filters clears the fields
    When I search for employee name "Admin"
    And I click the employee search Reset button
    Then the employee search fields should be cleared

  @smoke @pim @add @critical
  Scenario: Add new employee successfully
    When I click the PIM Add button
    And I fill in the employee first name with a unique value
    And I fill in the employee last name with a unique value
    And I save the new employee
    Then the employee should be saved and profile page displayed
    And I store the new employee name for later use

  @pim @add @validation
  Scenario: Add employee with empty first name shows validation error
    When I click the PIM Add button
    And I clear the first name field
    And I clear the last name field
    And I save the new employee
    Then I should see employee form validation errors

  @pim @edit @skip
  Scenario: Edit employee name successfully
    Given I have added a test employee
    When I navigate back to the employee list
    And I click edit for the test employee
    And I update the employee first name to a new unique value
    And I click the employee save button
    Then the employee should be updated successfully

  @pim @delete @skip
  Scenario: Delete employee successfully
    Given I have added a test employee
    When I navigate back to the employee list
    And I delete the test employee
    Then the employee should be deleted successfully
    And I should not see the deleted employee in the list

  @e2e @pim @critical
  Scenario: Full E2E - Add employee, verify, edit, delete, logout
    When I click the PIM Add button
    And I fill in the employee first name with a unique value
    And I fill in the employee last name with a unique value
    And I save the new employee
    Then the employee should be saved and profile page displayed
    And I store the new employee name for later use
    When I navigate back to the employee list
    And I search for the test employee by name
    Then I should see the test employee in the results table
    When I click edit for the test employee
    And I update the employee first name to a new unique value
    And I click the employee save button
    Then the employee should be updated successfully
    When I navigate back to the employee list
    And I delete the test employee by updated name
    Then the employee should be deleted successfully
    When I open the user dropdown
    And I click on logout option
    Then I should be redirected to the login page

  @data-driven @pim
  Scenario Outline: Add multiple employees with different names
    When I click the PIM Add button
    And I fill in the employee first name with "<firstName>"
    And I fill in the employee last name with "<lastName>"
    And I save the new employee
    Then the employee should be saved and profile page displayed

    Examples:
      | firstName      | lastName       |
      | TestDataFirst1 | TestDataLast1  |
      | TestDataFirst2 | TestDataLast2  |
      | TestDataFirst3 | TestDataLast3  |
