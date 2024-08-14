<template>
  <PrimeVueDialog
    id="game-lobby-options-hub"
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
      <DialogHeaderTitleOnly
        id="game-lobby-options-hub-header"
        icon="sliders"
        icon-class="text-primary"
        :title="$t('components.GameLobbyOptionsHub.gameOptions')"
      />
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
  </PrimeVueDialog>
</template>

<script setup lang="ts">
import GameLobbyOptionsHubContent from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubTabView.vue";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

const isVisible = ref<boolean>(false);

function open(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ open });
</script>