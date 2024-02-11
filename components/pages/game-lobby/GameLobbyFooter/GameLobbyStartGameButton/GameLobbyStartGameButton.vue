<template>
  <div
    id="game-lobby-start-game-button-container"
    v-p-tooltip.top="containerTooltip"
  >
    <VuePrimeButton
      class="start-game-button"
      :disabled="!canCreateGame"
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

import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { useCreateGameDtoValidation } from "~/composables/game/create-game-dto/useCreateGameDtoValidation";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { t } = useI18n();

const { createGame } = useFetchGames();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const { canCreateGame } = useCreateGameDtoValidation(createGameDto);

const isLoadingCreateGame = ref<boolean>(false);

const containerTooltip = computed<string | undefined>(() => {
  if (!canCreateGame.value) {
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