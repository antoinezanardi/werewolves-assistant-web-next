@scapegoat-role
@shard-4
Feature: 🐐 Scapegoat role

  Scenario: 🐐 Scapegoat bans some players from votes if he is killed by a tie in votes
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role      |
      | Antoine | Scapegoat |
      | Bob     | Werewolf  |
      | Charlie | Idiot     |
      | David   | Angel     |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | name    | vote    |
      | Antoine | Charlie |
      | Bob     | Charlie |
      | Charlie | Bob     |
      | David   | Bob     |
    Then the player with name "Antoine" should be dead in the game

    When the user skips the game event
    Then the game's event should display the text "In his last breath, the Scapegoat takes his revenge and can ban one or more players from voting in the votes of the next day."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Scapegoat bans voting"
    And the game's current play question should be "Does the Scapegoat want to ban one or more players from voting?"
    And the game's phase name should be "Twilight"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |

    #    And the page should match or creates the missing snapshot with name "Scapegoat bans voting Playground"

    When the scapegoat bans from voting the players
      | name |
      | Bob  |
    Then the following players should have the attribute cant-vote by scapegoat in the game
      | name |
      | Bob  |
