@angel-role
@shard-2
Feature: 👼 Angel role

  Scenario: 👼 Angel wins if he dies from the votes during the twilight
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Angel    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |
    And the user closes the toast

    When the user skips the game event
    Then the game's event should display the text "The game starts with a vote because the Angel is present in the village."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Bob"
    And the game's event player card should have the name "Charlie"
    And the game's event player card should have the name "David"

    When the user goes to the next game event text
    Then the game's event should display the text "Watch out for the Angel, if he's eliminated during this vote, he wins the game alone immediately!"

    When the user goes to the next game event text
    Then the game's current play title should be "Survivors vote"
    And the game's phase name should be "Twilight"
    And the game's current play should have the following voters
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the game's current play can't be made for now

    When the survivors vote with the votes
      | voter   | vote    |
      | Charlie | Antoine |
      | Bob     | Antoine |
    Then the player with name "Antoine" should be dead in the game

    When the user skips all game events
    Then the game should be over with title "The Angel wins by himself!" and subtitle "The Angel has been eliminated during the first vote or the first night by the werewolves. He wins alone and comes back to the Good Place."
    And the game winners should be the players
      | name    |
      | Antoine |

  Scenario: 👼 Angel wins if he dies from the werewolves the first night
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Angel    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |
    And the user closes the toast

    When the user skips the game event
    Then the game's event should display the text "The game starts with a vote because the Angel is present in the village."

    When the user goes to the next game event text
    Then the game's event should display the text "Watch out for the Angel, if he's eliminated during this vote, he wins the game alone immediately!"

    When the user goes to the next game event text
    Then the game's current play title should be "Survivors vote"
    And the game's phase name should be "Twilight"
    And the game's current play should have the following voters
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |

    When the survivors vote with the votes
      | voter   | vote    |
      | Antoine | Charlie |
    Then the player with name "Charlie" should be dead in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game should be over with title "The Angel wins by himself!" and subtitle "The Angel has been eliminated during the first vote or the first night by the werewolves. He wins alone and comes back to the Good Place."
    And the game winners should be the players
      | name    |
      | Antoine |
