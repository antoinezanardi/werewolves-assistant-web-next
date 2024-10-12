<template>
  <div
    id="game-feedback-submitter-review-container"
    class="flex flex-col gap-3"
  >
    <label
      id="game-feedback-submitter-review-label"
      class="font-bold ps-2 text-xl"
    >
      <FontAwesomeIcon
        class="mr-1 text-red-500"
        icon="heart"
      />

      {{ $t("components.GameFeedbackSubmitterReview.quickReview") }}
    </label>

    <PrimeVueFloatLabel variant="on">
      <PrimeVueTextarea
        id="game-feedback-submitter-review-input"
        v-model="review"
        auto-resize
        cols="30"
        :disabled="isReviewTextareaDisabled"
        fluid
        max-length="1000"
        rows="5"
      />

      <label
        id="game-feedback-submitter-review-input-label"
        for="game-feedback-submitter-review-input"
      >
        {{ $t("components.GameFeedbackSubmitterReview.thisIsOptional") }}
      </label>
    </PrimeVueFloatLabel>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import { useGameStore } from "~/stores/game/useGameStore";

const review = defineModel<string>();

const gameStore = useGameStore();
const { creatingGameFeedbackStatus } = storeToRefs(gameStore);

const isReviewTextareaDisabled = computed<boolean>(() => creatingGameFeedbackStatus.value === "pending");
</script>