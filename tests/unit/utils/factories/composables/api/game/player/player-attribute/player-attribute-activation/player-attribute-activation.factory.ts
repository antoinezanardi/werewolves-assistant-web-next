import { faker } from "@faker-js/faker";

import { GAME_PHASE_NAMES } from "~/composables/api/game/constants/game-phase/game-phase.constants";
import { PlayerAttributeActivation } from "~/composables/api/game/types/players/player-attribute/player-attribute-activation/player-attribute-activation.class";

function createFakePlayerAttributeActivation(playerAttributeActivation: Partial<PlayerAttributeActivation> = {}): PlayerAttributeActivation {
  return PlayerAttributeActivation.create({
    turn: playerAttributeActivation.turn ?? faker.number.int({ min: 0 }),
    phaseName: playerAttributeActivation.phaseName ?? faker.helpers.arrayElement(GAME_PHASE_NAMES),
  });
}

export { createFakePlayerAttributeActivation };