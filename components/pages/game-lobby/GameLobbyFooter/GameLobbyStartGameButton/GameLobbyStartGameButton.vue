<template>
  <div
    id="game-lobby-start-game-button-container"
    v-p-tooltip.top="containerTooltip"
  >
    <VuePrimeButton
      class="start-game-button"
      :disabled="isButtonDisabled"
      icon="fa-play fa"
      :label="$t('components.GameLobbyStartGameButton.startGame')"
      :loading="isLoadingCreateGame"
      raised
      size="large"
      type="button"
      @click="handleStartGameButtonClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { MIN_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { t } = useI18n();

const { createGame } = useFetchGames();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);

const isLoadingCreateGame = ref<boolean>(false);

const isButtonDisabled = computed<boolean>(() => createGameDto.value.players.length < MIN_PLAYERS_IN_GAME);

const containerTooltip = computed<string | undefined>(() => {
  if (isButtonDisabled.value) {
    return t("components.GameLobbyStartGameButton.minPlayersNotReached");
  }
  return undefined;
});

async function handleStartGameButtonClick(): Promise<void> {
  isLoadingCreateGame.value = true;
  await createGame(createGameDto.value);
  isLoadingCreateGame.value = false;
}
</script>