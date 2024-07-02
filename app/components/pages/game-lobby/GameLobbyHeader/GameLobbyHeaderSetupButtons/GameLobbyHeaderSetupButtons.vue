<template>
  <PrimeVueButtonGroup>
    <TransitionGroup
      name="fade-list"
    >
      <GameLobbyHeaderOptionButton
        id="game-lobby-header-options-button"
        class="fade-list-item"
        @game-options-button-click="handleGameOptionsButtonClick"
      />

      <GameLobbyHeaderPositionCoordinatorButton
        v-if="isPositionCoordinatorVisible"
        id="game-lobby-header-position-coordinator-button"
        class="fade-list-item"
        @position-coordinator-button-click="handlePositionCoordinatorButtonClick"
      />
    </TransitionGroup>
  </PrimeVueButtonGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GameLobbyHeaderSetupButtonsEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/game-lobby-header-setup-buttons.types";
import GameLobbyHeaderOptionButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";
import GameLobbyHeaderPositionCoordinatorButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/GameLobbyHeaderPositionCoordinatorButton.vue";
import { MIN_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyHeaderSetupButtonsEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto, doesCreateGameDtoContainPositionDependantRoles } = storeToRefs(createGameDtoStore);

const isPositionCoordinatorVisible = computed<boolean>(() => doesCreateGameDtoContainPositionDependantRoles.value && createGameDto.value.players.length >= MIN_PLAYERS_IN_GAME);

function handleGameOptionsButtonClick(): void {
  emit("gameOptionsButtonClick");
}

function handlePositionCoordinatorButtonClick(): void {
  emit("positionCoordinatorButtonClick");
}
</script>