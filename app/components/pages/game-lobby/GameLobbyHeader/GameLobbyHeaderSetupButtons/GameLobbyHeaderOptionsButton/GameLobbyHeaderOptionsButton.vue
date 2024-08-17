<template>
  <PrimeVueButton
    id="game-lobby-header-options-button"
    :label="$t('components.GameLobbyHeaderOptionButton.gameOptions')"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromGameOptionsButton"
  >
    <template #icon>
      <FontAwesomeIcon
        icon="sliders"
      />
    </template>
  </PrimeVueButton>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameLobbyHeaderOptionsButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/game-lobby-header-options-button.types";

const emit = defineEmits<GameLobbyHeaderOptionsButtonEmits>();

function onClickFromGameOptionsButton(): void {
  emit("gameOptionsButtonClick");
}
</script>