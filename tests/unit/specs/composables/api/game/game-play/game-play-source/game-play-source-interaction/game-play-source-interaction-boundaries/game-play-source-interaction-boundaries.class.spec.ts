import { GamePlaySourceInteractionBoundaries } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction-boundaries/game-play-source-interaction-boundaries.class";

describe("Game Play Source Interaction Boundaries Class", () => {
  describe("create", () => {
    it("should create a game play source interaction boundaries when called.", () => {
      const createdGamePlaySourceInteractionBoundaries = GamePlaySourceInteractionBoundaries.create({
        min: 1,
        max: 1,
        extra: "Extra",
      } as GamePlaySourceInteractionBoundaries);
      const expectedGamePlaySourceInteractionBoundaries = new GamePlaySourceInteractionBoundaries();
      expectedGamePlaySourceInteractionBoundaries.min = 1;
      expectedGamePlaySourceInteractionBoundaries.max = 1;

      expect(createdGamePlaySourceInteractionBoundaries).toStrictEqual<GamePlaySourceInteractionBoundaries>(expectedGamePlaySourceInteractionBoundaries);
    });
  });
});