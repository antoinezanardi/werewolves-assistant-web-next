import { useGamePhase } from "~/composables/api/game/game-phase/useGamePhase";

describe("Use Game Phase Composable", () => {
  describe("getGamePhaseWithTurnText", () => {
    it("should return game phase with turn text when called.", () => {
      const expectedPhaseWithTurnText = "shared.game.phase.day 3";

      expect(useGamePhase().getGamePhaseWithTurnText("day", 3)).toBe(expectedPhaseWithTurnText);
    });
  });
});