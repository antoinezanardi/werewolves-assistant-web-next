@prejudiced-manipulator-role
@shard-7
Feature: 👺 Prejudiced Manipulator role

  Scenario: 👺 Prejudiced Manipulator sets all players into groups and is powerless if Accursed Wolf-Father infected him
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role                   |
      | Antoine | Elder                  |
      | Bob     | Accursed Wolf-Father   |
      | Charlie | Idiot                  |
      | David   | Prejudiced Manipulator |
    And the user sets the following players in the second group in the lobby
      | name  |
      | Bob   |
      | David |
    And the user starts the game in the lobby
    Then the user should be on game page with any id
    And the player with name "Antoine" should be in group with name "Group 1" in the game
    And the player with name "Charlie" should be in group with name "Group 1" in the game
    And the player with name "Bob" should be in group with name "Group 2" in the game
    And the player with name "David" should be in group with name "Group 2" in the game

    When the user skips the game event
    Then the game's event should display the text "The Prejudiced Manipulator is in the game! Players are divided into two groups."
    And the game's event player card should have the name "David"

    When the user goes to the next game event text
    Then the game's event should display the text "Antoine and Charlie are in the group called "Group 1""

    When the user goes to the next game event text
    Then the game's event should display the text "Bob and David are in the group called "Group 2""

    When the user goes to the next game event text
    Then the game's event should display the text "The Prejudiced Manipulator wins the game alone if all players not in his group are eliminated."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "David"
    Then the player with name "David" should have the attribute powerless by accursed wolf-father in the game

  Scenario: 👺 Prejudiced Manipulator is not powerless by Accursed Wolf-Father when game master prevents it in game options
    Given the user disables the sheriff in game options
    And the user prevents prejudiced manipulator to be powerless on werewolves side in game options
    And the user enters the players with name and role in the lobby
      | name    | role                   |
      | Antoine | Elder                  |
      | Bob     | Accursed Wolf-Father   |
      | Charlie | Idiot                  |
      | David   | Prejudiced Manipulator |
    And the user sets the following players in the second group in the lobby
      | name  |
      | Bob   |
      | David |
    And the user starts the game in the lobby
    Then the user should be on game page with any id
    And the player with name "Antoine" should be in group with name "Group 1" in the game
    And the player with name "Charlie" should be in group with name "Group 1" in the game
    And the player with name "Bob" should be in group with name "Group 2" in the game
    And the player with name "David" should be in group with name "Group 2" in the game

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "David"
    Then the player with name "David" should not have the attribute powerless by accursed wolf-father in the game
