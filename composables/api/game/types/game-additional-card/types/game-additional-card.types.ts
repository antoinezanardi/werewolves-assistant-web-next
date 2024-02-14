import type { TupleToUnion } from "type-fest";

import type { GAME_ADDITIONAL_CARDS_RECIPIENTS } from "~/composables/api/game/constants/game-additional-card/game-additional-card.constants";

type GameAdditionalCardRecipientRoleName = TupleToUnion<typeof GAME_ADDITIONAL_CARDS_RECIPIENTS>;

export type { GameAdditionalCardRecipientRoleName };