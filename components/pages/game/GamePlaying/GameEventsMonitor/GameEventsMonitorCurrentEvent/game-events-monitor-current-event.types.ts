import type GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import type GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/GamePlayerDiesEvent.vue";
import type GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import type GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";

type GameEventsMonitorEventTypeComponent =
  typeof GamePhaseStartsEvent | typeof GamePlayerDiesEvent | typeof GameStartsEvent | typeof GameTurnStartsEvent;

export type { GameEventsMonitorEventTypeComponent };