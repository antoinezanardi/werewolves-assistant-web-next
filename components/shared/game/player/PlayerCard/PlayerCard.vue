<template>
  <div class="flex flex-col items-center player-card position-relative">
    <button
      v-p-tooltip="tooltipContent"
      :aria-label="selectorAriaLabel"
      class="border-4 border-gray-600 flex player-card-selector rounded-lg"
      :class="{ '!border-gray-100': isSelected }"
      type="button"
      @click.prevent="emitPlayerCardSelectorClickEvent"
    >
      <RoleImage
        :alt="getPlayerCardRoleImageAlt()"
        class="player-card-role-image"
        :role-name="playerRole"
      />
    </button>

    <span class="max-w-full player-card-name truncate">
      {{ playerName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PlayerCardEmits, PlayerCardProps } from "~/components/shared/game/player/PlayerCard/player-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = withDefaults(defineProps<PlayerCardProps>(), {
  doesShowSelectorTooltip: false,
  isSelected: false,
});

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
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #747474;
  }
}
</style>