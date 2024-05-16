import { faker } from "@faker-js/faker";
import { WolfHoundGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.class";

function createFakeWolfHoundGameOptions(wolfHoundGameOptions: Partial<WolfHoundGameOptions> = {}): WolfHoundGameOptions {
  return WolfHoundGameOptions.create({
    isChosenSideRevealed: wolfHoundGameOptions.isChosenSideRevealed ?? faker.datatype.boolean(),
    isSideRandomlyChosen: wolfHoundGameOptions.isSideRandomlyChosen ?? faker.datatype.boolean(),
  });
}

export { createFakeWolfHoundGameOptions };