import { faker } from "@faker-js/faker";

import { GAME_PHASES } from "~/composables/api/game/constants/game.constants";
import { PlayerAttributeActivation } from "~/composables/api/game/types/players/player-attribute/player-attribute-activation/player-attribute-activation.class";

function createFakePlayerAttributeActivation(playerAttributeActivation: Partial<PlayerAttributeActivation> = {}): PlayerAttributeActivation {
  return PlayerAttributeActivation.create({
    turn: playerAttributeActivation.turn ?? faker.number.int({ min: 0 }),
    phase: playerAttributeActivation.phase ?? faker.helpers.arrayElement(GAME_PHASES),
  });
}

export { createFakePlayerAttributeActivation };