<template>
  <PrimeVueButton
    id="game-lobby-header-position-coordinator-button"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromGamePositionCoordinatorButton"
  >
    <FontAwesomeIcon
      class="animate__animated animate__heartBeat animate__slow"
      icon="users"
    />

    <span>
      {{ $t('components.GameLobbyHeaderPositionCoordinatorButton.positionCoordinator') }}
    </span>
  </PrimeVueButton>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameLobbyHeaderPositionCoordinatorButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/game-lobby-header-position-coordinator-button.types";

const emit = defineEmits<GameLobbyHeaderPositionCoordinatorButtonEmits>();

function onClickFromGamePositionCoordinatorButton(): void {
  emit("positionCoordinatorButtonClick");
}
</script>