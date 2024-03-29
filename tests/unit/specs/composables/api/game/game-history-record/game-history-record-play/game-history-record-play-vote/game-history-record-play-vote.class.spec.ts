import { GameHistoryRecordPlayVote } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-vote/game-history-record-play-vote.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game History Record Play Vote Class", () => {
  describe("Create", () => {
    it("should create a game history record play vote when called.", () => {
      const source = createFakePlayer();
      const target = createFakePlayer();
      const gameHistoryRecordPlayVote = GameHistoryRecordPlayVote.create({
        source,
        target,
        extra: "Extra",
      } as GameHistoryRecordPlayVote);
      const expectedGameHistoryRecordPlayVote = new GameHistoryRecordPlayVote();
      expectedGameHistoryRecordPlayVote.source = source;
      expectedGameHistoryRecordPlayVote.target = target;

      expect(gameHistoryRecordPlayVote).toStrictEqual<GameHistoryRecordPlayVote>(expectedGameHistoryRecordPlayVote);
    });
  });
});