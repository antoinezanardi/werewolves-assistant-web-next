import { faker } from "@faker-js/faker";

import { Player } from "~/composables/api/game/types/players/player.class";
import { createFakePlayerRole } from "~/tests/unit/utils/factories/composables/api/game/player/player-role/player-role.factory";
import { createFakePlayerSide } from "~/tests/unit/utils/factories/composables/api/game/player/player-side/player-side.factory";

function createFakePlayer(player: Partial<Player> = {}): Player {
  return Player.create({
    _id: player._id ?? faker.string.uuid(),
    name: player.name ?? faker.person.firstName(),
    role: player.role ?? createFakePlayerRole(),
    side: player.side ?? createFakePlayerSide(),
    isAlive: player.isAlive ?? faker.datatype.boolean(),
  });
}

export { createFakePlayer };