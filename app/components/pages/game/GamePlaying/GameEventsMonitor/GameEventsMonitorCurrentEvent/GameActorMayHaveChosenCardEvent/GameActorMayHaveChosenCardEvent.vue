<template>
  <GameEventWithTexts
    id="game-actor-may-have-chosen-card-event"
    :texts="gameActorMayHaveChosenCardEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-last-play-source-card"
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
import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const chosenCard = computed<GameAdditionalCard | undefined>(() => game.value.lastGameHistoryRecord?.play.chosenCard);

const { t } = useI18n();

const gameActorMayHaveChosenCardEventTexts = computed<string[]>(() => [
  t("components.GameActorMayHaveChosenCardEvent.actorMayHaveChosenCard"),
  t("components.GameActorMayHaveChosenCardEvent.gameMasterTakeOutChosenCard"),
]);

const svgIconPath = computed<string | undefined>(() => {
  if (chosenCard.value === undefined) {
    return undefined;
  }
  return "/svg/role/actor.svg";
});

playSoundEffect("actor-clear-throat-and-knocks");
</script>