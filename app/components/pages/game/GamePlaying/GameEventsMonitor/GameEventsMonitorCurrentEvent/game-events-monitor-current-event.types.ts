import type GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import type GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameDeathEvent/GameDeathEvent.vue";
import type GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import type GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import type GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import type { GameEvent } from "~/composables/api/game/game-event/game-event.class";

type GameEventsMonitorEventTypeComponent =
  typeof GamePhaseStartsEvent | typeof GamePlayerDiesEvent | typeof GameSeerHasSeenEvent | typeof GameStartsEvent | typeof GameTurnStartsEvent;

type CurrentGameEventProps = {
  event: GameEvent;
};

export type {
  GameEventsMonitorEventTypeComponent,
  CurrentGameEventProps,
};