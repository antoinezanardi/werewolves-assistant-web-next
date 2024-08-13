<template>
  <div
    id="game-lobby-start-game-button-container"
    v-p-tooltip.top="containerTooltip"
    class="h-full"
  >
    <PrimeVueButton
      class="!h-full !px-6 !py-4 start-game-button"
      :disabled="isButtonDisabled"
      :loading="isLoadingCreateGame"
      raised
      size="large"
      type="button"
      @click.prevent="onClickFromStartGameButton"
    >
      <FontAwesomeIcon
        icon="play"
      />

      <span>
        {{ $t("components.GameLobbyStartGameButton.startGame") }}
      </span>
    </PrimeVueButton>

    <GameLobbyStartGameConfirmDialog
      id="game-lobby-start-game-confirm-dialog"
      ref="gameLobbyStartGameConfirmDialog"
      @confirm-start-game="onConfirmStartGameFromGameLobbyStartGameConfirmDialog"
      @reject-players-position-step="onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import type { GameLobbyStartGameButtonEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/game-lobby-start-game-button.types";
import type { GameLobbyStartGameConfirmDialogExposed } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import GameLobbyStartGameConfirmDialog from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialog.vue";
import { GAME_ADDITIONAL_CARDS_RECIPIENTS } from "~/composables/api/game/constants/game-additional-card/game-additional-card.constants";

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
const { getAdditionalCardsForRecipientInCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);
const { canCreateGame, gameCreationValidationErrors } = useCreateGameDtoValidation(createGameDto);

const isLoadingCreateGame = ref<boolean>(false);

const containerTooltip = computed<string | undefined>(() => gameCreationValidationErrors.value[0]);

const isButtonDisabled = computed<boolean>(() => !canCreateGame.value || isLoadingCreateGame.value);

function onClickFromStartGameButton(): void {
  if (!gameLobbyStartGameConfirmDialog.value) {
    throw createError("Game Lobby Start Game Confirm Dialog is not defined");
  }
  gameLobbyStartGameConfirmDialog.value.open();
}

function adjustCreateGameDtoAdditionalCardsOptions(): void {
  for (const recipient of GAME_ADDITIONAL_CARDS_RECIPIENTS) {
    const additionalCards = getAdditionalCardsForRecipientInCreateGameDto(recipient);
    if (additionalCards.length !== 0) {
      createGameDto.value.options.roles[recipient].additionalCardsCount = additionalCards.length;
    }
  }
}

async function onConfirmStartGameFromGameLobbyStartGameConfirmDialog(): Promise<void> {
  isLoadingCreateGame.value = true;
  adjustCreateGameDtoAdditionalCardsOptions();
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