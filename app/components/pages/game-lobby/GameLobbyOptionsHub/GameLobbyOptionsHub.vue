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
      'content': 'w-x-screen-9/10 max-w-x-screen-9/10 h-full !py-0 !px-0 md:!px-2',
      'footer': '!py-2'
    }"
    :visible="isVisible"
    @update:visible="close"
  >
    <template #header>
      <DialogHeaderTitleOnly
        id="game-lobby-options-hub-header"
        icon="magic-wand-sparkles"
        icon-class="text-primary"
        :title="$t('components.GameLobbyOptionsHub.gameOptions')"
      />
    </template>

    <template #default>
      <GameLobbyOptionsHubContent id="game-lobby-options-hub-content"/>
    </template>

    <template #footer>
      <GameLobbyOptionsHubFooter
        id="game-lobby-options-hub-footer"
        @close-dialog="close"
      />
    </template>
  </PrimeVueDialog>
</template>

<script setup lang="ts">
import GameLobbyOptionsHubFooter from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubFooter/GameLobbyOptionsHubFooter.vue";
import GameLobbyOptionsHubContent from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubTabView.vue";
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