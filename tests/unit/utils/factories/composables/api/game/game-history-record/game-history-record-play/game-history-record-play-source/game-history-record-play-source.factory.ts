import { faker } from "@faker-js/faker";

import { GAME_PLAY_SOURCE_NAMES } from "~/composables/api/game/constants/game-play/game-play-source/game-play-source.constants";
import { GameHistoryRecordPlaySource } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.class";

function createFakeGameHistoryRecordPlaySource(gameHistoryRecordPlaySource: Partial<GameHistoryRecordPlaySource> = {}): GameHistoryRecordPlaySource {
  return GameHistoryRecordPlaySource.create({
    name: gameHistoryRecordPlaySource.name ?? faker.helpers.arrayElement(GAME_PLAY_SOURCE_NAMES),
    players: gameHistoryRecordPlaySource.players ?? [],
    interactions: gameHistoryRecordPlaySource.interactions ?? undefined,
  });
}

export { createFakeGameHistoryRecordPlaySource };