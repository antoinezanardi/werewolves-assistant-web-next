<template>
  <div
    id="game-event-flipping-player-card"
    class="flex flex-col items-center"
  >
    <RoleFlippingImage
      id="game-event-flipping-player-role"
      :alt="alt"
      :class="imageClasses"
      definition="normal"
      :role-name="playerToDisplay?.role.current"
      sizes="200px"
      :svg-icon-path="props.svgIconPath"
    />

    <Transition
      mode="out-in"
      name="fade"
    >
      <h2
        v-if="playerToDisplay"
        id="player-name"
        :key="playerToDisplay.name"
        class="text-center"
      >
        {{ playerToDisplay.name }}
      </h2>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { GameEventFlippingPlayerCardProps } from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/game-event-flipping-player-card.types";
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameEventFlippingPlayerCardProps>();

const playerIndex = ref<number>(0);
const playerToDisplay = computed<Player | undefined>(() => props.players[playerIndex.value]);

function flipPlayerCard(): void {
  if (playerIndex.value === props.players.length - 1) {
    playerIndex.value = 0;

    return;
  }
  playerIndex.value++;
}

function flipPlayerCardEachInterval(): void {
  const intervalInMs = 1500;

  if (props.players.length === 0) {
    return;
  }
  window.setInterval(flipPlayerCard, intervalInMs);
}

flipPlayerCardEachInterval();
</script>