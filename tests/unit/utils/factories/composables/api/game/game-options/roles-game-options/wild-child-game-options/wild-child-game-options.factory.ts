import { faker } from "@faker-js/faker";
import { WildChildGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/wild-child-game-options/wild-child-game-options.class";

function createFakeWildChildGameOptions(wildChildGameOptions: Partial<WildChildGameOptions> = {}): WildChildGameOptions {
  return WildChildGameOptions.create({ isTransformationRevealed: wildChildGameOptions.isTransformationRevealed ?? faker.datatype.boolean() });
}

export { createFakeWildChildGameOptions };