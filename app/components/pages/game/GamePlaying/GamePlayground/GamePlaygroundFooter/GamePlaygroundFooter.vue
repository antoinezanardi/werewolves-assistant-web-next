<template>
  <div
    id="game-playground-footer"
  >
    <PrimeVueDivider class="!my-2"/>

    <div class="flex justify-center">
      <div class="w-4/12">
        <GamePlaygroundFooterMakePlayButton/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GamePlaygroundFooterMakePlayButton
  from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterMakePlayButton/GamePlaygroundFooterMakePlayButton.vue";
</script>