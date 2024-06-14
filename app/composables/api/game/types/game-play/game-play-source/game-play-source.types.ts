import type { TupleToUnion } from "type-fest";

import type { GAME_PLAY_SOURCE_NAMES } from "~/composables/api/game/constants/game-play/game-play-source/game-play-source.constants";

type GamePlaySourceName = TupleToUnion<typeof GAME_PLAY_SOURCE_NAMES>;

export type { GamePlaySourceName };