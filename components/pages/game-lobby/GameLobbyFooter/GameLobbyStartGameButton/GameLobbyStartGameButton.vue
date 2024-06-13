<template>
  <div
    id="game-lobby-start-game-button-container"
    v-p-tooltip.top="containerTooltip"
    class="h-full"
  >
    <VuePrimeButton
      class="!h-full start-game-button"
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
import { useVuePrimeToasts } from "~/composables/vue-prime/useVuePrimeToasts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { t } = useI18n();

const { addSuccessToast } = useVuePrimeToasts();

const { createGame } = useFetchGames();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const { canCreateGame, gameCreationValidationErrors } = useCreateGameDtoValidation(createGameDto);

const isLoadingCreateGame = ref<boolean>(false);

const containerTooltip = computed<string | undefined>(() => gameCreationValidationErrors.value[0]);

async function handleStartGameButtonClick(): Promise<void> {
  isLoadingCreateGame.value = true;
  const createdGame = await createGame(createGameDto.value);
  if (createdGame) {
    await navigateTo(`/game/${createdGame._id}`);
    addSuccessToast({ summary: t("components.GameLobbyStartGameButton.gameCreated") });
  }
  isLoadingCreateGame.value = false;
}
</script>