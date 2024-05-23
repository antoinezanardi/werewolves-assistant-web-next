<template>
  <RoleFlippingImage
    id="role-flipping-image"
    :alt="alt"
    :class="imageClasses"
    definition="normal"
    :role-name="playerToDisplay.role.current"
    sizes="200px"
  />
</template>

<script setup lang="ts">
import type { GameEventFlippingPlayerCardProps } from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/game-event-flipping-player-card.types";
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameEventFlippingPlayerCardProps>();

const playerIndex = ref<number>(0);
const playerToDisplay = computed<Player>(() => props.players[playerIndex.value]);

function flipPlayerCardEachInterval(): void {
  const intervalInMs = 1500;
  if (props.players.length === 0) {
    return;
  }
  setInterval(() => {
    if (playerIndex.value === props.players.length - 1) {
      playerIndex.value = 0;

      return;
    }
    playerIndex.value++;
  }, intervalInMs);
}

flipPlayerCardEachInterval();
</script>