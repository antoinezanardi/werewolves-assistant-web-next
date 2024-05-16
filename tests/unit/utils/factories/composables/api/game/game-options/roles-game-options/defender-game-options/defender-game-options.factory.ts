import { faker } from "@faker-js/faker";
import { DefenderGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/defender-game-options/defender-game-options.class";

function createFakeDefenderGameOptions(defenderGameOptions: Partial<DefenderGameOptions> = {}): DefenderGameOptions {
  return DefenderGameOptions.create({ canProtectTwice: defenderGameOptions.canProtectTwice ?? faker.datatype.boolean() });
}

export { createFakeDefenderGameOptions };