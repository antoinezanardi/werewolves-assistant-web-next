import type { TupleToUnion } from "type-fest";

import type { PLAYER_INTERACTION_TYPES } from "~/composables/api/game/constants/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.constants";

type PlayerInteractionType = TupleToUnion<typeof PLAYER_INTERACTION_TYPES>;

export type { PlayerInteractionType };