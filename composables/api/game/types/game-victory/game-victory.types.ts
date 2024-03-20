import type { TupleToUnion } from "type-fest";

import type { GAME_VICTORY_TYPES } from "~/composables/api/game/constants/game-victory/game-victory.constants";

type GameVictoryTypes = TupleToUnion<typeof GAME_VICTORY_TYPES>;

export type { GameVictoryTypes };