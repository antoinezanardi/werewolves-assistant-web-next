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
        @reject-game-options-changed-step="onRejectGameOptionsChangedStep"
        @reject-players-position-step="onRejectPlayersPositionStepFromConfirmStepComponent"
        @reject-thief-additional-cards-placed-step="onRejectThiefAdditionalCardsPlacedStep"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import type { GameLobbyStartGameConfirmDialogContentEmits, GameLobbyStartGameConfirmDialogContentProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/game-lobby-start-game-confirm-dialog-content.types";
import GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.vue";
import GameLobbyStartGameConfirmDialogGameOptionsChanged from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogGameOptionsChanged/GameLobbyStartGameConfirmDialogGameOptionsChanged.vue";
import GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";
import GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";
import GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.vue";

const props = defineProps<GameLobbyStartGameConfirmDialogContentProps>();

const emit = defineEmits<GameLobbyStartGameConfirmDialogContentEmits>();

const confirmStepsComponents: Record<GameLobbyStartGameConfirmDialogStep, Component> = {
  "players-positioned": GameLobbyStartGameConfirmDialogPlayersPositioned,
  "players-ready": GameLobbyStartGameConfirmDialogPlayersReady,
  "thief-additional-cards-placed": GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced,
  "actor-additional-cards-placed": GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced,
  "game-options-changed": GameLobbyStartGameConfirmDialogGameOptionsChanged,
};

const currentConfirmStepComponent = computed<Component>(() => confirmStepsComponents[props.currentConfirmStep]);

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

function onRejectGameOptionsChangedStep(): void {
  emit("rejectGameOptionsChangedStep");
}
</script>