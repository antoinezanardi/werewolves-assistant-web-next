<template>
  <VuePrimeButton
    id="game-lobby-header-options-button"
    icon="fa fa-sliders"
    :label="$t('components.GameLobbyHeaderOptionButton.gameOptions')"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="clickHandler"
  />
</template>

<script setup lang="ts">
import type { GameLobbyHeaderOptionsButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/game-lobby-header-options-button.types";

const emit = defineEmits<GameLobbyHeaderOptionsButtonEmits>();

function clickHandler(): void {
  emit("gameOptionsButtonClick");
}
</script>