import { faker } from "@faker-js/faker";

import { ROLE_NAMES, ROLE_ORIGINS, ROLE_SIDES, ROLE_TYPES } from "~/composables/api/role/constants/role.constants";
import { Role } from "~/composables/api/role/types/role.class";

function createFakeRole(role: Partial<Role> = {}, override: object = {}): Role {
  return Role.create({
    name: role.name ?? faker.helpers.arrayElement(Object.values(ROLE_NAMES)),
    side: role.side ?? faker.helpers.arrayElement(Object.values(ROLE_SIDES)),
    type: role.type ?? faker.helpers.arrayElement(Object.values(ROLE_TYPES)),
    origin: role.origin ?? faker.helpers.arrayElement(Object.values(ROLE_ORIGINS)),
    minInGame: role.minInGame ?? undefined,
    maxInGame: role.maxInGame ?? faker.number.int({ min: 1, max: 10 }),
    additionalCardsEligibleRecipients: role.additionalCardsEligibleRecipients ?? undefined,
    recommendedMinPlayers: role.recommendedMinPlayers ?? undefined,
    ...override,
  });
}

export { createFakeRole };