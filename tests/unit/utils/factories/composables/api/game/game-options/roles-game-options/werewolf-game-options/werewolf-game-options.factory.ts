import { faker } from "@faker-js/faker";
import { WerewolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/werewolf-game-options/werewolf-game-options.class";

function createFakeWerewolfGameOptions(werewolfGameOptions: Partial<WerewolfGameOptions> = {}): WerewolfGameOptions {
  return WerewolfGameOptions.create({
    canEatEachOther: werewolfGameOptions.canEatEachOther ?? faker.datatype.boolean(),
  });
}

export { createFakeWerewolfGameOptions };