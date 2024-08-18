@actor-role
@shard-2
Feature: 🎭 Actor role

  Scenario: 🎭 Actor can incarnate the role he chooses from his additional cards or skip
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Actor    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName   |
      | Seer       |
      | Pied Piper |
      | Witch      |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Actor wakes up with his many personalities and can choose a card to play for this turn."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    And the user moves his mouse away
    Then the game's current play title should be "Actor chooses a card"
    And the game's current play question should be "Does the Actor want to choose a card and incarnate the role?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following additional cards for actor
      | roleName   |
      | Seer       |
      | Pied Piper |
      | Witch      |
    And the page should match or creates the missing snapshot with name "Actor chooses card Playground"

    When the actor chooses card with role of "Witch"
    Then the game's event should display the text "The Actor may have chosen a card to play for this turn."
    And the game's event player card should have the name "Antoine"
    And the player with name "Antoine" should have the role of "Witch" in the game
    And the player with name "Antoine" should be originally the actor in the game
    And the player with name "Antoine" should have the attribute acting by actor in the game

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master will take out the chosen card from the board."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    Then the game's event should display the text "The Witch wakes up and can use her life and/or death potions."
    And the game's event player card should have the name "Antoine"

    When the user skips all game events
    And the witch uses her potions on players
      | potion | target  |
      | life   | Charlie |
    And the user skips all game events
    Then the player with name "Charlie" should be alive in the game
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"
    And the game's current play should have the following additional cards for actor
      | roleName   |
      | Seer       |
      | Pied Piper |

    When the player or group skips his turn
    Then the player with name "Antoine" should have the role of "Actor" in the game
    And the game's event should display the text "The Actor may have chosen a card to play for this turn."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master will take out the chosen card from the board."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the player with name "Charlie" should be dead in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"

    When the actor chooses card with role of "Seer"
    Then the game's event should display the text "The Actor may have chosen a card to play for this turn."
    And the game's event player card should have the name "Antoine"

    When the user skips the game event
    Then the game's event should display the text "The Seer wakes up and will look at a player's role."
    And the game's event player card should have the name "Antoine"

    When the user skips all game events
    And the seer looks at the player with name "Bob"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "David"
    And the user skips all game events
    Then the player with name "David" should be dead in the game
    And the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"

    When the actor chooses card with role of "Pied Piper"
    Then the game's event should display the text "The Actor may have chosen a card to play for this turn."

    When the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    And the game's current play title should be "Pied Piper charms"
    And the game's current play should have the following targets
      | name |
      | Bob  |

  Scenario: 🎭 Actor becomes powerless when he is infected by the Accursed Wolf-Father
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role                 |
      | Antoine | Actor                |
      | Bob     | Werewolf             |
      | Charlie | Accursed Wolf-Father |
      | David   | Villager             |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName   |
      | Seer       |
      | Pied Piper |
      | Witch      |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"

    When the actor chooses card with role of "Seer"
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"
    And the player with name "Antoine" should have the attribute powerless by accursed wolf-father in the game

  Scenario: 🎭 Actor becomes powerless when he joins the werewolves side as Wolf-Hound
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Actor    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName   |
      | Seer       |
      | Wolf-Hound |
      | Witch      |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"

    When the actor chooses card with role of "Wolf-Hound"
    And the user skips all game events
    Then the game's current play title should be "Wolf-Hound chooses side"

    When the wolf-hound chooses the werewolves side
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"
    And the player with name "Antoine" should have the attribute powerless by actor in the game

  Scenario: 🎭 Actor has only one card for himself and so is out of cards after using it
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Actor    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName |
      | Hunter   |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"

    When the user closes the toast
    And the user skips all game events
    And the actor chooses card with role of "Hunter"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Charlie"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

  Scenario: 🎭 Actor stays powerful when he's infected by Accursed Wolf-Father when game master allows it
    Given the user disables the sheriff in game options
    And the user prevents actor to be powerless on werewolves side in game options
    And the user enters the players with name and role in the lobby
      | name    | role                 |
      | Antoine | Actor                |
      | Bob     | Werewolf             |
      | Charlie | Accursed Wolf-Father |
      | David   | Villager             |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName   |
      | Seer       |
      | Pied Piper |
      | Witch      |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"

    When the actor chooses card with role of "Seer"
    And the user skips all game events
    Then the game's current play title should be "Seer looks"

    When the seer looks at the player with name "Bob"
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"

    When the werewolves eat the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Accursed Wolf-Father infects"

    When the accursed wolf father infects the player with name "Antoine"
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the player or group skips his turn
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"
    And the player with name "Antoine" should not have the attribute powerless by accursed wolf-father in the game

  Scenario: 🎭 Actor stays powerful when he joins the werewolves side as Wolf-Hound when game master allows it
    Given the user disables the sheriff in game options
    And the user prevents actor to be powerless on werewolves side in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Actor    |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Villager |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName   |
      | Seer       |
      | Wolf-Hound |
      | Witch      |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Actor chooses a card"

    When the actor chooses card with role of "Wolf-Hound"
    And the user skips all game events
    Then the game's current play title should be "Wolf-Hound chooses side"

    When the wolf-hound chooses the werewolves side
    And the user skips all game events
    Then the game's current play title should be "Werewolves eat"
    And the player with name "Antoine" should not have the attribute powerless by actor in the game
