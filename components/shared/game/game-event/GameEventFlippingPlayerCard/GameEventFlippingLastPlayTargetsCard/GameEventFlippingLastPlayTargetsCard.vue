<template>
  <div class="flex h-full items-center justify-center">
    <GameEventFlippingPlayerCard
      id="game-event-flipping-player-card"
      :players="targetedPlayers"
      :svg-icon-path="svgIconPath"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GameEventFlippingLastPlayTargetsCard } from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/game-event-flipping-last-play-targets-card.types";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

defineProps<GameEventFlippingLastPlayTargetsCard>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const targetedPlayers = computed<Player[]>(() => {
  if (!game.value.lastGameHistoryRecord?.play.targets) {
    return [];
  }
  return game.value.lastGameHistoryRecord.play.targets.map(target => target.player);
});
</script>