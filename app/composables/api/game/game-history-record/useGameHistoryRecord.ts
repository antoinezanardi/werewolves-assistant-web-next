import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";

type UseGameHistoryRecord = {
  didSourceSkipped: (gameHistoryRecord: GameHistoryRecord) => boolean;
};

function useGameHistoryRecord(): UseGameHistoryRecord {
  function didSourceSkipped(gameHistoryRecord: GameHistoryRecord): boolean {
    const {
      type,
      votes,
      targets,
      didJudgeRequestAnotherVote,
      chosenCard,
    } = gameHistoryRecord.play;

    return type === "vote" && !votes ||
      type === "target" && !targets ||
      type === "request-another-vote" && didJudgeRequestAnotherVote === undefined ||
      type === "choose-card" && !chosenCard;
  }
  return { didSourceSkipped };
}

export { useGameHistoryRecord };