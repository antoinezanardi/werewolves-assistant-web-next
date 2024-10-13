<template>
  <div
    id="game-feedback-submitter-content"
  >
    <form class="flex flex-col gap-2">
      <div class="flex flex-col gap-4 justify-around md:flex-row">
        <GameFeedbackSubmitterRating
          id="game-feedback-submitter-rating"
          v-model="createGameFeedbackDto.score"
          class="w-auto"
        />

        <GameFeedbackSubmitterEncounteredError
          id="game-feedback-submitter-encountered-error"
          v-model="createGameFeedbackDto.hasEncounteredError"
          class="w-auto"
        />
      </div>

      <PrimeVueDivider/>

      <GameFeedbackSubmitterReview
        id="game-feedback-submitter-review"
        v-model="createGameFeedbackDto.review"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import GameFeedbackSubmitterEncounteredError from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterEncounteredError/GameFeedbackSubmitterEncounteredError.vue";
import GameFeedbackSubmitterRating from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterRating/GameFeedbackSubmitterRating.vue";
import GameFeedbackSubmitterReview from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterReview/GameFeedbackSubmitterReview.vue";
import type { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";

const createGameFeedbackDto = defineModel<CreateGameFeedbackDto>({ required: true });
</script>