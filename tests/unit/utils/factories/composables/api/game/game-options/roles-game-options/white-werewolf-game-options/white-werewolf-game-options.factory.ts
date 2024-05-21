import { faker } from "@faker-js/faker";
import { WhiteWerewolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/white-werewolf-options/white-werewolf-game-options.class";

function createFakeWhiteWerewolfGameOptions(whiteWerewolfGameOptions: Partial<WhiteWerewolfGameOptions> = {}): WhiteWerewolfGameOptions {
  return WhiteWerewolfGameOptions.create({ wakingUpInterval: whiteWerewolfGameOptions.wakingUpInterval ?? faker.number.int({ min: 1, max: 5 }) });
}

export { createFakeWhiteWerewolfGameOptions };