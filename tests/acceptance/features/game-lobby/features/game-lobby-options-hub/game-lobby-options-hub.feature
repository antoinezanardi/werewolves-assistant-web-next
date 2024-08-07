@game-lobby-options-hub
@shard-1
Feature: ⚙️ Game Lobby Options Hub

  Scenario: ⚙️ Options Hub is displayed when user clicks on game options button in lobby
    Given the user is on game-lobby page

    When the user clicks on the game options button in the lobby
    Then the heading with name "Game options" should be visible
    And the tab with name "Roles" should be visible
    And the tab with name "Composition" should be visible
    And the tab with name "Votes" should be visible
    And the heading with name "Skip the call if no target" should be visible
    And the page creates the missing snapshot with name "Game Lobby Options Hub on Roles tab"

    When the user clicks on the tab with name "Composition"
    And the heading with name "Composition is hidden" should be visible
    Then the page creates the missing snapshot with name "Game Lobby Options Hub on Composition tab"

    When the user clicks on the tab with name "Votes"
    And the heading with name "Votes can be skipped" should be visible
    Then the page creates the missing snapshot with name "Game Lobby Options Hub on Votes tab"

  Scenario: ⚙️ User closes the options hub with escape, close button or outside click
    Given the user is on game-lobby page

    When the user clicks on the game options button in the lobby
    Then the heading with name "Game options" should be visible

    When the user presses the escape key
    Then the heading with exact name "Game options" should be hidden

    When the user clicks on the game options button in the lobby
    And the user clicks on the close button of the dialog's header
    Then the heading with exact name "Game options" should be hidden

    When the user clicks on the game options button in the lobby
    And the user clicks on the close button of the dialog's footer
    Then the heading with exact name "Game options" should be hidden

    When the user clicks on the game options button in the lobby
    And the user clicks on the top left corner of the screen
    Then the heading with exact name "Game options" should be hidden
