@game-lobby-page
@shard-4
Feature: 🃏 Game Lobby Page

  Scenario: 🃏 Game Lobby page is displayed with title, inputs and buttons
    Given the user is on game-lobby page
    Then the heading with name "Game Lobby" should be visible
    And the input with label "Player name" should be visible
    And the button with name "Add" should be visible
    And the heading with name "Add player names with the input above" should be visible
    And the button with name "Random composition" should be visible
    And the button with name "Start game" should be visible
    And the page should match or creates the missing snapshot with name "Game Lobby Page without players"

  Scenario: 🃏 Game Lobby page has valid head title and SEO tags
    Given the user is on game-lobby page
    Then the page should have head title "Start a game" and meta tags
      | name             | content                                                    |
      | description      | Create a new game right now with the Werewolves Assistant. |
      | application-name | Werewolves Assistant                                       |
      | creator          | Antoine ZANARDI                                            |
      | viewport         | width=device-width, initial-scale=1                        |
      | charset          | utf-8                                                      |
      | generator        | nuxt                                                       |
      | color-scheme     | dark                                                       |

  Scenario: 🃏 User adds a player
    Given the user is on game-lobby page
    Then the input with label "Player name" should be empty
    And the input with label "Please enter a player name" should be visible

    When the user enters the player with name "Antoine" in the lobby
    Then the input with label "Player name" should be empty
    And the heading with name "Add player names with the input above" should be hidden
    And the player with name "Antoine" should be in the lobby
    And the player with name "Antoine" should not have a role in the lobby

  Scenario: 🃏 User can't add twice the same player
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    Then the input with label "Player name" should be empty

    When the user types "Antoine" in the input with label "Player name"
    Then the button with name "Add" should be disabled
    And the input with label "This player name is already taken" should be enabled

  Scenario: 🃏 User can't add a player with an empty name but input is emptied
    Given the user is on game-lobby page

    When the user types "          " in the input with label "Player name"
    And the user clicks on the button with name "Add"
    Then the input with label "Player name" should be empty
    And the heading with name "Add player names with the input above" should be visible

  Scenario: 🃏 User can't add a player with a name longer than 30 characters
    Given the user is on game-lobby page

    When the user types "AntoineAntoineAntoineAntoineAn" in the input with label "Player name"
    Then the input with label "The player name must not exceed 30 characters" should be enabled

  Scenario: 🃏 User can't add a player if game has reached 40 players
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name      | role                 |
      | Ulysse    | Villager             |
      | Valentin  | Villager             |
      | William   | Villager             |
      | Xavier    | Villager             |
      | Yann      | Villager             |
      | Zacharie  | Villager             |
      | Aurelien  | Villager             |
      | Bastien   | Villager             |
      | Cedric    | Villager             |
      | Dorian    | Villager             |
      | Emmanuel  | Villager             |
      | Florian   | Villager             |
      | Guillaume | Villager             |
      | Herve     | Villager             |
      | Ibrahim   | Villager             |
      | Jerome    | Villager             |
      | Kamel     | Villager             |
      | Lionel    | Villager             |
      | Mathieu   | Actor                |
      | Nabil     | Thief                |
      | Benoit    | Hunter               |
      | David     | Little Girl          |
      | Eliott    | Defender             |
      | Quentin   | Villager             |
      | Sylvain   | Villager-Villager    |
      | Gael      | Accursed Wolf-Father |
      | Isaac     | Witch                |
      | Julien    | Elder                |
      | Kevin     | White Werewolf       |
      | Louis     | Fox                  |
      | Maxime    | Bear Tamer           |
      | Hugo      | Cupid                |
      | Nathan    | Wild Child           |
      | Olivier   | Angel                |
      | Paul      | Scandalmonger        |
      | Fabien    | Pied Piper           |
      | Clement   | Werewolf             |
      | Romain    | Idiot                |
      | Theo      | Big Bad Wolf         |
      | Antoine   | Seer                 |
    Then the input with label "Maximum number of players reached" should be disabled
    And the button with name "+ Add" should be disabled
    And the page should match or creates the missing snapshot with name "Game Lobby Page with 40 players"

  Scenario: 🃏 User deletes a player
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    Then the player with name "Antoine" should be in the lobby

    When the user clicks on the button with name "Remove player Antoine"
    Then the heading with name "Add player names with the input above" should be visible
    And the player with name "Antoine" should not be in the lobby

  Scenario: 🃏 User generates a random composition for 4 players
    Given the user is on game-lobby page

    When the user enters the player with name "Antoine" in the lobby
    And the user enters the player with name "Benoit" in the lobby
    And the user enters the player with name "Clement" in the lobby
    And the user enters the player with name "David" in the lobby
    And the user clicks on the button with name "Random composition"
    Then the player with name "Antoine" should have a role in the lobby
    And the player with name "Benoit" should have a role in the lobby
    And the player with name "Clement" should have a role in the lobby
    And the player with name "David" should have a role in the lobby

  Scenario: 🃏 User can't generate random composition if there is less than 4 players
    Given the user is on game-lobby page
    Then the button with name "Random composition" should be disabled

    When the user hovers the button with name "Random composition"
    Then the tooltip with text "The minimum number of players is not reached" should be visible

    When the user enters the player with name "Antoine" in the lobby
    And the user enters the player with name "Benoit" in the lobby
    And the user enters the player with name "Clement" in the lobby
    And the user enters the player with name "David" in the lobby
    Then the button with name "Random composition" should be enabled

    When the user hovers the button with name "Random composition"
    Then the tooltip with text "The minimum number of players is not reached" should be hidden

  Scenario: 🃏 User can't start the game if there is less than 4 players
    Given the user is on game-lobby page
    Then the button with name "Start game" should be disabled

    When the user hovers the button with name "Start game"
    Then the tooltip with text "The minimum number of players is not reached" should be visible

  Scenario: 🃏 User can't start the game if there some players doesn't have a role
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                 |
      | Ulysse   | Villager             |
      | Valentin | Accursed Wolf-Father |
      | William  | White Werewolf       |
    And the user enters the player with name "Xavier" in the lobby
    Then the button with name "Start game" should be disabled

    When the user hovers the button with name "Start game"
    Then the tooltip with text "Not all roles are set among players" should be visible

  Scenario: 🃏 User can't start the game if there is no villagers sided among players
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                 |
      | Ulysse   | Werewolf             |
      | Valentin | Accursed Wolf-Father |
      | William  | White Werewolf       |
      | Xavier   | Big Bad Wolf         |
    Then the button with name "Start game" should be disabled

    When the user hovers the button with name "Start game"
    Then the tooltip with text "At least one villager sided role is needed" should be visible

  Scenario: 🃏 User can't start the game if there is no werewolves sided among players
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role  |
      | Ulysse   | Angel |
      | Valentin | Seer  |
      | William  | Witch |
      | Xavier   | Fox   |
    Then the button with name "Start game" should be disabled

    When the user hovers the button with name "Start game"
    Then the tooltip with text "At least one werewolf sided role is needed" should be visible

  Scenario: 🃏 User can't start the game if there is only one sister among players
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role        |
      | Ulysse   | Two Sisters |
      | Valentin | Werewolf    |
      | William  | Witch       |
      | Xavier   | Fox         |
    Then the button with name "Start game" should be disabled

    When the user hovers the button with name "Start game"
    Then the tooltip with text "The Two Sisters role requires at least 2 players with this role" should be visible

  Scenario: 🃏 User can't start the game if there is only two brothers among players
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role           |
      | Ulysse   | Three Brothers |
      | Antoine  | Three Brothers |
      | Valentin | Werewolf       |
      | William  | Witch          |
      | Xavier   | Fox            |
    Then the button with name "Start game" should be disabled

    When the user hovers the button with name "Start game"
    Then the tooltip with text "The Three Brothers role requires at least 3 players with this role" should be visible

#  TODO: To reactivate when option to choose random roles is available
#  Scenario: 🃏 User starts a game with random composition
#    Given the user is on game-lobby page
#
#    When the user enters the player with name "Antoine" in the lobby
#    And the user enters the player with name "Benoit" in the lobby
#    And the user enters the player with name "Clement" in the lobby
#    And the user enters the player with name "David" in the lobby
#    And the user generates a random composition and starts the game in the lobby
#    Then the user should be on game page with any id
#    And the toast with text "Game created" should be visible

  Scenario: 🃏 User is asked if everybody is ready before starting the game and can cancel if not
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

  Scenario: 🃏 User is asked if everybody is positioned correctly if there are role position dependant before starting the game and is redirected if not
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

  Scenario: 🃏 User can skip all game verification before starting the game
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

  Scenario: 🃏 User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user is on game-lobby page

    When the user clicks on werewolves assistant logo in navigation bar
    Then the user should be on home page

  Scenario: 🃏 User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user is on game-lobby page

    When the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    Then the user should be on home page

  Scenario: 🃏 Player positions coordinator button is only visible when there are at least 2 players
    Given the user is on game-lobby page
    Then the players positions coordinator button should be hidden in the lobby

    When the user enters the player with name "Antoine" in the lobby
    Then the players positions coordinator button should be hidden in the lobby

    When the user enters the player with name "Benoit" in the lobby
    Then the players positions coordinator button should be visible in the lobby

    When the user enters the player with name "Alice" in the lobby
    Then the players positions coordinator button should be visible in the lobby

  Scenario: 🃏 Game additional cards manager button is only visible when there is at least a Thief or an Actor
    Given the user is on game-lobby page
    When the user enters the players with name and role in the lobby
      | name     | role               |
      | Ulysse   | Werewolf           |
      | Valentin | Rusty Sword Knight |
      | William  | Villager           |
      | Xavier   | Villager           |
    Then the game additional cards manager button should be hidden in the lobby

    When the user sets role "Thief" for the player with name "Ulysse" in the lobby
    Then the game additional cards manager button should be visible in the lobby

    When the user sets role "Actor" for the player with name "Ulysse" in the lobby
    Then the game additional cards manager button should be visible in the lobby

    When the user sets role "Werewolf" for the player with name "Ulysse" in the lobby
    Then the game additional cards manager button should be hidden in the lobby
