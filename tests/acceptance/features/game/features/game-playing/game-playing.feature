@game-playing
@shard-2
Feature: 🎲 Game Playing

  Scenario: 🎲 User is asked to confirm if he wants to leave the game if it is playing
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user closes the toast
    And the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    Then the text "The game is still playing" under the alertdialog with name "The game is still playing" should be visible
    And the text "Are you sure you want to" under the alertdialog with name "The game is still playing" should be visible

    When the user clicks on the button with name "Stay in the game"
    Then the user should be on game page with any id

    When the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    And the user clicks on the button with name "Yes, I want to leave"
    Then the user should be on home page
