import { faker } from "@faker-js/faker";
import { SheriffGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/sheriff-game-options/sheriff-game-options.class";
import { createFakeSheriffElectionGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/sheriff-game-options/sheriff-election-game-options/sheriff-election-game-options.factory";

function createFakeSheriffGameOptions(sheriffGameOptions: Partial<SheriffGameOptions> = {}): SheriffGameOptions {
  return SheriffGameOptions.create({
    electedAt: createFakeSheriffElectionGameOptions(sheriffGameOptions.electedAt),
    hasDoubledVote: sheriffGameOptions.hasDoubledVote ?? faker.datatype.boolean(),
    isEnabled: sheriffGameOptions.isEnabled ?? faker.datatype.boolean(),
    mustSettleTieInVotes: sheriffGameOptions.mustSettleTieInVotes ?? faker.datatype.boolean(),
  });
}

export { createFakeSheriffGameOptions };