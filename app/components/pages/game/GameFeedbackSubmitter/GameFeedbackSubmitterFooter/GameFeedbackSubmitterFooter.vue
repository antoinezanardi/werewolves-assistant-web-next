<template>
  <div
    id="game-feedback-submitter-footer"
    class="w-full"
  >
    <PrimeVueDivider class="!my-2"/>

    <div class="flex justify-between w-full">
      <div class="hidden md:block md:w-1/12"/>

      <PrimeVueButton
        id="game-feedback-submitter-footer-submit-button"
        :disabled="!canFeedbackBeSubmitted"
        :label="$t('components.GameFeedbackSubmitterFooter.submitFeedback')"
        :loading="isSubmitButtonLoading"
        severity="primary"
        size="large"
        @click="onClickFromGameFeedbackSubmitterFooterButton"
      >
        <template #icon>
          <FontAwesomeIcon
            icon="star"
          />
        </template>
      </PrimeVueButton>

      <div class="flex justify-end md:w-1/12 w-auto">
        <PrimeVueButton
          id="game-feedback-submitter-footer-close-button"
          :disabled="isSubmitButtonLoading"
          :label="$t('shared.actions.close')"
          severity="secondary"
          size="small"
          @click="closeDialog"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { GameFeedbackSubmitterFooterEmits, GameFeedbackSubmitterFooterProps } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterFooter/game-feedback-submitter-footer.types";
import { usePrimeVueToasts } from "~/composables/prime-vue/usePrimeVueToasts";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GameFeedbackSubmitterFooterProps>();

const emit = defineEmits<GameFeedbackSubmitterFooterEmits>();

const { addSuccessToast } = usePrimeVueToasts();

const { t } = useI18n();

const gameStore = useGameStore();
const { createGameFeedback } = gameStore;
const { creatingGameFeedbackStatus } = storeToRefs(gameStore);

const isSubmitButtonLoading = computed<boolean>(() => creatingGameFeedbackStatus.value === "pending");

const canFeedbackBeSubmitted = computed<boolean>(() => props.createGameFeedbackDto.score > 0 && !isSubmitButtonLoading.value);

async function onClickFromGameFeedbackSubmitterFooterButton(): Promise<void> {
  await createGameFeedback(props.createGameFeedbackDto);
  addSuccessToast({
    summary: t("components.GameFeedbackSubmitterFooter.feedbackSubmitted"),
    detail: t("components.GameFeedbackSubmitterFooter.thanksForFeedback"),
  });
  closeDialog();
}

function closeDialog(): void {
  emit("closeDialog");
}
</script>