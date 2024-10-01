@game-lobby-group-organizer
@shard-6
Feature: 🤝️ Game Lobby Group Organizer

  Scenario: 🤝️ Game Lobby Group Organizer is displayed when user clicks on button in lobby
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                   |
      | Ulysse   | Werewolf               |
      | Valentin | Villager               |
      | William  | Prejudiced Manipulator |
      | Xavier   | Villager               |
    And the user clicks on the group organizer button in the lobby
    Then the heading with name "Place players in groups below to play with the Prejudiced Manipulator" should be visible
    And the heading with name "You can rename the groups by clicking on the name" should be visible
    And the page creates the missing snapshot with name "Game Lobby Group Organizer without valid groups"

    When the user sets the following players in the second group in group organizer
      | name     |
      | Valentin |
      | Xavier   |
    Then the page creates the missing snapshot with name "Game Lobby Group Organizer with valid groups"

  Scenario: 🤝️ Game Lobby Group Organizer displays different disclaimers until groups are valid
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                   |
      | Ulysse   | Werewolf               |
      | Valentin | Villager               |
      | William  | Prejudiced Manipulator |
    And the user clicks on the group organizer button in the lobby
    Then the heading with name "Not enough players to fill up the groups. Please add more players to the lobby" should be visible

    When the user clicks on the close button of the dialog's header
    And the user enters the player with name "Antoine" in the lobby
    And the user clicks on the group organizer button in the lobby
    Then the heading with name "Not enough players in the second group. Please add 2 more players from the first group" should be visible

    When the user sets the following players in the second group in group organizer
      | name     |
      | Antoine  |
      | Valentin |
      | William  |
      | Ulysse   |
    Then the heading with name "Not enough players in the first group. Please add 2 more players from the second group" should be visible

    When the user sets the following players in the first group in group organizer
      | name     |
      | Antoine  |
      | Valentin |
      | Ulysse   |
    Then the heading with name "Not enough players in the second group. Please add 1 more player from the first group" should be visible

    When the user sets the following players in the second group in group organizer
      | name     |
      | Antoine  |
      | Valentin |
    Then the heading with name "Not enough players in the first group. Please add 1 more player from the second group" should be visible

    When the user sets the following players in the first group in group organizer
      | name    |
      | Antoine |
    Then the heading with name "All groups are filled up and ready to play with Prejudiced Manipulator" should be visible

  Scenario: 🤝️ User can edit both group names in Game Lobby Group Organizer
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                   |
      | Ulysse   | Werewolf               |
      | Valentin | Villager               |
      | William  | Prejudiced Manipulator |
      | Xavier   | Villager               |
    And the user clicks on the group organizer button in the lobby
    Then the heading with name "Place players in groups below to play with the Prejudiced Manipulator" should be visible

    When the user edits the group name from "Group 1" to "Boys" in group organizer
    And the user edits the group name from "Group 2" to "Girls" in group organizer
    Then the button with exact name "Edit group name "Boys"" should be visible
    And the button with exact name "Edit group name "Girls"" should be visible

  Scenario: 🤝️ User can't edit a group name if name is empty in Game Lobby Group Organizer
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                   |
      | Ulysse   | Werewolf               |
      | Valentin | Villager               |
      | William  | Prejudiced Manipulator |
      | Xavier   | Villager               |
    And the user clicks on the group organizer button in the lobby
    Then the heading with name "Place players in groups below to play with the Prejudiced Manipulator" should be visible

    When the user clicks on the button with exact name "Edit group name "Group 1""
    And the user types "    " in the input with exact label "Group name"
    Then the button with name "Submit updated group name" should be disabled

  Scenario: 🤝️ User can't edit a group name if name is the same as the other one in Game Lobby Group Organizer
    Given the user is on game-lobby page

    When the user enters the players with name and role in the lobby
      | name     | role                   |
      | Ulysse   | Werewolf               |
      | Valentin | Villager               |
      | William  | Prejudiced Manipulator |
      | Xavier   | Villager               |
    And the user clicks on the group organizer button in the lobby
    Then the heading with name "Place players in groups below to play with the Prejudiced Manipulator" should be visible

    When the user clicks on the button with exact name "Edit group name "Group 1""
    And the user types "Group 2" in the input with exact label "Group name"
    Then the button with name "Submit updated group name" should be disabled
