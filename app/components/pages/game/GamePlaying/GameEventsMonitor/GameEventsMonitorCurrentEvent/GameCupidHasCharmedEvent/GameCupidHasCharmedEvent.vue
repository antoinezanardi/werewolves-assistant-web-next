<template>
  <GameEventWithTexts
    id="game-cupid-has-charmed-event"
    :texts="gameCupidHasCharmedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-last-play-targets-card"
        :players="event.players"
        svg-icon-path="svg/game/player/player-attribute/in-love.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

defineProps<CurrentGameEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const gameCupidHasCharmedEventTexts = computed<string[]>(() => [
  t("components.GameCupidHasCharmedEvent.cupidHasCharmedPlayers"),
  t("components.GameCupidHasCharmedEvent.gameMasterWillTapInLovePlayers"),
]);

playSoundEffect("love-arrow-shot");
</script>