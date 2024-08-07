<template>
  <GameEventWithTexts
    id="game-scandalmonger-mark-is-active-event"
    :texts="gameScandalmongerMarkIsActiveTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-players-card"
        :players="event.players"
        svg-icon-path="/svg/game/player/player-attribute/scandalmonger-marked.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const scandalmongerMarkedPlayer = computed<Player | undefined>(() => props.event.players?.[0]);

const scandalmongerMarkPenalty = computed<number>(() => game.value.options.roles.scandalmonger.markPenalty);

const gameScandalmongerMarkIsActiveTexts = computed<string[]>(() => {
  if (!scandalmongerMarkedPlayer.value) {
    return [t("components.GameScandalmongerMarkIsActiveEvent.cantFindScandalmongerMarkedPlayer")];
  }
  return [
    t("components.GameScandalmongerMarkIsActiveEvent.scandalmongerHasMarkedAPlayer", {
      playerName: scandalmongerMarkedPlayer.value.name,
    }),
    t("components.GameScandalmongerMarkIsActiveEvent.playerHasPenaltyForVotes", { penalty: scandalmongerMarkPenalty.value }, scandalmongerMarkPenalty.value),
  ];
});

playSoundEffect("raven-cry");
</script>