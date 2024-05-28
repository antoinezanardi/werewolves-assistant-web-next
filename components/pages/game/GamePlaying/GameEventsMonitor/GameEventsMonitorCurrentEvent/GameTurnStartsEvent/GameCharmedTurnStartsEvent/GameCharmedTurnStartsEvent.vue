<template>
  <GameEventWithTexts
    id="game-charmed-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const isFirstNight = computed<boolean>(() => game.value.turn === 1);

const gameEventTexts = computed<string[]>(() => {
  if (isFirstNight.value) {
    return [t("components.GameCharmedTurnStartsEvent.charmedPeopleMeetEachOther")];
  }
  return [t("components.GameCharmedTurnStartsEvent.charmedPeopleMeetEachOtherWithOldOnes")];
});
</script>