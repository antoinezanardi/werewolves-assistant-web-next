<template>
  <VuePrimeDialog
    id="game-over-history"
    block-scroll
    content-class="w-x-screen-9/10 max-w-x-screen-9/10"
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
      <div class="w-full">
        <h2>
          {{ $t('components.GameOverHistory.gameHistory') }}
        </h2>

        <VuePrimeDivider class="!my-2"/>
      </div>
    </template>

    <template #default>
      <GameOverHistoryRecords/>
    </template>

    <template #footer>
      <div class="w-full">
        <VuePrimeDivider class="!my-2"/>

        <div class="flex justify-end w-full">
          <button
            class="p-button p-button-raised p-button-secondary p-button-sm"
            type="button"
            @click="close"
          >
            {{ $t('shared.actions.close') }}
          </button>
        </div>
      </div>
    </template>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
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