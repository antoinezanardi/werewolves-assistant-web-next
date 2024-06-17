@not-found-page

Feature: ❓ Not Found Page

  Scenario: ❓ Not Found Page is displayed when the user navigates to a non-existent page
    Given the user is on unknown page
    Then the heading with name "Page not found" should be visible
    And the heading with name "Looks like you're lost… You were trying to flee the Werewolves, weren't you ?" should be visible
    And the link with name "Go back to a safe place" should be visible
    And the page should match or creates the missing snapshot with name "Page not found"

  Scenario: ❓ Not Found Page has valid head title and SEO tags
    Given the user is on unknown page
    Then the page should have head title "Page not found"

  Scenario: ❓ User goes back on home page by clicking on button
    Given the user is on unknown page
    When the user clicks on the link with name "Go back to a safe place"
    Then the user should be on home page