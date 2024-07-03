@sheriff-attribute
@shard-4
Feature: 🎖️ Sheriff Attribute

  Scenario: 🎖 Sheriff is elected the first night of the game
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Witch    |

    When the user closes the toast
    And the user skips the game event
    Then the game's event should display the text "Survivors, it's time to elect the Sheriff for the village."

    When the user skips the game event
    Then the game's current play title should be "Survivors elect the Sheriff"
    And the game's phase name should be "Twilight"
    And the game's current play question should be "Which player do the survivors want to elect as the Sheriff ?"
    And the game's current play should have the following voters
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the following players can't be targeted in game's playground
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the page creates the missing snapshot with name "Survivors elect Sheriff Playground"

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    Then the player with name "Bob" should have the attribute sheriff by survivors in the game
    And the game's event should display the text "The survivors have elected Bob as the Sheriff of the village !"
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's event should display the text "The new Sheriff can make a powerful speech to his fellow villagers."

  Scenario: 🎖 Sheriff is elected after a tie between two players
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Witch    |

    When the user closes the toast
    And the user skips all game events

    When the survivors elect the sheriff with the votes
      | voter   | target  |
      | Antoine | Bob     |
      | Bob     | Antoine |
    Then the game's event should display the text "Survivors will elect again the Sheriff because the previous vote ended in a tie."

    When the user goes to the next game event text
    Then the game's event should display the text "The village must elect the Sheriff between Bob and Antoine. If there is a tie, the Sheriff will be elected randomly."

    When the user skips the game event
    Then the game's current play question should be "Which player do the survivors want to elect as Sheriff to break the tie ?"

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    Then the player with name "Bob" should have the attribute sheriff by survivors in the game
    And the game's event should display the text "The survivors have elected Bob as the Sheriff of the village !"

    When the user goes to the next game event text
    Then the game's event should display the text "The new Sheriff can make a powerful speech to his fellow villagers."

  Scenario: 🎖 Sheriff is elected the second day of the game when game master changes the sheriff election time in game options
    Given the user sets sheriff election time on day 2 in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Villager |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the game's current play title should be "Survivors elect the Sheriff"

  Scenario: 🎖 Sheriff has doubled vote during votes
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Angel    |

    When the user closes the toast
    And the user skips all game events

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | target  |
      | Antoine | David   |
      | Bob     | Charlie |
    Then the player with name "Charlie" should be dead in the game

  Scenario: 🎖 Sheriff has regular vote when game master disables the option
    Given the user gives the sheriff a regular vote in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Angel    |

    When the user closes the toast
    And the user skips all game events

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | target  |
      | Antoine | David   |
      | Bob     | Charlie |
    And the user skips all game events
    Then the game's current play question should be "Which player does the Sheriff want to settle the votes with ?"

  Scenario: 🎖 Sheriff settles votes between players in tie
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Angel    |

    When the user closes the toast
    And the user skips all game events

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | target  |
      | Antoine | David   |
      | David   | Antoine |
      | Charlie | Bob     |
    Then the game's event should display the text "The Sheriff will settle the votes between David, Antoine and Bob. The chosen player will be eliminated."
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's current play title should be "Sheriff settles votes"
    And the game's phase name should be "Twilight"
    And the game's current play question should be "Which player does the Sheriff want to settle the votes with ?"
    And the game's current play should have the following targets
      | name    |
      | David   |
      | Antoine |
      | Bob     |
    And the page should match or creates the missing snapshot with name "Sheriff settles votes Playground"

    When the sheriff settles the vote with the player with name "Antoine"
    Then the player with name "Antoine" should be dead in the game
    And the game's event should display the text "Antoine is dead ! What a tragedy…"

  Scenario: 🎖 Sheriff doesn't settle votes between players in tie when game master disables the option
    Given the user doesn't allow the sheriff to settle votes in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Angel    |

    When the user closes the toast
    And the user skips all game events

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | target  |
      | Antoine | David   |
      | David   | Antoine |
    And the user skips all game events
    Then the game's current play question should be "Which player do the survivors want to vote for to break the tie ?"

  Scenario: 🎖 Sheriff delegates his role to another survivor when he dies
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Cupid    |
      | David   | Angel    |

    When the user closes the toast
    And the user skips all game events

    When the survivors elect the sheriff with the votes
      | voter   | target  |
      | Antoine | Charlie |
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | voter   | target  |
      | Antoine | Charlie |
    Then the player with name "Charlie" should be dead in the game
    And the game's event should display the text "Charlie is dead ! What a tragedy…"

    When the user goes to the next game event text
    And the user goes to the next game event text
    Then the game's event should display the text "In his last breath, the Sheriff will delegate his role to another player."
    And the game's event player card should have the name "Charlie"

    When the user goes to the next game event text
    Then the game's current play title should be "Sheriff delegates"
    And the game's phase name should be "Twilight"
    And the game's current play question should be "Which player does the Sheriff want to delegate his role to ?"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | David   |
    And the page should match or creates the missing snapshot with name "Sheriff delegates Playground"

    When the sheriff delegates his role to the player with name "David"
    Then the player with name "David" should have the attribute sheriff by sheriff in the game
    And the game's event should display the text "David is the new Sheriff of the village !"

    When the user goes to the next game event text
    Then the game's event should display the text "The new Sheriff can make a powerful speech to his fellow villagers."
