import { faker } from "@faker-js/faker";

import { GAME_PLAY_SOURCE_NAMES } from "~/composables/api/game/constants/game-play/game-play-source/game-play-source.constants";
import { GamePlaySource } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.class";

function createFakeGamePlaySource(gamePlaySource: Partial<GamePlaySource> = {}): GamePlaySource {
  return GamePlaySource.create({
    name: gamePlaySource.name ?? faker.helpers.arrayElement(GAME_PLAY_SOURCE_NAMES),
    players: gamePlaySource.players ?? [],
    interactions: gamePlaySource.interactions ?? undefined,
  });
}

export { createFakeGamePlaySource };