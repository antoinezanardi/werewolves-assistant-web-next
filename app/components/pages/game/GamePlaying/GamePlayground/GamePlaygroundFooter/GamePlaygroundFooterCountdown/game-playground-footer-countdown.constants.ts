import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";

const TIMED_GAME_PLAY_ACTIONS = [
  "meet-each-other",
  "vote",
  "elect-sheriff",
] as const satisfies GamePlayAction[];

export { TIMED_GAME_PLAY_ACTIONS };