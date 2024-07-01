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
      'content': 'w-x-screen-9/10 max-w-x-screen-9/10 !py-0',
      'footer': '!py-2'
    }"
    :visible="isVisible"
    @update:visible="close"
  >
    <template #header>
      <DialogHeaderTitleOnly
        id="game-over-history-header"
        icon-class="fa fa-clock-rotate-left text-primary"
        :title="$t('components.GameOverHistory.gameHistory')"
      />
    </template>

    <template #default>
      <GameOverHistoryRecords id="game-over-history-records"/>

      <h2
        id="end-of-game-text"
        class="text-center"
      >
        {{ $t("components.GameOverHistory.endOfGame") }}
      </h2>
    </template>

    <template #footer>
      <DialogFooterCloseButtonOnly
        id="dialog-footer-close-button-only"
        @close-dialog="close"
      />
    </template>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
import GameOverHistoryRecords from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecords.vue";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

const isVisible = ref<boolean>(false);

function showGameHistory(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ showGameHistory });
</script>