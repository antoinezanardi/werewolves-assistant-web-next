@villager-villager-role
@shard-1
Feature: 🧑🏻‍🌾🧑🏻‍🌾 Villager-Villager role

  Scenario: 🧑🏻‍🌾🧑🏻‍🌾 Villager-Villager is revealed at the start of the game
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role              |
      | Antoine | Villager-Villager |
      | Bob     | Werewolf          |
      | Charlie | Villager          |
      | David   | Villager          |

    When the user closes the toast
    And the user skips the game event
    Then the game's event should display the text "Antoine is the Villager-Villager of the village ! His/Her role is revealed to the others."
    And the player with name "Antoine" should have his role revealed in the game
    And the player with name "Charlie" should have his role hidden in the game

    When the user goes to the next game event text
    Then the game's event should display the text "Without any special power, the other players can fully trust him/her. Why not elect him/her as the Sheriff ?"

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the player with name "Charlie" should be dead in the game
    And the player with name "Charlie" should have his role revealed in the game
