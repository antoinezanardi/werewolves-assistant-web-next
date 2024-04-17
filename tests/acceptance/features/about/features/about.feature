@about-page

Feature: ❓ About Page

  Scenario: ❓ About Page is displayed with title and various sections
    Given the user is on about page
    Then the heading with name "Why an assistant ?" should be visible
    And the heading with name "The Werewolves of Miller's Hollow™ game" should be visible
    And the heading with name "The Werewolves Assistant takes the stage !" should be visible
    And the heading with name "Available roles" should be visible
    And the heading with name "How to contribute to this project?" should be visible
    And the heading with name "A word from the creator" should be visible
    And the link with name "Back to home" should be visible
    And the page should match the snapshot with name "About Page"

  Scenario: ❓ About Page has valid head title and SEO tags
    Given the user is on about page
    Then the page should have head title "Why an assistant ?" and meta tags
      | name             | content                                                                  |
      | description      | What is the Werewolves Assistant and why is it useful for game masters ? |
      | application-name | Werewolves Assistant                                                     |
      | creator          | Antoine ZANARDI                                                          |
      | viewport         | width=device-width, initial-scale=1                                      |
      | charset          | utf-8                                                                    |
      | generator        | nuxt                                                                     |
      | color-scheme     | dark                                                                     |

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
    Then the text "Each night, they devour a Villager. During the day, they try to conceal their nocturnal identity to escape public vengeance." under the region with name "Click to expand the description of the Werewolf role" should be visible
    And the img with name "Illustration of the Werewolf role on the left description" should be visible
    And the text "Base Game" under the region with name "Click to expand the description of the Werewolf role" should be visible
    And the text "Ignominiously chased from the village, he returned years later under the guise of a false identity to exact his terrible revenge." under the region with name "Click to expand the description of the Pied Piper role" should be visible
    And the img with name "Illustration of the Pied Piper role on the left description" should be visible
    And the text "Lonely" under the region with name "Click to expand the description of the Pied Piper role" should be visible
    And the text "New Moon Expansion" under the region with name "Click to expand the description of the Pied Piper role" should be visible

    When the user clicks on the button with name "Click to expand the description of the Pied Piper role"
    Then the img with name "Illustration of the Pied Piper role on the left description" should be hidden

  Scenario: ❓ User goes on YouTube to watch a tutorial by clicking on the link
    Given the user is on about page
    And the user is about to open a page on new tab
    When the user hovers the link with name "I don't know this game"
    Then the tooltip with text "Watch an explanatory video on YouTube" should be visible
    When the user clicks on the link with name "I don't know this game"
    Then a new page should be opened with url "https://www.youtube.com/watch?v=3HUz8CAORro"

  Scenario: ❓ User goes on GitHub to contribute to the project by clicking on the link
    Given the user is on about page
    And the user is about to open a page on new tab
    When the user clicks on the link with name "Access the project on GitHub"
    Then a new page should be opened with url "https://github.com/antoinezanardi/werewolves-assistant-web-next"

  Scenario: ❓ User goes on BuyMeACoffee to donate by clicking on the link
    Given the user is on about page
    And the user is about to open a page on new tab
    When the user clicks on the link with name "Buy me a coffee"
    Then a new page should be opened with url "https://www.buymeacoffee.com/antoinezanardi?t=true"

  Scenario: ❓ User goes on creator's portfolio by clicking on the link
    Given the user is on about page
    And the user is about to open a page on new tab
    When the user clicks on the link with name "My portfolio"
    Then a new page should be opened with url "https://antoinezanardi.fr/"

  Scenario: ❓ User goes back on home page by clicking on werewolves assistant logo in navigation bar
    Given the user is on about page
    When the user clicks on werewolves assistant logo in navigation bar
    Then the user should be on home page

  Scenario: ❓ User goes back to the top of the page by clicking on back to top button in navigation bar
    Given the user is on about page
    When the user scrolls to the link with name "Buy me a coffee"
    And the user clicks on the button with exact name "Scroll Top"
    Then the heading with name "Why an assistant ?" should be in viewport

  Scenario: ❓ User goes back on home page by clicking on back to home page button in parameters dropdown
    Given the user is on about page
    When the user clicks on parameters button in navigation bar
    And the user clicks on the back to home button in parameters in navigation bar
    Then the user should be on home page

  Scenario: ❓ User goes back on home page by clicking on back to home page button at the bottom of the page
    Given the user is on about page
    When the user clicks on the link with name "Back to home"
    Then the user should be on home page
