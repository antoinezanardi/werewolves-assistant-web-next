<template>
  <div class="align-items-center d-flex flex-column player-card">
    <slot name="header"/>

    <button
      class="d-flex player-card-selector"
      type="button"
      @click.prevent="emitPlayerCardSelectorClickEvent"
    >
      <RoleImage
        :alt="getPlayerCardRoleImageAlt()"
        class="player-card-role-image"
        :role-name="playerRole"
      />
    </button>

    <span class="player-card-name">{{ playerName }}</span>

    <slot name="footer"/>
  </div>
</template>

<script setup lang="ts">
import type { PlayerCardProps } from "~/components/shared/game/player/PlayerCard/player-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = defineProps<PlayerCardProps>();

const emit = defineEmits<(e: "playerCardSelectorClick") => void>();

const { t } = useI18n();

function getPlayerCardRoleImageAlt(): string {
  return t("components.PlayerCard.playerCardRoleImageAlt", { playerName: props.playerName });
}

function emitPlayerCardSelectorClickEvent(): void {
  emit("playerCardSelectorClick");
}
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