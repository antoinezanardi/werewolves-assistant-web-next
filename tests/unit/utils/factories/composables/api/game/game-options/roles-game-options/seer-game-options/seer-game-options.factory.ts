import { faker } from "@faker-js/faker";
import { SeerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/seer-game-options/seer-game-options.class";

function createFakeSeerGameOptions(seerGameOptions: Partial<SeerGameOptions> = {}): SeerGameOptions {
  return SeerGameOptions.create({
    isTalkative: seerGameOptions.isTalkative ?? faker.datatype.boolean(),
    canSeeRoles: seerGameOptions.canSeeRoles ?? faker.datatype.boolean(),
  });
}

export { createFakeSeerGameOptions };