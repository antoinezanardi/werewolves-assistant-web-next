<template>
  <div
    id="game-over-history-footer"
    class="w-full"
  >
    <VuePrimeDivider class="!my-2"/>

    <div class="flex justify-end w-full">
      <VuePrimeButton
        id="game-history-footer-close-button"
        :label="$t('shared.actions.close')"
        severity="secondary"
        size="small"
        @click="closeGameHistory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryFooterEmits } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryFooter/game-over-history-footer.types";

const emit = defineEmits<GameOverHistoryFooterEmits>();

function closeGameHistory(): void {
  emit("closeGameHistory");
}
</script>