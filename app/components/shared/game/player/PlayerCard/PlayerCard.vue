<template>
  <div class="flex flex-col items-center player-card position-relative">
    <button
      v-p-tooltip="tooltipContent"
      :alt="getPlayerCardRoleImageAlt()"
      :aria-label="selectorAriaLabel"
      class="border-4 border-gray-600 flex player-card-selector rounded-lg transition-all"
      :class="playerCardClasses"
      :disabled="isDisabled"
      type="button"
      @click.prevent="onClickFromPlayerCardButton"
    >
      <RoleFlippingImage
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
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";

const props = withDefaults(defineProps<PlayerCardProps>(), {
  doesShowSelectorTooltip: false,
  isSelected: false,
  isDisabled: false,
});

const emit = defineEmits<PlayerCardEmits>();

const { t } = useI18n();

const tooltipContent = computed<string | undefined>(() => (props.doesShowSelectorTooltip ? props.selectorAriaLabel : undefined));

const playerCardClasses = computed<Record<string, boolean>>(() => ({
  "!border-gray-100": props.isSelected,
  "hover:border-gray-400": !props.isDisabled,
}));

function getPlayerCardRoleImageAlt(): string {
  return t("components.PlayerCard.playerCardRoleImageAlt", { playerName: props.playerName });
}

function onClickFromPlayerCardButton(): void {
  emit("playerCardSelectorClick");
}
</script>