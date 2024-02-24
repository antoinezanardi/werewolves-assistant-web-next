<template>
  <div
    id="game-playground"
    class="d-flex flex-column h-100"
  >
    <GamePlaygroundHeader/>

    <GamePlaygroundContent class="d-flex flex-grow-1 h-100"/>

    <GamePlaygroundFooter/>
  </div>
</template>

<script setup lang="ts">
import GamePlaygroundContent from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundContent.vue";
import GamePlaygroundFooter from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooter.vue";
import GamePlaygroundHeader from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeader.vue";
</script>