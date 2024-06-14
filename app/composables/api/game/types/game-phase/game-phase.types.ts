import type { TupleToUnion } from "type-fest";
import type { GAME_PHASE_NAMES } from "~/composables/api/game/constants/game-phase/game-phase.constants";

type GamePhaseName = TupleToUnion<typeof GAME_PHASE_NAMES>;

export type { GamePhaseName };