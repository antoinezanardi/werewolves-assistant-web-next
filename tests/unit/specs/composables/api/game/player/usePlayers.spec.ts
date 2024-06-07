import { usePlayers } from "~/composables/api/game/player/usePlayers";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Use Players Composable", () => {
  describe("getPlayersNamesText", () => {
    it("should return player names text when called.", () => {
      const players = [
        createFakePlayer({ name: "player-1" }),
        createFakePlayer({ name: "player-2" }),
        createFakePlayer({ name: "player-3" }),
      ];
      const text = usePlayers().getPlayersNamesText(players);
      const expectedText = "player-1, player-2 shared.and player-3";

      expect(text).toBe(expectedText);
    });

    it("should return empty string when there are no players.", () => {
      const text = usePlayers().getPlayersNamesText([]);

      expect(text).toBe("");
    });
  });
});