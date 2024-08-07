@elder-role
@shard-2
Feature: 👴🏻 Elder role

  Scenario: 👴🏻 Elder has two lives against werewolves but takes his revenge if he dies from villagers
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Elder    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be alive in the game
    And the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | name | vote    |
      | Bob  | Antoine |
    Then the player with name "Antoine" should be dead in the game

    When the user skips the game event
    Then the following players should have the attribute powerless by elder in the game
      | name    |
      | Charlie |
      | David   |
    Then the game's event should display the text "The Elder has been murdered by his own kind!"
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "He has taken his revenge! All the players from the Villagers side lose their power for the rest of the game."

  Scenario: 👴🏻 Elder has only one life against werewolves if game master sets it in game options
    Given the user disables the sheriff in game options
    And the user sets the elder's lives count to 1 in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Elder    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be dead in the game

  Scenario: 👴🏻 Elder doesn't take his revenge on villagers if game master doesn't allow it in game options
    Given the user disables the sheriff in game options
    And the user doesn't allow the elder to take his revenge in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Elder    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be alive in the game
    And the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | name | vote    |
      | Bob  | Antoine |
    Then the player with name "Antoine" should be dead in the game

    When the user skips the game event
    Then the player with name "Charlie" should not have the attribute powerless by elder in the game
    And the player with name "David" should not have the attribute powerless by elder in the game
    And the game's event should display the text "The night falls on the village of the Millers Hollow…"
