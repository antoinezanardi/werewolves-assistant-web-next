@defender-role
@shard-3
Feature: 🛡️ Defender Role

  Scenario: 🛡️ Defender protects from werewolf attack but can't choose twice in a row the same player
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Defender |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Defender wakes up and will protect anyone from the Werewolves."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's current play title should be "Defender protects"
    And the game's current play question should be "Which player does the Defender want to protect?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Defender protects Playground"

    When the defender protects the player with name "Antoine"
    Then the player with name "Antoine" should have the attribute protected by defender in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be alive in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips the game event
    Then the game's event should display the text "The Defender wakes up and will protect anyone from the Werewolves except the last protected player."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's current play title should be "Defender protects"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |

  Scenario: 🛡️ Defender protects from werewolf attack and can choose anyone at any moment if the game master allows it
    Given the user disables the sheriff in game options
    And the user allows the defender to protect twice in a row in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Defender |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user goes to the next game event text
    And the user goes to the next game event text
    Then the game's event should display the text "This game is special with 2 changed options. Let's see how it goes…"

    When the user goes to the next game event text
    Then the game's event should display the text "Special rule 1 : The game will not have a Sheriff."

    When the user goes to the next game event text
    Then the game's event should display the text "Special rule 2 : The Defender can protect the same player twice or more in a row during the game."

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Defender wakes up and will protect anyone from the Werewolves."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's current play title should be "Defender protects"
    And the game's current play question should be "Which player does the Defender want to protect?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |

    When the defender protects the player with name "Antoine"
    Then the player with name "Antoine" should have the attribute protected by defender in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be alive in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips the game event
    Then the game's event should display the text "The Defender wakes up and will protect anyone from the Werewolves."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's current play title should be "Defender protects"
    And the game's current play question should be "Which player does the Defender want to protect?"
    And the game's phase name should be "Night 2"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |

    When the defender protects the player with name "Antoine"
    Then the player with name "Antoine" should have the attribute protected by defender in the game
