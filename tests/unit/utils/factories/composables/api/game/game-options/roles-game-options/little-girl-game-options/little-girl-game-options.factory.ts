import { faker } from "@faker-js/faker";
import { LittleGirlGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/little-girl-game-options/little-girl-game-options.class";

function createFakeLittleGirlGameOptions(littleGirlGameOptions: Partial<LittleGirlGameOptions> = {}): LittleGirlGameOptions {
  return LittleGirlGameOptions.create({ isProtectedByDefender: littleGirlGameOptions.isProtectedByDefender ?? faker.datatype.boolean() });
}

export { createFakeLittleGirlGameOptions };