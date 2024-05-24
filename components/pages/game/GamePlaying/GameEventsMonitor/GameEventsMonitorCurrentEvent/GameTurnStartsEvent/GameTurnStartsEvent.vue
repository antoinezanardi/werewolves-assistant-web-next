<template>
  <Component
    :is="gameTurnStartsEventTypeComponentToRender"
    id="game-turn-starts-event"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { GAME_PLAY_SOURCE_NAME_TURN_STARTS_EVENT_COMPONENTS } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/game-turn-starts-event.constants";
import type { GameTurnStartsEventTypeComponent } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/game-turn-starts-event.types";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const gameTurnStartsEventTypeComponentToRender = computed<GameTurnStartsEventTypeComponent | undefined>(() => {
  const { currentPlay } = game.value;

  return currentPlay?.source ? GAME_PLAY_SOURCE_NAME_TURN_STARTS_EVENT_COMPONENTS[currentPlay.source.name] : undefined;
});
</script>