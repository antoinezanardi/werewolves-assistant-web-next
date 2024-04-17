<template>
  <VuePrimeDialog
    id="game-over-history"
    block-scroll
    dismissable-mask
    :draggable="false"
    modal
    :pt="{
      'icons': 'pb-2',
      'header': '!py-2',
      'content': 'max-w-x-screen-9/10 !py-0',
      'footer': '!py-2'
    }"
    :visible="isVisible"
    @update:visible="close"
  >
    <template #header>
      <GameOverHistoryHeader id="game-over-history-header"/>
    </template>

    <template #default>
      <GameOverHistoryRecords id="game-over-history-records"/>

      <h2>FIN DE LA PARTIE</h2>
    </template>

    <template #footer>
      <GameOverHistoryFooter
        id="game-over-history-footer"
        @close-game-history="close"
      />
    </template>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
import GameOverHistoryFooter from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryFooter/GameOverHistoryFooter.vue";
import GameOverHistoryHeader from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryHeader/GameOverHistoryHeader.vue";
import GameOverHistoryRecords from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecords.vue";

const isVisible = ref<boolean>(false);

function showGameHistory(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ showGameHistory });
</script>