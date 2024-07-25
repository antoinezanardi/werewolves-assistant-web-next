import type { TupleToUnion } from "type-fest";
import type { GAME_EVENT_TYPES } from "~/composables/api/game/constants/game-event/game-event.constants";

type GameEventType = TupleToUnion<typeof GAME_EVENT_TYPES>;

export type { GameEventType };