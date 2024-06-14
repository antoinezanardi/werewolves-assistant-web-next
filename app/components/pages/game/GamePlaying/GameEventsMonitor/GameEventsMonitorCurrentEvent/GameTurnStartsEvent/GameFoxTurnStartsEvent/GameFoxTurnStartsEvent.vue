<template>
  <GameEventWithTexts
    id="game-fox-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const gameEventTexts = computed<string[]>(() => [t("components.GameFoxTurnStartsEvent.foxSniffesGroupOfPlayers")]);

playSoundEffect("fox-sniffing");
</script>