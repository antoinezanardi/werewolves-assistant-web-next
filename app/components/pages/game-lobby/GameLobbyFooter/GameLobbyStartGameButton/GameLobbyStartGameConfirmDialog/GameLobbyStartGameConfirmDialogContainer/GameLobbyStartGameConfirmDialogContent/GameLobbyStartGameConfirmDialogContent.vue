<template>
  <div id="game-lobby-start-game-confirm-dialog-content-container">
    <Transition
      mode="out-in"
      name="fade"
    >
      <Component
        :is="currentConfirmStepComponent"
        :key="currentConfirmStep"
        @confirm-step="onConfirmStepFromConfirmStepComponent"
        @reject-actor-additional-cards-placed-step="onRejectActorAdditionalCardsPlacedStep"
        @reject-players-position-step="onRejectPlayersPositionStepFromConfirmStepComponent"
        @reject-thief-additional-cards-placed-step="onRejectThiefAdditionalCardsPlacedStep"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import type { GameLobbyStartGameConfirmDialogContentEmits, GameLobbyStartGameConfirmDialogContentProps, GameLobbyStartGameConfirmDialogStepComponents } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/game-lobby-start-game-confirm-dialog-content.types";
import GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.vue";
import GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";
import GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";
import GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.vue";

const props = defineProps<GameLobbyStartGameConfirmDialogContentProps>();

const emit = defineEmits<GameLobbyStartGameConfirmDialogContentEmits>();

const confirmStepsComponents: Record<GameLobbyStartGameConfirmDialogStep, GameLobbyStartGameConfirmDialogStepComponents> = {
  "players-positioned": GameLobbyStartGameConfirmDialogPlayersPositioned,
  "players-ready": GameLobbyStartGameConfirmDialogPlayersReady,
  "thief-additional-cards-placed": GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced,
  "actor-additional-cards-placed": GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced,
};

const currentConfirmStepComponent = computed<GameLobbyStartGameConfirmDialogStepComponents>(() => confirmStepsComponents[props.currentConfirmStep]);

function onConfirmStepFromConfirmStepComponent(): void {
  emit("confirmStep");
}

function onRejectPlayersPositionStepFromConfirmStepComponent(): void {
  emit("rejectPlayersPositionStep");
}

function onRejectThiefAdditionalCardsPlacedStep(): void {
  emit("rejectThiefAdditionalCardsPlacedStep");
}

function onRejectActorAdditionalCardsPlacedStep(): void {
  emit("rejectActorAdditionalCardsPlacedStep");
}
</script>