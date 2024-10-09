import { faker } from "@faker-js/faker";

import { ThiefGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/thief-game-options/thief-game-options.class";

function createFakeThiefGameOptions(thiefGameOptions: Partial<ThiefGameOptions> = {}): ThiefGameOptions {
  return ThiefGameOptions.create({
    isChosenCardRevealed: thiefGameOptions.isChosenCardRevealed ?? faker.datatype.boolean(),
    mustChooseBetweenWerewolves: thiefGameOptions.mustChooseBetweenWerewolves ?? faker.datatype.boolean(),
  });
}

export { createFakeThiefGameOptions };