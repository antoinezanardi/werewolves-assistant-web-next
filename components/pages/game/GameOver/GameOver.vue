<template>
  <div
    id="game-over"
    class="flex flex-col h-full items-center justify-center"
  >
    <GameOverVictoryText/>
  </div>
</template>

<script setup lang="ts">
import GameOverVictoryText from "~/components/pages/game/GameOver/GameOverVictoryText/GameOverVictoryText.vue";
</script>