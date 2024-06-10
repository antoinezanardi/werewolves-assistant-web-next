<template>
  <GameEventWithTexts
    id="game-werewolves-turn-starts-event"
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

const isFirstNight = computed<boolean>(() => game.value.turn === 1);

const gameEventTexts = computed<string[]>(() => {
  if (isFirstNight.value) {
    return [
      t("components.GameWerewolvesTurnStartsEvent.werewolvesMeetEachOtherForFirstTime"),
      t("components.GameWerewolvesTurnStartsEvent.whenMeetOverWerewolvesEat"),
    ];
  }
  return [t("components.GameWerewolvesTurnStartsEvent.werewolvesEat")];
});

playSoundEffect("werewolf-howling");
</script>