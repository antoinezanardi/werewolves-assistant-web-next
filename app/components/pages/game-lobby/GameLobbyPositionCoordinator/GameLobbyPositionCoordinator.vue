<template>
  <VuePrimeDialog
    id="game-lobby-position-coordinator"
    block-scroll
    content-class="w-x-screen-9/10 max-w-x-screen-9/10"
    dismissable-mask
    :draggable="false"
    modal
    :pt="{
      'root': 'h-9/10',
      'icons': 'pb-2',
      'header': '!py-2',
      'content': 'w-x-screen-9/10 max-w-x-screen-9/10 h-full !py-0',
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
        icon-class="fa fa-users text-primary"
        :title="$t('components.GameLobbyPositionCoordinator.positionCoordinator')"
      />
    </template>

    <div
      id="game-lobby-position-coordinator-content"
      class="flex gap-2 h-full"
    >
      <GameLobbyPositionCoordinatorGraph class="w-7/12"/>

      <GameLobbyPositionCoordinatorSorter class="w-5/12"/>
    </div>

    <template #footer>
      <DialogFooterCloseButtonOnly
        id="game-lobby-position-coordinator-footer"
        @close-dialog="close"
      />
    </template>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
import type { GameLobbyPositionCoordinatorExposed } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/game-lobby-position-coordinator.types";
import GameLobbyPositionCoordinatorGraph from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorGraph/GameLobbyPositionCoordinatorGraph.vue";
import GameLobbyPositionCoordinatorSorter from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorter.vue";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

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