@idiot-role
@shard-2
Feature: 🤪 Idiot role

  Scenario: 🤪 Idiot doesn't die if his death is from votes but his role is revealed
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Angel    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | vote    |
      | Antoine | Charlie |
    Then the game's event should display the text "Charlie is dead! What a tragedy… He/she can reveal his/her role to the others."
    And the player with name "Charlie" should be alive in the game
    And the player with name "Charlie" should have his role revealed in the game
    And the player with name "Charlie" should have the attribute cant-vote by survivors in the game

    When the user goes to the next game event text
    Then the game's event should display the text "Charlie is actually the Idiot!"

    When the user goes to the next game event text
    Then the game's event should display the text "The survivors have pity for the Idiot and spare him. He is not eliminated but can't vote for the rest of the game."

  Scenario: 🤪 Idiot dies if his role is revealed and elder dies
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Angel    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Hunter   |
      | Guy     | Elder    |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | vote    |
      | Antoine | Charlie |
    Then the game's event should display the text "Charlie is dead! What a tragedy… He/she can reveal his/her role to the others."
    And the player with name "Charlie" should be alive in the game
    And the player with name "Charlie" should have his role revealed in the game
    And the player with name "Charlie" should have the attribute cant-vote by survivors in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Hunter shoots"

    When the hunter shoots the player with name "Guy"
    And the user skips all game events
    Then the player with name "Guy" should be dead in the game
    And the player with name "Charlie" should be dead in the game

  Scenario: 🤪 Idiot doesn't die if his role is revealed and elder dies when game master disables the option
    Given the user disables the sheriff in game options
    And the user prevents the revealed idiot death on elder's death in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Angel    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Hunter   |
      | Guy     | Elder    |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | vote    |
      | Antoine | Charlie |
    Then the game's event should display the text "Charlie is dead! What a tragedy… He/she can reveal his/her role to the others."
    And the player with name "Charlie" should be alive in the game
    And the player with name "Charlie" should have his role revealed in the game
    And the player with name "Charlie" should have the attribute cant-vote by survivors in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Hunter shoots"

    When the hunter shoots the player with name "Guy"
    And the user skips all game events
    Then the player with name "Guy" should be dead in the game
    And the player with name "Charlie" should be alive in the game
