<template>
  <GameEventWithTexts
    id="game-thief-turn-starts-event"
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

const thiefAdditionalCardsCount = computed<number>(() => game.value.options.roles.thief.additionalCardsCount);

const gameEventTexts = computed<string[]>(() => {
  const tComponentKey = "GameThiefTurnStartsEvent";

  return [
    t(`components.${tComponentKey}.thiefCanStealCard`, { count: thiefAdditionalCardsCount.value }, thiefAdditionalCardsCount.value),
    t(`components.${tComponentKey}.gameMasterWillFlipThiefCards`, { count: thiefAdditionalCardsCount.value }, thiefAdditionalCardsCount.value),
  ];
});
</script>