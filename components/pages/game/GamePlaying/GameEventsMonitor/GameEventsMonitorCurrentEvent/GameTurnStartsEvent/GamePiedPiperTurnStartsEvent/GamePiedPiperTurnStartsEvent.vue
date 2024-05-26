<template>
  <GameEventWithTexts
    id="game-pied-piper-turn-starts-event"
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

const piedPiperCharmedPeopleCountPerNight = computed<number>(() => game.value.options.roles.piedPiper.charmedPeopleCountPerNight);

const gameEventTexts = computed<string[]>(() => {
  const tComponentKey = "GamePiedPiperTurnStartsEvent";

  return [t(`components.${tComponentKey}.piedPiperCharmsPeople`, { count: piedPiperCharmedPeopleCountPerNight.value }, piedPiperCharmedPeopleCountPerNight.value)];
});
</script>