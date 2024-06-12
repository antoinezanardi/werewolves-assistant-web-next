@defender-role

Feature: 🛡️ Defender Role

  Scenario: 🛡️ Defender protects from werewolf attack but can't choose twice in a row the same player

    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Defender |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Defender wakes up and will protect anyone from the Werewolves."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's current play title should be "Defender protects"
    And the game's current play question should be "Which player does the Defender want to protect ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Defender protects Playground"

    When the defender protects the player with name "Antoine"
    Then the player with name "Antoine" should have the attribute protected by defender in the game