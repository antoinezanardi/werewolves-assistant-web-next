import { GamePlayEligibleTargetsBoundaries } from "~/composables/api/game/types/game-play/game-play-eligible-targets/game-play-eligible-targets-boundaries/game-play-eligible-targets-boundaries.class";

describe("Game Play Eligible Targets Boundaries", () => {
  describe("create", () => {
    it("should create a game play eligible targets boundaries when called.", () => {
      const createdGamePlayEligibleTargetsBoundaries = GamePlayEligibleTargetsBoundaries.create({
        min: 1,
        max: 2,
        extra: "Extra",
      } as GamePlayEligibleTargetsBoundaries);
      const expectedGamePlayEligibleTargetsBoundaries = new GamePlayEligibleTargetsBoundaries();
      expectedGamePlayEligibleTargetsBoundaries.min = 1;
      expectedGamePlayEligibleTargetsBoundaries.max = 2;

      expect(createdGamePlayEligibleTargetsBoundaries).toStrictEqual<GamePlayEligibleTargetsBoundaries>(expectedGamePlayEligibleTargetsBoundaries);
    });
  });
});