<template>
  <div
    id="game-lobby-start-game-confirm-dialog-players-positioned"
    class="flex flex-col gap-6 items-center justify-center"
  >
    <NuxtImg
      :alt="$t(`components.GameLobbyStartGameConfirmDialogPlayersPositioned.playersPosition`)"
      :height="svgSize"
      placeholder="/svg/misc/infinite-spinner.svg"
      src="/svg/misc/pie-chart-clock-wise.svg"
      :width="svgSize"
    />

    <h4
      id="game-lobby-start-game-confirm-dialog-players-positioned-text"
      class="text-center"
    >
      {{ $t("components.GameLobbyStartGameConfirmDialogPlayersPositioned.someRolesArePositionDependant") }}
    </h4>

    <div
      id="game-lobby-start-game-confirm-dialog-players-positioned-actions"
      class="flex gap-2 items-center justify-evenly w-full"
    >
      <PrimeVueButton
        id="reject-step-button"
        icon="fa-compass fa"
        :label="$t(`components.GameLobbyStartGameConfirmDialogPlayersPositioned.showMeHowToPositionPlayers`)"
        severity="info"
        @click.prevent="onRejectPlayersPositionStep"
      />

      <PrimeVueButton
        id="confirm-step-button"
        icon="fa-check fa"
        :label="$t(`shared.yes`)"
        severity="success"
        @click.prevent="onConfirmPlayersPositionStep"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyStartGameConfirmDialogPlayersPositionedEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/game-lobby-start-game-confirm-dialog-players-positioned.types";

const emit = defineEmits<GameLobbyStartGameConfirmDialogPlayersPositionedEmits>();

const svgSize = 75;

function onConfirmPlayersPositionStep(): void {
  emit("confirmStep");
}

function onRejectPlayersPositionStep(): void {
  emit("rejectPlayersPositionStep");
}
</script>