<template>
  <div
    id="game-event-flipping-players-card"
    class="flex h-full items-center justify-center"
  >
    <GameEventFlippingPlayerCard
      id="game-event-flipping-player-card"
      :alt="alt"
      :image-classes="imageClasses"
      :players="playersToDisplay"
      :svg-icon-path="svgIconPath"
    />
  </div>
</template>

<script setup lang="ts">
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type { GameEventFlippingPlayersCardProps } from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/game-event-flipping-players-card.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameEventFlippingPlayersCardProps>();

const playersToDisplay = computed<Player[]>(() => props.players ?? []);
</script>