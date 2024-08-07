<template>
  <GameEventWithTexts
    id="game-scandalmonger-may-have-marked-event"
    :texts="gameScandalmongerHasMarkedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-last-play-targets-card"
        :players="event.players"
        :svg-icon-path="svgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const props = defineProps<CurrentGameEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const hasScandalmongerMarkedAnyone = computed<boolean>(() => !!props.event.players && props.event.players.length > 0);

const gameScandalmongerHasMarkedEventTexts = computed<string[]>(() => {
  if (!hasScandalmongerMarkedAnyone.value) {
    return [t("components.GameScandalmongerMayHaveMarkedEvent.scandalMongerDidntMarkAnyone")];
  }
  return [
    t("components.GameScandalmongerMayHaveMarkedEvent.scandalmongerHasMarkedAPlayer"),
    t("components.GameScandalmongerMayHaveMarkedEvent.gameMasterWillPutScandalmongerMark"),
  ];
});

const svgIconPath = computed<string | undefined>(() => {
  if (!hasScandalmongerMarkedAnyone.value) {
    return undefined;
  }
  return "/svg/game/player/player-attribute/scandalmonger-marked.svg";
});

function playRavenSoundEffect(): void {
  const soundEffectName: SoundEffectName = !hasScandalmongerMarkedAnyone.value ? "raven-flying-away" : "raven-cry";
  playSoundEffect(soundEffectName);
}

playRavenSoundEffect();
</script>