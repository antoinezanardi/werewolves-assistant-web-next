<template>
  <div
    id="game-lobby-start-game-button-container"
    v-p-tooltip.top="containerTooltip"
    class="h-full"
  >
    <PrimeVueButton
      class="!h-full start-game-button"
      :disabled="!canCreateGame"
      icon="fa-play fa"
      :label="$t('components.GameLobbyStartGameButton.startGame')"
      :loading="isLoadingCreateGame"
      raised
      size="large"
      type="button"
      @click.prevent="onClickFromStartGameButton"
    />

    <GameLobbyStartGameConfirmDialog
      id="game-lobby-start-game-confirm-dialog"
      ref="gameLobbyStartGameConfirmDialog"
      @confirm-start-game="onConfirmStartGameFromGameLobbyStartGameConfirmDialog"
      @reject-players-position-step="onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { GameLobbyStartGameButtonEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/game-lobby-start-game-button.types";
import type { GameLobbyStartGameConfirmDialogExposed } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import GameLobbyStartGameConfirmDialog from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialog.vue";

import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { usePrimeVueToasts } from "~/composables/prime-vue/usePrimeVueToasts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyStartGameButtonEmits>();

const gameLobbyStartGameConfirmDialog = ref<GameLobbyStartGameConfirmDialogExposed | null>(null);

const { t } = useI18n();

const { addSuccessToast } = usePrimeVueToasts();

const { createGame } = useFetchGames();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const { canCreateGame, gameCreationValidationErrors } = useCreateGameDtoValidation(createGameDto);

const isLoadingCreateGame = ref<boolean>(false);

const containerTooltip = computed<string | undefined>(() => gameCreationValidationErrors.value[0]);

function onClickFromStartGameButton(): void {
  if (!gameLobbyStartGameConfirmDialog.value) {
    throw createError("Game Lobby Start Game Confirm Dialog is not defined");
  }
  gameLobbyStartGameConfirmDialog.value.open();
}

async function onConfirmStartGameFromGameLobbyStartGameConfirmDialog(): Promise<void> {
  isLoadingCreateGame.value = true;
  const createdGame = await createGame(createGameDto.value);
  if (createdGame) {
    await navigateTo(`/game/${createdGame._id}`);
    addSuccessToast({ summary: t("components.GameLobbyStartGameButton.gameCreated") });
  }
  isLoadingCreateGame.value = false;
}

function onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialog(): void {
  emit("rejectPlayersPositionStep");
}
</script>