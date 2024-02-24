import type { TupleToUnion } from "type-fest";

import type { GAME_PLAY_CAUSES, GAME_PLAY_OCCURRENCES, WITCH_POTIONS, GAME_PLAY_ACTIONS } from "~/composables/api/game/constants/game-play/game-play.constants";

type GamePlayAction = TupleToUnion<typeof GAME_PLAY_ACTIONS>;

type GamePlayCause = TupleToUnion<typeof GAME_PLAY_CAUSES>;

type GamePlayOccurrence = TupleToUnion<typeof GAME_PLAY_OCCURRENCES>;

type WitchPotion = TupleToUnion<typeof WITCH_POTIONS>;

export type {
  GamePlayAction,
  GamePlayCause,
  GamePlayOccurrence,
  WitchPotion,
};