<template>
  <VuePrimeButton
    id="game-lobby-header-position-coordinator-button"
    icon="fa fa-users animate__animated animate__slow animate__heartBeat"
    :label="$t('components.GameLobbyHeaderPositionCoordinatorButton.positionCoordinator')"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="clickHandler"
  />
</template>

<script setup lang="ts">
import type { GameLobbyHeaderPositionCoordinatorButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/game-lobby-header-position-coordinator-button.types";

const emit = defineEmits<GameLobbyHeaderPositionCoordinatorButtonEmits>();

function clickHandler(): void {
  emit("positionCoordinatorButtonClick");
}
</script>