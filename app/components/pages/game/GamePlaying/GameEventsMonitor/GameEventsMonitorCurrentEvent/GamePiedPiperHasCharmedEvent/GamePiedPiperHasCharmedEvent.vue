<template>
  <GameEventWithTexts
    id="game-pied-piper-has-charmed-event"
    :texts="gamePiedPiperHasCharmedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingLastPlayTargetsCard
        id="game-event-flipping-last-play-targets-card"
        svg-icon-path="svg/game/player/player-attribute/charmed.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { lastTargetedPlayers } = useGameLastHistoryRecord(game);

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const gamePiedPiperHasCharmedEventTexts = computed<string[]>(() => [
  t("components.GamePiedPiperHasCharmedEvent.piedPiperHasCharmed", { charmedCount: lastTargetedPlayers.value.length }, lastTargetedPlayers.value.length),
  t("components.GamePiedPiperHasCharmedEvent.gameMasterWillTapCharmedPlayers", { charmedCount: lastTargetedPlayers.value.length }, lastTargetedPlayers.value.length),
]);

playSoundEffect("pan-flute");
</script>