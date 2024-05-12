import { faker } from "@faker-js/faker";

import { GAME_HISTORY_RECORD_PLAY_VOTING_RESULTS } from "~/composables/api/game/constants/game-history-record/game-history-record.constants";
import { GameHistoryRecordPlayVoting } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.class";

function createFakeGameHistoryRecordPlayVoting(gameHistoryRecordPlayVoting: Partial<GameHistoryRecordPlayVoting> = {}): GameHistoryRecordPlayVoting {
  return GameHistoryRecordPlayVoting.create({
    result: gameHistoryRecordPlayVoting.result ?? faker.helpers.arrayElement(GAME_HISTORY_RECORD_PLAY_VOTING_RESULTS),
    nominatedPlayers: gameHistoryRecordPlayVoting.nominatedPlayers,
  });
}

export { createFakeGameHistoryRecordPlayVoting };