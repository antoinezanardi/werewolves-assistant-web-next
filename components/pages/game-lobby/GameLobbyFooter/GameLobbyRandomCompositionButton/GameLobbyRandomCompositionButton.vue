<template>
  <div
    id="game-lobby-random-composition-button-container"
    v-p-tooltip.top="containerTooltip"
  >
    <VuePrimeButton
      class="random-composition-button"
      :disabled="!isMinimumPlayersReached"
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

import { useFetchRandomGameComposition } from "~/composables/api/game/useFetchRandomGameComposition";
import { useCreateGameDtoValidation } from "~/composables/game/create-game-dto/useCreateGameDtoValidation";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { fetchRandomGameComposition } = useFetchRandomGameComposition();

const { t } = useI18n();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const { setPlayersToCreateGameDto } = createGameDtoStore;
const { isMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

const isLoadingGetRandomGameComposition = ref<boolean>(false);

const containerTooltip = computed<string | undefined>(() => {
  if (!isMinimumPlayersReached.value) {
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