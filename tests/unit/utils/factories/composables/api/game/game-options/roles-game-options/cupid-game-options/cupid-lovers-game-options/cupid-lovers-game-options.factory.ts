import { faker } from "@faker-js/faker";
import { CupidLoversGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/cupid-game-options/cupid-lovers-game-options/cupid-lovers-game-options.class";

function createFakeCupidLoversGameOptions(cupidLoversGameOptions: Partial<CupidLoversGameOptions> = {}): CupidLoversGameOptions {
  return CupidLoversGameOptions.create({ doRevealRoleToEachOther: cupidLoversGameOptions.doRevealRoleToEachOther ?? faker.datatype.boolean() });
}

export { createFakeCupidLoversGameOptions };