@game-feedback
@shard-4
Feature: 🌟 Game Feedback

  Scenario: 🌟 User can send a feedback to the canceled game
    Given the user creates a game with 4 simple role players
    And the user closes the toast
    And the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    Then the button with name "Give feedback on this game" should be visible

    When the user clicks on the button with name "Give feedback on this game"
    Then the heading with name "Game feedback" should be visible
    And the exact text "What is your rating for this game?" should be visible
    And the exact text "Please choose a rating" should be visible
    And the exact text "Was everything all right during the game?" should be visible
    And the exact text "Mind sharing a quick review?" should be visible
    And the button with name "Submit feedback" should be disabled

    When the user moves his mouse away
    Then the page should match or creates the missing snapshot with name "Game feedback"

    When the user sets rating's score to 2 in game feedback submitter
    And the user sets that the game has encountered an error in game feedback submitter
    And the user sets the review to "I had a problem with the game!" in game feedback submitter
    And the user clicks on the button with name "Submit feedback"
    Then the toast with text "Thanks for your help to improve the Werewolves Assistant" should be visible
    And the heading with name "Game feedback" should be hidden
    And the button with name "Give feedback on this game" should be hidden

  Scenario: 🌟 User can send a feedback to the over game
    Given the user disables the sheriff in game options
    And the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Villager |
      | Bob     | Werewolf |
      | Charlie | Villager |
      | David   | Angel    |

    When the user closes the toast
    And the user skips all game events
    Then the game's current play title should be "Survivors vote"

    When the survivors vote with the votes
      | source  | target |
      | Antoine | David  |
    And the user skips all game events
    Then the game should be over with title "The Angel wins by himself!" and subtitle "The Angel has been eliminated during the first vote or the first night by the werewolves. He wins alone and comes back to the Good Place."
    And the button with name "Give feedback on this game" should be visible

    When the user clicks on the button with name "Give feedback on this game"
    And the user sets rating's score to 5 in game feedback submitter
    And the user sets that the game has encountered an error in game feedback submitter
    And the user clicks on the button with name "Submit feedback"
    Then the toast with text "Thanks for your help to improve the Werewolves Assistant" should be visible
    And the heading with name "Game feedback" should be hidden
    And the button with name "Give feedback on this game" should be hidden

  Scenario: 🌟 Game feedback can't be submitted without rating
    Given the user creates a game with 4 simple role players
    And the user closes the toast
    And the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    Then the button with name "Give feedback on this game" should be visible

    When the user clicks on the button with name "Give feedback on this game"

    When the user sets rating's score to 1 in game feedback submitter
    Then the exact text "Terrible" should be visible
    And the exact text "Please choose a rating" should be hidden
    And the button with name "Submit feedback" should be enabled

    When the user sets rating's score to 2 in game feedback submitter
    Then the exact text "Bad" should be visible
    And the exact text "Please choose a rating" should be hidden
    And the button with name "Submit feedback" should be enabled

    When the user sets rating's score to 3 in game feedback submitter
    Then the exact text "Average" should be visible
    And the exact text "Please choose a rating" should be hidden
    And the button with name "Submit feedback" should be enabled

    When the user sets rating's score to 4 in game feedback submitter
    Then the exact text "Good" should be visible
    And the exact text "Please choose a rating" should be hidden
    And the button with name "Submit feedback" should be enabled

    When the user sets rating's score to 5 in game feedback submitter
    Then the exact text "Excellent" should be visible
    And the exact text "Please choose a rating" should be hidden
    And the button with name "Submit feedback" should be enabled

    When the user sets rating's score to 5 in game feedback submitter
    Then the exact text "Excellent" should be hidden
    And the exact text "Please choose a rating" should be visible
    And the button with name "Submit feedback" should be disabled

  Scenario: 🌟 User closes the game feedback submitter with escape, close button or outside click
    Given the user creates a game with 4 simple role players
    And the user closes the toast
    And the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    And the user clicks on the button with name "Give feedback on this game"
    Then the heading with exact name "Game feedback" should be visible

    When the user presses the escape key
    Then the heading with name "Game feedback" should be hidden

    When the user clicks on the button with name "Give feedback on this game"
    And the user clicks on the close button of the dialog's header
    Then the heading with name "Game feedback" should be hidden

    When the user clicks on the button with name "Give feedback on this game"
    And the user clicks on the top left corner of the screen
    Then the heading with name "Game feedback" should be hidden
