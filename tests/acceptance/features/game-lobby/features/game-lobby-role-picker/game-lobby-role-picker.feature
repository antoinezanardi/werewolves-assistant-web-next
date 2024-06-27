@game-lobby-role-picker
Feature: 🃏👆 Game Lobby Role Picker

  Scenario: 🃏👆 Role Picker is displayed when user clicks on a player with description and available roles
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user clicks on the player with name "Antoine" in the lobby
    Then the heading with exact name "Pick a role for the player Antoine" should be visible
    And the heading with exact name "Pick a role" should be visible
    And the button with name "Pick role for the player" should be disabled
    And the page creates the missing snapshot with name "Game Lobby Role Picker without picked role"

  Scenario: 🃏👆 User picks the seer role for a player
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user clicks on the player with name "Antoine" in the lobby
    And the user chooses the role with name "Seer" in the lobby role picker
    Then the button with name "Pick role for the player" should be enabled
    And the heading with exact name "Pick a role" should be hidden
    And the heading with exact name "Seer" should be visible
    And the page creates the missing snapshot with name "Game Lobby Role Picker with picked role"

    When the user clicks on the button with exact name "Pick role for the player"
    Then the heading with exact name "Pick a role for the player Antoine" should be hidden
    And the player with name "Antoine" should have the "Seer" role in the lobby

  Scenario: 🃏👆 User selects a random role for a player
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user clicks on the player with name "Antoine" in the lobby
    And the user chooses a random role in the lobby role picker
    Then the button with name "Pick role for the player" should be enabled

    When the user clicks on the button with exact name "Pick role for the player"
    Then the heading with exact name "Pick a role for the player Antoine" should be hidden
    And the player with name "Antoine" should have a role in the lobby

  Scenario: 🃏👆 User can't pick a role for a player if he already has this role
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name    | role |
      | Antoine | Seer |
    And the user clicks on the player with name "Antoine" in the lobby
    Then the button with name "Pick role for the player" should be disabled

    When the user chooses the role with name "Seer" in the lobby role picker
    Then the button with name "Pick role for the player" should be disabled

    When the user chooses the role with name "Werewolf" in the lobby role picker
    Then the button with name "Pick role for the player" should be enabled

  Scenario: 🃏👆 Current role is displayed for a player when picking a role for him
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user clicks on the player with name "Antoine" in the lobby
    Then the player should not have current role in the lobby role picker

    When the user chooses the role with name "Seer" in the lobby role picker
    And the user clicks on the button with exact name "Pick role for the player"
    And the user clicks on the player with name "Antoine" in the lobby
    Then the player should have "Seer" as current role in the lobby role picker

  Scenario: 🃏👆 Roles are swapped with first player with picked role when its maximum is reached
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name    | role |
      | Antoine | Seer |
      | Bob     | Seer |
    Then the player with name "Antoine" should not have a role in the lobby
    And the player with name "Bob" should have the "Seer" role in the lobby

  Scenario: 🃏👆 Total for each role present in the party is displayed in the role picker
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Juju    | Werewolf |
      | Doudou  | Hunter   |
    And the user clicks on the player with name "Antoine" in the lobby
    Then the role "Seer" should have a total badge with "1" in the lobby role picker
    And the role "Seer" total badge should have tooltip with text "Total in the party" in the lobby role picker
    And the role "Werewolf" should have a total badge with "2" in the lobby role picker
    And the role "Werewolf" total badge should have tooltip with text "Total in the party" in the lobby role picker
    And the role "Hunter" should have a total badge with "1" in the lobby role picker
    And the role "Hunter" total badge should have tooltip with text "Total in the party" in the lobby role picker
    And the role "Villager" should not have a total badge in the lobby role picker

  Scenario: 🃏👆 Warning is displayed when a role must be picked to reach the minimum number of players for this role
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name    | role           |
      | Antoine | Seer           |
      | Bob     | Werewolf       |
      | Juju    | Three Brothers |
      | Doudou  | Two Sisters    |
    And the user clicks on the player with name "Antoine" in the lobby
    Then the role "Two Sisters" should have a total badge with "1" in the lobby role picker
    Then the role "Three Brothers" should have a total badge with "1" in the lobby role picker
    And the role "Two Sisters" should have a warning minimum players not reached badge in the lobby role picker
    And the role "Three Brothers" should have a warning minimum players not reached badge in the lobby role picker
    And the role "Seer" should not have a warning minimum players not reached badge in the lobby role picker
    And the role "Two Sisters" warning minimum players not reached badge should have tooltip with text "Minimum in the party not reached (1 left to pick)" in the lobby role picker
    And the role "Three Brothers" warning minimum players not reached badge should have tooltip with text "Minimum in the party not reached (2 left to pick)" in the lobby role picker

  Scenario: 🃏👆 Role Picker displays description of selected roles and scrolls to top if necessary when selecting another one
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user clicks on the player with name "Antoine" in the lobby
    And the user chooses the role with name "Wild Child" in the lobby role picker
    Then the role's description image with name "Wild Child" should be visible in the lobby role picker
    And the role's description should have text "His goal is to eliminate the Werewolves as long as his model is alive." in the lobby role picker

    When the user scrolls to the text "Game master's advice: not revealing the true nature of the Wild Child eliminated by the village vote can be amusing. Doubt about his true identity then persists: was he a Villager or a Werewolf before being eliminated?"
    And the user chooses the role with name "Werewolf" in the lobby role picker
    Then the role's description image with name "Werewolf" should be in viewport in the lobby role picker

  Scenario: 🃏👆 User closes the role picker with escape, close button or outside click
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user clicks on the player with name "Antoine" in the lobby
    Then the heading with exact name "Pick a role for the player Antoine" should be visible

    When the user presses the escape key
    Then the heading with exact name "Pick a role for the player Antoine" should be hidden

    When the user clicks on the player with name "Antoine" in the lobby
    And the user clicks on the close button of the dialog's header
    Then the heading with exact name "Pick a role for the player Antoine" should be hidden

    When the user clicks on the player with name "Antoine" in the lobby
    And the user clicks on the top left corner of the screen
    Then the heading with exact name "Pick a role for the player Antoine" should be hidden