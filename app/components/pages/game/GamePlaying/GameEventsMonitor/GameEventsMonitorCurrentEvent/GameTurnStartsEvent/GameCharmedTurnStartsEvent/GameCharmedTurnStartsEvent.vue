<template>
  <GameEventWithTexts
    id="game-charmed-turn-starts-event"
    :texts="charmedGameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { lastTargetedPlayers } = useGameLastHistoryRecord(game);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const isFirstNight = computed<boolean>(() => game.value.turn === 1);

const charmedGameEventTexts = computed<string[]>(() => {
  if (isFirstNight.value) {
    return [t("components.GameCharmedTurnStartsEvent.charmedPeopleMeetEachOther", lastTargetedPlayers.value.length)];
  }
  return [t("components.GameCharmedTurnStartsEvent.charmedPeopleMeetEachOtherWithOldOnes", lastTargetedPlayers.value.length)];
});

function playCharmedTurnStartsSoundEffect(): void {
  playSoundEffect("magic-mood");
}

playCharmedTurnStartsSoundEffect();
</script>