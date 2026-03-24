# Apply Leave submission and Cancel Leave are intentionally excluded.
# The shared OrangeHRM demo has an unstable leave entitlement state
# that other users can change at any time.

Feature: Leave Management
  As an admin user
  I want to manage leave requests
  So that I can track and control employee time off

  Background:
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "admin123"
    And I navigate to the Leave module
    Then the Leave page should be displayed

  @smoke @leave @critical
  Scenario: Leave module loads successfully
    Then I should see the Leave module heading
    And I should see the Apply Leave option

  @leave @list
  Scenario: My Leave List loads and displays results area
    When I navigate to My Leave List
    Then the leave list results area should be visible

  @leave @navigation
  Scenario: Apply Leave page navigates and renders safely
    # Validates routing works regardless of the demo's leave entitlement state.
    # Passes whether the full form renders or the zero-balance message appears.
    When I navigate to the Apply Leave page
    Then I should see the Apply Leave form or the no balance message

  @leave @search
  Scenario: Filter leave list by leave status
    When I navigate to My Leave List
    And I clear all default leave statuses
    And I filter the leave list by status "Rejected"
    Then the leave list results area should be visible

  @leave @navigation
  Scenario: Leave List tab displays correct table columns
    When I navigate to the Leave List tab
    Then the leave list table should show all expected columns

  @leave @apply @skip
  Scenario: Apply leave successfully
    # Skipped: shared demo leave entitlement state is mutated by other users. The leave type can be changed and the date format is inconsistent too.
    # LeavePage.applyLeave() is implemented and ready when a stable env is available.
    When I navigate to the Apply Leave page
    And I select leave type "Annual Leave"
    And I enter from date "2026-04-01"
    And I enter to date "2026-04-01"
    And I submit the leave request
    Then the leave request should be submitted successfully

  @leave @cancel @skip
  Scenario: Cancel a pending leave request
    # Skipped: depends on a pre-existing pending leave record that may not exist or even if created by us it could be deleted since its a shared enviroment.
    Given I have a pending leave request for "Annual Leave"
    When I navigate to My Leave List
    And I cancel the pending leave request
    Then the leave request status should be "Cancelled"

  @leave @apply @data-driven @skip
  Scenario Outline: Apply leave with different leave types
    # Skipped: Shared demo leave balance is unreliable for automated submission. The admin could have no leave balance or not enough balance.
    When I navigate to the Apply Leave page
    And I select leave type "<leaveType>"
    And I enter from date "<fromDate>"
    And I enter to date "<toDate>"
    And I submit the leave request
    Then the leave request should be submitted successfully

    Examples:
      | leaveType    | fromDate   | toDate     |
      | Annual Leave | 2026-04-01 | 2026-04-01 |
      | Sick Leave   | 2026-04-02 | 2026-04-02 |
