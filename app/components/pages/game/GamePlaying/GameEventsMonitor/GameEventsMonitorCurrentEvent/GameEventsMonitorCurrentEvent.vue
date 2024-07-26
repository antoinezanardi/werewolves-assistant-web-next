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
        :key="currentGameEvent?.type"
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
import GameActorMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameActorMayHaveChosenCardEvent/GameActorMayHaveChosenCardEvent.vue";
import GameBearGrowlsOrSleepsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameBearGrowlsOrSleepsEvent/GameBearGrowlsOrSleepsEvent.vue";
import GameCupidHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameCupidHasCharmedEvent/GameCupidHasCharmedEvent.vue";
import GameDeathEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameDeathEvent/GameDeathEvent.vue";
import GameElderHasTakenRevengeEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameElderHasTakenRevengeEvent/GameElderHasTakenRevengeEvent.vue";
import GameFoxMayHaveSniffedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameFoxMayHaveSniffedEvent/GameFoxMayHaveSniffedEvent.vue";
import GameIdiotIsSparedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameIdiotIsSparedEvent/GameIdiotIsSparedEvent.vue";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import GamePiedPiperHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePiedPiperHasCharmedEvent/GamePiedPiperHasCharmedEvent.vue";
import GameScandalmongerMarkIsActiveEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerMarkIsActiveEvent/GameScandalmongerMarkIsActiveEvent.vue";
import GameScandalmongerMayHaveMarkedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerMayHaveMarkedEvent/GameScandalmongerMayHaveMarkedEvent.vue";
import GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import GameSheriffPromotionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffPromotionEvent/GameSheriffPromotionEvent.vue";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import GameThiefMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameThiefMayHaveChosenCardEvent/GameThiefMayHaveChosenCardEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import GameVillagerVillagerIntroductionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameVillagerVillagerIntroductionEvent/GameVillagerVillagerIntroductionEvent.vue";
import GameWildChildHasTransformedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWildChildHasTransformedEvent/GameWildChildHasTransformedEvent.vue";
import GameWolfHoundHasChosenSideEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWolfHoundHasChosenSideEvent/GameWolfHoundHasChosenSideEvent.vue";
import type { GameEventType } from "~/composables/api/game/types/game-event/game-event.types";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const gameEventsStore = useGameEventsStore();
const { currentGameEvent } = storeToRefs(gameEventsStore);

const currentGameEventTypeComponent = computed<GameEventsMonitorEventTypeComponent | undefined>(() => {
  const currentGameEventTypeComponents: Record<GameEventType, GameEventsMonitorEventTypeComponent> = {
    "game-starts": GameStartsEvent,
    "game-phase-starts": GamePhaseStartsEvent,
    "game-turn-starts": GameTurnStartsEvent,
    "villager-villager-introduction": GameVillagerVillagerIntroductionEvent,
    "death": GameDeathEvent,
    "seer-has-seen": GameSeerHasSeenEvent,
    "sheriff-promotion": GameSheriffPromotionEvent,
    "scandalmonger-may-have-marked": GameScandalmongerMayHaveMarkedEvent,
    "accursed-wolf-father-may-have-infected": GameAccursedWolfFatherMayHaveInfectedEvent,
    "pied-piper-has-charmed": GamePiedPiperHasCharmedEvent,
    "cupid-has-charmed": GameCupidHasCharmedEvent,
    "wolf-hound-has-chosen-side": GameWolfHoundHasChosenSideEvent,
    "idiot-is-spared": GameIdiotIsSparedEvent,
    "elder-has-taken-revenge": GameElderHasTakenRevengeEvent,
    "bear-growls": GameBearGrowlsOrSleepsEvent,
    "bear-sleeps": GameBearGrowlsOrSleepsEvent,
    "fox-may-have-sniffed": GameFoxMayHaveSniffedEvent,
    "thief-may-have-chosen-card": GameThiefMayHaveChosenCardEvent,
    "wild-child-has-transformed": GameWildChildHasTransformedEvent,
    "actor-may-have-chosen-card": GameActorMayHaveChosenCardEvent,
    "scandalmonger-mark-is-active": GameScandalmongerMarkIsActiveEvent,
  };
  if (!currentGameEvent.value) {
    return undefined;
  }
  return currentGameEventTypeComponents[currentGameEvent.value.type];
});
</script>