import { faker } from "@faker-js/faker";
import { CupidGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/cupid-game-options/cupid-game-options.class";
import { createFakeCupidLoversGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/cupid-game-options/cupid-lovers-game-options/cupid-lovers-game-options.factory";

function createFakeCupidGameOptions(cupidGameOptions: Partial<CupidGameOptions> = {}): CupidGameOptions {
  return CupidGameOptions.create({
    lovers: createFakeCupidLoversGameOptions(cupidGameOptions.lovers),
    mustWinWithLovers: cupidGameOptions.mustWinWithLovers ?? faker.datatype.boolean(),
  });
}

export { createFakeCupidGameOptions };