import { faker } from "@faker-js/faker";

import { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";
import { RoleNames } from "~/composables/api/role/enums/role.enums";

function createFakePlayerRole(role: Partial<PlayerRole> = {}): PlayerRole {
  return PlayerRole.create({
    original: role.original ?? faker.helpers.arrayElement(Object.values(RoleNames)),
    current: role.current ?? faker.helpers.arrayElement(Object.values(RoleNames)),
    isRevealed: role.isRevealed ?? faker.datatype.boolean(),
  });
}

export { createFakePlayerRole };