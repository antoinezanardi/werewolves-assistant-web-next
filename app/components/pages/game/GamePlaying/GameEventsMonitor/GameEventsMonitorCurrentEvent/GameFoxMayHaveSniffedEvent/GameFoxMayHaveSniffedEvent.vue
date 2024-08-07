<template>
  <GameEventWithTexts
    id="game-fox-may-have-sniffed-event"
    :texts="gameFoxMayHaveSniffedTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-players-card"
        :players="event.players"
        :svg-icon-path="svgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useArrays } from "~/composables/misc/useArrays";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const { insertIf } = useArrays();

const isFoxPowerlessIfMissesWerewolf = computed<boolean>(() => game.value.options.roles.fox.isPowerlessIfMissesWerewolf);

const haveFoxSniffedWerewolf = computed<boolean>(() => props.event.players?.some(player => player.side.current === "werewolves") === true);

const gameFoxMayHaveSniffedTexts = computed<string[]>(() => {
  const hasFoxSniffedWerewolfTextTKey = haveFoxSniffedWerewolf.value ? "foxHaveSniffedWerewolf" : "foxDidNotSniffWerewolf";

  return [
    t("components.GameFoxMayHaveSniffedEvent.foxMayHaveSniffed"),
    t("components.GameFoxMayHaveSniffedEvent.gameMasterWillTellIfPresentWerewolfInGroup"),
    ...insertIf(!!props.event.players, t(`components.GameFoxMayHaveSniffedEvent.${hasFoxSniffedWerewolfTextTKey}`)),
    ...insertIf(isFoxPowerlessIfMissesWerewolf.value, t("components.GameFoxMayHaveSniffedEvent.foxIsPowerlessIfMissesWerewolf")),
  ];
});

const svgIconPath = computed<string>(() => {
  if (haveFoxSniffedWerewolf.value) {
    return "/svg/role/werewolf.svg";
  }
  return "/svg/misc/question-mark.svg";
});

playSoundEffect("fox-sniffing");
</script>