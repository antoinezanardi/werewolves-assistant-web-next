import { faker } from "@faker-js/faker";

import { GAME_PHASES, GAME_STATUSES } from "~/composables/api/game/constants/game.constants";
import { Game } from "~/composables/api/game/types/game.class";

function createFakeGame(game: Partial<Game> = {}): Game {
  return Game.create({
    _id: game._id ?? faker.string.uuid(),
    players: game.players ?? [],
    phase: game.phase ?? faker.helpers.arrayElement(Object.values(GAME_PHASES)),
    status: game.status ?? faker.helpers.arrayElement(Object.values(GAME_STATUSES)),
    tick: game.tick ?? faker.number.int({ min: 1 }),
    turn: game.turn ?? faker.number.int({ min: 1 }),
    createdAt: game.createdAt ?? faker.date.recent(),
    updatedAt: game.updatedAt ?? faker.date.recent(),
  });
}

export { createFakeGame };