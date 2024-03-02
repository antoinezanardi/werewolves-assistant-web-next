import { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { createFakeGamePlayEligibleTargets } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/game-play-eligible-targets.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";

describe("Game Play Class", () => {
  describe("create", () => {
    it("should create a game play when called.", () => {
      const source = createFakeGamePlaySource();
      const eligibleTargets = createFakeGamePlayEligibleTargets();
      const createdGamePlay = GamePlay.create({
        source,
        action: "eat",
        occurrence: "on-days",
        eligibleTargets,
        cause: "stuttering-judge-request",
        extra: "Extra",
      } as GamePlay);
      const expectedGamePlay = new GamePlay();
      expectedGamePlay.source = source;
      expectedGamePlay.action = "eat";
      expectedGamePlay.occurrence = "on-days";
      expectedGamePlay.cause = "stuttering-judge-request";
      expectedGamePlay.eligibleTargets = eligibleTargets;

      expect(createdGamePlay).toStrictEqual<GamePlay>(expectedGamePlay);
    });
  });
});