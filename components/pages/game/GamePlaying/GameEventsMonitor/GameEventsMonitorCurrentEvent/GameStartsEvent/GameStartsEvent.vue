<template>
  <GameEventWithTexts
    id="game-starts-event"
    :texts="gameStartsEventTexts"
  >
    GAME STARTS EVENT
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";

const gameStartsEventTexts = computed<string[]>(() => [
  "Game starts",
  "Game starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts starts",
  "Game starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts startsGame starts starts",
]);
</script>