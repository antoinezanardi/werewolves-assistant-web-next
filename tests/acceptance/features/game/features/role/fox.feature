@fox-role
@shard-1
Feature: 🦊 Fox role

  Scenario: 🦊 Fox can skip but becomes powerless if he doesn't spot a werewolf
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Fox      |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
      | Fred    | Elder    |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Fox wakes up and will sniff a group of 3 players to find out if there is a Werewolf among them."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's current play title should be "Fox sniffs"
    And the game's current play question should be "Does the Fox want to sniff a group of players?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
      | Fred    |
    And the page should match or creates the missing snapshot with name "Fox sniffs Playground"

    When the player or group skips his turn
    Then the game's event should display the text "The Fox may have sniffed a group of 3 players."

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master will tell the Fox if there is a Werewolf among the group of players with a thumbs up. Otherwise, he will give a thumbs down."

    When the user goes to the next game event text
    Then the game's event should display the text "If the Fox chose a group and didn't sniff a Werewolf among the group of 3 players, he becomes powerless for the rest of the game."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Fred"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Fox sniffs"

    When the fox sniffs the player with name "Bob"
    Then the game's event should display the text "The Fox may have sniffed a group of 3 players."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Bob"
    And the game's event player card should have the name "Charlie"

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master will tell the Fox if there is a Werewolf among the group of players with a thumbs up. Otherwise, he will give a thumbs down."

    When the user goes to the next game event text
    Then the game's event should display the text "The following sentence can't be said out loud : The Fox has sniffed a Werewolf among the group of players, the Game Master gives a thumbs up."

    When the user goes to the next game event text
    Then the game's event should display the text "If the Fox chose a group and didn't sniff a Werewolf among the group of 3 players, he becomes powerless for the rest of the game."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Fred"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Fox sniffs"

    When the fox sniffs the player with name "David"
    Then the game's event should display the text "The Fox may have sniffed a group of 3 players."
    And the game's event player card should have the name "Charlie"
    And the game's event player card should have the name "David"
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master will tell the Fox if there is a Werewolf among the group of players with a thumbs up. Otherwise, he will give a thumbs down."

    When the user goes to the next game event text
    Then the game's event should display the text "The following sentence can't be said out loud : The Fox didn't sniff a Werewolf among the group of players, the Game Master gives a thumbs down."

    When the user goes to the next game event text
    Then the game's event should display the text "If the Fox chose a group and didn't sniff a Werewolf among the group of 3 players, he becomes powerless for the rest of the game."
    And the player with name "Antoine" should have the attribute powerless by fox in the game

  Scenario: 🦊 Fox doesn't become powerless if the game master allows it in game options
    Given the user disables the sheriff in game options
    And the user prevents fox to be powerless if it misses a werewolf in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Fox      |
      | Bob     | Werewolf |
      | David   | Villager |
      | Fred    | Elder    |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Fox sniffs"

    When the fox sniffs the player with name "Fred"
    Then the player with name "Antoine" should not have the attribute powerless by fox in the game
