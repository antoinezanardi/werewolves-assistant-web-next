<template>
  <div id="game-feedback-submitter-button-container">
    <PrimeVueButton
      v-if="isButtonVisible"
      id="game-feedback-submitter-button"
      class="w-full"
      :label="$t('components.GameFeedbackSubmitterButton.giveFeedback')"
      severity="info"
      @click="onClickFromGameFeedbackSubmitterButton"
    >
      <template #icon>
        <FontAwesomeIcon
          beat-fade
          icon="star"
        />
      </template>
    </PrimeVueButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { GameFeedbackSubmitterButtonEmits } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterButton/game-feedback-submitter-button.types";
import { useGameStore } from "~/stores/game/useGameStore";

const emit = defineEmits<GameFeedbackSubmitterButtonEmits>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const isButtonVisible = computed<boolean>(() => !game.value.feedback);

function onClickFromGameFeedbackSubmitterButton(): void {
  emit("gameFeedbackSubmitterButtonClick");
}
</script>