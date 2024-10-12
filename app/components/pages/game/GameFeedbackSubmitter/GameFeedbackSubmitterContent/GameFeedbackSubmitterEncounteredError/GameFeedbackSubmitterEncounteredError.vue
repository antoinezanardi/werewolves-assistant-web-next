<template>
  <div
    id="game-feedback-submitter-encountered-error-container"
    class="flex flex-col gap-3 items-center justify-center"
  >
    <label
      id="game-feedback-submitter-encountered-error-label"
      class="font-bold text-center text-xl"
      for="game-feedback-submitter-encountered-error-input"
    >
      <FontAwesomeIcon
        class="mr-1 text-red-500"
        icon="bug"
      />

      {{ $t("components.GameFeedbackSubmitterEncounteredError.wasEverythingAllRight") }}
    </label>

    <PrimeVueToggleButton
      id="game-feedback-submitter-encountered-error-input"
      v-model="hasEncounteredError"
      class="!border-0"
      :class="toggleButtonClasses"
      :disabled="isToggleButtonDisabled"
      :off-label="$t('components.GameFeedbackSubmitterEncounteredError.gameWasStable')"
      :on-label="$t('components.GameFeedbackSubmitterEncounteredError.gameEncounteredError')"
    >
      <template #icon>
        <FontAwesomeIcon
          id="toggle-button-icon"
          class="fa-2x"
          :icon="toggleButtonIcon"
        />
      </template>
    </PrimeVueToggleButton>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import { useGameStore } from "~/stores/game/useGameStore";

const hasEncounteredError = defineModel<boolean>({ required: true });

const gameStore = useGameStore();
const { creatingGameFeedbackStatus } = storeToRefs(gameStore);

const toggleButtonIcon = computed<string>(() => (hasEncounteredError.value ? "bug" : "check"));

const toggleButtonClasses = computed<string>(() => (hasEncounteredError.value ? "!bg-error" : "!bg-success"));

const isToggleButtonDisabled = computed<boolean>(() => creatingGameFeedbackStatus.value === "pending");
</script>