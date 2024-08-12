<template>
  <div
    id="game-playing"
    class="flex"
  >
    <GameTeamSide
      class="flex-none w-2/12"
      data-testid="villagers-side"
      side="villagers"
    />

    <div class="!max-w-2/3 game-playground-container px-2 w-8/12">
      <Transition
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
      </Transition>
    </div>

    <GameTeamSide
      class="flex-none w-2/12"
      data-testid="werewolves-side"
      side="werewolves"
    />

    <GamePlayingBeforeLeaveConfirmDialog/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventsMonitor from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitor.vue";
import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import GamePlayingBeforeLeaveConfirmDialog from "~/components/pages/game/GamePlaying/GamePlayingBeforeLeaveConfirmDialog/GamePlayingBeforeLeaveConfirmDialog.vue";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const gameEventsStore = useGameEventsStore();
const { currentGameEvent } = storeToRefs(gameEventsStore);

const audioStore = useAudioStore();
const { playRandomGamePhaseBackgroundAudio, fadeOutPlayingBackgroundAudio } = audioStore;

playRandomGamePhaseBackgroundAudio(game.value.phase.name);

onUnmounted(fadeOutPlayingBackgroundAudio);
</script>