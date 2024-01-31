@tag-about-page

Feature: ❓ About Page

  Scenario: ❓ About Page is displayed with title and various sections
    Given the user is on about page
    Then the heading with name "Why an assistant ?" should be visible
    And the heading with name "The Werewolves of Thiercelieux™ game" should be visible
    And the heading with name "The Werewolves Assistant takes the stage !" should be visible
    And the heading with name "Available roles" should be visible
    And the heading with name "How to contribute to this project?" should be visible
    And the heading with name "A word from the creator" should be visible

  Scenario: ❓ About Page has navigation bar
    Given the user is on about page
    Then the navigation with name "Navigation bar" should be visible

  Scenario: ❓ About Page loads roles and display them in accordions with descriptions and illustrations
    Given the user is on about page
    When the progressbar with name "Loading roles…" is hidden
    Then the button with name "Click to expand the description of the Werewolf role" should be visible
    And the button with name "Click to expand the description of the Three Brothers role" should be visible
    And the button with name "Click to expand the description of the Witch role" should be visible
    And the button with name "Click to expand the description of the Actor role" should be visible
    And the img with name "Illustration of the Werewolf role on the left description" should be hidden
    And the text "Each night, they devour a Villager. During the day, they try to conceal their nocturnal identity to escape public vengeance." under the region with name "Click to expand the description of the Werewolf role" should be hidden

    When the user clicks on the button with name "Click to expand the description of the Werewolf role"
    Then the text "Each night, they devour a Villager. During the day, they try to conceal their nocturnal identity to escape public vengeance." under the region with name "Click to expand the description of the Werewolf role" should be visible
    And the text "Base Game" under the region with name "Click to expand the description of the Werewolf role" should be visible
    And the img with name "Illustration of the Werewolf role on the left description" should be visible

    When the user clicks on the button with name "Click to expand the description of the Pied Piper role"
    Then the text "Each night, they devour a Villager. During the day, they try to conceal their nocturnal identity to escape public vengeance." under the region with name "Click to expand the description of the Werewolf role" should be hidden
    And the img with name "Illustration of the Werewolf role on the left description" should be hidden
    And the text "Base Game" under the region with name "Click to expand the description of the Werewolf role" should be hidden
    And the text "Ignominiously chased from the village, he returned years later under the guise of a false identity to exact his terrible revenge." under the region with name "Click to expand the description of the Pied Piper role" should be visible
    And the img with name "Illustration of the Pied Piper role on the left description" should be visible
    And the text "Lonely" under the region with name "Click to expand the description of the Pied Piper role" should be visible
    And the text "New Moon Expansion" under the region with name "Click to expand the description of the Pied Piper role" should be visible

    When the user clicks on the button with name "Click to expand the description of the Pied Piper role"
    Then the img with name "Illustration of the Pied Piper role on the left description" should be hidden

  Scenario: ❓ User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user is on about page
    When the user clicks on the child link with name "Home page link" under the navigation with name "Navigation bar"
    Then the user should be on home page

  Scenario: ❓ User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user is on about page
    When the user clicks on the button with name "Parameters"
    And the user clicks on the element with text "Back to home" under the menu with name "Parameters menu"
#    Then the user should be on home page