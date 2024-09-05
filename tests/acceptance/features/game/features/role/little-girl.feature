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
    And the user goes to the next game event text
    And the user goes to the next game event text
    Then the game's event should display the text "This game is special with 2 changed options. Let's see how it goes…"

    When the user goes to the next game event text
    Then the game's event should display the text "Special rule 1 : The game will not have a Sheriff."

    When the user goes to the next game event text
    Then the game's event should display the text "Special rule 2 : If the Little Girl is the target of the Werewolves, the Defender can save her with his protection."

    When the user skips all game events
    Then the game's current play title should be "Defender protects"

    When the defender protects the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"
    And the player with name "Antoine" should be alive in the game
