@sheriff-attribute

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
    And the page creates the missing snapshot with name "Survivors elect Sheriff Playground"

    When the survivors elect the sheriff with the votes
      | voter   | target |
      | Antoine | Bob    |
    Then the player with name "Bob" should have the attribute sheriff by survivors in the game
    And the game's event should display the text "The survivors have elected Bob as the Sheriff of the village !"

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