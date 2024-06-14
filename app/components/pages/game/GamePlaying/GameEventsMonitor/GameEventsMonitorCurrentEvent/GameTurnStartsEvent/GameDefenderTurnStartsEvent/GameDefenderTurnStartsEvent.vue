<template>
  <GameEventWithTexts
    id="game-defender-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const canDefenderProtectAnyone = computed<boolean>(() => game.value.turn === 1 || game.value.options.roles.defender.canProtectTwice);

const gameEventTexts = computed<string[]>(() => {
  if (canDefenderProtectAnyone.value) {
    return [t("components.GameDefenderTurnStartsEvent.defenderProtectsAnyone")];
  }
  return [t("components.GameDefenderTurnStartsEvent.defenderProtectsAnyoneExceptLastProtectedPlayer")];
});

playSoundEffect("sword");
</script>