<template>
  <div
    id="game-over"
    class="flex flex-col h-full items-center justify-center"
  >
    <GameOverWinnersText/>
  </div>
</template>

<script setup lang="ts">
import GameOverWinnersText from "~/components/pages/game/GameOver/GameOverWinnersText/GameOverWinnersText.vue";
</script>