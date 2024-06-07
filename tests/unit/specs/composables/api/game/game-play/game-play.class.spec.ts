import { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";

describe("Game Play Class", () => {
  describe("create", () => {
    it("should create a game play when called.", () => {
      const source = createFakeGamePlaySource();
      const createdGamePlay = GamePlay.create({
        type: "target",
        source,
        action: "eat",
        occurrence: "on-days",
        causes: ["stuttering-judge-request"],
        extra: "Extra",
      } as GamePlay);
      const expectedGamePlay = new GamePlay();
      expectedGamePlay.type = "target";
      expectedGamePlay.source = source;
      expectedGamePlay.action = "eat";
      expectedGamePlay.occurrence = "on-days";
      expectedGamePlay.causes = ["stuttering-judge-request"];

      expect(createdGamePlay).toStrictEqual<GamePlay>(expectedGamePlay);
    });
  });
});