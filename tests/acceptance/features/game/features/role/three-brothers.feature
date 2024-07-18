@three-brothers-role
@shard-3
Feature: 👨‍👨‍👦 Three Brothers role

  Scenario: 👨‍👨‍👦 Three Brothers are called every other night
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role           |
      | Antoine | Three Brothers |
      | Bob     | Werewolf       |
      | Charlie | Three Brothers |
      | David   | Three Brothers |
      | Damien  | Villager       |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Three Brothers wake up and meet each other for the first time. They can trust each other from now on."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Charlie"
    And the game's event player card should have the name "David"

    When the user skips the game event
    And the user moves his mouse away
    Then the game's current play title should be "Three Brothers meet each other"
    And the game's current play question should be "The Three Brothers convene and consult with each other."
    And the game's phase name should be "Night 1"
    And the game's current play should not expect any action
    And the game's current play should have a countdown of 0 minutes and 20 seconds
    And the page should match or creates the missing snapshot with name "Three Brothers meet each other Playground"

    When the three brothers meet each other
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Damien"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips the game event
    Then the game's event should display the text "The Three Brothers wake up and meet each other. They can consult with each other quietly."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Charlie"

    When the user skips the game event
    Then the game's current play title should be "Three Brothers meet each other"

  Scenario: 👨‍👨‍👦 Three Brothers are called every night when game master sets their waking up interval accordingly in game options
    Given the user disables the sheriff in game options
    And the user sets the three brothers waking up interval to 1 in game options
    And the user creates a game with the players with name and role
      | name    | role           |
      | Antoine | Three Brothers |
      | Bob     | Werewolf       |
      | Charlie | Three Brothers |
      | David   | Three Brothers |
      | Damien  | Villager       |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Three Brothers wake up and meet each other for the first time. They can trust each other from now on."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Charlie"
    And the game's event player card should have the name "David"

    When the user skips the game event
    And the user moves his mouse away
    Then the game's current play title should be "Three Brothers meet each other"

    When the three brothers meet each other
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Three Brothers meet each other"
