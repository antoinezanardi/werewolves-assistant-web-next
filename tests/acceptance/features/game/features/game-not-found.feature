@game-not-found

Feature: 🎲❓Game Not Found

  Scenario: 🎲❓Game not found page is displayed when game is not found
    Given the user goes on an unknown game
    Then the heading with name "Game not found… Did you get lost ?" should be visible
    And the link with name "Create another game" should be visible
    And the link with name "Back to home" should be visible
    And the page should match the snapshot with name "Game not found Page"

  Scenario: 🎲❓User creates a new game from the game not found page
    Given the user goes on an unknown game
    When the user clicks on the link with name "Create another game"
    Then the user should be on game-lobby page

  Scenario: 🎲❓User goes to home from the game not found page
    Given the user goes on an unknown game
    When the user clicks on the link with name "Back to home"
    Then the user should be on home page

  Scenario: 🎲❓User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user is on game-lobby page
    When the user clicks on werewolves assistant logo in navigation bar
    Then the user should be on home page

  Scenario: 🎲❓User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user is on game-lobby page
    When the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    Then the user should be on home page