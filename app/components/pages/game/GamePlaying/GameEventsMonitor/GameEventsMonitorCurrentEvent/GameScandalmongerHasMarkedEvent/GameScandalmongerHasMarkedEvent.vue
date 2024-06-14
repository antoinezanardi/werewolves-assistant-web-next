<template>
  <GameEventWithTexts
    id="game-scandalmonger-has-marked-event"
    :texts="gameScandalmongerHasMarkedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingLastPlayTargetsCard
        id="game-event-flipping-last-play-targets-card"
        :svg-icon-path="svgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { lastTargetedPlayers } = useGameLastHistoryRecord(game);

const { t } = useI18n();

const hasScandalmongerMarkedAnyone = computed<boolean>(() => lastTargetedPlayers.value.length > 0);

const gameScandalmongerHasMarkedEventTexts = computed<string[]>(() => {
  if (!hasScandalmongerMarkedAnyone.value) {
    return [t("components.GameScandalmongerHasMarkedEvent.scandalMongerDidntMarkAnyone")];
  }
  return [
    t("components.GameScandalmongerHasMarkedEvent.scandalmongerHasMarkedAPlayer"),
    t("components.GameScandalmongerHasMarkedEvent.gameMasterWillPutScandalmongerMark"),
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