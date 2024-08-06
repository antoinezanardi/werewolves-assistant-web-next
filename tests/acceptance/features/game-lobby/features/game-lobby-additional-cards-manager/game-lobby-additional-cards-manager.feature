@game-lobby-additional-cards-manager
@shard-2

Feature: 🃏🃏🃏 Game Lobby Additional Cards Manager

  Scenario: 🃏🃏🃏 Additional Cards Manager is displayed when user clicks on button in lobby

    Given the user is on game-lobby page
    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Actor    |
      | William  | Thief    |
      | Xavier   | Villager |
    And the user clicks on the additional cards manager button in the lobby
    Then the heading with name "Please set additional cards for the Thief" should be visible
    And the heading with name "Please set additional cards for the Actor" should be visible
    And the page should match or creates the missing snapshot with name "Game Lobby Additional Cards Manager without cards"

    When the user sets the following additional cards for "thief" in additional cards manager
      | role       |
      | Seer       |
      | Wolf-Hound |
    Then the heading with name "The Thief will play with 2 cards in this game" should be visible

    When the user sets the following additional cards for "actor" in additional cards manager
      | role     |
      | Witch    |
      | Idiot    |
      | Defender |
    Then the heading with name "The Actor will play with 3 cards in this game" should be visible

    When the user presses the escape key
    And the user clicks on the additional cards manager button in the lobby
    Then the page should match or creates the missing snapshot with name "Game Lobby Additional Cards Manager with 5 cards"

  Scenario: 🃏🃏🃏 Additional Cards Manager's sections are displayed based on present recipients
    Given the user is on game-lobby page
    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Villager |
      | William  | Thief    |
      | Xavier   | Villager |
    And the user clicks on the additional cards manager button in the lobby
    Then the heading with name "Please set additional cards for the Thief" should be visible
    And the heading with name "Please set additional cards for the Actor" should be hidden

    When the user presses the escape key
    And the user sets role "Actor" for the player with name "William" in the lobby
    And the user clicks on the additional cards manager button in the lobby
    Then the heading with name "Please set additional cards for the Thief" should be hidden
    And the heading with name "Please set additional cards for the Actor" should be visible

  Scenario: 🃏🃏🃏 User closes the Additional Cards Manager with escape, close button or outside click
    Given the user is on game-lobby page
    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Actor    |
      | William  | Thief    |
      | Xavier   | Villager |
    And the user clicks on the additional cards manager button in the lobby
    Then the heading with name "Please set additional cards for the Thief" should be visible

    When the user presses the escape key
    Then the heading with exact name "Please set additional cards for the Thief" should be hidden

    When the user clicks on the additional cards manager button in the lobby
    And the user clicks on the close button of the dialog's header
    Then the heading with exact name "Please set additional cards for the Thief" should be hidden

    When the user clicks on the additional cards manager button in the lobby
    And the user clicks on the top left corner of the screen
    Then the heading with exact name "Please set additional cards for the Thief" should be hidden
