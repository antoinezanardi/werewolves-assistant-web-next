<template>
  <GameEventWithTexts
    id="game-idiot-is-spared-event"
    :texts="gameIdiotIsSparedEventTexts"
    @game-event-text-change="onGameEventTextChangeFromGameEventWithTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        v-if="idiotInPlayers"
        id="game-event-flipping-idiot-card"
        :players="event.players"
        svg-icon-path="/svg/game/player/player-attribute/seen.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const props = defineProps<CurrentGameEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const idiotInPlayers = computed<Player | undefined>(() => props.event.players?.[0]);

const gameIdiotIsSparedEventTexts = computed<string[]>(() => {
  if (!idiotInPlayers.value) {
    return [t("components.GameIdiotIsSparedEvent.cantFindIdiot")];
  }
  return [
    t("components.GameIdiotIsSparedEvent.playerDies", { playerName: idiotInPlayers.value.name }),
    t("components.GameIdiotIsSparedEvent.playerIsActuallyIdiot", { playerName: idiotInPlayers.value.name }),
    t("components.GameIdiotIsSparedEvent.idiotIsSpared"),
  ];
});

function onGameEventTextChangeFromGameEventWithTexts(newGameEventText: string): void {
  if (newGameEventText === gameIdiotIsSparedEventTexts.value[0]) {
    playSoundEffect("death");
  } else if (newGameEventText === gameIdiotIsSparedEventTexts.value[1]) {
    playSoundEffect("dumb-huh");
  }
}

playSoundEffect("death");
</script>