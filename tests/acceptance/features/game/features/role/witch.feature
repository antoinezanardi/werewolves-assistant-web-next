@witch-role
@shard-4
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

    When the witch uses her potions on players
      | potion | player  |
      | life   | Antoine |
    Then the player with name "Antoine" should be alive in the game

    When the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    Then the game's event should display the text "The Witch wakes up and can use her life and/or death potions."

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will ask her will for each potion, even if she already used them."

    When the user goes to the next game event text
    Then the game's current play title should be "Witch uses potions"
    And the game's current play question should be "Does the Witch want to use her potions ?"
    And the game's phase name should be "Night 2"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | David   |
    And the tab with name "Give life potion to save the player…" should be disabled

    When the witch uses her potions on players
      | potion | player |
      | death  | David  |
    And the user skips all game events
    Then the player with name "David" should be dead in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Witch uses potions"
    And the game's current play question should be "Does the Witch want to use her potions ?"
    And the game's phase name should be "Night 3"
    And the witch should be out of potions
    And the tab with name "Give life potion to save the player…" should be hidden
    And the tab with name "Give death potion to kill the player…" should be hidden
    And the user moves his mouse away
    And the page should match or creates the missing snapshot with name "Witch out of potions Playground"
