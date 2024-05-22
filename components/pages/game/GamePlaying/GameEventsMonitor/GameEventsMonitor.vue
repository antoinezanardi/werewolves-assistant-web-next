<template>
  <div
    id="game-events-monitor"
    class="flex flex-col h-full w-full"
  >
    <div
      id="game-event-container"
      class="grow"
    >
      coucou
    </div>

    <GameEventsMonitorFooter id="game-events-monitor-footer"/>
  </div>
</template>

<script setup lang="ts">
import GameEventsMonitorFooter from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorFooter/GameEventsMonitorFooter.vue";
</script>