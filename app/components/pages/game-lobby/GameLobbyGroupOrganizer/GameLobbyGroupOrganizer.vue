<template>
  <PrimeVueDialog
    id="game-lobby-group-organizer"
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
        id="game-lobby-group-organizer-header"
        icon="users"
        icon-class="text-primary"
        :title="$t('components.GameLobbyGroupOrganizer.groupOrganizer')"
      />
    </template>

    <GameLobbyGroupOrganizerContent
      id="game-lobby-group-organizer-content"
      class="h-full"
    />

    <template #footer>
      <DialogFooterCloseButtonOnly
        id="game-lobby-group-organizer-footer"
        @close-dialog="close"
      />
    </template>
  </PrimeVueDialog>
</template>

<script setup lang="ts">
import type { GameLobbyGroupOrganizerExposed } from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/game-lobby-group-organizer.types";
import GameLobbyGroupOrganizerContent from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerContent.vue";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

const isVisible = ref<boolean>(false);

function open(): void {
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose<GameLobbyGroupOrganizerExposed>({
  open,
});
</script>