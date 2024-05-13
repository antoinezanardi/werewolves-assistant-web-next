import { faker } from "@faker-js/faker";

import { GAME_PLAY_ACTIONS, GAME_PLAY_TYPES } from "~/composables/api/game/constants/game-play/game-play.constants";
import { GameHistoryRecordPlay } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play.class";
import { createFakeGameHistoryRecordPlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlayVoting } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.factory";

function createFakeGameHistoryRecordPlay(gameHistoryRecordPlay: Partial<GameHistoryRecordPlay> = {}): GameHistoryRecordPlay {
  return GameHistoryRecordPlay.create({
    type: gameHistoryRecordPlay.type ?? faker.helpers.arrayElement(GAME_PLAY_TYPES),
    action: gameHistoryRecordPlay.action ?? faker.helpers.arrayElement(GAME_PLAY_ACTIONS),
    source: gameHistoryRecordPlay.source ?? createFakeGameHistoryRecordPlaySource(),
    cause: gameHistoryRecordPlay.cause,
    targets: gameHistoryRecordPlay.targets,
    votes: gameHistoryRecordPlay.votes,
    voting: gameHistoryRecordPlay.voting ? createFakeGameHistoryRecordPlayVoting(gameHistoryRecordPlay.voting) : undefined,
    didJudgeRequestAnotherVote: gameHistoryRecordPlay.didJudgeRequestAnotherVote,
    chosenSide: gameHistoryRecordPlay.chosenSide,
    chosenCard: gameHistoryRecordPlay.chosenCard,
  });
}

export { createFakeGameHistoryRecordPlay };