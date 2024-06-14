import { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGamePhase } from "@tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game History Record Class", () => {
  describe("Create", () => {
    it("should create a game history record when called.", () => {
      const gameHistoryRecordPlay = createFakeGameHistoryRecordPlay();
      const revealedPlayers = [
        createFakePlayer(),
        createFakePlayer(),
      ];
      const phase = createFakeGamePhase();
      const createdAt = new Date();
      const gameHistoryRecord = GameHistoryRecord.create({
        _id: "1",
        gameId: "1",
        phase,
        play: gameHistoryRecordPlay,
        tick: 1,
        turn: 1,
        revealedPlayers,
        createdAt,
        extra: "Extra",
      } as GameHistoryRecord);
      const expectedGameHistoryRecord = new GameHistoryRecord();
      expectedGameHistoryRecord._id = "1";
      expectedGameHistoryRecord.gameId = "1";
      expectedGameHistoryRecord.phase = phase;
      expectedGameHistoryRecord.play = gameHistoryRecordPlay;
      expectedGameHistoryRecord.revealedPlayers = revealedPlayers;
      expectedGameHistoryRecord.tick = 1;
      expectedGameHistoryRecord.turn = 1;
      expectedGameHistoryRecord.createdAt = createdAt;

      expect(gameHistoryRecord).toStrictEqual<GameHistoryRecord>(expectedGameHistoryRecord);
    });
  });
});