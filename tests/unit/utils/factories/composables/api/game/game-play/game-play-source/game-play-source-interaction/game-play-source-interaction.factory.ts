import { faker } from "@faker-js/faker";

import { GAME_SOURCES } from "~/composables/api/game/constants/game.constants";
import { PLAYER_INTERACTION_TYPES } from "~/composables/api/game/constants/player/player-interaction/player-interaction.constants";
import type { GamePlaySourceInteraction } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.class";
import { createFakeGamePlaySourceInteractionBoundaries } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction-boundaries/game-play-source-interaction-boundaries.factory";

function createFakeGamePlaySourceInteraction(gamePlaySourceInteraction: Partial<GamePlaySourceInteraction> = {}): GamePlaySourceInteraction {
  return {
    type: gamePlaySourceInteraction.type ?? faker.helpers.arrayElement(PLAYER_INTERACTION_TYPES),
    source: gamePlaySourceInteraction.source ?? faker.helpers.arrayElement(GAME_SOURCES),
    eligibleTargets: gamePlaySourceInteraction.eligibleTargets ?? [],
    boundaries: createFakeGamePlaySourceInteractionBoundaries(gamePlaySourceInteraction.boundaries),
  };
}

export { createFakeGamePlaySourceInteraction };