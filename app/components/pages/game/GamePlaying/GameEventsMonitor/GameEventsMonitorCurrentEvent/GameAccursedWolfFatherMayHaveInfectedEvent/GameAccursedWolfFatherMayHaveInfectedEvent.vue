<template>
  <GameEventWithTexts
    id="game-accursed-wolf-father-may-have-infected-event"
    :texts="gameAccursedWolfFatherMayHaveInfectedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-card"
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
import { useAudioStore } from "~/stores/audio/useAudioStore";

const props = defineProps<CurrentGameEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const hasAccursedWolfFatherInfectedAnyone = computed<boolean>(() => !!props.event.players && props.event.players.length > 0);

const gameAccursedWolfFatherMayHaveInfectedEventTexts = computed<string[]>(() => [
  t("components.GameAccursedWolfFatherMayHaveInfectedEvent.accursedWolfFatherMayHaveInfectedAPlayer"),
  t("components.GameAccursedWolfFatherMayHaveInfectedEvent.gameMasterWillTapAccursedWolfFatherMarkVictim"),
]);

const svgIconPath = computed<string | undefined>(() => {
  if (!hasAccursedWolfFatherInfectedAnyone.value) {
    return undefined;
  }
  return "/svg/role/werewolf.svg";
});

playSoundEffect("evil-demonic-laugh");
</script>