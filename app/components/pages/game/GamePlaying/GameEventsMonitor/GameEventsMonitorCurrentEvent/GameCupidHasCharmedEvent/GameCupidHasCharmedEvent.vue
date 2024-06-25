<template>
  <GameEventWithTexts
    id="game-cupid-has-charmed-event"
    :texts="gameCupidHasCharmedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingLastPlayTargetsCard
        id="game-event-flipping-last-play-targets-card"
        svg-icon-path="svg/game/player/player-attribute/in-love.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const gameCupidHasCharmedEventTexts = computed<string[]>(() => [
  t("components.GameCupidHasCharmedEvent.cupidHasCharmedPlayers"),
  t("components.GameCupidHasCharmedEvent.gameMasterWillTapInLovePlayers"),
]);

playSoundEffect("love-arrow-shot");
</script>