<template>
  <div
    id="game-playground-footer-make-play-button"
    class="flex justify-center"
  >
    <VuePrimeButton
      id="make-play-button"
      class="uppercase w-full"
      :disabled="!canMakeGamePlay"
      icon="fa fa-play"
      :label="$t('components.GamePlaygroundFooterMakePlayButton.makePlay')"
      :loading="isLoadingMakePlay"
      raised
      severity="primary"
      type="button"
      @click="handleMakePlayButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useMakeGamePlayDtoValidation } from "~/composables/api/game/useMakeGamePlayDtoValidation";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { makeGamePlay } = gameStore;

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);

const { canMakeGamePlay } = useMakeGamePlayDtoValidation(makeGamePlayDto, game);

const isLoadingMakePlay = ref<boolean>(false);

async function handleMakePlayButtonClick(): Promise<void> {
  isLoadingMakePlay.value = true;
  await makeGamePlay(makeGamePlayDto.value);
  isLoadingMakePlay.value = false;
}
</script>