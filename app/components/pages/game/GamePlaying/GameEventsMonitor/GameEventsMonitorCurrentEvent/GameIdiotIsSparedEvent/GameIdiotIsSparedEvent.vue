<template>
  <GameEventWithTexts
    id="game-idiot-is-spared-event"
    :texts="gameIdiotIsSparedEventTexts"
    @game-event-text-change="onGameEventTextChangeFromGameEventWithTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="idiotInPlayers"
        id="game-event-flipping-idiot-card"
        :players="[idiotInPlayers]"
        svg-icon-path="/svg/game/player/player-attribute/seen.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGamePlayers } from "~/composables/api/game/useGamePlayers";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getPlayersWithCurrentRole } = useGamePlayers(game);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const idiotInPlayers = computed<Player | undefined>(() => getPlayersWithCurrentRole("idiot")[0]);

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

function onGameEventTextChangeFromGameEventWithTexts(newGameEventText: string | undefined): void {
  if (newGameEventText === gameIdiotIsSparedEventTexts.value[0]) {
    playSoundEffect("death");
  } else if (newGameEventText === gameIdiotIsSparedEventTexts.value[1]) {
    playSoundEffect("dumb-huh");
  }
}

playSoundEffect("death");
</script>