@stuttering-judge-role
@shard-1
Feature: ⚖️ Stuttering Judge role

  Scenario: ⚖️ Stuttering Judge can ask for another consecutive vote or skip
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role             |
      | Antoine | Stuttering Judge |
      | Bob     | Werewolf         |
      | Charlie | Elder            |
      | David   | Villager         |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    Then the game's event should display the text "After this vote, the Stuttering Judge can request another one immediately."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "Every player must put their hands in their back. The Game Master walk around and recognize the sign of the Stuttering Judge if he wants to request another vote."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Stuttering Judge requests another vote"
    And the game's current play question should be "Does the Stuttering Judge want to request another vote?"
    And the game's phase name should be "Day 1"
    And the page should match or creates the missing snapshot with name "Stuttering Judge Requests Another Vote Playground"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    Then the game's event should display the text "After this vote, the Stuttering Judge can request another one immediately."

    When the user skips all game events
    And the stuttering judge requests another vote
    Then the game's event should display the text "Survivors will vote again because the Stuttering Judge requested another vote."

    When the user goes to the next game event text
    Then the game's current play title should be "Survivors vote"
    And the game's current play question should be "Which player do the survivors want to vote for on the Stuttering Judge's request?"

  Scenario: ⚖️ Stuttering Judge can have more requests if game master allows it in game options
    Given the user disables the sheriff in game options
    And the user sets the stuttering judge request count to 2 in game options
    And the user creates a game with the players with name and role
      | name    | role             |
      | Antoine | Stuttering Judge |
      | Bob     | Werewolf         |
      | Charlie | Elder            |
      | David   | Villager         |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    Then the game's event should display the text "After this vote, the Stuttering Judge can request another one immediately."
    And the game's event player card should have the name "Antoine"

    When the user skips all game events
    And the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    Then the game's event should display the text "After this vote, the Stuttering Judge can request another one immediately."
