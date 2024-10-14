<template>
  <div
    id="game-over-actions"
    class="flex flex-col gap-2 justify-center md:flex-row md:gap-8 w-full"
  >
    <GameOverCreateNewGameButton
      id="game-over-create-new-game-button"
    />

    <PrimeVueButton
      id="show-game-history-button"
      :label="showGameHistoryTextButton"
      :loading="!gameHistoryRecords.length"
      severity="help"
      @click="onClickFromShowHistoryButton"
    >
      <template #icon>
        <FontAwesomeIcon
          icon="clock-rotate-left"
        />
      </template>
    </PrimeVueButton>

    <GameFeedbackSubmitterButton
      id="game-feedback-submitter-button"
      @game-feedback-submitter-button-click="onClickFromGameFeedbackSubmitterButton"
    />
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import GameFeedbackSubmitterButton from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterButton/GameFeedbackSubmitterButton.vue";
import type { GameOverActionsEmits } from "~/components/pages/game/GameOver/GameOverActions/game-over-actions.types";
import GameOverCreateNewGameButton from "~/components/pages/game/GameOver/GameOverActions/GameOverCreateNewGameButton/GameOverCreateNewGameButton.vue";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";

const emit = defineEmits<GameOverActionsEmits>();

const gameHistoryRecordsStore = useGameHistoryRecordsStore();
const { gameHistoryRecords } = storeToRefs(gameHistoryRecordsStore);

const { t } = useI18n();

const showGameHistoryTextButton = computed<string>(() => {
  if (gameHistoryRecords.value.length) {
    return t("components.GameOverActions.showGameHistory");
  }
  return t("components.GameOverActions.loadingGameHistory");
});

function onClickFromShowHistoryButton(): void {
  emit("gameHistoryButtonClick");
}

function onClickFromGameFeedbackSubmitterButton(): void {
  emit("gameFeedbackSubmitterButtonClick");
}
</script>