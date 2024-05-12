import { GameHistoryRecordPlaySource } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game History Record Play Source Class", () => {
  describe("Create", () => {
    it("should create a game history record play source when called.", () => {
      const players = [
        createFakePlayer(),
        createFakePlayer(),
      ];
      const gameHistoryRecordPlaySource = GameHistoryRecordPlaySource.create({
        name: "sheriff",
        players,
        extra: "Extra",
      } as GameHistoryRecordPlaySource);
      const expectedGameHistoryRecordPlaySource = new GameHistoryRecordPlaySource();
      expectedGameHistoryRecordPlaySource.name = "sheriff";
      expectedGameHistoryRecordPlaySource.players = players;

      expect(gameHistoryRecordPlaySource).toStrictEqual<GameHistoryRecordPlaySource>(expectedGameHistoryRecordPlaySource);
    });
  });
});