<template>
  <div
    id="game-lobby-footer"
    class="flex flex-auto gap-2 items-center"
  >
    <div class="flex h-full items-center lg:1/3 md:w-3/12 w-2/12">
      <GameLobbyRandomCompositionButton/>
    </div>

    <div class="flex h-full justify-center lg:1/3 md:w-6/12 w-8/12">
      <GameLobbyStartGameButton
        id="game-lobby-start-game-button"
        @reject-actor-additional-cards-placed-step="onRejectActorAdditionalCardsPlacedStep"
        @reject-players-position-step="onRejectPlayersPositionStepFromGameLobbyStartGameButton"
        @reject-thief-additional-cards-placed-step="onRejectThiefAdditionalCardsPlacedStep"
      />
    </div>

    <div class="lg:1/3 md:w-3/12 w-2/12"/>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyFooterEmits } from "~/components/pages/game-lobby/GameLobbyFooter/game-lobby-footer.types";
import GameLobbyRandomCompositionButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyRandomCompositionButton/GameLobbyRandomCompositionButton.vue";
import GameLobbyStartGameButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameButton.vue";

const emit = defineEmits<GameLobbyFooterEmits>();

function onRejectPlayersPositionStepFromGameLobbyStartGameButton(): void {
  emit("rejectPlayersPositionStep");
}

function onRejectThiefAdditionalCardsPlacedStep(): void {
  emit("rejectThiefAdditionalCardsPlacedStep");
}

function onRejectActorAdditionalCardsPlacedStep(): void {
  emit("rejectActorAdditionalCardsPlacedStep");
}
</script>