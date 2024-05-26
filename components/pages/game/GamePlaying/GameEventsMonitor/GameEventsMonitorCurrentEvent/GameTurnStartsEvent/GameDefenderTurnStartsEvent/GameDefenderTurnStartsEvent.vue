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
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const canDefenderProtectAnyone = computed<boolean>(() => game.value.turn === 1 || game.value.options.roles.defender.canProtectTwice);

const gameEventTexts = computed<string[]>(() => {
  if (canDefenderProtectAnyone.value) {
    return [t("components.GameDefenderTurnStartsEvent.defenderProtectsAnyone")];
  }
  return [t("components.GameDefenderTurnStartsEvent.defenderProtectsAnyoneExceptLastProtectedPlayer")];
});
</script>