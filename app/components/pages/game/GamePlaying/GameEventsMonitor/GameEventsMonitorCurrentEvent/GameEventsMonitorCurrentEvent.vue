<template>
  <div
    id="game-events-monitor-current-event-container"
    class="h-full"
  >
    <Transition
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
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GameEventsMonitorEventTypeComponent } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameAccursedWolfFatherMayHaveInfectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameAccursedWolfFatherMayHaveInfectedEvent/GameAccursedWolfFatherMayHaveInfectedEvent.vue";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import GamePiedPiperHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePiedPiperHasCharmedEvent/GamePiedPiperHasCharmedEvent.vue";
import GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/GamePlayerDiesEvent.vue";
import GameScandalmongerHasMarkedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerHasMarkedEvent/GameScandalmongerHasMarkedEvent.vue";
import GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import GameSheriffPromotionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffPromotionEvent/GameSheriffPromotionEvent.vue";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import GameVillagerVillagerIntroductionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameVillagerVillagerIntroductionEvent/GameVillagerVillagerIntroductionEvent.vue";
import GameWolfHoundHasChosenSide from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWolfHoundHasChosenSideEvent/GameWolfHoundHasChosenSideEvent.vue";
import type { GameEventType } from "~/stores/game/game-event/types/game-event.types";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const gameEventsStore = useGameEventsStore();
const { currentGameEvent, currentGameEventIndex } = storeToRefs(gameEventsStore);

const currentGameEventTypeComponent = computed<GameEventsMonitorEventTypeComponent | undefined>(() => {
  const currentGameEventTypeComponents: Record<GameEventType, GameEventsMonitorEventTypeComponent> = {
    "game-starts": GameStartsEvent,
    "game-phase-starts": GamePhaseStartsEvent,
    "game-turn-starts": GameTurnStartsEvent,
    "villager-villager-introduction": GameVillagerVillagerIntroductionEvent,
    "player-dies": GamePlayerDiesEvent,
    "seer-has-seen": GameSeerHasSeenEvent,
    "sheriff-promotion": GameSheriffPromotionEvent,
    "scandalmonger-has-marked": GameScandalmongerHasMarkedEvent,
    "accursed-wolf-father-may-have-infected": GameAccursedWolfFatherMayHaveInfectedEvent,
    "pied-piper-has-charmed": GamePiedPiperHasCharmedEvent,
    "wolf-hound-has-chosen-side": GameWolfHoundHasChosenSide,
  };
  if (!currentGameEvent.value) {
    return undefined;
  }
  return currentGameEventTypeComponents[currentGameEvent.value.type];
});
</script>