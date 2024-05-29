import { faker } from "@faker-js/faker";
import { GAME_EVENT_TYPES } from "~/stores/game/game-event/constants/game-event.constants";
import { GameEvent } from "~/stores/game/game-event/types/game-event.class";

function createFakeGameEvent(gameEvent: Partial<GameEvent> = {}): GameEvent {
  return GameEvent.create({ type: gameEvent.type ?? faker.helpers.arrayElement(GAME_EVENT_TYPES) });
}

export { createFakeGameEvent };