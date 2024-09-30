<template>
  <div class="flex gap-1 w-full">
    <GameLobbyGroupOrganizerGroupNameInput
      id="game-lobby-group-organizer-first-group-name-input"
      key="first-group-name-input"
      class="text-center w-1/2"
      :group-name="firstGroupName"
      :other-group-name="secondGroupName"
      @update-group-name="setFirstDefaultGroupName"
    />

    <GameLobbyGroupOrganizerGroupNameInput
      id="game-lobby-group-organizer-second-group-name-input"
      key="second-group-name-input"
      class="text-center w-1/2"
      :group-name="secondGroupName"
      :other-group-name="firstGroupName"
      @update-group-name="setSecondDefaultGroupName"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameLobbyGroupOrganizerGroupNameInput from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNameInput/GameLobbyGroupOrganizerGroupNameInput.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();

const { firstGroupName, secondGroupName } = storeToRefs(createGameDtoStore);
const { setFirstDefaultGroupName, setSecondDefaultGroupName } = createGameDtoStore;
</script>