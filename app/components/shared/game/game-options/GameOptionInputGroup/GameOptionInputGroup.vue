<template>
  <div
    id="game-option-input-group-container"
  >
    <div
      id="game-option-input-group"
      class="flex flex-col gap-2 items-center justify-between md:flex-row"
    >
      <h3
        id="game-option-label"
        class="flex gap-2 items-center md:text-left md:w-8/12 text-center w-full"
      >
        <FontAwesomeIcon
          id="game-option-label-icon"
          class="text-center"
          :class="optionIconClass"
          :icon="optionIcon"
        />

        <span class="grow md:pe-0 pe-3 text-pretty">
          {{ optionLabel }}
        </span>
      </h3>

      <div
        id="game-option-input"
        class="md:w-4/12 w-full"
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