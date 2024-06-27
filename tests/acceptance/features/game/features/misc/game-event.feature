@game-event
Feature: 🌟 Game Event

  Scenario: 🌟 User can navigate between game events and their texts with buttons
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    Then the game's event should display the text "Welcome everyone in the village of the Millers Hollow !"
    And the game's previous event button should be disabled
    And the game's event previous text button should be disabled
    And the page should match or creates the missing snapshot with name "Game Starts Event"

    When the user goes to the next game event text
    Then the game's previous event button should be disabled
    And the game's event previous text button should be enabled

    When the user goes back to the previous game event text
    Then the game's event should display the text "Welcome everyone in the village of the Millers Hollow !"
    And the game's previous event button should be disabled
    And the game's event previous text button should be disabled

    When the user skips the game event
    Then the game's event should display the text "The night falls on the village of the Millers Hollow…"
    And the game's previous event button should be enabled
    And the game's event previous text button should be disabled
    And the page creates the missing snapshot with name "Game Phase Event"

    When the user goes back to the previous game event
    Then the game's event should display the text "Welcome everyone in the village of the Millers Hollow !"

    When the user skips the game event
    Then the game's event should display the text "The night falls on the village of the Millers Hollow…"

    When the user goes to the next game event text
    Then the game's event should display the text "The Seer wakes up and will look at a player's role."

  Scenario: 🌟 User can navigate between game events and their texts with keyboard
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    Then the game's event should display the text "Welcome everyone in the village of the Millers Hollow !"

    When the user goes to the next game event text with keyboard
    Then the game's previous event button should be disabled
    And the game's event previous text button should be enabled

    When the user goes back to the previous game event text with keyboard
    Then the game's event should display the text "Welcome everyone in the village of the Millers Hollow !"

    When the user skips the game event with keyboard
    Then the game's event should display the text "The night falls on the village of the Millers Hollow…"

    When the user goes to the next game event text with keyboard
    Then the game's event should display the text "The Seer wakes up and will look at a player's role."

    When the user goes back to the previous game event with keyboard
    Then the game's event should display the text "The night falls on the village of the Millers Hollow…"
