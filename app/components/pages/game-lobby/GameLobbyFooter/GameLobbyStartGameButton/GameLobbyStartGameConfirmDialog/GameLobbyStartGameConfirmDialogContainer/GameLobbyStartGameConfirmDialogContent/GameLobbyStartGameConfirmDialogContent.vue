<template>
  <div id="game-lobby-start-game-confirm-dialog-content-container">
    <Transition
      mode="out-in"
      name="fade"
    >
      <Component
        :is="currentConfirmStepComponent"
        :key="currentConfirmStep"
        @confirm-step="confirmStep"
        @reject-players-position-step="rejectPlayersPositionStep"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import type { GameLobbyStartGameConfirmDialogContentEmits, GameLobbyStartGameConfirmDialogContentProps, GameLobbyStartGameConfirmDialogStepComponents } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/game-lobby-start-game-confirm-dialog-content.types";
import GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";
import GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";

const props = defineProps<GameLobbyStartGameConfirmDialogContentProps>();

const emit = defineEmits<GameLobbyStartGameConfirmDialogContentEmits>();

const confirmStepsComponents: Record<GameLobbyStartGameConfirmDialogStep, GameLobbyStartGameConfirmDialogStepComponents> = {
  "players-positioned": GameLobbyStartGameConfirmDialogPlayersPositioned,
  "players-ready": GameLobbyStartGameConfirmDialogPlayersReady,
};

const currentConfirmStepComponent = computed<GameLobbyStartGameConfirmDialogStepComponents>(() => confirmStepsComponents[props.currentConfirmStep]);

function confirmStep(): void {
  emit("confirmStep");
}

function rejectPlayersPositionStep(): void {
  emit("rejectPlayersPositionStep");
}
</script>