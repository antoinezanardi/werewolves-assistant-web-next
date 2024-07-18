<template>
  <div
    id="game-playground-footer"
  >
    <PrimeVueDivider class="!my-2"/>

    <div class="flex justify-center">
      <div class="w-4/12">
        <GamePlaygroundFooterCountdown
          v-if="doesCurrentGamePlayHaveCountdown"
          id="game-playground-footer-countdown"
        />
      </div>

      <div class="w-4/12">
        <GamePlaygroundFooterMakePlayButton/>
      </div>

      <div class="w-4/12"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { TIMED_GAME_PLAY_ACTIONS } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/game-playground-footer-countdown.constants";
import type { TimedGamePlayAction } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/game-playground-footer-countdown.types";
import GamePlaygroundFooterCountdown from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdown.vue";
import GamePlaygroundFooterMakePlayButton from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterMakePlayButton/GamePlaygroundFooterMakePlayButton.vue";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const doesCurrentGamePlayHaveCountdown = computed<boolean>(() => {
  if (!game.value.currentPlay) {
    return false;
  }
  return TIMED_GAME_PLAY_ACTIONS.includes(game.value.currentPlay.action as TimedGamePlayAction);
});
</script>