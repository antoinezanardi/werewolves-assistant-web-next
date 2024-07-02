<template>
  <div
    id="game-over-actions"
    class="flex gap-8 justify-center w-full"
  >
    <GameOverCreateNewGameButton id="game-over-create-new-game-button"/>

    <PrimeVueButton
      id="show-game-history-button"
      :loading="!gameHistoryRecords.length"
      severity="help"
      @click="showGameHistory"
    >
      <i class="fa fa-clock-rotate-left me-2"/>

      <span>
        {{ showGameHistoryTextButton }}
      </span>
    </PrimeVueButton>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

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

function showGameHistory(): void {
  emit("showGameHistory");
}
</script>