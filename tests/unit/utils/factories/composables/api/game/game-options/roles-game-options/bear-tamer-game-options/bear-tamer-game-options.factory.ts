import { faker } from "@faker-js/faker";
import { BearTamerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/bear-tamer-game-options/bear-tamer-game-options.class";

function createFakeBearTamerGameOptions(bearTamerGameOptions: Partial<BearTamerGameOptions> = {}): BearTamerGameOptions {
  return BearTamerGameOptions.create({ doesGrowlOnWerewolvesSide: bearTamerGameOptions.doesGrowlOnWerewolvesSide ?? faker.datatype.boolean() });
}

export { createFakeBearTamerGameOptions };