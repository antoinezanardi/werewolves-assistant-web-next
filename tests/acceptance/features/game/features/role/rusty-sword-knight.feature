@rusty-sword-knight-role
@shard-1
Feature: 🤺 Rusty Sword Knight role

  Scenario: 🤺 Rusty Sword Knight kills the first alive werewolf on his left when he died at the end of the day
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role               |
      | Cedric  | Werewolf           |
      | Bob     | Werewolf           |
      | Sophia  | Villager           |
      | Antoine | Rusty Sword Knight |
      | Charlie | Villager           |
      | David   | Werewolf           |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be dead in the game
    And the player with name "Bob" should have the attribute contaminated by rusty sword knight in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    Then the player with name "Bob" should be dead in the game
