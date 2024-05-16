import { faker } from "@faker-js/faker";
import { FoxGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/fox-game-options/fox-game-options.class";

function createFakeFoxGameOptions(foxGameOptions: Partial<FoxGameOptions> = {}): FoxGameOptions {
  return FoxGameOptions.create({ isPowerlessIfMissesWerewolf: foxGameOptions.isPowerlessIfMissesWerewolf ?? faker.datatype.boolean() });
}

export { createFakeFoxGameOptions };