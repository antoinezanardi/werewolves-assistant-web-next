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
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const thiefAdditionalCardsCount = computed<number>(() => game.value.options.roles.thief.additionalCardsCount);

const gameEventTexts = computed<string[]>(() => {
  const tComponentKey = "GameThiefTurnStartsEvent";

  return [
    t(`components.${tComponentKey}.thiefCanStealCard`, { count: thiefAdditionalCardsCount.value }, thiefAdditionalCardsCount.value),
    t(`components.${tComponentKey}.gameMasterWillFlipThiefCards`, { count: thiefAdditionalCardsCount.value }, thiefAdditionalCardsCount.value),
  ];
});

playSoundEffect("evil-laugh");
</script>