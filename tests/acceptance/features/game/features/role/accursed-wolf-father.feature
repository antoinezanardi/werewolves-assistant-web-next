@accursed-wolf-father-role

Feature: 🐺 Accursed Wolf-Father role

  Scenario: 🐺 Accursed Wolf-Father can infect a victim of Werewolves or skip

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role                 |
      | Antoine | Seer                 |
      | Bob     | Accursed Wolf-Father |
      | Charlie | Idiot                |
      | David   | Villager             |
      | Coco    | Little Girl          |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    Then the game's event should display the text "The Accursed Wolf-Father wakes up and can infect a player eaten by the Werewolves if he wants to."

    When the user skips the game event
    Then the game's current play title should be "Accursed Wolf-Father infects"
    And the game's current play question should be "Does the Accursed Wolf-Father want to infect the player eaten by the Werewolves ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name  |
      | David |
    And the page should match or creates the missing snapshot with name "Accursed Wolf-Father infects Playground"

    When the player or group skips his turn
    Then the game's event should display the text "The Accursed Wolf-Father may have infected a player eaten by the Werewolves."
    And the player with name "David" should be dead in the game

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master goes around every player and taps in the back the player infected by the Accursed Wolf-Father. This player is from now a Werewolf but will keep his old villagers powers."

    When the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "Antoine"
    And the user skips all game events
    Then the player with name "Antoine" should be alive in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Seer looks"