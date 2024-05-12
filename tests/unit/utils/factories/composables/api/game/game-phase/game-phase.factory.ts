import { faker } from "@faker-js/faker";
import { GAME_PHASE_NAMES } from "~/composables/api/game/constants/game-phase/game-phase.constants";
import { GamePhase } from "~/composables/api/game/types/game-phase/game-phase.class";

function createFakeGamePhase(gamePhase: Partial<GamePhase> = {}): GamePhase {
  return GamePhase.create({
    name: faker.helpers.arrayElement(GAME_PHASE_NAMES),
    tick: faker.number.int({ min: 1 }),
    ...gamePhase,
  });
}

export { createFakeGamePhase };