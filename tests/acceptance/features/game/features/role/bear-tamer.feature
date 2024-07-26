@bear-tamer-role
@shard-3
Feature: 🐻 Bear Tamer role

  Scenario: 🐻 Bear growls only if there is a werewolf right next to its tamer
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role       |
      | Antoine | Bear Tamer |
      | Bob     | Elder      |
      | Charlie | Werewolf   |
      | David   | Villager   |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Bob"
    Then the player with name "Bob" should be alive in the game

    When the user skips the game event
    Then the game's event should display the text "The bear is calmly eating. No Werewolf is right next to the Bear Tamer…"
    And the game's event player card should have the name "Antoine"

    When the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    Then the player with name "David" should be dead in the game

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The bear growls! One or more Werewolves are right next to the Bear Tamer…"
    And the game's event player card should have the name "Antoine"

    When the user skips all game events
    Then the game's current play title should be "Survivors vote"

  Scenario: 🐻 Bear growls even if there is no werewolf next to him when he's infected
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role                 |
      | Antoine | Bear Tamer           |
      | Bob     | Elder                |
      | Charlie | Accursed Wolf-Father |
      | David   | Villager             |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "Antoine"
    Then the player with name "Antoine" should be alive in the game
    And the player with name "Antoine" should be in the werewolves side in the game

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The bear growls! One or more Werewolves are right next to the Bear Tamer…"

  Scenario: 🐻 Bear doesn't growl even he's infected when game master prevents it in game options
    Given the user disables the sheriff in game options
    And the user prevents bear to growl if he's infected in game options
    And the user creates a game with the players with name and role
      | name    | role                 |
      | Antoine | Bear Tamer           |
      | Bob     | Elder                |
      | Charlie | Accursed Wolf-Father |
      | David   | Villager             |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "Antoine"
    Then the player with name "Antoine" should be alive in the game
    And the player with name "Antoine" should be in the werewolves side in the game

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The bear is calmly eating. No Werewolf is right next to the Bear Tamer…"
