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
        :label="$t(`components.GameLobbyStartGameConfirmDialogPlayersPositioned.showMeHowToPositionPlayers`)"
        severity="info"
        @click.prevent="onRejectPlayersPositionStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="fa-compass"/>
        </template>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-step-button"
        :label="$t(`shared.yes`)"
        severity="success"
        @click.prevent="onConfirmPlayersPositionStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="check"/>
        </template>
      </PrimeVueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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