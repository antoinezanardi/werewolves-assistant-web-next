@tag-home-page

Feature: 🏠 Home Page

  Scenario: 🏠 Home Page is displayed with logo, title and many links
    Given the user goes on the home page
    Then the img with name "Werewolves Assistant logo" should be visible
    And the heading with name "Werewolves Assistant" should be visible
    And the button with name "Play" should be visible
    And the link with name "What is it ?" should be visible
    And the link with name "Contact me" should be visible
    And the link with name "Contact me" should have the following attributes
      | name | value                              |
      | href | mailto: antoine.zanardi@epitech.eu |
    And the link with name "This project is open-source!" should be visible

  Scenario: 🏠 User goes on the about page
    Given the user goes on the home page
    When the user clicks on the link with name "What is it ?"
    Then the user should be on about page