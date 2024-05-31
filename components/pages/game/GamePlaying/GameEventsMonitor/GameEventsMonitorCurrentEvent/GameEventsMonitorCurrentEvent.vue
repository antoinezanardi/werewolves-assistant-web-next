<template>
  <div
    id="game-events-monitor-current-event-container"
    class="h-full"
  >
    <transition
      mode="out-in"
      name="fade"
    >
      <Component
        :is="currentGameEventTypeComponent"
        v-if="currentGameEventTypeComponent"
        id="game-events-monitor-current-event"
        :key="currentGameEventIndex"
        class="h-full"
        :event="currentGameEvent"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GameEventsMonitorEventTypeComponent } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/GamePlayerDiesEvent.vue";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import type { GameEventType } from "~/stores/game/game-event/types/game-event.types";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const gameEventsStore = useGameEventsStore();
const { currentGameEvent, currentGameEventIndex } = storeToRefs(gameEventsStore);

const currentGameEventTypeComponent = computed<GameEventsMonitorEventTypeComponent | undefined>(() => {
  const currentGameEventTypeComponents: Record<GameEventType, GameEventsMonitorEventTypeComponent> = {
    "game-starts": GameStartsEvent,
    "game-phase-starts": GamePhaseStartsEvent,
    "game-turn-starts": GameTurnStartsEvent,
    "player-dies": GamePlayerDiesEvent,
  };
  if (!currentGameEvent.value) {
    return undefined;
  }
  return currentGameEventTypeComponents[currentGameEvent.value.type];
});
</script>