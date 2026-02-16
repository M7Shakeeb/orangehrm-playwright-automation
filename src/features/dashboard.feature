Feature: Dashboard Functionality
  As a logged-in user of OrangeHRM
  I want to access the dashboard and navigate to different modules
  So that I can efficiently manage HR tasks

  Background:
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "admin123"
    Then I should be on the dashboard page

  @smoke @dashboard @critical
  Scenario: Dashboard loads successfully after login
    Then the dashboard heading should be visible
    And all navigation menu items should be visible

  @dashboard @navigation
  Scenario: Navigate to Admin module from dashboard
    When I click on the Admin menu
    Then I should be redirected to the Admin page

  @dashboard @navigation
  Scenario: Navigate to PIM module from dashboard
    When I click on the PIM menu
    Then I should be redirected to the PIM page

  @dashboard @navigation
  Scenario: Navigate to Leave module from dashboard
    When I click on the Leave menu
    Then I should be redirected to the Leave page

  @smoke @dashboard @critical
  Scenario: User can logout successfully
    When I open the user dropdown
    And I click on logout option
    Then I should be redirected to the login page
    And I should not be able to access dashboard without re-login

  @dashboard @navigation
  Scenario: Navigate back to dashboard from other modules
    When I click on the Admin menu
    And I click on the Dashboard menu
    Then I should be on the dashboard page
    And the dashboard heading should be visible
