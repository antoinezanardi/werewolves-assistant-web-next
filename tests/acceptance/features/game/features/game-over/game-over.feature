@game-over-page

Feature: 🏁 Game Over Page

  Scenario: 🏁 User is sent back to game lobby with same players to create a new game with them

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Villager |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Angel    |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | David  |
    And the user skips all game events
    Then the game should be over with title "The Angel wins by himself !" and subtitle "The Angel has been eliminated during the first vote or the first night by the werewolves. He wins alone and comes back to the Good Place."
    And the button with name "Create another game" should be visible

    When the user creates a new game with same players in game over
    Then the user should be on game-lobby page
    And the player with name "Antoine" should be in the lobby
    And the player with name "Antoine" should not have a role in the lobby
    And the player with name "Bob" should be in the lobby
    And the player with name "Bob" should not have a role in the lobby
    And the player with name "Charlie" should be in the lobby
    And the player with name "Charlie" should not have a role in the lobby
    And the player with name "David" should be in the lobby
    And the player with name "David" should not have a role in the lobby

  Scenario: 🏁 User is sent back to empty game lobby to create a new game with new players

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Villager |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Angel    |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | David  |
    And the user skips all game events
    Then the game should be over with title "The Angel wins by himself !" and subtitle "The Angel has been eliminated during the first vote or the first night by the werewolves. He wins alone and comes back to the Good Place."
    And the button with name "Create another game" should be visible

    When the user creates a new game with new players in game over
    Then the user should be on game-lobby page
    And the player with name "Antoine" should not be in the lobby
    And the player with name "Bob" should not be in the lobby
    And the player with name "Charlie" should not be in the lobby
    And the player with name "David" should not be in the lobby
    And the heading with name "Add player names with the input above" should be visible