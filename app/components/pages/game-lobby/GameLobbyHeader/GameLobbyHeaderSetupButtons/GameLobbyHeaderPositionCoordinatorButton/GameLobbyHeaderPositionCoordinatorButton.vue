<template>
  <PrimeVueButton
    id="game-lobby-header-position-coordinator-button"
    :label="$t('components.GameLobbyHeaderPositionCoordinatorButton.positionCoordinator')"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromGamePositionCoordinatorButton"
  >
    <template #icon>
      <FontAwesomeIcon
        class="animate__animated animate__heartBeat animate__slow"
        icon="users"
      />
    </template>
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