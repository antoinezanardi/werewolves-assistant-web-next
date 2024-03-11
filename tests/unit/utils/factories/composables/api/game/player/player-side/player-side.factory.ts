import { faker } from "@faker-js/faker";

import { PlayerSide } from "~/composables/api/game/types/players/player-side/player-side.class";
import { ROLE_SIDES } from "~/composables/api/role/constants/role.constants";

function createFakePlayerSide(side: Partial<PlayerSide> = {}): PlayerSide {
  return PlayerSide.create({
    original: side.original ?? faker.helpers.arrayElement(Object.values(ROLE_SIDES)),
    current: side.current ?? faker.helpers.arrayElement(Object.values(ROLE_SIDES)),
  });
}

export { createFakePlayerSide };