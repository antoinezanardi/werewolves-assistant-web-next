import { useGamePhase } from "~/composables/api/game/game-phase/useGamePhase";

describe("Use Game Phase Composable", () => {
  describe("getGamePhaseWithTurnText", () => {
    it("should return game phase without turn text when phase is twilight.", () => {
      const expectedPhaseWithTurnText = "shared.game.phase.twilight";

      expect(useGamePhase().getGamePhaseWithTurnText("twilight", 3)).toBe(expectedPhaseWithTurnText);
    });

    it("should return game phase with turn text when called.", () => {
      const expectedPhaseWithTurnText = "shared.game.phase.day 3";

      expect(useGamePhase().getGamePhaseWithTurnText("day", 3)).toBe(expectedPhaseWithTurnText);
    });
  });
});