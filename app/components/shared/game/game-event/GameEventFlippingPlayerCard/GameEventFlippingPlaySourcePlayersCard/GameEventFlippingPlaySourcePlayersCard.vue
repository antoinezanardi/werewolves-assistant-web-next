<template>
  <div class="flex h-full items-center justify-center">
    <GameEventFlippingPlayerCard
      id="game-event-flipping-player-card"
      :players="expectedPlayersToPlay"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const expectedPlayersToPlay = computed<Player[]>(() => {
  const { currentPlay } = game.value;

  return currentPlay?.source.players ?? [];
});
</script>