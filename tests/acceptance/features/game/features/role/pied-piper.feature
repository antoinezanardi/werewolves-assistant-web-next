@pied-piper-role

Feature: 🪈 Pied Piper role

  Scenario: 🪈 Pied Piper charms 2 players per night

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role       |
      | Antoine | Pied Piper |
      | Bob     | Werewolf   |
      | Charlie | Elder      |
      | David   | Villager   |
    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    Then the game's event should display the text "The Pied Piper wakes up and will charm 2 players."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Pied Piper charms"
    And the game's current play question should be "Which players does the Pied Piper want to charm ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Pied Piper charms Playground"

    When the pied piper charms the players
      | name    |
      | Bob     |
      | Charlie |
    Then the following players should have the attribute charmed by pied piper in the game
      | name    |
      | Bob     |
      | Charlie |
    And the game's event should display the text "The first charmed people by the Pied Piper wake up and meet each other."
    And the game's event player card should have the name "Bob"
    And the game's event player card should have the name "Charlie"

    When the user goes to the next game event text
    Then the game's current play title should be "Charmed people meet each other"
    And the game's phase name should be "Night 1"
    And the page should match or creates the missing snapshot with name "Charmed people meet each other Playground"