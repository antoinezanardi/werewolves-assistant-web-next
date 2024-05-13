import type { TupleToUnion } from "type-fest";

import type { GAME_SOURCES, GAME_STATUSES } from "~/composables/api/game/constants/game.constants";

type GameStatus = TupleToUnion<typeof GAME_STATUSES>;

type GameSource = TupleToUnion<typeof GAME_SOURCES>;

export type {
  GameStatus,
  GameSource,
};