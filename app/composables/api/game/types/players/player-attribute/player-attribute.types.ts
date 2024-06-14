import type { TupleToUnion } from "type-fest";

import type { PLAYER_ATTRIBUTE_NAMES } from "~/composables/api/game/constants/player/player-attribute/player-attribute.constants";

type PlayerAttributeName = TupleToUnion<typeof PLAYER_ATTRIBUTE_NAMES>;

export type { PlayerAttributeName };