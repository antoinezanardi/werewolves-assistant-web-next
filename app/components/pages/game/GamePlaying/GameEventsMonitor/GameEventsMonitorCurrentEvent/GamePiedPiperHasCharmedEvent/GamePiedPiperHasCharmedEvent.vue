<template>
  <GameEventWithTexts
    id="game-pied-piper-has-charmed-event"
    :texts="gamePiedPiperHasCharmedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-last-play-targets-card"
        :players="charmedPlayers"
        svg-icon-path="svg/game/player/player-attribute/charmed.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { usePlayers } from "~/composables/api/game/player/usePlayers";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;
const { getPlayersNamesText } = usePlayers();

const charmedPlayers = computed<Player[]>(() => props.event.players ?? []);

const areCharmedPeopleRevealed = computed<boolean>(() => game.value.options.roles.piedPiper.areCharmedPeopleRevealed);

const gamePiedPiperHasCharmedEventTexts = computed<string[]>(() => {
  if (areCharmedPeopleRevealed.value) {
    const charmedPlayersNames = getPlayersNamesText(charmedPlayers.value);

    return [
      t("components.GamePiedPiperHasCharmedEvent.charmedPeopleAreRevealed"),
      t("components.GamePiedPiperHasCharmedEvent.peopleAreCharmed", { charmedPeople: charmedPlayersNames }, charmedPlayers.value.length),
    ];
  }
  return [
    t("components.GamePiedPiperHasCharmedEvent.piedPiperHasCharmed", { charmedCount: charmedPlayers.value.length }, charmedPlayers.value.length),
    t("components.GamePiedPiperHasCharmedEvent.gameMasterWillTapCharmedPlayers", { charmedCount: charmedPlayers.value.length }, charmedPlayers.value.length),
  ];
});

playSoundEffect("pan-flute");
</script>