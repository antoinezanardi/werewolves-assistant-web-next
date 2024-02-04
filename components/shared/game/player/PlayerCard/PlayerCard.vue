<template>
  <div class="align-items-center d-flex flex-column player-card">
    <button
      class="d-flex player-card-selector"
      type="button"
    >
      <RoleImage
        alt="Player role"
        class="player-card-role-image"
        :role-name="playerRole"
      />
    </button>

    <span class="player-card-name">{{ playerName }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PlayerCardProps } from "~/components/shared/game/player/PlayerCard/player-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

defineProps<PlayerCardProps>();
</script>

<style lang="scss" scoped>
.player-card-selector {
  border: 3px solid #232323;
  border-radius: 10%;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s;

  &:hover {
    border-color: #747474;
  }
}
</style>