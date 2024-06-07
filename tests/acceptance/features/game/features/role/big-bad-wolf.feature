@big-bad-wolf-role

Feature: 🐺👹 Big Bad Wolf role

  Scenario: 🐺👹 Big Bad Wolf eats a Villager after the the other Werewolves

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role         |
      | Antoine | Idiot        |
      | Bob     | Werewolf     |
      | Charlie | Big Bad Wolf |
      | David   | Villager     |
      | Maria   | Witch        |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    Then the game's event should display the text "The Big Bad Wolf wakes up and will eat a Villager."

    When the user skips the game event
    Then the game's current play title should be "Big Bad Wolf eats"
    And the game's phase name should be "Night 1"
    And the game's current play question should be "Which player does the Big Bad Wolf want to eat ?"
    And the game's current play should have the following targets
      | name  |
      | David |
      | Maria |
    And the page should match or creates the missing snapshot with name "Big Bad Wolf eats Playground"

    When the big bad wolf eats the player with name "David"
    And the user skips all game events
    Then the player with name "David" should have the attribute eaten by big bad wolf in the game

  Scenario: 🐺👹 Big Bad Wolf doesn't have any target shown if there is no Villager left to eat

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role         |
      | Antoine | Idiot        |
      | Bob     | Werewolf     |
      | Charlie | Big Bad Wolf |
      | David   | Werewolf     |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Big Bad Wolf eats"
    And the game's current play should not have targets
    And the page should match or creates the missing snapshot with name "Game Playground without targets"

  Scenario: 🐺👹 Big Bad Wolf is powerless if one werewolf dies

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role         |
      | Antoine | Idiot        |
      | Bob     | Werewolf     |
      | Charlie | Big Bad Wolf |
      | David   | Angel        |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | Bob    |
    And the user skips all game events
    Then the player with name "Charlie" should have the attribute powerless by werewolves in the game

  Scenario: 🐺👹 Big Bad Wolf remains powerful if one werewolf dies when game master disables the option

    Given the user disables the sheriff in game options
    And the user makes the big bad wolf remaining powerful even if one werewolf dies in game options
    And the user creates a game with the players with name and role
      | name    | role         |
      | Antoine | Idiot        |
      | Bob     | Werewolf     |
      | Charlie | Big Bad Wolf |
      | David   | Angel        |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | Bob    |
    And the user skips all game events
    Then the player with name "Charlie" should not have the attribute powerless by werewolves in the game