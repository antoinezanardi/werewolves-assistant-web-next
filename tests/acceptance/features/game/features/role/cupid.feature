@cupid-role
@shard-2
Feature: 👼Cupid role

  Scenario: 👼Cupid makes two players fall in love
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Cupid    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Elder    |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "Cupid wakes up and chooses two players to be in love with each other."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "Cupid can choose himself to be in love if he wants to."

    When the user goes to the next game event text
    Then the game's current play title should be "Cupid charms"
    And the game's current play question should be "Which players does Cupid want to charm ?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following targets
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
      | David   |
    And the page should match or creates the missing snapshot with name "Cupid charms Playground"

    When the cupid charms the players
      | name    |
      | Antoine |
      | Bob     |
    Then the game's event should display the text "Cupid has charmed two players to be in love with each other."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Bob"
    And the player with name "Antoine" should have the attribute in love by cupid in the game
    And the player with name "Bob" should have the attribute in love by cupid in the game

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will tap in the back the Lovers so they know they are in love."

    When the user goes to the next game event text
    Then the game's event should display the text "The Lovers wake up and meet each other. They are in love and will win together if they are the only survivors."
    And the game's event player card should have the name "Antoine"
    And the game's event player card should have the name "Bob"

    When the user goes to the next game event text
    Then the game's event should display the text "If one of the Lovers dies, the other one will die too."

    When the user goes to the next game event text
    Then the game's current play title should be "Lovers meet each other"
    And the game's current play question should be "The lovers meet each other, it's a love at first sight !"
    And the game's phase name should be "Night 1"
    And the game's current play should not expect any action
    And the page should match or creates the missing snapshot with name "Lovers meet each other Playground"

  Scenario: 👼Lovers from Cupid reveal their role to each other because the game master enabled the option
    Given the user disables the sheriff in game options
    And the user forces the lovers from cupid reveal their roles to each other in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Cupid    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Elder    |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Cupid charms"

    When the cupid charms the players
      | name    |
      | Antoine |
      | Bob     |
    Then the game's event should display the text "Cupid has charmed two players to be in love with each other."

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will tap in the back the Lovers so they know they are in love."

    When the user goes to the next game event text
    Then the game's event should display the text "The Lovers wake up and meet each other. They are in love and will win together if they are the only survivors."

    When the user goes to the next game event text
    Then the game's event should display the text "If one of the Lovers dies, the other one will die too."

    When the user goes to the next game event text
    Then the game's event should display the text "In this special game, the Lovers reveal their roles to each other."

  Scenario: 👼Cupid can win with the lovers
    Given the user disables the sheriff in game options
    And the user sets cupid must win with lovers in game options
    And the user creates a game with the players with name and role
      | name    | role      |
      | Antoine | Cupid     |
      | Bob     | Werewolf  |
      | Charlie | Idiot     |
      | David   | Scapegoat |

    When the user closes the toast
    And the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "Cupid wakes up and chooses two players to be in love with each other."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "In this special game, Cupid must win with the Lovers he will choose. Thus, he can't charm himself."

    When the user goes to the next game event text
    Then the game's current play title should be "Cupid charms"
    And the game's current play should have the following targets
      | name    |
      | Bob     |
      | Charlie |
      | David   |

    When the cupid charms the players
      | name    |
      | Bob     |
      | Charlie |
    Then the game's event should display the text "Cupid has charmed two players to be in love with each other."

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will tap in the back the Lovers so they know they are in love."

    When the user goes to the next game event text
    Then the game's event should display the text "The Lovers wake up and meet each other. They are in love and will win together if they are the only survivors. Cupid wins with them if he survives with them."
    And the game's event player card should have the name "Bob"
    And the game's event player card should have the name "Charlie"

    When the user goes to the next game event text
    Then the game's event should display the text "If one of the Lovers dies, the other one will die too. If Cupid dies, the Lovers will survive and also the other way around."

    When the user goes to the next game event text
    Then the game's current play title should be "Lovers meet each other"

    When the lovers meet each other
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the game should be over with title "The Lovers and Cupid win together !" and subtitle "The two people in love from Cupid's arrow and Cupid himself are the only survivors. The team of Love wins !"
    And the game winners should be the players
      | name    |
      | Antoine |
      | Bob     |
      | Charlie |
    And the page should match or creates the missing snapshot with name "Game won by Lovers and Cupid"
