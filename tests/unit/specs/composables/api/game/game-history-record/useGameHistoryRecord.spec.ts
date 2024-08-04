import { useGameHistoryRecord } from "~/composables/api/game/game-history-record/useGameHistoryRecord";
import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlayVote } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-vote/game-history-record-play-vote.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";

describe("Use Game History Record Spec", () => {
  describe("didSourceSkipped", () => {
    it.each<{
      gameHistoryRecord: GameHistoryRecord;
      expected: boolean;
      test: string;
    }>([
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "vote",
            votes: undefined,
          }),
        }),
        expected: true,
        test: "should return true when called with vote type and votes undefined.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "target",
            targets: undefined,
          }),
        }),
        expected: true,
        test: "should return true when called with target type and targets undefined.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "request-another-vote",
            didJudgeRequestAnotherVote: undefined,
          }),
        }),
        expected: true,
        test: "should return true when called with request-another-vote type and didJudgeRequestAnotherVote undefined.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "choose-card",
            chosenCard: undefined,
          }),
        }),
        expected: true,
        test: "should return true when called with choose-card type and chosenCard undefined.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "vote",
            votes: [createFakeGameHistoryRecordPlayVote()],
          }),
        }),
        expected: false,
        test: "should return false when called with vote type and votes are not empty.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expected: false,
        test: "should return false when called with target type and targets are not empty.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "request-another-vote",
            didJudgeRequestAnotherVote: true,
          }),
        }),
        expected: false,
        test: "should return false when called with request-another-vote type and didJudgeRequestAnotherVote is true.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            type: "choose-card",
            chosenCard: createFakeGameAdditionalCard(),
          }),
        }),
        expected: false,
        test: "should return false when called with choose-card type and chosenCard is not empty.",
      },
    ])("$test", ({ gameHistoryRecord, expected }) => {
      expect(useGameHistoryRecord().didSourceSkipped(gameHistoryRecord)).toBe(expected);
    });
  });
});