<template>
  <PrimeVueDialog
    id="game-lobby-position-coordinator"
    block-scroll
    content-class="w-x-screen-9/10 max-w-x-screen-9/10"
    dismissable-mask
    :draggable="false"
    modal
    :pt="{
      'root': `h-9/10 ${SCROLLBAR_STYLING_CLASSES}`,
      'icons': 'pb-2',
      'header': '!py-2',
      'content': 'w-x-screen-9/10 max-w-x-screen-9/10 h-full !py-0 scrollbar-thin',
      'footer': '!py-2'
    }"
    :visible="isVisible"
    @update:visible="close"
  >
    <template
      #header
    >
      <DialogHeaderTitleOnly
        id="game-lobby-position-coordinator-header"
        icon="group-arrows-rotate"
        icon-class="text-primary"
        :title="$t('components.GameLobbyPositionCoordinator.positionCoordinator')"
      />
    </template>

    <div
      id="game-lobby-position-coordinator-content"
      class="flex flex-col gap-2 h-full justify-center md:flex-row"
    >
      <GameLobbyPositionCoordinatorChart
        id="game-lobby-position-coordinator-chart"
        class="hidden lg:w-7/12 md:block md:order-1 md:w-6/12 w-full"
      />

      <GameLobbyPositionCoordinatorSorter
        id="game-lobby-position-coordinator-sorter"
        class="lg:w-5/12 md:order-2 md:w-6/12 w-full"
      />
    </div>

    <template #footer>
      <DialogFooterCloseButtonOnly
        id="game-lobby-position-coordinator-footer"
        @close-dialog="close"
      />
    </template>
  </PrimeVueDialog>
</template>

<script setup lang="ts">
import type { GameLobbyPositionCoordinatorExposed } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/game-lobby-position-coordinator.types";
import GameLobbyPositionCoordinatorChart from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorChart/GameLobbyPositionCoordinatorChart.vue";
import GameLobbyPositionCoordinatorSorter from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorter.vue";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";
import { SCROLLBAR_STYLING_CLASSES } from "~/utils/constants/html-classes.constants";

const isVisible = ref<boolean>(false);

function open(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose<GameLobbyPositionCoordinatorExposed>({
  open,
});
</script>