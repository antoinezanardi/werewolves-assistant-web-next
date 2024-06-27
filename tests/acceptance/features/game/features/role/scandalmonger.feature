@scandalmonger-role
Feature: 🐦‍⬛ Scandalmonger role

  Scenario: 🐦‍⬛ Scandalmonger marks a player with its feather or can skip its turn
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role          |
      | Antoine | Scandalmonger |
      | Bob     | Werewolf      |
      | Charlie | Idiot         |
      | David   | Villager      |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Scandalmonger wakes up and can mark a player with a feather."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "The player marked with a feather will have 2 more votes against him the next vote."

    When the user goes to the next game event text
    Then the game's current play title should be "Scandalmonger marks"
    And the game's current play question should be "Does the Scandalmonger want to mark a player ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Scandalmonger marks Playground"

    When the scandalmonger marks the player with name "Charlie"
    Then the player with name "Charlie" should have the attribute scandalmonger-marked by scandalmonger in the game
    And the game's event should display the text "The Scandalmonger has marked a player with a feather."

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will put the mark in front of the player to remember the penalty for the next vote."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the player with name "Charlie" should be dead in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Scandalmonger marks"

    When the player or group skips his turn
    Then the game's event should display the text "The Scandalmonger didn't mark anyone for this night. He flew away…"

  Scenario: 🐦‍⬛ Scandalmonger's mark penalty is changed to 1 vote by game master
    Given the user disables the sheriff in game options
    And the user sets the scandalmonger mark penalty to 1 in game options
    And the user creates a game with the players with name and role
      | name    | role          |
      | Antoine | Scandalmonger |
      | Bob     | Werewolf      |
      | Charlie | Idiot         |
      | David   | Villager      |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Scandalmonger wakes up and can mark a player with a feather."

    When the user goes to the next game event text
    Then the game's event should display the text "The player marked with a feather will have one more vote against him the next vote."
