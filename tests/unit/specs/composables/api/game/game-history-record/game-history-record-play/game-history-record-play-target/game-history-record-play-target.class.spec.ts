import { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game History Record Play Target Class", () => {
  describe("Create", () => {
    it("should create a game history record play target when called.", () => {
      const player = createFakePlayer();
      const gameHistoryRecordPlayTarget = GameHistoryRecordPlayTarget.create({
        player,
        drankPotion: "death",
        extra: "Extra",
      } as GameHistoryRecordPlayTarget);
      const expectedGameHistoryRecordPlayTarget = new GameHistoryRecordPlayTarget();
      expectedGameHistoryRecordPlayTarget.player = player;
      expectedGameHistoryRecordPlayTarget.drankPotion = "death";

      expect(gameHistoryRecordPlayTarget).toStrictEqual<GameHistoryRecordPlayTarget>(expectedGameHistoryRecordPlayTarget);
    });
  });
});