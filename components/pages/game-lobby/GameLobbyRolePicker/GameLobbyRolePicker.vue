<template>
  <VuePrimeDialog
    id="game-lobby-role-picker"
    v-model:visible="isVisible"
    block-scroll
    dismissable-mask
    modal
  >
    <template #header>
      <GameLobbyRolePickerHeader
        v-if="localPlayer"
        :player="localPlayer"
      />
    </template>

    <div
      v-if="localPlayer"
      id="game-lobby-role-picker-content"
      class="flex gap-2"
    >
      <GameLobbyRolePickerDescription :picked-role="pickedRole"/>

      <GameLobbyRolePickerGrid
        :picked-role="pickedRole"
        @pick-role="pickRole"
      />
    </div>

    <template #footer>
      <GameLobbyRolePickerFooter
        v-if="localPlayer"
        :picked-role="pickedRole"
        :player="localPlayer"
        @player-update="close"
      />
    </template>
  </VuePrimeDialog>
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