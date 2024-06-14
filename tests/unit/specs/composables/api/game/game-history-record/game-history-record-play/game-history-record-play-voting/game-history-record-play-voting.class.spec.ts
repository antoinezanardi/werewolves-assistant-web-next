import { GameHistoryRecordPlayVoting } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.class";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game History Record Play Voting Class", () => {
  describe("Create", () => {
    it("should create a game history record play voting when called.", () => {
      const nominatedPlayers = [
        createFakePlayer(),
        createFakePlayer(),
      ];
      const gameHistoryRecordPlayVoting = GameHistoryRecordPlayVoting.create({
        result: "sheriff-election",
        nominatedPlayers,
        extra: "Extra",
      } as GameHistoryRecordPlayVoting);
      const expectedGameHistoryRecordPlayVoting = new GameHistoryRecordPlayVoting();
      expectedGameHistoryRecordPlayVoting.result = "sheriff-election";
      expectedGameHistoryRecordPlayVoting.nominatedPlayers = nominatedPlayers;

      expect(gameHistoryRecordPlayVoting).toStrictEqual<GameHistoryRecordPlayVoting>(expectedGameHistoryRecordPlayVoting);
    });
  });
});