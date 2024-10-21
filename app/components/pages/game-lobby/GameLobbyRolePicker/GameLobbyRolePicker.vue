<template>
  <PrimeVueDialog
    id="game-lobby-role-picker"
    block-scroll
    content-class="w-x-screen-9/10 max-w-x-screen-9/10"
    dismissable-mask
    :draggable="false"
    modal
    :pt="{
      'root': `h-9/10 w-x-screen-9/10 ${SCROLLBAR_STYLING_CLASSES}`,
      'icons': 'pb-2',
      'header': '!py-2',
      'content': '!w-full grow !py-0 md:!px-3 !px-2',
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
      class="flex flex-col gap-2 h-full md:flex-row"
    >
      <GameLobbyRolePickerDescription
        id="game-lobby-role-picker-description"
        class="h-1/2 md:h-full md:w-4/12 overflow-y-auto scrollbar-thin"
        :picked-role="pickedRole"
      />

      <PrimeVueDivider
        class="!my-1 md:!hidden"
      />

      <div
        id="game-lobby-role-picker-grid-container"
        class="h-1/2 md:h-full md:w-8/12 overflow-x-hidden overflow-y-auto p-2 scrollbar-thin"
      >
        <GameLobbyRolePickerSearchInput
          id="game-lobby-role-picker-search-input"
          v-model="searchedRoleInput"
          class="mb-3"
        />

        <GameLobbyRolePickerGrid
          id="game-lobby-role-picker-grid"
          :picked-role="pickedRole"
          :searched-role-input="searchedRoleInput"
          @pick-role="onPickRoleFromGameLobbyRolePickerGrid"
        />
      </div>
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
import GameLobbyRolePickerSearchInput from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerSearchInput/GameLobbyRolePickerSearchInput.vue";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { Role } from "~/composables/api/role/types/role.class";
import { SCROLLBAR_STYLING_CLASSES } from "~/utils/constants/html-classes.constants";

const isVisible = ref<boolean>(false);
const localPlayer = ref<CreateGamePlayerDto>();
const pickedRole = ref<Role>();
const searchedRoleInput = ref<string>();

function openToPickRoleForPlayer(player: CreateGamePlayerDto): void {
  localPlayer.value = CreateGamePlayerDto.create(player);
  pickedRole.value = undefined;
  searchedRoleInput.value = "";
  isVisible.value = true;
}

function onPickRoleFromGameLobbyRolePickerGrid(role: Role): void {
  pickedRole.value = role;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ openToPickRoleForPlayer });
</script>