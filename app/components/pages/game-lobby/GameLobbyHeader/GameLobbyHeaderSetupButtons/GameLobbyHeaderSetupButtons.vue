<template>
  <PrimeVueButtonGroup>
    <TransitionGroup
      name="fade-list"
    >
      <GameLobbyHeaderOptionButton
        id="game-lobby-header-options-button"
        key="game-options-button"
        class="fade-list-item"
        @game-options-button-click="onGameOptionsButtonClickFromGameOptionButton"
      />

      <GameLobbyHeaderPositionCoordinatorButton
        v-if="isPositionCoordinatorVisible"
        id="game-lobby-header-position-coordinator-button"
        key="game-position-coordinator-button"
        ref="gameLobbyHeaderPositionCoordinatorButton"
        class="fade-list-item"
        @position-coordinator-button-click="onPositionCoordinatorButtonClickFromGamePositionCoordinatorButton"
      />

      <GameLobbyHeaderAdditionalCardsManagerButton
        v-if="isAdditionalCardsManagerVisible"
        id="game-lobby-header-additional-cards-manager-button"
        key="game-additional-cards-manager-button"
        class="fade-list-item"
        @additional-cards-manager-button-click="onAdditionalCardsManagerButtonClickFromGameAdditionalCardsManagerButton"
      />
    </TransitionGroup>
  </PrimeVueButtonGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ComponentPublicInstance } from "vue";
import type { GameLobbyHeaderSetupButtonsEmits, GameLobbyHeaderSetupButtonsExposed } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/game-lobby-header-setup-buttons.types";
import GameLobbyHeaderAdditionalCardsManagerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderAdditionalCardsManagerButton/GameLobbyHeaderAdditionalCardsManagerButton.vue";
import GameLobbyHeaderOptionButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";
import GameLobbyHeaderPositionCoordinatorButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/GameLobbyHeaderPositionCoordinatorButton.vue";
import { useAnimateCss } from "~/composables/animate-css/useAnimateCss";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyHeaderSetupButtonsEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto, doesCreateGameDtoContainAdditionalCardsDependantRoles } = storeToRefs(createGameDtoStore);

const minPlayerToDisplayPositionCoordinator = 2;

const { animateElementOnce } = useAnimateCss();

const gameLobbyHeaderPositionCoordinatorButton = ref<ComponentPublicInstance | null>(null);

const isPositionCoordinatorVisible = computed<boolean>(() => createGameDto.value.players.length >= minPlayerToDisplayPositionCoordinator);

const isAdditionalCardsManagerVisible = computed<boolean>(() => doesCreateGameDtoContainAdditionalCardsDependantRoles.value);

function onGameOptionsButtonClickFromGameOptionButton(): void {
  emit("gameOptionsButtonClick");
}

function onPositionCoordinatorButtonClickFromGamePositionCoordinatorButton(): void {
  emit("positionCoordinatorButtonClick");
}

function onAdditionalCardsManagerButtonClickFromGameAdditionalCardsManagerButton(): void {
  emit("additionalCardsManagerButtonClick");
}

async function highlightPositionCoordinatorButton(): Promise<void> {
  if (!gameLobbyHeaderPositionCoordinatorButton.value) {
    throw createError("Game Lobby Header Position Coordinator Button is not defined");
  }
  await animateElementOnce((gameLobbyHeaderPositionCoordinatorButton.value.$el as HTMLElement), "heartBeat");
}

defineExpose<GameLobbyHeaderSetupButtonsExposed>({
  highlightPositionCoordinatorButton,
});
</script>