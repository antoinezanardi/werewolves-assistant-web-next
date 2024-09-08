@audio
@shard-3
Feature: 🔊 Audio

  Scenario: 🔊 Audio is playing by default in game and can be disabled
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |

    When the user hovers the button with name "Mute"
    Then the tooltip with text "Mute" should be visible

    When the user mutes the audio in navigation bar
    And the user moves his mouse away
    And the user hovers the button with name "Unmute"
    Then the tooltip with text "Unmute" should be visible

  Scenario: 🔊 Audio settings are saved and restored from local storage
    Given the user creates a game with the players with name and role
      | name    | role     |
      | Antoine | Seer     |
      | Bob     | Werewolf |
      | Charlie | Idiot    |
      | David   | Villager |
    And the user mutes the audio in navigation bar

    When the user reloads the page
    And the user hovers the button with name "Unmute"
    Then the tooltip with text "Unmute" should be visible
