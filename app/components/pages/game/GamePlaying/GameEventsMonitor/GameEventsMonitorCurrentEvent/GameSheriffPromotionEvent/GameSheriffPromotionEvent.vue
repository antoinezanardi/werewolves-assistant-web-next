<template>
  <GameEventWithTexts
    id="game-sheriff-promotion-event"
    :texts="gameSheriffHasBeenElectedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-sheriff-card"
        :players="event.players"
        svg-icon-path="svg/game/player/player-attribute/sheriff.svg"
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

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const sheriffInPlayers = computed<Player | undefined>(() => props.event.players?.[0]);

const isLastGamePlayActionSheriffDelegates = computed<boolean>(() => game.value.lastGameHistoryRecord?.play.action === "delegate");

const gameSheriffHasBeenElectedEventTexts = computed<string[]>(() => {
  if (!sheriffInPlayers.value) {
    return [t("components.GameSheriffHasBeenElectedEvent.cantFindElectedSheriff")];
  }
  const sheriffPromotionTKey = isLastGamePlayActionSheriffDelegates.value ? "sheriffHasBeenElectedByDelegation" : "sheriffHasBeenElectedBySurvivors";

  return [
    t(`components.GameSheriffHasBeenElectedEvent.${sheriffPromotionTKey}`, { playerName: sheriffInPlayers.value.name }),
    t("components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech"),
  ];
});

playSoundEffect("trumpet-fanfare");
</script>