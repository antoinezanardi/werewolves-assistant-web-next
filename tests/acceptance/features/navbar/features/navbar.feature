@navbar
@shard-4
Feature: 🧭 Navigation bar

  Scenario: 🧭 Navigation bar is displayed with logo and many buttons
    Given the user is on about page
    Then the link with name "Werewolves Assistant" in navigation bar should be visible
    And the img with name "Werewolves Assistant" in navigation bar should be visible
    And the button with name "Parameters" in navigation bar should be visible

    When the user hovers the button with name "Parameters" in navigation bar
    Then the tooltip with text "Parameters" should be visible

  Scenario: 🧭 Navigation bar doesn't display the game section in parameters when the user is not on the game page
    Given the user is on about page

    When the user clicks on parameters button in navigation bar
    Then the game section in parameters in navigation bar should be hidden

  Scenario: 🧭 Navigation bar doesn't display the game section in parameters when the user is on unknown game page
    Given the user goes on an unknown game

    When the user clicks on parameters button in navigation bar
    Then the game section in parameters in navigation bar should be hidden

  Scenario: 🧭 Navigation bar displays the game section in parameters when the user is on the game page
    Given the user creates a game with 4 random role players

    When the user clicks on parameters button in navigation bar
    Then the game section in parameters in navigation bar should be visible
