import { faker } from "@faker-js/faker";

import { GAME_STATUSES } from "~/composables/api/game/constants/game.constants";
import { Game } from "~/composables/api/game/types/game.class";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeGamePhase } from "@tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";

function createFakeGame(game: Partial<Game> = {}): Game {
  return Game.create({
    _id: game._id ?? faker.string.uuid(),
    phase: createFakeGamePhase(game.phase),
    status: game.status ?? faker.helpers.arrayElement(Object.values(GAME_STATUSES)),
    tick: game.tick ?? faker.number.int({ min: 1 }),
    turn: game.turn ?? faker.number.int({ min: 1 }),
    players: game.players ?? [],
    playerGroups: game.playerGroups,
    currentPlay: game.currentPlay ?? null,
    upcomingPlays: game.upcomingPlays ?? [],
    additionalCards: game.additionalCards,
    lastGameHistoryRecord: game.lastGameHistoryRecord ?? null,
    options: createFakeGameOptions(game.options),
    victory: game.victory,
    events: game.events,
    createdAt: game.createdAt ?? faker.date.recent(),
    updatedAt: game.updatedAt ?? faker.date.recent(),
  });
}

export { createFakeGame };