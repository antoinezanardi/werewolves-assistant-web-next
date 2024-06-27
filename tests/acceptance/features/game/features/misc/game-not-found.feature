@game-not-found
Feature: 🎲❓Game Not Found

  Scenario: 🎲❓Game not found page is displayed when game is not found
    Given the user goes on an unknown game
    Then the heading with name "Game not found… Did you get lost ?" should be visible
    And the link with name "Create another game" should be visible
    And the link with name "Back to home" should be visible
    And the toast with text "Bad request" should be visible
    And the page should match or creates the missing snapshot with name "Game not found"

  Scenario: 🎲❓Game not found page has valid head title and SEO tags
    Given the user goes on an unknown game
    Then the page should have head title "Game not found… Did you get lost ?" and meta tags
      | name             | content                             |
      | application-name | Werewolves Assistant                |
      | creator          | Antoine ZANARDI                     |
      | viewport         | width=device-width, initial-scale=1 |
      | charset          | utf-8                               |
      | generator        | nuxt                                |
      | color-scheme     | dark                                |
      | robots           | noindex, nofollow                   |

  Scenario: 🎲❓User creates a new game from the game not found page
    Given the user goes on an unknown game

    When the user clicks on the link with name "Create another game"
    Then the user should be on game-lobby page

  Scenario: 🎲❓User goes to home from the game not found page
    Given the user goes on an unknown game

    When the user clicks on the link with name "Back to home"
    Then the user should be on home page

  Scenario: 🎲❓User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user goes on an unknown game

    When the user clicks on werewolves assistant logo in navigation bar
    Then the user should be on home page

  Scenario: 🎲❓User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user goes on an unknown game

    When the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    Then the user should be on home page