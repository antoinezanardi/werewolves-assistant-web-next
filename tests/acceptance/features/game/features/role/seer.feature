@seer-role
Feature: 🔮Seer role

  Scenario: 🔮Seer looks the role of a player
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips the game event
    Then the game's event should display the text "The night falls on the village of the Millers Hollow…"
    When the user skips the game event
    Then the game's event should display the text "The Seer wakes up and will look at a player's role."
    And the game's event player card should have the name "Antoine"
    When the user skips the game event
    Then the game's current play title should be "Seer looks"
    And the game's current play question should be "Which player does the Seer want to look at ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Seer looks Playground"

    When the seer looks at the player with name "Bob"
    Then the game's event should display the text "The Seer has seen a Werewolf !"
    And the player with name "Bob" should have the attribute seen by seer in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Charlie"
    Then the game's event should display the text "The Seer has seen an Idiot !"
    And the player with name "Charlie" should have the attribute seen by seer in the game

  Scenario: 🔮Seer looks the role of a player but game master doesn't say the role out loud because she is quiet
    Given the user disables the sheriff in game options
    And the user makes the seer quiet in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    Then the game's event should display the text "Because the Seer is quiet, the Game Master will mime the role of the seen player."

    When the user goes to the next game event text
    Then the game's event should display the text "The Seer has seen a Werewolf !"
    And the player with name "Bob" should have the attribute seen by seer in the game
    And the game's event player card should have the name "Bob"

  Scenario: 🔮Seer looks only the side of a player because the game master doesn't allow her to see the role
    Given the user disables the sheriff in game options
    And the user doesn't allow the seer to see roles in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    Then the game's event should display the text "The Seer has seen a player from the Werewolves side !"
    And the player with name "Bob" should have the attribute seen by seer in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Charlie"
    Then the game's event should display the text "The Seer has seen a player from the Villagers side !"

  Scenario: 🔮Seer looks only the side of a player and is quiet because the game master changed the game options
    Given the user disables the sheriff in game options
    And the user doesn't allow the seer to see roles in game options
    And the user makes the seer quiet in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    Then the game's event should display the text "Because the Seer is quiet, the Game Master will mime the side of the seen player."

    When the user goes to the next game event text
    Then the game's event should display the text "The Seer has seen a player from the Werewolves side !"
    And the player with name "Bob" should have the attribute seen by seer in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Seer looks"
    And the game's phase name should be "Night 2"

    When the seer looks at the player with name "Charlie"
    Then the game's event should display the text "Because the Seer is quiet, the Game Master will mime the side of the seen player."

    When the user goes to the next game event text
    Then the game's event should display the text "The Seer has seen a player from the Villagers side !"