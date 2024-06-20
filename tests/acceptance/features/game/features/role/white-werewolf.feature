@white-werewolf-role

Feature: 🦴🐺 White Werewolf role

  Scenario: 🦴🐺 White Werewolf eats another wolf or can skip its turn every other night

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role           |
      | Antoine | Witch          |
      | Bob     | White Werewolf |
      | Charlie | Werewolf       |
      | David   | Villager       |
      | Nelson  | Scapegoat      |
      | Lucy    | Little Girl    |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    Then the game's event should display the text "The White Werewolf wakes up and can eat another Werewolf if he wants to."
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's current play title should be "White Werewolf eats"
    And the game's current play question should be "Does the White Werewolf want to eat another Werewolf ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Charlie |
    And the page should match or creates the missing snapshot with name "White Werewolf eats Playground"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Witch uses potions"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Lucy"
    And the user skips all game events
    Then the game's current play title should be "Witch uses potions"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    Then the game's event should display the text "The White Werewolf wakes up and can eat another Werewolf if he wants to."
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's current play title should be "White Werewolf eats"

    When the white werewolf eats the player with name "Charlie"
    Then the player with name "Charlie" should have the attribute eaten by white werewolf in the game

    When the user skips all game events
    Then the game's current play title should be "Witch uses potions"

    When the player or group skips his turn
    And the user skips all game events
    Then the player with name "Charlie" should be dead in the game

  Scenario: 🦴🐺 White Werewolf should not have any targets if there is no other werewolf to eat

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role           |
      | Antoine | Witch          |
      | Bob     | White Werewolf |
      | David   | Villager       |
      | Nelson  | Scapegoat      |
    And the user closes the toast
    And the user skips all game events

    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    Then the game's event should display the text "The White Werewolf wakes up and can eat another Werewolf if he wants to."
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's current play title should be "White Werewolf eats"
    And the game's current play should not have targets

  Scenario: 🦴🐺 White Werewolf wakes every night when game master sets its waking up interval to 1

    Given the user disables the sheriff in game options
    And the user sets the white werewolf waking up interval to 1 in game options
    And the user creates a game with the players with name and role
      | name    | role           |
      | Antoine | Witch          |
      | Bob     | White Werewolf |
      | Charlie | Werewolf       |
      | David   | Villager       |
      | Nelson  | Scapegoat      |
    And the user closes the toast
    And the user skips all game events

    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    Then the game's event should display the text "The White Werewolf wakes up and can eat another Werewolf if he wants to."
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's current play title should be "White Werewolf eats"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Witch uses potions"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Nelson"
    And the user skips all game events
    Then the game's current play title should be "White Werewolf eats"