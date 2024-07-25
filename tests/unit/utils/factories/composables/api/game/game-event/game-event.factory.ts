import { faker } from "@faker-js/faker";
import { GAME_EVENT_TYPES } from "~/composables/api/game/constants/game-event/game-event.constants";
import { GameEvent } from "~/composables/api/game/game-event/game-event.class";

function createFakeGameEvent(gameEvent: Partial<GameEvent> = {}): GameEvent {
  return GameEvent.create({
    type: gameEvent.type ?? faker.helpers.arrayElement(GAME_EVENT_TYPES),
    players: gameEvent.players,
  });
}

export { createFakeGameEvent };