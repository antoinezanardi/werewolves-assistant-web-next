@little-girl-role
@shard-2
Feature: 👧 Little Girl role

  Scenario: 👧 Little Girl is protected by the Defender when Game Master allows it in game options
    Given the user disables the sheriff in game options
    And the user allows the defender to protect the little girl from the werewolves in game options
    And the user creates a game with the players with name and role
      | name    | role        |
      | Antoine | Little Girl |
      | Bob     | Werewolf    |
      | Charlie | Defender    |
      | David   | Villager    |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Defender protects"

    When the defender protects the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"
    And the player with name "Antoine" should be alive in the game
