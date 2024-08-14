@wild-child-role
@shard-4
Feature: 🐒 Wild Child Role

  Scenario: 🐒 Wild Child becomes a werewolf if his model dies
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role       |
      | Antoine | Wild Child |
      | Bob     | Werewolf   |
      | Charlie | Idiot      |
      | David   | Villager   |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Wild Child wakes up and can choose a model among the players."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "If the model dies, the Wild Child will join the Werewolves side."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Wild Child chooses a model"
    And the game's current play question should be "Which player does the Wild Child want to choose as his model?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Wild Child chooses model Playground"

    When the wild child chooses the player with name "David" as a model
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The following sentence can't be said out loud and is only for the Game Master : The Wild Child has transformed into a Werewolf because his model died!"
    And the game's event player card should have the name "Antoine"
    And the player with name "Antoine" should be in the werewolves side in the game

    When the user skips all game events
    Then the game's current play title should be "Survivors vote"

  Scenario: 🐒 Wild Child transformation is revealed to everyone when game master sets it in game options
    Given the user disables the sheriff in game options
    And the user sets wild child transformation revealed to everyone in game options
    And the user creates a game with the players with name and role
      | name    | role       |
      | Antoine | Wild Child |
      | Bob     | Werewolf   |
      | Charlie | Idiot      |
      | David   | Villager   |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Wild Child chooses a model"

    When the wild child chooses the player with name "David" as a model
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Wild Child has transformed into a Werewolf because his model died!"
    And the game's event player card should have the name "Antoine"
