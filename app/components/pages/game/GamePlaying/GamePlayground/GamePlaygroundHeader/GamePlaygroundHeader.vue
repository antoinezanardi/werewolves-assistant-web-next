<template>
  <div
    id="game-playground-header"
  >
    <div class="flex gap-2 items-center justify-between">
      <GamePlaygroundHeaderPhase class="w-2/12"/>

      <GamePlaygroundHeaderCurrentPlay class="w-6/12"/>

      <GamePlaygroundHeaderCard class="w-2/12"/>
    </div>

    <PrimeVueDivider class="!my-3"/>
  </div>
</template>

<script setup lang="ts">
import GamePlaygroundHeaderCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderCard/GamePlaygroundHeaderCard.vue";
import GamePlaygroundHeaderCurrentPlay
  from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderCurrentPlay/GamePlaygroundHeaderCurrentPlay.vue";
import GamePlaygroundHeaderPhase from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderPhase/GamePlaygroundHeaderPhase.vue";
</script>