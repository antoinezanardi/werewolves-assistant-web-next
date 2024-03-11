import { faker } from "@faker-js/faker";

import { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";
import { ROLE_NAMES } from "~/composables/api/role/constants/role.constants";

function createFakePlayerRole(role: Partial<PlayerRole> = {}): PlayerRole {
  return PlayerRole.create({
    original: role.original ?? faker.helpers.arrayElement(Object.values(ROLE_NAMES)),
    current: role.current ?? faker.helpers.arrayElement(Object.values(ROLE_NAMES)),
    isRevealed: role.isRevealed ?? faker.datatype.boolean(),
  });
}

export { createFakePlayerRole };