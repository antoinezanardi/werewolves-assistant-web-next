<template>
  <div
    id="game-playground-header"
  >
    <div class="flex items-center">
      <GamePlaygroundHeaderPhase class="w-3/12"/>

      <GamePlaygroundHeaderCurrentPlay class="w-6/12"/>

      <div
        id="game-current-play-expected-player-role-image"
        class="flex justify-end w-3/12"
      >
        CARTE
      </div>
    </div>

    <VuePrimeDivider class="!my-3"/>
  </div>
</template>

<script setup lang="ts">
import GamePlaygroundHeaderCurrentPlay
  from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderCurrentPlay/GamePlaygroundHeaderCurrentPlay.vue";
import GamePlaygroundHeaderPhase from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderPhase/GamePlaygroundHeaderPhase.vue";
</script>