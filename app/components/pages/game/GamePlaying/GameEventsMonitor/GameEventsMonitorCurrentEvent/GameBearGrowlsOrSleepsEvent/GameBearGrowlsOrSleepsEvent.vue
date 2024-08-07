<template>
  <GameEventWithTexts
    id="game-bear-growls-or-sleeps-event"
    :texts="gameBearGrowlsOrSleepsEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-bear-tamer-card"
        :players="event.players"
        :svg-icon-path="bearSvgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const props = defineProps<CurrentGameEventProps>();

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const gameBearGrowlsOrSleepsEventTexts = computed<string[]>(() => {
  if (props.event.type === "bear-growls") {
    return [t("components.GameBearGrowlsOrSleepsEvent.bearGrowls")];
  }
  return [t("components.GameBearGrowlsOrSleepsEvent.bearSleeps")];
});

const doesBearGrowl = computed<boolean>(() => props.event.type === "bear-growls");

const bearSvgIconPath = computed<string>(() => {
  if (doesBearGrowl.value) {
    return "svg/role/angry-bear.svg";
  }
  return "svg/role/cool-bear.svg";
});

function playBearSoundEffect(): void {
  if (doesBearGrowl.value) {
    playSoundEffect("bear-growling");

    return;
  }
  playSoundEffect("calm-bear-eating");
}

playBearSoundEffect();
</script>