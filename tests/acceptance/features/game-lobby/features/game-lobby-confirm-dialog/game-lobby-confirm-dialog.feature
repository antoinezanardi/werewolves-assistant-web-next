@game-lobby-confirm-dialog
@shard-7
Feature: 🃏✅Game Lobby Confirm Dialog

  Scenario: 🃏✅ User is asked if everybody is ready before starting the game and can cancel if not
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Villager |
      | William  | Villager |
      | Xavier   | Villager |
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "Do all the players have their role and are ready to play?" should be visible
    And the button with name "Cancel" should be visible
    And the button with name "Let's go!" should be visible

    When the user clicks on the button with name "Cancel"
    Then the button with name "Start game" should be enabled

  Scenario: 🃏✅ User is asked if everybody is positioned correctly if there are role position dependant before starting the game and is redirected if not
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role               |
      | Ulysse   | Werewolf           |
      | Valentin | Rusty Sword Knight |
      | William  | Villager           |
      | Xavier   | Villager           |
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "Some roles rely on players position. Are players placed correctly in the game lobby?" should be visible
    And the button with name "Show me how to position players" should be visible
    And the button with name "Yes" should be visible
    And the button with name "Cancel" should be visible
    And the button with name "Skip and play now" should be visible

    When the user clicks on the button with name "Show me how to position players"
    Then the heading with name "Players positions" should be visible

  Scenario: 🃏✅ User is asked if thief additional cards are placed down before starting the game and is redirected if not
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Thief    |
      | William  | Villager |
      | Xavier   | Villager |
    And the user sets the following additional cards for "thief" in the lobby
      | roleName |
      | Seer     |
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "Is the additional card for the Thief placed face down on the center of the table?" should be visible
    And the button with name "Change the additional cards for the Thief" should be visible
    And the button with name "Yes" should be visible
    And the button with name "Cancel" should be visible
    And the button with name "Skip and play now" should be visible

    When the user clicks on the button with name "Change the additional cards for the Thief"
    Then the heading with name "Additional cards" should be visible

  Scenario: 🃏✅ User is asked if actor additional cards are placed up before starting the game and is redirected if not
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Actor    |
      | William  | Villager |
      | Xavier   | Villager |
    And the user sets the following additional cards for "actor" in the lobby
      | roleName |
      | Seer     |
      | Hunter   |
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "Are the additional cards for the Actor placed face up on the center of the table?" should be visible
    And the button with name "Change the additional cards for the Actor" should be visible
    And the button with name "Yes" should be visible
    And the button with name "Cancel" should be visible
    And the button with name "Skip and play now" should be visible

    When the user clicks on the button with name "Change the additional cards for the Actor"
    Then the heading with name "Additional cards" should be visible

  Scenario: 🃏✅ User is asked if he confirms the changed game options before starting the game and is redirected if not
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Villager |
      | William  | Villager |
      | Xavier   | Villager |
    And the user disables the sheriff in game options
    And the user doesn't allow the seer to see roles in game options
    And the user doesn't allow the elder to take his revenge in game options
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "3 game options have been changed based on the official rules" should be visible
    And the exact text "The game will not have a Sheriff." should be visible
    And the exact text "When the Seer looks at a player, the Game Master doesn't reveal the role of the player to her but his side (Villager or Werewolf)." should be visible
    And the exact text "If the Elder is eliminated by a player from the Villagers side, nothing happens." should be visible
    And the button with name "Open game options hub" should be visible
    And the button with name "Confirm" should be visible
    And the button with name "Cancel" should be visible
    And the button with name "Skip and play now" should be visible

    When the user clicks on the button with name "Open game options hub"
    Then the heading with name "Game options" should be visible

  Scenario: 🃏✅ User can restore official rules individually by clicking on reset button for a changed game option
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role     |
      | Ulysse   | Werewolf |
      | Valentin | Villager |
      | William  | Villager |
      | Xavier   | Villager |
    And the user disables the sheriff in game options
    And the user doesn't allow the seer to see roles in game options
    And the user doesn't allow the elder to take his revenge in game options
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "3 game options have been changed based on the official rules" should be visible
    And the exact text "The game will not have a Sheriff." should be visible
    And the exact text "When the Seer looks at a player, the Game Master doesn't reveal the role of the player to her but his side (Villager or Werewolf)." should be visible
    And the exact text "If the Elder is eliminated by a player from the Villagers side, nothing happens." should be visible

    When the user clicks on the button with name "Reset to official rule the option : The game will not have a Sheriff."
    Then the exact text "The game will have a Sheriff." should be hidden
    And the heading with name "2 game options have been changed based on the official rules" should be visible

    When the user clicks on the button with name "Reset to official rule the option : When the Seer looks at a player, the Game Master doesn't reveal the role of the player to her but his side (Villager or Werewolf)."
    Then the exact text "When the Seer looks at a player, the Game Master doesn't reveal the role of the player to her but his side (Villager or Werewolf)." should be hidden
    And the heading with name "One game option has been changed based on the official rules" should be visible

    When the user clicks on the button with name "Reset to official rule the option : If the Elder is eliminated by a player from the Villagers side, nothing happens."
    Then the exact text "If the Elder is eliminated by a player from the Villagers side, nothing happens." should be hidden
    And the heading with name "Do all the players have their role and are ready to play?" should be visible

  Scenario: 🃏✅ User can skip all game verification before starting the game
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role               |
      | Ulysse   | Werewolf           |
      | Valentin | Rusty Sword Knight |
      | William  | Villager           |
      | Xavier   | Villager           |
    And the user clicks on the button with name "Start game"
    Then the heading with name "Before starting the game" should be visible
    And the heading with name "Some roles rely on players position. Are players placed correctly in the game lobby?" should be visible
    And the button with name "Skip and play now" should be visible

    When the user clicks on the button with name "Skip and play now"
    Then the user should be on game page with any id
    And the toast with text "Game created" should be visible
