import { faker } from "@faker-js/faker";
import { BigBadWolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/big-bad-wolf-options/big-bad-wolf-options.class";

function createFakeBigBadWolfGameOptions(bigBadWolfGameOptions: Partial<BigBadWolfGameOptions> = {}): BigBadWolfGameOptions {
  return BigBadWolfGameOptions.create({ isPowerlessIfWerewolfDies: bigBadWolfGameOptions.isPowerlessIfWerewolfDies ?? faker.datatype.boolean() });
}

export { createFakeBigBadWolfGameOptions };