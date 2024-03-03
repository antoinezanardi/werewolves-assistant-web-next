import type { TupleToUnion } from "type-fest";

import type { GAME_SOURCES, GAME_STATUSES, GAME_PHASES } from "~/composables/api/game/constants/game.constants";

type GamePhase = TupleToUnion<typeof GAME_PHASES>;

type GameStatus = TupleToUnion<typeof GAME_STATUSES>;

type GameSource = TupleToUnion<typeof GAME_SOURCES>;

export type {
  GamePhase,
  GameStatus,
  GameSource,
};