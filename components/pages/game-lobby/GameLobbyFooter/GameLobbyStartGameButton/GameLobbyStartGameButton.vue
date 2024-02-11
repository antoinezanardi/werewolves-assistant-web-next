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

import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { createGame } = useFetchGames();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const { canCreateGame, gameCreationValidationErrors } = useCreateGameDtoValidation(createGameDto);

const isLoadingCreateGame = ref<boolean>(false);

const containerTooltip = computed<string | undefined>(() => gameCreationValidationErrors.value[0]);

async function handleStartGameButtonClick(): Promise<void> {
  isLoadingCreateGame.value = true;
  await createGame(createGameDto.value);
  isLoadingCreateGame.value = false;
}
</script>