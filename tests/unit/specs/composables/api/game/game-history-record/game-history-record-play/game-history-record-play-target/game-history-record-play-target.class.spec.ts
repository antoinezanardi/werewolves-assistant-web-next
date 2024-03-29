import { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game History Record Play Target Class", () => {
  describe("Create", () => {
    it("should create a game history record play target when called.", () => {
      const target = createFakePlayer();
      const gameHistoryRecordPlayTarget = GameHistoryRecordPlayTarget.create({
        target,
        drankPotion: "death",
        extra: "Extra",
      } as GameHistoryRecordPlayTarget);
      const expectedGameHistoryRecordPlayTarget = new GameHistoryRecordPlayTarget();
      expectedGameHistoryRecordPlayTarget.target = target;
      expectedGameHistoryRecordPlayTarget.drankPotion = "death";

      expect(gameHistoryRecordPlayTarget).toStrictEqual<GameHistoryRecordPlayTarget>(expectedGameHistoryRecordPlayTarget);
    });
  });
});