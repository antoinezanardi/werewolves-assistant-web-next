@wolf-hound-role
Feature: 🐕 Wolf-Hound role

  Scenario: 🐕 Wolf-Hound chooses the Werewolves side
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role        |
      | Antoine | Wolf-Hound  |
      | Bob     | Werewolf    |
      | Charlie | Little Girl |
      | David   | Villager    |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Wolf-Hound wakes up and chooses which side he wants to join between Villagers and Werewolves."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Wolf-Hound chooses side"
    And the game's current play question should be "Which side does the Wolf-Hound want to choose ?"
    And the game's phase name should be "Night 1"
    And the page should match or creates the missing snapshot with name "Wolf-Hound chooses side Playground"

    When the wolf-hound chooses the werewolves side
    Then the player with name "Antoine" should be in the werewolves side in the game
    And the game's event should display the text "The Wolf-Hound chose to join a side. The chosen side will remain a secret to the other players…"

  Scenario: 🐕 Wolf-Hound chooses the Villagers side and it's revealed to other players because game master enabled the option
    Given the user disables the sheriff in game options
    And the user sets wolf-hound chosen side revealed to everyone in game options
    And the user creates a game with the players with name and role
      | name    | role        |
      | Antoine | Wolf-Hound  |
      | Bob     | Werewolf    |
      | Charlie | Little Girl |
      | David   | Villager    |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Wolf-Hound wakes up and chooses which side he wants to join between Villagers and Werewolves."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Wolf-Hound chooses side"

    When the wolf-hound chooses the villagers side
    Then the player with name "Antoine" should be in the villagers side in the game
    And the game's event should display the text "The Wolf-Hound chose to join the side of the … Villagers !"

  Scenario: 🐕 Wolf-Hound's side is randomly chosen by the assistant because the game master enabled the option
    Given the user disables the sheriff in game options
    And the user sets wolf-hound side randomly chosen by assistant in game options
    And the user creates a game with the players with name and role
      | name    | role        |
      | Antoine | Wolf-Hound  |
      | Bob     | Werewolf    |
      | Charlie | Little Girl |
      | David   | Villager    |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "In this special game, the Wolf-Hound's side is randomly chosen by the Assistant."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display either "The Assistant assigned the Wolf-Hound to a random side. The Game Master will mime the side of the Wolf-Hound. (Villagers)" or "The Assistant assigned the Wolf-Hound to a random side. The Game Master will mime the side of the Wolf-Hound. (Werewolves)"

  Scenario: 🐕 Wolf-Hound's side is randomly chosen by the assistant and revealed to everyone because the game master enabled both options
    Given the user disables the sheriff in game options
    And the user sets wolf-hound chosen side revealed to everyone in game options
    And the user sets wolf-hound side randomly chosen by assistant in game options
    And the user creates a game with the players with name and role
      | name    | role        |
      | Antoine | Wolf-Hound  |
      | Bob     | Werewolf    |
      | Charlie | Little Girl |
      | David   | Villager    |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "In this special game, the Wolf-Hound's side is randomly chosen by the Assistant."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display either "The Assistant assigned the Wolf-Hound to the side of the … Villagers !" or "The Assistant assigned the Wolf-Hound to the side of the … Werewolves !"