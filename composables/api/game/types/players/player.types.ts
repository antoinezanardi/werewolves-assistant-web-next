import type { TupleToUnion } from "type-fest";

import type { PLAYER_GROUPS } from "~/composables/api/game/constants/player/player.constants";

type PlayerGroup = TupleToUnion<typeof PLAYER_GROUPS>;

export type { PlayerGroup };