<template>
  <div
    id="game-over-actions"
    class="flex gap-8 justify-center w-full"
  >
    <NuxtLink
      id="new-game-button"
      class="p-button p-button-raised"
      to="/game-lobby"
    >
      <span class="fa fa-play-circle me-2"/>

      <span>
        {{ $t('components.GameOverActions.createAnotherGame') }}
      </span>
    </NuxtLink>

    <VuePrimeButton
      id="show-game-history-button"
      :loading="!gameHistoryRecords.length"
      severity="help"
      @click="showGameHistory"
    >
      <i class="fa fa-clock me-2"/>

      <span>
        {{ showGameHistoryTextButton }}
      </span>
    </VuePrimeButton>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import type { GameOverActionsEmits } from "~/components/pages/game/GameOver/GameOverActions/game-over-actions.types";
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