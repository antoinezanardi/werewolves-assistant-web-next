@game-lobby-page

Feature: 🃏 Game Lobby Page

  Scenario: 🃏 Game Lobby page is displayed with title, inputs and buttons
    Given the user is on game-lobby page
    Then the heading with name "Game Lobby" should be visible
    And the input with label "Player name" should be visible
    And the button with name "Add" should be visible
    And the heading with name "Add player names with the input above" should be visible
    And the button with name "Random composition" should be visible
    And the button with name "Start game" should be visible

  Scenario: 🃏 User adds a player
    Given the user is on game-lobby page
    Then the input with label "Player name" should be empty
    And the input with label "Please enter a player name" should be visible
    When the user types "Antoine" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Player name" should be empty
    And the heading with name "Add player names with the input above" should be hidden
    And the player with name "Antoine" should be in the lobby
    And the player with name "Antoine" should not have a role

  Scenario: 🃏 User can't add twice the same player
    Given the user is on game-lobby page
    When the user types "Antoine" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Player name" should be empty
    When the user types "Antoine" in the input with label "Player name"
    Then the button with name "Add" should be disabled
    And the input with label "This player name is already taken" should be enabled

  Scenario: 🃏 User can't add a player with an empty name but input is emptied
    Given the user is on game-lobby page
    When the user types "          " in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Player name" should be empty
    And the heading with name "Add player names with the input above" should be visible

  Scenario: 🃏 User can't add a player if game has reached 40 players
    Given the user is on game-lobby page
    When the user types "Antoine" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Benoit" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Clement" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "David" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Eliott" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Fabien" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Gael" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Hugo" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Isaac" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Julien" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Kevin" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Louis" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Maxime" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Nathan" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Olivier" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Paul" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Quentin" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Romain" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Sylvain" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Theo" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Ulysse" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Valentin" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "William" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Xavier" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Yann" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Zacharie" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Aurelien" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Bastien" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Cedric" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Dorian" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Emmanuel" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Florian" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Guillaume" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Herve" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Ibrahim" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Jerome" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Kamel" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Lionel" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Mathieu" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Nabil" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Player name" should be disabled
    And the input with label "Maximum number of players reached" should be disabled
    And the button with name "Add" should be disabled

  Scenario: 🃏 User deletes a player
    Given the user is on game-lobby page
    When the user types "Antoine" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the player with name "Antoine" should be in the lobby
    When the user clicks on the button with name "Remove player Antoine"
    Then the heading with name "Add player names with the input above" should be visible
    And the player with name "Antoine" should not be in the lobby

  Scenario: 🃏 User generates a random composition for 4 players
    Given the user is on game-lobby page
    When the user types "Antoine" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Benoit" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Clement" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "David" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user clicks on the button with name "Random composition"
    Then the player with name "Antoine" should have a role
    And the player with name "Benoit" should have a role
    And the player with name "Clement" should have a role
    And the player with name "David" should have a role

  Scenario: 🃏 User can't generate random composition if there is less than 4 players
    Given the user is on game-lobby page
    Then the button with name "Random composition" should be disabled
    When the user hovers the button with name "Random composition"
    Then the tooltip with text "The minimum number of players is not reached" should be visible
    When the user types "Antoine" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Benoit" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "Clement" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    And the user types "David" in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the button with name "Random composition" should be enabled
    When the user hovers the button with name "Random composition"
    Then the tooltip with text "The minimum number of players is not reached" should be hidden

  Scenario: 🃏 User can't start the game if there is less than 4 players
    Given the user is on game-lobby page
    Then the button with name "Start game" should be disabled
    When the user hovers the button with name "Start game"
    Then the tooltip with text "The minimum number of players is not reached" should be visible

  Scenario: 🃏 User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user is on game-lobby page
    When the user clicks on the child link with name "Werewolves Assistant" under the navigation with name "Navigation bar"
    Then the user should be on home page

  Scenario: 🃏 User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user is on game-lobby page
    When the user clicks on the child button with name "Parameters" under the navigation with name "Navigation bar"
    And the user clicks on the element with text "Back to home" under the menu with name "Parameters menu"
    Then the user should be on home page