<template>
  <VuePrimeDialog
    id="game-lobby-role-picker"
    block-scroll
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
    <template #header>
      <GameLobbyOptionsHubHeader id="game-lobby-options-hub-header"/>
    </template>

    <template #default>
      <GameLobbyOptionsHubContent id="game-lobby-options-hub-content"/>
    </template>

    <template #footer>
      <DialogFooterCloseButtonOnly
        id="close-button-only-dialog-footer"
        @close-dialog="close"
      />
    </template>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
import GameLobbyOptionsHubContent from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubTabView.vue";
import GameLobbyOptionsHubHeader from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubHeader/GameLobbyOptionsHubHeader.vue";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";

const isVisible = ref<boolean>(false);

function open(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ open });
</script>