import { faker } from "@faker-js/faker";

import { RoleNames, RoleOrigins, RoleSides, RoleTypes } from "~/composables/api/role/enums/role.enums";
import type { Role } from "~/composables/api/role/types/role.class";

function createFakeRole(role: Partial<Role> = {}, override: object = {}): Role {
  return {
    name: role.name ?? faker.helpers.arrayElement(Object.values(RoleNames)),
    side: role.side ?? faker.helpers.arrayElement(Object.values(RoleSides)),
    type: role.type ?? faker.helpers.arrayElement(Object.values(RoleTypes)),
    origin: role.origin ?? faker.helpers.arrayElement(Object.values(RoleOrigins)),
    minInGame: role.minInGame ?? undefined,
    maxInGame: role.maxInGame ?? faker.number.int({ min: 1, max: 10 }),
    additionalCardsEligibleRecipients: role.additionalCardsEligibleRecipients ?? undefined,
    recommendedMinPlayers: role.recommendedMinPlayers ?? undefined,
    ...override,
  };
}

export { createFakeRole };