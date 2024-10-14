<template>
  <div
    id="game-feedback-submitter-rating-container"
    class="flex flex-col gap-5 items-center justify-center"
  >
    <label
      id="game-feedback-submitter-rating-label"
      class="font-bold text-center text-xl"
      for="game-feedback-submitter-rating"
    >
      {{ $t("components.GameFeedbackSubmitterRating.rating") }}
    </label>

    <PrimeVueRating
      id="game-feedback-submitter-rating"
      :disabled="isRatingDisabled"
      :model-value="score"
      @change="onChangeFromRating"
    >
      <template #onicon>
        <FontAwesomeIcon
          class="fa-2x on-icon"
          :class="ratingOnIconColor"
          icon="star"
        />
      </template>

      <template #officon>
        <FontAwesomeIcon
          class="fa-2x off-icon"
          :class="ratingOnIconColor"
          icon="far fa-star"
        />
      </template>
    </PrimeVueRating>

    <Transition
      mode="out-in"
      name="fade"
    >
      <PrimeVueBadge
        id="rating-description-badge"
        :key="score"
        class="!p-4 font-semibold"
        :severity="ratingDescriptionAndSeverity.severity"
        size="large"
        :value="ratingDescriptionAndSeverity.description"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import { useGameStore } from "~/stores/game/useGameStore";

const score = defineModel<number>({ required: true });

const gameStore = useGameStore();
const { creatingGameFeedbackStatus } = storeToRefs(gameStore);

const { t } = useI18n();

type RatingMetadata = {
  description: string;
  severity: "success" | "warn" | "danger" | "secondary";
};

const ratingOnIconColor = computed<string>(() => {
  const ratingsOnIconColors: Record<number, string> = {
    1: "text-error",
    2: "text-error",
    3: "text-warning",
    4: "text-success",
    5: "text-success",
  };

  return ratingsOnIconColors[score.value] ?? "text-primary";
});

const ratingDescriptionAndSeverity = computed<RatingMetadata>(() => {
  const defaultRatingMetadata: RatingMetadata = {
    description: t("components.GameFeedbackSubmitterRating.pleaseChooseRating"),
    severity: "secondary",
  };
  const ratingsDescriptionAndClasses: Record<number, RatingMetadata> = {
    1: {
      description: t("components.GameFeedbackSubmitterRating.terrible"),
      severity: "danger",
    },
    2: {
      description: t("components.GameFeedbackSubmitterRating.bad"),
      severity: "danger",
    },
    3: {
      description: t("components.GameFeedbackSubmitterRating.average"),
      severity: "warn",
    },
    4: {
      description: t("components.GameFeedbackSubmitterRating.good"),
      severity: "success",
    },
    5: {
      description: t("components.GameFeedbackSubmitterRating.excellent"),
      severity: "success",
    },
  };

  return ratingsDescriptionAndClasses[score.value] ?? defaultRatingMetadata;
});

const isRatingDisabled = computed<boolean>(() => creatingGameFeedbackStatus.value === "pending");

function onChangeFromRating(event: { value: number | null }): void {
  score.value = event.value ?? 0;
}
</script>