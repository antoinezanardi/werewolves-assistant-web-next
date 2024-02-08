<template>
  <div
    id="game-lobby-random-composition-button-container"
    v-p-tooltip.top="containerTooltip"
  >
    <VuePrimeButton
      class="random-composition-button"
      :disabled="isButtonDisabled"
      icon="fa-random fa"
      :label="$t('components.GameLobbyRandomCompositionButton.randomComposition')"
      :loading="isLoadingGetRandomGameComposition"
      raised
      severity="secondary"
      size="large"
      type="button"
      @click="handleRandomCompositionButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { MIN_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import { useFetchRandomGameComposition } from "~/composables/api/game/useFetchRandomGameComposition";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { fetchRandomGameComposition } = useFetchRandomGameComposition();

const { t } = useI18n();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const { setPlayersToCreateGameDto } = createGameDtoStore;

const isLoadingGetRandomGameComposition = ref<boolean>(false);

const isButtonDisabled = computed<boolean>(() => createGameDto.value.players.length < MIN_PLAYERS_IN_GAME);

const containerTooltip = computed<string | undefined>(() => {
  if (isButtonDisabled.value) {
    return t("components.GameLobbyRandomCompositionButton.minPlayersNotReached");
  }
  return undefined;
});

async function handleRandomCompositionButtonClick(): Promise<void> {
  isLoadingGetRandomGameComposition.value = true;
  const randomGameComposition = await fetchRandomGameComposition({ players: createGameDto.value.players });
  if (randomGameComposition !== null) {
    setPlayersToCreateGameDto(randomGameComposition);
  }
  isLoadingGetRandomGameComposition.value = false;
}
</script>