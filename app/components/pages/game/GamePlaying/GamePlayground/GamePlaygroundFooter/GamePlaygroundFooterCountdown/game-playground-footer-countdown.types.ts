import type { TupleToUnion } from "type-fest";
import type { TIMED_GAME_PLAY_ACTIONS } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/game-playground-footer-countdown.constants";

type TimedGamePlayAction = TupleToUnion<typeof TIMED_GAME_PLAY_ACTIONS>;

export type { TimedGamePlayAction };