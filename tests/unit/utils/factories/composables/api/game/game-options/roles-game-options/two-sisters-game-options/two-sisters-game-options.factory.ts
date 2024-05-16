import { faker } from "@faker-js/faker";
import { TwoSistersGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/two-sisters-game-options/two-sisters-game-options.class";

function createFakeTwoSistersGameOptions(twoSistersGameOptions: Partial<TwoSistersGameOptions> = {}): TwoSistersGameOptions {
  return TwoSistersGameOptions.create({ wakingUpInterval: twoSistersGameOptions.wakingUpInterval ?? faker.number.int({ min: 1, max: 5 }) });
}

export { createFakeTwoSistersGameOptions };