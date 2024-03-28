import { GameHistoryRecordPlayVote } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-vote/game-history-record-play-vote.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

function createGameHistoryRecordPlayVoteFactory(gameHistoryRecordPlayVote: Partial<GameHistoryRecordPlayVote> = {}): GameHistoryRecordPlayVote {
  return GameHistoryRecordPlayVote.create({
    source: gameHistoryRecordPlayVote.source ?? createFakePlayer(),
    target: gameHistoryRecordPlayVote.target ?? createFakePlayer(),
  });
}

export { createGameHistoryRecordPlayVoteFactory };