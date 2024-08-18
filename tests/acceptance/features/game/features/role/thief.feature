@thief-role
@shard-3
Feature: 👺 Thief role

  Scenario: 👺 Thief can incarnate the role he chooses from his additional cards
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Thief    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName             |
      | Seer                 |
      | Accursed Wolf-Father |
      | Witch                |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Thief wakes up and can choose an additional card among the 3 for him. If he decides so, he will take the role of it for the rest of the game."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will flip the 3 cards for the Thief to see them."

    When the user goes to the next game event text
    Then the game's event should display the text "If all the cards designated to the Thief are from the Werewolves side, he must choose one of them and can't skip his turn."

    When the user skips the game event
    And the user moves his mouse away
    Then the game's current play title should be "Thief chooses a card"
    And the game's current play question should be "Does the Thief want to choose a card and take the role?"
    And the game's phase name should be "Night 1"
    And the game's current play should have the following additional cards for thief
      | roleName             |
      | Seer                 |
      | Accursed Wolf-Father |
      | Witch                |
    And the page should match or creates the missing snapshot with name "Thief chooses card Playground"

    When the thief chooses card with role of "Accursed Wolf-Father"
    Then the game's event should display the text "The Thief may have chosen a card to incarnate for the rest of the game."
    And the game's event player card should have the name "Antoine"
    And the player with name "Antoine" should have the role of "Accursed Wolf-Father" in the game
    And the player with name "Antoine" should be originally the thief in the game
    And the player with name "Antoine" should be in the werewolves side in the game

    When the user goes to the next game event text
    Then the game's event should display the text "If so, the Game Master will switch the chosen card with the Thief card and take away the remaining cards."

    When the user skips the game event
    Then the game's event player card should have the name "Antoine"

  Scenario: 👺 Thief can remain as himself if he skips
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Thief    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName             |
      | Seer                 |
      | Accursed Wolf-Father |
      | Witch                |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips all game events
    And the player or group skips his turn
    Then the game's event should display the text "The Thief may have chosen a card to incarnate for the rest of the game."
    And the game's event player card should have the name "Antoine"
    And the player with name "Antoine" should have the role of "Thief" in the game
    And the player with name "Antoine" should be in the villagers side in the game

  Scenario: 👺 Thief chosen card is revealed to everyone if game master sets it in game options
    Given the user disables the sheriff in game options
    And the user sets thief chosen card revealed to everyone in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Thief    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName             |
      | Seer                 |
      | Accursed Wolf-Father |
      | Witch                |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips all game events
    And the thief chooses card with role of "Witch"
    Then the game's event should display the text "In this special game, the chosen card of the Thief is revealed to the other players."

    When the user goes to the next game event text
    Then the game's event should display the text "The Thief has chosen to be the Witch for the rest of the game!"
    And the game's event player card should have the name "Antoine"
    And the player with name "Antoine" should have the role of "Witch" in the game
    And the player with name "Antoine" should be originally the thief in the game
    And the player with name "Antoine" should be in the villagers side in the game

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master can take away the remaining cards."
    And the game's event player card should have the name "Antoine"

  Scenario: 👺 Thief skipped card is revealed to everyone if game master sets it in game options
    Given the user disables the sheriff in game options
    And the user sets thief chosen card revealed to everyone in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Thief    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName             |
      | Seer                 |
      | Accursed Wolf-Father |
      | Witch                |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips all game events
    And the player or group skips his turn
    Then the game's event should display the text "In this special game, the chosen card of the Thief is revealed to the other players."

    When the user goes to the next game event text
    Then the game's event should display the text "The Thief didn't choose a card with a role to incarnate. He will remain the Thief for the rest of the game."
    And the game's event player card should have the name "Antoine"
    And the player with name "Antoine" should have the role of "Thief" in the game
    And the player with name "Antoine" should be in the villagers side in the game

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master can take away the remaining cards."
    And the game's event player card should have the name "Antoine"

  Scenario: 👺 Thief must choose a card if all cards are werewolves sided
    Given the user disables the sheriff in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Thief    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName       |
      | White Werewolf |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Thief wakes up and can choose the additional card for him. If he decides so, he will take the role of it for the rest of the game."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will flip the card for the Thief to see it."

    When the user goes to the next game event text
    Then the game's event should display the text "If the card designated to the Thief is from the Werewolves side, he must pick it and can't skip his turn."

    When the user skips the game event
    And the user moves his mouse away
    Then the game's current play title should be "Thief chooses a card"
    And the game's current play can't be made for now

  Scenario: 👺 Thief is allowed to skip between all werewolves cards if game master allows it in game options
    Given the user disables the sheriff in game options
    And the user doesn't force thief to choose between all werewolves cards in game options
    And the user enters the players with name and role in the lobby
      | name    | role     |
      | Antoine | Thief    |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName             |
      | White Werewolf       |
      | Accursed Wolf-Father |
    And the user clicks on the button with name "Start game"
    And the user clicks on the button with name "Skip and play now"
    And the user closes the toast

    When the user skips the game event
    And the user skips the game event
    Then the game's event should display the text "The Thief wakes up and can choose an additional card among the 2 for him. If he decides so, he will take the role of it for the rest of the game."
    And the game's event player card should have the name "Antoine"

    When the user goes to the next game event text
    Then the game's event should display the text "The Game Master will flip the 2 cards for the Thief to see them."

    When the user goes to the next game event text
    Then the game's event should display the text "In this special game, the Thief is not forced to choose a card if all the cards designated to him are from the Werewolves side."

    When the user skips the game event
    And the user moves his mouse away
    Then the game's current play title should be "Thief chooses a card"

    When the player or group skips his turn
    Then the game's event should display the text "The Thief may have chosen a card to incarnate for the rest of the game."
