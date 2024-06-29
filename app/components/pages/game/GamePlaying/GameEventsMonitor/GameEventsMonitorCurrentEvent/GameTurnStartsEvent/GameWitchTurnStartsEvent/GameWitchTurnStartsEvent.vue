<template>
  <GameEventWithTexts
    id="game-witch-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useArrays } from "~/composables/misc/useArrays";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { insertIf } = useArrays();

const { t } = useI18n();

const isFirstTurn = computed<boolean>(() => game.value.turn === 1);

const gameEventTexts = computed<string[]>(() => [
  t("components.GameWitchTurnStartsEvent.witchCanUsePotions"),
  ...insertIf(!isFirstTurn.value, t("components.GameWitchTurnStartsEvent.gameMasterWillAskHerEventIfUsed")),
]);

playSoundEffect("witch-laughing");
</script>