import { faker } from "@faker-js/faker";

import { PlayerSide } from "~/composables/api/game/types/players/player-role/player-side.class";
import { RoleSides } from "~/composables/api/role/enums/role.enums";

function createFakePlayerSide(side: Partial<PlayerSide> = {}): PlayerSide {
  return PlayerSide.create({
    original: side.original ?? faker.helpers.arrayElement(Object.values(RoleSides)),
    current: side.current ?? faker.helpers.arrayElement(Object.values(RoleSides)),
  });
}

export { createFakePlayerSide };