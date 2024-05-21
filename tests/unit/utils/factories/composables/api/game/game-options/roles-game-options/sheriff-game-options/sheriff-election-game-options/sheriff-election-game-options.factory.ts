import { faker } from "@faker-js/faker";
import { GAME_PHASE_NAMES } from "~/composables/api/game/constants/game-phase/game-phase.constants";
import { SheriffElectionGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/sheriff-game-options/sheriff-election-game-options/sheriff-election-game-options.class";

function createFakeSheriffElectionGameOptions(sheriffElectionGameOptions: Partial<SheriffElectionGameOptions> = {}): SheriffElectionGameOptions {
  return SheriffElectionGameOptions.create({
    turn: sheriffElectionGameOptions.turn ?? faker.number.int({ min: 1 }),
    phaseName: sheriffElectionGameOptions.phaseName ?? faker.helpers.arrayElement(GAME_PHASE_NAMES),
  });
}

export { createFakeSheriffElectionGameOptions };