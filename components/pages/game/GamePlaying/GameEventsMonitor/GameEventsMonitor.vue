<template>
  <div
    id="game-events-monitor"
    class="flex flex-col h-full w-full"
  >
    <GameEventsMonitorCurrentEvent
      id="game-events-monitor-current-event"
      class="grow"
    />

    <GameEventsMonitorFooter id="game-events-monitor-footer"/>
  </div>
</template>

<script setup lang="ts">
import GameEventsMonitorCurrentEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameEventsMonitorCurrentEvent.vue";
import GameEventsMonitorFooter from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorFooter/GameEventsMonitorFooter.vue";
</script>