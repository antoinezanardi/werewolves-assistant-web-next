<template>
  <div
    id="game-playing"
    class="flex"
  >
    <GameTeamSide
      class="flex-none w-2/12"
      side="villagers"
    />

    <div class="game-playground-container px-2 w-8/12">
      <transition
        mode="out-in"
        name="fade"
      >
        <GameEventsMonitor
          v-if="currentGameEvent"
          id="game-events-monitor"
        />

        <GamePlayground
          v-else
          id="game-playground"
        />
      </transition>
    </div>

    <GameTeamSide
      class="flex-none w-2/12"
      side="werewolves"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventsMonitor from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitor.vue";
import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const gameEventsStore = useGameEventsStore();
const { currentGameEvent } = storeToRefs(gameEventsStore);
</script>

<style lang="scss" scoped>
.game-playground-container {
  max-width: 66.66666% !important;
}
</style>