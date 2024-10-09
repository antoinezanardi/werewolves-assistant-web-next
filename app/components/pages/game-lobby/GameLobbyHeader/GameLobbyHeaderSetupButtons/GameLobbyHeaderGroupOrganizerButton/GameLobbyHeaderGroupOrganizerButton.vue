<template>
  <PrimeVueButton
    id="game-lobby-header-group-organizer-button"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromGroupOrganizerButton"
  >
    <FontAwesomeIcon
      class="animate__animated animate__heartBeat animate__slow"
      icon="users"
    />

    <span
      id="game-lobby-header-group-organizer-button-text"
      class="hidden md:inline"
    >
      {{ $t('components.GameLobbyHeaderGroupOrganizerButton.groupOrganizer') }}
    </span>

    <FontAwesomeIcon
      v-if="!arePlayerGroupsSetForPrejudicedManipulatorIfPresent"
      id="player-groups-not-set-warning-icon"
      beat
      icon="exclamation-circle"
    />
  </PrimeVueButton>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import type { GameLobbyHeaderGroupOrganizerButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderGroupOrganizerButton/game-lobby-header-group-organizer-button.types";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyHeaderGroupOrganizerButtonEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);

const { arePlayerGroupsSetForPrejudicedManipulatorIfPresent } = useCreateGameDtoValidation(createGameDto);

function onClickFromGroupOrganizerButton(): void {
  emit("groupOrganizerButtonClick");
}
</script>