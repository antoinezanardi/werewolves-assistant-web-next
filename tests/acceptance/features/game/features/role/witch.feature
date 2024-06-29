@witch-role
Feature: 🪄 Witch role

  Scenario: 🪄 Witch uses her potions to save a player and to kill a player
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Witch    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    Then the game's event should display the text "The Witch wakes up and can use her life and/or death potions."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Witch uses potions"
    And the game's current play question should be "Does the Witch want to use her potions ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
    And the page should match or creates the missing snapshot with name "Witch uses life potion Playground"

    When the user clicks on the tab with name "Give death potion to kill the player…"
    Then the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Witch uses death potion Playground"
