@home-page

Feature: 🏠 Home Page

  Scenario: 🏠 Home Page is displayed with logo, title and many links
    Given the user is on home page
    Then the img with name "Werewolves Assistant logo" should be visible
    And the heading with name "Werewolves Assistant" should be visible
    And the link with name "Play" should be visible
    And the link with name "What is it ?" should be visible
    And the link with name "Contact me" should be visible
    And the link with name "Contact me" should have the following attributes
      | name | value                              |
      | href | mailto: antoine.zanardi@epitech.eu |
    And the link with name "This project is open-source!" should be visible
    And the page should match the snapshot with name "Home Page"

  Scenario: 🏠 Home Page doesn't have navigation bar
    Given the user is on home page
    Then the navigation with name "Navigation bar" should be hidden

  Scenario: 🏠 User goes on the game lobby page
    Given the user is on home page
    When the user clicks on the link with name "Play"
    Then the user should be on game-lobby page

  Scenario: 🏠 User goes on the about page
    Given the user is on home page
    When the user clicks on the link with name "What is it ?"
    Then the user should be on about page

  Scenario: 🏠 User goes on the GitHub repository page through the link
    Given the user is on home page
    And the user is about to open a page on new tab
    When the user clicks on the link with name "This project is open-source!"
    Then a new page should be opened with url "https://github.com/antoinezanardi/werewolves-assistant-web-next"