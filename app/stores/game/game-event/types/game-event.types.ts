import type { TupleToUnion } from "type-fest";
import type { GAME_EVENT_TYPES } from "~/stores/game/game-event/constants/game-event.constants";

type GameEventType = TupleToUnion<typeof GAME_EVENT_TYPES>;

export type { GameEventType };