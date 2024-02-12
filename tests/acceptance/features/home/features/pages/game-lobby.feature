@game-lobby-page

Feature: 🃏 Game Lobby Page

  Scenario: 🃏 Game Lobby page is displayed with title, inputs and buttons
    Given the user is on game-lobby page
    Then the heading with name "Game Lobby" should be visible
    And the input with label "Please enter a player name" should be visible
    And the button with name "Add" should be visible
    And the heading with name "Add player names with the input above" should be visible
    And the button with name "Random composition" should be visible
    And the button with name "Start game" should be visible

  Scenario: 🃏 User adds a player
    Given the user is on game-lobby page
    Then the input with label "Please enter a player name" should be empty
    When the user types "Antoine" in the input with label "Please enter a player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Please enter a player name" should be empty
    And the heading with name "Add player names with the input above" should be hidden

  Scenario: 🃏 User can't add twice the same player
    Given the user is on game-lobby page
    When the user types "Antoine" in the input with label "Please enter a player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Please enter a player name" should be empty
    When the user types "Antoine" in the input with label "Please enter a player name"
    Then the button with name "Add" should be disabled

  Scenario: 🃏 User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user is on game-lobby page
    When the user clicks on the child link with name "Home page link" under the navigation with name "Navigation bar"
    Then the user should be on home page

  Scenario: 🃏 User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user is on game-lobby page
    When the user clicks on the child button with name "Parameters" under the navigation with name "Navigation bar"
    And the user clicks on the element with text "Back to home" under the menu with name "Parameters menu"
    Then the user should be on home page