<template>
  <PrimeVueDialog
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
    <template
      #header
    >
      <GameLobbyRolePickerHeader
        id="game-lobby-role-picker-header"
        :player="localPlayer"
      />
    </template>

    <div
      id="game-lobby-role-picker-content"
      class="flex gap-2 h-full"
    >
      <GameLobbyRolePickerDescription
        id="game-lobby-role-picker-description"
        class="overflow-y-scroll w-4/12"
        :picked-role="pickedRole"
      />

      <GameLobbyRolePickerGrid
        id="game-lobby-role-picker-grid"
        class="overflow-y-scroll w-8/12"
        :picked-role="pickedRole"
        @pick-role="pickRole"
      />
    </div>

    <template #footer>
      <GameLobbyRolePickerFooter
        id="game-lobby-role-picker-footer"
        :picked-role="pickedRole"
        :player="localPlayer"
        @player-update="close"
      />
    </template>
  </PrimeVueDialog>
</template>

<script setup lang="ts">
import GameLobbyRolePickerDescription from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescription.vue";
import GameLobbyRolePickerFooter from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/GameLobbyRolePickerFooter.vue";
import GameLobbyRolePickerGrid from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGrid.vue";
import GameLobbyRolePickerHeader from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/GameLobbyRolePickerHeader.vue";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { Role } from "~/composables/api/role/types/role.class";

const isVisible = ref<boolean>(false);
const localPlayer = ref<CreateGamePlayerDto>();
const pickedRole = ref<Role>();

function openToPickRoleForPlayer(player: CreateGamePlayerDto): void {
  localPlayer.value = CreateGamePlayerDto.create(player);
  pickedRole.value = undefined;
  isVisible.value = true;
}

function pickRole(role: Role): void {
  pickedRole.value = role;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ openToPickRoleForPlayer });
</script>