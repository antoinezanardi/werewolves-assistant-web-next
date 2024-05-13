import { GamePhase } from "~/composables/api/game/types/game-phase/game-phase.class";

describe("Game Phase Class", () => {
  describe("create", () => {
    it("should create a game phase when called.", () => {
      const createdGamePhase = GamePhase.create({
        name: "day",
        tick: 1,
      } as GamePhase);
      const expectedGamePhase = new GamePhase();
      expectedGamePhase.name = "day";
      expectedGamePhase.tick = 1;

      expect(createdGamePhase).toStrictEqual<GamePhase>(expectedGamePhase);
    });
  });
});