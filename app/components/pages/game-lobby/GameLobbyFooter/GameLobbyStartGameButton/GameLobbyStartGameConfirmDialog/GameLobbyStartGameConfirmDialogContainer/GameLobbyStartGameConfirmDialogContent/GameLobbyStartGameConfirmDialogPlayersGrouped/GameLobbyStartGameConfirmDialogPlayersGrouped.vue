<template>
  <div
    id="game-lobby-start-game-confirm-dialog-players-grouped"
    class="flex flex-col gap-6 items-center justify-center"
  >
    <NuxtImg
      :alt="$t(`components.GameLobbyStartGameConfirmDialogPlayersGrouped.playersGroups`)"
      :height="svgSize"
      placeholder="/svg/misc/ripples.svg"
      :placeholder-class="`w-[${svgSize}] h-[${svgSize}]`"
      src="/svg/role/prejudiced-manipulator.svg"
      :width="svgSize"
    />

    <h4
      id="game-lobby-start-game-confirm-dialog-players-grouped-text"
      class="text-center"
    >
      {{ $t("components.GameLobbyStartGameConfirmDialogPlayersGrouped.prejudicedManipulatorIsHere") }}
    </h4>

    <GameLobbyStartGameConfirmDialogPlayersGroupedDataTable
      class="w-full"
    />

    <div
      id="game-lobby-start-game-confirm-dialog-players-grouped-actions"
      class="flex gap-2 items-center justify-evenly w-full"
    >
      <PrimeVueButton
        id="reject-step-button"
        :label="$t(`components.GameLobbyStartGameConfirmDialogPlayersGrouped.showMeHowToGroupPlayers`)"
        severity="info"
        @click.prevent="onRejectPlayersGroupedStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="fa-compass"/>
        </template>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-step-button"
        :label="$t(`shared.yes`)"
        severity="success"
        @click.prevent="onConfirmPlayersGroupedStep"
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

import type { GameLobbyStartGameConfirmDialogPlayersGroupedEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersGrouped/game-lobby-start-game-confirm-dialog-players-grouped.types";
import GameLobbyStartGameConfirmDialogPlayersGroupedDataTable from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersGrouped/GameLobbyStartGameConfirmDialogPlayersGroupedDataTable/GameLobbyStartGameConfirmDialogPlayersGroupedDataTable.vue";

const emit = defineEmits<GameLobbyStartGameConfirmDialogPlayersGroupedEmits>();

const svgSize = 75;

function onConfirmPlayersGroupedStep(): void {
  emit("confirmStep");
}

function onRejectPlayersGroupedStep(): void {
  emit("rejectPlayersGroupedStep");
}
</script>