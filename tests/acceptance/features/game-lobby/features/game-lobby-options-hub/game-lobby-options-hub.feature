@game-lobby-options-hub
@shard-8
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

  Scenario: ⚙️ Options Hub stores changed game options in local storages and keeps the state when user comes back
    Given the user is on game-lobby page
    And the user disables the sheriff in game options

    When the user reloads the page
    And the user clicks on the game options button in the lobby
    Then the heading with name "Game options" should be visible
    And the exact text "The game will not have a Sheriff." should be visible

  Scenario: ⚙️ User can restore official rules by clicking on reset button
    Given the user is on game-lobby page
    And the user disables the sheriff in game options
    And the user clicks on the game options button in the lobby
    Then the heading with name "Game options" should be visible
    And the exact text "The game will not have a Sheriff." should be visible

    When the user clicks on the button with name "Restore official rules"
    Then the exact text "The game will have a Sheriff." should be visible

  Scenario: ⚙️ Number of changed game options are displayed in the game options button
    Given the user is on game-lobby page
    And the user disables the sheriff in game options
    And the user doesn't allow the elder to take his revenge in game options
    Then the changed game options badge should display 2 in the lobby

    When the user hovers the changed game options badge in the lobby
    Then the tooltip with text "You have changed 2 options" should be visible

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
    And the user clicks on the top left corner of the screen
    Then the heading with exact name "Game options" should be hidden
