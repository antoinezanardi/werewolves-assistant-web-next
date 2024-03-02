import { faker } from "@faker-js/faker";

import { PLAYER_INTERACTION_TYPES } from "~/composables/api/game/constants/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.constants";
import { GAME_SOURCES } from "~/composables/api/game/constants/game.constants";
import { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";

function createFakePlayerInteraction(playerInteraction: Partial<PlayerInteraction> = {}): PlayerInteraction {
  return PlayerInteraction.create({
    type: playerInteraction.type ?? faker.helpers.arrayElement(PLAYER_INTERACTION_TYPES),
    source: playerInteraction.source ?? faker.helpers.arrayElement(GAME_SOURCES),
  });
}

export { createFakePlayerInteraction };