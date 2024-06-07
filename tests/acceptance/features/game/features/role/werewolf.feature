@werewolf-role

Feature: 🐺 Werewolf role

  Scenario: 🐺 Werewolves eat a villager each night

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Mama    | Werewolf |
      | Charlie | Idiot    |
      | David   | Witch    |
    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Werewolves wake up and meet each other for the first time."
    And the game's event player card should have the name "Bob"
    And the game's event player card should have the name "Mama"

    When the user goes to the next game event text
    Then the game's event should display the text "When the meeting is over, the Werewolves will eat a Villager."

    When the user skips the game event
    Then the game's current play title should be "Werewolves eat"
    And the game's current play question should be "Which player do the Werewolves want to eat ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Werewolves eat Playground"

    When the werewolves eat the player with name "David"
    Then the player with name "David" should have the attribute eaten by werewolves in the game

    When the user skips all game events
    Then the game's current play title should be "Witch uses potions"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips the game event
    Then the game's event should display the text "The Werewolves wake up and will eat a Villager."