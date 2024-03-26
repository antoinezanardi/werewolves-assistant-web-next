@game-victory

Feature: 🏆 Game Victory

  Scenario: 🏆 Game is won by Villagers

    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Angel    |
    And the user closes the toast
    Then the game current play title should be "Survivors elect the Sheriff"

    When the survivors elect the sheriff with the votes
      | source  | target  |
      | Bob     | Antoine |
      | Charlie | Antoine |
    Then the game current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | Bob    |
      | Charlie | Bob    |
    Then the game current play title should be "Survivors bury dead bodies"

    When the survivors bury the dead bodies
    Then the game should be over with title "The Villagers win !" and subtitle "All of the Werewolves are dead. The village is safe at last."
    And the game winners should be the players
      | name    |
      | Antoine |
      | Charlie |
      | David   |
    And the link with name "Create another game" should be visible
    And the page should match the snapshot with name "Game won by Villagers"

  Scenario: 🏆 Game is won by Werewolves

    Given the user creates a game with the players with name and role
      | name    | role                 |
      | Antoine | White Werewolf       |
      | Bob     | Werewolf             |
      | Charlie | Villager             |
      | David   | Accursed Wolf-Father |
    And the user closes the toast
    Then the game current play title should be "Survivors elect the Sheriff"

    When the survivors elect the sheriff with the votes
      | source  | target  |
      | Bob     | Antoine |
      | Charlie | Antoine |
    Then the game current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    Then the game current play title should be "Accursed Wolf-Father infects"

    When the player or group skips his turn
    Then the game current play title should be "White Werewolf eats"

    When the player or group skips his turn
    Then the game current play title should be "Survivors bury dead bodies"

    When the survivors bury the dead bodies
    Then the game should be over with title "The Werewolves win !" and subtitle "All of the Villagers are dead. The Werewolves have eaten a lot and are now full, eventually."
    And the game winners should be the players
      | name    |
      | Antoine |
      | Bob     |
      | David   |
    And the link with name "Create another game" should be visible
    And the page should match the snapshot with name "Game won by Werewolves"

  Scenario: 🏆 Game is won by Lovers

    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Cupid    |
      | Bob     | Werewolf |
      | Charlie | Hunter   |
      | David   | Idiot    |
    And the user closes the toast
    Then the game current play title should be "Survivors elect the Sheriff"

    When the survivors elect the sheriff with the votes
      | source  | target  |
      | Bob     | Antoine |
      | Charlie | Antoine |
    Then the game current play title should be "Cupid charms"

    When the cupid charms the players
      | name    |
      | Antoine |
      | Bob     |
    Then the game current play title should be "Lovers meet each other"

    When the lovers meet each other
    Then the game current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    Then the game current play title should be "Survivors bury dead bodies"

    When the survivors bury the dead bodies
    Then the game current play title should be "Hunter shoots"

    When the hunter shoots the player with name "David"
    Then the game current play title should be "Survivors bury dead bodies"

    When the survivors bury the dead bodies
    Then the game should be over with title "The Lovers win together !" and subtitle "The two people in love from Cupid's arrow are the only survivors. They win together and will be together forever."
    And the game winners should be the players
      | name    |
      | Antoine |
      | Bob     |
    And the link with name "Create another game" should be visible
    And the page should match the snapshot with name "Game won by Lovers"

  Scenario: 🏆 Game is won by Angel

    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Villager |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Angel    |
    And the user closes the toast
    Then the game current play title should be "Survivors elect the Sheriff"

    When the survivors elect the sheriff with the votes
      | source  | target  |
      | Bob     | Antoine |
      | Charlie | Antoine |
    Then the game current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | David  |
      | Charlie | David  |
    Then the game current play title should be "Survivors bury dead bodies"

    When the survivors bury the dead bodies
    Then the game should be over with title "The Angel wins by himself !" and subtitle "The Angel has been eliminated during the first vote or the first night by the werewolves. He wins alone and comes back to the Good Place."
    And the game winners should be the players
      | name  |
      | David |
    And the link with name "Create another game" should be visible
    And the page should match the snapshot with name "Game won by Angel"