@navbar

Feature: 🧭 Navigation bar

  Scenario: Navigation bar is displayed with logo and many buttons
    Given the user is on about page
    Then the link with name "Werewolves Assistant" in navigation bar should be visible
    And the img with name "Werewolves Assistant" in navigation bar should be visible
    And the button with name "Parameters" in navigation bar should be visible
    When the user hovers the button with name "Parameters" in navigation bar
    Then the tooltip with text "Parameters" should be visible