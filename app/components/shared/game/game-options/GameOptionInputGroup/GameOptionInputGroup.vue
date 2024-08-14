<template>
  <div
    id="game-option-input-group-container"
  >
    <div
      id="game-option-input-group"
      class="flex gap-2 items-center justify-between"
    >
      <h3
        id="game-option-label"
        class="w-8/12"
      >
        <FontAwesomeIcon
          id="game-option-label-icon"
          class="me-2"
          :class="optionIconClass"
          :icon="optionIcon"
        />

        <span>
          {{ optionLabel }}
        </span>
      </h3>

      <div
        id="game-option-input"
        class="w-4/12"
      >
        <slot/>
      </div>
    </div>

    <p
      id="game-option-description"
      class="italic mt-3 text-gray-400"
    >
      {{ optionDescription }}
    </p>

    <PrimeVueDivider
      v-if="doesHaveBottomDivider"
      id="game-option-bottom-divider"
      class="!my-4"
    />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameOptionInputGroupProps } from "~/components/shared/game/game-options/GameOptionInputGroup/game-option-input-group.types";

withDefaults(defineProps<GameOptionInputGroupProps>(), { doesHaveBottomDivider: false });

defineSlots<{
  default: () => void;
}>();
</script>