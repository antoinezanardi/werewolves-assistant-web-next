@game-canceled

Feature: 🎲🚫 Game Canceled

  Scenario: 🎲🚫 User cancels a game when it is playing
    Given the user creates a game with 4 random role players
    And the user closes the toast
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    Then the heading with name "Game canceled" should be visible
    And the link with name "Create another game" should be visible
    And the link with name "Back to home" should be visible
    And the toast with text "Game canceled" should be visible
    And the page should match the snapshot with name "Game canceled"

  Scenario: 🎲🚫 Game Canceled page has valid head title and SEO tags
    Given the user creates a game with 4 random role players
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    Then the page should have head title "Game canceled" and meta tags
      | name             | content                                                                  |
      | application-name | Werewolves Assistant                                                     |
      | creator          | Antoine ZANARDI                                                          |
      | viewport         | width=device-width, initial-scale=1                                      |
      | charset          | utf-8                                                                    |
      | generator        | nuxt                                                                     |
      | color-scheme     | dark                                                                     |
      | robots           | noindex, nofollow                                                        |

  Scenario: 🎲🚫 User can't cancel a game when it is already canceled
    Given the user creates a game with 4 random role players
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    When the user clicks on parameters button in navigation bar
    Then the cancel game button in parameters in navigation bar should be disabled

  Scenario: 🎲🚫 User creates a new game after canceling a game
    Given the user creates a game with 4 random role players
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    And the user clicks on the link with name "Create another game"
    Then the user should be on game-lobby page

  Scenario: 🎲🚫 User goes back to home after canceling a game
    Given the user creates a game with 4 random role players
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    And the user clicks on the link with name "Back to home"
    Then the user should be on home page

  Scenario: 🎲🚫User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user creates a game with 4 random role players
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    And the user clicks on werewolves assistant logo in navigation bar
    Then the user should be on home page

  Scenario: 🎲🚫User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user creates a game with 4 random role players
    When the user clicks on parameters button in navigation bar
    And the user clicks on the cancel game button in parameters in navigation bar
    And the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    Then the user should be on home page