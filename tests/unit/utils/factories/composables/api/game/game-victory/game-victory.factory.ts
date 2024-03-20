import { faker } from "@faker-js/faker";

import { GAME_VICTORY_TYPES } from "~/composables/api/game/constants/game-victory/game-victory.constants";
import { GameVictory } from "~/composables/api/game/types/game-victory/game-victory.class";

function createFakeGameVictory(gameVictory: Partial<GameVictory> = {}): GameVictory {
  return GameVictory.create({
    type: gameVictory.type ?? faker.helpers.arrayElement(GAME_VICTORY_TYPES),
    winners: gameVictory.winners ?? undefined,
  });
}

export { createFakeGameVictory };