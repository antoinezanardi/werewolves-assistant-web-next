<template>
  <div class="flex flex-col items-center player-card position-relative">
    <button
      v-p-tooltip="tooltipContent"
      :aria-label="selectorAriaLabel"
      class="flex player-card-selector"
      type="button"
      @click.prevent="emitPlayerCardSelectorClickEvent"
    >
      <RoleImage
        :alt="getPlayerCardRoleImageAlt()"
        class="player-card-role-image"
        :role-name="playerRole"
      />
    </button>

    <span class="player-card-name truncate">
      {{ playerName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PlayerCardEmits, PlayerCardProps } from "~/components/shared/game/player/PlayerCard/player-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = withDefaults(defineProps<PlayerCardProps>(), { doesShowSelectorTooltip: false });

const emit = defineEmits<PlayerCardEmits>();

const { t } = useI18n();

const tooltipContent = computed<string | undefined>(() => (props.doesShowSelectorTooltip ? props.selectorAriaLabel : undefined));

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

.player-card-name {
  max-width: 100%;
}
</style>