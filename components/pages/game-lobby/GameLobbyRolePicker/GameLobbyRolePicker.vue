<template>
  <VuePrimeDialog
    id="game-lobby-role-picker"
    v-model:is-visible="isVisible"
    block-scroll
    dismissable-mask
    modal
  >
    <template #header>
      <GameLobbyRolePickerHeader/>
    </template>

    <div id="game-lobby-role-picker-content">
      <GameLobbRolePicker
        <
        div
      >
        <template #footer>
          <GameLobbyRolePickerFooter/>
        </template>
      </gamelobbrolepicker>
    </div>
  </VuePrimeDialog>
</template>

<script setup lang="ts">
import GameLobbyRolePickerFooter from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/GameLobbyRolePickerFooter.vue";
import GameLobbyRolePickerHeader from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/GameLobbyRolePickerHeader.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";

const isVisible = ref<boolean>(false);
const player = ref<CreateGamePlayerDto>();

function openToPickRoleForPlayer(selectedPlayer: CreateGamePlayerDto): void {
  player.value = selectedPlayer;
  isVisible.value = true;
}

defineExpose({ openToPickRoleForPlayer });
</script>