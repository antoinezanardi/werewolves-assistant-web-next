<template>
  <VuePrimeButtonGroup>
    <GameLobbyHeaderOptionButton
      id="game-lobby-header-options-button"
      @game-options-button-click="handleGameOptionsButtonClick"
    />
  </VuePrimeButtonGroup>
</template>

<script setup lang="ts">
import type { GameLobbyHeaderSetupButtonsEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/game-lobby-header-setup-buttons.types";
import GameLobbyHeaderOptionButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";

const emit = defineEmits<GameLobbyHeaderSetupButtonsEmits>();

function handleGameOptionsButtonClick(): void {
  emit("gameOptionsButtonClick");
}
</script>