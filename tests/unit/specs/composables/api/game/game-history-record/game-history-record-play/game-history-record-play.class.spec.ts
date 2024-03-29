import { GameHistoryRecordPlay } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play.class";
import { createFakeGameAdditionalCard } from "~/tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { createFakeGameHistoryRecordPlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlayTarget } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlayVote } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-vote/game-history-record-play-vote.factory";
import { createFakeGameHistoryRecordPlayVoting } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.factory";

describe("Game History Record Play Class", () => {
  describe("Create", () => {
    it("should create a game history record play when called.", () => {
      const source = createFakeGameHistoryRecordPlaySource();
      const targets = [
        createFakeGameHistoryRecordPlayTarget(),
        createFakeGameHistoryRecordPlayTarget(),
      ];
      const votes = [
        createFakeGameHistoryRecordPlayVote(),
        createFakeGameHistoryRecordPlayVote(),
      ];
      const chosenCard = createFakeGameAdditionalCard();
      const voting = createFakeGameHistoryRecordPlayVoting();
      const gameHistoryRecordPlay = GameHistoryRecordPlay.create({
        action: "eat",
        source,
        type: "vote",
        targets,
        votes,
        voting,
        chosenCard,
        extra: "Extra",
      } as GameHistoryRecordPlay);
      const expectedGameHistoryRecordPlay = new GameHistoryRecordPlay();
      expectedGameHistoryRecordPlay.action = "eat";
      expectedGameHistoryRecordPlay.source = source;
      expectedGameHistoryRecordPlay.type = "vote";
      expectedGameHistoryRecordPlay.targets = targets;
      expectedGameHistoryRecordPlay.votes = votes;
      expectedGameHistoryRecordPlay.voting = voting;
      expectedGameHistoryRecordPlay.chosenCard = chosenCard;

      expect(gameHistoryRecordPlay).toStrictEqual<GameHistoryRecordPlay>(expectedGameHistoryRecordPlay);
    });
  });
});