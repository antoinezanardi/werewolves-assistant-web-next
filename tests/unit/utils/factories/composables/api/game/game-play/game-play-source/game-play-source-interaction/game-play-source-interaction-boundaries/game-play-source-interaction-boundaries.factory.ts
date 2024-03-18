import { faker } from "@faker-js/faker";

import type { GamePlaySourceInteractionBoundaries } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction-boundaries/game-play-source-interaction-boundaries.class";

function createFakeGamePlaySourceInteractionBoundaries(gamePlaySourceInteractionBoundaries: Partial<GamePlaySourceInteractionBoundaries> = {}):
GamePlaySourceInteractionBoundaries {
  return {
    min: gamePlaySourceInteractionBoundaries.min ?? faker.number.int({ min: 1 }),
    max: gamePlaySourceInteractionBoundaries.max ?? faker.number.int({ min: 1 }),
  };
}

export { createFakeGamePlaySourceInteractionBoundaries };