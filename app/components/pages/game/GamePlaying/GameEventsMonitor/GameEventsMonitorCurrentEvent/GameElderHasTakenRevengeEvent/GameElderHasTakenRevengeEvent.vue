<template>
  <GameEventWithTexts
    id="game-elder-has-taken-revenge-event"
    :texts="gameElderHasTakenRevengeEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-elder-card"
        :players="event.players"
        svg-icon-path="svg/misc/storm.svg"
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

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const gameElderHasTakenRevengeEventTexts = computed<string[]>(() => [
  t("components.GameElderHasTakenRevengeEvent.elderHasBeenMurderedByVillager"),
  t("components.GameElderHasTakenRevengeEvent.elderHasTakenRevenge"),
]);

playSoundEffect("thunder");
</script>