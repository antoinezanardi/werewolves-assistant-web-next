<template>
  <div
    id="game-lobby-random-composition-button-container"
    v-p-tooltip.top="containerTooltip"
  >
    <PrimeVueButton
      class="random-composition-button"
      :disabled="isButtonDisabled"
      :loading="isLoadingGetRandomGameComposition"
      raised
      severity="secondary"
      :size="buttonSize"
      type="button"
      @click.prevent="onClickFromRandomCompositionButton"
    >
      <FontAwesomeIcon
        icon="random"
      />

      <span>
        {{ buttonLabel }}
      </span>
    </PrimeVueButton>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useFetchRandomGameComposition } from "~/composables/api/game/useFetchRandomGameComposition";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

const { fetchRandomGameComposition } = useFetchRandomGameComposition();

const { t } = useI18n();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
const {
  setPlayersToCreateGameDto,
  removeObsoleteAdditionalCardsFromCreateGameDto,
} = createGameDtoStore;
const { isMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

const isLoadingGetRandomGameComposition = ref<boolean>(false);

const buttonSize = computed<"large" | "small">(() => (isSmallerThanMd.value ? "small" : "large"));

const buttonLabel = computed<string | undefined>(() => (isSmallerThanMd.value ? undefined : t("components.GameLobbyRandomCompositionButton.randomComposition")));

const isButtonDisabled = computed<boolean>(() => !isMinimumPlayersReached.value || isLoadingGetRandomGameComposition.value);

const containerTooltip = computed<string | undefined>(() => {
  if (!isMinimumPlayersReached.value) {
    return t("components.GameLobbyRandomCompositionButton.minPlayersNotReached");
  }
  return undefined;
});

async function onClickFromRandomCompositionButton(): Promise<void> {
  isLoadingGetRandomGameComposition.value = true;
  const randomGameComposition = await fetchRandomGameComposition({
    players: createGameDto.value.players,
    excludedRoles: ["prejudiced-manipulator"],
  });
  if (randomGameComposition !== null) {
    setPlayersToCreateGameDto(randomGameComposition);
    removeObsoleteAdditionalCardsFromCreateGameDto();
  }
  isLoadingGetRandomGameComposition.value = false;
}
</script>