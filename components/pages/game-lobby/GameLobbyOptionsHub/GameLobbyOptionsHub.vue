<template>
  <VuePrimeDialog
    id="game-lobby-role-picker"
    block-scroll
    content-class="w-x-screen-9/10 max-w-x-screen-9/10"
    dismissable-mask
    :draggable="false"
    modal
    :pt="{
      'root': 'h-9/10',
      'icons': 'pb-2',
      'header': '!py-2',
      'content': 'w-x-screen-9/10 max-w-x-screen-9/10 !py-0',
      'footer': '!py-2'
    }"
    :visible="isVisible"
    @update:visible="close"
  >
    <template #header>
      <GameLobbyOptionsHubHeader id="game-lobby-options-hub-header"/>
    </template>

    <template #default>
      coucou
    </template>

    <template #footer>
      <CloseButtonOnlyDialogFooter
        id="close-button-only-dialog-footer"
        @close-dialog="close"
      />
    </template>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
import GameLobbyOptionsHubHeader from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubHeader/GameLobbyOptionsHubHeader.vue";
import CloseButtonOnlyDialogFooter from "~/components/shared/dialogs/CloseButtonOnlyDialogFooter/CloseButtonOnlyDialogFooter.vue";

const isVisible = ref<boolean>(false);

function open(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ open });
</script>