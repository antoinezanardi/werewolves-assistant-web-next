import type GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import type { GameEvent } from "~/composables/api/game/game-event/game-event.class";

type GameEventsMonitorEventTypeComponent = typeof GamePhaseStartsEvent;

type CurrentGameEventProps = {
  event: GameEvent;
};

export type {
  GameEventsMonitorEventTypeComponent,
  CurrentGameEventProps,
};