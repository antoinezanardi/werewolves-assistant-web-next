import { faker } from "@faker-js/faker";
import { WitchGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/witch-game-options/witch-game-options.class";

function createFakeWitchGameOptions(witchGameOptions: Partial<WitchGameOptions> = {}): WitchGameOptions {
  return WitchGameOptions.create({ doesKnowWerewolvesTargets: witchGameOptions.doesKnowWerewolvesTargets ?? faker.datatype.boolean() });
}

export { createFakeWitchGameOptions };