<template>
  <div id="game-choose-card-playground">
    <GlowCapture class="flex gap-2 h-full items-center justify-center w-full">
      <GameChooseCardPlaygroundAdditionalCard
        v-for="additionalCard in eligibleAdditionalCardsToChoose"
        :key="additionalCard._id"
        :additional-card="additionalCard"
        class="flex game-additional-card justify-center w-1/5"
        @click-additional-card="onClickFromAdditionalCardButton"
      />
    </GlowCapture>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameChooseCardPlaygroundAdditionalCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlaygroundAdditionalCard/GameChooseCardPlaygroundAdditionalCard.vue";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);

const { getEligibleAdditionalCardsToChooseInCurrentGamePlay } = useCurrentGamePlay(game);

const eligibleAdditionalCardsToChoose = computed<GameAdditionalCard[]>(() => getEligibleAdditionalCardsToChooseInCurrentGamePlay());

function onClickFromAdditionalCardButton(additionalCard: GameAdditionalCard): void {
  if (makeGamePlayDto.value.chosenCardId === additionalCard._id) {
    makeGamePlayDto.value.chosenCardId = undefined;

    return;
  }
  makeGamePlayDto.value.chosenCardId = additionalCard._id;
}
</script>