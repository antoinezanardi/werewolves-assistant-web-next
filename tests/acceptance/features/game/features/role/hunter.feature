@hunter-role
@shard-4
Feature: 🔫 Hunter role

  Scenario: 🔫 Hunter shoots and kill someone when he dies
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Hunter   |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    Then the game's event should display the text "The day rises in the village of the Millers Hollow !"

    When the user skips the game event
    Then the game's event should display the text "Antoine is dead ! What a tragedy…"
    And the player with name "Antoine" should be dead in the game

    When the user skips the game event
    Then the game's event should display the text "In his last breath, the Hunter will shoot at a player and kill him right away."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's current play title should be "Hunter shoots"
    And the game's current play question should be "Which player does the Hunter want to shoot ?"
    And the game's phase name should be "Day 1"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Hunter shoots Playground"

    When the hunter shoots the player with name "David"
    Then the game's event should display the text "David is dead ! What a tragedy…"
    And the player with name "David" should be dead in the game
